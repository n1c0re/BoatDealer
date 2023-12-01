import express from 'express'
import startConnection from '../DataAccess/startConnection.js'

const agreementRouter = express.Router()

agreementRouter.post('/', async (req, res) => {
	const { carId, supplierId, zakaz_id } = req.body

	const client = await startConnection()

	try {
		const result = await client.query(
			`INSERT INTO Agreement (car_id, agreement_date) VALUES ($1, NOW()) RETURNING agreement_id`,
			[carId]
		)

		const agreementId = result.rows[0].agreement_id

		await client.query(
			`INSERT INTO AgreementSupplier (agreement_id, supplier_id) VALUES ($1, $2)`,
			[agreementId, supplierId]
		)

        await client.query(
					`UPDATE Zakaz SET zakaz_status = 'Отправлен' WHERE zakaz_id = $1`,
					[zakaz_id]
				)

		res.status(201).json({ success: true, zakaz_id })
	} catch (error) {
		console.error('Error:', error)
		res
			.status(500)
			.json({ success: false, error: 'Failed to create agreement' })
	}
})

export default agreementRouter
