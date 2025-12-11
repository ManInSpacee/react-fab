import React, {useState} from "react";
import {Box, Button, FormControlLabel, Radio, RadioGroup, Checkbox, Typography, Stack} from "@mui/material";

const statusOptions = [
  {value: "not-started", label: "Не начато"},
  {value: "in-progress", label: "В процессе"},
  {value: "completed", label: "Завершено"},
];

function BulkStatusEditor({technologies = [], onApply}) {
  const [selectedIds, setSelectedIds] = useState([]);
  const [status, setStatus] = useState("in-progress");

  const toggleId = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id]);
  };

  const apply = () => {
    onApply?.(selectedIds, status);
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
      <Typography variant="h6">Массовое изменение статусов</Typography>
      <Stack spacing={1}>
        {technologies.map(t => (
          <FormControlLabel
            key={t.id}
            control={<Checkbox checked={selectedIds.includes(t.id)} onChange={() => toggleId(t.id)} />}
            label={`${t.title} — ${t.status}`}
          />
        ))}
      </Stack>

      <RadioGroup
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        aria-label="Новый статус"
      >
        {statusOptions.map(opt => (
          <FormControlLabel key={opt.value} value={opt.value} control={<Radio />} label={opt.label} />
        ))}
      </RadioGroup>

      <Button variant="contained" onClick={apply} disabled={!selectedIds.length}>
        Применить
      </Button>
    </Box>
  );
}

export default BulkStatusEditor;

