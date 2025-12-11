import React, {useRef, useState} from "react";
import {Alert, Box, Button, Typography} from "@mui/material";

// Простой экспорт/импорт JSON для списка технологий
function DataImportExport({technologies = [], onImport}) {
  const fileRef = useRef(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(technologies, null, 2)], {type: "application/json"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "technologies.json";
    a.click();
    URL.revokeObjectURL(url);
    setMessage("Экспорт выполнен");
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        if (Array.isArray(data)) {
          onImport?.(data);
          setMessage(`Импортировано записей: ${data.length}`);
          setError("");
        } else {
          throw new Error("Неверный формат JSON");
        }
      } catch (err) {
        setError("Ошибка импорта: " + err.message);
      }
    };
    reader.readAsText(file);
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
        gap: 1
      })}
    >
      <Typography variant="h6">Импорт / Экспорт</Typography>
      <Box sx={{display: "flex", gap: 1, flexWrap: "wrap"}}>
        <Button variant="contained" onClick={exportJson} disabled={!technologies.length}>
          Экспорт JSON
        </Button>
        <Button variant="outlined" onClick={() => fileRef.current?.click()}>
          Импорт JSON
        </Button>
        <input type="file" accept=".json" ref={fileRef} style={{display: "none"}} onChange={handleFileChange} />
      </Box>
      {message && <Alert severity="success">{message}</Alert>}
      {error && <Alert severity="error">{error}</Alert>}
    </Box>
  );
}

export default DataImportExport;

