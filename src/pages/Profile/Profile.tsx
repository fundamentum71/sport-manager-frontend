import React from 'react';
import styles from './profile.module.scss';
import avatar from '../../assets/images/avatar.jpg';
import { Link, Navigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import { selectIsAuth } from '../../redux/auth/slice';
import CloseIcon from '@mui/icons-material/Close';

function Profile() {
	const dataUser = useAppSelector((store) => store.auth.data);
	const LoadedDataUser = useAppSelector((store) => store.auth.status);
	const isAuth = useAppSelector(selectIsAuth);
	const [fullPhoto, setFullPhoto] = React.useState(false);

	if (!isAuth) {
		return <Navigate to="/start" />;
	}

	return (
		<>
			<div className={styles.wrapper}>
				{fullPhoto && (
					<div className={styles.fullPhoto}>
						{dataUser?.avatarUrl ? (
							<img
								className={styles.photoAvatar_img}
								src={`http://localhost:4444${dataUser?.avatarUrl}`}
							/>
						) : (
							<img className={styles.photoAvatar_img} src={avatar} />
						)}
						<div className={styles.cancel} onClick={() => setFullPhoto(false)}>
							<CloseIcon />
						</div>
					</div>
				)}
				<div className={styles.row_menu}>
					<div className={styles.menu_item}>Об аккаунте</div>
				</div>
				<div className={styles.row_info}>
					<div className={styles.info_avatar} onClick={() => setFullPhoto(true)}>
						{dataUser?.avatarUrl ? (
							<img
								className={styles.photoAvatar_img}
								src={`http://localhost:4444${dataUser?.avatarUrl}`}
							/>
						) : (
							<img className={styles.photoAvatar_img} src={avatar} />
						)}
					</div>

					<div className={styles.info_container}>
						<div className={styles.info_name}>{dataUser?.fullName || 'Нет данных'}</div>
						<div className={styles.info_reg}>Город: {dataUser?.city || 'Нет данных'}</div>
						<div className={styles.info_reg}>
							Дата регистрации: {dataUser?.createdAt.substring(0, 10)}
						</div>
						<div className={styles.info_reg}>Возраст: {dataUser?.age || 'Нет данных'}</div>
						<div className={styles.info_statistic}>
							Предпочитаемый вид спорта: {dataUser?.preferredSport || 'Нет данных'}
						</div>
						<div className={styles.info_statistic}>
							Сыграно игр: {dataUser?.gamesPlayed ?? 'Нет данных'}
						</div>
						<div className={styles.info_statistic}>
							Не пришел: {dataUser?.gamesLeave ?? 'Нет данных'}
						</div>

						<div className={styles.info_btns}>
							<Link to="/editProfile">
								<button className={styles.btn_edit}>Редактировать</button>
							</Link>
						</div>
					</div>
				</div>
			</div>
			{fullPhoto && <div className={styles.overlay} onClick={() => setFullPhoto(false)}></div>}
		</>
	);
}

export default Profile;
