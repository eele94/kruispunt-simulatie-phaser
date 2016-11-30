import Phaser from 'phaser'

export default class Vehicle extends Phaser.Sprite {

	/**
	 * Creates an instance of Vehicle.
	 *
	 * @param {Phaser.Game} game
	 * @param {string} asset
	 * @param {Light} light
	 *
	 * @memberOf Vehicle
	 */
	constructor (game, asset, light) {

		super(game, 0, 0, asset)
		this.anchor.set(0.5)
		this.light = light
		let pointsX = light.node.points.map(point => point.x)
		let pointsY = light.node.points.map(point => point.y)

		this.points = {
			'x': pointsX,
			'y': pointsY,
		}

		// Get the light locations
		this.lightStopLocations = (light.node.points.filter(point => {
			if (point.light) {
				return point
			}
		}))
		this.lightIndex = 0
		this.lightId = -1
		this.lightCount = this.light.count

		// should be overridden in extended class
		this.VEHICLE_DISTANCE = 0

		this.rotationOffset = light.sprite.rotation
		this.pathIndex = 0
		this.path = []
		this.plot()
		// Step 1 spawn vehicle
		this.drive()
	}

	/**
	 * Calculates the path and interpolates the movement and the rotation of the vehicle
	 *
	 *
	 * @memberOf Vehicle
	 */
	plot () {
		this.path = []
		let ix = 0
		let x = 10 / this.game.width

		for (let i = 0; i <= 1; i += x) {
			let px = Phaser.Math.linearInterpolation(this.points.x, i)
			let py = Phaser.Math.linearInterpolation(this.points.y, i)

			var node = { x: px, y: py, angle: 0, }

			if (ix > 0) {
				switch(this.light.node.dir) {
				case 'u':
					node.angle -= Phaser.Math.angleBetweenPointsY(node, this.path[ix - 1])
					break
				case 'r':
					node.angle = Phaser.Math.angleBetweenPoints(this.path[ix - 1], node)
					break
				case 'd':
					node.angle = Phaser.Math.angleBetweenPointsY(this.path[ix - 1], node)
					break
				case 'l':
					node.angle = Phaser.Math.angleBetweenPoints(node, this.path[ix - 1])
					break
				}
			}

			this.path.push(node)
			ix++
		}
	}

	update () {
		// Ben ik klaar met rijden?
		if (this.isDoneDriving()) {
			this.remove()
		} else {
			if (this.isThereALight()) {
				if(this.lightId !== this.lightStopLocations[this.lightIndex].light) {
					this.lightId = this.lightStopLocations[this.lightIndex].light
					this.increaseLightCount(this.lightId)
				}


				if (this.isLightGreen(this.lightId)) {
					this.decreaseLightCount(this.lightId)
					this.drive()
				} else {
					if (this.atPosition(this, this.calculateStopPosition(this.lightId))) {
						// ZZzzzZzz
						// TODO: opnieuw plotten wanneer die stil staat, vanaf huidige punt
						// this.plot()
					} else {
						this.drive()
					}
				}
			} else {
				this.drive()
			}
		}
	}

	// Rijdt verder
	drive () {
		this.x = this.path[this.pathIndex].x
		this.y = this.path[this.pathIndex].y
		this.rotation = this.rotationOffset + this.path[this.pathIndex].angle
		this.pathIndex++
	}

	// Is het licht groen?
	isLightGreen (id) {
		let color = this.getLightById(id).color
		return color === 'green'
	}

	// TODO: klopt die wel????
	// Kom ik een licht tegen?
	isThereALight () {
		return this.lightIndex < this.lightStopLocations.length
	}

	increaseLightCount (id) {
		this.getLightById(id).count++
	}

	decreaseLightCount (id) {
		this.getLightById(id).count--
		this.lightIndex++
	}

	// Heb ik positie bereikt?
	atPosition (p1, p2) {
		var dx = p1.x - p2.x
		var dy = p1.y - p2.y
		var distance = Math.sqrt(dx * dx + dy * dy)
		return distance < 10
	}

	// Klaar met rijden?
	isDoneDriving () {
		return this.pathIndex === this.path.length
	}

	remove () {
		this.game.world.getByName('vehicleController').remove(this)
	}

	getLightById (id) {
		return this.game.world.getByName('lightController').getByName(id)
	}

	calculateStopPosition (lightId) {
		let distance = this.VEHICLE_DISTANCE * this.lightCount

		let point = Object.assign({}, this.lightStopLocations[this.lightIndex])

		switch(this.getLightById(lightId).node.dir) {
		case 'r':
			point.x -= distance
			break
		case 'l':
			point.x += distance
			break
		case 'u':
			point.y += distance
			break
		case 'd':
			point.y -= distance
			break
		default:

			break
		}
		return point
	}
}
