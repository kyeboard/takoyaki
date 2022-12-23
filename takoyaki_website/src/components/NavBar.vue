<template>
    <div
        class="navbar absolute z-10 flex items-center justify-center w-full px-20 py-5 font-medium bg-white/40 backdrop-blur-lg animate-fade_in"
    >
        <div class="left">
            <div class="title font-bold text-3xl tracking-wide dancing-script">
                takoyaki
            </div>
        </div>
        <div class="mx-auto font-semibold text-gray-700 flex gap-x-14">
            <a href="/">Home</a>
            <a href="/installation">Installation</a>
            <a href="/blogs">Documentation</a>
            <a href="/market">Marketplace</a>
            <a href="https://www.kyeboard.me/contact">Contact</a>
        </div>
        <div class="login" v-if="is_signed_in == false">
            <button class="bg-text p-3 w-32 rounded-lg" @click="authenticate_with_github()">Login</button>
        </div>
        <div class="user flex items-center gap-x-9 text-gray-900" v-else>
            <img :src="profile_photo" class="w-10 h-10 rounded-full" />
            <vue-feather type="github" size="20" />
            <vue-feather type="log-out" size="20" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { Account } from "appwrite"
import { inject, onMounted, ref } from "vue"

const account = inject<Account>("account");
const is_signed_in = ref<boolean>(false);
const profile_photo = ref<String>("");

const authenticate_with_github = async () => {
    account?.createOAuth2Session("github", `${window.location.protocol}//${window.location.host}/dashboard`)
}

onMounted(async () => {
    if(!account) {
        return 
    }

    const user = await account.get();

    profile_photo.value = (await (await fetch(`https://api.github.com/users/${user.name}`)).json()).avatar_url

    is_signed_in.value = true
})
</script>
