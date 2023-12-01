import React, {useEffect, useState} from 'react'
import OrdersTile from '../OrdersTile/OrdersTile'
import axios from 'axios'
import "../OrdersTile/OrdersTile.css"
function OrdersModal() {
	const [orders, setOrders] = useState([])

	const getOrders = async () => {
		try {
			const response = await axios.get('http://localhost:4000/api/orders/')
			setOrders(response.data)
		} catch (error) {
			console.error('Error:', error)
		}
	}

    useEffect(() => {
			getOrders()
		}, [])

	return (
		<div className='orders-modal'>
			<div className='orders-list'>
				{orders.map(order => (
					<OrdersTile order={order} />
				))}
			</div>
		</div>
	)
}

export default OrdersModal
