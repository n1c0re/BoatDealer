import React, { useEffect, useState, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../../AuthContext'

function CarDetails() {
	const { carId } = useParams()
	const [carData, setcarData] = useState(null)
	let currency
	const { loggedInUser } = useContext(AuthContext)

	async function handleOrder() {
		try {
			const zakazResponse = await axios.post(
				`http://localhost:4000/api/orders`,
				{
					seller_id: 1,
					zakaz_date: new Date(),
					zakaz_status: 'В обработке',
				}
			)

			const createdZakazId = zakazResponse.data.zakaz_id

			console.log(createdZakazId);
			
			await axios.post(`http://localhost:4000/api/clientZakaz`, {
				client_id: loggedInUser.client_id,
				zakaz_id: createdZakazId,
			})

			await axios.post(`http://localhost:4000/api/orders/car`, {
				car_id: carId,
				zakaz_id: createdZakazId,
			})

		} catch (error) {
			console.error('Error:', error)
		}
	}

	useEffect(() => {
		getcarData()
	}, [carId])

	const getcarData = async () => {
		try {
			const response = await axios.get(
				`http://localhost:4000/api/cars/${carId}`
			)
			setcarData(response.data)
		} catch (error) {
			console.error('Error:', error)
		}
	}
	if (!carData) {
		return <div>Loading...</div>
	}

	console.log(carData.currency)

	switch (carData.currency) {
		case 'RUB': {
			currency = <p>Стоимость: {carData.price}&#8381;</p>
			break
		}
		case 'USD': {
			currency = <p>Стоимость: {carData.price}&#36;</p>
			break
		}
		case 'EUR': {
			currency = <p>Стоимость: {carData.price}&#8364;</p>
			break
		}
		case 'BYN': {
			currency = <p>Стоимость: {carData.price}BYN</p>
			break
		}
	}

	async function handleDeleteCar() {
		try {
			await axios.delete(`http://localhost:4000/api/cars/${carId}`)
		} catch (error) {
			console.error('Error:', error)
		}
	}

	return (
		<div>
			<h2>{carData.name}</h2>
			<p>Производитель: {carData.carbrand}</p>
			{currency}
			<p>Тип кузова: {carData.body_type}</p>
			<p>Коробка передач: {carData.gear_type}</p>
			<p>Объем двигателя: {carData.engine_capacity}л</p>
			<p>Количество цилиндров: {carData.cylinder_count}</p>
			<p>Мощность двигателя: {carData.engine_power}</p>
			<p>Крутящий момент: {carData.torque}</p>
			<p>Максимальная скорость: {carData.max_speed}</p>
			<p>Время разгона(0-100 км/ч): {carData.acceleration_time}</p>
			<p>Дата производства: {carData.production_date}</p>
			<p>Длина: {carData.length}м</p>
			<p>Ширина: {carData.width}м</p>
			<p>Высота: {carData.height}м</p>
			<p>Расход по трассе: {carData.track_fuel_consumption}л</p>
			<p>Расход по городу: {carData.city_fuel_consumption}л</p>
			<p>Топливо: {carData.fuel_type}</p>
			<p>Комплектация: {carData.equipment_type}</p>
			{loggedInUser.user_type == 'Админ' ? (
				<Link to='/dashboard'>
					<button onClick={handleDeleteCar}>Удалить машину</button>
				</Link>
			) : (
				<button onClick={handleOrder}>Заказать</button>
			)}
		</div>
	)
}

export default CarDetails
