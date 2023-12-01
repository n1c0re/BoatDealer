import express from 'express'
import startConnection from '../DataAccess/startConnection.js'

const orderRouter = express.Router()

const client = await startConnection()

orderRouter.post('/', async (req, res) => {
	const { seller_id, zakaz_date, zakaz_status } = req.body

	const query = `INSERT INTO Zakaz (seller_id, zakaz_date, zakaz_status) VALUES ($1, $2, $3) RETURNING zakaz_id`
	const values = [seller_id, zakaz_date, zakaz_status]

	try {
		const response = await client
			.query(query, values)
			.then(response => response.rows)

		const insertedZakazId = response[0].zakaz_id

		res.json({ success: true, zakaz_id: insertedZakazId })
	} catch (error) {
		console.error('Error:', error)
		res
			.status(500)
			.json({ success: false, error: 'Failed to create Zakaz record' })
	}
})

orderRouter.post('/car', async (req, res) => {
	const { car_id, zakaz_id } = req.body

	const query = `INSERT INTO carzakaz (car_id, zakaz_id) VALUES ($1, $2)`
	const values = [car_id, zakaz_id]

	try {
		const response = await client
			.query(query, values)
			.then(response => response.rows)
		return response
	} catch (error) {
		console.error('Error:', error)
	}
})

orderRouter.get('/client', async (req, res) => {
	const { client_id } = req.query

	console.log('client_id: ', client_id)

	if (!client_id) {
		return res
			.status(400)
			.json({ success: false, error: 'User ID is required' })
	}

	const client = await startConnection()

	const query = `
    SELECT 
    Zakaz.zakaz_id, 
    Seller.seller_name, 
    Zakaz.zakaz_date, 
    Zakaz.zakaz_status,
    Car.car_id, 
    Car.name AS car_name, 
    Currency.currency, 
    Car.price AS car_price
FROM Zakaz
INNER JOIN ClientZakaz ON Zakaz.zakaz_id = ClientZakaz.zakaz_id
INNER JOIN CarZakaz ON Zakaz.zakaz_id = CarZakaz.zakaz_id
INNER JOIN Car ON CarZakaz.car_id = Car.car_id
INNER JOIN Seller ON Zakaz.seller_id = Seller.seller_id
INNER JOIN Currency ON Car.currency_id = Currency.currency_id
WHERE ClientZakaz.client_id = $1;
  `
	const values = [client_id]

	try {
		const response = await client
			.query(query, values)
			.then(response => response.rows)
		console.log(response)
		res.send(response)
	} catch (error) {
		console.error('Error:', error)
		res
			.status(500)
			.json({ success: false, error: 'Failed to fetch orders with cars' })
	} finally {
		client.release()
	}
})

orderRouter.delete('/', async (req, res) => {
	const { orderId } = req.query
	console.log(orderId)

	if (!Number.isInteger(parseInt(orderId))) {
		return res.status(400).send({ error: 'Invalid orderId' })
	}

	const client = await startConnection()

	const query = `
        DELETE FROM CarZakaz WHERE zakaz_id = $1;
    `

	const values = [orderId]

	try {
		await client.query(query, values)
		res.status(200).send({ success: true })
	} catch (error) {
		console.error('Error:', error)
		res.status(500).send({ error: 'Internal Server Error' })
	} finally {
		client.release()
	}
})

orderRouter.get('/', async (req, res) => {
	const client = await startConnection()

	const query = `
    SELECT 
    Zakaz.zakaz_id, 
    Seller.seller_name, 
    Zakaz.zakaz_date, 
    Zakaz.zakaz_status,
    Car.car_id, 
    Car.name AS car_name, 
    Currency.currency, 
    Car.price AS car_price,
    Users.user_name AS client_name
FROM Zakaz
INNER JOIN ClientZakaz ON Zakaz.zakaz_id = ClientZakaz.zakaz_id
INNER JOIN CarZakaz ON Zakaz.zakaz_id = CarZakaz.zakaz_id
INNER JOIN Car ON CarZakaz.car_id = Car.car_id
INNER JOIN Seller ON Zakaz.seller_id = Seller.seller_id
INNER JOIN Currency ON Car.currency_id = Currency.currency_id
INNER JOIN Client ON Client.client_id = ClientZakaz.client_id
INNER JOIN Users ON Client.user_id = Users.user_id;
  `
	try {
		const response = await client.query(query).then(response => response.rows)
		console.log(response)
		res.send(response)
	} catch (error) {
		console.error('Error:', error)
		res
			.status(500)
			.json({ success: false, error: 'Failed to fetch orders with cars' })
	} finally {
		client.release()
	}
})

orderRouter.post('/submit', async (req, res) => {
	const { sellerId, orderId } = req.body

	console.log(sellerId, orderId);
	const client = await startConnection()

	const query = `
    UPDATE zakaz SET seller_id = $1, zakaz_status = 'Подтвержден' WHERE zakaz_id = $2 
  `
	const values = [sellerId, orderId]
	
	try {
		const response = await client
			.query(query, values)
			.then(response => response.rows)
		console.log(response)
		res.send(response)
	} catch (error) {
		console.error('Error:', error)
		res
			.status(500)
			.json({ success: false, error: 'Failed to fetch orders with cars' })
	} finally {
		client.release()
	}
})

export { orderRouter }
