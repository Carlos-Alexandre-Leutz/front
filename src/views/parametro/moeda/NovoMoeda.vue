<template>
  <div>
    <form @submit="validarForm">
      <div class="row">
        <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div class="card shadow">
            <header class="card-header">
              <strong class="align-self-center"
                > {{ $i18n.translate("cadastro") }} {{ $i18n.translate("de") }} {{ $i18n.translate("moeda") }}</strong
              >
            </header>
            <div class="card-body">
              <div class="row">
                <div class="col">
                  <div class="form-group">
                    <small>{{ $i18n.translate("camposObrigatório") }}</small>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("nome") }}</label>
                    <input
                      v-model="viewModel.nomeMoeda"
                      class="form-control"
                      type="text"
                      maxlength="50"
                      placeholder="Digite a descrição"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="d-flex mt-3 ml-1">
            <button class="btn btn-success mr-2" type="submit">{{ $i18n.translate("salvar") }}</button>
            <button
              class="btn btn-secondary"
              type="reset"
              @click="$router.push('/moeda/1')"
            >
              {{ $i18n.translate("voltar") }}
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import servico from "../../../services/parametro/moeda";
import traducaoAlertas from "../../../plugins/i18n/alertas"
import Swal from "sweetalert2";

export default {
  setup() {
    const {
      params: { moedaId },
    } = useRoute();
    const store = useStore();
    const getId = () => {
      return moedaId ? moedaId : store.state.emptyGuid;
    };
    var viewModel = ref({
      id: ref(getId()),
      nomeMoeda: ref(""),
    });
    const getEditMode = () => {
      return viewModel.value.id ? true : false;
    };
      const lang = () =>{
      let langDefault = localStorage.getItem("idioma") || "br";
      let langTrad = traducaoAlertas.br;
      if(langDefault != "br"){       
        langTrad = traducaoAlertas.es
      }
      return langTrad    
    }   
    const validarForm = e => {
      e.preventDefault();
      let lengBrEs = lang();
      if (
        viewModel.value.id !== store.state.emptyGuid &&
        viewModel.value.id !== undefined
      ) {
        servico.edit(viewModel.value).then(response => {
          if (response.status == 200) {
            Swal.fire({
              icon: "success",
              title: `${lengBrEs.concluido}`,
              text: `${lengBrEs.oItem} "${viewModel.value.nomeMoeda}" ${lengBrEs.foiEditado}.`,
            });
          } else {
            Swal.fire({
              icon: "warning",
              title: `${lengBrEs.erro}`,
              text: `${lengBrEs.oItem} "${viewModel.value.nomeMoeda}"  ${lengBrEs.naoFoiEditado}.`,
            });
          }
        });
      } else {
          servico.add(viewModel.value).then(response => {
          if (response.status == 200) {
            Swal.fire({
              icon: "success",
              title: `${lengBrEs.concluido}`,
              text: `${lengBrEs.oItem} "${viewModel.value.nomeMoeda}" ${lengBrEs.foiAdicionado}.`,
            });
           viewModel.value.nomeMoeda = ref ("")
          } else {
            Swal.fire({
              icon: "warning",
              title: `${lengBrEs.erro}`,
              text: `${lengBrEs.oItem} ${viewModel.value.nomeMoeda} ${lengBrEs.naoFoiAdicionado}.`,
            });
          }
        });
      }
    };

    const ObterTipoContato = async id => {
      var retorno = await servico.getId(id);
      console.log('retorno', retorno)
      viewModel.value.id = retorno.id;
      viewModel.value.nomeMoeda = retorno.nomeMoeda;
    };
    try {
      console.log("id:", moedaId);
      if (moedaId !== undefined) {
        ObterTipoContato(moedaId);
      }
    } catch (err) {
      console.error("Erro ao obter tipo de contato para edição", err);
    }
    return {
      viewModel,
      getEditMode,
      servico,
      store,
      validarForm
    };
  },
};
</script>

<style></style>