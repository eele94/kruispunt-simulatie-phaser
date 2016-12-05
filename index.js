'use strict'
console.log('Running webapp...')

let Express = require('express')
let app = new Express()
let port = process.env.PORT || 80

app.use(Express.static('./'))

app.listen(port, () => {
	console.log(`App listening on port ${port}`)
})
