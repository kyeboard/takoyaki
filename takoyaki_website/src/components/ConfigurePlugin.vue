<template>
<div class="w-screen h-screen bg-white overflow-scroll p-32 pt-44">
    <div class="title text-gray-800 text-4xl font-bold">Configure your plugin</div>
    <div class="description text-gray-500 font-semibold mt-2">Final setup to complete setting up your plugin! Configure path, branch, name and even more!</div>
    <div class="mt-20 flex">
        <div class="left font-semibold flex flex-col gap-y-5">
            <div class="flex items-center">
                <vue-feather type="github" size="20" class="mr-4" /> {{ repo_owner }}/{{ repo_name }}
            </div>
            <div class="flex items-center">
                <vue-feather type="git-branch" size="20" class="mr-4" /> {{ branch }}
            </div>
            <div class="flex items-center">
                <vue-feather type="folder" size="20" class="mr-4" /> {{ path }}
            </div>
        </div>
        <div class="right w-1/2 ml-44 flex flex-col gap-y-5 text-gray-900">
            <div class="input-box">
                <div class="label font-semibold">Plugin name</div>
                <input type="text" placeholder="An awesome name for your plugin!" class="mt-2 w-full bg-text/30 p-3 px-4 focus:outline-none rounded-lg text-gray-800 placeholder-gray-400 font-semibold">
            </div>
            <div class="input-box">
                <div class="label font-semibold">Plugin homepage</div>
                <input type="text" placeholder="Homepage URL for your plugin" class="mt-2 w-full bg-text/30 p-3 px-4 focus:outline-none rounded-lg text-gray-800 placeholder-gray-400 font-semibold">
            </div>
            <div class="input-box">
                <div class="label font-semibold">Choose a custom folder</div>
                <div class="flex mt-2">
                    <div class="bg-text/50 rounded-lg w-full p-3 px-4 text-gray-800">{{ path }}</div>
                    <div class="p-3 px-10 font-semibold ml-4 bg-gray-900 text-white/80 cursor-pointer rounded-lg">Edit</div>
                </div>
            </div>
            <div class="button bg-gray-900 text-center font-semibold text-white p-4 rounded-lg">Deploy</div>
        </div>
    </div>
    <div class="file_selector_view absolute top-0 left-0 w-full h-full bg-gray-900/40 backdrop-blur-sm z-10">
        <FileSelector :owner="repo_owner" :path="path" :repo="repo_name" />
    </div>
</div>   
</template>

<script setup lang="ts">
import FileSelector from './FileSelector.vue';

const repo_owner = "kyeboard"
const repo_name = "takoyaki"
const branch = "main"
const path = "/"
</script>
