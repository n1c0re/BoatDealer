import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './ClientsModal.css'

function ClientsModal() {
	const [clients, setClients] = useState([])

	useEffect(() => {
		async function getClients() {
			try {
				const response = await axios.get(
					'http://localhost:4000/api/queries/clients'
				)
				setClients(response.data)
			} catch (error) {
				console.error('Error fetching car names:', error)
			}
		}

		getClients()
	}, [])

	console.log(clients)

	return (
		<div className='clients-modal'>
			<div className='clients-list'>
				{clients.map(client => (
					<div className='tile'>
						{client.is_legal_entity ? (
							<p>{client.user_name} Юр.лицо</p>
						) : (
							<p>{client.user_name} Не юр.лицо</p>
						)}
					</div>
				))}
			</div>
		</div>
	)
}

export default ClientsModal
