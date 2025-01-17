import { prisma } from "@/utils/db";

async function main() {

    const adminUser = {
        name: 'Admin',
        email: 'admin@gmail.com',
        password: '123321'
    }
    const formData = new FormData();

// Menambahkan data ke FormData
    for (const key in adminUser) {
        if (adminUser.hasOwnProperty(key)) {
            formData.append(key, adminUser[key as keyof typeof adminUser]);
        }
    }
    console.log(formData.get('name'))
}