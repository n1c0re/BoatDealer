import express from 'express'
import startConnection from '../DataAccess/startConnection.js'

const supplierRouter = express.Router()

supplierRouter.get('/', async (req, res) => {
	const client = await startConnection()

	const query = `SELECT * FROM supplier`

	try {
		const response = await client.query(query).then(response => response.rows)
		res.send(response)
	} finally {
		client.release()
	}
})

export default supplierRouter
