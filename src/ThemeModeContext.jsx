import React, { createContext, useContext, useMemo, useState } from 'react';

const ThemeModeContext = createContext({ mode: 'light', setMode: () => {} });
const storageKey = 'creator-signal-zot-theme-mode';

const initialMode = () => {
  const persisted = window.localStorage.getItem(storageKey);
  return persisted === 'dark' ? 'dark' : 'light';
};

function ThemeModeProvider({ children }) {
  const [mode, setMode] = useState(initialMode);
  const value = useMemo(
    () => ({
      mode,
      setMode: (nextMode) => {
        const selectedMode = nextMode === 'dark' ? 'dark' : 'light';
        window.localStorage.setItem(storageKey, selectedMode);
        setMode(selectedMode);
      }
    }),
    [mode]
  );

  return <ThemeModeContext.Provider value={value}>{children}</ThemeModeContext.Provider>;
}

function useThemeMode() {
  return useContext(ThemeModeContext);
}

export { ThemeModeProvider, useThemeMode };
