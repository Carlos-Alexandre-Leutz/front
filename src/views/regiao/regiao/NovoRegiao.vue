<template>
  <div>
    <form @submit="validarForm">
      <div class="row">
        <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div class="card shadow">
            <header class="card-header">
              <strong class="align-self-center"
                >{{ $i18n.translate("cadastroRegiao") }}
              </strong>
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
                <div class="col-sm-7 col-md-7 col-lg-7 col-xl-7">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("regiao") }}</label>
                    <input
                      v-model="viewModel.Nome"
                      class="form-control"
                      type="name"
                      placeholder="Digite a Região"
                      required
                      maxlength="255"
                    />
                  </div>
                </div>
                <div class="col-sm-5 col-md-5 col-lg-5 col-xl-5">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("taxa") }}</label>
                    <input
                      v-model="viewModel.Taxa"
                      class="form-control"
                      type="number"
                      required
                      step="any"
                      maxlength="30"
                    />
                  </div>
                </div>
              </div>

              <div class="row mb-3">
                <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <div class="row">
                    <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2">
                      <div
                        class="
                          custom-switch
                          custom-switch-primary-inverse
                          custom-switch-small
                          pl-1
                        "
                        data-toggle="tooltip"
                        data-placement="left"
                      >
                        <label>{{ $i18n.translate("segunda") }}</label>
                        <br />

                        <input
                          v-model="viewModel.Segunda"
                          type="checkbox"
                          value="true"
                          class="custom-switch-input"
                          id="segunda"
                          @click="
                            true
                              ? (viewModel.Segunda = true)
                              : (viewModel.Segunda = false)
                          "
                        />
                        <label class="custom-switch-btn" for="segunda"></label>
                      </div>
                    </div>
                    <div class="col-sm-10 col-md-10 col-lg-10 col-xl-10">
                      <div v-if="viewModel.Segunda" class="row">
                        <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          <div class="form-group">
                            <label>
                              {{ $i18n.translate("horaInicio") }}
                              {{ $i18n.translate("segunda") }}
                            </label>
                            <input
                              type="time"
                              v-model="viewModel.HoraInicioSegunda"
                              class="form-control"
                            />
                          </div>
                        </div>
                        <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          <div class="form-group">
                            <label>
                              {{ $i18n.translate("horaFinal") }}
                              {{ $i18n.translate("segunda") }}
                            </label>
                            <input
                              type="time"
                              v-model="viewModel.HoraFinalSegunda"
                              class="form-control"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <div class="row">
                    <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2">
                      <div
                        class="
                          custom-switch
                          custom-switch-primary-inverse
                          custom-switch-small
                          pl-1
                        "
                        data-toggle="tooltip"
                        data-placement="left"
                      >
                        <label>{{ $i18n.translate("terca") }}</label>
                        <br />
                        <input
                          v-model="viewModel.Terca"
                          type="checkbox"
                          value="true"
                          class="custom-switch-input"
                          id="terca"
                          @click="
                            true
                              ? (viewModel.Terca = true)
                              : (viewModel.Terca = false)
                          "
                        />
                        <label class="custom-switch-btn" for="terca"></label>
                      </div>
                    </div>
                    <div class="col-sm-10 col-md-10 col-lg-10 col-xl-10">
                      <div v-if="viewModel.Terca" class="row">
                        <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          <div class="form-group">
                            <label>
                              {{ $i18n.translate("horaInicio") }}
                              {{ $i18n.translate("terca") }}
                            </label>
                            <input
                              type="time"
                              v-model="viewModel.HoraInicioTerca"
                              class="form-control"
                            />
                          </div>
                        </div>
                        <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          <div class="form-group">
                            <label>
                              {{ $i18n.translate("horaFinal") }}
                              {{ $i18n.translate("terca") }}
                            </label>
                            <input
                              type="time"
                              v-model="viewModel.HoraFinalTerca"
                              class="form-control"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <div class="row mb-3">
                    <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2">
                      <div
                        class="
                          custom-switch
                          custom-switch-primary-inverse
                          custom-switch-small
                          pl-1
                        "
                        data-toggle="tooltip"
                        data-placement="left"
                      >
                        <label>{{ $i18n.translate("quarta") }}</label>
                        <br />
                        <input
                          v-model="viewModel.Quarta"
                          type="checkbox"
                          value="true"
                          class="custom-switch-input"
                          id="quarta"
                          @click="
                            true
                              ? (viewModel.Quarta = true)
                              : (viewModel.Quarta = false)
                          "
                        />
                        <label class="custom-switch-btn" for="quarta"></label>
                      </div>
                    </div>
                    <div class="col-sm-10 col-md-10 col-lg-10 col-xl-10">
                      <div v-if="viewModel.Quarta" class="row">
                        <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          <div class="form-group">
                            <label>
                              {{ $i18n.translate("horaInicio") }}
                              {{ $i18n.translate("Quarta") }}
                            </label>
                            <input
                              type="time"
                              v-model="viewModel.HoraInicioQuarta"
                              class="form-control"
                            />
                          </div>
                        </div>
                        <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          <div class="form-group">
                            <label>
                              {{ $i18n.translate("horaFinal") }}
                              {{ $i18n.translate("quarta") }}
                            </label>
                            <input
                              type="time"
                              v-model="viewModel.HoraFinalQuarta"
                              class="form-control"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <div class="row">
                    <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2">
                      <div
                        class="
                          custom-switch
                          custom-switch-primary-inverse
                          custom-switch-small
                          pl-1
                        "
                        data-toggle="tooltip"
                        data-placement="left"
                      >
                        <label>{{ $i18n.translate("quinta") }}</label>
                        <br />
                        <input
                          v-model="viewModel.Quinta"
                          type="checkbox"
                          value="true"
                          class="custom-switch-input"
                          id="quinta"
                          @click="
                            true
                              ? (viewModel.Quinta = true)
                              : (viewModel.Quinta = false)
                          "
                        />
                        <label class="custom-switch-btn" for="quinta"></label>
                      </div>
                    </div>
                    <div class="col-sm-10 col-md-10 col-lg-10 col-xl-10">
                      <div v-if="viewModel.Quinta" class="row">
                        <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          <div class="form-group">
                            <label>
                              {{ $i18n.translate("horaInicio") }}
                              {{ $i18n.translate("quinta") }}
                            </label>
                            <input
                              type="time"
                              v-model="viewModel.HoraInicioQuinta"
                              class="form-control"
                            />
                          </div>
                        </div>
                        <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          <div class="form-group">
                            <label>
                              {{ $i18n.translate("horaFinal") }}
                              {{ $i18n.translate("quinta") }}
                            </label>
                            <input
                              type="time"
                              v-model="viewModel.HoraFinalQuinta"
                              class="form-control"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <div class="row">
                    <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2">
                      <div
                        class="
                          custom-switch
                          custom-switch-primary-inverse
                          custom-switch-small
                          pl-1
                        "
                        data-toggle="tooltip"
                        data-placement="left"
                      >
                        <label>{{ $i18n.translate("sexta") }}</label>
                        <br />
                        <input
                          v-model="viewModel.Sexta"
                          type="checkbox"
                          value="true"
                          class="custom-switch-input"
                          id="sexta"
                          @click="
                            true
                              ? (viewModel.Sexta = true)
                              : (viewModel.Sexta = false)
                          "
                        />
                        <label class="custom-switch-btn" for="sexta"></label>
                      </div>
                    </div>
                    <div class="col-sm-10 col-md-10 col-lg-10 col-xl-10">
                      <div v-if="viewModel.Sexta" class="row">
                        <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          <div class="form-group">
                            <label>
                              {{ $i18n.translate("horaInicio") }}
                              {{ $i18n.translate("sexta") }}
                            </label>
                            <input
                              type="time"
                              v-model="viewModel.HoraInicioSexta"
                              class="form-control"
                            />
                          </div>
                        </div>
                        <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          <div class="form-group">
                            <label>
                              {{ $i18n.translate("horaFinal") }}
                              {{ $i18n.translate("sexta") }}
                            </label>
                            <input
                              type="time"
                              v-model="viewModel.HoraFinalSexta"
                              class="form-control"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <div class="row">
                    <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2">
                      <div
                        class="
                          custom-switch
                          custom-switch-primary-inverse
                          custom-switch-small
                          pl-1
                        "
                        data-toggle="tooltip"
                        data-placement="left"
                      >
                        <label>{{ $i18n.translate("sabado") }}</label>
                        <br />
                        <input
                          v-model="viewModel.Sabado"
                          type="checkbox"
                          value="true"
                          class="custom-switch-input"
                          id="sabado"
                          @click="
                            true
                              ? (viewModel.Sabado = true)
                              : (viewModel.Sabado = false)
                          "
                        />
                        <label class="custom-switch-btn" for="sabado"></label>
                      </div>
                    </div>
                    <div class="col-sm-10 col-md-10 col-lg-10 col-xl-10">
                      <div v-if="viewModel.Sabado" class="row">
                        <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          <div class="form-group">
                            <label>
                              {{ $i18n.translate("horaInicio") }}
                              {{ $i18n.translate("sabado") }}
                            </label>
                            <input
                              type="time"
                              v-model="viewModel.HoraInicioSabado"
                              class="form-control"
                            />
                          </div>
                        </div>
                        <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          <div class="form-group">
                            <label>
                              {{ $i18n.translate("horaFinal") }}
                              {{ $i18n.translate("sabado") }}
                            </label>
                            <input
                              type="time"
                              v-model="viewModel.HoraFinalSabado"
                              class="form-control"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <div class="row">
                    <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2 mb-3">
                      <div
                        class="
                          custom-switch
                          custom-switch-primary-inverse
                          custom-switch-small
                          pl-1
                        "
                        data-toggle="tooltip"
                        data-placement="left"
                      >
                        <label>{{ $i18n.translate("domingo") }}</label>
                        <br />
                        <input
                          v-model="viewModel.Domingo"
                          type="checkbox"
                          value="true"
                          class="custom-switch-input"
                          id="domingo"
                          @click="
                            true
                              ? (viewModel.Domingo = true)
                              : (viewModel.Domingo = false)
                          "
                        />
                        <label class="custom-switch-btn" for="domingo"></label>
                      </div>
                    </div>
                    <div class="col-sm-10 col-md-10 col-lg-10 col-xl-10">
                      <div v-if="viewModel.Domingo" class="row">
                        <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          <div class="form-group">
                            <label>
                              {{ $i18n.translate("horaInicio") }}
                              {{ $i18n.translate("domingo") }}
                            </label>
                            <input
                              type="time"
                              v-model="viewModel.HoraInicioDomingo"
                              class="form-control"
                            />
                          </div>
                        </div>
                        <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          <div class="form-group">
                            <label>
                              {{ $i18n.translate("horaFinal") }}
                              {{ $i18n.translate("domingo") }}
                            </label>
                            <input
                              type="time"
                              v-model="viewModel.HoraFinalDomingo"
                              class="form-control"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
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
              @click="$router.push('/regiao/1')"
            >
              Voltar
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import servico from "../../../services/regiao/regiao";
import traducaoAlertas from "../../../plugins/i18n/alertas";
import Swal from "sweetalert2";

