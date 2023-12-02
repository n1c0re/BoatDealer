import React, { useEffect, useState, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../../AuthContext'
import './BoatDetails.css'

function BoatDetails() {
	const { boatId } = useParams()
	const [boatData, setBoatData] = useState(null)
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

			const createdZakazId = zakazResponse.data.order_id

			console.log(createdZakazId)

			await axios.post(`http://localhost:4000/api/customerOrder`, {
				customer_id: loggedInUser.customer_id,
				order_id: createdZakazId,
			})

			await axios.post(`http://localhost:4000/api/orders/boat`, {
				car_id: boatId,
				order_id: createdZakazId,
			})
		} catch (error) {
			console.error('Error:', error)
		}
	}

	useEffect(() => {
		getboatData()
	}, [boatId])

	const getboatData = async () => {
		try {
			const response = await axios.get(
				`http://localhost:4000/api/boats/${boatId}`
			)
			setBoatData(response.data)
		} catch (error) {
			console.error('Error:', error)
		}
	}
	if (!boatData) {
		return <div>Loading...</div>
	}

	console.log(boatData.currency)

	async function handleDeleteBoat() {
		try {
			await axios.delete(`http://localhost:4000/api/boats/${boatId}`)
		} catch (error) {
			console.error('Error:', error)
		}
	}

	return (
		<div>
			<h2>{boatData.name}</h2>
			<p>Название модели: {boatData.model_name}</p>
			<p>Объем двигателя: {boatData.engine_capacity}</p>
			<p>Количество цилиндров: {boatData.cylinder_count}</p>
			<p>Мощность двигателя: {boatData.engine_power}</p>
			<p>Крутящий момент: {boatData.torque}</p>
			<p>Максимальная скорость: {boatData.max_speed}</p>
			<p>Количество мест: {boatData.seating_capacity}</p>
			<p>Длина: {boatData.length}</p>
			<p>Ширина: {boatData.width}</p>
			<p>Высота: {boatData.height}</p>
			<p>Расход топлива при 90км/ч: {boatData.fuel_consumption_90}</p>
			<p>Расход топлива при 120км/ч: {boatData.fuel_consumption_120}</p>
			<p>Вес: {boatData.boat_weight}</p>
			<p>Производитель: {boatData.manufacturer}</p>
			<p>Страна производства: {boatData.manufacturer_country}</p>
			<p>Килеватость на транце: {boatData.keel_transom}</p>
			<p>Килеватость на миделе: {boatData.keel_midsection}</p>
			<p>Дата производства: {boatData.production_date}</p>
			<p>
				Стоимость: {boatData.price}
				{boatData.currency_type}
			</p>
			<p>Тип лодки: {boatData.boat_type}</p>
			<p>Тип двигателя: {boatData.engine_type}</p>
			{loggedInUser.user_type_id == 1 ? (
				<Link to='/dashboard'>
					<button onClick={handleDeleteBoat}>Удалить</button>
				</Link>
			) : (
				<button onClick={handleOrder}>Заказать</button>
			)}
		</div>
	)
}

export default BoatDetails
