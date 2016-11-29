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
		this.lightStopLocations = light.node.points.filter(point => {
			if (point.light) {
				return point
			}
		})
		this.lightIndex = 0

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
		// debugger
		if (this.isDoneDriving()) {
			this.remove()
		} else {
			if (this.isThereALight()) {
				this.increaseLightCount(this.lightStopLocations[this.lightIndex].light)
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
		return this.game.world.getByName('lightController').getByName(id).color === 'green'
	}

	// TODO: klopt die wel????
	// Kom ik een licht tegen?
	isThereALight () {
		return this.lightIndex < this.lightStopLocations.length
	}

	increaseLightCount (id) {
		this.game.world.getByName('lightController').getByName(id).count++
		this.lightIndex++
	}

	decreaseLightCount (id) {
		this.game.world.getByName('lightController').getByName(id).count--
	}

	// Heb ik positie bereikt?
	atPosition (p1, p2, margin) {
		return (Math.abs(p1.x - p2.x) < margin && Math.abs(p1.y-p2.y) < margin)
	}

	// Hoeveel voertuigen zijn er voor mij?
	getVehiclesInFront (id) {
		return this.game.world.getByName('lightController').getByName(id).count
	}

	// Klaar met rijden?
	isDoneDriving () {
		return this.pathIndex === this.path.length
	}

	remove () {
		this.game.world.getByName('vehicleController').remove(this)
	}
}
