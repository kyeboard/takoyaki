<template>
    <div class="w-full h-full bg-text/60 rounded-xl">
        <div class="out text-gray-800 p-7 font-medium" ref="out"></div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";

let out = ref<HTMLDivElement | null>(null);
let r = 7;
let c = 25;

onMounted(() => {
    for (let i = 0; i < r; i++) {
        let row = document.createElement("div");

        row.classList.add(...["flex", "gap-x-3", "gap-y-3", "text-md"]);

        for (let j = 0; j < c; j++) {
            let item = document.createElement("div");

            item.innerHTML = "ඞ";

            row.appendChild(item);
        }

        out.value?.appendChild(row);
    }
});
</script>
