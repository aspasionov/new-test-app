'use client';
import { useEffect, useState } from 'react';
import { client } from '@/contentful';
import { Preloader } from '@/app/components/Preloader';
import { useSearchParams } from 'next/navigation';

import Link from 'next/link';

import { Button } from '@/app/components/Button';
import { Dropdown } from '@/app/components/Dropdown';

type Link = {
  id: number;
  text: string;
  href: string;
};

const getData = async (locale: string | null) => {
  const data = await client.getEntries({
    content_type: 'header',
    locale: locale || 'uk'
  });
  return data;
};

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [links, setLinks] = useState<Link[]>([]);
  const [btnText, setBtnText] = useState('');
  const searchParams = useSearchParams();
  const locale = searchParams.get('locale');

  useEffect(() => {
    setLoading(true);
    getData(locale)
      .then((data) => {
        const links: Link[] = data?.items?.[0]?.fields?.items?.map((item) => {
          return item.fields;
        });
        setLinks(links);
        setBtnText(data.items[0].fields.button as string);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [locale]);

  if (loading) return <Preloader />;

  return (
    <header className="h-[70px] py-2 relative z-10">
      <div className="container flex items-center justify-between mx-auto">
        <Link href="/" className="w-10 h-10 block">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 50 50"
            style={{ fill: '#ffffff' }}
          >
            <path d="M46.707,12.293l-8-8c-0.391-0.391-1.023-0.391-1.414,0L25,16.586L12.707,4.293c-0.391-0.391-1.023-0.391-1.414,0l-8,8	C3.105,12.48,3,12.735,3,13v23c0,0.265,0.105,0.52,0.293,0.707l10,10c0.286,0.287,0.718,0.372,1.09,0.217	C14.757,46.769,15,46.404,15,46V25.414l9.293,9.293C24.488,34.902,24.744,35,25,35s0.512-0.098,0.707-0.293L35,25.414V46	c0,0.404,0.243,0.769,0.617,0.924C35.741,46.975,35.871,47,36,47c0.26,0,0.516-0.102,0.707-0.293l10-10	C46.895,36.52,47,36.265,47,36V13C47,12.735,46.895,12.48,46.707,12.293z"></path>
          </svg>
        </Link>
        <nav
          className={` ${
            isOpen
              ? 'fixed inset-0 z-10 flex flex-col items-center justify-center bg-black bg-opacity-90'
              : 'hidden md:block'
          }`}
        >
          <button
            type="button"
            className="md:hidden absolute top-4 right-4 text-white hover:text-orange-500 transition-all duration-200"
            onClick={() => setIsOpen(false)}
          >
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          {links.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              className="mx-4 hover:text-orange-500 transition-all duration-200 text-white"
            >
              {link.text}
            </Link>
          ))}
        </nav>
        <div className="flex">
          <Dropdown className="mr-4" />
          <Button>{btnText}</Button>
          <button
            type="button"
            className="ml-4 md:hidden"
            onClick={() => setIsOpen(true)}
          >
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};
