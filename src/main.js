import 'pixi'
import 'p2'
import Phaser from 'phaser'

import Simulation from './game'

/**
 *
 *
 * @class Game
 * @extends {Phaser.Game}
 */
class Game extends Phaser.Game {

	/**
	 * Creates an instance of Game.
	 *
	 *
	 * @memberOf Game
	 */
	constructor () {
		const width = 1920
		const height = 1080

		super(width, height, Phaser.AUTO, 'content', null)

		this.state.add('Simulation', Simulation, false)

		this.state.start('Simulation')

		// TODO: repair auto resizing
		// Make sure we maintain the correct aspect ratio.
		// window.addEventListener('resize', function () {
		// 	this.resize()
		// }.bind(this))
	}

	/**
	 *
	 *
	 *
	 * @memberOf Game
	 */
	resize () {
		let ratio = 1080 / 1920
		let docWidth = document.body.clientWidth
		let docHeight = document.body.clientHeight

		if (docHeight / docWidth < ratio) {
			this.renderer.view.style.height = '100%'
			this.renderer.view.style.width = 'auto'
		} else {
			this.renderer.view.style.height = 'auto'
			this.renderer.view.style.width = '100%'
		}
	}
}

window.game = new Game()
