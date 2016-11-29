import Phaser from 'phaser'
import Nodes from './nodes'
import Light from './light'

export default class LightController  extends Phaser.Group {

	constructor (game, parent, name, api) {
		super(game, parent, name)

		Nodes.forEach(x => {
			let light = new Light(this.game, this.game.world, x.id, x, api)
			this.add(light)
		})
	}

	setLightState (state) {
		this.children.forEach(x => {
			state.forEach(y => {
				if(x.id === y.trafficLight) {
					x.color = y.status
				}
			})
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
