<template>
<div class="w-screen h-screen bg-white p-32 pt-44">
    <div class="title text-gray-800 text-4xl font-bold">Choose your operating system</div>
    <div class="description text-gray-500 font-semibold mt-2">Choose the operating system for which you want to install and follow each of the steps correctly!</div>
    <div class="flex">
        <div class="left text-gray-800 operating_systems mt-10 gap-y-4 flex flex-col">
            <div class="cursor-pointer operating-system p-5 bg-text/40 font-bold rounded-lg flex items-center justify-center w-64 text-center">
                <i class="fa-brands fa-android text-2xl mr-3"></i>
                Android
            </div>
            <div class="cursor-pointer operating-system p-5 bg-text/40 font-bold rounded-lg flex items-center justify-center w-64 text-center">
                <i class="fa-brands fa-ubuntu text-xl mr-3"></i>
                Ubuntu
            </div>
            <div class="cursor-pointer operating-system p-5 bg-text/40 font-bold rounded-lg flex items-center justify-center w-64 text-center">
                <i class="fa-brands fa-windows text-xl mr-3"></i>
                Windows
            </div>
        </div>
        <div class="right mt-12 ml-24 text-gray-800 flex flex-col">
            <div class="text-2xl font-bold">Install takoyaki on Android</div>
            <div class="text-gray-500 font-semibold mt-4">To use takoyaki on Android, you must have <a href="https://play.google.com/store/apps/details?id=com.termux&hl=en_IN&gl=US&pli=1" class="text-gray-800">Termux</a> installed. You don't need to have an Arch Linux installed on your termux to run takoyaki!</div>
        </div>
    </div>
</div>
</template>
