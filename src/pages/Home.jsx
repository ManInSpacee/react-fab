import TechnologyCard from "../components/TechnologyCard.jsx";
import React, {useState} from "react";
import {Box, Button, TextField, Typography} from "@mui/material";
import ProgressHeader from "../components/ProgressHeader.jsx";
import QuickActions from '../components/QuickActions.jsx';
import {Link} from "react-router-dom";

function Home({
                technologies = [],
                updateStatus,
                updateNotes,
                resetAllStatuses,
                markAllCompleted,
                progress = 0
              }) {

  const [searchQuery, setSearchQuery] = useState('');

  const filteredTechnologies = technologies.filter(tech =>
    tech.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tech.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{mx: "auto", pt: 3, maxWidth: 1200}}>

      <ProgressHeader progress={progress} />
      <Box sx={{my: 5, display: "flex", justifyContent: "space-between", gap: 3, flexWrap: "wrap"}}>
        <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center", gap: 2}}>
          <Typography variant="h5">Поиск технологий</Typography>
          <TextField
            type="text"
            placeholder="Поиск..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            variant="standard"
          />
          <Typography variant="h6">
            {searchQuery && `Найдено ${filteredTechnologies.length}`}
          </Typography>
        </Box>
        <QuickActions
          onMarkAllCompleted={markAllCompleted}
          onResetAll={resetAllStatuses}
          technologies={technologies}
        />
      </Box>

      <Box
        sx={{
          display: "grid",
          gap: 3,
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          justifyItems: "center"
        }}
      >
        {filteredTechnologies.map(c => (
          <Box
            key={c.id}
            sx={{width: "100%", maxWidth: 340, display: "flex", flexDirection: "column", alignItems: "stretch", gap: 1}}
          >
            <TechnologyCard
              title={c.title}
              description={c.description}
              status={c.status}
              notes={c.notes}
              onClick={() => updateStatus(c.id)}
              onNotesChange={text => updateNotes(c.id, text)}
            />
            <Button
              component={Link}
              to={`/technology/${c.id}`}
              sx={{alignSelf: "flex-start"}}
            >
              Подробнее
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default Home;
