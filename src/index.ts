import express from 'express'
import bodyparser from 'body-parser'
import { userRouter } from './routers/user-router'

const app = express()

app.use(bodyparser.json())

app.use('/users', userRouter)

// app.use('/roles', roleRouter)


app.listen(1001, ()=>{
    console.log('app has started');   
})
