import './App.css';
import React, {useEffect, useMemo, useState} from "react";
import Navigation from './components/Navigation.jsx';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Home from './pages/Home.jsx';
import TechnologyList from "./pages/TechnologyList.jsx";
import TechnologyDetail from "./pages/TechnologyDetail.jsx";
import AddTechnology from "./pages/AddTechnology.jsx";
import Statistics from "./pages/Statistics.jsx";
import Settings from "./pages/Settings.jsx";
import ApiLab from "./pages/ApiLab.jsx";
import useTechnologies from "./components/useTechnologies.js";
import {CssBaseline, ThemeProvider, createTheme} from "@mui/material";

function App() {
  const technologiesApi = useTechnologies();
  const [themeMode, setThemeMode] = useState(
    () => localStorage.getItem("themeMode") || "light"
  );

  useEffect(() => {
    localStorage.setItem("themeMode", themeMode);
  }, [themeMode]);

  const theme = useMemo(() => createTheme({palette: {mode: themeMode}}), [themeMode]);

  const toggleTheme = () => setThemeMode(m => m === "light" ? "dark" : "light");

  const importMany = (list = []) => {
    list.forEach(item => {
      technologiesApi.addTechnology({
        title: item.title || "Без названия",
        description: item.description || "",
        status: item.status || "not-started",
        notes: item.notes || "",
        category: item.category || "other",
        difficulty: item.difficulty || "beginner",
        resources: item.resources || []
      });
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home {...technologiesApi} />} />
          <Route path="/technologies" element={<TechnologyList {...technologiesApi} />} />
          <Route path="/technology/:techId" element={<TechnologyDetail {...technologiesApi} />} />
          <Route path="/add-technology" element={<AddTechnology addTechnology={technologiesApi.addTechnology} />} />
          <Route path="/api-lab" element={<ApiLab addTechnology={technologiesApi.addTechnology} />} />
          <Route path="/statistics"
                 element={<Statistics technologies={technologiesApi.technologies} progress={technologiesApi.progress} />} />
          <Route path="/settings" element={
            <Settings
              {...technologiesApi}
              onToggleTheme={toggleTheme}
              themeMode={themeMode}
              onImportMany={importMany}
            />
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App;
