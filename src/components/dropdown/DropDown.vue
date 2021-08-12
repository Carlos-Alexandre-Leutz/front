<template>
  <div :class="'dropdown' + afterCssClass">
    <button
      id="dropdownMenuButton"
      class="btn btn-secondary dropdown-toggle text-truncate"
      type="button"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="true"
      @click="onClickButtonDropDown"
    >
      {{ selectedItem ? selectedItem.label : defaultDescription }}
    </button>

    <div
      :class="'dropdown-menu' + afterCssClass"
      aria-labelledby="dropdownMenuButton"
    >
      <button
        v-for="item in dropdownItems"
        :key="item.id"
        class="dropdown-item"
        @click="onClickItemDropDown(item)"
      >
        {{ item.label }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "DropDown",
  props: {
    defaultDescription: {
      type: String,
      required: false,
      default: "Selecione"
    },
    requisitionPath: {
      type: String,
      required: false,
      default: ""
    }
  },
  list: {
    type: Array,
    required: true,
    default: () => []
  },
  data() {
    return {
      show: false,
      afterCssClass: "",
      dropdownItems: [],
      selectedItem: ""
    };
  },
  computed: {
    getRequisitionPath() {
      return this.requisitionPath;
    }
  },
  created() {},
  mounted() {
    this.request();
  },
  methods: {
    onClickButtonDropDown() {
      this.show = !this.show;
      if (this.show) {
        this.afterCssClass = " show";
      } else {
        this.afterCssClass = "";
      }
    },
    onClickItemDropDown(item) {
      this.$emit("on-click-item-dropdown", item);
      this.selectedItem = item;
      this.onClickButtonDropDown();
    },
    setDefaultItem() {
      if (this.dropdownItems && this.dropdownItems.length == 1) {
        this.selectedItem = {
          id: this.dropdownItems[0].id,
          label: this.dropdownItems[0].label
        };
        this.$emit("on-click-item-dropdown", this.selectedItem);
      }
    },
    reset() {
      this.selectedItem = { id: "", label: this.defaultDescription };

      // this.setDefaultItem();
    },
    request() {
      // console.log("Request Method: ", this.getRequisitionPath);
      if (this.requisitionPath) {
        return;
      }

      this.$http({
        url: this.getRequisitionPath,
        method: "GET"
      })
        .then(resp => {
          // console.log("DropDown component Request: ", resp.data);
          this.dropdownItems = resp.data; // o formato do retorno sempre deve ser um array de objetos { id:"", label:""}
          this.setDefaultItem();
        })
        .catch(erro => {
          // console.log("Erro ao retornar telefones: ", erro);
          this.$notify({
            data: erro.response.data.erros,
            type: "warn",
            duration: 10000
          });
        });
    }
  }
};
</script>

<style lang="scss">
#dropdownMenuButton {
  max-width: 10rem;
}
</style>
