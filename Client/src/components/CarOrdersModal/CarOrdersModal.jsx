import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './CarOrdersModal.css'

function CarOrdersModal() {
	const [salesData, setSalesData] = useState([])
	const [startDate, setStartDate] = useState('')
	const [endDate, setEndDate] = useState('')
	const [selectedCar, setSelectedCar] = useState('')
	const [carNames, setCarNames] = useState([])
	const [showList, setShowList] = useState(false)

	async function fetchSalesData() {
		try {
			const response = await axios.get(
				'http://localhost:4000/api/queries/sales',
				{
					params: {
						name: selectedCar,
						startDate,
						endDate,
					},
				}
			)
			setSalesData(response.data)
			setShowList(true)
		} catch (error) {
			console.error('Error fetching sales data:', error)
		}
	}

	useEffect(() => {
		async function fetchCarNames() {
			try {
				const response = await axios.get(
					'http://localhost:4000/api/queries/cars/names'
				)
				setCarNames(response.data)
			} catch (error) {
				console.error('Error fetching car names:', error)
			}
		}

		fetchCarNames()
	}, [])

	function handleCarSelect(event) {
		setSelectedCar(event.target.value)
		setShowList(false)
	}

	console.log(startDate, endDate)
	return (
		<div className='car-orders-modal'>
			<select name='car_id' onChange={handleCarSelect}>
				<option value=''>Выберите машину</option>
				{carNames.map(car => (
					<option value={car.name}>{car.name}</option>
				))}
			</select>
			<input
				type='date'
				placeholder='Начальная дата'
				value={startDate}
				onChange={e => setStartDate(e.target.value)}
			/>
			<input
				type='date'
				placeholder='Конечная дата'
				value={endDate}
				onChange={e => setEndDate(e.target.value)}
			/>
			<button onClick={fetchSalesData}>Получить данные о продажах</button>

			{showList && (
				<div>
					<p>Общее число покупок: {salesData.length}</p>
					<ul>
						{salesData.map(sale => (
							<li key={sale.user_name}>{sale.user_name}</li>
						))}
					</ul>
				</div>
			)}
		</div>
	)
}

export default CarOrdersModal
