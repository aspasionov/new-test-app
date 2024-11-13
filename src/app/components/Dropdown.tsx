'use client';
import { useEffect, useState } from 'react';
import { client } from '@/contentful';
import { useSearchParams, useRouter } from 'next/navigation';

type Props = {
  className?: string;
};

type Locale = {
  code: string;
  name: string;
  default: boolean;
  fallbackCode: string | null;
  sys: {
    id: string;
    type: 'Locale';
    version: number;
  };
};

const getData = async () => {
  const { items } = await client.getLocales();
  return items;
};

export const Dropdown = ({ className }: Props) => {
  const searchParams = useSearchParams();
  const locale = searchParams.get('locale');
  const router = useRouter();
  const [data, setData] = useState<Locale[]>([]);
  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    router.push(`/?locale=${event.target.value}`);
  };

  useEffect(() => {
    getData().then((data) => {
      setData(data);
    });
  }, []);
  const defaultLocale = locale || 'uk';

  return (
    <div className={`relative text-left ${className}`}>
      <select
        value={defaultLocale}
        onChange={handleSelect}
        className="block text-white bg-black appearance-none w-full border border-gray-400 hover:border-gray-500 px-4 py-2.5 pr-8 rounded-lg shadow leading-tight focus:outline-none focus:shadow-outline"
        style={{ color: 'white' }}
      >
        {data.map(({ code }) => (
          <option key={code} value={code}>
            {code}
          </option>
        ))}
      </select>
    </div>
  );
};
