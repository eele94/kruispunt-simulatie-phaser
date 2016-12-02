import Phaser from 'phaser'
import Vehicle from './vehicles/vehicle'
import Car from './vehicles/car'
import Walker from './vehicles/walker'
import Train from './vehicles/train'
import Bus from './vehicles/bus'
import Cyclist from './vehicles/cyclist'

/**
 *
 *
 * @export
 * @class VehicleController
 * @extends {Phaser.Group}
 */
export default class VehicleController extends Phaser.Group {

	/**
	 * Creates an instance of VehicleController.
	 *
	 * @param {Phaser.Game} game
	 * @param {Phaser.Group} parent
	 * @param {String} name
	 *
	 * @memberOf VehicleController
	 */
	constructor (game, parent, name) {
		super(game, parent, name)
		this.game = game
		this.initDebugKeys()
		this.generateVehicles()
	}

	/**
	 *
	 *
	 *
	 * @memberOf VehicleController
	 */
	update () {
		this.children.forEach(x => {
			if (x instanceof Vehicle) {
				x.update()
			}
		})

		if (this.game.input.activePointer.withinGame) {
			this.game.input.enabled = true
		}
		else {
			this.game.input.enabled = false
		}
	}

	/**
	 *
	 *
	 *
	 * @memberOf VehicleController
	 */
	generateVehicles () {
		this.generateTrains()
		this.generateCars()
		this.generateBusses()
		this.generateWalkers()
		this.generateCyclists()

	}

	/**
	 *
	 *
	 *
	 * @memberOf VehicleController
	 */
	generateTrains () {
		let time = this.game.rnd.integerInRange(25000, 35000)
		setTimeout (() => {
			this.addTrain()
			this.generateTrains()
		}, time)
	}

	/**
	 *
	 *
	 *
	 * @memberOf VehicleController
	 */
	generateCars () {
		let time = this.game.rnd.integerInRange(2500, 3500)
		setTimeout (() => {
			this.addCar()
			this.generateCars()
		}, time)
	}

	/**
	 *
	 *
	 *
	 * @memberOf VehicleController
	 */
	generateBusses () {
		let time = this.game.rnd.integerInRange(10000, 20000)
		setTimeout (() => {
			this.addBus()
			this.generateBusses()
		}, time)
	}

	/**
	 *
	 *
	 *
	 * @memberOf VehicleController
	 */
	generateWalkers () {
		let time = this.game.rnd.integerInRange(4000, 10000)
		setTimeout (() => {
			this.addWalker()
			this.generateWalkers()
		}, time)
	}

	/**
	 *
	 *
	 *
	 * @memberOf VehicleController
	 */
	generateCyclists () {
		let time = this.game.rnd.integerInRange(4000, 10000)
		setTimeout (() => {
			this.addCyclist()
			this.generateCyclists()
		}, time)
	}

	/**
	 *
	 *
	 *
	 * @memberOf VehicleController
	 */
	addCar () {
		console.log('add Car')
		// car light nodes are defined from 1, 10
		let random = this.game.rnd.integerInRange(1, 10)
		let light = this.game.world.getByName('lightController').getByName(random)
		// let light = this.game.world.getByName('lightController').getAt(6)
		let car = new Car(this.game, light)

		this.add(car)
	}

	/**
	 *
	 *
	 *
	 * @memberOf VehicleController
	 */
	addTrain () {
		console.log('add Train')
		// train light nodes are defined from 45, 46
		let random = this.game.rnd.integerInRange(45, 46)
		let light = this.game.world.getByName('lightController').getByName(random)
		let train = new Train(this.game, light)

		this.add(train)
	}

	/**
	 *
	 *
	 *
	 * @memberOf VehicleController
	 */
	addBus () {
		console.log('add Bus')
		// bus light nodes are defined from 42
		let light = this.game.world.getByName('lightController').getByName(42)
		let bus = new Bus(this.game, light)

		this.add(bus)
	}

	/**
	 *
	 *
	 *
	 * @memberOf VehicleController
	 */
	addWalker () {
		console.log('add Walker')
		// walker spawn light nodes
		// 33, 36, 38
		let startNodes = [33, 36, 38]
		let random = startNodes[this.game.rnd.integerInRange(0, startNodes.length-1)]
		let light = this.game.world.getByName('lightController').getByName(random)
		let walker = new Walker(this.game, light)

		this.add(walker)
	}

	/**
	 *
	 *
	 *
	 * @memberOf VehicleController
	 */
	addCyclist () {
		console.log('add Cyclist')
		// cyclist spawn light nodes
		// 23, 26, 28
		let startNodes = [23, 26, 28]
		let random = startNodes[this.game.rnd.integerInRange(0, startNodes.length-1)]
		let light = this.game.world.getByName('lightController').getByName(random)
		let cyclist = new Cyclist(this.game, light)

		this.add(cyclist)
	}

	/**
	 *
	 *
	 *
	 * @memberOf VehicleController
	 */
	initDebugKeys () {
		let key1 = this.game.input.keyboard.addKey(Phaser.Keyboard.ONE)
		key1.onDown.add(this.addCar, this)
		let key2 = this.game.input.keyboard.addKey(Phaser.Keyboard.TWO)
		key2.onDown.add(this.addTrain, this)
		let key3 = this.game.input.keyboard.addKey(Phaser.Keyboard.THREE)
		key3.onDown.add(this.addBus, this)
		let key4 = this.game.input.keyboard.addKey(Phaser.Keyboard.FOUR)
		key4.onDown.add(this.addWalker, this)
		let key5 = this.game.input.keyboard.addKey(Phaser.Keyboard.FIVE)
		key5.onDown.add(this.addCyclist, this)
		let key6 = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
		key6.onDown.add(this.addCarAtLane, this)
	}
	
	/**
	 *
	 *
	 *
	 * @memberOf VehicleController
	 */
	addCarAtLane () {
		console.log('add Car at lane')
		// car light nodes are defined from 1, 10
		let lane = 7
		let light = this.game.world.getByName('lightController').getByName(lane)
		let car = new Car(this.game, light)

		this.add(car)
	}
}
