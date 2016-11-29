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

		light.count++
		this.points = {
			'x': pointsX,
			'y': pointsY
		}

		this.lightStopLocations = light.node.points.filter(point => {
			if (point.light) {
				return point
			}
		})

		this.VEHICLE_DISTANCE = 0
		this.queuePosition = this.getVehiclesInFront()
		this.rotationOffset = light.sprite.rotation
		this.pi = 0
		this.path = []
		this.plot()
		console.log('Vehicle')
		console.log('queuePosition: ' + this.queuePosition)
	}

	/**
	 *
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

			var node = { x: px, y: py, angle: 0 }

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

	getVehiclesInFront() {
		return this.light.count -1
	}

	update () {
		// Check if not at end of path
		if (this.pi < this.path.length) {
			// check if the vehicle has to check lights
			if (this.lightStopLocations.length > 0) {
			// get number of vehicles in front of the light and set an offset based on the direction
				this.lightStopLocations.forEach(point => {

					let keepDistance = this.VEHICLE_DISTANCE * this.queuePosition
					switch(this.light.node.dir) {
					case 'r':
						point.x -= keepDistance
						break
					case 'l':
						point.x += keepDistance
						break
					case 'u':
						point.y += keepDistance
						break
					case 'd':
						point.y -= keepDistance
						break
					default:

						break
					}

					// console.log('update')
					// console.log('keepDistance' + keepDistance)
					const margin = 5
					// check if the vehicle is at lightStopLocation
					if (this.atPosition(this, point, margin)) {

						// check if the light is green
						if (this.light.color === 'green') {
							// update location
							this.x = this.path[this.pi].x
							this.y = this.path[this.pi].y
							this.rotation = this.rotationOffset + this.path[this.pi].angle
							this.pi++
							// decrease count of vehicles in front of the light
							this.light.count--
						} else {
							// wait zzzZzzzZzZZZzzz
							console.log('sleeping')
						}
					} else {
						// update location
						this.x = this.path[this.pi].x
						this.y = this.path[this.pi].y
						this.rotation = this.rotationOffset + this.path[this.pi].angle
						this.pi++
					}
				})
			} else {
				// update location
				this.x = this.path[this.pi].x
				this.y = this.path[this.pi].y
				this.rotation = this.rotationOffset + this.path[this.pi].angle
				this.pi++
			}
		} else {
			// remove vehicle from the world
			this.game.world.getByName('vehicleController').remove(this)
		}
	}

	atPosition (p1, p2, margin) {
		return (Math.abs(p1.x - p2.x) < margin && Math.abs(p1.y-p2.y) < margin)
	}
}