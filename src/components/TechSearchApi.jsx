import React, {useEffect, useRef, useState} from "react";
import {Alert, Box, CircularProgress, List, ListItem, ListItemText, TextField, Typography} from "@mui/material";

// Простой поиск по публичному API с debounce и отменой запросов
function TechSearchApi() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const timerRef = useRef(null);
  const abortRef = useRef(null);

  const search = async (value) => {
    if (abortRef.current) abortRef.current.abort();
    abortRef.current = new AbortController();
    try {
      setLoading(true);
      setError("");
      if (!value.trim()) {
        setProducts([]);
        setLoading(false);
        return;
      }
      const res = await fetch(`https://dummyjson.com/products/search?q=${encodeURIComponent(value)}`, {
        signal: abortRef.current.signal
      });
      if (!res.ok) throw new Error("Ошибка загрузки");
      const data = await res.json();
      setProducts(data.products || []);
    } catch (e) {
      if (e.name !== "AbortError") {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (abortRef.current) abortRef.current.abort();
    };
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => search(value), 500);
  };

  return (
    <Box
      sx={(theme) => ({
        p: 2,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        background: theme.palette.background.paper
      })}
    >
      <Typography variant="h6">Поиск технологий (пример API)</Typography>
      <TextField
        label="Введите запрос"
        value={query}
        onChange={handleChange}
        size="small"
        InputProps={{endAdornment: loading ? <CircularProgress size={16} /> : null}}
        aria-label="Поиск по API"
      />
      {error && <Alert severity="error">{error}</Alert>}
      <List dense>
        {products.map(item => (
          <ListItem key={item.id}>
            <ListItemText primary={item.title} secondary={`$${item.price}`} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default TechSearchApi;

