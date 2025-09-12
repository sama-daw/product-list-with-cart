<template>
<div class="dessertsSection">
  <h1> Desserts</h1>
    <ProductList />
   </div>

</template>

<script setup>
import ProductList from './components/ProductList.vue';

</script>
<style>
@import './assets/styles/colors.css';
.dessertsSection {
  align-self: flex-start;
  margin-top: 20px;
  margin-left: 50px;
  
}
h1{
  color: var(--color-rose-900);
  font-weight: 600;
  margin-bottom: 10px;
  margin-left: 20px;
}
</style>

