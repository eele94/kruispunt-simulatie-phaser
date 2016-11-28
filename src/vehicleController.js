import Phaser from 'phaser'
import Car from './vehicles/car'
import Vehicle from './vehicles/vehicle'

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
		// car light nodes are defined from 0, 9
		let random = this.game.rnd.integerInRange(0, 9)
		let light = this.game.world.getByName('lightController').getAt(random)
		// let light = this.game.world.getByName('lightController').getAt(6)
		let car = new Car(this.game, light)

		this.add(car)
	}

	initDebugKeys () {
		let key1 = this.game.input.keyboard.addKey(Phaser.Keyboard.ONE)
		key1.onDown.add(this.addCar, this)
	}
}
