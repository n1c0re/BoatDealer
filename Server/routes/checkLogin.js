import express from 'express'
import startConnection from '../DataAccess/startConnection.js'

const checkLogin = express.Router()

//Проверка логина
checkLogin.get('/:login', async (req, res) => {
	const { login } = req.params

	try {
		const client = await startConnection()
		const result = await client.query(
			'SELECT EXISTS (SELECT 1 FROM Users WHERE login = $1) as "exists"',
			[login]
		)
		const exists = result.rows[0].exists

		res.json({ exists })
		client.release()
	} catch (error) {
		console.error('Error:', error)
		res.status(500).send('Server Error')
	}
})

export default checkLogin
