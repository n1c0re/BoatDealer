import express from 'express'
import startConnection from '../DataAccess/startConnection.js'

const registerRouter = express.Router()

//Регистрация
registerRouter.post('/', async (req, res) => {
	console.log(req.body)
	const client = await startConnection()

	const query = `INSERT INTO Users (login, is_legal_entity, password, user_name, user_type) VALUES ($1, $2, $3, $4, 'Пользователь')`
	const values = [
		req.body['login'],
		req.body['entity'],
		req.body['password'],
		req.body['username'],
	]

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
