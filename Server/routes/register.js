import express from 'express'
import startConnection from '../DataAccess/startConnection.js'

const registerRouter = express.Router()

//Регистрация
registerRouter.post('/', async (req, res) => {
	const client = await startConnection()
	
	const query = `INSERT INTO Users (login, password, customer_name, customer_adress, customer_phone, is_legal_entity, user_type_id) VALUES ($1, $2, $3, $4, $5, $6, 2)`
	const values = [
		req.body['login'],
		req.body['password'],
		req.body['username'],
		req.body['adress'],
		req.body['phone'],
		req.body['entity'],
	]
	
	console.log(values)
	try {
		const response = await client
			.query(query, values)
			.then(response => response.rows)
		return response
	} finally {
		client.release()
	}
})

export default registerRouter
