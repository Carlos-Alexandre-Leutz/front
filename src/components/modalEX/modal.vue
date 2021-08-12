<template>
  <div>
    <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
      <div class="form-group">
        <label> {{ $i18n.translate("adicionar") }}</label>
        <button
          @click="togglerModal('modalEndereco')"
          type="button"
          class="btn btn-primary col-12"
        >
          {{ $i18n.translate("endereco") }}
        </button>
      </div>
    </div>
    <!-- modal -->
    <div id="overlay"></div>
    <!-- endereços -->
    <div
      v-if="modalEndereco"
      id="endereco"
      class="modal-loc fade show"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      style="display: block; padding-right: 0px"
    >
      <div class="col-8 m-auto modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalCenterTitle">
              {{ $i18n.translate("endereco") }}
            </h5>
            <button
              type="button"
              class="close"
              @click="togglerModal('modalEndereco')"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body"></div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
              @click="togglerModal('modalEndereco')"
            >
              {{ $i18n.translate("fechar") }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
     
    let modalEndereco = ref(false);
    const togglerModal = a => {
      if (a == "modalEndereco") {
        modalEndereco.value = !modalEndereco.value;
      }
      
      let overlay = document.getElementById("overlay");
      let hasClass = overlay.classList.contains("overlay");

      if (hasClass) {
        overlay.classList.remove("overlay");
      } else {
        overlay.classList.add("overlay");
      }
    };
    return{
        togglerModal,
        modalEndereco
    }
  },
};
</script>

<style scoped>
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
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 999;
}

/** JS */

.modal-loc {
  position: fixed;
  top: 0;
  left: 0;
  display: none;
}
.show {
  z-index: 1060;
  width: 100%;
  height: 100%;
}
</style>