/* globals __DEV__ */
import Phaser from 'phaser'
import VehicleController from '../vehicleController.js'
import LightController from '../lightController.js'

export default class extends Phaser.State {
	init () {}
	preload () {
		this.game.resize()
		// background
		this.load.image('background', './assets/images/bg.jpg')

		// lights
		this.load.image('light_green', './assets/images/greenlight.png')
		this.load.image('light_orange', './assets/images/orangelight.png')
		this.load.image('light_red', './assets/images/redlight.png')
		this.load.spritesheet('light', './assets/images/light.png', 54, 150)
		// cars
		this.load.image('car_black_1', './assets/images/car_black_1.png')
		this.load.image('car_yellow_1', './assets/images/car_yellow_1.png')
		this.load.image('car_green_1', './assets/images/car_green_1.png')
	}

	create () {
		this.game.add.image(0,0,'background')

		this.vehicleController = new VehicleController(this.game, this.game.world, 'vehicleController')
		this.lightController = new LightController(this.game, this.game.world, 'lightController')

	}

	render () {
		if (__DEV__) {
			let vehicles = this.vehicleController.children
			if (vehicles.length > 0) {
				this.game.debug.spriteInfo(this.vehicleController.getChildAt(vehicles.length-1), 32, 32)
			}
		}
	}
}