export default {
  setup() {
    const {
      params: { regiaoId },
    } = useRoute();
    const store = useStore();
    const getId = () => {
      return regiaoId ? regiaoId : store.state.emptyGuid;
    };

    let optionsTipos = ref([]);

    let viewModel = ref({
      Nome: ref(""),
      Taxa: ref(""),
      Domingo: ref(false),
      HoraInicioDomingo: ref(""),
      HoraFinalDomingo: ref(""),
      Segunda: ref(false),
      HoraInicioSegunda: ref(""),
      HoraFinalSegunda: ref(""),
      Terca: ref(false),
      HoraInicioTerca: ref(""),
      HoraFinalTerca: ref(""),
      Quarta: ref(false),
      HoraInicioQuarta: ref(""),
      HoraFinalQuarta: ref(""),
      Quinta: ref(false),
      HoraInicioQuinta: ref(""),
      HoraFinalQuinta: ref(""),
      Sexta: ref(false),
      HoraInicioSexta: ref(""),
      HoraFinalSexta: ref(""),
      Sabado: ref(false),
      HoraInicioSabado: ref(""),
      HoraFinalSabado: ref(""),
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
      if (viewModel.value.Taxa.length >= 15) {
        let lengBrEs = lang();
        Swal.fire({
          icon: "warning",
          title: `${lengBrEs.erro}`,
          text: `${lengBrEs.aTaxa} `,
        });
      } else {
        salvaForm(e);
      }
    };
    const salvaForm = e => {
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
              text: `${lengBrEs.oItem} "${viewModel.value.Nome}" ${lengBrEs.foiEditado}.`,
            });
          } else {
            Swal.fire({
              icon: "warning",
              title: `${lengBrEs.erro}`,
              text: `${lengBrEs.oItem} "${viewModel.value.Nome}"  ${lengBrEs.naoFoiEditado}.`,
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
              text: `${lengBrEs.oItem} "${viewModel.value.Nome}" ${lengBrEs.foiAdicionado}.`,
            });

            viewModel.value.Nome = ref("");
            viewModel.value.Taxa = ref("");
            viewModel.value.Domingo = ref(false);
            viewModel.value.HoraInicioDomingo = ref("");
            viewModel.value.HoraFinalDomingo = ref("");
            viewModel.value.Segunda = ref(false);
            viewModel.value.HoraInicioSegunda = ref("");
            viewModel.value.HoraFinalSegunda = ref("");
            viewModel.value.Terca = ref(false);
            viewModel.value.HoraInicioTerca = ref("");
            viewModel.value.HoraFinalTerca = ref("");
            viewModel.value.Quarta = ref(false);
            viewModel.value.HoraInicioQuarta = ref("");
            viewModel.value.HoraFinalQuarta = ref("");
            viewModel.value.Quinta = ref(false);
            viewModel.value.HoraInicioQuinta = ref("");
            viewModel.value.HoraFinalQuinta = ref("");
            viewModel.value.Sexta = ref(false);
            viewModel.value.HoraInicioSexta = ref("");
            viewModel.value.HoraFinalSexta = ref("");
            viewModel.value.Sabado = ref(false);
            viewModel.value.HoraInicioSabado = ref("");
            viewModel.value.HoraFinalSabado = ref("");
          } else {
            Swal.fire({
              icon: "warning",
              title: `${lengBrEs.erro}`,
              text: `${lengBrEs.oItem} ${viewModel.value.Nome} ${lengBrEs.naoFoiAdicionado}.`,
            });
          }
        });
      }
    };
    onMounted(async () => {
      const ObterHorarios = async id => {
        var retorno = await servico.getId(id);
        console.log("retorno obter horarios", retorno);
        console.log("retorno", retorno.horaFinalDomingo);

        viewModel.value.id = retorno.id;
        viewModel.value.Nome = retorno.nome;
        viewModel.value.Taxa = retorno.taxa;
        viewModel.value.Segunda = retorno.segunda;
        viewModel.value.Terca = retorno.terca;
        viewModel.value.Quarta = retorno.quarta;
        viewModel.value.Quinta = retorno.quinta;
        viewModel.value.Sexta = retorno.sexta;
        viewModel.value.Sabado = retorno.sabado;
        viewModel.value.Domingo = retorno.domingo;
        viewModel.value.HoraInicioSegunda = retorno.horaInicioSegunda;
        viewModel.value.HoraFinalSegunda = retorno.horaFinalSegunda;
        viewModel.value.HoraInicioTerca = retorno.horaInicioTerca;
        viewModel.value.HoraFinalTerca = retorno.horaFinalTerca;
        viewModel.value.HoraInicioQuarta = retorno.horaInicioQuarta;
        viewModel.value.HoraFinalQuarta = retorno.horaFinalQuarta;
        viewModel.value.HoraInicioQuinta = retorno.horaInicioQuinta;
        viewModel.value.HoraInicioQuinta = retorno.horaInicioQuinta;
        viewModel.value.HoraFinalQuinta = retorno.horaFinalQuinta;
        viewModel.value.HoraInicioSexta = retorno.horaInicioSexta;
        viewModel.value.HoraFinalSexta = retorno.horaFinalSexta;
        viewModel.value.HoraInicioSabado = retorno.horaInicioSabado;
        viewModel.value.HoraFinalSabado = retorno.horaFinalSabado;
        viewModel.value.HoraInicioDomingo = retorno.horaInicioDomingo;
        viewModel.value.HoraFinalDomingo = retorno.horaFinalDomingo;
      };

      try {
        console.log("id:", regiaoId);
        console.log("viewModel:", viewModel);
        if (
          regiaoId !== undefined &&
          viewModel.value.id !== store.state.emptyGuid
        ) {
          ObterHorarios(regiaoId);
        }
      } catch (err) {
        console.error("Erro ao obter tributo para edição", err);
      }
    });

    return {
      getEditMode,
      optionsTipos,
      store,
      servico,
      viewModel,
      getId,
      validarForm,
      salvaForm,
    };
  },
};
</script>
