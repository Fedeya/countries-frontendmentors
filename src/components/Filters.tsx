import { useFilters } from '@/contexts/FiltersContext';
import { Region } from '@/typings';
import { FC } from 'react';

type FiltersProps = {
  regions: Region[];
};

const Filters: FC<FiltersProps> = ({ regions }) => {
  const { region, term, setTerm, setRegion } = useFilters();

  return (
    <div className="flex mb-10 justify-between items-center">
      <form>
        <input
          type="text"
          value={term || ''}
          onChange={e => setTerm(e.target.value)}
          className="shadow-lg p-4 dark:bg-slate-800 dark:border-none rounded-md border border-gray-100"
          placeholder="Search for a country..."
        />
      </form>

      <select
        value={region as string}
        onChange={e => setRegion(e.target.value as Region)}
        className="p-4 dark:bg-slate-800 shadow-lg rounded-md"
      >
        <option value="">Filter by Region</option>
        {regions.map(region => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filters;
