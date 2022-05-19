import Image from 'next/image';
import { useEffect, useState } from 'react';
import { MovieInterface } from '../typings';
import { baseUrl } from '../constants/movie'; 
import { FaPlay } from 'react-icons/fa';
import { InformationCircleIcon } from '@heroicons/react/solid';

interface PropsInterface {
	netflixOriginals: MovieInterface[]
}

function Banner ({ netflixOriginals }: PropsInterface) {
    const [movie, setMovie] = useState<MovieInterface | null>(null);

    useEffect(() => {
        setMovie(
            netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
        );
    }, [netflixOriginals]);

    console.log(movie);
    console.log(`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`);

    return (
        <div className='flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12'>
            <div className='absolute top-0 left-0 -z-10 w-screen h-[95vh]'>
                <Image
                    src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
                    alt='Movie banner'
                    layout='fill'
                    objectFit='cover'
                />
            </div>

            <h1 className='text-2xl lg:text-7xl md:text-4xl'>
                {movie?.title || movie?.name || movie?.original_name}
            </h1>
            <p className='max-w-xs text-xs md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl text-shadow-md'>
                {movie?.overview}
            </p>

            <div className='flex space-x-3'>
                <button className='bannerBtn bg-white text-black'>
                    <FaPlay className='w-4 h-4 text-black md:h-7 md:w-7' />
                    Play
                </button>
                <button className='bannerBtn bg-[gray]/70'>
                    More Info
                    <InformationCircleIcon className='w-5 h-5 md:w-8 md:h-8' />
                </button>
            </div>
        </div>
    )
}

export default Banner;
