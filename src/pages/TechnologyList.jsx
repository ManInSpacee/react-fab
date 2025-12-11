import React from "react";
import {Box, Typography, Paper, Chip, Button, Stack} from "@mui/material";
import {Link} from "react-router-dom";

const statusMeta = {
  'not-started': {label: 'Не начато', color: 'default'},
  'in-progress': {label: 'В процессе', color: 'warning'},
  'completed': {label: 'Завершено', color: 'success'}
};

function TechnologyList({technologies = []}) {

  if (!technologies.length) {
    return (
      <Box sx={{mx: "auto", pt: 4, maxWidth: 900}}>
        <Typography variant="h4" sx={{mb: 2}}>Все технологии</Typography>
        <Paper sx={{p: 3}}>
          <Typography variant="body1">Технологии пока не добавлены.</Typography>
          <Button
            component={Link}
            to="/add-technology"
            variant="contained"
            sx={{mt: 2}}
          >
            Добавить первую технологию
          </Button>
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{mx: "auto", pt: 4, maxWidth: 1200}}>
      <Typography variant="h4" sx={{mb: 3}}>Все технологии</Typography>
      <Box
        sx={{
          display: "grid",
          gap: 3,
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))"
        }}
      >
        {technologies.map(tech => (
          <Paper
            key={tech.id}
            sx={{p: 3, height: "100%", display: "flex", flexDirection: "column", gap: 2}}
          >
            <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
              <Typography variant="h6">{tech.title}</Typography>
              <Chip
                label={statusMeta[tech.status]?.label || tech.status}
                color={statusMeta[tech.status]?.color}
                size="small"
              />
            </Box>
            <Typography variant="body2" color="text.secondary">
              {tech.description}
            </Typography>
            {tech.notes && (
              <Typography variant="body2" sx={{color: "text.secondary"}}>
                Заметки: {tech.notes}
              </Typography>
            )}
            <Stack direction="row" spacing={2}>
              <Button
                component={Link}
                to={`/technology/${tech.id}`}
                variant="outlined"
                size="small"
              >
                Подробнее
              </Button>
            </Stack>
          </Paper>
        ))}
      </Box>
    </Box>
  );
}

export default TechnologyList;

