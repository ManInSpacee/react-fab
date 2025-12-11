import React, {useMemo} from "react";
import {useNavigate, useParams, Link} from "react-router-dom";
import {Box, Typography, Chip, Button, Stack, TextField, Paper, Divider} from "@mui/material";

const statuses = [
  {value: 'not-started', label: 'Не начато'},
  {value: 'in-progress', label: 'В процессе'},
  {value: 'completed', label: 'Завершено'}
];

function TechnologyDetail({technologies = [], updateStatus, updateNotes}) {
  const {techId} = useParams();
  const navigate = useNavigate();

  const technology = useMemo(
    () => technologies.find(t => String(t.id) === techId || Number(t.id) === Number(techId)),
    [technologies, techId]
  );

  if (!technology) {
    return (
      <Box sx={{mx: "auto", pt: 4, maxWidth: 900}}>
        <Paper sx={{p: 3}}>
          <Typography variant="h5" sx={{mb: 2}}>Технология не найдена</Typography>
          <Typography variant="body2" sx={{mb: 2}}>
            Технология с ID {techId} отсутствует или была удалена.
          </Typography>
          <Button component={Link} to="/technologies" variant="contained">
            Вернуться к списку
          </Button>
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{mx: "auto", pt: 4, maxWidth: 900}}>
      <Paper sx={{p: 3, display: "flex", flexDirection: "column", gap: 2}}>
        <Button onClick={() => navigate(-1)} size="small" sx={{alignSelf: "flex-start"}}>
          ← Назад
        </Button>

        <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2, flexWrap: "wrap"}}>
          <Typography variant="h4">{technology.title}</Typography>
          <Chip
            label={statuses.find(s => s.value === technology.status)?.label || technology.status}
            color={
              technology.status === 'completed' ? 'success' :
                technology.status === 'in-progress' ? 'warning' : 'default'
            }
          />
        </Box>

        <Typography variant="body1" color="text.secondary">
          {technology.description}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Категория: {technology.category || '—'} · Сложность: {technology.difficulty || '—'}
        </Typography>
        {technology.deadline && (
          <Typography variant="body2" color="text.secondary">
            Дедлайн: {technology.deadline}
          </Typography>
        )}

        <Divider />

        <Typography variant="h6">Статус</Typography>
        <Stack direction="row" spacing={1}>
          {statuses.map(s => (
            <Button
              key={s.value}
              variant={technology.status === s.value ? "contained" : "outlined"}
              color={s.value === 'completed' ? 'success' : s.value === 'in-progress' ? 'warning' : 'primary'}
              onClick={() => updateStatus(technology.id, s.value)}
            >
              {s.label}
            </Button>
          ))}
        </Stack>

        <Divider />

        <Typography variant="h6">Заметки</Typography>
        <TextField
          multiline
          minRows={3}
          value={technology.notes}
          onChange={(e) => updateNotes(technology.id, e.target.value)}
          placeholder="Добавьте заметки, ссылки или идеи..."
        />
      </Paper>
    </Box>
  );
}

export default TechnologyDetail;

