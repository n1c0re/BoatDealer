import React, { useState } from 'react'
import axios from 'axios'
import './AdminPanel.css'
import AddBoatModal from '../AddBoatModal/AddBoatModal'
import OrdersModal from '../OrdersModal/OrdersModal'
import LegalEntityModal from '../LegalEntityModal/LegalEntityMOdal'
import BoatOrdersModal from '../BoatOrdersModal/BoatOrdersModal'
import TopBoatsModal from '../TopBoatsModal/TopBoatsModal'
import AverageModal from '../AverageModal/AverageModal'
import CustomersModal from '../CustomersModal/CustomersModal'

function AdminPanel() {
	const [showAddBoatModal, setShowAddBoatModal] = useState(false)
	const [showOrdersModal, setShowOrdersModal] = useState(false)
	const [showLegalEntityModal, setShowLegalEntityModal] = useState(false)
	const [showCarOrdersModal, setShowCarOrdersModal] = useState(false)
	const [showTopCarsModal, setShowTopCarsModal] = useState(false)
	const [showAverageModal, setShowAverageModal] = useState(false)
	const [showClientsModal, setShowClientsModal] = useState(false)

	const [newBoat, setNewBoat] = useState({
		boat_type_id: 1,
		engine_type_id: 1,
		manufacturer_count_id: 1,
		currency_id: 1,
	})

	const [filledFields, setFilledFields] = useState({
		model_name: false,
		engine_capacity: false,
		cylinder_count: false,
		engine_power: false,
		torque: false,
		max_speed: false,
		seating_capacity: false,
		length: false,
		width: false,
		height: false,
		fuel_consumption_90: false,
		fuel_consumption_120: false,
		boat_weight: false,
		manufacturer_country_id: false,
		manufacturer_name: false,
		keel_transom: false,
		keel_midsection: false,
		production_date: false,
		price: false,
		currency_id: false,
		boat_type_id: false,
		engine_type_id: false,
	})

	console.log(filledFields);

	const toggleAddCarModal = () => {
		setShowAddBoatModal(!showAddBoatModal)
		setShowOrdersModal(false)
		setShowLegalEntityModal(false)
		setShowCarOrdersModal(false)
		setShowTopCarsModal(false)
		setShowAverageModal(false)
		setShowClientsModal(false)
	}

	const toggleOrdersModal = () => {
		setShowAddBoatModal(false)
		setShowOrdersModal(!showOrdersModal)
		setShowLegalEntityModal(false)
		setShowCarOrdersModal(false)
		setShowTopCarsModal(false)
		setShowAverageModal(false)
		setShowClientsModal(false)
	}

	const toggleLegalEntityModal = () => {
		setShowAddBoatModal(false)
		setShowOrdersModal(false)
		setShowLegalEntityModal(!showLegalEntityModal)
		setShowCarOrdersModal(false)
		setShowTopCarsModal(false)
		setShowAverageModal(false)
		setShowClientsModal(false)
	}

	const toggleCarOrdersModal = () => {
		setShowAddBoatModal(false)
		setShowOrdersModal(false)
		setShowLegalEntityModal(false)
		setShowCarOrdersModal(!showCarOrdersModal)
		setShowTopCarsModal(false)
		setShowAverageModal(false)
		setShowClientsModal(false)
	}

	const toggleTopCarsModal = () => {
		setShowAddBoatModal(false)
		setShowOrdersModal(false)
		setShowLegalEntityModal(false)
		setShowCarOrdersModal(false)
		setShowTopCarsModal(!showTopCarsModal)
		setShowAverageModal(false)
		setShowClientsModal(false)
	}

	const toggleAverageModal = () => {
		setShowAddBoatModal(false)
		setShowOrdersModal(false)
		setShowLegalEntityModal(false)
		setShowCarOrdersModal(false)
		setShowTopCarsModal(false)
		setShowAverageModal(!showAverageModal)
		setShowClientsModal(false)
	}

	const toggleClientsModal = () => {
		setShowAddBoatModal(false)
		setShowOrdersModal(false)
		setShowLegalEntityModal(false)
		setShowCarOrdersModal(false)
		setShowTopCarsModal(false)
		setShowAverageModal(false)
		setShowClientsModal(!showClientsModal)
	}

	async function handleAddBoat(event) {
		event.preventDefault()
		try {
			await axios.post('http://localhost:4000/api/boats', newBoat)
			getCars()
		} catch (error) {
			console.error('Error:', error)
		}
	}

	function handleInputChange(event) {
		const { name, value } = event.target
		setNewBoat(prevState => ({
			...prevState,
			[name]: value,
		}))
		setFilledFields(prevState => ({
			...prevState,
			[name]: value !== '',
		}))
		console.log(newBoat)
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
				{showAddBoatModal && (
					<AddBoatModal
						getFieldClass={getFieldClass}
						areAllFieldsFilled={areAllFieldsFilled}
						handleInputChange={handleInputChange}
						handleAddBoat={handleAddBoat}
					/>
				)}

				{showOrdersModal && <OrdersModal />}
				{showLegalEntityModal && <LegalEntityModal />}
				{showCarOrdersModal && <BoatOrdersModal />}
				{showTopCarsModal && <TopBoatsModal />}
				{showAverageModal && <AverageModal />}
				{showClientsModal && <CustomersModal />}
			</div>
		</div>
	)
}

export default AdminPanel
