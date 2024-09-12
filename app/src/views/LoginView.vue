<script setup>
import UserAvatar from '@/components/UserAvatar.vue'
import users from '@/models/users.js'
</script>

<template>

    <div class="child">
        <h1>🗝️ Sign in</h1>
        <div class="user-list">
            <div v-for="user in users" :key="user.id">
                <UserAvatar :user="user" />
            </div>
        </div>

    </div>

</template>

<style lang="css" scoped>
.user-list {
    margin-top: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

.user-list>div {
    margin: 2rem;
}

.child {
    position: absolute;
    top: 50%;
    left: 50%;
    /*요소의 높이/너비의 반(50%)만큼 위/왼쪽으로 이동*/
    transform: translate(-50%, -50%);
}

h1 {
    font-size: 5rem;
    font-weight: 800;
}


@media (max-width: 1024px) {

    .user-list {
        display: grid;
    }

    .user-list>div {
        margin: 1rem;
    }

    .child {
        position: relative;
        top: auto;
        left: auto;
        /*요소의 높이/너비의 반(50%)만큼 위/왼쪽으로 이동*/
        transform: none;
    }

    h1 {
        font-size: 2rem;
        font-weight: 800;
    }
}
</style>