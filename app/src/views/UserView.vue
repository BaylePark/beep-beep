<script setup>
import { shallowRef } from 'vue'

import UserListComponent from '@/components/UserListComponent.vue'
import SlideComponent from '@/components/SlideComponent.vue'
import { useLoginStore } from '@/stores/login'

const currentView = shallowRef(UserListComponent)
const loginStore = useLoginStore()
loginStore.$subscribe((muatation, state) => {
    if (state === null) {
        currentView.value = UserListComponent
    } else {
        currentView.value = SlideComponent
    }
})

</script>

<template>
    <div class="container">
        <component :is="currentView" />
    </div>

</template>

<style lang="css" scoped>
.container {
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    /*요소의 높이/너비의 반(50%)만큼 위/왼쪽으로 이동*/
    transform: translate(-50%, -50%);
}
</style>