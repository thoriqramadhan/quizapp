import bcrypt from 'bcrypt'
export async function hash(value) {
    return await bcrypt.hash(value , 10)
}