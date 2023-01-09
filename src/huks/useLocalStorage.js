import { useState, useEffect } from 'react';

export default function useLocalStorage(key, defaultValue) {
  const parsedContacts = JSON.parse(window.localStorage.getItem(key));
  const [state, setState] = useState(() => parsedContacts ?? defaultValue);

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, setState];
}
