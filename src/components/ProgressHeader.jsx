import { Box, LinearProgress, Typography } from '@mui/material';

import React from 'react';

const ProgressHeader = ({progress = 0}) => {


  return (
    <Box>
      <Typography variant="h6">Прогресс выполнения {progress.toFixed(0)}%</Typography>
      <LinearProgress
        sx={{
          height: 20,
          borderRadius: 2
        }}
        variant="determinate"
        value={progress}
        color="success"
      />
    </Box>
  );
};

export default ProgressHeader;