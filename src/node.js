export default class Node {
	constructor (x, y, lightId, nextNodes) {
		this.x = null
		this.y = null
		this.lightId = -1
		this.nextNodes = []
		if (x !== null) this.x = x
		if (y !== null) this.y = y
		if (lightId !== null) this.lightId = lightId
		if (nextNodes !== null) this.nextNodes = nextNodes

	}
}
