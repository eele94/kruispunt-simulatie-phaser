export default class API {
	/**
	 * Creates an instance of API.
	 *
	 * @param {string} wsAddress
	 * @param {LightController} lightController
	 *
	 * @memberOf API
	 */
	constructor (wsAddress, lightController) {
		this.wsAddress = wsAddress
		this.ws = {}
		this.lightController = lightController
		this.connect(wsAddress)
	}

	/**
	 *
	 *
	 * @param {string} wsAddress
	 *
	 * @memberOf API
	 */
	connect (wsAddress) {
		if (wsAddress) {
			this.wsAddress = wsAddress
			console.log('Connecting to: %s', wsAddress)
			this.ws = new WebSocket(wsAddress)

			this.ws.onopen = () => {
				console.log('Connected')
				this.sendTrafficState()
			}

			this.ws.onmessage = (event) => {
				// todo: validate json (event.data) with schema
				this.lightController.setLightState(JSON.parse(event.data).state)
			}

			this.ws.onclose = () => {
				console.log('disconnected')
				setTimeout(() => {
					this.connect(this.wsAddress)
				}, 2000)
			}
		}
	}

	sendTrafficState () {
		// only send when the connection is open
		if (this.ws.readyState === 1) {
			this.ws.send(JSON.stringify(this.lightController.getLightState()))
		}
	}
}
