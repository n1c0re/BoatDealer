import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './AverageModal.css'

function AverageModal() {
	const [averageSales, setAverageSales] = useState([])
	const [boatNames, setBoatNames] = useState([])
	const [selectedCar, setSelectedCar] = useState('')
	const [showList, setShowList] = useState(false)

	function handleCarSelect(event) {
		setSelectedCar(event.target.value)
		setShowList(false)
	}

	async function getAverageSales() {
		try {
			const response = await axios.post(
				'http://localhost:4000/api/queries/average',
				{
					name: selectedCar,
				}
			)
			setAverageSales(response.data)
            console.log(response);
            setShowList(true)
		} catch (error) {
			setAverageSales([{ average_sales_per_month: 0 }])
			setShowList(true)
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
		setSelectedCar(event.target.value)
		setShowList(false)
	}

	console.log(averageSales)

	return (
		<div className='average-modal'>
			<label htmlFor='boatSelect'>Выберите лодку: </label>
			<select name='boat_id' onChange={handleCarSelect}>
				<option value=''>Выберите лодку</option>
				{boatNames.map(boat => (
					<option value={boat.model_name}>{boat.model_name}</option>
				))}
			</select>
			<button onClick={getAverageSales}>Получить</button>
			{showList && (
				// {}
				<div>
					<p>
						Среднее число продаж за месяц:{' '}
						{averageSales[0].average_sales_per_month}
					</p>
				</div>
			)}
		</div>
	)
}

export default AverageModal
