import React, { useEffect, useState } from 'react'
import './BoatsCatalog.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function BoatsCatalog() {
	const [boats, setBoats] = useState([])

	const navigate = useNavigate()

	function handleBoatClick(boatId) {
		navigate(`/boat/${boatId}`)
	}

	const getboats = async () => {
		try {
			const response = await axios.get('http://localhost:4000/api/boats')
			setBoats(response.data)
		} catch (error) {
			console.error('Error:', error)
		}
	}

	useEffect(() => {
		getboats()
	}, [])

	console.log(boats);
	return (
		<div className='boat-catalog'>
			{boats.map(boat => (
				<div
					key={boat.boat_id}
					className='boat-tile'
					onClick={() => handleBoatClick(boat.boat_id)}
				>
					<h3>{boat.model_name}</h3>
					<p>Производитель: {boat.manufacturer_name}</p>
					<p>Цена: ${boat.price}</p>
					<p>Дата производства: {boat.production_date}</p>
				</div>
			))}
		</div>
	)
}

export default BoatsCatalog
