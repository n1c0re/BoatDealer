import express from 'express'
import jwt from 'jsonwebtoken'

const tokenRouter = express.Router()

//Проверка токена
tokenRouter.post('/', async (req, res) => {
	const { token } = req.body

	try {
		const decoded = jwt.verify(token, 'your_secret_key')
		console.log(decoded)

		res.json({ user: decoded })
	} catch (error) {
		console.error('Ошибка при проверке токена:', error)
		res.status(401).send('Invalid token')
	}
})

export default tokenRouter
