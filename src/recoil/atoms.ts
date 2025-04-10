import { atom } from 'recoil';
import Page from '../types/page';
import User from '../types/user';

export const paginasState = atom<Page[]>({
    key: 'paginasState',
    default: [],
});

export const userState = atom<User | null>({
    key: 'userState',
    default: null,
})

export const imagesState = atom<(string | null)[]>({
    key: 'imagesState',
    default: [null, null, null],
});

export const filesState = atom<(File | null)[]>({
    key: 'filesState',
    default: [null, null, null],
});

export const descricaoState = atom<string>({
    key: 'descricaoState',
    default: '',
});

export const errorState = atom<string>({
    key: 'errorState',
    default: '',
});

export const fieldErrorsState = atom<{ [key: string]: string }>({
    key: 'fieldErrorsState',
    default: {},
});

