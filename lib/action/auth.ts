'use server'

import { prisma } from "@/utils/db"
import { validateEmail, validateName, validatePassword } from "../validations/auth"
import { hash } from "@/utils/hashing"
import { createSession } from "./jwt"
import { getEmail } from "@/helper/db"


export async function register(prevState: any , formData: HTMLFormElement) {
    try {
        const [name, email, password] = [formData.get('name'), formData.get('email'), formData.get('password')]
        const nameResponse = validateName(name)
        const emailResponse = await validateEmail(email)
        const passwordResponse = await validatePassword(password)
        const errorConstruct = {name: nameResponse!.error , email:emailResponse!.error , password: passwordResponse!.error}
        if (nameResponse!.error || emailResponse!.error || passwordResponse!.error) {
            return {status: 400 , errors: errorConstruct}
        }
        
        const isEmailDuplicate = await getEmail(emailResponse as string)
        if (isEmailDuplicate) {
            errorConstruct.email = 'Email is taken.'
            return {status: 400 , errors: errorConstruct}
        }
        const hashedPassword = await hash(passwordResponse)
        await prisma.user.create({
            data: {
                name: nameResponse as string,
                emai: emailResponse as string,
                password: hashedPassword
            }
        })
        await createSession({ name: name, email: email })
        return {status: 200 , messages: 'Success'}
    } catch (error) {
        console.log(error)
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