import React, { useEffect, useState } from 'react'
import './CarCatalog.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function CarCatalog() {
	const [cars, setCars] = useState([])

	const navigate = useNavigate()

	function handleCarClick(carId) {
		navigate(`/car/${carId}`)
	}

	const getCars = async () => {
		try {
			const response = await axios.get('http://localhost:4000/api/cars')
			setCars(response.data)
		} catch (error) {
			console.error('Error:', error)
		}
	}

	useEffect(() => {
		getCars()
	}, [])

	return (
		<div className='car-catalog'>
			{cars.map(car => (
				<div
					key={car.car_id}
					className='car-tile'
					onClick={() => handleCarClick(car.car_id)}
				>
					<h3>{car.name}</h3>
					<p>Производитель: {car.car_brand_id}</p>
					<p>Цена: ${car.price}</p>
				</div>
			))}
		</div>
	)
}

export default CarCatalog
