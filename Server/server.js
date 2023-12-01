import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import carsRouter from './routes/cars.js' 
import registerRouter from './routes/register.js'
import checkLogin from './routes/checkLogin.js'
import loginRouter from './routes/login.js'
import tokenRouter from './routes/tokenValidate.js'
import {orderRouter} from './routes/order.js'
import clientOrderRouter from './routes/clientOrder.js'
import supplierRouter from './routes/supplier.js'
import agreementRouter from './routes/agreement.js'
import queriesRouter from './routes/queries.js'

const app = express()
const port = process.env.SERVER_PORT || 4000

app.use(cors())
app.use(bodyParser.json())

app.use('/api/cars', carsRouter)

app.use('/api/users', checkLogin)
app.use('/api/users', registerRouter)

app.use('/api/login', loginRouter)
app.use('/api/validateToken', tokenRouter)

app.use('/api/orders', orderRouter)
app.use('/api/clientZakaz', clientOrderRouter)

app.use('/api/suppliers', supplierRouter)
app.use('/api/agreement', agreementRouter)

app.use('/api/queries', queriesRouter)

app.listen(port, () => {
	console.log(`Server is running on port ${port}`)
})
