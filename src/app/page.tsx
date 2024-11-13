'use client';
import { useState, useEffect } from 'react';
import { client } from '@/contentful';
import { useSearchParams } from 'next/navigation';

const getData = async (locale: string | undefined) => {
  const data = await client.getEntries({
    content_type: 'main',
    locale: locale || 'uk'
  });

  return data;
};

export default function Home() {
  const [data, setData] = useState({
    title: '',
    subtitle: ''
  });
  const searchParams = useSearchParams();
  const locale = searchParams.get('locale');

  useEffect(() => {
    getData(locale).then((data) => {
      setData(data.items[0].fields);
    });
  }, [locale]);

  return (
    <main className="min-h-screen mt-[-70px] pt-[30px] bg-hero bg-cover flex">
      <div className="container mx-auto text-white flex items-center">
        <div className="lg:max-w-[60%] lg:text-left text-center">
          <h1 className="text-6xl font-bold mb-4 ">{data.title}</h1>
          <p>{data.subtitle}</p>
        </div>
      </div>
    </main>
  );
}
