<script setup>
import UserAvatar from '@/components/UserAvatar.vue'
import { useLoginStore } from '@/stores/login'
import { useUsersStore } from '@/stores/users'

const loginStore = useLoginStore()
const usersStore = useUsersStore()

const users = usersStore.users
function selected(user) {
    loginStore.login(user)
}
</script>

<template>
    <div class="user-list">
        <div v-for="user in users" :key="user.id">
            <UserAvatar :user="user" @clicked="(user) => selected(user)" />
        </div>
    </div>
</template>

<style scoped>
.user-list {
    margin-top: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

.user-list>div {
    margin: 2rem;
}

@media (max-width: 1024px) {

    .user-list {
        margin-top: 1rem;
        display: grid;
    }

    .user-list>div {
        margin: -1rem;
    }

}
</style>
