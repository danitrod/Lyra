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

app.post('/search', (req, res) => {
    res.send({ search: req.body.value })
})

app.post('/lyrics', (req, res) => {
    request.post('https://76d95a1f.us-south.apiconnect.appdomain.cloud/608784ce-4f35-401c-abf5-4d3768b32179/lyrics', {
        headers: {
            'Content-Type': 'application/json'
        },
        json: {
            ...req.body
        }
    }, (err, _, body) => {
        if (err || body.err === true) console.error(err);
        else {
            request.post('https://us-south.functions.cloud.ibm.com/api/v1/web/danitrod%40ibm.com_dev/Lyra/analyseLyrics.json', {
                json: {
                    lyrics: body.lyrics.replace(/(\n)/g, ' ')
                    // lyrics: body.lyrics
                }
            }, (err2, res2, body2) => {
                if (err2) console.error(err2);
                body.emotions = body2.emotions
                // console.log(body2)
                res.send(body);
            })
        }
    })
    // res.send({ res: req.body })
})

app.get('*', (_, res) => {
    res.redirect('/')
})

const port = process.env.PORT || 7000,
    host = process.env.HOST || '0.0.0.0'

app.listen(port, host, () => {
    console.log(`App is up and running at PORT ${port}`)
})