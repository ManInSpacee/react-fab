import React, {useState} from "react";
import {Alert, Box, Button, TextField, Typography} from "@mui/material";

// Импортирует технологии из JSON по ссылке (для примера — из public/mock-roadmap.json)
function RoadmapImporter({onImport}) {
  const [url, setUrl] = useState("/mock-roadmap.json");
  const [importing, setImporting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleImport = async () => {
    setMessage("");
    setError("");
    try {
      setImporting(true);
      const res = await fetch(url);
      if (!res.ok) throw new Error("Не удалось загрузить файл");
      const data = await res.json();
      const list = Array.isArray(data.technologies) ? data.technologies : [];
      if (onImport) {
        list.forEach(item => onImport(item));
      }
      setMessage(`Импортировано ${list.length} технологий`);
    } catch (e) {
      setError(e.message);
    } finally {
      setImporting(false);
    }
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
      <Typography variant="h6">Импорт дорожной карты</Typography>
      <TextField
        label="Ссылка на JSON"
        value={url}
        onChange={e => setUrl(e.target.value)}
        size="small"
        aria-label="Ссылка на файл дорожной карты"
      />
      <Button variant="contained" onClick={handleImport} disabled={importing}>
        {importing ? "Импорт..." : "Импортировать"}
      </Button>
      {message && <Alert severity="success">{message}</Alert>}
      {error && <Alert severity="error">{error}</Alert>}
    </Box>
  );
}

export default RoadmapImporter;

