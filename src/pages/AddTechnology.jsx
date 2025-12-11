import React from "react";
import {Box, Paper, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import TechnologyForm from "../components/TechnologyForm.jsx";

function AddTechnology({addTechnology}) {
  const navigate = useNavigate();

  const handleSave = (data) => {
    addTechnology({
      title: data.title,
      description: data.description,
      status: "not-started",
      notes: "",
      category: data.category,
      difficulty: data.difficulty,
      deadline: data.deadline,
      resources: data.resources
    });
    navigate('/technologies');
  };

  return (
    <Box sx={{mx: "auto", pt: 4, maxWidth: 800}}>
      <Paper sx={{p: 3}}>
        <Typography variant="h4" sx={{mb: 3}}>Добавить технологию</Typography>
        <TechnologyForm onSave={handleSave} onCancel={() => navigate(-1)} />
      </Paper>
    </Box>
  );
}

export default AddTechnology;

