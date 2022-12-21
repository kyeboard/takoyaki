<template>
    <!-- <div class="w-screen h-screen bg-white p-32 pt-44 overflow-scroll">
        <div class="title text-gray-800 text-4xl font-bold">Create a new plugin</div>
        <div class="description text-gray-500 font-semibold mt-2">Just select the repository that has the source code for the plugin, the rest will be handled by takoyaki.</div>
        <div class="repos flex flex-wrap gap-x-6 gap-y-6 mt-8">
            <div class="repo w-96 p-9 rounded-lg bg-text/20 flex flex-col cursor-pointer" v-for="repo in repos.items">
                <div class="title font-bold text-xl">{{ repo.name }}</div>
                <div class="description mt-3 text-gray-700 font-semibold mb-5">{{ repo.description }}</div>
                <div class="stats mt-auto flex font-semibold text-gray-800">
                    <div class="stars flex items-center ">
                        <vue-feather type="star" size="20" class="mr-2" />{{ repo.stargazers_count }}</div>
                    <div class="forks ml-6 flex items-center justify-center">
                        <vue-feather type="git-branch" size="20" class="mr-2" />
                        {{ repo.forks }}
                    </div>
                </div>
            </div>
        </div>
    </div> -->
    <ConfigurePlugin />
</template>

<script setup lang="ts">
import type { Account } from 'appwrite';
import { inject, ref } from 'vue';
import ConfigurePlugin from "../components/ConfigurePlugin.vue"

const repos = ref<any>(null);
const account = inject<Account>("account");

(async () => {
    if(!account) return 

    const user = (await account.get()).name;
    const token = (await account.getSession("current")).providerAccessToken;

    const req = await fetch(`https://api.github.com/search/repositories?q=user:Discord`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    repos.value = await req.json();
})()
</script>
