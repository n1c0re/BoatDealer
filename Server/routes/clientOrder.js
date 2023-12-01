import express from 'express'
import startConnection from '../DataAccess/startConnection.js'

const clientOrderRouter = express.Router()

const client = await startConnection()

clientOrderRouter.post('/', async (req, res) => {
	const { client_id, zakaz_id } = req.body

	const query = `INSERT INTO ClientZakaz (client_id, zakaz_id) VALUES ($1, $2)`
	const values = [client_id, zakaz_id]

	try {
		const response = await client
			.query(query, values)
			.then(response => response.rows)

		res.json({ success: true })
	} catch (error) {
		console.error('Error:', error)
		res
			.status(500)
			.json({ success: false, error: 'Failed to create ClientZakaz record' })
	}
})

export default clientOrderRouter
