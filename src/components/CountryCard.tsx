import { Country } from '@/typings';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

type CountryCardProps = {
  country: Country;
};

const CountryCard: FC<CountryCardProps> = ({ country }) => {
  return (
    <Link href={`/${country.name.common.toLowerCase()}`}>
      <a>
        <div
          className="bg-white dark:bg-slate-800 rounded-md overflow-hidden shadow-md"
          key={country.name.official}
        >
          {country.flags.png && (
            <Image
              width="400px"
              className="h-48 object-cover w-full"
              height="300px"
              src={country.flags.png}
              placeholder="blur"
              blurDataURL={country.flags.png}
              alt={country.name.common}
            />
          )}

          <div className="px-4 pt-5 pb-14">
            <h2 className="text-lg font-bold">{country.name.common}</h2>

            <div className="space-y-2 mt-4">
              <p>
                <span className="font-semibold">Population</span>:{' '}
                {country.population}
              </p>
              <p>
                <span className="font-semibold">Region:</span> {country.region}
              </p>
              <p>
                <span className="font-semibold">Capital:</span>{' '}
                {country.capital}
              </p>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default CountryCard;
