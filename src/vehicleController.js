import Phaser from 'phaser'
import Vehicle from './vehicles/vehicle'
import Car from './vehicles/car'
import Walker from './vehicles/walker'
import Train from './vehicles/train'
import Bus from './vehicles/bus'
import Cyclist from './vehicles/cyclist'

export default class VehicleController extends Phaser.Group {

	constructor (game, parent, name) {
		super(game, parent, name)
		this.game = game
		this.initDebugKeys()
	}

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

	addCar () {
		console.log('add Car')
		// car light nodes are defined from 1, 10
		let random = this.game.rnd.integerInRange(1, 10)
		let light = this.game.world.getByName('lightController').getByName(random)
		// let light = this.game.world.getByName('lightController').getAt(6)
		let car = new Car(this.game, light)

		this.add(car)
	}

	addTrain () {
		console.log('add Train')
		// train light nodes are defined from 45, 46
		let random = this.game.rnd.integerInRange(45, 46)
		let light = this.game.world.getByName('lightController').getByName(random)
		// let light = this.game.world.getByName('lightController').getAt(6)
		let train = new Train(this.game, light)

		this.add(train)
	}

	addBus () {
		console.log('add Bus')
		// bus light nodes are defined from 42
		let light = this.game.world.getByName('lightController').getByName(42)
		let bus = new Bus(this.game, light)

		this.add(bus)
	}

	addWalker () {
		console.log('add Walker')
		// bus light nodes are defined from 31, 38
		let random = this.game.rnd.integerInRange(31, 38)
		let light = this.game.world.getByName('lightController').getByName(random)
		let walker = new Walker(this.game, light)

		this.add(walker)
	}

	addCyclist () {
		console.log('add Cyclist')
		// bus light nodes are defined from 21, 28
		let random = this.game.rnd.integerInRange(21, 28)
		let light = this.game.world.getByName('lightController').getByName(random)
		let cyclist = new Cyclist(this.game, light)

		this.add(cyclist)
	}

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
	}
}
