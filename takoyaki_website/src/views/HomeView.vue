<script setup lang="ts">
import ProductDisplay from '@/components/ProductDisplay.vue';
</script>

<template>
<div class="w-screen h-screen bg-white flex p-24 items-center justify-center">
    <div class="left w-full h-full flex flex-col justify-center mr-10">
        <div class="text-5xl text-gray-800 font-bold leading-[55px]">Elegantly print your contributions in your terminal.</div>
        <div class="text-gray-600 tracking-[0.3px] font-medium mt-6 max-w-[600px] w-[600px]">Takoyaki is an open source, blazingly fast and cross platform tool that allows users to print their contributions in their terminal, eleganty with a ton of plugins to add support for major providers!</div>
        <div class="feature mt-8 flex items-center font-bold text-gray-800">
            <vue-feather type="check-circle" size="24" class="mr-3" /> Cross platform
        </div>
        <div class="feature mt-5 flex items-center font-bold text-gray-800">
            <vue-feather type="check-circle" size="24" class="mr-3" /> Open Source
        </div>
        <div class="feature mt-5 flex items-center font-bold text-gray-800">
            <vue-feather type="check-circle" size="24" class="mr-3" /> Blazingly fast
        </div>
        <div class="feature mt-5 flex items-center font-bold text-gray-800">
            <vue-feather type="check-circle" size="24" class="mr-3" /> Highly customizable
        </div>
        <div class="feature mt-5 flex items-center font-bold text-gray-800">
            <vue-feather type="check-circle" size="24" class="mr-3" /> Plugins to add support for major providers
        </div>
        <div class="buttons mt-8">
            <a href="/installation">
                <div class="button font-semibold bg-text/30 p-4 w-72 text-center rounded-lg">Install now</div>
            </a>
        </div>
    </div>
    <div class="wrapper w-full h-full flex items-center">

    </div>
</div>
</template>
