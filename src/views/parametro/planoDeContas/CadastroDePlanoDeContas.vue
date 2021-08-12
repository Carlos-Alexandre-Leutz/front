<template>
  <form @submit="validarForm">
    <div v-if="items != undefined">
      <div class="card shadow">
        <div class="card-header">
          <strong class="align-self-center"> Cadastro plano de contas </strong>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col">
              <div class="form-group">
                <small>Campos com * são de preenchimento obrigatório</small>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="form-group">
                <label>Item pai</label>
                <Multiselect
                  v-model="viewModel.planoContaPaiId"
                  placeholder="Selecione o Tipo"
                  :options="items"
                />
                <!--  <select id="idPai" class="form-select">
                  <option value="">Selecione o campo pai</option>
                  <option
                    v-for="itens in items"
                    :key="itens.id"
                    v-bind:value="itens.itenId"
                  >
                   
                    {{ itens.hierarquia }} {{ itens.descricao }}
                  </option>
                </select> -->
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <div class="form-group">
                <label>* Descrição</label>
                <input
                  id="descricao"
                  v-model="viewModel.descricao"
                  class="form-control"
                  type="nome"
                  placeholder="Digite a Descrição"
                  required
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex mt-3 ml-1">
        <button class="btn btn-success mr-2" type="submit">Salvar</button>
        <button
          class="btn btn-secondary"
          type="reset"
          @click="$router.push('/planocontas')"
        >
          Voltar
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import { ref, onMounted } from "vue";
import servicoPlanodeContas from "../../../services/parametro/planoDeconta";
import Swal from "sweetalert2";
import Multiselect from "@vueform/multiselect";


export default {
  setup() {
    var items = ref(null);
    let optionsTipos = ref([]);   
    let options = ref([]);
    let viewModel = ref({
      conta: ref(),
      descricao: ref(""),
      planoContaPaiId: ref(""),
    });
    const validarForm = e => {
      e.preventDefault();
      servicoPlanodeContas.add(viewModel.value).then(response => {
        let descricao = viewModel.value.descricao;
        if (response.status == 200) {
          Swal.fire({
            icon: "success",
            title: "Concluído",
            text: `O item "${descricao}" foi adicionado `,
          });
        } else {
          Swal.fire({
            icon: "warning",
            title: "Erro",
            text: `O item "${descricao}" não pode ser adicionado `,
          });
        }
      });
    };
   onMounted(async () => {
      const onGetSeletorEstados = async () => {
        var retornoBackSeletor = await servicoPlanodeContas.obterSelectPlanoConta();
        var returnMetodo = [];
        retornoBackSeletor.forEach(front => {
          returnMetodo.push({ value: front.id, label: front.descricao });
        });
        options.value = returnMetodo;
        return returnMetodo;
      };
      items.value = await onGetSeletorEstados();     
      
    });
    return {
      items,
      validarForm,
      viewModel,
      optionsTipos,
    };
  },
  components: { Multiselect },
};
</script>
<style src="@vueform/multiselect/themes/default.css"></style>