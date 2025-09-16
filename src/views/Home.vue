<template>
  <div>
    <div class="page-container">
      <div class="left dessertsSection">
        <h1>Desserts</h1>
        <ProductList 
          :key="resetKey"
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
        <h2 class="fw-bold">Order Confirmed</h2>
        <p>We hope you enjoy your food!</p>

        <!-- تفاصيل الطلب -->
        <div class="bg-light p-3 rounded mb-3 w-100">
          <div 
            v-for="item in cartItems" 
            :key="item.id" 
            class="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom"
          >
            <div>
              <strong>{{ item.name }}</strong>
              <div class="d-flex gap-2">
                <span class="text-danger fw-bold">{{ item.quantity }}x</span>
                <span>${{ item.price.toFixed(2) }}</span>
                <span class="fw-bold">${{ (item.price * item.quantity).toFixed(2) }}</span>
              </div>
            </div>
          </div>

          <div class="d-flex justify-content-between mt-3 fw-bold">
            <span>Order Total</span>
            <span>${{ cartTotal.toFixed(2) }}</span>
          </div>
        </div>

        <button @click="confirmOrder" class="btn  w-100 rounded-pill fw-bold" style="background-color: var( --color-red); color: white;">
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
const resetKey = ref(0)

function openConfirm() {
  showConfirmModal.value = true
}
function addToCart(product) {
  const item = cartItems.value.find(i => i.id === product.id)
  if (item) item.quantity++
  else cartItems.value.push({ ...product, quantity: 1 })
}
function updateQuantity(productId, delta) {
  const it = cartItems.value.find(i => i.id === productId)
  if (!it) return
  it.quantity += delta
  if (it.quantity <= 0) cartItems.value = cartItems.value.filter(i => i.id !== productId)
}
function removeFromCart(productId) {
  cartItems.value = cartItems.value.filter(i => i.id !== productId)
}
function confirmOrder() {
  cartItems.value = []
  showConfirmModal.value = false
  resetKey.value++
}
const cartTotal = computed(() =>
  cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
)
</script>

<style>
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
.dessertsSection { margin-top: 20px; }
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
