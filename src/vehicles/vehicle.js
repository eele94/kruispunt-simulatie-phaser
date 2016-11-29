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

		this.rotationOffset = light.sprite.rotation
		this.pi = 0
		this.path = []
		this.plot()
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

		for (let i = 0; i <= 1; i += x){
			let px = Phaser.Math.linearInterpolation(this.points.x, i)
			let py = Phaser.Math.linearInterpolation(this.points.y, i)

			var node = { x: px, y: py, angle: 0 }

			if (ix > 0){
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
		// Check if not at end of path
		if (this.pi < this.path.length) {

			// get number of vehicles in front of the ligh and check if vehicle is at a lightStopLocation
			this.lightStopLocations.forEach(point => {
				const margin = 5
				let posX = this.x
				let posY = this.y
				let vehiclesInFront = this.light.count
				let keepDistance = 90 * vehiclesInFront
				switch(this.light.dir) {
				case 'r':
					posX -= keepDistance
					break
				case 'l':
					posX += keepDistance
					break
				case 'u':
					posY += keepDistance
					break
				case 'd':
					posY -= keepDistance
					break
				default:

					break
				}

				if ((posX > (point.x - margin) && posX < (point.x + margin)) && (posY > (point.y - margin) && posY < (point.y + margin))) {

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
			this.game.world.getByName('vehicleController').remove(this)
		}
	}
}
