const Express = require('express')
const bodyParse = require('body-parser')
const userRoute = require('./routes/userRoute')

const app = Express()
app.use(bodyParse.urlencoded({ extended: false}))
const porta = 5010

userRoute(app)

app.listen(porta, () => console.log('Api Rodando na porta:5010'))