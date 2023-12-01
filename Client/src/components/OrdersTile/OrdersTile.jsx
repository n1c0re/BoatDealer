import React, { useContext, useState } from 'react'
import axios from 'axios'
import { AuthContext } from '../../AuthContext'

function OrdersTile({ order }) {
	const {
		zakaz_id,
		seller_name,
		zakaz_date,
		zakaz_status,
		car_id,
		car_name,
		car_price,
		currency,
	} = order

	const { loggedInUser } = useContext(AuthContext)

	async function handleDeleteOrder() {
		console.log(zakaz_id)
		try {
			await axios.delete(`http://localhost:4000/api/orders/`, {
				params: { orderId: zakaz_id },
			})
		} catch (error) {
			console.error('Error:', error)
		}
	}

	async function handleSubmitOrder() {
		console.log(loggedInUser.seller_id, zakaz_id)
		try {
			await axios.post(`http://localhost:4000/api/orders/submit`, {
				sellerId: loggedInUser.seller_id,
				orderId: zakaz_id,
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
						carId: car_id,
						supplierId: supplier.supplier_id,
						zakaz_id: zakaz_id
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
		<div key={zakaz_id} className='order-tile'>
			<p>{seller_name}</p>
			<p>{zakaz_date}</p>
			<p>{zakaz_status}</p>
			<p>{car_id}</p>
			<p>{car_name}</p>
			<p>
				{car_price} {currency}
			</p>
			{zakaz_status == 'В обработке' ? (
				<>
					{loggedInUser.user_type == 'Продавец' ? (
						<button onClick={handleSubmitOrder}>Подтвердить заказ</button>
					) : (
						<></>
					)}
					<button onClick={handleDeleteOrder}>Отменить заказ</button>
				</>
			) : (
				<>
					{loggedInUser.user_type == 'Админ' ? (
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
