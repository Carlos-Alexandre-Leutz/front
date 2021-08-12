<template>
  <Suspense>
    <template #default>
      <router-view />
    </template>
    <template #fallback>
      Carregando Aplicativo...
    </template>
  </Suspense>
</template>

<script>
import "boxicons";

export default {};
</script>

<style></style>
