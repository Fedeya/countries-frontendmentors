import { Country } from '@/typings';
import Image from 'next/image';
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage
} from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';

type CountryProps = InferGetStaticPropsType<typeof getStaticProps>;

const Country: NextPage<CountryProps> = ({ country, countriesNames }) => {
  const router = useRouter();

  console.log(countriesNames, country.borders);

  return (
    <div className="px-20 py-10">
      <Head>
        <title>{country.name.common}</title>
      </Head>
      <button
        onClick={() => router.back()}
        className="px-8 dark:bg-slate-800 dark:border-none py-2 rounded-md shadow-2xl border border-gray-100"
      >
        Back
      </button>

      <div className="grid mt-8 gap-20 grid-cols-2 ">
        <Image
          src={country.flags.svg!}
          quality={100}
          width={200}
          height={500}
          objectFit="cover"
          placeholder="blur"
          alt={country.name.common}
          blurDataURL={country.flags.png}
        />

        <div className="py-10">
          <h1 className="text-4xl font-bold mb-10">{country.name.common}</h1>

          <div className="space-y-2 grid items-start justify-start gap-4 grid-cols-2 mt-4">
            <div className="space-y-2">
              <p>
                <span className="font-semibold">Native Name</span>:{' '}
                {country.name.official}
              </p>
              <p>
                <span className="font-semibold">Population</span>:{' '}
                {country.population.toLocaleString()}
              </p>
              <p>
                <span className="font-semibold">Region:</span> {country.region}
              </p>
              <p>
                <span className="font-semibold">Sub Region:</span>{' '}
                {country.subregion}
              </p>
              <p>
                <span className="font-semibold">Capital:</span>{' '}
                {country.capital}
              </p>
            </div>
            <div className="space-y-2">
              {country.tld && (
                <p>
                  <span className="font-semibold">Top Level Domain</span>:{' '}
                  {country.tld.join(', ')}
                </p>
              )}
              {country.currencies && (
                <p>
                  <span className="font-semibold">Currencies</span>:{' '}
                  {Object.keys(country.currencies)
                    .map(c => country.currencies![c].name)
                    .join(', ')}
                </p>
              )}
              {country.languages && (
                <p>
                  <span className="font-semibold">Languages:</span>{' '}
                  {Object.values(country.languages).join(', ')}
                </p>
              )}
            </div>
          </div>

          {country.borders && (
            <div className="mt-8 flex items-center flex-wrap gap-2">
              <span className="font-semibold mr-2">Border Countries:</span>
              {country.borders.map(border => (
                <div
                  className="rounded-lg dark:bg-slate-800 dark:border-none shadow-2xl py-2 px-4 border border-gray-200"
                  key={border}
                >
                  {countriesNames.find(c => c.short === border)?.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async ({}) => {
  const res = await fetch('https://restcountries.com/v3.1/all');

  const countries = (await res.json()) as Country[];

  return {
    paths: countries.map(country => ({
      params: {
        country: country.name.common.toLowerCase()
      }
    })),
    fallback: 'blocking'
  };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const [countryRes, countriesRes] = await Promise.all([
    fetch(`https://restcountries.com/v3.1/name/${params!.country}`),
    fetch('https://restcountries.com/v3.1/all')
  ]);

  const [country, countries] = (await Promise.all([
    countryRes.json(),
    countriesRes.json()
  ])) as [Country[], Country[]];

  const countriesNames = countries.map(country => ({
    name: country.name.common,
    short: country.cca3
  }));

  if (!countryRes.ok) {
    return {
      props: {} as never,
      notFound: true
    };
  }

  return {
    props: {
      country: country[0] as Country,
      countriesNames
    }
  };
};

export default Country;
