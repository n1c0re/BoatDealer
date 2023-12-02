import express from 'express'
import startConnection from '../DataAccess/startConnection.js'

const clientOrderRouter = express.Router()

const client = await startConnection()

clientOrderRouter.post('/', async (req, res) => {
	const { customer_id, order_id } = req.body

	console.log(customer_id);
	const query = `INSERT INTO CustomerOrder (customer_id, order_id) VALUES ($1, $2)`
	const values = [customer_id, order_id]

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
