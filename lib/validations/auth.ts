import { z, ZodError } from "zod";

export type validationError = {
    error: any
}
export function validateName(name: string) {
    try {
        return z.string().min(3).parse(name)
    } catch (error) {
        if (error instanceof ZodError) {
            return {error: JSON.parse(error.message)}
        }
    }
}

export function validateEmail(email: string) {
    try {
        return z.string().email().parse(email)
    } catch (error) {
        if (error instanceof ZodError) {
            return {error: JSON.parse(error.message)}
        }
    }
}
export function validatePassword(password: string) {
    try {
        return z.string().min(6).parse(password)
    } catch (error) {
        if (error instanceof ZodError) {
            return {error: JSON.parse(error.message)}
        }
    }
}
    
