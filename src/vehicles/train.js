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

		super(game, 'train', light)
		this.scale.set(0.6)

	}
}
