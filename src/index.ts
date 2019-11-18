import express from 'express'
import bodyparser from 'body-parser'

const app = express()

app.use(bodyparser.json())

// app.use('/budgets', budgetRouter)

// app.use('/posts', postRouter)


app.listen(1001, ()=>{
    console.log('app has started');   
})
