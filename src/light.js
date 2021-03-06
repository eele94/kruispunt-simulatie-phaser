import Phaser from 'phaser'
import API from './api'
import LightState from './lightState'

/**
 *
 *
 * @export
 * @class Light
 * @extends {Phaser.Group}
 */
export default class Light  extends Phaser.Group {

	/**
	 * Creates an instance of Light.
	 *
	 * @param {Phaser.Game} game
	 * @param {Phaser.Group} parent
	 * @param {String} name
	 * @param {Node} node
	 *
	 * @memberOf Light
	 */
	constructor (game, parent, name, node) {
		super(game, parent, name)
		this.id = node.id
		this._color = null
		this._count = 0
		this._node = node
		this.sprite = new Phaser.Sprite(game, node.position.x, node.position.y, 'light', 0)
		this.sprite.width = 23
		this.sprite.height = 63
		this.sprite.anchor.set(0.5)
		this.add(this.sprite)
		this.api = new API()
		this.color = node.color

		switch(node.dir) {
		case 'u':
			this.sprite.rotation = 0
			break
		case 'r':
			this.sprite.rotation = Math.PI / 2
			break
		case 'd':
			this.sprite.rotation = Math.PI
			break
		case 'l':
			this.sprite.rotation = Math.PI * 1.5
			break
		}

		this.text = game.add.text(this.sprite.x-10, this.sprite.y-45 ,this.id + ':' + this.count, {
			font: '15px Arial',
			fill: '#00000',
			align: 'center'
		})
	}

	/**
	 *
	 *
	 * @readonly
	 *
	 * @memberOf Light
	 */
	get node () {
		return this._node
	}

	/**
	 *
	 *
	 *
	 * @memberOf Light
	 */
	set color (val) {
		this._color = val
		switch(val) {
		case LightState.GREEN:
			this.sprite.frame = 2
			break
		case LightState.ORANGE:
			this.sprite.frame = 1
			break
		case LightState.YELLOW:
			this.sprite.frame = 1
			break
		case LightState.RED:
			this.sprite.frame = 0
			break
		default:
			this.sprite.frame = 0
			break
		}
	}

	/**
	 *
	 *
	 *
	 * @memberOf Light
	 */
	get color () {
		return this._color
	}

	/**
	 *
	 *
	 *
	 * @memberOf Light
	 */
	set count (val) {
		this._count = val
		this.text.setText(this.id + ':' + this._count)
		this.api.sendTrafficState()
	}
	/**
	 *
	 *
	 *
	 * @memberOf Light
	 */
	get count () {
		return this._count
	}

	/**
	 *
	 *
	 *
	 * @memberOf Light
	 */
	update () {
	}
}
