import React from 'react';
import {useLocation, Link} from "react-router-dom";
import {AppBar, Box, Button, Toolbar, Typography} from "@mui/material";

const Navigation = () => {
  const location = useLocation();

  const links = [
    {path: '/', label: "Главная"},
    {path: '/technologies', label: "Технологии"},
    {path: '/add-technology', label: "Добавить"},
    {path: '/api-lab', label: "API"},
    {path: '/statistics', label: "Статистика"},
    {path: '/settings', label: "Настройки"},
  ]

  return (
    <AppBar position="static" sx={{background: "#424242"}}>
      <Toolbar>
        {links.map((link) => (
          <Button
            key={link.path}
            color={
              location.pathname === link.path ||
              (link.path === '/technologies' && location.pathname.startsWith('/technology'))
                ? 'primary'
                : 'secondary'
            }
            component={Link}
            to={link.path}
          >
            {link.label}
          </Button>
        ))}
      </Toolbar>
    </AppBar>

  );
};

export default Navigation;