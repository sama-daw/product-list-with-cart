<template>
  <div class="container d-flex flex-wrap justify-content-start">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"
      @add-to-cart="handleAddToCart"
    />
  </div>
</template>

<script setup>
import ProductCard from './ProductCard.vue'
import rawData from '@/data/data.json' 

const products = rawData.map(p => {
  const desktopPath = p.image && p.image.desktop ? p.image.desktop : ''
  const filename = desktopPath.split('/').pop()
  const imageUrl = new URL(`../assets/images/${filename}`, import.meta.url).href

  return {
    id: p.id,
    name: p.name,
    description: p.category, 
    price: p.price,
    image: imageUrl,
  }
})

function handleAddToCart(product) {

  alert(`${product.name} added to cart!`)
}
</script>

<style scoped>
.container { margin-top: 20px; }
</style>
