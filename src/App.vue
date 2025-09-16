<template>
  <div>
    <div class="page-container">
      <div class="left dessertsSection">
        <h1>Desserts</h1>
        <ProductList 
          @add-to-cart="addToCart"   
          @update-quantity="updateQuantity" 
        />
      </div>

      <div class="right">
        <Cart
          :items="cartItems"
          @update-quantity="updateQuantity"
          @remove="removeFromCart"
          @open-confirm="openConfirm"
        />
      </div>
    </div>

    <!-- ✅ Confirm Order Modal -->
    <div v-if="showConfirmModal" class="modal-backdrop">
      <div class="modal-content p-4">
        <!-- أيقونة صح -->
        <svg style="align-self: flex-start;" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 32.121L13.5 24.6195L15.6195 22.5L21 27.879L32.3775 16.5L34.5 18.6225L21 32.121Z" fill="#1EA575"/>
          <path d="M24 3C19.8466 3 15.7865 4.23163 12.333 6.53914C8.8796 8.84665 6.18798 12.1264 4.59854 15.9636C3.0091 19.8009 2.59323 24.0233 3.40352 28.0969C4.21381 32.1705 6.21386 35.9123 9.15077 38.8492C12.0877 41.7861 15.8295 43.7862 19.9031 44.5965C23.9767 45.4068 28.1991 44.9909 32.0364 43.4015C35.8736 41.812 39.1534 39.1204 41.4609 35.667C43.7684 32.2135 45 28.1534 45 24C45 18.4305 42.7875 13.089 38.8493 9.15076C34.911 5.21249 29.5696 3 24 3ZM24 42C20.4399 42 16.9598 40.9443 13.9997 38.9665C11.0397 36.9886 8.73256 34.1774 7.37018 30.8883C6.0078 27.5992 5.65134 23.98 6.34587 20.4884C7.04041 16.9967 8.75474 13.7894 11.2721 11.2721C13.7894 8.75473 16.9967 7.0404 20.4884 6.34587C23.98 5.65133 27.5992 6.00779 30.8883 7.37017C34.1774 8.73255 36.9886 11.0397 38.9665 13.9997C40.9443 16.9598 42 20.4399 42 24C42 28.7739 40.1036 33.3523 36.7279 36.7279C33.3523 40.1036 28.7739 42 24 42Z" fill="#1EA575"/>
        </svg>

        <h2 class="fw-bold" style="align-self: flex-start;">Order Confirmed</h2>
        <p style="color: var(--color-rose-400); align-self: flex-start;">We hope you enjoy your food!</p>

        <!-- 🔽 تفاصيل الطلب -->
        <div class="bg-light p-3 rounded mb-3 w-100">
          <div 
            v-for="item in cartItems" 
            :key="item.id" 
            class="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom"
          >
            <div>
              <strong>{{ item.name }}</strong>
              <div style="display: flex; flex-direction: row; gap: 8px; align-items: center;">
                <span class="text-danger fw-bold">{{ item.quantity }}x</span>
                <span style="color: var(--color-rose-400);">${{ item.price.toFixed(2) }}</span>
              </div>
            </div>
            <div>
              <span class="fw-bold me-3" style="color: var(--color-rose-500);">
                ${{ (item.price * item.quantity).toFixed(2) }}
              </span>
            </div>
          </div>

          <!-- المجموع الكلي -->
          <div class="d-flex justify-content-between mt-3 fw-bold">
            <span>Order Total</span>
            <span>${{ cartTotal.toFixed(2) }}</span>
          </div>
        </div>

        <!-- زر بدء طلب جديد -->
        <button 
          @click="confirmOrder" 
          class="btn btn-danger w-100 rounded-pill fw-bold"
        >
          Start New Order
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ProductList from '@/components/ProductList.vue'
import Cart from '@/components/Cart.vue'

const cartItems = ref([])
const showConfirmModal = ref(false)

// ✅ لفتح المودال من الـ Cart
function openConfirm() {
  showConfirmModal.value = true
}

function addToCart(product) {
  const item = cartItems.value.find(i => i.id === product.id)
  if (item) {
    item.quantity++
  } else {
    cartItems.value.push({ ...product, quantity: 1 })
  }
}
function updateQuantity(productId, delta) {
  const it = cartItems.value.find(i => i.id === productId)
  if (!it) return
  it.quantity += delta
  if (it.quantity <= 0) {
    cartItems.value = cartItems.value.filter(i => i.id !== productId)
  }
}

function removeFromCart(productId) {
  cartItems.value = cartItems.value.filter(i => i.id !== productId)
}

function confirmOrder() {
  cartItems.value = []
  showConfirmModal.value = false
  window.location.reload()   

}

const cartTotal = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
})
</script>

<style>
@import './assets/styles/colors.css';

.page-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  max-width: 1200px;
  margin: 0 auto;
  gap: 24px;
  padding: 20px 24px;
}

.left { flex: 7; }
.right { flex: 5; max-width: 700px; width: 100%; }

@media (max-width: 992px) {
  .page-container { flex-direction: column; }
  .right { max-width: 100%; }
}

.dessertsSection { align-self: flex-start; margin-top: 20px; }

h1 {
  color: var(--color-rose-900); 
  font-weight: 600;
  margin-bottom: 10px;
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  width: fit-content;
  max-width: 500px;
}
</style>
