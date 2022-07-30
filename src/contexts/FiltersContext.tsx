import { Region } from '@/typings';
import React, { createContext, FC, useContext } from 'react';
import { useState } from 'react';

type FiltersState = {
  term: string | null;
  region: Region | null;
  setTerm(term: string): void;
  setRegion(region: Region): void;
};

export const FiltersContext = createContext<FiltersState | null>(null);

const FiltersProvider: FC<{ children: React.ReactElement }> = ({
  children
}) => {
  const [term, setTerm] = useState<string | null>('');
  const [region, setRegion] = useState<Region | null>(null);

  return (
    <FiltersContext.Provider
      value={{
        term,
        setTerm,
        region,
        setRegion
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FiltersContext);

  if (!context) throw new Error('FiltersProvider is required');

  return context;
};

export default FiltersProvider;
