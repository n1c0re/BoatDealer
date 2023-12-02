import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './CustomersModal.css'

function CustomersModal() {
	const [customers, setClients] = useState([])

	useEffect(() => {
		async function getClients() {
			try {
				const response = await axios.get(
					'http://localhost:4000/api/queries/customers'
				)
				setClients(response.data)
			} catch (error) {
				console.error('Error fetching car names:', error)
			}
		}

		getClients()
	}, [])

	console.log(customers)

	return (
		<div className='customers-modal'>
			<div className='customers-list'>
				{customers.map(customer => (
					<div className='tile'>
						{customer.is_legal_entity ? (
							<p>{customer.customer_name} Юр.лицо</p>
						) : (
							<p>{customer.customer_name} Не юр.лицо</p>
						)}
					</div>
				))}
			</div>
		</div>
	)
}

export default CustomersModal
