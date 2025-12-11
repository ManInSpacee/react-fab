import React from "react";
import {Box, Typography} from "@mui/material";
import ApiTechnologyLoader from "../components/ApiTechnologyLoader.jsx";
import RoadmapImporter from "../components/RoadmapImporter.jsx";
import TechSearchApi from "../components/TechSearchApi.jsx";

function ApiLab({addTechnology}) {
  const handleImportOne = (tech) => {
    addTechnology({
      title: tech.title,
      description: tech.description || "",
      status: tech.status || "not-started",
      notes: "",
      category: tech.category || "other",
      difficulty: tech.difficulty || "beginner",
      resources: tech.resources || []
    });
  };

  return (
    <Box sx={{mx: "auto", pt: 4, maxWidth: 1200, display: "flex", flexDirection: "column", gap: 3}}>
      <Typography variant="h4">API примеры</Typography>
      <Box sx={{display: "grid", gap: 2, gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))"}}>
        <ApiTechnologyLoader onImport={handleImportOne} />
        <RoadmapImporter onImport={handleImportOne} />
      </Box>
      <TechSearchApi />
    </Box>
  );
}

export default ApiLab;

