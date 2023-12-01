import express from 'express'
import startConnection from '../DataAccess/startConnection.js'

const queriesRouter = express.Router()

queriesRouter.get('/cars/names', async (req, res) => {
	const client = await startConnection()

	const query = `SELECT name FROM Car`

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
    Users.user_name,
    Users.is_legal_entity,
    Car.car_id
FROM
    Users
JOIN
    Client ON Users.user_id = Client.user_id
JOIN
    ClientZakaz ON Client.client_id = ClientZakaz.client_id
JOIN
    Zakaz ON ClientZakaz.zakaz_id = Zakaz.zakaz_id
JOIN
    CarZakaz ON Zakaz.zakaz_id = CarZakaz.zakaz_id
JOIN
    Car ON CarZakaz.car_id = Car.car_id
WHERE
    Car.name = $1
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
	const { name, startDate, endDate } = req.query

	const client = await startConnection()

	const query = `SELECT
        Users.user_name
      FROM
        Users
      JOIN
        Client ON Users.user_id = Client.user_id
      JOIN
        ClientZakaz ON Client.client_id = ClientZakaz.client_id
      JOIN
        Zakaz ON ClientZakaz.zakaz_id = Zakaz.zakaz_id
      JOIN
        CarZakaz ON Zakaz.zakaz_id = CarZakaz.zakaz_id
      JOIN
        Car ON CarZakaz.car_id = Car.car_id
      WHERE
        Car.name = $1
        AND Zakaz.zakaz_date BETWEEN $2 AND $3
      GROUP BY
        Users.user_name;`

	const values = [name, startDate, endDate]

	try {
		const response = await client
			.query(query, values)
			.then(response => response.rows)
		res.send(response)
	} finally {
		client.release()
	}
})

queriesRouter.get('/top', async (req, res) => {
	const client = await startConnection()

	const query = `SELECT
    Car.name AS model_name,
    COUNT(Zakaz.zakaz_id) AS total_sales,
    MIN(Car.price) AS price,
	Currency.currency
FROM
    Car
JOIN
    CarZakaz ON Car.car_id = CarZakaz.car_id
JOIN
    Zakaz ON CarZakaz.zakaz_id = Zakaz.zakaz_id
JOIN
    Currency ON Car.currency_id = Currency.currency_id
WHERE
    Zakaz.zakaz_status = 'Отправлен'
GROUP BY
    Car.name, Currency.currency
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
    COUNT(Zakaz.zakaz_id) / COUNT(DISTINCT DATE_TRUNC('month', Zakaz.zakaz_date)) AS average_sales_per_month
FROM
    Zakaz
JOIN
    CarZakaz ON Zakaz.zakaz_id = CarZakaz.zakaz_id
JOIN
    Car ON CarZakaz.car_id = Car.car_id
WHERE 
    Zakaz.zakaz_status = 'Отправлен' AND Car.name = $1
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

queriesRouter.get('/clients', async (req, res) => {
	const client = await startConnection()

	const query = `SELECT 
    Users.user_name,
    Users.is_legal_entity
FROM 
    Users
JOIN 
    Client ON Users.user_id = Client.user_id;
`

	try {
		const response = await client.query(query).then(response => response.rows)
		res.send(response)
	} finally {
		client.release()
	}
})

export default queriesRouter
