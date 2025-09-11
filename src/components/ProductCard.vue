<template>
  <div class="card m-2" style="width: 18rem;">
    <img :src="product.image" class="card-img-top" :alt="product.name">
    <div class="card-body">
      <h5 class="card-title">{{ product.name }}</h5>
      <p class="card-text">{{ product.description }}</p>
      <p class="card-text">${{ product.price.toFixed(2) }}</p>
      <button class="btn btn-primary" @click="$emit('add-to-cart', product)">Add to Cart</button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  product: Object
})
</script>

<style scoped>
/* ممكن تضيفي CSS خاص للبطاقة إذا حبيتي */
</style>
