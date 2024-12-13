'use client'
import { Button } from '@/components/client/Button';
import { CardLayout } from '@/components/server/Card';
import { Container } from '@/components/server/Container';
import Loading from '@/components/server/Loading';
import { register } from '@/lib/action/auth';
import { FC, useActionState, useEffect } from 'react';

interface RegsiterProps {

}

const Regsiter: FC<RegsiterProps> = ({ }) => {
    const [state, registerAction, isPending] = useActionState(register, null)
    console.log(state);
    return <Container>
        <CardLayout className='border-none shadow-none py-20 h-full'>
            <h1 className='text-title'>Register</h1>
            <form action={registerAction} className='mt-5 space-y-5 h-full flex flex-col justify-between'>
                <section className='space-y-5'>
                    <section className='flex flex-col space-y-2'>
                        <label htmlFor="name" className='font-semibold text-slate-500'>Name</label>
                        <input type="text" name="name" id="name" className='border-b-[3px] focus:outline-none' />
                    </section>
                    <section className='flex flex-col space-y-2'>
                        <label htmlFor="email" className='font-semibold text-slate-500'>Email</label>
                        <input type="text" name="email" id="email" className='border-b-[3px] focus:outline-none' />
                    </section>
                    <section className='flex flex-col space-y-2'>
                        <label htmlFor="password" className='font-semibold text-slate-500'>Password</label>
                        <input type="password" name="password" id="password" className='border-b-[3px] focus:outline-none' />
                    </section>
                    <span className='flex gap-x-3'>
                        <input type="checkbox" name="remind_me" id="remind_me" className='bg-slate-500' />
                        <label htmlFor='remind_me' className='text-sm font-semibold text-slate-600'>Remember me</label>
                    </span>
                </section>
                <Button className='w-full justify-center mt-auto'>{isPending ? <Loading /> : 'Register'}</Button>
            </form>
        </CardLayout>
    </Container>
}

export default Regsiter;