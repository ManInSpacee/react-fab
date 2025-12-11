import React, {useState} from 'react';
import {Box, Button, TextField, Typography} from "@mui/material";

const TechnologyNotes = ({notes, onChange}) => {

  const [open, setOpen] = useState(false)

  return (
    <Box sx={{mt: 1}}>
      <Typography sx={{color: "#3d75d2"}} variant="body2" onClick={() => setOpen(o => !o)}>
        {open ? 'Скрыть заметки' : 'ЗАМЕТКИ'}
      </Typography>

      {open && (
        <TextField
          multiline
          rows={3}
          fullWidth
          value={notes}
          onChange={e => onChange(e.target.value)}
          placeholder="Напишите что-то..."
          sx={{mt:1}}
        />
      )}
    </Box>
  );
};

export default TechnologyNotes;