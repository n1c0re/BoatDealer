import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './BoatOrdersModal.css'

function BoatOrdersModal() {
	const [salesData, setSalesData] = useState([])
	const [startDate, setStartDate] = useState('')
	const [endDate, setEndDate] = useState('')
	const [selectedBoat, setSelectedBoat] = useState('')
	const [boatNames, setBoatNames] = useState([])
	const [showList, setShowList] = useState(false)

	async function fetchSalesData() {
		try {
			const response = await axios.get(
				'http://localhost:4000/api/queries/sales',
				{
					params: {
						model_name: selectedBoat,
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
					'http://localhost:4000/api/queries/boats/names'
				)
				setBoatNames(response.data)
			} catch (error) {
				console.error('Error fetching boat names:', error)
			}
		}

		fetchCarNames()
	}, [])

	function handleCarSelect(event) {
		setSelectedBoat(event.target.value)
		setShowList(false)
	}

	console.log(startDate, endDate)
	return (
		<div className='boat-orders-modal'>
			<select name='boat_id' onChange={handleCarSelect}>
				<option value=''>Выберите лодку</option>
				{boatNames.map(boat => (
					<option value={boat.model_name}>{boat.model_name}</option>
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
							<li key={sale.customer_name}>{sale.customer_name}</li>
						))}
					</ul>
				</div>
			)}
		</div>
	)
}

export default BoatOrdersModal
