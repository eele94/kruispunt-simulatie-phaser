import Vehicle from './vehicle'

export default class Walker extends Vehicle {
	/**
	 * Creates an instance of Walker.
	 *
	 * @param {Phaser.Game} game
	 * @param {Light} light
	 *
	 * @memberOf Walker
	 */
	constructor (game, light) {
		const textures = ['p1', 'p2', 'p3','p4','p5','p6','p7', 'p8', 'p9','p10','p11','p12']
		let randomTexture = textures[game.rnd.integerInRange(0, textures.length-1)]
		const SPEED = 2
		super(game, randomTexture, light, SPEED)
		this.scale.set(0.6)
		this.VEHICLE_DISTANCE = 25
	}
}
