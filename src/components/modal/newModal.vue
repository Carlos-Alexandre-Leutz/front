<template>
  <div>
    <div class="overlay is-visible" id="overlay"></div>
    <div
      id="exampleModalCenter"
      class="modal fade show"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      style="display: block; padding-right: 0px"
    >
      <div class="col-8 m-auto modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalCenterTitle">
              Modal title
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">
            <p>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
              dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
              ac consectetur ac, vestibulum at eros.
            </p>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.3);
  z-index: 999;
}

/** JS */
.is-visible {
  opacity: 1;
  pointer-events: auto;
}

</style>


    