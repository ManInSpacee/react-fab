import {useEffect, useState} from "react";

// Очень простой мок API: имитируем задержку и базовые данные
export default function useTechnologiesApi() {
  const [technologies, setTechnologies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTechnologies = async () => {
    try {
      setLoading(true);
      setError(null);
      await new Promise(r => setTimeout(r, 500));

      setTechnologies([
        {
          id: 101,
          title: "React Router",
          description: "Маршрутизация и работа с параметрами",
          category: "frontend",
          difficulty: "intermediate",
          resources: ["https://reactrouter.com"]
        },
        {
          id: 102,
          title: "Node.js Basics",
          description: "Базовые принципы Node.js",
          category: "backend",
          difficulty: "beginner",
          resources: ["https://nodejs.org/en/docs"]
        },
        {
          id: 103,
          title: "TypeScript Intro",
          description: "Типы и базовые конструкции",
          category: "language",
          difficulty: "beginner",
          resources: ["https://www.typescriptlang.org/docs/"]
        }
      ]);
    } catch (e) {
      setError("Не удалось загрузить технологии");
    } finally {
      setLoading(false);
    }
  };

  const addTechnology = async (techData) => {
    await new Promise(r => setTimeout(r, 200));
    setTechnologies(prev => [...prev, {id: Date.now(), ...techData}]);
  };

  useEffect(() => {
    fetchTechnologies();
  }, []);

  return {
    technologies,
    loading,
    error,
    refetch: fetchTechnologies,
    addTechnology
  };
}

