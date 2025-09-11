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

// استيراد الصور المحلية
import waffleImg from '@/assets/images/image-waffle-desktop.jpg'
import cremeImg from '@/assets/images/image-creme-brulee-desktop.jpg'
import macaronImg from '@/assets/images/image-macaron-desktop.jpg'
import tiramisuImg from '@/assets/images/image-tiramisu-desktop.jpg'
import baklavaImg from '@/assets/images/image-baklava-desktop.jpg'
import pieImg from '@/assets/images/image-lemon-meringue-pie-desktop.jpg'
import redvelvetImg from '@/assets/images/image-cake-desktop.jpg'
import brownieImg from '@/assets/images/image-brownie-thumbnail.jpg'
import pannaImg from '@/assets/images/image-panna-cotta-desktop.jpg'

// بيانات المنتجات
const products = [
  { id: 1, name: 'Waffle with Berries', description: 'Waffle', price: 6.50, image: waffleImg },
  { id: 2, name: 'Vanilla Bean Crème Brûlée', description: 'Crème Brûlée', price: 7.00, image: cremeImg },
  { id: 3, name: 'Macaron Mix of Five', description: 'Macaron', price: 8.00, image: macaronImg },
  { id: 4, name: 'Classic Tiramisu', description: 'Tiramisu', price: 5.50, image: tiramisuImg },
  { id: 5, name: 'Pistachio Baklava', description: 'Baklava', price: 4.00, image: baklavaImg },
  { id: 6, name: 'Lemon Meringue Pie', description: 'Pie', price: 5.00, image: pieImg },
  { id: 7, name: 'Red Velvet Cake', description: 'Cake', price: 4.50, image: redvelvetImg },
  { id: 8, name: 'Salted Caramel Brownie', description: 'Brownie', price: 4.50, image: brownieImg },
  { id: 9, name: 'Vanilla Panna Cotta', description: 'Panna Cotta', price: 6.50, image: pannaImg }
]

// دالة لإضافة المنتج للسلة (حالياً تظهر alert)
function handleAddToCart(product) {
  alert(`${product.name} added to cart!`)
}
</script>

<style scoped>
.container {
  margin-top: 20px;
}
</style>
