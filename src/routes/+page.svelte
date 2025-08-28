<script lang="ts">
    import { Trash2, Check } from "@lucide/svelte";

    interface Task {
        id: number,
        description: string,
        done: boolean,
    }

    let tasks: Task[] = $state([]);
    let description: string = $state("");
    let isDone: boolean = $state(false);

    function addTask() {
        if (description.trim() === "") {
            return;
        }

        let newTask: Task = {
            id: Date.now() + Math.floor(Math.random() * 10000),
            description: description,
            done: isDone
        }

        tasks = [...tasks, newTask];

        description = ""
    }

    function delateTask(id: number) {
        tasks = tasks.filter((task) => task.id !== id);
    }
</script>



<main class=" mt-5">

    <section>
        <div class="container mx-auto">
            <h1 class=" text-4xl text-center md:text-start font-bold text-gray-700 mb-6">
                Votre liste de taches
            </h1>
            <ul class="space-y-4 pb-36">
                {#if tasks.length === 0}
                    <h3 class=" text-2xl font-light text-center mt-16 text-gray-600">
                        Vous n'avez rien a faire pour le moment 🙂
                    </h3>
                {:else}
                    {#each tasks as task (task.id)}
                        <li 
                            class="flex items-center justify-between bg-white shadow-md p-4
                            hover:bg-gray-50 transition-colors"
                        >
                            <div class="flex items-center gap-3">
                                <input 
                                    type="checkbox" 
                                    bind:checked={task.done}
                                    id="complete{task.id}" 
                                    name="complete" 
                                    class="w-5 h-5 text-blue-500 border-gray-300 rounded"
                                >
                                <p class="text-gray-600 font-semibold {task.done ? ' line-through' : ''} ">
                                    { task.description }
                                </p>

                                {#if task.done}
                                    <span class=" text-green-600 font-black">
                                        <Check  />
                                    </span>
                                {/if}
                            </div>
                            <form onsubmit={(e) => e.preventDefault()}>
                                <input type="hidden" name="taskId" value={task.id}>
                                <button 
                                    class="text-red-400 hover:text-red-600 cursor-pointer"
                                    aria-label="Supprimer la tâche"

                                    onclick={() => delateTask(task.id)}
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


    <div class="container mx-auto py-6 px-5 bg-white fixed w-full bottom-0 left-1/2 -translate-x-1/2">
        <form 
            method="post"
            onsubmit={(e) => e.preventDefault()}
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
                    placeholder="Qu'avez vous prevu de faire ?"
                    bind:value={description}
                    required
                    class=" text-lg font-normal md:w-2xl max-w-full py-2 px-3 border rounded focus:outline-2 
                    focus:outline-blue-500"
                >
                <button 
                    class=" py-2.5 px-5 bg-blue-500 rounded text-white font-semibold cursor-pointer 
                    border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-colors"
                    onclick={addTask}
                >
                    Ajouter la tache
                </button>
            </div>
        </form>
    </div>
</main>