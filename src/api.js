let instance = null

export default class API {
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

	setup (wsAddress, lightController) {
		this.wsAddress = wsAddress
		this.lightController = lightController

		this.connect(wsAddress)
	}

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
