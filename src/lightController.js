import Phaser from 'phaser'
import Nodes from './nodes'
import Light from './light'

/**
 *
 *
 * @export
 * @class LightController
 * @extends {Phaser.Group}
 */
export default class LightController  extends Phaser.Group {

	/**
	 * Creates an instance of LightController.
	 *
	 * @param {Phaser.Game} game
	 * @param {Phaser.Group} parent
	 * @param {String} name
	 * @param {API} api
	 *
	 * @memberOf LightController
	 */
	constructor (game, parent, name, api) {
		super(game, parent, name)

		Nodes.forEach(x => {
			let light = new Light(this.game, this.game.world, x.id, x, api)
			this.add(light)
		})
	}

	/**
	 *
	 *
	 * @param {Array<LightStatus>} state
	 *
	 * @memberOf LightController
	 */
	setLightState (state) {
		this.children.forEach(x => {
			state.forEach(y => {
				if(x.id === y.trafficLight) {
					x.color = y.status
				}
			})
		})
	}

	/**
	 *
	 *
	 * @returns state object readable for the Controller
	 *
	 * @memberOf LightController
	 */
	getLightState () {
		return {
			state: this.children.map(x => {
				return {
					trafficLight: x.id,
					count: x.count
				}
			})
		}
	}
}
