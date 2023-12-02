import express from 'express'
import startConnection from '../DataAccess/startConnection.js'

const boatsRouter = express.Router()

//Все машины
boatsRouter.get('/', async (req, res) => {
	const client = await startConnection()

	const query = `SELECT * FROM Boat`

	try {
		const response = await client.query(query).then(response => response.rows)
		res.send(response)
	} finally {
		client.release()
	}
})

//Отдельная лодка
boatsRouter.get('/:boatId', async (req, res) => {
	const { boatId } = req.params
	console.log(boatId)
	if (!Number.isInteger(parseInt(boatId))) {
		return res.status(400).send({ error: 'Invalid boatId' })
	}

	const client = await startConnection()

	const query = `SELECT
    b.boat_id,
    b.model_name,
    b.engine_capacity,
    b.cylinder_count,
    b.engine_power,
    b.torque,
    b.max_speed,
    b.seating_capacity,
    b.length,
    b.width,
    b.height,
    b.fuel_consumption_90,
    b.fuel_consumption_120,
    b.boat_weight,
    m.manufacturer_name AS manufacturer,
    m.manufacturer_country_id AS manufacturer_country,
    b.keel_transom,
    b.keel_midsection,
    b.production_date,
    b.price,
    c.currency AS currency_type,
    bt.boat_type AS boat_type,
    et.engine_type AS engine_type
FROM Boat b
JOIN Manufacturer m ON b.manufacturer_country_id = m.manufacturer_country_id
JOIN Currency c ON b.currency_id = c.currency_id
JOIN BoatType bt ON b.boat_type_id = bt.boat_type_id
JOIN EngineType et ON b.engine_type_id = et.engine_type_id
WHERE b.boat_id = $1;
`

	const values = [boatId]

	console.log(values)
	try {
		const response = await client
			.query(query, values)
			.then(response => response.rows[0])

		if (response) {
			res.send(response)
		} else {
			res.status(404).send({ error: 'Car not found' })
		}
	} catch (error) {
		console.error('Error:', error)
		res.status(500).send({ error: 'Internal Server Error' })
	} finally {
		client.release()
	}
})

boatsRouter.post('/', async (req, res) => {
	const {
		model_name,
		engine_capacity,
		cylinder_count,
		engine_power,
		torque,
		max_speed,
		seating_capacity,
		length,
		width,
		height,
		fuel_consumption_90,
		fuel_consumption_120,
		boat_weight,
		manufacturer_country_id,
		manufacturer_name,
		keel_transom,
		keel_midsection,
		production_date,
		price,
		currency_id,
		boat_type_id,
		engine_type_id,
	} = req.body

	console.log(req.body)
	const client = await startConnection()

	const query = `INSERT INTO Boat (model_name, engine_capacity, cylinder_count, engine_power, torque, max_speed, seating_capacity, length, width, height, fuel_consumption_90, fuel_consumption_120, boat_weight, manufacturer_country_id, manufacturer_name, keel_transom, keel_midsection, production_date, price, currency_id, boat_type_id, engine_type_id)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22)`
	const values = [
		model_name,
		engine_capacity,
		cylinder_count,
		engine_power,
		torque,
		max_speed,
		seating_capacity,
		length,
		width,
		height,
		fuel_consumption_90,
		fuel_consumption_120,
		boat_weight,
		manufacturer_country_id,
		manufacturer_name,
		keel_transom,
		keel_midsection,
		production_date,
		price,
		currency_id,
		boat_type_id,
		engine_type_id,
	]

	console.log(values)

	try {
		const response = await client
			.query(query, values)
			.then(response => response.rows)
		console.log(response)
		return response
	} finally {
		client.release()
	}
})

boatsRouter.delete('/:boatId', async (req, res) => {
	const { boatId } = req.params
	console.log(boatId)
	if (!Number.isInteger(parseInt(boatId))) {
		return res.status(400).send({ error: 'Invalid boatId' })
	}

	const client = await startConnection()

	const query = `DELETE FROM Boat WHERE boat_id = $1;`

	const values = [boatId]

	try {
		const response = await client
			.query(query, values)
			.then(response => response.rows[0])

		if (response) {
			res.send(response)
		} else {
			res.status(404).send({ error: 'Car not found' })
		}
	} catch (error) {
		console.error('Error:', error)
		res.status(500).send({ error: 'Internal Server Error' })
	} finally {
		client.release()
	}
})

export default boatsRouter
