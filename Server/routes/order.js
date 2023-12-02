import express from 'express'
import startConnection from '../DataAccess/startConnection.js'

const orderRouter = express.Router()

const client = await startConnection()

orderRouter.post('/', async (req, res) => {
	const { seller_id, zakaz_date, zakaz_status } = req.body

	const query = `INSERT INTO Orders (seller_id, zakaz_date, zakaz_status) VALUES ($1, $2, $3) RETURNING order_id`
	const values = [seller_id, zakaz_date, zakaz_status]

	try {
		const response = await client
			.query(query, values)
			.then(response => response.rows)

		const insertedZakazId = response[0].order_id

		res.json({ success: true, order_id: insertedZakazId })
	} catch (error) {
		console.error('Error:', error)
		res
			.status(500)
			.json({ success: false, error: 'Failed to create Zakaz record' })
	}
})

orderRouter.post('/boat', async (req, res) => {
	const { car_id, order_id } = req.body

	const query = `INSERT INTO OrderBoat (boat_id, order_id) VALUES ($1, $2)`
	const values = [car_id, order_id]

	try {
		const response = await client
			.query(query, values)
			.then(response => response.rows)
		return response
	} catch (error) {
		console.error('Error:', error)
	}
})

orderRouter.get('/customer', async (req, res) => {
	const { customer_id } = req.query

	console.log('customer_id: ', customer_id)

	if (!customer_id) {
		return res
			.status(400)
			.json({ success: false, error: 'User ID is required' })
	}

	const client = await startConnection()

	const query = `
    SELECT 
    Orders.order_id,
    Customers.customer_id,
    Orders.seller_id,
    Sellers.seller_name,
    Orders.zakaz_date,
    Orders.zakaz_status,
    Boat.model_name AS boat_name,
    Boat.price AS boat_price,
    Boat.boat_id,
    Currency.currency AS boat_currency
FROM Customers
INNER JOIN Users ON Customers.user_id = Users.user_id
INNER JOIN CustomerOrder ON Customers.customer_id = CustomerOrder.customer_id
INNER JOIN Orders ON CustomerOrder.order_id = Orders.order_id
INNER JOIN Seller Sellers ON Orders.seller_id = Sellers.seller_id
INNER JOIN OrderBoat ON Orders.order_id = OrderBoat.order_id
INNER JOIN Boat ON OrderBoat.boat_id = Boat.boat_id
INNER JOIN Currency ON Boat.currency_id = Currency.currency_id
WHERE Customers.customer_id = $1;
  `
	const values = [customer_id]

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
        DELETE FROM OrderBoat WHERE order_id = $1;
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
    Orders.order_id,
    Customers.customer_id,
    Orders.seller_id,
    Sellers.seller_name,
    Orders.zakaz_date,
    Orders.zakaz_status,
    Boat.model_name AS boat_name,
    Boat.price AS boat_price,
    Boat.boat_id,
    Currency.currency AS boat_currency
FROM Customers
INNER JOIN Users ON Customers.user_id = Users.user_id
INNER JOIN CustomerOrder ON Customers.customer_id = CustomerOrder.customer_id
INNER JOIN Orders ON CustomerOrder.order_id = Orders.order_id
INNER JOIN Seller Sellers ON Orders.seller_id = Sellers.seller_id
INNER JOIN OrderBoat ON Orders.order_id = OrderBoat.order_id
INNER JOIN Boat ON OrderBoat.boat_id = Boat.boat_id
INNER JOIN Currency ON Boat.currency_id = Currency.currency_id
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

	console.log(sellerId, orderId)
	const client = await startConnection()

	const query = `
    UPDATE Orders SET seller_id = $1, zakaz_status = 'Подтвержден' WHERE order_id = $2 
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
