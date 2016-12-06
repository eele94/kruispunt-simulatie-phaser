import Vehicle from './vehicle'

export default class Cyclist extends Vehicle {
	/**
	 * Creates an instance of Cyclist.
	 *
	 * @param {Phaser.Game} game
	 * @param {Light} light
	 *
	 * @memberOf Cyclist
	 */
	constructor (game, light) {
		const SPEED = 4
		super(game, 'cyclist', light, SPEED)
		this.scale.set(0.6)
		this.VEHICLE_DISTANCE = 60
	}
}
