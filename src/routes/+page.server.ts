import { PrismaClient } from "@prisma/client";
import { error, fail } from "@sveltejs/kit";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };
const prisma = globalForPrisma.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;


export const load = async () => {
    try {
        const tasks = await prisma.task.findMany({
            orderBy: { createAt: "asc" }
        })

        return { tasks };
    } catch (error) {
        console.error('Erreur de chargement:', error);
        return { tasks: [] };
    }
}

export const actions = {
    // ajouter une taches
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
                message: "Il y'a eu un probleme lors de l'ajout de votre taches: Veuillez rester !"
            });
        }
    },

    // supprimer une tache
    deleteTask: async ({ request }) => {
        const data = await request.formData();
        const taskId = Number( data.get("taskId") );

        if (!taskId || isNaN(taskId)) {
            return fail(400, {
                error: true,
                errorMessage: "Nous ne pouvons pas supprimer cette tache."
            });
        }

        try {
            await prisma.task.delete({
                where: { id: taskId }
            })

            return { success: true };
        } catch (error) {
            console.log("Error lors de la suppression : ", error);
            return fail(500, {
                error: true,
                errorMessage: "Nous avons eu une erreur lors de la suppression de la tache."
            });
        }
    },

    // changer le status de la tache (terminé ou en cours)
    updateTaskStatus: async ({ request }) => {
        const data = await request.formData();
        const taskId = Number( data.get("taskId") );
        const isDone = data.get("isDone") === "true";

        if (!taskId || isNaN(taskId)) {
            return fail(400, {
                error: true,
                errorMessage: "ID de la tache est invalide"
            });
        }

        try {
            await prisma.task.update({
                where: { id: taskId },
                data: { isDone: isDone }
            });

            return { success: true };
        } catch (error) {
            console.log("Error lors de la mise a jour de l'etat de la tache : ", error);
            return fail(500, {
                error: true,
                errorMessage: "Nous avons eu une erreur lors de la mise a jour de l'etat de la tache"
            })
        }
    }
}