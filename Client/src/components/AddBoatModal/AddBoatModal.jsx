import React from 'react'
import './AddBoatModal.css'

function AddBoatModal(props) {
	return (
		<div className='add-boat-modal'>
			<form>
				<input
					type='text'
					name='model_name'
					onChange={props.handleInputChange}
					placeholder='Название модели'
					className={props.getFieldClass('model_name')}
				/>
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
					name='seating_capacity'
					onChange={props.handleInputChange}
					placeholder='Количество сидений'
					step='1'
					className={props.getFieldClass('seating_capacity')}
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
					name='fuel_consumption_90'
					onChange={props.handleInputChange}
					placeholder='Расход при 90 км/ч'
					step='0.01'
					className={props.getFieldClass('fuel_consumption_90')}
				/>
				<input
					type='number'
					name='fuel_consumption_120'
					onChange={props.handleInputChange}
					placeholder='Расход при 120 км/ч'
					step='0.01'
					className={props.getFieldClass('fuel_consumption_120')}
				/>
				<input
					type='number'
					name='boat_weight'
					onChange={props.handleInputChange}
					placeholder='Вес'
					step='0.01'
					className={props.getFieldClass('boat_weight')}
				/>
				<input
					type='text'
					name='manufacturer_name'
					onChange={props.handleInputChange}
					placeholder='Производитель'
					className={props.getFieldClass('manufacturer_name')}
				/>
				<select
					name='manufacturer_country_id'
					className={props.getFieldClass('manufacturer_country_id')}
					onChange={props.handleInputChange}
				>
					<option value='1'>США</option>
					<option value='2'>Германия</option>
					<option value='3'>Италия</option>
				</select>
				<input
					type='number'
					name='keel_transom'
					onChange={props.handleInputChange}
					placeholder='Килеватость на транце'
					step='1'
					className={props.getFieldClass('keel_transom')}
				/>
				<input
					type='number'
					name='keel_midsection'
					onChange={props.handleInputChange}
					placeholder='Килеватость на миделе'
					step='1'
					className={props.getFieldClass('keel_midsection')}
				/>
				<input
					type='date'
					name='production_date'
					onChange={props.handleInputChange}
					placeholder='Дата производства'
					className={props.getFieldClass('production_date')}
				/>
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
					<option value='3'>BYN</option>
				</select>
				<select
					name='boat_type_id'
					className={props.getFieldClass('boat_type_id')}
					onChange={props.handleInputChange}
				>
					<option value='1'>Скоростной катер</option>
					<option value='2'>Яхта</option>
					<option value='3'>Лодка</option>
					<option value='4'>Катамаран</option>
				</select>
				<select
					name='engine_type_id'
					className={props.getFieldClass('engine_type_id')}
					onChange={props.handleInputChange}
				>
					<option value='1'>Дизельный</option>
					<option value='2'>Бензиновый</option>
					<option value='3'>Электрический</option>
				</select>
				<button
					onClick={props.handleAddBoat}
					disabled={!props.areAllFieldsFilled()}
				>
					Добавить
				</button>
			</form>
		</div>
	)
}

export default AddBoatModal
