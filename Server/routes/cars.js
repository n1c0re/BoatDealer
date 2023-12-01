import express from 'express'
import startConnection from '../DataAccess/startConnection.js'

const carsRouter = express.Router()

//Все машины
carsRouter.get('/', async (req, res) => {
	const client = await startConnection()

	const query = `SELECT * FROM Car`

	try {
		const response = await client.query(query).then(response => response.rows)
		res.send(response)
	} finally {
		client.release()
	}
})

//Отдельная машина
carsRouter.get('/:carId', async (req, res) => {
	const { carId } = req.params
	console.log(carId)
	if (!Number.isInteger(parseInt(carId))) {
		return res.status(400).send({ error: 'Invalid carId' })
	}

	const client = await startConnection()

	const query = `SELECT
	Car.car_id,
    Car.engine_capacity,
    Car.cylinder_count,
    Car.engine_power,
    Car.torque,
    Car.max_speed,
    Car.acceleration_time,
    Car.production_date,
    Car.price,
	Currency.currency,
    Car.length,
    Car.width,
    Car.height,
    Car.track_fuel_consumption,
    Car.city_fuel_consumption,
    GearType.gear_type,
    BodyType.body_type,
    FuelType.fuel_type,
    CarBrand.carbrand,
    EquipmentType.equipment_type,
    Car.name
FROM
    Car
JOIN
    GearType ON Car.gear_type_id = GearType.gear_type_id
JOIN
    BodyType ON Car.body_type_id = BodyType.body_type_id
JOIN
    Currency ON Car.currency_id = Currency.currency_id
JOIN
    FuelType ON Car.fuel_type_id = FuelType.fuel_type_id
JOIN
    CarBrand ON Car.car_brand_id = CarBrand.car_brand_id
JOIN
    EquipmentType ON Car.equipment_type_id = EquipmentType.equipment_type_id
WHERE car_id = $1;`

	const values = [carId]

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

//Добавление машины
carsRouter.post('/', async (req, res) => {
	const {
		engine_capacity,
		cylinder_count,
		engine_power,
		torque,
		max_speed,
		acceleration_time,
		production_date,
		price,
		currency_id,
		length,
		width,
		height,
		track_fuel_consumption,
		city_fuel_consumption,
		gear_type_id,
		fuel_type_id,
		body_type_id,
		car_brand_id,
		equipment_type_id,
		name,
	} = req.body

	console.log(req.body)
	const client = await startConnection()

	const query = `INSERT INTO Car (engine_capacity, cylinder_count, engine_power, torque, max_speed, acceleration_time, production_date, price, currency_id, length, width, height, track_fuel_consumption, city_fuel_consumption, gear_type_id, fuel_type_id, body_type_id, car_brand_id, equipment_type_id, name) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)`
	const values = [
		engine_capacity,
		cylinder_count,
		engine_power,
		torque,
		max_speed,
		acceleration_time,
		production_date,
		price,
		currency_id,
		length,
		width,
		height,
		track_fuel_consumption,
		city_fuel_consumption,
		gear_type_id,
		fuel_type_id,
		body_type_id,
		car_brand_id,
		equipment_type_id,
		name,
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

//Удаление машины
carsRouter.delete('/:carId', async (req, res) => {
	const { carId } = req.params
	console.log(carId)
	if (!Number.isInteger(parseInt(carId))) {
		return res.status(400).send({ error: 'Invalid carId' })
	}

	const client = await startConnection()

	const query = `DELETE FROM Car WHERE car_id = $1;`

	const values = [carId]

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

export default carsRouter
