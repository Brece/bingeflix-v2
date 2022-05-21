import { SearchIcon, BellIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';

function Header () {
    const [isScrolled, setIsScrolled] = useState(false);
    const { logout } = useAuth();

    const handleScroll = () => {
        if(window.scrollY > 0) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);

    return (
        <header className={`${isScrolled && 'bg-[#141414]'}`}>
            <div className='flex items-center space-x-2 md:space-x-10'>
                <Image
                    src='/img/logo-monochrome.svg'
                    alt='BingeFlix Logo'
                    width={150}
                    height={100}
                    layout='raw'
                    className='cursor-pointer object-contain'
                />

                <ul className='hidden space-x-4 md:flex'>
                    <li className='headerLink'>Home</li>
                    <li className='headerLink'>TV Shows</li>
                    <li className='headerLink'>Movies</li>
                    <li className='headerLink'>New & Popular</li>
                    <li className='headerLink'>My List</li>
                </ul>
            </div>

            <div className='flex items-center space-x-4 text-sm font-light'>
                <SearchIcon className='hidden sm:inline w-6 h-6' />
                <p className='hidden lg:inline'>Kids</p>
                <BellIcon className='w-6 h-6' />
                {/* <Link href='/account'> */}
                    <Image 
                        src='/img/user.jpg'
                        alt='Profile image'
                        width={24}
                        height={24}
                        layout='raw'
                        className='cursor-pointer rounded'
                        onClick={logout}
                    />
                {/* </Link> */}
            </div>
        </header>
    )
}

export default Header;
