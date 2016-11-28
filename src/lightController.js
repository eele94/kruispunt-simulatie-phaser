import Phaser from 'phaser'
import Nodes from './nodes'
import Light from './sprites/light'

export default class LightController  extends Phaser.Group{

	constructor (game, parent, name) {
		super(game, parent, name)

		Nodes.forEach(x => {
			let light = new Light(this.game, this.game.world, x.id, x)
			this.add(light)
		})
	}

	setLightState (state) {
		this.children.forEach(x => {
			x.color = 'green'
		})
	}

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
