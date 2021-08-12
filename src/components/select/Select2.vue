<template>
  <div class="select-container" @click="onClick">
    <div class="select-sub-container">
      <!-- spans -->
      <span class="selected-item" v-for="item in selectedItems" :key="item.id">
        {{ item.label }}

        <div class="selected-item-remove" @click="onClickRemoveItem(item)">
          <i class="far fa-times-circle icon-size ml-1"></i>
        </div>
      </span>
      <input id="select-input" type="text" class="selected-input" />
      <i class="fas fa-search icon-size ml-auto mr-1"></i>
    </div>
    <div v-if="open" class="select-dropdown">
      <!-- Scroll -->
      <div
        class="select-dropdown-item"
        v-for="item in items"
        :key="item.id"
        @click="onClickDropdownItem(item)"
      >
        {{ item.label }}
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted, ref } from "vue";

export default {
  props: ["multiplo", "items"],
  setup(props) {
    //Responsável por receber os dados
    var lItems = ref(props.items);

    var input;

    var selectedItems = reactive([]);

    const state = reactive({
      open: false
    });

    const onClick = () => {
      state.open = !state.open;
      input.focus();
    };

    onMounted(() => {
      input = document.getElementById("select-input");
    });

    const onClickDropdownItem = item => {
      // Adicionar item no array de selecionados
      if (props.multiplo) {
        if (selectedItems.length > 0) {
          //Não deixa adicionar itens iguais
          let idexItem = selectedItems.findIndex(s => s.id == item.id);
          
          if (idexItem < 0) selectedItems.push(item);
        } else selectedItems.push(item);
      }

      if (!props.multiplo) {
        selectedItems.pop();
        selectedItems.push(item);
      }
    };

    const onClickRemoveItem = item => {
      // remove o item do array de selecionados
      selectedItems.splice(selectedItems.indexOf(item), 1);
      state.open = !state.open;
    };

    return {
      ...toRefs(state),
      onClick,
      lItems,
      selectedItems,
      onClickDropdownItem,
      onClickRemoveItem
    };
  }
};
</script>

<style lang="scss" scoped>
.select-container {
  display: flex;
  flex-direction: column;
}

.select-sub-container {
  display: flex;
  flex-wrap: wrap;
  padding: 0.375rem 0.75rem;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  align-items: center;
}

.selected-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0.15rem 0.15rem 0rem 0rem;
  padding: 0.7em 0.7em;
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  border: 1px solid #3c3c3c42;
  border-radius: 0.25rem;
  background-color: #f0f0f0;
}

.select-dropdown {
  border: 1px solid #ced4da;
  padding: 0;
  box-shadow: -1.095px 6.914px 12.96px 3.04px #33333345;
  max-height: 10rem;
  overflow-y: scroll;
  scroll-behavior: smooth;
  position: initial;
  size: unset;
}

.select-dropdown-item {
  display: block;
  line-height: 1.42857143;
  padding: 3px 20px;
  clear: both;
  color: rgb(20, 20, 20);
  white-space: nowrap;

  &:hover {
    cursor: pointer;
    background: #c2dbfe;
  }
}

.selected-input {
  border: none;
  background: transparent;

  &:focus {
    border: none;
    background: transparent;
    box-shadow: none;
    outline: none;
  }
}

.icon-size {
  font-size: 0.8rem;
}
</style>
