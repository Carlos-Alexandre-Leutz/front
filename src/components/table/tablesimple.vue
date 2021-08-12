<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col" v-for="(item, index) in hColumns" :key="index">
          <div>
             {{ $i18n.translate(item.label) }}
          </div>
        </th>
        <th v-if="lAction" id="tableHeaderActions">
          <slot name="table-header-actions"></slot>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr scope="row" v-for="(rowObj, index) in items" :key="index">
        <td v-for="(rowValue, index) in getColumns(rowObj)" :key="index">
          {{ rowValue }}
        </td>
        <td
          v-if="lAction"
          :id="'tableAction' + index"
          :data-item="rowObj"
          @click="onActionClick($event, rowObj)"
        >
          <slot name="table-actions"></slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { ref } from "vue";
export default {
  props: ["headerColumns", "items", "action"],
  async setup(props, { emit }) {
    var hColumns = ref(props.headerColumns);
    var lAction = ref(props.action ? props.action : false);
    var lItems = ref(await props.items);
       // console.log(
      //     "Items: ",
     //     props.items,
    //     " Header columns: ",
       //     props.headerColumns,
      //     " Actions: ",
     //     props.action
    // );
    const getColumns = obj => {
      var columnsValues = [];
      //algum dia fazer mais bonito para as bixonas não reclamarem
      for (let index = 0; index < hColumns.value.length; index++) {
        const key = hColumns.value[index].key;
        columnsValues.push(obj[key]);
      }
      //   console.log("getRows test: ", columnsValues);
      return columnsValues;
    };
    const onActionClick = (e, obj) => {
     // console.log("Table: OnActionClick: ", e);
      e.item = obj;
      emit("on-action-click", e);
    };
    return {
      lAction,
      hColumns,
      lItems,
      getColumns,
      onActionClick
    };
  }
};
</script>

<style></style>