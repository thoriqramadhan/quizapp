'use server'

import { prisma } from "@/utils/db"
import { validateEmail, validateName, validatePassword } from "../validations/auth"
import { hash } from "@/utils/hashing"


export async function register(prevState: any , formData: HTMLFormElement) {
    try {
        const [name, email, password] = [formData.get('name'), formData.get('email'), formData.get('password')]
        const nameResponse = validateName(name)
        const emailResponse = validateEmail(email)
        // const emailDB = await prisma.user.findFirst({
        //     where: {
        //         emai
        //     }
        // })
        const passwordResponse = validatePassword(password)
        if (nameResponse!.error || emailResponse!.error || passwordResponse!.error) {
            return {status: 400 , errors: {name: nameResponse , email:emailResponse , password: passwordResponse}}
        }
        const hashedPassword = await hash(passwordResponse)
        await prisma.user.create({
            data: {
                name: nameResponse as string,
                email: emailResponse as string,
                password: hashedPassword
            }
        })
    } catch (error) {
        return {status: 400 , data : JSON.stringify(error)}
    }
}
export async function login(prevState: any, formData: HTMLFormElement) {
    try {
        const test = new Promise((resolve) => {
            setTimeout(() => {
                resolve('done')
            } , 4000)
        })
        return {status:200}
    } catch (error) {
        return {status: 400}
    }
}