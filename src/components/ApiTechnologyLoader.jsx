import React from "react";
import {Box, Button, List, ListItem, ListItemText, Typography, Alert, CircularProgress} from "@mui/material";
import useTechnologiesApi from "../hooks/useTechnologiesApi.js";

// Показывает загрузку mock API и позволяет добавить данные в локальный список
function ApiTechnologyLoader({onImport}) {
  const {technologies, loading, error, refetch} = useTechnologiesApi();

  const handleImport = () => {
    if (!onImport) return;
    technologies.forEach(t => onImport(t));
  };

  return (
    <Box
      sx={(theme) => ({
        p: 2,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 2,
        background: theme.palette.background.paper,
        display: "flex",
        flexDirection: "column",
        gap: 2
      })}
    >
      <Box sx={{display: "flex", gap: 1, alignItems: "center"}}>
        <Typography variant="h6">Загрузка из API (мок)</Typography>
        {loading && <CircularProgress size={16} />}
      </Box>

      {error && <Alert severity="error">{error}</Alert>}

      <List dense>
        {technologies.map(t => (
          <ListItem key={t.id}>
            <ListItemText primary={t.title} secondary={t.description} />
          </ListItem>
        ))}
      </List>

      <Box sx={{display: "flex", gap: 1}}>
        <Button onClick={refetch} variant="outlined" size="small">Обновить</Button>
        <Button onClick={handleImport} variant="contained" size="small" disabled={!technologies.length}>
          Импортировать в трекер
        </Button>
      </Box>
    </Box>
  );
}

export default ApiTechnologyLoader;

