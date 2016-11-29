import Phaser from 'phaser'

export default class Light  extends Phaser.Group {

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
		// this.color = 'green'
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

	get node () {
		return this._node
	}

	set color (val) {
		// this._color = val
		this._color = 'red'
		switch(val) {
		case 'green':
			this.sprite.frame = 2
			break
		case 'orange':
			this.sprite.frame = 1
			break
		case 'yellow':
			this.sprite.frame = 1
			break
		case 'red':
			this.sprite.frame = 0
			break
		default:
			this.sprite.frame = 0
			break
		}
	}

	get color () {
		return this._color
	}

	set count (val) {
		this._count = val
		this.text.setText(this.id + ':' + this._count)
	}
	get count () {
		return this._count
	}

	update () {
	}
}
