<template>
  <div class="d-flex flex-column">
    <a
      v-if="true"
      class="ml-auto m-1 btn btn-sm btn-primary"
      href="/#/dashboar"
     
    >
      {{ $i18n.translate("adicionar") }}  {{ $i18n.translate("atalhos") }}
    </a>
  </div>
  <div class="card shadow">
    <div class="card-header">
      {{ $i18n.translate("seus") }}  {{ $i18n.translate("atalhos") }}
    </div>
    <div class="card-body">

    <i class="fas fa-users"></i>
    <i class="fas fa-cogs"></i>
    <i class="fas fa-flask"></i>
    </div>
 
  </div>
</template>
<script>
export default {
  
}
</script>
<style scoped>
i {
  border: solid 1px;
  font-size: 30px;
  padding: 30px;
}
</style>