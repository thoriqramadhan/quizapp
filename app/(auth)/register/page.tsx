'use client'
import { Button } from '@/components/client/Button';
import { CardLayout } from '@/components/server/Card';
import { Container } from '@/components/server/Container';
import ErrorMessage from '@/components/server/ErrorMessage';
import { InputSection } from '@/components/server/Form';
import Loading from '@/components/server/Loading';
import { InputBoolean } from '@/components/server/ui/Input';
import Label from '@/components/server/ui/Label';
import { register } from '@/lib/action/auth';
import Link from 'next/link';
import { FC, useActionState, useEffect } from 'react';

interface RegsiterProps {

}

const Regsiter: FC<RegsiterProps> = ({ }) => {
    const [message, registerAction, isPending] = useActionState(register, null)
    const isEmailError = message?.errors?.email?.error?.[0]?.message || false
    const isNameError = message?.errors?.name?.error?.[0]?.message || false
    const isPasswordError = message?.errors?.password?.error?.[0]?.message || false


    return <Container className='md:flex md:justify-center md:items-center'>
        <CardLayout className='border-none shadow-none py-20 h-full md:w-[60%] lg:w-[50%]'>
            <h1 className='text-title'>Register</h1>
            <form action={registerAction} className='mt-5 space-y-5 h-full flex flex-col justify-between'>
                <section className='space-y-5'>
                    <InputSection name='name' type={'text'} isRequired={true} error={isNameError && <ErrorMessage text={isNameError} />} />
                    <InputSection name='email' type='email' isRequired={true} error={isEmailError && <ErrorMessage text={isEmailError} />} />
                    <InputSection name='password' type='password' isRequired={true} error={isPasswordError && <ErrorMessage text={isPasswordError} />} />
                    <span className='w-full flex justify-end'>
                        <Link href={'/login'} className='text-sm text-slate-700 hover:underline '>already have an account?</Link>
                    </span>
                </section>
                <Button className='w-full justify-center mt-auto md:py-2'>{isPending ? <Loading /> : 'Register'}</Button>
            </form>
        </CardLayout>
    </Container>
}

export default Regsiter;