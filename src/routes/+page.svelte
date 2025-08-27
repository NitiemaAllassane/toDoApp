<script lang="ts">
    import { Trash2 } from "@lucide/svelte";
</script>



<main class=" mt-5">

    <section>
        <div class="container mx-auto">
            <h1 class=" text-4xl font-bold text-gray-700 mb-6">Votre liste de taches</h1>
            <ul class="space-y-4">
                <li class="flex items-center justify-between bg-white shadow-md p-4 hover:bg-gray-50 transition-colors">
                    <div class="flex items-center gap-3">
                        <input 
                            type="checkbox" 
                            id="complete-1" 
                            name="complete" 
                            class="w-5 h-5 text-blue-500 border-gray-300 rounded"
                        >
                        <p class="text-gray-600 font-semibold">
                            Description de la tâche
                        </p>
                    </div>
                    <form>
                        <input type="hidden" name="taskId" value="1">
                        <button 
                            type="submit" 
                            class="text-red-400 hover:text-red-600 cursor-pointer"
                            aria-label="Supprimer la tâche"
                        >
                            <Trash2 />
                        </button>
                    </form>
                </li>
            </ul>
        </div>
    </section>


    <div class="container mx-auto py-6 px-5 bg-white fixed w-full bottom-0 left-1/2 -translate-x-1/2">
        <form method="post">
            <div class="flex flex-col md:flex-row md:items-center md:justify-center gap-5">
                <label 
                    for="todo"
                    class="text-xl font-semibold"
                >
                    Ajouter une tache
                </label>
                <input 
                    type="text" 
                    name="todo" 
                    id="todo"
                    placeholder="Par exemple: Acheter une pomme"
                    required
                    class=" text-lg font-normal md:w-2xl max-w-full py-2 px-3 border rounded focus:outline-2 
                    focus:outline-blue-500"
                >
                <button 
                    type="submit"
                    class=" py-2.5 px-5 bg-blue-500 rounded text-white font-semibold cursor-pointer 
                    border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-colors"
                >
                    Ajouter la tache
                </button>
            </div>
        </form>
    </div>
</main>