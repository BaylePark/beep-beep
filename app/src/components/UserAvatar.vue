<script setup>
const props = defineProps(['user'])
const emits = defineEmits(['clicked'])

const imagePath = '/images/' + props.user.image

function userClicked() {
  emits('clicked', props.user)
}
</script>

<template>
  <button @click="userClicked">
    <div class="container">
      <div class="image-cropper">
        <img :src="imagePath" />
      </div>
      <label class="user-name">{{ user.name }}</label>
    </div>
  </button>
</template>

<style scoped>
.container {
  display: inline-block;
  border-radius: 20px;
  padding: 40px;
}

button {
  display: block;
  background-color: transparent;
  border: 0;
  border-radius: 20px;
  padding: 10px;
  width: 100%;
  color: hsla(160, 100%, 37%, 1);
}

button:hover {
  color: white;
  background-color: hsla(160, 100%, 37%, 1);
  transition: 0.1s;
}

button:active {
  color: white;
  background-color: rgb(0, 137, 91);
  transition: 0.1s;
}


.user-name {
  margin: 0.5rem;
  font-size: 1.4rem;
  font-weight: 600;
  text-align: center;
}

.image-cropper {
  width: 10rem;
  height: 10rem;
  position: relative;
  overflow: hidden;
  border-radius: 50%;
}

img {
  display: inline;
  margin: 0 auto;
  height: 100%;
  width: auto;
  transform: scale(1.3);
}

@media (max-width: 1024px) {
  .container {
    display: grid;
    width: 100%;
    padding: 10px;
    grid-template-columns: 1.3fr 1fr;
  }

  button {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .image-cropper {
    width: 6rem;
    height: 6rem;
  }

  .user-name {
    display: flex;
    vertical-align: middle;
    align-content: center;
    justify-content: center;
    align-items: center;
  }
}
</style>
