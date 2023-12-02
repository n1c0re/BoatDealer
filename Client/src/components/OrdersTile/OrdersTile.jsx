import React, { useContext, useState } from 'react'
import axios from 'axios'
import { AuthContext } from '../../AuthContext'

function OrdersTile({ order }) {
	const {
		order_id,
		seller_name,
		zakaz_date,
		zakaz_status,
		boat_id,
		boat_name,
		boat_price,
		boat_currency,
	} = order

	const { loggedInUser } = useContext(AuthContext)

	async function handleDeleteOrder() {
		console.log(order_id)
		try {
			await axios.delete(`http://localhost:4000/api/orders/`, {
				params: { orderId: order_id },
			})
		} catch (error) {
			console.error('Error:', error)
		}
	}

	async function handleSubmitOrder() {
		console.log(loggedInUser.seller_id, order_id)
		try {
			await axios.post(`http://localhost:4000/api/orders/submit`, {
				sellerId: loggedInUser.seller_id,
				orderId: order_id,
			})
		} catch (error) {
			console.error('Error:', error)
		}
	}

	const [suppliers, setSuppliers] = useState([])
	const [selectedSupplier, setSelectedSupplier] = useState(null)
	const [showSuppliersButtons, setShowSuppliersButtons] = useState(false)
	const [isSendingOrder, setIsSendingOrder] = useState(false)

	async function fetchSuppliers() {
		try {
			const response = await axios.get('http://localhost:4000/api/suppliers')
			setSuppliers(response.data)
			setShowSuppliersButtons(true)
		} catch (error) {
			console.error('Error fetching suppliers:', error)
		}
	}

	async function selectSupplier(supplier) {
		setSelectedSupplier(supplier)
		setShowSuppliersButtons(false)
		setIsSendingOrder(false)
			try {
				const response = await axios.post(
					'http://localhost:4000/api/agreement',
					{
						boatId: boat_id,
						supplierId: supplier.supplier_id,
						order_id: order_id,
					}
				)
				console.log('Agreement added:', response.data)
			} catch (error) {
				console.error('Error:', error)
			}
	}

	function cancelSendOrder() {
		setShowSuppliersButtons(false)
		setIsSendingOrder(false)
	}

	function handleSendOrder() {
		setIsSendingOrder(true)
		fetchSuppliers()
	}

	return (
		<div key={order_id} className='order-tile'>
			<p>{seller_name}</p>
			<p>{zakaz_date}</p>
			<p>{zakaz_status}</p>
			<p>{boat_name}</p>
			<p>
				{boat_price} {boat_currency}
			</p>
			{zakaz_status == 'В обработке' ? (
				<>
					{loggedInUser.user_type_id == 3 ? (
						<button onClick={handleSubmitOrder}>Подтвердить заказ</button>
					) : (
						<></>
					)}
					<button onClick={handleDeleteOrder}>Отменить заказ</button>
				</>
			) : (
				<>
					{loggedInUser.user_type_id == 1 ? (
						<>
							{zakaz_status !== 'Отправлен' && !isSendingOrder ? (
								<button onClick={handleSendOrder}>Отправить заказ</button>
							) : (
								showSuppliersButtons && (
									<div className='supplier-buttons'>
										<button onClick={cancelSendOrder}>Отмена</button>
									</div>
								)
							)}
						</>
					) : (
						<></>
					)}
				</>
			)}

			{showSuppliersButtons && (
				<div className='supplier-modal'>
					<h2>Выберите поставщика:</h2>
					<ul>
						{suppliers.map(supplier => (
							<li key={supplier.supplier_id}>
								<button onClick={() => selectSupplier(supplier)}>
									{supplier.supplier_name}
								</button>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	)
}

export default OrdersTile
