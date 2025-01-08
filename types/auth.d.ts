import { number } from "zod"

interface User {
    name: string,
    email:string
}
interface UserDb{
    id: number,
    name:string,
    email: string,
    password: string
}