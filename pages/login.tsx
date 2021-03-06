import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import useAuth from '../hooks/useAuth';

interface InputsInterface {
    email: string,
    password: string,
}

function Login () {
    const [login, setLogin] = useState<boolean>(false);
    const { signIn, signUp } = useAuth();

    const { register, handleSubmit, formState: { errors } } = useForm<InputsInterface>();
    const onSubmit: SubmitHandler<InputsInterface> = async ({ email, password}) => {
        if(login) {
            await signIn(email, password);
        } else {
            await signUp(email, password);
        }
    };

    return (
        <div className='relative flex flex-col w-screen h-screen bg-black md:items-center md:justify-center md:bg-transparent'>
            <Head>
				<title>BingeFlix</title>
				<meta name='description' content='Generated by create next app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
            
            <Image
                src='https://rb.gy/p2hphi'
                alt='Login Wallpaper'
                layout='fill'
                objectFit='cover'
                className='-z-10 !hidden opacity-60 sm:!inline'
            />

            <Image
                src='/img/logo-monochrome.svg'
                alt='BingeFlix Logo'
                width={150}
                height={100}
                layout='raw'
                className='absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6'
            />

            <form
                onSubmit={handleSubmit(onSubmit)}
                className='relative mt-24 space-y-8 py-10 px-6 rounded bg-black/75 md:mt-0 md:max-w-md md:px-14'
            >
                <h1 className='text-4xl font-semibold'>
                    Login
                </h1>
                <div className='space-y-4'>
                    <label htmlFor='email' className='inline-block w-full'>
                        <input
                            type='email'
                            id='email'
                            placeholder='Email'
                            className='loginInput'
                            {...register('email', { required: true })}
                        />
                        {errors.email && (
                            <p className='p-1 text-[13px] font-light text-orange-500'>
                                Please enter a valid email.
                            </p>
                        )}
                    </label>
                    <label htmlFor='password' className='inline-block w-full'>
                        <input
                            type='password'
                            id='password'
                            placeholder='Password'
                            className='loginInput'
                            {...register('password', { required: true })}
                        />
                        {errors.email && (
                            <p className='p-1 text-[13px] font-light text-orange-500'>
                                Your password must contain between 4 and 60 characters.
                            </p>
                        )}
                    </label>
                </div>

                <button
                    type='submit'
                    className='w-full rounded bg-primary py-3 font-semibold'
                    onClick={() => setLogin(true)}
                >
                    Login
                </button>

                <div className='text-[grey]'>
                    <span>New to BingeFlix? </span>
                    <button
                        type='submit'
                        className='text-white hover:underline'
                        onClick={() => setLogin(false)}
                    >
                        Sign up now!
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;
