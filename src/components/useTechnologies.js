import useLocalStorage from "./useLocalStorage";

export const initialTechnologies = [
  {
    id: 1,
    title: 'React Components',
    description: 'Базовые принципы создания и композиции компонентов',
    status: 'not-started',
    notes: '',
    category: 'frontend',
    difficulty: 'beginner',
    deadline: '',
    resources: []
  },
  {
    id: 2,
    title: 'React Router',
    description: 'Маршрутизация, параметры и навигация без перезагрузки',
    status: 'not-started',
    notes: '',
    category: 'frontend',
    difficulty: 'intermediate',
    deadline: '',
    resources: []
  },
  {
    id: 3,
    title: 'State Management',
    description: 'Контекст, хуки состояния и локальное хранилище',
    status: 'not-started',
    notes: '',
    category: 'frontend',
    difficulty: 'intermediate',
    deadline: '',
    resources: []
  }
];

export default function useTechnologies() {
  const [technologies, setTechnologies] = useLocalStorage("technologies", initialTechnologies);

  const addTechnology = ({ title, description, status = 'not-started', notes = '', category = 'other', difficulty = 'beginner', deadline = '', resources = [] }) => {
    setTechnologies(prev => {
      const nextId = prev.length ? Math.max(...prev.map(t => t.id)) + 1 : 1;
      return [
        ...prev,
        { id: nextId, title, description, status, notes, category, difficulty, deadline, resources }
      ];
    });
  };

  const updateStatus = (id, nextStatus) => {
    setTechnologies(prev =>
      prev.map(t => {
        if (t.id !== id) return t;

        if (nextStatus) {
          return { ...t, status: nextStatus };
        }

        const cycled =
          t.status === "not-started" ? "in-progress" :
            t.status === "in-progress" ? "completed" :
              "not-started";

        return { ...t, status: cycled };
      })
    );
  };

  const updateNotes = (id, newNotes) => {
    setTechnologies(prev =>
      prev.map(t => t.id === id ? {...t, notes: newNotes} : t)
    );
  }

  const markAllCompleted = () => {
    setTechnologies(prev =>
      prev.map(t => ({...t, status: "completed"}))
    );
  }

  const resetAllStatuses = () => {
    setTechnologies(prev =>
      prev.map(t => ({...t, status: "not-started"}))
    );
  }

  const clearTechnologies = () => {
    setTechnologies([]);
  }

  const resetToInitial = () => {
    setTechnologies(initialTechnologies.map(t => ({...t})));
  }

  const progress = Math.round(
    technologies.length
      ? technologies.filter(t => t.status === "completed").length / technologies.length * 100
      : 0
  );

  return {
    technologies,
    addTechnology,
    updateStatus,
    updateNotes,
    markAllCompleted,
    resetAllStatuses,
    clearTechnologies,
    resetToInitial,
    progress
  }
}