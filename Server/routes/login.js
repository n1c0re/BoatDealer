import express from 'express'
import startConnection from '../DataAccess/startConnection.js'
import jwt from 'jsonwebtoken'

const loginRouter = express.Router()

//Вход пользователя
loginRouter.post('/', async (req, res) => {
	const { login, password } = req.body

	console.log(req.body)
	const client = await startConnection()

	const query = `SELECT * FROM Users WHERE login = $1 AND password = $2`
	const values = [login, password]

	console.log(values)
	
    try {
		const response = await client
			.query(query, values)
			.then(response => response.rows)

		if (response.length > 0) {
			let userData = {
				userId: response[0].user_id,
				user_name: response[0].user_name,
				user_type: response[0].user_type,
			}

			if (userData.user_type === 'Пользователь') {
				const clientQuery = `SELECT client_id FROM Client WHERE user_id = $1`
				const clientValues = [userData.userId]

				const clientResponse = await client
					.query(clientQuery, clientValues)
					.then(response => response.rows)

				if (clientResponse.length > 0) {
					userData.client_id = clientResponse[0].client_id
				}
			} else if (userData.user_type === 'Продавец') {
				const clientQuery = `SELECT seller_id FROM seller WHERE user_id = $1`
				const clientValues = [userData.userId]

				const sellerResponse = await client
					.query(clientQuery, clientValues)
					.then(response => response.rows)

				if (sellerResponse.length > 0) {
					userData.seller_id = sellerResponse[0].seller_id
				}
			}

			const token = jwt.sign(userData, 'your_secret_key', {
				expiresIn: '1h',
			})

			res.json({ success: true, message: 'Вход выполнен успешно', token })
		} else {
			res.status(401).json({
				success: false,
				message: 'Ошибка входа. Проверьте логин и пароль.',
			})
		}
	} finally {
		client.release()
	}
})

export default loginRouter
