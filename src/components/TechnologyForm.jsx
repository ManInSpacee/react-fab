import React, {useEffect, useState} from "react";
import {Box, Button, MenuItem, Stack, TextField, Typography} from "@mui/material";

const categories = [
  {value: "frontend", label: "Frontend"},
  {value: "backend", label: "Backend"},
  {value: "language", label: "Язык"},
  {value: "tools", label: "Инструменты"},
  {value: "other", label: "Другое"},
];

const difficulties = [
  {value: "beginner", label: "Новичок"},
  {value: "intermediate", label: "Средний"},
  {value: "advanced", label: "Продвинутый"},
];

function TechnologyForm({onSave, onCancel, initialData = {}}) {
  const [formData, setFormData] = useState({
    title: initialData.title || "",
    description: initialData.description || "",
    category: initialData.category || "frontend",
    difficulty: initialData.difficulty || "beginner",
    deadline: initialData.deadline || "",
    resources: initialData.resources || [""],
  });
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const validateForm = () => {
    const nextErrors = {};
    if (!formData.title.trim()) nextErrors.title = "Название обязательно";

    if (formData.deadline) {
      const deadlineDate = new Date(formData.deadline);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (deadlineDate < today) {
        nextErrors.deadline = "Дедлайн не может быть в прошлом";
      }
    }
    setErrors(nextErrors);
    setIsValid(Object.keys(nextErrors).length === 0);
  };

  useEffect(() => {
    validateForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  const updateField = (field) => (e) => {
    setFormData(prev => ({...prev, [field]: e.target.value}));
  };

  const handleResourceChange = (index, value) => {
    const copy = [...formData.resources];
    copy[index] = value;
    setFormData(prev => ({...prev, resources: copy}));
  };

  const addResourceField = () => {
    setFormData(prev => ({...prev, resources: [...prev.resources, ""]}));
  };

  const removeResourceField = (index) => {
    if (formData.resources.length <= 1) return;
    setFormData(prev => ({
      ...prev,
      resources: prev.resources.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateForm();
    if (!isValid) return;
    onSave?.(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{display: "flex", flexDirection: "column", gap: 2}} noValidate>
      <Typography variant="h5">Форма технологии</Typography>
      <TextField
        label="Название"
        value={formData.title}
        onChange={updateField("title")}
        error={!!errors.title}
        helperText={errors.title}
        required
        inputProps={{"aria-label": "Название технологии"}}
      />
      <TextField
        label="Описание"
        value={formData.description}
        onChange={updateField("description")}
        multiline
        minRows={2}
        inputProps={{"aria-label": "Описание"}}
      />
      <TextField
        select
        label="Категория"
        value={formData.category}
        onChange={updateField("category")}
        size="small"
      >
        {categories.map(c => (
          <MenuItem key={c.value} value={c.value}>{c.label}</MenuItem>
        ))}
      </TextField>
      <TextField
        select
        label="Сложность"
        value={formData.difficulty}
        onChange={updateField("difficulty")}
        size="small"
      >
        {difficulties.map(c => (
          <MenuItem key={c.value} value={c.value}>{c.label}</MenuItem>
        ))}
      </TextField>
      <TextField
        label="Дедлайн"
        type="date"
        value={formData.deadline}
        onChange={updateField("deadline")}
        error={!!errors.deadline}
        helperText={errors.deadline}
        InputLabelProps={{shrink: true}}
      />

      <Box sx={{display: "flex", flexDirection: "column", gap: 1}}>
        <Typography variant="subtitle1">Ресурсы</Typography>
        {formData.resources.map((res, i) => (
          <Stack key={i} direction="row" spacing={1}>
            <TextField
              fullWidth
              label={`Ресурс ${i + 1}`}
              value={res}
              onChange={(e) => handleResourceChange(i, e.target.value)}
              inputProps={{"aria-label": `Ресурс ${i + 1}`}}
            />
            <Button variant="outlined" onClick={() => removeResourceField(i)} disabled={formData.resources.length <= 1}>
              Удалить
            </Button>
          </Stack>
        ))}
        <Button variant="text" onClick={addResourceField}>Добавить ресурс</Button>
      </Box>

      <Stack direction="row" spacing={2}>
        <Button type="submit" variant="contained" disabled={!isValid}>Сохранить</Button>
        <Button variant="text" onClick={onCancel}>Отмена</Button>
      </Stack>
    </Box>
  );
}

export default TechnologyForm;

