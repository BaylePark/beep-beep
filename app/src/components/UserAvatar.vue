<script setup>
const props = defineProps(['user'])

const imagePath = '/images/' + props.user.image
</script>

<template>
  <div class="container">
    <div class="image-cropper">
      <img :src="imagePath" class="rounded" />
    </div>
    <div class="user-name">{{ user.name }}</div>
  </div>
</template>

<style scoped>
.container {
  display: inline-block;
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
    grid-template-columns: 1.3fr 1fr;
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
