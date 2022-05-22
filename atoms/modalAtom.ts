import { DocumentData } from 'firebase/firestore';
import { atom } from 'recoil';
import { MovieInterface } from '../typings';

export const modalState = atom({
    key: 'modalState',
    default: false,
});

export const movieState = atom<MovieInterface | DocumentData | null>({
    key: 'movieState',
    default: null,
});
