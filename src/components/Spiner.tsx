import React from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Spiner() {
	return (
		<Box
			sx={{
				display: 'flex',
				height: 'calc(100vh - 100px)',
				justifyContent: 'center',
				alignItems: 'center',
			}}>
			<CircularProgress />
		</Box>
	);
}
