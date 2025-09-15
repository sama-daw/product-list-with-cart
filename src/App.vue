<template>
  <div class="page-container">
  
    <div class="left">
      <div class="dessertsSection">
        <h1> Desserts</h1>
        <ProductList />
      </div>
    </div>

   
    <div class="right">
      <Cart />
    </div>
  </div>
</template>

<script setup>
import ProductList from './components/ProductList.vue';
import Cart from './components/Cart.vue'

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
h1{
  color: var(--color-rose-900);
  font-weight: 600;
  margin-bottom: 10px;
}
</style>


