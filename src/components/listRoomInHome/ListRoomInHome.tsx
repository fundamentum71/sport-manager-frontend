import React from 'react';
import { Link } from 'react-router-dom';
import styles from './listRoomInHome.module.scss';
import EditIcon from '@mui/icons-material/Edit';
import { CartRoomInHomeProperty } from '../cartRoomInHome/CartRoomInHome';
import SkeletonList from './SkeletonList';

const ListRoomInHome: React.FC<CartRoomInHomeProperty> = ({
	_id,
	title,
	preferredSport,
	time,
	date,
	place,
	isLoading,
	user,
	joined,
	dateCreatedRoom,
	isEditable,
}) => {
	return (
		<div className={styles.wrapper}>
			{isLoading ? (
				<SkeletonList />
			) : (
				<>
					<div className={styles.items}>
						<div className={styles.item}>
							<Link to={`/rooms/${_id}`}>{title}</Link>
						</div>
						<div className={styles.item}>{user ? user.fullName : ''}</div>
						<div className={styles.item}>{preferredSport}</div>
						<div className={styles.item}>{joined?.length}</div>
						<div className={styles.item}>{place}</div>
						<div className={styles.item}>{date}</div>
						<div className={styles.item}>{time}</div>
					</div>
					<div className={styles.btns}>
						<Link to={`/rooms/${_id}`}>
							<button className={styles.btn}>Войти в комнату</button>
						</Link>

						{/*{isEditable && (
							<Link to={`/editroom/${_id}`}>
								<button className={styles.btn_edit}>
									<EditIcon />
								</button>
							</Link>
						)}*/}
					</div>
					<div className={styles.dateCreated}>Дата создания комнаты: {dateCreatedRoom}</div>
				</>
			)}
		</div>
	);
};

export default ListRoomInHome;
