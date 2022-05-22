import Image from 'next/image';
import { useRecoilState } from 'recoil';
import { modalState, movieState } from '../atoms/modalAtom';
import { MovieInterface } from '../typings';

interface PropsInterface {
    // movie: MovieInterface | DocumentData,
    movie: MovieInterface,
}

function Thumbnail ({movie}: PropsInterface) {
    const [showModal, setShowModal] = useRecoilState(modalState);
	const [currentMovie, setCurrentMovie] = useRecoilState(movieState);

    return (
        <div
            className='relative min-w-[180px] h-28 cursor-pointer transition duration-200 ease-out md:min-w-[260px] md:h-36 md:hover:scale-105'
            onClick={() => {
                setCurrentMovie(movie);
                setShowModal(true);
            }}
        >
            <Image
                src={`https://image.tmdb.org/t/p/w500${
                    movie.backdrop_path || movie.poster_path
                }`}
                alt='Movie Thumbnail'
                layout='fill'
                className='rounded-sm object-cover md:rounded'
            />
        </div>
    );
}

export default Thumbnail;
