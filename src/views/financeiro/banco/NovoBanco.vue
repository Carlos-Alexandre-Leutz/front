<template>
  <div>
    <form @submit="validarForm">
      <div class="row">
        <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div class="card shadow">
            <header class="card-header">
              <strong class="align-self-center">{{
                $i18n.translate("banco")
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
                <div class="col-sm-12 col-md-6 col-lg-6 col-xl-4">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("nomeBanco") }}</label>
                    <input
                      v-model="viewModel.nomeBanco"
                      class="form-control"
                      type="nome"
                      :placeholder="placeholderNomeBanco"
                      maxlength="50"
                      required
                    />
                  </div>
                </div>
                <div class="col-sm-3 col-md-3 col-lg-3 col-xl-2">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("codigoBanco") }}</label>
                    <input
                      v-model="viewModel.codigoBanco"
                      class="form-control"
                      type="text"
                      maxlength="3"
                      minlength="3"
                      :placeholder="placeholderCodigoBanco"
                      required
                      oninvalid="teste"
                    />
                  </div>
                </div>
                <div class="col-sm-3 col-md-3 col-lg-3 col-xl-2">
                  <div class="form-group">
                    <label> {{ $i18n.translate("carteira") }}</label>
                    <input
                      v-model="viewModel.carteira"
                      class="form-control"
                      type="number"
                      :placeholder="placeholderCarteira"
                    />
                  </div>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-6 col-xl-4">
                  <div class="form-group">
                    <label> {{ $i18n.translate("modalidade") }}</label>
                    <input
                      v-model="viewModel.Modalidade"
                      class="form-control"
                      type="text"
                      :placeholder="placeholderModalidade"
                      maxlength="5"
                    />
                  </div>
                </div>

                <div class="col-sm-12 col-md-6 col-lg-6 col-xl-4">
                  <div class="form-group">
                    <label> {{ $i18n.translate("formaCobranca") }}</label>
                    <Multiselect
                      v-model="viewModel.formaCobranca"
                      :placeholder="placeholderFormaCobranca"
                      :options="formaCobranca"
                      :searchable="true"
                    />
                  </div>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-6 col-xl-4">
                  <div class="form-group">
                    <label>{{ $i18n.translate("layout") }}</label>

                    <Multiselect
                      v-model="viewModel.layout"
                      :placeholder="placeholderLayout"
                      :options="layout"
                      :searchable="true"
                    />
                  </div>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-6 col-xl-4">
                  <div class="form-group">
                    <label> {{ $i18n.translate("sequenciaRemessa") }}</label>
                    <input
                      v-model="viewModel.SequenciaRemessa"
                      class="form-control"
                      type="number"
                      :placeholder="placeholderSequnciaRemeca"
                    />
                  </div>
                </div>
                <div class="col-sm-12 col-md-5 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label
                      >{{ $i18n.translate("nome") }}
                      {{ $i18n.translate("Cedente") }}</label
                    >
                    <input
                      maxlength="70"
                      v-model="viewModel.NomeCedente"
                      class="form-control"
                      type="text"
                      :placeholder="placeholderNomeCedente"
                    />
                  </div>
                </div>

                <div class="col-sm-12 col-md-4 col-lg-3 col-xl-3">
                  <div class="form-group">
                    <label>CNPJ {{ $i18n.translate("Cedente") }}</label>
                    <input
                      maxlength="14"
                      v-model="viewModel.CNPJCedente"
                      class="form-control"
                      type="text"
                      :placeholder="placeholderCnpjCedente"
                    />
                  </div>
                </div>
                <div class="col-sm-12 col-md-3 col-lg-3 col-xl-3">
                  <div class="form-group">
                    <label>{{ $i18n.translate("codigoCedente") }}</label>
                    <input
                      maxlength="20"
                      v-model="viewModel.CodigoCedente"
                      class="form-control"
                      type="text"
                      :placeholder="placeholderCodigoCedente"
                    />
                  </div>
                </div>
                <div class="col-sm-9 col-md-3 col-lg-4 col-xl-3">
                  <div class="form-group">
                    <label>{{ $i18n.translate("codigoTransmissao") }}</label>
                    <input
                      v-model="viewModel.CodigoTransmissao"
                      class="form-control"
                      type="text"
                      :placeholder="placeholderCodigoTransmicao"
                    />
                  </div>
                </div>
                <div class="col-sm-3 col-md-3 col-lg-2 col-xl-3">
                  <div class="form-group">
                    <label> {{ $i18n.translate("complemento") }}</label>
                    <input
                      maxlength="10"
                      v-model="viewModel.Complemento"
                      class="form-control"
                      type="text"
                      :placeholder="placeholderComplemeto"
                    />
                  </div>
                </div>
                <div class="col-sm-12 col-md-3 col-lg-4 col-xl-4">
                  <div class="form-group">
                    <label> {{ $i18n.translate("agencia") }}</label>
                    <input
                      maxlength="4"
                      v-model="viewModel.Agencia"
                      class="form-control"
                      type="text"
                      :placeholder="placeholderAgencia"
                    />
                  </div>
                </div>
                <div class="col-sm-12 col-md-3 col-lg-2 col-xl-2">
                  <div class="form-group">
                    <label>
                      {{ $i18n.translate("digito") }}
                      {{ $i18n.translate("agencia") }}
                    </label>
                    <input
                      maxlength="1"
                      v-model="viewModel.DigitoVerificadorAgencia"
                      class="form-control"
                      type="text"
                      :placeholder="placeholderDigitoAgencia"
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-4 col-lg-3 col-xl-2">
                  <div class="form-group">
                    <label> {{ $i18n.translate("diasProtesto") }}</label>
                    <input
                      v-model="viewModel.DiasProtesto"
                      class="form-control"
                      type="text"
                      :placeholder="placeholderDiasProtesto"
                    />
                  </div>
                </div>
                <div class="col-sm-12 col-md-4 col-lg-3 col-xl-2">
                  <div class="form-group">
                    <label> {{ $i18n.translate("percentualJuros") }} (%)</label>
                    <input
                      v-model="viewModel.PercentualJuros"
                      class="form-control"
                      type="text"
                      :placeholder="placeholderPercentualJuros"
                      step="any"
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-4 col-lg-2 col-xl-2">
                  <div class="form-group">
                    <label> {{ $i18n.translate("percentualMulta") }} (%)</label>
                    <input
                      v-model="viewModel.PercentualMulta"
                      class="form-control"
                      type="text"
                      :placeholder="placeholderPercentualMulta"
                      step="any"
                    />
                  </div>
                </div>

                <div class="col-sm-6 col-md-3 col-lg-2 col-xl-4">
                  <div class="form-group">
                    <label> {{ $i18n.translate("contaCorrente") }}</label>
                    <input
                      maxlength="20"
                      v-model="viewModel.ContaCorrente"
                      class="form-control"
                      type="text"
                      :placeholder="placeholderContaCorente"
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-3 col-lg-2 col-xl-2">
                  <div class="form-group">
                    <label> {{ $i18n.translate("digitoVerificador") }}</label>
                    <input
                      maxlength="1"
                      v-model="viewModel.DigitoVerificadorContaCorrente"
                      class="form-control"
                      type="text"
                      :placeholder="placeholderDigitoVerificador"
                    />
                  </div>
                </div>
                <div class="col-sm-3 col-md-3 col-lg-5 col-xl-2">
                  <div class="form-group">
                    <label>{{ $i18n.translate("convenio") }}</label>
                    <input
                      maxlength="10"
                      v-model="viewModel.Convenio"
                      class="form-control"
                      type="text"
                      :placeholder="placeholderConvenio"
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-3 col-lg-5 col-xl-4">
                  <div class="form-group">
                    <label> {{ $i18n.translate("localPagamento") }}</label>
                    <input
                      maxlength="70"
                      v-model="viewModel.LocalPagamento"
                      class="form-control"
                      type="text"
                      :placeholder="placeholderLocalPagamento"
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-2 col-lg-2 col-xl-2">
                  <div class="form-group">
                    <label> {{ $i18n.translate("producaoTestes") }}</label
                    ><br />
                    <input
                      v-model="viewModel.producaoTeste"
                      type="checkbox"
                      class="form-check-input"
                    />
                  </div>
                </div>
                <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <div class="form-group">
                    <label>{{ $i18n.translate("mensagemInstrucao") }} 1</label>
                    <input
                      maxlength="70"
                      v-model="viewModel.MensagemInstrucao1"
                      class="form-control"
                      type="text"
                      :placeholder="placeholderMensagemInstrucao"
                    />
                  </div>
                </div>
                <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <div class="form-group">
                    <label>{{ $i18n.translate("mensagemInstrucao") }} 2</label>
                    <input
                      maxlength="70"
                      v-model="viewModel.MensagemInstrucao2"
                      class="form-control"
                      type="text"
                      :placeholder="placeholderMensagemInstrucao"
                    />
                  </div>
                </div>
                <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <div class="form-group">
                    <label>{{ $i18n.translate("mensagemInstrucao") }} 3</label>
                    <input
                      v-model="viewModel.MensagemInstrucao3"
                      maxlength="70"
                      class="form-control"
                      type="text"
                      :placeholder="placeholderMensagemInstrucao"
                    />
                  </div>
                </div>
                <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <div class="form-group">
                    <label>{{ $i18n.translate("mensagemInstrucao") }} 4</label>
                    <input
                      maxlength="70"
                      v-model="viewModel.MensagemInstrucao4"
                      class="form-control"
                      type="text"
                      :placeholder="placeholderMensagemInstrucao"
                    />
                  </div>
                </div>
                <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <div class="form-group">
                    <label>{{ $i18n.translate("mensagemInstrucao") }} 5</label>
                    <input
                      maxlength="70"
                      v-model="viewModel.MensagemInstrucao5"
                      class="form-control"
                      type="text"
                      :placeholder="placeholderMensagemInstrucao"
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
              @click="$router.push('/banco/1')"
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
import { ref, watch, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import servico from "../../../services/financeiro/banco";
import servicoSeletor from "../../../services/seletor.js";
import Swal from "sweetalert2";
import Multiselect from "@vueform/multiselect";
import traducaoAlertas from "../../../plugins/i18n/alertas";
import traducaoParametros from "../../../plugins/i18n/parametros";
export default {
  components: { Multiselect },
  setup() {
    const {
      params: { bancoId },
    } = useRoute();
    const store = useStore();
    var siglaTeste = ref("");
    var formaCobranca = ref([]);
    var layout = ref([]);
    const getId = () => {
      return bancoId ? bancoId : store.state.emptyGuid;
    };
    var viewModel = ref({
      ContaId: ref(getId()),
      NomeBanco: ref(""),
      CodigoBanco: ref(""),
      codigoIbge: ref(""),
      Carteira: ref(""),
      Modalidade: ref(""),
      Layout: ref(0),
      SequenciaRemessa: ref(""),
      NomeCedente: ref(""),
      CnpjCedente: ref(""),
      CodigoCedente: ref(""),
      CodigoTransmissao: ref(""),
      Complemento: ref(""),
      Agencia: ref(""),
      DigitoVerificadorAgencia: ref(""),
      DiasProtesto: ref(""),
      PercentualJuros: ref(""),
      PercentualMulta: ref(""),
      ContaCorrente: ref(""),
      DigitoVerificadorContaCorrente: ref(""),
      Convenio: ref(""),
      producaoTeste: ref(false),
      MensagemInstrucao1: ref(""),
      LocalPagamento: ref(""),
      Linha1: ref(""),
      Linha2: ref(""),
      Linha3: ref(""),
      Linha4: ref(""),
      Linha5: ref(""),
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
    const langParametos = () => {
      let langDefault = localStorage.getItem("idioma") || "br";
      let langTrad = traducaoParametros.br;
      if (langDefault != "br") {
        langTrad = traducaoParametros.es;
      }
      return langTrad;
    };

    let placeholderNomeBanco;
    let placeholderCodigoBanco;
    let placeholderCarteira;
    let placeholderModalidade;
    let placeholderFormaCobranca;
    let placeholderLayout;
    let placeholderSequnciaRemeca;
    let placeholderNomeCedente;
    let placeholderCnpjCedente;
    let placeholderCodigoCedente;
    let placeholderCodigoTransmicao;
    let placeholderComplemeto;
    let placeholderAgencia;
    let placeholderDigitoAgencia;
    let placeholderDiasProtesto;
    let placeholderPercentualJuros;
    let placeholderPercentualMulta;
    let placeholderContaCorente;
    let placeholderDigitoVerificador;
    let placeholderConvenio;
    let placeholderLocalPagamento;
    let placeholderMensagemInstrucao;
    let languagePageNow = langParametos();
    //title = ` ${languagePageNow.add} ${languagePageNow.banco}`;
    console.log(languagePageNow);
    placeholderNomeBanco = ` ${languagePageNow.digite} ${languagePageNow.o} ${languagePageNow.nomeBanco}`;
    placeholderCodigoBanco = ` ${languagePageNow.digite} ${languagePageNow.o} ${languagePageNow.codigoBanco}`;
    placeholderCarteira = ` ${languagePageNow.digite} ${languagePageNow.a} ${languagePageNow.carteira}`;
    placeholderModalidade = ` ${languagePageNow.digite} ${languagePageNow.a} ${languagePageNow.modalidade}`;
    placeholderFormaCobranca = ` ${languagePageNow.selecione} ${languagePageNow.a} ${languagePageNow.formaCobranca}`;
    placeholderLayout = ` ${languagePageNow.selecione} ${languagePageNow.o} ${languagePageNow.layout}`;
    placeholderSequnciaRemeca = ` ${languagePageNow.digite} ${languagePageNow.a} ${languagePageNow.sequenciaRemeca}`;
    placeholderNomeCedente = ` ${languagePageNow.digite} ${languagePageNow.o} ${languagePageNow.nomeCedente}`;
    placeholderCnpjCedente = ` ${languagePageNow.digite} ${languagePageNow.o} ${languagePageNow.cnpjCedente}`;
    placeholderCodigoCedente = ` ${languagePageNow.digite} ${languagePageNow.o} ${languagePageNow.codigoCedente}`;
    placeholderCodigoTransmicao = ` ${languagePageNow.digite} ${languagePageNow.o} ${languagePageNow.codigoTransmicao}`;
    placeholderComplemeto = ` ${languagePageNow.digite} ${languagePageNow.o} ${languagePageNow.complemeto}`;
    placeholderAgencia = ` ${languagePageNow.digite} ${languagePageNow.a} ${languagePageNow.agencia}`;
    placeholderDigitoAgencia = ` ${languagePageNow.digite} ${languagePageNow.o} ${languagePageNow.digitoAgencia}`;
    placeholderDiasProtesto = ` ${languagePageNow.digite} ${languagePageNow.o} ${languagePageNow.diasProtesto}`;
    placeholderPercentualJuros = ` ${languagePageNow.digite} ${languagePageNow.o} ${languagePageNow.percentualJuros}`;
    placeholderPercentualMulta = ` ${languagePageNow.digite} ${languagePageNow.o} ${languagePageNow.percentualMulta}`;
    placeholderContaCorente = ` ${languagePageNow.digite} ${languagePageNow.a} ${languagePageNow.contaCorente}`;
    placeholderDigitoVerificador = ` ${languagePageNow.digite} ${languagePageNow.o} ${languagePageNow.digitoVerificador}`;
    placeholderConvenio = ` ${languagePageNow.digite} ${languagePageNow.o} ${languagePageNow.convenio}`;
    placeholderLocalPagamento = ` ${languagePageNow.digite} ${languagePageNow.o} ${languagePageNow.localPagamento}`;
    placeholderMensagemInstrucao = ` ${languagePageNow.digite} ${languagePageNow.a} ${languagePageNow.mensagemInstrucao}`;

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
              text: `${lengBrEs.oItem} "${viewModel.value.nomeBanco}" ${lengBrEs.foiEditado}.`,
            });
          } else {
            Swal.fire({
              icon: "warning",
              title: `${lengBrEs.erro}`,
              text: `${lengBrEs.oItem} "${viewModel.value.nomeBanco}"  ${lengBrEs.naoFoiEditado}.`,
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
              text: `${lengBrEs.oItem} "${viewModel.value.nomeBanco}" ${lengBrEs.foiAdicionado}.`,
            });
            viewModel.value.NomeBanco = ref("");
            viewModel.value.CodigoBanc = ref("");
            viewModel.value.codigoIbge = ref("");
            viewModel.value.Carteira = ref("");
            viewModel.value.Modalidade = ref("");
            viewModel.value.Layout = ref(0);
            viewModel.value.SequenciaRemessa = ref("");
            viewModel.value.NomeCedente = ref("");
            viewModel.value.CnpjCedente = ref("");
            viewModel.value.CodigoCedente = ref("");
            viewModel.value.CodigoTransmissao = ref("");
            viewModel.value.Complemento = ref("");
            viewModel.value.Agencia = ref("");
            viewModel.value.DigitoVerificadorAgencia = ref("");
            viewModel.value.DiasProtesto = ref("");
            viewModel.value.PercentualJuros = ref("");
            viewModel.value.PercentualMulta = ref("");
            viewModel.value.ContaCorrente = ref("");
            viewModel.value.DigitoVerificadorContaCorrente = ref("");
            viewModel.value.Convenio = ref("");
            viewModel.value.producaoTeste = ref(false);
            viewModel.value.MensagemInstrucao1 = ref("");
            viewModel.value.LocalPagamento = ref("");
            viewModel.value.Linha1 = ref("");
            viewModel.value.Linha2 = ref("");
            viewModel.value.Linha3 = ref("");
            viewModel.value.Linha4 = ref("");
            viewModel.value.Linha5 = ref("");
          } else {
            Swal.fire({
              icon: "warning",
              title: `${lengBrEs.erro}`,
              text: `${lengBrEs.oItem} ${viewModel.value.nomeBanco} ${lengBrEs.naoFoiAdicionado}.`,
            });
          }
        });
      }
    };
    watch(
      () => siglaTeste.value,
      (sigla, siglaOld) => {
        console.log("Changed! New: ", sigla, " Old: ", siglaOld);
      }
    );
    onMounted(async () => {
      const obterSeletor = async url => {
        var retornoBack = await servicoSeletor.obterSeletorGenerico(url);
        var returnMetodo = [];
        retornoBack.forEach(e => {
          returnMetodo.push({ value: e.id, label: e.descricao });
        });
        return returnMetodo;
      };

      formaCobranca.value = await obterSeletor(
        "banco/obter-seletor-forma-cobranca"
      );
      layout.value = await obterSeletor("banco/obter-seletor-layout");

      const ObterDadosBanco = async id => {
        var retorno = await servico.getId(id);
        console.log("retorno v-model", retorno);
        viewModel.value.id = retorno.id;
        viewModel.value.nomeBanco = retorno.nomeBanco;
        viewModel.value.codigoBanco = retorno.codigoBanco;
        viewModel.value.codigoIbge = retorno.codigoIbge;
        viewModel.value.carteira = retorno.carteira;
        viewModel.value.Modalidade = retorno.modalidade;
        viewModel.value.formaCobranca = retorno.formaCobranca;
        viewModel.value.layout = retorno.layout;
        viewModel.value.SequenciaRemessa = retorno.sequenciaRemessa;
        viewModel.value.NomeCedente = retorno.nomeCedente;
        viewModel.value.CNPJCedente = retorno.cnpjCedente;
        viewModel.value.CodigoCedente = retorno.codigoCedente;
        viewModel.value.CodigoTransmissao = retorno.codigoTransmissao;
        viewModel.value.Complemento = retorno.complemento;
        viewModel.value.Agencia = retorno.agencia;
        viewModel.value.CodigoTransmissao = retorno.codigoTransmissao;
        viewModel.value.DiasProtesto = retorno.diasProtesto;
        viewModel.value.PercentualJuros = retorno.percentualJuros;
        viewModel.value.PercentualMulta = retorno.percentualMulta;
        viewModel.value.ContaCorrente = retorno.contaCorrente;
        viewModel.value.DigitoVerificadorContaCorrente =
          retorno.digitoVerificadorContaCorrente;
        viewModel.value.Convenio = retorno.convenio;
        viewModel.value.producaoTeste = retorno.producaoTeste;
        viewModel.value.LocalPagamento = retorno.localPagamento;
        viewModel.value.MensagemInstrucao1 = retorno.mensagemInstrucao1;
        viewModel.value.MensagemInstrucao2 = retorno.mensagemInstrucao2;
        viewModel.value.MensagemInstrucao3 = retorno.mensagemInstrucao3;
        viewModel.value.MensagemInstrucao4 = retorno.mensagemInstrucao4;
        viewModel.value.MensagemInstrucao5 = retorno.mensagemInstrucao5;
      };

      try {
        if (
          bancoId !== undefined &&
          viewModel.value.id !== store.state.emptyGuid
        ) {
          ObterDadosBanco(bancoId);
          console.log("obter dados banco");
        }
      } catch (err) {
        console.error("Erro ao obter estado para edição", err);
      }
    });
    return {
      viewModel,
      getEditMode,
      store,
      servico,
      formaCobranca,
      layout,
      validarForm,
      placeholderNomeBanco,
      placeholderCodigoBanco,
      placeholderCarteira,
      placeholderModalidade,
      placeholderFormaCobranca,
      placeholderLayout,
      placeholderSequnciaRemeca,
      placeholderNomeCedente,
      placeholderCnpjCedente,
      placeholderCodigoCedente,
      placeholderCodigoTransmicao,
      placeholderComplemeto,
      placeholderAgencia,
      placeholderDigitoAgencia,
      placeholderDiasProtesto,
      placeholderPercentualJuros,
      placeholderPercentualMulta,
      placeholderContaCorente,
      placeholderDigitoVerificador,
      placeholderConvenio,
      placeholderLocalPagamento,
      placeholderMensagemInstrucao,
    };
  },
};
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
