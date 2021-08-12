<template>
  <div>
    <form @submit="validarForm">
      <div class="row">
        <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div class="card shadow">
            <header class="card-header">
              <strong class="align-self-center">{{
                $i18n.translate("cadastroTributo")
              }}</strong>
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
                <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("codigoTributo") }}</label>
                    <input
                      v-model="viewModel.codigoTributo"
                      class="form-control"
                      type="text"
                      placeholder="Digite o Código do Tributo"
                      maxlength="10"
                      required
                    />
                  </div>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("tipo") }}</label>
                    <Multiselect
                      v-model="viewModel.tipo"
                      placeholder="Selecione o Tipo"
                      :change="(exibeCampos = this.viewModel.tipo == 7)"
                      :options="optionsTipos"
                      required
                    />
                  </div>
                </div>
                <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("descricao") }}</label>
                    <textarea
                      v-model="viewModel.descricao"
                      class="form-control"
                      type="text"
                      placeholder="Digite a descrição"
                      maxlength="500"
                      required
                    ></textarea>
                  </div>
                </div>
              </div>
              <div v-if="exibeCampos" class="row">
                <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <div class="form-group">
                    <label> {{ $i18n.translate("ncm") }}</label>
                    <Multiselect
                      v-model="viewModel.ncms"
                      mode="tags"
                      placeholder="Selecione o Ncm"
                      :searchable="true"
                      :createTag="true"
                      :options="optionsNcm"
                    />
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
              @click="$router.push('/tributo/1')"
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
import { ref, inject } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import servico from "../../../services/parametro/tributo.js";
import Multiselect from "@vueform/multiselect";
import Swal from "sweetalert2";
import enumSelect from "../../../services/enum/enum.js";
import traducaoAlertas from "../../../plugins/i18n/alertas";

export default {
  setup() {
    const {
      params: { tributoId },
    } = useRoute();
    const store = useStore();
    console.log("store", store);

    const getId = () => {
      return tributoId ? tributoId : store.state.tributoId;
    };
    var exibeCampos = ref(true);
    var optionsTipos = ref([]);
    var retornoSeletorNcm = [];
    var optionsNcm = ref([]);
    var viewModel = ref({
      id: ref(getId()),
      codigoTributo: ref(""),
      descricao: ref(""),
      tipo: ref(""),
      ncms: ref([]),
    });

    const getEditMode = () => {
      return viewModel.value.id ? true : false;
    };
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

      let estado = parseFloat(viewModel.value.tipo);
      console.log(estado);
      let lengBrEs = lang();
      if (!isNaN(estado)) {
        if (
          viewModel.value.id !== store.state.emptyGuid &&
          viewModel.value.id !== undefined
        ) {
          servico.edit(viewModel.value).then(response => {
            if (response.status == 200) {
              Swal.fire({
                icon: "success",
                title: `${lengBrEs.concluido}`,
                text: `${lengBrEs.oItem} "${viewModel.value.descricao}" ${lengBrEs.foiEditado}.`,
              });
            } else {
              Swal.fire({
                icon: "warning",
                title: `${lengBrEs.erro}`,
                text: `${lengBrEs.oItem} "${viewModel.value.descricao}"  ${lengBrEs.naoFoiEditado}.`,
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
                text: `${lengBrEs.oItem} "${viewModel.value.descricao}" ${lengBrEs.foiAdicionado}.`,
              });

              viewModel.value.codigoTributo = ref("");
              viewModel.value.descricao = ref("");
              viewModel.value.tipo = ref("");
              viewModel.value.ncms = ref([]);
            } else {
              Swal.fire({
                icon: "warning",
                title: `${lengBrEs.erro}`,
                text: `${lengBrEs.oItem} ${viewModel.value.descricao} ${lengBrEs.naoFoiAdicionado}.`,
              });
            }
          });
        }
      } else {
        Swal.fire({
          icon: "warning",
          title: `${lengBrEs.atencao}`,
          text: `${lengBrEs.PreenchaOCampo}`,
        });
      }
    };
    const defaultModal = inject("defaultModal");

    optionsTipos = enumSelect.TributoTipo;

    const onGetNcms = async () => {
      var retornoBackSeletor = await servico.getSeletorNcm();
      console.log("retornoBackSeletor", retornoBackSeletor);
      var returnMetodoNcm = [];
      retornoBackSeletor.forEach(front => {
        returnMetodoNcm.push({ value: front.id, label: front.descricao });
      });
      optionsNcm.value = returnMetodoNcm;
      return returnMetodoNcm;
    };
    retornoSeletorNcm.value = onGetNcms();
    const ObterTributo = async id => {
      var retorno = await servico.getId(id);
      console.log("retorno", retorno);

      viewModel.value.codigoTributo = retorno.codigoTributo;
      viewModel.value.descricao = retorno.descricao;
      viewModel.value.tipo = retorno.tipo;
      viewModel.value.ncms = retorno.ncms;
    };

    try {
      console.log("id:", tributoId);
      console.log("viewModelid:", viewModel.value);
      if (
        tributoId !== undefined &&
        viewModel.value.id !== store.state.emptyGuid
      ) {
        ObterTributo(tributoId);
        console.log("obteu otributo");
      }
    } catch (err) {
      console.error("Erro ao obter tributo para edição", err);
    }

    return {
      getEditMode,
      optionsTipos,
      optionsNcm,
      exibeCampos,
      store,
      servico,
      defaultModal,
      viewModel,
      validarForm,
    };
  },
  components: { Multiselect },
  methods: {
    // async validarForm(e) {
    //   e.preventDefault();
    //   console.log("viewmodel: ", this.viewModel);
    //   if (this.viewModel.tipo != 7) {
    //     this.viewModel.ncms = [];
    //   }
    //   console.log("defaultModal", this.defaultModal);
    //   if (
    //     this.viewModel.id !== this.store.state.emptyGuid &&
    //     this.viewModel.id !== undefined
    //   ) {
    //     servico.edit(this.viewModel).then(response => {
    //       if (response.status == 200) {
    //         Swal.fire({
    //           icon: "success",
    //           title: "Concluído",
    //           text: `O item  foi editado`,
    //         });
    //       } else {
    //         Swal.fire({
    //           icon: "warning",
    //           title: "Erro",
    //           text: `O item  não pode ser editado `,
    //         });
    //       }
    //     });
    //   } else {
    //     servico.add(this.viewModel).then(response => {
    //       if (response.status == 200) {
    //         Swal.fire({
    //           icon: "success",
    //           title: "Concluído",
    //           text: `O item  foi adicionado `,
    //         });
    //       } else {
    //         Swal.fire({
    //           icon: "warning",
    //           title: "Erro",
    //           text: `O item  não pode ser adicionado `,
    //         });
    //       }
    //     });
    //   }
    //   //router.push("/tributo");
    // },
  },
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
