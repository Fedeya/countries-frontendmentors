import type { InferGetStaticPropsType, NextPage } from 'next';
import type { Country } from '@/typings';

import CountriesList from '@/components/CountriesList';
import Filters from '@/components/Filters';
import Head from 'next/head';

type HomeProps = InferGetStaticPropsType<typeof getStaticProps>;

const Home: NextPage<HomeProps> = ({ countries, regions }) => {
  return (
    <div className="px-20 py-10">
      <Head>
        <title>Countries</title>
      </Head>

      <Filters regions={regions} />

      <CountriesList countries={countries} />
    </div>
  );
};

export const getStaticProps = async () => {
  const res = await fetch('https://restcountries.com/v3.1/all');

  const countries = (await res.json()) as Country[];

  const regions = Array.from(new Set(countries.map(country => country.region)));

  return {
    props: {
      countries,
      regions
    }
  };
};

export default Home;
