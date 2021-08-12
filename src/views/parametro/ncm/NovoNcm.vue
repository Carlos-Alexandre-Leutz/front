<template>
  <div>
    <Tabs :tabs="tabs"> </Tabs>
    <form @submit="validarForm">
      <!-- INICIO ABA NCM -->
      <div v-if="tabs[0].active">
        <div class="row">
          <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <div class="card shadow">
              <header class="card-header">
                <strong class="align-self-center"
                  >{{ $i18n.translate("manutencao") }}
                  {{ $i18n.translate("de") }}
                  {{ $i18n.translate("ncm") }}</strong
                >
              </header>
              <div class="card-body">
                <div class="row">
                  <div class="col">
                    <div class="form-group">
                      <small>
                        {{ $i18n.translate("camposObrigatorio") }}
                      </small>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
                    <div class="form-group">
                      <label>* {{ $i18n.translate("codigoNcm") }}</label>
                      <input
                        v-model="viewModel.codigoNcm"
                        class="form-control"
                        maxlength="10"
                        min="0"
                        step="any"
                        type="number"
                        placeholder="Digite o Código Ncm"
                        required
                      />
                    </div>
                  </div>
                  <div class="col-sm-9 col-md-9 col-lg-9 col-xl-9">
                    <div class="form-group">
                      <label>* {{ $i18n.translate("descricao") }}</label>
                      <input
                        v-model="viewModel.descricao"
                        class="form-control"
                        maxlength="50"
                        type="text"
                        placeholder="Digite a Descrição"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <div class="form-group">
                      <label
                        >{{ $i18n.translate("cst") }}
                        {{ $i18n.translate("pis") }}
                        {{ $i18n.translate("entrada") }}</label
                      >
                      <Multiselect
                        v-model="viewModel.cstPisEntradaId"
                        placeholder="Selecione o CST Pis Entrada"
                        :options="optionsTributos"
                        :searchable="true"
                      />
                    </div>
                  </div>
                  <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <div class="form-group">
                      <label
                        >{{ $i18n.translate("cst") }}
                        {{ $i18n.translate("pis") }}
                        {{ $i18n.translate("saida") }}</label
                      >
                      <Multiselect
                        v-model="viewModel.cstPisSaidaId"
                        placeholder="Selecione o CST Pis Saída"
                        :options="optionsTributos"
                        :searchable="true"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <div class="form-group">
                      <label
                        >{{ $i18n.translate("cst") }}
                        {{ $i18n.translate("cofins") }}
                        {{ $i18n.translate("entrada") }}
                      </label>
                      <Multiselect
                        v-model="viewModel.cstCofinsEntradaId"
                        placeholder="Selecione o CST Cofins Entrada"
                        :options="optionsTributos"
                        :searchable="true"
                      />
                    </div>
                  </div>
                  <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <div class="form-group">
                      <label
                        >{{ $i18n.translate("cst") }}
                        {{ $i18n.translate("cofins") }}
                        {{ $i18n.translate("saida") }}</label
                      >
                      <Multiselect
                        v-model="viewModel.cstCofinsSaidaId"
                        placeholder="Selecione o CST Cofins Saída"
                        :options="optionsTributos"
                        :searchable="true"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
                    <div class="form-group">
                      <label
                        >{{ $i18n.translate("aliquota") }}
                        {{ $i18n.translate("nacional") }} (%)</label
                      >
                      <input
                        v-model="viewModel.aliquotaNacional"
                        class="form-control"
                        type="number"
                        step="any"
                        placeholder="Digite o % de Aliq. Nacional"
                      />
                    </div>
                  </div>
                  <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
                    <div class="form-group">
                      <label
                        >{{ $i18n.translate("aliquota") }}
                        {{ $i18n.translate("importacao") }} (%)</label
                      >
                      <input
                        v-model="viewModel.aliquotaImportacao"
                        class="form-control"
                        type="number"
                        step="any"
                        placeholder="Digite o % de Aliq. Importação"
                      />
                    </div>
                  </div>
                  <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
                    <div class="form-group">
                      <label
                        >{{ $i18n.translate("aliquota") }}
                        {{ $i18n.translate("pis") }} (%)</label
                      >
                      <input
                        v-model="viewModel.aliquotaPis"
                        class="form-control"
                        type="number"
                        step="any"
                        placeholder="Digite o % de Aliq. Pis"
                      />
                    </div>
                  </div>
                  <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
                    <div class="form-group">
                      <label
                        >{{ $i18n.translate("aliquota") }}
                        {{ $i18n.translate("cofins") }} (%)</label
                      >
                      <input
                        v-model="viewModel.aliquotaCofins"
                        class="form-control"
                        type="number"
                        step="any"
                        placeholder="Digite o % de Aliq. Cofins"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
                    <div class="form-group">
                      <label
                        >{{ $i18n.translate("percentual") }}
                        {{ $i18n.translate("mva") }}</label
                      >
                      <input
                        v-model="viewModel.percentualMva"
                        class="form-control"
                        type="number"
                        step="any"
                        placeholder="Digite o % MVA"
                      />
                    </div>
                  </div>
                  <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
                    <div class="form-group">
                      <label
                        >{{ $i18n.translate("codigo") }}
                        {{ $i18n.translate("ex") }}</label
                      >
                      <input
                        v-model="viewModel.codigoNcmEx"
                        class="form-control"
                        type="number"
                        min="0"
                        placeholder="Digite o Código EX"
                      />
                    </div>
                  </div>
                  <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2">
                    <div
                      class="form-group form-check"
                      style="padding-top: 20px"
                    >
                      <input
                        type="checkbox"
                        id="isNcmServico"
                        class="form-check-input"
                        v-model="viewModel.ncmServico"
                      />
                      <label class="form-check-label" for="isNcmServico"
                        >{{ $i18n.translate("ncm") }}
                        {{ $i18n.translate("de") }}
                        {{ $i18n.translate("servico") }}?</label
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- FIM ABA NCM -->
      <!-- INICIO ABA ESTADO -->
      <div v-if="tabs[1].active">
        <div class="card shadow">
          <header class="card-header">
            <strong class="align-self-center"
              >{{ $i18n.translate("manutencao") }}
              {{ $i18n.translate("de") }}
              {{ $i18n.translate("ncm") }}
              {{ $i18n.translate("por") }}
              {{ $i18n.translate("estado") }}</strong
            >
          </header>
          <div class="card-body">
            <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <div class="form-group">
                <small>{{ $i18n.translate("camposObrigatorio") }}</small>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <div class="form-group">
                  <label
                    >* {{ $i18n.translate("estado") }}
                    {{ $i18n.translate("origem") }}</label
                  >
                  <Multiselect
                    id="mtsUfOrigem"
                    v-model="viewModelNcmEstado.ufOrigemId"
                    placeholder="Selecione o Estado Origem"
                    :options="optionsEstados"
                    :searchable="true"
                  />
                </div>
              </div>
              <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <div class="form-group">
                  <label
                    >* {{ $i18n.translate("estado") }}
                    {{ $i18n.translate("destino") }}</label
                  >
                  <Multiselect
                    v-model="viewModelNcmEstado.ufDestinoId"
                    placeholder="Selecione o Estado Destino"
                    :options="optionsEstados"
                    :searchable="true"
                  />
                </div>
              </div>
              <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <div class="form-group">
                  <label>* {{ $i18n.translate("cst") }}</label>
                  <Multiselect
                    v-model="viewModelNcmEstado.cstId"
                    placeholder="Selecione o Cst"
                    :options="optionsTributos"
                    :searchable="true"
                  />
                </div>
              </div>
              <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <div class="form-group">
                  <label>* {{ $i18n.translate("csosn") }}</label>
                  <Multiselect
                    v-model="viewModelNcmEstado.csosnId"
                    placeholder="Selecione o Csosn"
                    :options="optionsTributos"
                    :searchable="true"
                  />
                </div>
              </div>

              <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
                <div class="form-group">
                  <label
                    >* {{ $i18n.translate("aliquota") }}
                    {{ $i18n.translate("icms") }} (%)</label
                  >
                  <input
                    v-model="viewModelNcmEstado.aliquotaICMS"
                    class="form-control"
                    maxlength="50"
                    type="number"
                    step="any"
                    placeholder="Digite o % de Aliq. ICMS"
                  />
                </div>
              </div>
              <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
                <div class="form-group">
                  <label
                    >* {{ $i18n.translate("aliquota") }}
                    {{ $i18n.translate("icms") }}
                    {{ $i18n.translate("interna") }} (%)</label
                  >
                  <input
                    v-model="viewModelNcmEstado.aliquotaICMSInterna"
                    class="form-control"
                    maxlength="50"
                    type="number"
                    step="any"
                    placeholder="Digite o % de Aliq. ICMS Interna"
                  />
                </div>
              </div>
              <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
                <div class="form-group">
                  <label
                    >* {{ $i18n.translate("percentual") }}
                    {{ $i18n.translate("mva") }}
                  </label>
                  <input
                    v-model="viewModelNcmEstado.aliquotaMVA"
                    class="form-control"
                    maxlength="50"
                    type="number"
                    step="any"
                    placeholder="Digite o % MVA"
                  />
                </div>
              </div>
              <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
                <div class="form-group">
                  <label
                    >* {{ $i18n.translate("percentual") }}
                    {{ $i18n.translate("fcp") }}
                  </label>
                  <input
                    v-model="viewModelNcmEstado.aliquotaFCP"
                    class="form-control"
                    maxlength="50"
                    type="number"
                    step="any"
                    placeholder="Digite o % FCP"
                  />
                </div>
              </div>
            </div>

            <div class="align-right mt-3 ml-1">
              <button
                class="btn-padrao btn-confirmar mr-1"
                type="button"
                v-on:click="salvarNcmEstado()"
              >
                {{ $i18n.translate("adicionar") }}
              </button>
              <button
                class="btn btn-secondary"
                type="button"
                v-on:click="limparCampos()"
              >
                {{ $i18n.translate("cancelar") }}
              </button>
            </div>
          </div>
        </div>
        <br />
        <suspense class="mt-2">
          <template #default>
            <Table
              class="table-bordless table-striped"
              :headerColumns="hColumns"
              :items="items"
              pathPaginaAtual="ncm"
              action="true"
              @on-action-click="onEditNcmEstado"
            >
              <template v-slot:table-header-actions>
                <div
                  class="
                    d-flex
                    flex-center
                    justify-content-center
                    align-items-center
                  "
                >
                  {{ $i18n.translate("acoes") }}
                </div>
              </template>
              <template v-slot:table-actions>
                <div
                  class="
                    d-flex
                    flex-center
                    justify-content-center
                    align-items-center
                  "
                >
                  <button
                    data-edit="1"
                    class="btn btn-sm btn-warning mr-2"
                    type="button"
                  >
                    {{ $i18n.translate("editar") }}
                  </button>
                  <button
                    data-edit="0"
                    class="btn btn-sm btn-danger"
                    type="button"
                  >
                    {{ $i18n.translate("deletar") }}
                  </button>
                </div>
              </template>
            </Table>
          </template>
          <template #fallback>{{
            $i18n.translate("caregandoTabela")
          }}</template>
        </suspense>
      </div>
      <!-- FIM ABA ESTADO -->
      <div class="d-flex mt-3 ml-1">
        <button class="btn btn-success mr-2" type="submit">
          {{ $i18n.translate("salvar") }}
        </button>
        <button
          class="btn btn-secondary"
          type="reset"
          @click="$router.push('/ncm/1')"
        >
          {{ $i18n.translate("voltar") }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref, inject, watch, reactive, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import servico from "../../../services/parametro/ncm.js";
import Tabs from "../../../components/tabs/Tabs";
import Multiselect from "@vueform/multiselect";
import Table from "../../../components/table/tablesimple";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";
import traducaoAlertas from "../../../plugins/i18n/alertas";
export default {
  setup() {
    //configuração das abas
    const tabs = reactive([
      { name: "Ncm", active: true },
      { name: "Estado", active: false },
    ]);
    const {
      params: { ncmId },
    } = useRoute();
    const store = useStore();
    var items = ref(null);
    var itemSelected = ref(null);
    var retornoSeletorTributos = [];
    var optionsTributos = ref([]);
    var retornoSeletorEstados = [];
    var optionsEstados = ref([]);
    //declaração das columns da table de NCM por estado
    var hColumns = ref([
      {
        key: "ufOrigem",
        label: "Estado Origem",
      },
      {
        key: "ufDestino",
        label: "Estado Destino",
      },
      {
        key: "cst",
        label: "Cst",
      },
      {
        key: "csosn",
        label: "Csosn",
      },
      {
        key: "aliquotaICMS",
        label: "% ICMS",
      },
      {
        key: "aliquotaICMSInterna",
        label: "% ICMS Int.",
      },
      {
        key: "aliquotaMVA",
        label: "% MVA",
      },
      {
        key: "aliquotaFCP",
        label: "% FCP",
      },
    ]);

    //criar um inject/lib desse codigo
    const defaultModal = inject("defaultModal");
    const defaultModalActions = inject("defaultModalActions");
    const getIdNcm = () => {
      return ncmId ? ncmId : store.state.ncmId;
    };

    var viewModel = ref({
      id: ref(getIdNcm()),
      codigoNcm: ref(""),
      descricao: ref(""),
      cstPisEntradaId: ref(""),
      cstPisSaidaId: ref(""),
      cstCofinsEntradaId: ref(""),
      cstCofinsSaidaId: ref(""),
      aliquotaNacional: ref(""),
      aliquotaImportacao: ref(""),
      aliquotaPis: ref(""),
      aliquotaCofins: ref(""),
      percentualMva: ref(""),
      codigoNcmEx: ref(""),
      ncmServico: ref(false),
      estados: ref([]),
    });
    console.log("viewModel", viewModel);

    var viewModelNcmEstado = ref({
      id: ref(uuidv4()),
      ncmId: ref(getIdNcm()),
      ufOrigemId: ref(""),
      ufOrigem: ref(""),
      ufDestino: "",
      ufDestinoId: ref(""),
      cstId: ref(""),
      cst: ref(""),
      csosnId: ref(""),
      csosn: ref(""),
      aliquotaICMS: ref(""),
      aliquotaICMSInterna: ref(""),
      aliquotaMVA: ref(""),
      aliquotaFCP: ref(""),
      persistido: Boolean,
    });

    const onEditNcmEstado = e => {
      if (!e || !e.target || !e.target.dataset) {
        console.log("Objeto Errado");
        return;
      }
      if (e.target.dataset.edit == 1) {
        viewModelNcmEstado.value.id = e.item.id;
        viewModelNcmEstado.value.ncmId = e.item.ncmId;
        viewModelNcmEstado.value.ufOrigemId = e.item.ufOrigemId;
        viewModelNcmEstado.value.ufDestinoId = e.item.ufDestinoId;
        viewModelNcmEstado.value.cstId = e.item.cstId;
        viewModelNcmEstado.value.csosnId = e.item.csosnId;
        viewModelNcmEstado.value.aliquotaICMS = e.item.aliquotaICMS;
        viewModelNcmEstado.value.aliquotaICMSInterna =
          e.item.aliquotaICMSInterna;
        viewModelNcmEstado.value.aliquotaMVA = e.item.aliquotaMVA;
        viewModelNcmEstado.value.aliquotaFCP = e.item.aliquotaFCP;
      }

      if (e.target.dataset.edit == 0) {
        Swal.fire({
          icon: "question",
          title: "Confirmar exclusão!",
          text: "Você confirma exclusão deste registro?",
          showCancelButton: true,
        }).then(response => {
          if (response.isConfirmed) {
            onDeleteNcmEstado(e.item);
          }
        });
      }
    };
    const onDeleteNcmEstado = item => {
      try {
        var indexGrid = items.value.indexOf(item);
        items.value.splice(indexGrid, 1);
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Erro",
          text: "Erro ao processar requisição!",
        });
      }
    };
    function limparCampos() {
      viewModelNcmEstado.value.ufOrigemId = ref("");
      viewModelNcmEstado.value.ufDestinoId = ref("");
      viewModelNcmEstado.value.cstId = ref("");
      viewModelNcmEstado.value.csosnId = ref("");
      viewModelNcmEstado.value.aliquotaICMS = ref("");
      viewModelNcmEstado.value.aliquotaICMSInterna = ref("");
      viewModelNcmEstado.value.aliquotaMVA = ref("");
      viewModelNcmEstado.value.aliquotaFCP = ref("");
      viewModelNcmEstado.value.ufOrigem = ref("");
      viewModelNcmEstado.value.ufDestino = ref("");
      viewModelNcmEstado.value.cst = ref("");
      viewModelNcmEstado.value.csosn = ref("");
      viewModelNcmEstado.value.id = ref(uuidv4());
    }

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
      if (viewModel.value.codigoNcm && viewModel.value.descricao) {
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
              viewModel.value.codigoNcm = ref("");
              viewModel.value.descricao = ref("");
              viewModel.value.cstPisEntradaId = ref("");
              viewModel.value.cstPisSaidaId = ref("");
              viewModel.value.cstCofinsEntradaId = ref("");
              viewModel.value.cstCofinsSaidaId = ref("");
              viewModel.value.aliquotaNacional = ref("");
              viewModel.value.aliquotaImportacao = ref("");
              viewModel.value.aliquotaPis = ref("");
              viewModel.value.aliquotaCofins = ref("");
              viewModel.value.percentualMva = ref("");
              viewModel.value.codigoNcmEx = ref("");
              viewModel.value.ncmServico = ref(false);
              viewModel.value.estados = ref([]);
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
          text: `prencha a aba NCM`,
        });
      }
    };

    onMounted(async () => {
      const onDeleteNcmEstado = async item => {
        try {
          if (item.persistido) {
            await servico.removeNcmEstado(
              item.ncmId,
              item.id,
              store.state.contaFake
            ); //ja remove do backend
          }
          var index = viewModel.value.estados.indexOf(item);
          viewModel.value.estados.splice(index, 1);
          items.value = viewModel.value.estados;
        } catch (err) {
          console.error("Erro ao buscar Ncm!", err);
        }
      };

      watch(defaultModalActions, actions => {
        if (actions.confirmAction) onDeleteNcmEstado(itemSelected);
      });

      const onGetSeletorTributos = async () => {
        var retornoBackSeletor = await servico.getSeletorTributos();
        var returnMetodoTributos = [];
        retornoBackSeletor.forEach(front => {
          returnMetodoTributos.push({
            value: front.id,
            label: front.descricao,
          });
        });
        optionsTributos.value = returnMetodoTributos;
        return returnMetodoTributos;
      };

      const onGetSeletorEstados = async () => {
        var retornoBackSeletor = await servico.getSeletorEstados();
        var returnMetodoEstados = [];
        retornoBackSeletor.forEach(front => {
          returnMetodoEstados.push({ value: front.id, label: front.descricao });
        });
        optionsEstados.value = returnMetodoEstados;
        return returnMetodoEstados;
      };

      retornoSeletorTributos.value = await onGetSeletorTributos();
      retornoSeletorEstados.value = await onGetSeletorEstados();

      const ObterNcm = async id => {
        var retorno = await servico.getId(id);
        console.log("retorno", retorno);
        viewModel.value.id = retorno.id;
        viewModel.value.codigoNcm = retorno.codigoNcm;
        viewModel.value.descricao = retorno.descricao;
        viewModel.value.cstPisEntradaId = retorno.cstPisEntradaId;
        viewModel.value.cstPisSaidaId = retorno.cstPisSaidaId;
        viewModel.value.cstCofinsEntradaId = retorno.cstCofinsEntradaId;
        viewModel.value.cstCofinsSaidaId = retorno.cstCofinsSaidaId;
        viewModel.value.aliquotaNacional = retorno.aliquotaNacional;
        viewModel.value.aliquotaImportacao = retorno.aliquotaImportacao;
        viewModel.value.aliquotaPis = retorno.aliquotaPis;
        viewModel.value.aliquotaCofins = retorno.aliquotaCofins;
        viewModel.value.percentualMva = retorno.percentualMva;
        viewModel.value.codigoNcmEx = retorno.codigoNcmEx;
        viewModel.value.ncmServico = retorno.ncmServico;
        viewModel.value.estados = retorno.estados;
        items.value = viewModel.value.estados;
      };

      try {
        if (
          ncmId !== undefined &&
          viewModel.value.id !== store.state.emptyGuid
        ) {
          console.log(ncmId);
          ObterNcm(ncmId);
        }
      } catch (err) {
        console.error("Erro ao obter Ncm para edição", err);
      }
    });

    return {
      tabs,
      viewModel,
      viewModelNcmEstado,
      optionsTributos,
      optionsEstados,
      onEditNcmEstado,
      hColumns,
      items,
      limparCampos,
      defaultModal,
      retornoSeletorTributos,
      retornoSeletorEstados,
      store,
      servico,
      validarForm,
    };
  },
  components: { Tabs, Multiselect, Table },
  methods: {
    salvarNcmEstado() {
      console.log("retornoSeletorEstados:", this.retornoSeletorEstados);
      if (
        this.viewModelNcmEstado.ufOrigemId === "" ||
        this.viewModelNcmEstado.ufOrigemId === undefined ||
        this.viewModelNcmEstado.ufDestinoId === "" ||
        this.viewModelNcmEstado.ufDestinoId === undefined ||
        this.viewModelNcmEstado.cstId === "" ||
        this.viewModelNcmEstado.cstId === undefined ||
        this.viewModelNcmEstado.csosnId === "" ||
        this.viewModelNcmEstado.csosnId === undefined ||
        this.viewModelNcmEstado.aliquotaICMS === "" ||
        this.viewModelNcmEstado.aliquotaICMS === undefined ||
        this.viewModelNcmEstado.aliquotaICMSInterna === "" ||
        this.viewModelNcmEstado.aliquotaICMSInterna === undefined ||
        this.viewModelNcmEstado.aliquotaMVA === "" ||
        this.viewModelNcmEstado.aliquotaMVA === undefined ||
        this.viewModelNcmEstado.aliquotaFCP === "" ||
        this.viewModelNcmEstado.aliquotaFCP === undefined
      ) {
        Swal.fire({
          icon: "warning",
          title: "Campos com * são obrigatórios",
        });
        return;
      }

      this.viewModelNcmEstado.ufOrigem = this.retornoSeletorEstados.value.find(
        f => f.value == this.viewModelNcmEstado.ufOrigemId
      ).label;
      this.viewModelNcmEstado.ufDestino = this.retornoSeletorEstados.value.find(
        f => f.value == this.viewModelNcmEstado.ufDestinoId
      ).label;
      this.viewModelNcmEstado.cst = this.retornoSeletorTributos.value.find(
        f => f.value == this.viewModelNcmEstado.cstId
      ).label;
      this.viewModelNcmEstado.csosn = this.retornoSeletorTributos.value.find(
        f => f.value == this.viewModelNcmEstado.csosnId
      ).label;

      //feito dessa forma com JSON para poder passar o valor do viewModelNcmEstado sem ser por referencia
      //pois se fosse feito da forma comentada abaixo, a variavel ncmEstado iria ser limpa quando limpasse o ViewModel no metodo LimparCampos:
      //var ncmEstado = viewModelNcmEstado.value;
      var ncmEstado = JSON.parse(JSON.stringify(this.viewModelNcmEstado));
      var registroEdicao = this.viewModel.estados.find(
        e => e.id == this.viewModelNcmEstado.id
      );

      if (registroEdicao !== undefined) {
        registroEdicao.value = ncmEstado;
        var item = this.viewModel.estados.find(
          e => e.id == registroEdicao.value.id
        );
        item.id = registroEdicao.value.id;
        item.ncmId = registroEdicao.value.ncmId;
        item.ufOrigemId = registroEdicao.value.ufOrigemId;
        item.ufDestinoId = registroEdicao.value.ufDestinoId;
        item.cstId = registroEdicao.value.cstId;
        item.csosnId = registroEdicao.value.csosnId;
        item.aliquotaICMS = registroEdicao.value.aliquotaICMS;
        item.aliquotaICMSInterna = registroEdicao.value.aliquotaICMSInterna;
        item.aliquotaMVA = registroEdicao.value.aliquotaMVA;
        item.aliquotaFCP = registroEdicao.value.aliquotaFCP;
        item.ufOrigem = registroEdicao.value.ufOrigem;
        item.ufDestino = registroEdicao.value.ufDestino;
        item.cst = registroEdicao.value.cst;
        item.csosn = registroEdicao.value.csosn;

        this.items = this.viewModel.estados;
      } else {
        this.viewModelNcmEstado.persistido = false;
        //items.value.push(ncmEstado);
        this.viewModel.estados.push(ncmEstado);
        this.items = this.viewModel.estados;
      }

      this.limparCampos();
    },
  },
};
</script>


<style src="@vueform/multiselect/themes/default.css"></style>