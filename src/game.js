import Phaser from 'phaser'
import VehicleController from './vehicleController'
import LightController from './lightController'
import API from './api'


/**
 *
 *
 * @export
 * @class GameState
 * @extends {Phaser.State}
 */
export default class GameState extends Phaser.State {
	/**
	 *
	 *
	 *
	 * @memberOf GameState
	 */
	init () {
		
	}
	/**
	 *
	 *
	 *
	 * @memberOf GameState
	 */
	preload () {
		this.game.resize()
		// background
		this.load.image('background', './assets/images/bg.jpg')

		// lights
		this.load.spritesheet('light', './assets/images/light.png', 54, 150)
		// cars
		this.load.image('car_black_1', './assets/images/car_black_1.png')
		this.load.image('car_yellow_1', './assets/images/car_yellow_1.png')
		this.load.image('car_green_1', './assets/images/car_green_1.png')
		this.load.image('car_orange_1', './assets/images/car_orange_1.png')
		this.load.image('car_blue_1', './assets/images/car_blue_1.png')
		this.load.image('car_black_2', './assets/images/car_black_2.png')
		this.load.image('car_yellow_2', './assets/images/car_yellow_2.png')
		this.load.image('car_green_2', './assets/images/car_green_2.png')
		this.load.image('car_orange_2', './assets/images/car_orange_2.png')
		this.load.image('car_blue_2', './assets/images/car_blue_2.png')
		this.load.image('car_black_3', './assets/images/car_black_3.png')
		this.load.image('car_yellow_3', './assets/images/car_yellow_3.png')
		this.load.image('car_green_3', './assets/images/car_green_3.png')
		this.load.image('car_orange_3', './assets/images/car_orange_3.png')
		this.load.image('car_blue_3', './assets/images/car_blue_3.png')
		// cyclist
		this.load.image('cyclist', './assets/images/cyclist.png')
		// people
		this.load.image('p1', './assets/images/p1.png')
		this.load.image('p2', './assets/images/p2.png')
		this.load.image('p3', './assets/images/p3.png')
		this.load.image('p4', './assets/images/p4.png')
		this.load.image('p5', './assets/images/p5.png')
		this.load.image('p6', './assets/images/p6.png')
		this.load.image('p7', './assets/images/p7.png')
		this.load.image('p8', './assets/images/p8.png')
		this.load.image('p9', './assets/images/p9.png')
		this.load.image('p10', './assets/images/p10.png')
		this.load.image('p11', './assets/images/p11.png')
		this.load.image('p12', './assets/images/p12.png')
		// train
		this.load.image('train', './assets/images/train.png')
		// bus
		this.load.image('bus', './assets/images/bus.png')
	}

	/**
	 *
	 *
	 *
	 * @memberOf GameState
	 */
	create () {
		this.game.add.image(0, 0, 'background')

		this.vehicleController = new VehicleController(this.game, this.game.world, 'vehicleController')

		this.lightController = new LightController(this.game, this.game.world, 'lightController', this.api)

		// ws://localhost:8000
		// ws://217.120.20.200:8080/ws lukas
		// ws://2f63d2f2.ngrok.io
		this.api = new API()
		this.api.setup('ws://localhost:8000', this.lightController)
	}

	/**
	 *
	 *
	 *
	 * @memberOf GameState
	 */
	render () {
		if (__DEV__) {
			let vehicles = this.vehicleController.children
			if (vehicles.length > 0) {
				this.game.debug.spriteInfo(this.vehicleController.getChildAt(vehicles.length-1), 32, 32)
			}
		}
	}
}
