import { z, ZodError } from "zod";

export function validateString(min:number, max:number ,value:string) {
    try {
        return z.string().min(min).max(max).parse(value)
    } catch (error) {
        if (error instanceof ZodError) {
            return {error: JSON.parse(error.message)[0].message}
        }
    }
}