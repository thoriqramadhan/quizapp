import { prisma } from "@/utils/db";
import { z, ZodError } from "zod";
import bcrypt from 'bcrypt'

export type validationError = {
    error: any
}
export function validateName(name: string) {
    try {
        return z.string().min(3).parse(name)
    } catch (error) {
        if (error instanceof ZodError) {
            return {error: JSON.parse(error.message)[0].message}
        }
    }
}

export async function validateEmail(email: string ,option?: 'db') {
    try {
        const zodResponse = z.string().email().parse(email)
        if (option == 'db') {
            const isEmailAvailable = await prisma.user.findFirst({ where: { emai: email } })
            if (!isEmailAvailable) {
                throw new Error('No email used!')
            }
        }
        return zodResponse;
    } catch (error) {
        if (error instanceof ZodError) {
            return {error: JSON.parse(error.message)[0].message}
        }
        return {error: 'Invalid payload!'}
    }
}
export async function validatePassword(password: string , option? : 'db' , dbPassword?: string){
    try {
        const zodResponse = z.string().min(6).parse(password)
        if (option == 'db') {
            const isPasswordValid = await bcrypt.compare(password, dbPassword!)
            console.log(password , dbPassword , isPasswordValid)
            if (isPasswordValid) {
                return isPasswordValid
            }
            return {error: 'Invalid Payload'}
        }
        return zodResponse
    } catch (error) {
        if (error instanceof ZodError) {
            console.log(JSON.parse(error.message))
            return {error: JSON.parse(error.message)[0].message}
        }
        return {error: 'Invalid Payload!'}
    }
}
    
