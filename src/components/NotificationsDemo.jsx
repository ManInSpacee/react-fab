import React, {useState} from "react";
import {Alert, Box, Button, Snackbar, Stack, Typography} from "@mui/material";

const types = [
  {key: "success", label: "Успех"},
  {key: "error", label: "Ошибка"},
  {key: "warning", label: "Предупреждение"},
  {key: "info", label: "Инфо"}
];

function NotificationsDemo() {
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("info");

  const show = (type) => {
    setSeverity(type);
    setOpen(true);
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
      <Typography variant="h6">Уведомления (Snackbar)</Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap">
        {types.map(t => (
          <Button key={t.key} variant="outlined" onClick={() => show(t.key)}>
            {t.label}
          </Button>
        ))}
      </Stack>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
        anchorOrigin={{vertical: "bottom", horizontal: "center"}}
      >
        <Alert onClose={() => setOpen(false)} severity={severity} variant="filled" sx={{width: "100%"}}>
          {severity === "success" && "Успешно"}
          {severity === "error" && "Ошибка"}
          {severity === "warning" && "Предупреждение"}
          {severity === "info" && "Информация"}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default NotificationsDemo;

