import Vehicle from './vehicle'

export default class Bus extends Vehicle {
	/**
	 * Creates an instance of Bus.
	 *
	 * @param {Phaser.Game} game
	 * @param {Light} light
	 *
	 * @memberOf Bus
	 */
	constructor (game, light) {

		super(game, 'bus', light)
		this.scale.set(0.6)
		this.VEHICLE_DISTANCE = 0
	}
}
