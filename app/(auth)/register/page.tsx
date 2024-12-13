'use client'
import { Button } from '@/components/client/Button';
import { CardLayout } from '@/components/server/Card';
import { Container } from '@/components/server/Container';
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
    return <Container>
        <CardLayout className='border-none shadow-none py-20 h-full'>
            <h1 className='text-title'>Register</h1>
            <form action={registerAction} className='mt-5 space-y-5 h-full flex flex-col justify-between'>
                <section className='space-y-5'>
                    <InputSection name='name' type={'text'} isRequired={true} />
                    <InputSection name='email' type='email' isRequired={true} />
                    <InputSection name='password' type='password' isRequired={true} />
                    <span className='w-full flex justify-end'>
                        <Link href={'/login'} className='text-sm text-slate-700 hover:underline '>already have an account?</Link>
                    </span>
                </section>
                <Button className='w-full justify-center mt-auto'>{isPending ? <Loading /> : 'Register'}</Button>
            </form>
        </CardLayout>
    </Container>
}

export default Regsiter;