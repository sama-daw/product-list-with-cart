<template>
  <div class="page-container">
  
    <div class="left">
      <div class="dessertsSection">
        <h1>Desserts</h1>
        <!-- هون بنمرر الحدث -->
        <ProductList @add-to-cart="addToCart" />
      </div>
    </div>

    <div class="right">
      <!-- هون بنمرر الكارت مع البيانات والدوال -->
      <Cart 
        :items="cartItems" 
        @update-quantity="updateQuantity" 
        @remove="removeFromCart" 
      />
    </div>
  </div>
</template>

<script setup>
import ProductList from './components/ProductList.vue';
import Cart from './components/Cart.vue';
import { ref } from "vue"

const cartItems = ref([])

function addToCart(product) {
  const item = cartItems.value.find(i => i.id === product.id)
  if (item) {
    item.quantity++
  } else {
    cartItems.value.push({ ...product, quantity: 1 })
  }
}

function updateQuantity(productId, amount) {
  const item = cartItems.value.find(i => i.id === productId)
  if (!item) return
  item.quantity += amount
  if (item.quantity <= 0) {
    cartItems.value = cartItems.value.filter(i => i.id !== productId)
  }
}

function removeFromCart(productId) {
  cartItems.value = cartItems.value.filter(i => i.id !== productId)
}
</script>

<style>
@import './assets/styles/colors.css';

.page-container {
  display: flex;
  gap: 24px;
  align-items: flex-start;
  padding: 20px 24px;
}

.left {
  flex: 1;
  min-width: 0;
}

.right {
  width: 340px;
}

@media (max-width: 992px) {
  .page-container {
    flex-direction: column;
    padding: 12px;
  }
  .right {
    width: 100%;
  }
}

.dessertsSection {
  align-self: flex-start;
  margin-top: 20px;
  margin-left: 0; 
}
h1 {
  color: var(--color-rose-900);
  font-weight: 600;
  margin-bottom: 10px;
}
</style>
