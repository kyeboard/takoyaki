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
        <div class="login">
            <button class="bg-text p-3 w-32 rounded-lg" @click="authenticate_with_github()">Login</button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { Account } from "appwrite"
import { inject } from "vue"

const account = inject<Account>("account");

const authenticate_with_github = async () => {
    account?.createOAuth2Session("github", `${window.location.protocol}//${window.location.host}/dashboard`)
}
</script>
