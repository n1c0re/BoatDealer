import React from 'react'
import './AddCarModal.css'

function AddCarModal(props) {
	return (
		<div className='add-car-modal'>
			<form>
				<input
					type='text'
					name='name'
					onChange={props.handleInputChange}
					placeholder='Название'
					className={props.getFieldClass('name')}
				/>
				<select
					name='car_brand_id'
					className={props.getFieldClass('car_brand_id')}
					onChange={props.handleInputChange}
				>
					<option value='1'>Франция</option>
					<option value='2'>Германия</option>
					<option value='3'>Швеция</option>
					<option value='4'>Россия</option>
					<option value='5'>Америка</option>
				</select>
				<input
					type='number'
					name='price'
					onChange={props.handleInputChange}
					placeholder='Стоимость'
					step='0.01'
					className={props.getFieldClass('price')}
				/>
				<select
					name='currency_id'
					className={props.getFieldClass('currency_id')}
					onChange={props.handleInputChange}
				>
					<option value='1'>USD</option>
					<option value='2'>EUR</option>
					<option value='3'>RUB</option>
					<option value='4'>BYN</option>
				</select>
				<select
					name='body_type_id'
					className={props.getFieldClass('body_type_id')}
					onChange={props.handleInputChange}
				>
					<option value='1'>Седан</option>
					<option value='2'>Хэтчбек</option>
					<option value='3'>Купе</option>
					<option value='4'>Лифтбэк</option>
					<option value='5'>Универсал</option>
				</select>
				<select
					name='gear_type_id'
					className={props.getFieldClass('gear_type_id')}
					onChange={props.handleInputChange}
				>
					<option value='1'>Автоматическая</option>
					<option value='2'>Механическая</option>
					<option value='3'>Вариатор</option>
				</select>
				<input
					type='number'
					name='engine_capacity'
					onChange={props.handleInputChange}
					placeholder='Объем двигателя'
					step='0.01'
					className={props.getFieldClass('engine_capacity')}
				/>
				<input
					type='number'
					name='cylinder_count'
					onChange={props.handleInputChange}
					placeholder='Количество цилиндров'
					step='1'
					className={props.getFieldClass('cylinder_count')}
				/>
				<input
					type='number'
					name='engine_power'
					onChange={props.handleInputChange}
					placeholder='Мощность двигателя'
					step='1'
					className={props.getFieldClass('engine_power')}
				/>
				<input
					type='number'
					name='torque'
					onChange={props.handleInputChange}
					placeholder='Крутящий момент'
					step='0.01'
					className={props.getFieldClass('torque')}
				/>
				<input
					type='number'
					name='max_speed'
					onChange={props.handleInputChange}
					placeholder='Максимальная скорость'
					step='1'
					className={props.getFieldClass('max_speed')}
				/>
				<input
					type='number'
					name='acceleration_time'
					onChange={props.handleInputChange}
					placeholder='Скорость разгона'
					step='0.01'
					className={props.getFieldClass('acceleration_time')}
				/>
				<input
					type='datetime-local'
					name='production_date'
					onChange={props.handleInputChange}
					placeholder='Дата производства'
					className={props.getFieldClass('production_date')}
				/>
				<input
					type='number'
					name='length'
					onChange={props.handleInputChange}
					placeholder='Длина'
					step='0.01'
					className={props.getFieldClass('length')}
				/>
				<input
					type='number'
					name='width'
					onChange={props.handleInputChange}
					placeholder='Ширина'
					step='0.01'
					className={props.getFieldClass('width')}
				/>
				<input
					type='number'
					name='height'
					onChange={props.handleInputChange}
					placeholder='Высота'
					step='0.01'
					className={props.getFieldClass('height')}
				/>
				<input
					type='number'
					name='track_fuel_consumption'
					onChange={props.handleInputChange}
					placeholder='Расход по трассе'
					step='0.01'
					className={props.getFieldClass('track_fuel_consumption')}
				/>
				<input
					type='number'
					name='city_fuel_consumption'
					onChange={props.handleInputChange}
					placeholder='Расход по городу'
					step='0.01'
					className={props.getFieldClass('city_fuel_consumption')}
				/>
				<select
					name='fuel_type_id'
					className={props.getFieldClass('fuel_type_id')}
					onChange={props.handleInputChange}
				>
					<option value='1'>Бензин</option>
					<option value='2'>Дизель</option>
					<option value='3'>Электричество</option>
					<option value='4'>Газ</option>
				</select>
				<select
					name='equipment_type_id'
					className={props.getFieldClass('equipment_type_id')}
					onChange={props.handleInputChange}
				>
					<option value='1'>Базовая</option>
					<option value='2'>Средняя</option>
					<option value='3'>Максимальная</option>
				</select>
				<button
					onClick={props.handleAddCar}
					disabled={!props.areAllFieldsFilled()}
				>
					Добавить
				</button>
			</form>
		</div>
	)
}

export default AddCarModal
