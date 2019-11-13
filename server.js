const bodyParser = require('body-parser')
const express = require('express')
const helmet = require('helmet')
const path = require('path')
const request = require('request')
require('dotenv').config()

const app = express()
app.use(helmet())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, "build")))

app.post('/lyrics', (req, res) => {
    request.post('https://76d95a1f.us-south.apiconnect.appdomain.cloud/608784ce-4f35-401c-abf5-4d3768b32179/lyrics', {
        headers: {
            'Content-Type': 'application/json'
        },
        json: {
            ...req.body
        }
    }, (err, _, body) => {
        if (err) {
            console.error(err);
            res.send({
                err: true,
                msg: "There was an internal server error processing your request."
            })
        }
        else {
            res.send(body);
        }
    })
})

app.get('*', (_, res) => {
    res.redirect('/')
})

const port = process.env.PORT || 7000,
    host = process.env.HOST || '0.0.0.0'

app.listen(port, host, () => {
    console.log(`App is up and running at PORT ${port}`)
})