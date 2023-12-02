import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import './Cabinet.css'
import { AuthContext } from '../../AuthContext'
import OrdersTile from '../OrdersTile/OrdersTile'

function Cabinet() {
	const { loggedInUser } = useContext(AuthContext)

	const [orders, setOrders] = useState([])

	const getCustomerOrders = async () => {
		try {
			const response = await axios.get(
				'http://localhost:4000/api/orders/customer',
				{
					params: {
						customer_id: loggedInUser.customer_id,
					},
				}
			)
			setOrders(response.data)
		} catch (error) {
			console.error('Error:', error)
		}
	}

	const getOrders = async () => {
		try {
			const response = await axios.get('http://localhost:4000/api/orders/')
			setOrders(response.data)
		} catch (error) {
			console.error('Error:', error)
		}
	}

	useEffect(() => {
		loggedInUser.user_type_id == 2 ? getCustomerOrders() : getOrders()
	}, [])

	console.log(orders)
	return (
		<div>
			<div className='orders-list'>
				{orders.map(order => (
					<OrdersTile order={order} />
				))}
			</div>
		</div>
	)
}

export default Cabinet
