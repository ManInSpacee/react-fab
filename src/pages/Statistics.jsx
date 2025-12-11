import React, {useMemo} from "react";
import {Box, Paper, Typography, LinearProgress, Stack} from "@mui/material";
import ProgressHeader from "../components/ProgressHeader.jsx";

const statusOrder = [
  {value: 'completed', label: 'Завершено', color: 'success'},
  {value: 'in-progress', label: 'В процессе', color: 'warning'},
  {value: 'not-started', label: 'Не начато', color: 'inherit'}
];

function Statistics({technologies = [], progress = 0}) {

  const counts = useMemo(() => {
    return technologies.reduce((acc, tech) => {
      acc[tech.status] = (acc[tech.status] || 0) + 1;
      return acc;
    }, {});
  }, [technologies]);

  const total = technologies.length || 1;

  return (
    <Box sx={{mx: "auto", pt: 4, maxWidth: 900}}>
      <Typography variant="h4" sx={{mb: 2}}>Статистика прогресса</Typography>

      <Paper sx={{p: 3, display: "flex", flexDirection: "column", gap: 3}}>
        <ProgressHeader progress={progress} />

        <Box>
          <Typography variant="h6" sx={{mb: 1}}>Распределение по статусам</Typography>
          <Stack spacing={2}>
            {statusOrder.map(item => {
              const value = counts[item.value] || 0;
              const percent = Math.round(value / total * 100);
              return (
                <Box key={item.value}>
                  <Box sx={{display: "flex", justifyContent: "space-between", mb: 0.5}}>
                    <Typography variant="body1">{item.label}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {value} ({percent}%)
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={percent}
                    color={item.color === 'inherit' ? 'primary' : item.color}
                    sx={{height: 12, borderRadius: 1}}
                  />
                </Box>
              );
            })}
          </Stack>
        </Box>

        <Box>
          <Typography variant="h6">Всего технологий: {technologies.length}</Typography>
        </Box>
      </Paper>
    </Box>
  );
}

export default Statistics;

