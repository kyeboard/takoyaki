<template>
<div class="file_selector">

</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps(["owner", "repo", "path"]);

const files = ref<Array<any>>([]);

(async () => {
    const res = await (await fetch(`https://api.github.com/repos/${props.owner}/${props.repo}/contents/${props.path}`)).json();

    console.log(res)
})()
</script>
