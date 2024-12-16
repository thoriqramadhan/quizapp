'use client'
import { Button } from '@/components/client/Button';
import { CardLayout } from '@/components/server/Card';
import { Container } from '@/components/server/Container';
import ErrorMessage from '@/components/server/ErrorMessage';
import { InputSection } from '@/components/server/Form';
import Loading from '@/components/server/Loading';
import { InputBoolean } from '@/components/server/ui/Input';
import Label from '@/components/server/ui/Label';
import { login } from '@/lib/action/auth';
import Link from 'next/link';
import { FC, useActionState } from 'react';

interface PageProps {

}

const Page: FC<PageProps> = ({ }) => {
    const [message, loginAction, isPending] = useActionState(login, null)
    const isEmailInvalid = message?.errors?.email;
    const isPasswordInvalid = message?.errors?.password
    return <Container className='md:flex md:justify-center md:items-center'>
        <CardLayout className='border-none shadow-none py-20 h-full md:w-[60%] lg:w-[50%]'>
            <h1 className='text-title'>Login</h1>
            <form action={loginAction} className='mt-5 space-y-5 h-full flex flex-col justify-between'>
                <section className='space-y-5'>
                    <InputSection name='email' type='email' isRequired={true} error={isEmailInvalid ?? <ErrorMessage text={isEmailInvalid} />} />
                    <InputSection name='password' type='password' isRequired={true} error={isPasswordInvalid ?? <ErrorMessage text={isPasswordInvalid} />} />
                    <span className="flex justify-between">
                        <span className='flex gap-x-3'>
                            <InputBoolean name='remind_me' type='checkbox' />
                            <Label htmlFor='remind_me' className='text-sm font-semibold text-slate-600' />
                        </span>
                        <Link href={'/register'} className='text-sm text-slate-700 hover:underline '>dont have an account?</Link>
                    </span>
                </section>
                <Button className='w-full justify-center mt-auto md:py-2'>{isPending ? <Loading /> : 'Login'}</Button>
            </form>
        </CardLayout>
    </Container>
}

export default Page;