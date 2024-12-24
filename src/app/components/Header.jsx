'use client';
import { Button, Navbar, TextInput } from 'flowbite-react';
import Link from 'next/link';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon,FaSun } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import {useTheme} from 'next-themes';
import { SignedIn,SignedOut,SignInButton,UserButton } from '@clerk/nextjs';
import {dark,light} from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';


export default function Header() {
  const path = usePathname();
  const {theme, setTheme} = useTheme();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const searchParams = useSearchParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(searchParams);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    router.push(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(searchParams);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [searchParams]);

  return (
    <Navbar className='border-b-2'>
      <Link
        href='/'
        className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'
      >
        <span className='px-2 py-1 bg-gradient-to-r from-pink-500 via-orange-500 to-purple-500 rounded-lg text-white'>
          Blogify.
        </span>
      </Link>
      <form onSubmit={handleSubmit}>
        <TextInput
          type='text'
          placeholder='Search...'
          rightIcon={AiOutlineSearch}
          className='hidden lg:inline'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      <Button className='w-12 h-10 lg:hidden' color='gray' pill>
        <AiOutlineSearch />
      </Button>
      <div className='flex gap-2 md:order-2'>
        <Button className='w-12 h-10 hidden sm:inline' color='gray' pill
         onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          {theme === 'light' ? <FaSun /> : <FaMoon />}
        </Button>
        <SignedIn>
          <UserButton appearance={{
            baseTheme: theme === 'light' ? 'light' : 'dark',
          }}
           userProfileUrl='/dashboard?tab=profile'
          />
        </SignedIn>
        <SignedOut>
          <Link href='/sign-in'>
          <Button gradientDuoTone='pinkToOrange' outline>Sign In</Button>
           </Link>
        </SignedOut>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Link href='/'>
          <Navbar.Link active={path === '/'} as={'div'}>
            Home
          </Navbar.Link>
        </Link>
        <Link href='/about'>
          <Navbar.Link active={path === '/about'} as={'div'}>
            About
          </Navbar.Link>
        </Link>
        <Link href='/contactus'>
          <Navbar.Link active={path === '/contactus'} as={'div'}>
            Contact Us
          </Navbar.Link>
        </Link>
      </Navbar.Collapse>
    </Navbar>
  );
}