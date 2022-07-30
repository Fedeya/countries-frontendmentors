import { Country } from '@/typings';
import { FC, useCallback, useMemo, useState, useEffect } from 'react';
import CountryCard from './CountryCard';
import { useFilters } from '@/contexts/FiltersContext';
import { VirtuosoGrid } from 'react-virtuoso';

type CountriesListProps = {
  countries: Country[];
};

const CountriesList: FC<CountriesListProps> = ({ countries }) => {
  const { region, term } = useFilters();
  const [take, setTake] = useState(10);

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

    return filteredCountries.slice(0, take);
  }, [countries, term, region, take]);

  const loadMore = useCallback(() => {
    if (filteredCountries.length + 10 > take) setTake(t => t + 10);
  }, [filteredCountries, take]);

  useEffect(() => {
    setTake(10);
  }, [region, term]);

  return (
    <div>
      <VirtuosoGrid
        useWindowScroll
        overscan={50}
        endReached={loadMore}
        totalCount={filteredCountries.length}
        listClassName="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
        itemContent={index => (
          <CountryCard
            key={filteredCountries[index].name.common}
            country={filteredCountries[index]}
          />
        )}
      />
    </div>
  );
};

export default CountriesList;
