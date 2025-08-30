<script lang="ts">
    import { enhance } from "$app/forms";
    import { fly, slide } from "svelte/transition";
    import { Trash2, Check } from "@lucide/svelte";

    let { data, form } = $props();

    interface Task {
        id: number,
        description: string | null,
        isDone: boolean,
        createAt: Date,
        updateAt: Date
        
    }

    let tasks: Task[] = $derived(data.tasks);

    /**
     * TODO: Ajout de d'une fonctionnalité qui permet de supprimer toutes les taches en meme temps
     * TODO: Ajout d'une fonctionnalié qui permet de modifier une tache
    */

</script>



<main class="mt-5">

    <section>
        <div class="container mx-auto min-h-[85vh] ">
            <h1 class=" text-4xl text-center md:text-start font-bold text-gray-700 mb-6">
                Votre liste de taches
            </h1>

            <!-- display error message -->
             {#if form?.error}
                <p class="text-red-600 text-center">{form.message}</p>
             {/if}

            <ul class="space-y-4 pb-36">
                {#if tasks.length === 0}
                    <h3 class=" text-2xl font-light text-center mt-16 text-gray-600">
                        Vous n'avez rien a faire pour le moment 🙂
                    </h3>
                {:else}
                    {#each tasks as task (task.id)}
                        <li 
                            in:fly={{ y: 20, duration: 300 }}
                            out:slide={{ duration: 200 }}
                            class="flex items-center justify-between bg-white shadow-md p-4
                            hover:bg-gray-50 transition-colors"
                        >
                            <div class="flex items-center gap-3">
                                <!-- checkbox input -->
                                <form 
                                    method="POST" 
                                    action="?/updateTaskStatus"
                                    use:enhance
                                >
                                    <input type="hidden" name="taskId" value={task.id}>
                                    <input type="hidden" name="isDone" value={!task.isDone}>
                                    <button
                                        type="submit"
                                        class="w-6 h-6 rounded-full border-2 flex items-center justify-center
                                            {task.isDone ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 hover:border-green-400'}
                                            transition-colors cursor-pointer"
                                        aria-label={task.isDone ? 'Marquer comme non terminé' : 'Marquer comme terminé'}
                                    >
                                        {#if task.isDone}
                                            <Check size={16} />
                                        {/if}
                                    </button>
                                </form>

                                <!-- Taks description -->
                                <p class="text-gray-600 font-semibold {task.isDone ? ' line-through' : ''} ">
                                    { task.description }
                                </p>

                                {#if task.isDone}
                                    <span class=" text-green-600 font-black">
                                        <Check  />
                                    </span>
                                {/if}
                            </div>

                            <!-- delete form -->
                            <form 
                                method="POST" 
                                action="?/deleteTask"
                                use:enhance
                            >
                                <input type="hidden" name="taskId" value={task.id}>
                                <button
                                    type="submit"
                                    class="text-red-400 hover:text-red-600 cursor-pointer"
                                    aria-label="Supprimer la tâche"
                                >
                                    <Trash2 />
                                </button>
                            </form>
                        </li>
                    {/each}
                {/if}
            </ul>
        </div>
    </section>


    <div class="container mx-auto py-3 px-5 bg-white sticky bottom-3 ">
        <!-- svelte-ignore component_name_lowercase -->
        <form 
            method="post" 
            action="?/addTask"
            use:enhance
        >
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
                    required
                    placeholder="Qu'avez vous prevu de faire ?"
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