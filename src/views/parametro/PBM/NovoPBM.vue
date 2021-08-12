<template>
  <div>
    <form @submit="validarForm">
      <div class="row">
        <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div class="card shadow">
            <header class="card-header">
              <strong class="align-self-center">
                   {{ $i18n.translate("cadastro") }} {{ $i18n.translate("de") }} {{ $i18n.translate("pbm") }}
                </strong
              >
            </header>
            <div class="card-body">
              <div class="row">
                <div class="col">
                  <div class="form-group">
                    <small>{{ $i18n.translate("camposObrigatorio") }}</small>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("nome") }}</label>
                    <input
                      v-model="viewModel.nome"
                      class="form-control"
                      type="nome"
                      placeholder="Digite o Nome"
                      maxlength="50"
                      required
                    />
                  </div>
                </div>
                <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <div class="form-group">
                    <label>{{ $i18n.translate("observacao") }}</label>
                    <textarea rows="4" 
                    v-model="viewModel.observacao" class="form-control"
                    type="text" placeholder="Digite a observação" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="d-flex mt-3 ml-1">
            <button class="btn btn-success mr-2" type="submit">
              {{ $i18n.translate("salvar") }}
            </button>
            <button
              class="btn btn-secondary"
              type="reset"
              @click="$router.push('/pbm/1')"
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
import { ref, watch } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import servico from "../../../services/parametro/pbm.js";
import Swal from "sweetalert2";
import traducaoAlertas from "../../../plugins/i18n/alertas";

export default {
  setup() {
    const {
      params: { pbmId },
    } = useRoute();

    const store = useStore();

    const getId = () => {
      console.log("pbmId:", pbmId);
      return pbmId ? pbmId : store.state.emptyGuid;
    };
    console.log("servico : ", servico);

    var siglaTeste = ref("");

    var viewModel = ref({
      id: ref(getId()),
      nome: ref(""),
      observacao: ref(""),
    });

    const getEditMode = () => {
      return viewModel.value.id ? true : false;
    };

    watch(
      () => siglaTeste.value,
      (sigla, siglaOld) => {
        console.log("Changed! New: ", sigla, " Old: ", siglaOld);
      }
    );

    const lang = () => {
      let langDefault = localStorage.getItem("idioma") || "br";
      let langTrad = traducaoAlertas.br;
      if (langDefault != "br") {
        langTrad = traducaoAlertas.es;
      }
      return langTrad;
    };
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
              text: `${lengBrEs.oItem} "${viewModel.value.nome}" ${lengBrEs.foiEditado}.`,
            });
          } else {
            Swal.fire({
              icon: "warning",
              title: `${lengBrEs.erro}`,
              text: `${lengBrEs.oItem} "${viewModel.value.nome}"  ${lengBrEs.naoFoiEditado}.`,
            });
          }
        });
      } else {
        console.log("viewmodel:", viewModel.value);
        servico.add(viewModel.value).then(response => {
          if (response.status == 200) {
            Swal.fire({
              icon: "success",
              title: `${lengBrEs.concluido}`,
              text: `${lengBrEs.oItem} "${viewModel.value.nome}" ${lengBrEs.foiAdicionado}.`,
            });
            viewModel.value.nome = ref("");
            viewModel.value.observacao = ref("");
          } else {
            Swal.fire({
              icon: "warning",
              title: `${lengBrEs.erro}`,
              text: `${lengBrEs.oItem} ${viewModel.value.nome} ${lengBrEs.naoFoiAdicionado}.`,
            });
          }
        });
      }
    };
    const ObterPais = async id => {
      var retorno = await servico.getId(id);
      viewModel.value.id = retorno.id;
      viewModel.value.nome = retorno.nome;
      viewModel.value.observacao = retorno.observacao;
    };

    try {
      if (pbmId !== undefined && viewModel.value.id !== store.state.emptyGuid) {
        ObterPais(pbmId);
      }
    } catch (err) {
      console.error("Erro ao obter pais para edição", err);
    }

    return {
      viewModel,
      getEditMode,
      validarForm,
      ObterPais,
    };
  },
};
</script>

<style></style>
