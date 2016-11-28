import Vehicle from './vehicle'

export default class Car extends Vehicle {
	/**
	 * Creates an instance of Car.
	 *
	 * @param {Phaser.Game} game
	 * @param {Light} light
	 *
	 * @memberOf Car
	 */
	constructor (game, light) {
		const textures = ['car_black_1', 'car_green_1', 'car_yellow_1']
		let randomTexture = textures[game.rnd.integerInRange(0, textures.length-1)]

		super(game, randomTexture, light)
		this.scale.set(0.6)

	}
}
