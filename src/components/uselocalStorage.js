import React, {useState} from 'react';

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : initialValue;
    } catch {
      return initialValue;
    }
  });
  const updateValue = (newValue) => {
    const finalValue = newValue instanceof Function ? newValue(value) : newValue;

    setValue(finalValue);
    localStorage.setItem(key, JSON.stringify(finalValue));
  };

  return [value, updateValue];
}

export default useLocalStorage;