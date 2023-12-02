import express from 'express'
import startConnection from '../DataAccess/startConnection.js'

const queriesRouter = express.Router()

queriesRouter.get('/boats/names', async (req, res) => {
	const client = await startConnection()

	const query = `SELECT model_name FROM Boat`

	try {
		const response = await client.query(query).then(response => response.rows)
		res.send(response)
	} finally {
		client.release()
	}
})

queriesRouter.post('/legal', async (req, res) => {
	const { name } = req.body
	const client = await startConnection()

	console.log(name)
	const query = `SELECT
    Users.customer_name,
    Users.is_legal_entity,
    Boat.boat_id
FROM
    Users
JOIN
    Customers ON Users.user_id = Customers.user_id
JOIN
    CustomerOrder ON Customers.customer_id = CustomerOrder.customer_id
JOIN
    Orders ON CustomerOrder.order_id= Orders.order_id
JOIN
    OrderBoat ON Orders.order_id = OrderBoat.order_id
JOIN
    Boat ON OrderBoat.boat_id = Boat.boat_id
WHERE
    Boat.model_name = $1
    AND Users.is_legal_entity = true;
`
	const values = [name]

	try {
		const response = await client
			.query(query, values)
			.then(response => response.rows)
		res.send(response)
	} finally {
		client.release()
	}
})

queriesRouter.get('/sales', async (req, res) => {
	const { model_name, startDate, endDate } = req.query

	const client = await startConnection()

	const query = `SELECT
    Users.customer_name
FROM
    Users
JOIN
    Customers ON Users.user_id = Customers.user_id
JOIN
    CustomerOrder ON Customers.customer_id = CustomerOrder.customer_id
JOIN
    Orders ON CustomerOrder.order_id = Orders.order_id
JOIN
    OrderBoat ON Orders.order_id = OrderBoat.order_id
JOIN
    Boat ON OrderBoat.boat_id = Boat.boat_id
WHERE
    Boat.model_name = $1
    AND Orders.zakaz_date BETWEEN $2 AND $3
GROUP BY
    Users.customer_name;
`

	const values = [model_name, startDate, endDate]

	try {
		const response = await client
			.query(query, values)
			.then(response => response.rows)
			console.log(response);
		res.send(response)
	} finally {
		client.release()
	}
})

queriesRouter.get('/top', async (req, res) => {
	const client = await startConnection()

	const query = `SELECT
    Boat.model_name,
    COUNT(Orders.order_id) AS total_sales,
    MIN(Boat.price) AS price,
    Currency.currency
FROM
    Boat
JOIN
    OrderBoat ON Boat.boat_id = OrderBoat.boat_id
JOIN
    Orders ON OrderBoat.order_id = Orders.order_id
JOIN
    Currency ON Boat.currency_id = Currency.currency_id
WHERE
    Orders.zakaz_status = 'Отправлен'
GROUP BY
    Boat.model_name, Currency.currency
ORDER BY
    total_sales DESC, price
LIMIT
    10;
`
	try {
		const response = await client.query(query).then(response => response.rows)
		res.send(response)
	} finally {
		client.release()
	}
})

queriesRouter.post('/average', async (req, res) => {
	const { name } = req.body
	const client = await startConnection()

	const query = `SELECT
    COUNT(Orders.order_id) / COUNT(DISTINCT DATE_TRUNC('month', Orders.zakaz_date)) AS average_sales_per_month
FROM
    Orders
JOIN
    OrderBoat ON Orders.order_id = OrderBoat.order_id
JOIN
    Boat ON OrderBoat.boat_id = Boat.boat_id
WHERE 
    Orders.zakaz_status = 'Отправлен' AND Boat.model_name = $1
ORDER BY
    average_sales_per_month DESC;
`
	console.log(name)
	const values = [name]
	try {
		const response = await client
			.query(query, values)
			.then(response => response.rows)
		res.send(response)
	} catch (error) {
		console.error('Error executing query:', error)
		res
			.status(500)
			.send({ error: 'Failed to retrieve average sales per month' })
	} finally {
		client.release()
	}
})

queriesRouter.get('/customers', async (req, res) => {
	const client = await startConnection()

	const query = `SELECT 
    Users.customer_name,
    Users.is_legal_entity
FROM 
    Users
JOIN 
    Customers ON Users.user_id = Customers.user_id;
`

	try {
		const response = await client.query(query).then(response => response.rows)
		res.send(response)
	} finally {
		client.release()
	}
})

export default queriesRouter
