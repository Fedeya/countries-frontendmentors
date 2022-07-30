import { Country } from '@/typings';
import { FC, useMemo } from 'react';
import CountryCard from './CountryCard';
import { useFilters } from '../contexts/FiltersContext';

type CountriesListProps = {
  countries: Country[];
};

const CountriesList: FC<CountriesListProps> = ({ countries }) => {
  const { region, term } = useFilters();

  const filteredCountries = useMemo(() => {
    let filteredCountries = countries;

    if (term) {
      filteredCountries = filteredCountries.filter(country =>
        country.name.common.toLowerCase().includes(term.toLowerCase())
      );
    }

    if (region) {
      filteredCountries = filteredCountries.filter(country =>
        country.region.includes(region)
      );
    }

    return filteredCountries;
  }, [countries, term, region]);

  return (
    <div>
      <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {filteredCountries.map(country => (
          <CountryCard key={country.name.common} country={country} />
        ))}
      </div>
    </div>
  );
};

export default CountriesList;
