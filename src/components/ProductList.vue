<template>
  <div class="product-list">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"
      class="product-card"
      @add-to-cart="$emit('add-to-cart', $event)"
      @update-quantity="(id, delta) => $emit('update-quantity', id, delta)"
    />
  </div>
</template>

<script setup>
import ProductCard from './ProductCard.vue'
import rawData from '@/data/data.json'

const products = rawData.map(p => {
  const desktopPath = p.image?.desktop || ''
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

const emit = defineEmits(['add-to-cart', 'update-quantity'])
</script>

<style scoped>
.product-card { flex: 1 1 calc(33.333% - 16px); max-width: 250px; margin: 8px; }

.product-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: 20px;
}

@media (max-width: 992px) { .product-list { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 576px) { .product-list { grid-template-columns: 1fr; } }
</style>
