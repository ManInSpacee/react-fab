import React, { useState } from "react";
import { Box, Button, Modal, Typography, Paper } from "@mui/material";

export default function QuickActions({
                                       onMarkAllCompleted,
                                       onResetAll,
                                       technologies
                                     }) {
  const [open, setOpen] = useState(false);

  const handleExport = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      technologies
    };

    console.log("Экспорт данных:", JSON.stringify(data, null, 2));
    setOpen(true);
  };

  return (
    <Box sx={{ my: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Быстрые действия
      </Typography>

      <Box sx={{ display: "flex", gap: 2 }}>
        <Button variant="contained" color="success" onClick={onMarkAllCompleted}>
          Отметить все как выполненные
        </Button>

        <Button variant="contained" color="error" onClick={onResetAll}>
          Сбросить все статусы
        </Button>

        <Button variant="outlined" onClick={handleExport}>
          Экспорт данных
        </Button>
      </Box>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Paper
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            p: 3,
            width: 400
          }}
        >
          <Typography variant="h6">Экспорт данных завершён</Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Данные выведены в консоль разработчика.
          </Typography>

          <Button sx={{ mt: 2 }} variant="contained" onClick={() => setOpen(false)}>
            Закрыть
          </Button>
        </Paper>
      </Modal>
    </Box>
  );
}
