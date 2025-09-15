<template>
  <div 
    class="card m-2 border-0 rounded-3 bg-rose-50" 
    style="width: 18rem;"
    :class="[{ 'animate-card': isAnimating }, { 'active-card': quantity > 0 }]"
  >
    <div class="image-container">
      <img 
        :src="product.image" 
        class="card-img-top rounded-3 img-fluid object-fit-cover" 
        style="height:220px;" 
        :alt="product.name"
      >

      <!-- زر Add to Cart -->
      <div v-if="quantity === 0">
        <button 
          class="btn add-to-cart-btn" 
          @click="addToCart"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20"><g fill="#C73B0F" clip-path="url(#a)"><path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z"/><path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M.333 0h20v20h-20z"/></clipPath></defs></svg>
          Add to Cart
        </button>
      </div>

      <!-- counter -->
      <div v-else class="counter-box">
        <button class="icon-btn" @click="decrease">
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="2" fill="none" viewBox="0 0 10 2">
            <path fill="#fff" d="M0 .375h10v1.25H0V.375Z"/>
          </svg>
        </button>

        <span class="quantity">{{ quantity }}</span>

        <button class="icon-btn" @click="increase">
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10">
            <path fill="#fff" d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"/>
          </svg>
        </button>
      </div>
    </div>
    <br>

    <div class="card-body text-center">
      <p class="card-text mb-2">{{ product.description }}</p>
      <h5 class="card-title fw-semibold text-rose-900 mb-2">{{ product.name }}</h5>
      <p class="card-text fw-semibold text-red mb-0">
        ${{ product.price.toFixed(2) }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// props
const props = defineProps({
  product: Object
})

// events
const emit = defineEmits(['add-to-cart'])

const quantity = ref(0)
const isAnimating = ref(false)

function addToCart() {
  quantity.value = 1
  isAnimating.value = true
  emit('add-to-cart', props.product) // ⬅️ هذا اللي يرسل للـ parent
  setTimeout(() => {
    isAnimating.value = false
  }, 500)
}

function increase() {
  quantity.value++
}

function decrease() {
  if (quantity.value > 1) {
    quantity.value--
  } else {
    quantity.value = 0
  }
}
</script>

<style scoped>
.bg-rose-50 {
  background-color: var(--color-rose-50);
}
.text-rose-900 {
  color: var(--color-rose-900);
}
.text-red {
  color: var(--color-red);
}
.object-fit-cover {
  object-fit: cover;
}

.image-container {
  position: relative;
}

.add-to-cart-btn {
  font-weight: 600;
  background-color: var(--color-rose-50);
  position: absolute;
  bottom: -18px; 
  left: 50%;
  transform: translateX(-50%);
  border-radius: 25px;
  padding: 6px 16px;
  width: 150px;
  z-index: 2;
  border: 1px solid var(--color-rose-500);
 }
.add-to-cart-btn:hover {
  border-color: var(--color-red);
  background-color: var(--color-rose-100);
  color: var(--color-red);
}
.add-to-cart-btn:active {
  background-color: var(--color-red);
  border-color: var(--color-red);
  color: #fff;
}

.counter-box {
  position: absolute;
  bottom: -18px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  background: var(--color-red);
  color: #fff;
  border-radius: 25px;
  padding: 6px 16px;
  width: 150px;
}
.counter-box .quantity {
  font-weight: 600;
  font-size: 16px;
}

.icon-btn {
  width: 24px;
  height: 24px;
  background: transparent;
  border: 1px solid #fff;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-btn svg path {
  fill: #fff;
}

.icon-btn:hover {
  border-color: var(--color-rose-400);
}
.icon-btn:hover svg path {
  fill: var(--color-rose-400);
}

@keyframes pulse {
  0% { transform: scale(1); box-shadow: none; }
  50% { transform: scale(1.03); box-shadow: 0 0 20px rgba(199, 59, 15, 0.3); }
  100% { transform: scale(1); box-shadow: none; }
}
.animate-card {
  animation: pulse 0.5s ease;
}

.active-card {
  border: 1px solid var(--color-red);
  box-shadow: 0 0 8px rgba(199, 59, 15, 0.25);
}
</style>
