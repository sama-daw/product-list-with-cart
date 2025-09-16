<template>
  <div>
    <div class="page-container">
      <!-- Products Section -->
      <div class="left dessertsSection">
        <h1>Desserts</h1>
        <ProductList 
          @add-to-cart="addToCart"   
          @update-quantity="updateQuantity" 
        />
      </div>

      <!-- Cart Section -->
      <div class="right">
        <Cart
          :items="cartItems"
          @update-quantity="updateQuantity"
          @remove="removeFromCart"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ProductList from '@/components/ProductList.vue'
import Cart from '@/components/Cart.vue'

const cartItems = ref([])

// Add to cart
function addToCart(product) {
  const item = cartItems.value.find(i => i.id === product.id)
  if (item) {
    item.quantity++
  } else {
    cartItems.value.push({ ...product, quantity: 1 })
  }
}

// Update quantity
function updateQuantity(productId, delta) {
  const it = cartItems.value.find(i => i.id === productId)
  if (!it) return
  it.quantity += delta
  if (it.quantity <= 0) {
    cartItems.value = cartItems.value.filter(i => i.id !== productId)
  }
}

// Remove item completely
function removeFromCart(productId) {
  cartItems.value = cartItems.value.filter(i => i.id !== productId)
}
</script>

<style>
@import './assets/styles/colors.css';

.page-container {
  display: flex;
  justify-content: space-between; /* يخليهم يتوزعوا */
  align-items: flex-start;        /* يخليهم يبدؤوا من فوق */
  max-width: 1200px;
  margin: 0 auto;                 /* يوسّط كل البلوك */
  gap: 24px;
  padding: 20px 24px;
}

.left {
  flex: 7; /* 70% */
}
.right {
  flex: 5;              /* يزيد العرض بالنسبة للـ left */
  max-width: 700px;     /* أقصى عرض */
  width: 100%;          /* يظل ملتزم بعرض الشاشة */
}






@media (max-width: 992px) {
  .page-container {
    grid-template-columns: 1fr; /* عمود واحد */
  }
  .right {
    max-width: 100%; /* cart تاخد عرض كامل */
  }
}

.dessertsSection {
  align-self: flex-start;
  margin-top: 20px;
}

h1 {
  color: var(--color-rose-900);
  font-weight: 600;
  margin-bottom: 10px;
}
</style>
