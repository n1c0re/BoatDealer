import express from 'express'
import startConnection from '../DataAccess/startConnection.js'

const agreementRouter = express.Router()

agreementRouter.post('/', async (req, res) => {
	const { boatId, supplierId, order_id } = req.body

	const client = await startConnection()

	try {
		const result = await client.query(
			`INSERT INTO Agreement (boat_id, agreement_date) VALUES ($1, NOW()) RETURNING agreement_id`,
			[boatId]
		)

		const agreementId = result.rows[0].agreement_id

		await client.query(
			`INSERT INTO AgreementSupplier (agreement_id, supplier_id) VALUES ($1, $2)`,
			[agreementId, supplierId]
		)

        await client.query(
					`UPDATE Orders SET zakaz_status = 'Отправлен' WHERE order_id = $1`,
					[order_id]
				)

		res.status(201).json({ success: true, order_id })
	} catch (error) {
		console.error('Error:', error)
		res
			.status(500)
			.json({ success: false, error: 'Failed to create agreement' })
	}
})

export default agreementRouter
