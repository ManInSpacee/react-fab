import React from "react";
import {Box, Button, Paper, Stack, Typography} from "@mui/material";
import BulkStatusEditor from "../components/BulkStatusEditor.jsx";
import DataImportExport from "../components/DataImportExport.jsx";
import NotificationsDemo from "../components/NotificationsDemo.jsx";

function Settings({
                    markAllCompleted,
                    resetAllStatuses,
                    clearTechnologies,
                    resetToInitial,
                    updateStatus,
                    technologies = [],
                    onToggleTheme,
                    themeMode = "light",
                    onImportMany
                  }) {
  return (
    <Box sx={{mx: "auto", pt: 4, maxWidth: 1000, display: "flex", flexDirection: "column", gap: 3}}>
      <Typography variant="h4" sx={{mb: 1}}>Настройки</Typography>

      <Paper sx={{p: 3, display: "flex", flexDirection: "column", gap: 2}}>
        <Typography variant="body1">
          Управление данными и темой.
        </Typography>

        <Stack spacing={2} direction="column">
          <Button variant="contained" color="success" onClick={markAllCompleted}>
            Отметить все как завершенные
          </Button>
          <Button variant="contained" color="primary" onClick={resetAllStatuses}>
            Сбросить статусы до «Не начато»
          </Button>
          <Button variant="outlined" color="error" onClick={clearTechnologies}>
            Очистить список технологий
          </Button>
          <Button
            variant="outlined"
            onClick={resetToInitial}
          >
            Восстановить демо-данные
          </Button>
          <Button variant="outlined" onClick={onToggleTheme}>
            Переключить тему (сейчас {themeMode === "light" ? "светлая" : "тёмная"})
          </Button>
        </Stack>

        <Typography variant="body2" color="text.secondary">
          Текущее количество технологий: {technologies.length}
        </Typography>
      </Paper>

      <BulkStatusEditor
        technologies={technologies}
        onApply={(ids, status) => ids.forEach(id => updateStatus(id, status))}
      />

      <DataImportExport
        technologies={technologies}
        onImport={(list) => onImportMany?.(list)}
      />

      <NotificationsDemo />
    </Box>
  );
}

export default Settings;

