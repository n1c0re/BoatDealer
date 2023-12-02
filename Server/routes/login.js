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
				user_type_id: response[0].user_type_id,
			}

			if (userData.user_type_id === 2) {
				const customerQuery = `SELECT customer_id FROM Customers WHERE user_id = $1`
				const customerValues = [userData.userId]

				const customerResponse = await client
					.query(customerQuery, customerValues)
					.then(response => response.rows)

				if (customerResponse.length > 0) {
					userData.customer_id = customerResponse[0].customer_id
				}
			} else if (userData.user_type_id === 3) {
				const customerQuery = `SELECT seller_id FROM seller WHERE user_id = $1`
				const customerValues = [userData.userId]

				const sellerResponse = await client
					.query(customerQuery, customerValues)
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
