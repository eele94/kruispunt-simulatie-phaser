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
		const textures = ['car_black_1', 'car_green_1', 'car_yellow_1', 'car_orange_1','car_blue_1','car_black_2', 'car_green_2', 'car_yellow_2', 'car_orange_2', 'car_blue_2','car_black_3', 'car_green_3', 'car_yellow_3', 'car_orange_3', 'car_blue_3']
		let randomTexture = textures[game.rnd.integerInRange(0, textures.length-1)]

		super(game, randomTexture, light)
		this.scale.set(0.6)
		this.VEHICLE_DISTANCE = 90
	}
}
