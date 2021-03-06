import Vehicle from './vehicle'

export default class Train extends Vehicle {
	/**
	 * Creates an instance of Train.
	 *
	 * @param {Phaser.Game} game
	 * @param {Light} light
	 *
	 * @memberOf Train
	 */
	constructor (game, light) {
		const SPEED = 10
		super(game, 'train', light, SPEED)
		this.scale.set(0.4)

		if (this.light.node.dir === 'l') {
			this.scale.x = -0.4
		}

		this.VEHICLE_DISTANCE = 0
	}
}
