import React from 'react';
import styles from './addRoom.module.scss';
import axios from '../../axios';
import { Navigate } from 'react-router-dom';
import logoPrev from '../../assets/images/logo.svg';

type addRoomProps = {
	title: string;
	preferredSport: string;
	date: string;
	time: string;
	place: string;
};

const AddRoom = () => {
	const [title, setTitle] = React.useState('');
	const [preferredSport, setPreferredSport] = React.useState('');
	const [date, setDate] = React.useState('');
	const [time, setTime] = React.useState('');
	const [place, setPlace] = React.useState('');

	//ошибки
	const [errorTitle, setErrorTitle] = React.useState('');
	const [errorPreferredSport, setErrorPreferredSport] = React.useState('');
	const [errorDate, setErrorDate] = React.useState('');
	const [errorTime, setErrorTime] = React.useState('');
	const [errorPlace, setErrorPlace] = React.useState('');

	const [toRoomPage, setToRoomPage] = React.useState('');

	const [formValid, setFormValid] = React.useState(false);

	//проверка на валидность формы
	React.useEffect(() => {
		if (errorTitle || errorPreferredSport || errorDate || errorTime || errorPlace) {
			setFormValid(false);
		} else {
			setFormValid(true);
		}
	}, [errorTitle, errorPreferredSport, errorDate, errorTime, errorPlace]);

	const onChangeValue = (e: any) => {
		switch (e.target.name) {
			case 'title':
				setTitle(e.target.value);

				if (!e.target.value) {
					setErrorTitle('Поле является обязательным');
				} else {
					setErrorTitle('');
				}

				break;
			case 'preferredSport':
				setPreferredSport(e.target.value);

				if (!e.target.value) {
					setErrorPreferredSport('Поле является обязательным');
				} else {
					setErrorPreferredSport('');
				}

				break;
			case 'date':
				setDate(e.target.value);

				if (!e.target.value) {
					setErrorDate('Поле является обязательным');
				} else {
					setErrorDate('');
				}

				break;

			case 'time':
				setTime(e.target.value);

				if (!e.target.value) {
					setErrorTime('Поле является обязательным');
				} else {
					setErrorTime('');
				}

				break;
			case 'place':
				setPlace(e.target.value);

				if (!e.target.value) {
					setErrorPlace('Поле является обязательным');
				} else {
					setErrorPlace('');
				}

				break;

			default:
				console.log('err');
				break;
		}
	};

	const onSubmit = async () => {
		const addRoomData: addRoomProps = {
			title,
			preferredSport,
			date,
			time,
			place,
		};

		if (formValid) {
			await axios
				.post(`/rooms`, addRoomData)
				.then((res) => {
					setToRoomPage(res.data._id);
				})
				.then(() => {
					//очитска формы
					setTitle('');
					setPreferredSport('');
					setDate('');
					setTime('');
					setPlace('');
					//очистка ошибок
					setErrorTitle('');
					setErrorPreferredSport('');
					setErrorDate('');
					setErrorTime('');
					setErrorPlace('');
				})

				.catch((err) => {
					console.warn(err);
					alert('Ошибка при создании комнаты');
				})
				.finally(() => {
					//setIsLoading(false);
				});

			//если пользователь нажмет сабмит с незаполненным полем
			if (title == '') {
				setErrorTitle('Поле является обязательным');
			}

			if (preferredSport == '') {
				setErrorPreferredSport('Поле является обязательным');
			}

			if (date == '') {
				setErrorDate('Поле является обязательным');
			}
			if (time == '') {
				setErrorTime('Поле является обязательным');
			}
			if (place == '') {
				setErrorPlace('Поле является обязательным');
			}
		}
	};

	return (
		<>
			{toRoomPage != '' && <Navigate to={`/rooms/${toRoomPage}`} />}
			<section className={styles.wrapper}>
				<div>
					<h2>Создание комнаты</h2>
					<div className={styles.logoPrev}>
						<img src={logoPrev} alt="logo" />
					</div>
					{/*<button className={styles.btn_red}>Удалить комнату</button>*/}
				</div>
				<div className={styles.options}>
					<label htmlFor=""> Название комнаты</label>
					{errorTitle && (
						<div
							style={{ color: 'red', fontSize: '0.8rem', textAlign: 'center', marginTop: '-14px' }}>
							{errorTitle}
						</div>
					)}
					<input
						name="title"
						type="text"
						placeholder="Введите название комнаты"
						value={title}
						onChange={(e) => onChangeValue(e)}
					/>

					<label htmlFor="">Вид спорта</label>
					{errorPreferredSport && (
						<div
							style={{ color: 'red', fontSize: '0.8rem', textAlign: 'center', marginTop: '-14px' }}>
							{errorPreferredSport}
						</div>
					)}
					<input
						name="preferredSport"
						type="text"
						placeholder="Вид спорта"
						value={preferredSport}
						onChange={(e) => onChangeValue(e)}
					/>

					<label htmlFor="">Дата</label>
					{errorDate && (
						<div
							style={{ color: 'red', fontSize: '0.8rem', textAlign: 'center', marginTop: '-14px' }}>
							{errorDate}
						</div>
					)}
					<input
						name="date"
						type="date"
						placeholder=""
						value={date}
						onChange={(e) => onChangeValue(e)}
					/>

					<label htmlFor="">Время</label>
					{errorTime && (
						<div
							style={{ color: 'red', fontSize: '0.8rem', textAlign: 'center', marginTop: '-14px' }}>
							{errorTime}
						</div>
					)}
					<input name="time" type="time" value={time} onChange={(e) => onChangeValue(e)} />

					<label htmlFor="">Площадка</label>
					{errorPlace && (
						<div
							style={{ color: 'red', fontSize: '0.8rem', textAlign: 'center', marginTop: '-14px' }}>
							{errorPlace}
						</div>
					)}
					<input
						name="place"
						type="text"
						placeholder="Введите адрес"
						value={place}
						onChange={(e) => onChangeValue(e)}
					/>

					<button disabled={!formValid} className={styles.btn} onClick={onSubmit}>
						Создать комнату
					</button>
				</div>
			</section>
		</>
	);
};

export default AddRoom;
