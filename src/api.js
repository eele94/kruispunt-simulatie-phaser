let instance = null

/**
 *
 *
 * @export
 * @class API
 */
export default class API {
	/**
	 * Creates an instance of API.
	 *
	 *
	 * @memberOf API
	 */
	constructor () {
		if(!instance) {
			instance = this
		}

		this.time = new Date()
		this.ws = {}
		this.wsAddress = ''
		this.lightController = null

		return instance
	}

	/**
	 *
	 *
	 * @param {String} wsAddress
	 * @param {LightController} lightController
	 *
	 * @memberOf API
	 */
	setup (wsAddress, lightController) {
		this.wsAddress = wsAddress
		this.lightController = lightController

		let query = getQueryParams(document.location.search)

		if(query.address !== undefined) {
			this.wsAddress = query.address
		}
		this.connect(this.wsAddress)
	}

	/**
	 *
	 *
	 * @param {String} wsAddress
	 *
	 * @memberOf API
	 */
	connect (wsAddress) {
		if (wsAddress) {
			this.wsAddress = wsAddress
			console.log('Trying to connect @ %s', wsAddress)
			this.ws = new WebSocket(wsAddress)

			this.ws.onopen = () => {
				console.log('Connected')
				this.sendTrafficState()
			}

			this.ws.onmessage = (event) => {
				let parsed = JSON.parse(event.data)
				this.lightController.setLightState(parsed.state)
			}

			this.ws.onclose = () => {
				console.log('disconnected')
				setTimeout(() => {
					this.connect(this.wsAddress)
				}, 2000)
			}
		}
	}

	/**
	 *
	 * Sends the state of all lights with a number of given vehicles
	 *
	 * @memberOf API
	 */
	sendTrafficState () {
		// only send when the connection is open
		if (this.ws.readyState === 1) {
			this.ws.send(JSON.stringify(this.lightController.getLightState()))
		}
	}
}

function getQueryParams (qs) {
	qs = qs.split('+').join(' ')

	var params = {},
		tokens,
		re = /[?&]?([^=]+)=([^&]*)/g

	while (tokens = re.exec(qs)) {
		params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2])
	}

	return params
}
