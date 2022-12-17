<script setup lang="ts">
import ProductDisplay from "../components/ProductDisplay.vue";
</script>

<template>
    <div class="bg-white w-screen h-screen px-36 p-36 flex flex-col justify-center">
        <div class="wrapper flex items-center justify-center pb-12">
            <div class="left w-[40%] mr-auto text-gray-800">
                <div class="text-5xl font-bold leading-[55px]">
                    Print your contributions right in your terminal.
                </div>
                <div class="mt-4">
                    Takoyaki is an blazingly fast, open source tool that prints
                    your git in your terminal. Not only it allows you to
                    customize it, but also install several plugins to improve
                    overall experience [Fun fact: It can be even used to make
                    some other things!]
                </div>
                <div class="buttons mt-8 flex w-2/3">
                    <div
                        class="install w-full bg-gray-800 text-white font-semibold py-4 rounded-xl text-center"
                    >
                        <i class="fa-solid fa-download mr-2" />
                        Install
                    </div>
                    <div
                        class="install w-full py-4 text-gray-800 rounded-xl text-center"
                    >
                        <i class="fa-solid fa-message mr-2" />
                        Contact
                    </div>
                </div>
            </div>
            <ProductDisplay class="w-[45%] h-[95%]" />
        </div>
        <div class="features w-full flex mt-10 gap-x-4">
            <div class="feature w-full bg-text/40 p-6 rounded-xl">
                <div
                    class="icon bg-gray-800 text-white p-3 rounded-lg w-12 text-center"
                >
                    <i class="fa-solid fa-bolt"></i>
                </div>
                <div class="description mt-4 font-medium">
                    Blazingly fast response so that you don't have any delay
                    while opening your terminal.
                </div>
            </div>
            <div class="feature w-full bg-text/40 p-6 rounded-xl">
                <div
                    class="icon bg-gray-800 text-white p-3 rounded-lg w-12 text-center"
                >
                    <i class="fa-brands fa-android"></i>
                </div>
                <div class="description mt-4 font-medium">
                    Worried about compatible operating systems? Don't worry,
                    takoyaki runs everywhere.
                </div>
            </div>
            <div class="feature w-full bg-text/40 p-5 rounded-xl">
                <div
                    class="icon bg-gray-800 text-white p-3 rounded-lg w-12 text-center"
                >
                    <i class="fa-solid fa-brush"></i>
                </div>
                <div class="description mt-4 font-medium">
                    Blazingly fast response so that you don't have any delay
                    while opening your terminal.
                </div>
            </div>
            <div class="feature w-full bg-text/40 p-5 rounded-xl">
                <div
                    class="icon bg-gray-800 text-white p-3 rounded-lg w-12 text-center"
                >
                    <i class="fa-solid fa-seedling"></i>
                </div>
                <div class="description mt-4 font-medium">
                    Blazingly fast response so that you don't have any delay
                    while opening your terminal.
                </div>
            </div>
        </div>
        <div class="text-gray-700 bg-red flex gap-x-7 justify-center w-full mt-auto">
            <a
                href="https://www.twitch.tv/kyeboard_"
                class="animate-rise opacity-0 animation-delay-200"
            >
                <vue-feather type="twitch"  size="20" />
            </a>
            <a
                href="https://www.github.com/kyeboard"
                class="animate-rise opacity-0 animation-delay-210"
            >
                <vue-feather type="github"  size="20" />
            </a>
            <a
                href="https://www.gitlab.com/kyeboard"
                class="animate-rise opacity-0 animation-delay-220"
            >
                <vue-feather type="gitlab"  size="20" />
            </a>
            <a
                href="https://www.twitter.com/kyeboard_"
                class="animate-rise opacity-0 animation-delay-230"
            >
                <vue-feather type="twitter" size="20" />
            </a>
            <a
                href="https://www.instagram.com/thekyeboard"
                class="animate-rise opacity-0 animation-delay-240"
            >
                <vue-feather type="instagram" size="20" />
            </a>
            <a
                href="https://www.youtube.com/@kyeboard"
                class="animate-rise opacity-0 animation-delay-250"
            >
                <vue-feather type="youtube" size="20" />
            </a>
            <a
                href="mailto:me@kyeboard.me"
                class="animate-rise opacity-0 animation-delay-260"
            >
                <vue-feather type="mail" size="20" />
            </a>
            <a
                href="https://www.github.com/sponsors/kyeboard"
                class="animate-rise opacity-0 animation-delay-260"
            >
                <vue-feather type="heart" size="20" />
            </a>
        </div>
    </div>
</template>
