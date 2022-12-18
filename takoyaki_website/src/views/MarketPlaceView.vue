<template>
<div class="w-screen h-screen p-40 txt-gray-800 bg-white">  
    <div class="title text-5xl font-bold">Marketplace</div>
    <div class="description mt-2 font-medium">The store for all the plugins built for you by the awesome developers.</div>
    <div class="searchbox mt-6 flex">
        <input class="bg-text/60 p-4 rounded-lg w-full placeholder-gray-800 px-8 focus:outline-none" placeholder="Search plugins..." />
        <button class="bg-gray-800 p-4 rounded-lg w-64 text-white ml-4 font-semibold px-8 focus:outline-none">Create new plugin</button>
    </div>
    <div class="plugins flex mt-4 gap-x-5 text-gray-800">
        <a class="plugin w-[500px] bg-text/60 p-6 rounded-lg" v-for="plugin in plugins" :href="'/plugins/' + plugin.name.toLowerCase()">
            <div class="flex items-center">
                <img :src="plugin.poster" class="w-20 h-20 rounded-lg" />
                <div class="wrapper ml-4 font-semibold">
                    <div class="flex items-center">
                        <div class="name font-bold text-xl">{{plugin.name}}</div>
                        <img src="https://i.imgur.com/Lvs2tcp.png" class="w-6 h-6 ml-2" />
                    </div>
                    <div class="href flex items-center justify-center mt-1">
                        <vue-feather type="link" size="20" class="mr-2" />
                        {{plugin.github_url}}
                    </div>
                </div>
            </div>
            <div class="name font-medium mt-4">{{plugin.description}}</div>
        </a>
    </div>
</div>
</template>

<script lang="ts" setup>
import type { Databases } from 'appwrite';
import { inject, ref } from 'vue';

const databases = inject<Databases>("databases")
const plugins = ref<Array<any>>([]);

(async () => {
    plugins.value = ((await databases?.listDocuments("639eaa48526b40328906", "639eaa4a8b7c54c503ab")) as any).documents
})()
</script>
