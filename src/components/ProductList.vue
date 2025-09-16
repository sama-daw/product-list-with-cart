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

// نبعث للـ App.vue انه ضاف منتج
function handleAddToCart(product) {
  emit('add-to-cart', product)
}
const emit = defineEmits(['add-to-cart'])
</script>

<style scoped>
.product-card {
  flex: 1 1 calc(33.333% - 16px); /* 3 كروت بالصف */
  max-width: 250px;               /* كل كارد ما يتعدّى */
  margin: 8px;
}


.container { margin-top: 20px; }
.product-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 بطاقات بالصف */
  gap: 16px;
  margin-top: 20px;
}

@media (max-width: 992px) {
  .product-list {
    grid-template-columns: repeat(2, 1fr); /* في التابلت صفين */
  }
}

@media (max-width: 576px) {
  .product-list {
    grid-template-columns: 1fr; /* في الموبايل بطاقة وحدة */
  }
}
</style>
