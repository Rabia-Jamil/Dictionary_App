const express = require('express')
const request = require('request')
const app = express()
const cors = require("cors");

app.use(cors());

app.get('/search', (req, res) => {
    const { word } = req.query
    
    if(!word) {
        return res.send({
            error: "Please specify a word"
        })
    }
    const options = {
        url: 'https://od-api.oxforddictionaries.com/api/v1/entries/en/' + word,
        headers : {
            Accept: "application/json",
            app_id: "c809585f",
            app_key: "a597212a0cd403a49331c470131d007c"
        },
        json: true //we will receive parsed converted data from server
    }

    const callback = (error,  response) => {
        console.log("error : ", error)
        console.log("Status code : ", response && response.statusCode)
        const definition = (response) && (response.statusCode === 200) 
            ? response.body.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0] 
            : "Word not found!"
        const data = {
            word,
            error,
            definition,
        }
        return res.send({ data })
     }
     request( options, callback )
})

const port = process.env.PORT || 4000
app.listen( port, () => {
    console.log("server listening at port")
})

