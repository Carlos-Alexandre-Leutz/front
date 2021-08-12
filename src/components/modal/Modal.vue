<template>
  <!-- Botão de teste -->
  <button
    type="button"
    class="btn btn-primary"
    data-toggle="modal"
    data-target="#exampleModal"
    @click="showModalTest"
  >
    Launch demo modal
  </button>

  <div
    class="modal modal-background fade"
    :class="getModalClass(defaultModal.show)"
    id="MainModal"
  >
    <div class="modal-dialog">
      <div class="modal-content modal-danger">
        <div class="modal-header modal-danger">
          <h5 class="modal-title" id="exampleModalLabel">
            {{ getTitle() }}
          </h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
            @click="onCancel"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          {{ getBodyMessage() }}
          <slot name="modal-body"></slot>
        </div>
        <div v-if="!lCustomActions" class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-dismiss="modal"
            @click="onCancel"
          >
            Cancelar
          </button>
          <button type="button" class="btn btn-primary" @click="onConfirm">
            Confirmar
          </button>
          <slot name="modal-actions"></slot>
          <!-- Utilizar metodos no componente pai do modal, se não utilizar emit -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { inject, ref } from "vue";
export default {
  props: [
    "title",
    "bodyMessage",
    "customActions",
    "onCloseFunction",
    "onConfirmFunction"
  ],
  async setup(props, { emit }) {
    console.log("ModalProps: ", props);
    const defaultModal = inject("defaultModal");
    const defaultModalActions = inject("defaultModalActions");

    var lCustomActions = ref(props.customActions ? props.customActions : false);
    var onConfirm = ref(props.onCloseFunction ? props.onCloseFunction : false);
    var onCancel = ref(
      props.onConfirmFunction ? props.onConfirmFunction : false
    );

    const getTitle = () => {
      return defaultModal.title ? defaultModal.title : props.title;
    };

    const getBodyMessage = () => {
      return defaultModal.bodyMessage
        ? defaultModal.bodyMessage
        : props.bodyMessage;
    };

    const getModalClass = e => {
      if (!e) return "";
      resetActions();
      return "show modal-display";
    };

    const showModalTest = () => {
      defaultModal.show = !defaultModal.show;
      console.log("Lshow: ", defaultModal.show);
    };

    if (!onConfirm.value)
      onConfirm.value = () => {
        defaultModal.show = false;
        defaultModalActions.confirmAction = true;
        emit("on-confirm", true);
      };

    if (!onCancel.value)
      onCancel.value = () => {
        defaultModal.show = false;
        defaultModalActions.cancelAction = true;
        emit("on-cancel", true);
      };

    const resetActions = () => {
      defaultModalActions.confirmAction = false;
      defaultModalActions.cancelAction = false;
    };

    return {
      getTitle,
      getBodyMessage,
      lCustomActions,
      getModalClass,
      showModalTest,
      onConfirm,
      onCancel,
      defaultModal
    };
  }
};
</script>

<style>
.modal-display {
  display: block;
}
</style>
