import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './LegalEntityModal.css'

function LegalEntityModal() {
	const [boatNames, setBoatNames] = useState([])
	const [selectedCar, setSelectedCar] = useState('')
	const [list, setList] = useState([])
	const [showList, setShowList] = useState(false)

	async function getLegalEntityList() {
		try {
			const response = await axios.post(
				'http://localhost:4000/api/queries/legal',
				{
					name: selectedCar,
				}
			)
			setList(response.data)
			setShowList(true)
		} catch (error) {
			console.error('Error fetching boat names:', error)
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

	console.log(boatNames)
	console.log(list)

	return (
		<div className='legal-entity-modal'>
			<label htmlFor='boatSelect'>Выберите лодку: </label>
			<select name='boat_id' onChange={handleCarSelect}>
				<option value=''>Выберите лодку</option>
				{boatNames.map(boat => (
					<option value={boat.model_name}>{boat.model_name}</option>
				))}
			</select>
			<button onClick={getLegalEntityList}>Получить</button>
			{showList && (
				<div>
					<p>Перечень юридических лиц (всего {list.length}):</p>
					<ul>
						{list.map(list => (
							<li key={list.user_name}>{list.customer_name}</li>
						))}
					</ul>
				</div>
			)}
		</div>
	)
}

export default LegalEntityModal
