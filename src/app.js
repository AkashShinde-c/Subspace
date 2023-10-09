const express = require('express')
const routes = require('./routes/routes')
const port = process.env.PORT||5000

const app = express()

app.use('/',routes)


app.listen(port,(error)=>{
    if(!error){
        console.log(`Server running on ${port}`)
    }
    else{
        console.log(error)
    }
})