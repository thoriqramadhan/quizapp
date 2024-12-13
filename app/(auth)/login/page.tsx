'use client'
import { Button } from '@/components/client/Button';
import { CardLayout } from '@/components/server/Card';
import { Container } from '@/components/server/Container';
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
    return <Container>
        <CardLayout className='border-none shadow-none py-20 h-full'>
            <h1 className='text-title'>Login</h1>
            <form action={loginAction} className='mt-5 space-y-5 h-full flex flex-col justify-between'>
                <section className='space-y-5'>
                    <InputSection name='name' type={'text'} isRequired={true} />
                    <InputSection name='email' type='email' isRequired={true} />
                    <InputSection name='password' type='password' isRequired={true} />
                    <span className="flex justify-between">
                        <span className='flex gap-x-3'>
                            <InputBoolean name='remind_me' type='checkbox' />
                            <Label htmlFor='remind_me' className='text-sm font-semibold text-slate-600' />
                        </span>
                        <Link href={'/register'} className='text-sm text-slate-700 hover:underline '>dont have an account?</Link>
                    </span>
                </section>
                <Button className='w-full justify-center mt-auto'>{isPending ? <Loading /> : 'Login'}</Button>
            </form>
        </CardLayout>
    </Container>
}

export default Page;