import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './TopCarsModal.css'

function TopCarsModal() {
	const [topModels, setTopModels] = useState([])

	useEffect(() => {
		async function fetchTopModels() {
			try {
				const response = await axios.get(
					'http://localhost:4000/api/queries/top'
				)
				setTopModels(response.data)
			} catch (error) {
				console.error('Error fetching top models:', error)
			}
		}

		fetchTopModels()
	}, [])

	console.log(topModels)

	return (
		<div className='top-cars-modal'>
			<h2>Самая дешевая машина: </h2>
			<li>
				<strong>{topModels[0]?.model_name}</strong> - Всего продано:
				{topModels[0]?.total_sales} Цена: {topModels[0]?.price}{' '}
				{topModels[0]?.currency}
			</li>
			<h2>Самые продаваемые машины:</h2>
			<ul>
				{topModels.map((model, index) => (
					<li key={index}>
						<strong>{model.model_name}</strong> - Всего продано:
						{model.total_sales} Цена: {model.price} {model.currency}
					</li>
				))}
			</ul>
		</div>
	)
}

export default TopCarsModal
