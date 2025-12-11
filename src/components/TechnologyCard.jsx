import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box, CardActionArea
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/HourglassBottom';
import CancelIcon from '@mui/icons-material/Cancel';
import TechnologyNotes from "./TechnologyNotes.jsx";


const TechnologyCard = ({title, description, status, onClick, notes, onNotesChange}) => {



  return (
    <Card
      sx={{
        width: 300,
        // minWidth: 250,
        cursor: 'pointer',
        borderRadius: 4,
        borderLeft: (theme) =>
          status === 'completed'
            ? '5px solid #27a000'
            : status === 'in-progress'
            ? '5px solid #d6bb00'
            : '5px solid #c8c8c8',
        backgroundColor:
          status === 'completed'
            ? '#d7ffd1'
            : status === 'in-progress'
              ? '#fff9d4'
              : '#f4f4f4',
        transition: 'all 0.3s ease'
      }}
    >
      <CardActionArea onClick={onClick}>
        <CardContent>
          <Typography variant="h6" component="h3">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
          <Box sx={{display: 'flex', gap: 1, mt: 2, alignItems: 'center'}} >
            <Chip
              label={status === 'completed' ? 'Завершено' : status === 'in-progress' ? 'В процессе' : 'Не начато'}
              color={status === 'completed' ? 'success' : status === 'in-progress' ? 'warning' : 'default'}
              icon={status === 'completed' ? <CheckCircleIcon /> : status === 'in-progress' ? <PendingIcon /> : <CancelIcon />}
              size='small'
            />
          </Box>
          <TechnologyNotes notes={notes} onChange={onNotesChange}/>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default TechnologyCard;