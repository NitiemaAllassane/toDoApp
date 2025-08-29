import { PrismaClient } from "@prisma/client";
import { error, fail } from "@sveltejs/kit";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };
const prisma = globalForPrisma.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;


export const load = async () => {
    try {
        const tasks = await prisma.task.findMany({
            orderBy: { createAt: "desc" }
        })

        return { tasks };
    } catch (error) {
        console.error('Erreur de chargement:', error);
        return { tasks: [] };
    }
}

export const actions = {
    addTask: async ({ request }) => {
        const data = await request.formData();
        const description = data.get("todo") as string;

        if (!description || description.trim() === "") {
            return fail(400, {
                error: true,
                message: "Entrez une taches avant de soumettre."
            })
        }

        try {
            await prisma.task.create({
                data: {
                    description: description.trim()
                }
            });
            return { success: true };
        } catch (error) {
            return fail(500, {
                error: true,
                message: "Il y'a eu un probleme lors de l'ajout de votre taches: RESSAYER !"
            });
        }
    }
}