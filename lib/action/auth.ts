'use server'

import { prisma } from "@/utils/db"
import { validateEmail, validateName, validatePassword } from "../validations/auth"
import { hash } from "@/utils/hashing"
import { createSession } from "./jwt"


export async function register(prevState: any , formData: HTMLFormElement) {
    try {
        const [name, email, password] = [formData.get('name'), formData.get('email'), formData.get('password')]
        const nameResponse = validateName(name)
        const emailResponse = await validateEmail(email)
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
        await createSession({name: name , email: email})
    } catch (error) {
        return {status: 400 , data : JSON.stringify(error)}
    }
}
export async function login(prevState: any, formData: HTMLFormElement) {
    try {
        const [password, email] = [formData.get('password'), formData.get('email')]
        const dbEmail = await prisma.user.findFirst({
            where: {
                emai: email
            }
        })
        if (!dbEmail) {
            console.log('invalid payload email')
            return{status: 400 , errors: {email: 'Invalid Payload!'} }
        }
        const emailResponse = await validateEmail(email)
        const passwordResponse = await validatePassword(password, 'db', emailResponse as string)
        console.log('checking ')
        if (emailResponse!.error || passwordResponse.error) {

            return {status: 400 , errors: {email: email.error , password: passwordResponse.error}}
        }
    } catch (error) {
        return {status: 400}
    }
}