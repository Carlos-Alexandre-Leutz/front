<template>
  <div class="cont-icom-seting">
    <i @click.stop.prevent="toggle" class="fas fa-cog"></i>
    <div v-show="isOpen">
      <div class="overlay" @click="toggle"></div>
      <div class="menuSusoenco">
        <div class="contItensMenuSuspenco">
          <div class="menuSusoenco-item">conteudo</div>
          <div class="menuSusoenco-item">conteudo</div>
          <div class="menuSusoenco-item">conteudo</div>
          <hr />
          <a class="menuSusoenco-item" href="#/alterasenha">Alterar senha</a>
          <br />
          <a class="menuSusoenco-item" href="#/logout">
          <div class="d-flex justify-content-between">

          Log out
            <i class="fas fa-power-off "></i> 
          </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>
<style scoped>
.menuSusoenco {
  width: 200px;
  color: black;
  border: solid 1px rgb(201, 201, 201);
  box-shadow: 5px 5px 10px rgb(201, 201, 201);
  border-radius: 15px;
  position: fixed;
  right: 10px;
  background-color: #fff;
  z-index: 9999;
}
.cont-icom-seting {
  margin-top: 17px;
}
.menuSusoenco-item {
  padding: 20px 0px 0px 0px;
}

.contItensMenuSuspenco {
  padding: 0px 25px 25px 25px;
}

.overlay {
  pointer-events: auto;
  opacity: 1;
  transition: opacity 0.3s;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 9998;
}
</style>