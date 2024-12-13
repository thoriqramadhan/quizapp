'use server'

import { validateEmail, validateName, validatePassword } from "../validations/auth"


export async function register(prevState: any , formData: HTMLFormElement) {
    try {
        const [name, email, password] = [formData.get('name'), formData.get('email'), formData.get('password')]
        const nameResponse = validateName(name)
        const emailResponse = validateEmail(email)
        const passwordResponse = validatePassword(password)
        if (nameResponse!.error || emailResponse!.error || passwordResponse!.error) {
            return {status: 400 , errors: {name: nameResponse , email:emailResponse , password: passwordResponse}}
        }
        return {status: 200 , data :{name : nameResponse, email: emailResponse , password: passwordResponse}}
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