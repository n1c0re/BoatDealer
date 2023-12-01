import React, { useState } from 'react'
import axios from 'axios'
import './AdminPanel.css'
import AddCarModal from '../AddCarModal/AddCarModal'
import OrdersModal from '../OrdersModal/OrdersModal'
import LegalEntityModal from '../LegalEntityModal/LegalEntityMOdal'
import CarOrdersModal from '../CarOrdersModal/CarOrdersModal'
import TopCarsModal from '../TopCarsModal/TopCarsModal'
import AverageModal from '../AverageModal/AverageModal'
import ClientsModal from '../ClientsModal/ClientsModal'

function AdminPanel() {
	const [showAddCarModal, setShowAddCarModal] = useState(false)
	const [showOrdersModal, setShowOrdersModal] = useState(false)
	const [showLegalEntityModal, setShowLegalEntityModal] = useState(false)
	const [showCarOrdersModal, setShowCarOrdersModal] = useState(false)
	const [showTopCarsModal, setShowTopCarsModal] = useState(false)
	const [showAverageModal, setShowAverageModal] = useState(false)
	const [showClientsModal, setShowClientsModal] = useState(false)

	const [newCar, setNewCar] = useState({
		car_brand_id: 1,
		body_type_id: 1,
		gear_type_id: 1,
		fuel_type_id: 1,
		equipment_type_id: 1,
		currency_id: 1,
	})

	const [filledFields, setFilledFields] = useState({
		name: false,
		car_brand_id: false,
		price: false,
		currency_id: false,
		body_type_id: false,
		gear_type_id: false,
		engine_capacity: false,
		cylinder_count: false,
		engine_power: false,
		torque: false,
		max_speed: false,
		acceleration_time: false,
		production_date: false,
		length: false,
		width: false,
		height: false,
		track_fuel_consumption: false,
		city_fuel_consumption: false,
		fuel_type_id: false,
		equipment_type_id: false,
	})

	const toggleAddCarModal = () => {
		setShowAddCarModal(!showAddCarModal)
		setShowOrdersModal(false)
		setShowLegalEntityModal(false)
		setShowCarOrdersModal(false)
		setShowTopCarsModal(false)
		setShowAverageModal(false)
		setShowClientsModal(false)
	}

	const toggleOrdersModal = () => {
		setShowAddCarModal(false)
		setShowOrdersModal(!showOrdersModal)
		setShowLegalEntityModal(false)
		setShowCarOrdersModal(false)
		setShowTopCarsModal(false)
		setShowAverageModal(false)
		setShowClientsModal(false)
	}

	const toggleLegalEntityModal = () => {
		setShowAddCarModal(false)
		setShowOrdersModal(false)
		setShowLegalEntityModal(!showLegalEntityModal)
		setShowCarOrdersModal(false)
		setShowTopCarsModal(false)
		setShowAverageModal(false)
		setShowClientsModal(false)
	}

	const toggleCarOrdersModal = () => {
		setShowAddCarModal(false)
		setShowOrdersModal(false)
		setShowLegalEntityModal(false)
		setShowCarOrdersModal(!showCarOrdersModal)
		setShowTopCarsModal(false)
		setShowAverageModal(false)
		setShowClientsModal(false)
	}

	const toggleTopCarsModal = () => {
		setShowAddCarModal(false)
		setShowOrdersModal(false)
		setShowLegalEntityModal(false)
		setShowCarOrdersModal(false)
		setShowTopCarsModal(!showTopCarsModal)
		setShowAverageModal(false)
		setShowClientsModal(false)
	}

	const toggleAverageModal = () => {
		setShowAddCarModal(false)
		setShowOrdersModal(false)
		setShowLegalEntityModal(false)
		setShowCarOrdersModal(false)
		setShowTopCarsModal(false)
		setShowAverageModal(!showAverageModal)
		setShowClientsModal(false)
	}

	const toggleClientsModal = () => {
		setShowAddCarModal(false)
		setShowOrdersModal(false)
		setShowLegalEntityModal(false)
		setShowCarOrdersModal(false)
		setShowTopCarsModal(false)
		setShowAverageModal(false)
		setShowClientsModal(!showClientsModal)
	}

	async function handleAddCar(event) {
		event.preventDefault()
		try {
			await axios.post('http://localhost:4000/api/cars', newCar)
			getCars()
		} catch (error) {
			console.error('Error:', error)
		}
	}

	function handleInputChange(event) {
		const { name, value } = event.target
		setNewCar(prevState => ({
			...prevState,
			[name]: value,
		}))
		setFilledFields(prevState => ({
			...prevState,
			[name]: value !== '',
		}))
		console.log(newCar)
	}

	function areAllFieldsFilled() {
		return Object.values(filledFields).every(value => value)
	}

	function getFieldClass(fieldName) {
		return filledFields[fieldName] ? '' : 'field-not-filled'
	}

	return (
		<div>
			<div className='admin-buttons'>
				<button onClick={toggleAddCarModal}>Добавить машину</button>
				<button onClick={toggleOrdersModal}>Заказы</button>
				<button onClick={toggleLegalEntityModal}>Перечень юр.лиц</button>
				<button onClick={toggleCarOrdersModal}>
					Перечень с определенной машиной
				</button>
				<button onClick={toggleTopCarsModal}>Самые продаваемые машины</button>
				<button onClick={toggleAverageModal}>Средние продажи</button>
				<button onClick={toggleClientsModal}>Клиенты</button>
			</div>

			<div className='modal'>
				{showAddCarModal && (
					<AddCarModal
						getFieldClass={getFieldClass}
						areAllFieldsFilled={areAllFieldsFilled}
						handleInputChange={handleInputChange}
						handleAddCar={handleAddCar}
					/>
				)}

				{showOrdersModal && <OrdersModal />}
				{showLegalEntityModal && <LegalEntityModal />}
				{showCarOrdersModal && <CarOrdersModal />}
				{showTopCarsModal && <TopCarsModal />}
				{showAverageModal && <AverageModal />}
				{showClientsModal && <ClientsModal />}
			</div>
		</div>
	)
}

export default AdminPanel
