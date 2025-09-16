<template>
  <div class="d-flex notFoundBox flex-column justify-content-center align-items-center vh-100 text-center">
    <h1 class="display-3 text-danger fw-bold">404</h1>
    <h2 class="mb-3">Page Not Found</h2>
    <p class="text-muted mb-4">Sorry, the page you are looking for does not exist.</p>
    <router-link to="/" class="btn btn-primary">
      Back to Home
    </router-link>
  </div>
</template>

<script setup>
</script>
<style scoped> 
.notFoundBox {
  background: #fff;
  width: 100vw;       /* 👈 عرض الشاشة كامل */
  height: 100vh;      /* 👈 ارتفاع الشاشة كامل */
  display: flex;      
  justify-content: center; /* 👈 توسيط أفقي */
  align-items: center;     /* 👈 توسيط عمودي */
  flex-direction: column;  /* 👈 العناصر فوق بعض */
}
</style>
