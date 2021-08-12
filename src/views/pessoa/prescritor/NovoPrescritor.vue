<template>
  <div>
    <form @submit="validarForm">
      <div class="row">
        <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div class="card shadow">
            <header class="card-header">
              <strong class="align-self-center">{{
                $i18n.translate("prescritor")
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
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("nome") }}</label>
                    <input
                      class="form-control"
                      type="text"
                      :placeholder="placeholderNome"
                      required
                      v-model="viewModel.nome"
                      maxlength="255"
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>
                      {{ $i18n.translate("tipoPessoa") }}
                    </label>
                    <Multiselect
                      v-model="viewModel.tipoPessoa"
                      :placeholder="placeholderTipoPessoa"
                      :options="optionsTipoPessoa"
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("cpfCnpj") }}</label>
                    <input
                      class="form-control"
                      type="text"
                      :placeholder="placeholderCpfCnpj"
                      v-model="viewModel.cpfCnpj"
                      required
                      maxlength="18"
                      @change="replaceCpfCnpj()"
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("tipocr") }}</label>

                    <Multiselect
                      v-model="viewModel.tipocr"
                      :placeholder="placeholderTipoCr"
                      :options="optionstipocr"
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("siglaUFCR") }}</label>
                    <input
                      class="form-control"
                      type="text"
                      :placeholder="placeholderSiglaUfcr"
                      required
                      v-model="viewModel.siglaUFCR"
                      maxlength="2"
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>{{ $i18n.translate("nrCR") }}</label>
                    <input
                      class="form-control"
                      type="text"
                      :placeholder="placeholderNrcr"
                      v-model="viewModel.nrCR"
                      maxlength="10"
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("nomeSecretaria") }}</label>
                    <input
                      class="form-control"
                      type="text"
                      :placeholder="placeholderNomeSecretaria"
                      v-model="viewModel.nmSecretaria"
                      maxlength="255"
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("genero") }}</label>
                    <Multiselect
                      v-model="viewModel.genero"
                      :placeholder="placeholderGenero"
                      :options="optionsGenero"
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("nomeRotulo") }}</label>
                    <input
                      class="form-control"
                      type="text"
                      :placeholder="placeholderNomerotulo"
                      required
                      v-model="viewModel.nomeRotulo"
                      maxlength="50"
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label> {{ $i18n.translate("dtAniversario") }}</label>
                    <input
                      class="form-control"
                      type="date"
                      v-model="viewModel.dtAniversario"
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label> {{ $i18n.translate("proximidade") }} 1</label>
                    <input
                      class="form-control"
                      type="text"
                      :placeholder="placeholderProcimidade1"
                      v-model="viewModel.proximidade"
                      maxlength="60"
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label> {{ $i18n.translate("proximidade") }} 2</label>
                    <input
                      class="form-control"
                      type="text"
                      :placeholder="placeholderProcimidade2"
                      v-model="viewModel.proximidade2"
                      maxlength="60"
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label> {{ $i18n.translate("numeroRegistroMapa") }}</label
                    ><br />
                    <input
                      class="form-control"
                      type="text"
                      :placeholder="placeholderNumeroRegistroMapa"
                      v-model="viewModel.numRegMapa"
                      maxlength="50"
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label> {{ $i18n.translate("visitador") }}</label>
                    <Multiselect
                      v-model="viewModel.IDVisitador"
                      :placeholder="placeholderVisitador"
                      :options="optionsidentificador"
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label> {{ $i18n.translate("observacaoVenda") }}</label
                    ><br />
                    <input
                      class="form-control"
                      type="text"
                      :placeholder="placeholderObsVenda"
                      v-model="viewModel.observacaoVenda"
                      maxlength="255"
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label> {{ $i18n.translate("especialidade") }}</label>
                    <Multiselect
                      mode="tags"
                      v-model="viewModel.prescritorEspecialidade"
                      :placeholder="placeholderVisitador"
                      :options="optionsEspecialidade"
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label> {{ $i18n.translate("cedh") }}</label
                    ><br />
                    <input type="checkbox" v-model="viewModel.cedh" />
                  </div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label> {{ $i18n.translate("sincronizouAlcance") }}</label>
                    <br />
                    <input
                      type="checkbox"
                      v-model="viewModel.sincronizouAlcance"
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label> {{ $i18n.translate("ativo") }}</label
                    ><br />
                    <input type="checkbox" v-model="viewModel.snAtivo" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card shadow mt-2">
        <header class="card-header">
          <strong class="align-self-center">
            {{ $i18n.translate("enderecos") }}
          </strong>
        </header>
        <div class="card-body">
          <div class="row">
            <div class="col-sm-12 col-md-4 col-lg-4 col-xl-4">
              <suspense>
                <template #default>
                  <Table
                    class="table-bordless table-striped"
                    :headerColumns="hColumnsEndereco"
                    :items="itemsEndereco"
                    action="true"
                    @on-action-click="onEditEndereco"
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
                <template #fallback>
                  {{ $i18n.translate("carregandoTabela") }}
                </template>
              </suspense>
            </div>
            <div class="col-sm-12 col-md-8 col-lg-8 col-xl-8">
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
                    <label>* {{ $i18n.translate("descricao") }}</label>
                    <input
                      v-model="viewModelEndereco.descricao"
                      class="form-control"
                      type="nome"
                      :placeholder="placeholderDescricao"
                    />
                  </div>
                </div>
                <div class="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("cep") }}</label>
                    <input
                      v-model="viewModelEndereco.cep"
                      class="form-control"
                      type="nome"
                      :placeholder="placeholderCep"
                      maxlength="8"
                      @blur="buscaCep()"
                    />
                  </div>
                </div>
                <div class="col-sm-8 col-md-8 col-lg-8 col-xl-8">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("rua") }}</label>
                    <input
                      v-model="viewModelEndereco.rua"
                      class="form-control"
                      type="nome"
                      :placeholder="placeholderRua"
                    />
                  </div>
                </div>
                <div class="col-sm-4 col-md-4 col-lg-4 col-xl-4">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("numero") }}</label>
                    <input
                      v-model="viewModelEndereco.numero"
                      class="form-control"
                      type="nome"
                      :placeholder="placeholderNumero"
                    />
                  </div>
                </div>
                <div class="col-sm-12 col-md-8 col-lg-8 col-xl-8">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("complemento") }}</label>
                    <input
                      v-model="viewModelEndereco.complemento"
                      class="form-control"
                      type="nome"
                      :placeholder="placeholderComplemento"
                    />
                  </div>
                </div>

                <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("pais") }}</label>
                    <Multiselect
                      v-model="viewModelEndereco.paisId"
                      :placeholder="placeholderCidade"
                      :options="optionsPais"
                      v-on:select="preencherSeletorEstado()"
                    />
                  </div>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("estado") }}</label>
                    <Multiselect
                      v-model="viewModelEndereco.estadoId"
                      :placeholder="placeholderEstado"
                      :options="optionsEstado"
                      v-on:select="preencherSeletorCidade()"
                    />
                  </div>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("cidade") }}</label>
                    <Multiselect
                      v-model="viewModelEndereco.cidadeId"
                      :placeholder="placeholderCidade"
                      :options="optionsCidade"
                      v-on:select="preencherSeletorBairro()"
                    />
                  </div>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("bairro") }}</label>

                    <Multiselect
                      v-model="viewModelEndereco.bairro"
                      placeholder="placeholderBairro"
                      :options="optionsBairro"
                    />
                  </div>
                </div>

                <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>{{ $i18n.translate("Ativo") }}</label>
                    <br />
                    <input
                      v-model="viewModelEndereco.snAtivo"
                      type="checkbox"
                    />
                  </div>
                </div>
              </div>

              <div class="align-right mt-3 ml-1">
                <button
                  class="btn-padrao btn-confirmar mr-1"
                  type="button"
                  v-on:click="validaCadastroEndereco()"
                >
                  {{ $i18n.translate("adicionar") }}
                </button>
                <button
                  class="btn btn-secondary"
                  type="button"
                  v-on:click="limparCamposEndereco()"
                >
                  {{ $i18n.translate("cancelar") }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card shadow mt-2">
        <header class="card-header">
          <strong class="align-self-center">
            {{ $i18n.translate("telefone") }}
          </strong>
        </header>
        <div class="card-body">
          <div class="row">
            <div class="col-sm-12 col-md-4 col-lg-4 col-xl-4">
              <suspense>
                <template #default>
                  <Table
                    class="table-bordless table-striped"
                    :headerColumns="hColumnsTelefone"
                    :items="itemsTelefone"
                    action="true"
                    @on-action-click="onEditTelefone"
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
                <template #fallback>
                  {{ $i18n.translate("carregandoTabela") }}
                </template>
              </suspense>
            </div>
            <div class="col-sm-12 col-md-8 col-lg-8 col-xl-8">
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
                    <label>*{{ $i18n.translate("descricao") }}</label>
                    <input
                      v-model="viewModelTelefone.descricao"
                      class="form-control"
                      type="nome"
                      :placeholder="placeholderDescricao"
                    />
                  </div>
                </div>
                <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
                  <div class="form-group">
                    <label>*{{ $i18n.translate("ddd") }}</label>
                    <input
                      v-model="viewModelTelefone.ddd"
                      class="form-control"
                      type="nome"
                      :placeholder="placeholderDDD"
                    />
                  </div>
                </div>
                <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
                  <div class="form-group">
                    <label>*{{ $i18n.translate("ddi") }}</label>
                    <input
                      v-model="viewModelTelefone.ddi"
                      class="form-control"
                      type="nome"
                      :placeholder="placeholderDDI"
                    />
                  </div>
                </div>

                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>*{{ $i18n.translate("numero") }}</label>
                    <input
                      v-model="viewModelTelefone.numero"
                      class="form-control"
                      type="nome"
                      :placeholder="placeholderNumero"
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>*{{ $i18n.translate("tipo") }}</label>
                  </div>
                  <Multiselect
                    v-model="viewModelTelefone.tipo"
                    :placeholder="placeholderTipoTelefone"
                    :options="optionsTipoTelefone"
                  />
                </div>
                <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
                  <div class="form-group">
                    <label>*{{ $i18n.translate("whatsApp") }}</label> <br />
                    <input
                      type="checkbox"
                      v-model="viewModelTelefone.ehWhatsApp"
                    />
                  </div>
                </div>
                <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
                  <div class="form-group">
                    <label>*{{ $i18n.translate("ativo") }}</label> <br />
                    <input
                      type="checkbox"
                      v-model="viewModelTelefone.snAtivo"
                    />
                  </div>
                </div>
              </div>
              <div class="align-right mt-3 ml-1">
                <button
                  class="btn-padrao btn-confirmar mr-1"
                  type="button"
                  v-on:click="validaCadastroTelefone()"
                >
                  {{ $i18n.translate("adicionar") }}
                </button>
                <button
                  class="btn btn-secondary"
                  type="button"
                  v-on:click="limparCamposTelefone()"
                >
                  {{ $i18n.translate("cancelar") }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card shadow mt-2">
        <header class="card-header">
          <strong class="align-self-center">
            {{ $i18n.translate("contato") }}
          </strong>
        </header>
        <div class="card-body">
          <div class="row">
            <div class="col-sm-12 col-md-4 col-lg-4 col-xl-4">
              <suspense>
                <template #default>
                  <Table
                    class="table-bordless table-striped"
                    :headerColumns="hColumnsContato"
                    :items="itemsContato"
                    action="true"
                    @on-action-click="onEditContato"
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
                <template #fallback>
                  {{ $i18n.translate("carregandoTabela") }}
                </template>
              </suspense>
            </div>
            <div class="col-sm-12 col-md-8 col-lg-8 col-xl-8">
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
                    <label>* {{ $i18n.translate("descricao") }}</label>
                    <input
                      v-model="viewModelContato.descContato"
                      class="form-control"
                      type="nome"
                      :placeholder="placeholderDescricao"
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("nome") }}</label>
                    <input
                      v-model="viewModelContato.nome"
                      class="form-control"
                      type="nome"
                      :placeholder="placeholderNome"
                    />
                  </div>
                </div>
                <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("tipo") }}</label>
                    <Multiselect
                      v-model="viewModelContato.tipo"
                      :placeholder="placeholderTipoContato"
                      :options="optionsTipoContato"
                    />
                  </div>
                </div>

                <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
                  <div class="form-group">
                    <label>{{ $i18n.translate("ativo") }}</label> <br />
                    <input
                      v-model="viewModelContato.descContato"
                      type="checkbox"
                    />
                  </div>
                </div>
              </div>
              <div class="align-right mt-3 ml-1">
                <button
                  class="btn-padrao btn-confirmar mr-1"
                  type="button"
                  v-on:click="validaCadastroContato()"
                >
                  {{ $i18n.translate("adicionar") }}
                </button>
                <button
                  class="btn btn-secondary"
                  type="button"
                  v-on:click="limparCamposContato()"
                >
                  {{ $i18n.translate("cancelar") }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card shadow mt-2">
        <header class="card-header">
          <strong class="align-self-center">
            {{ $i18n.translate("especialidade") }}
          </strong>
        </header>
        <div class="card-body">
          <div class="row">
            <div class="col-sm-12 col-md-4 col-lg-4 col-xl-4">
              <suspense>
                <template #default>
                  <Table
                    class="table-bordless table-striped"
                    :headerColumns="hColumnsContato"
                    :items="itemsContato"
                    action="true"
                    @on-action-click="onEditContato"
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
                <template #fallback>
                  {{ $i18n.translate("carregandoTabela") }}
                </template>
              </suspense>
            </div>
            <div class="col-sm-12 col-md-8 col-lg-8 col-xl-8">
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
                    <label>* {{ $i18n.translate("descricao") }}</label>
                    <input
                      v-model="viewModelContato.descContato"
                      class="form-control"
                      type="nome"
                      :placeholder="placeholderDescricao"
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("nome") }}</label>
                    <input
                      v-model="viewModelContato.nome"
                      class="form-control"
                      type="nome"
                      :placeholder="placeholderNome"
                    />
                  </div>
                </div>
                <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("tipo") }}</label>
                    <Multiselect
                      v-model="viewModelContato.tipo"
                      :placeholder="placeholderTipoContato"
                      :options="optionsTipoContato"
                    />
                  </div>
                </div>

                <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
                  <div class="form-group">
                    <label>{{ $i18n.translate("ativo") }}</label> <br />
                    <input
                      v-model="viewModelContato.descContato"
                      type="checkbox"
                    />
                  </div>
                </div>
              </div>
              <div class="align-right mt-3 ml-1">
                <button
                  class="btn-padrao btn-confirmar mr-1"
                  type="button"
                  v-on:click="validaCadastroContato()"
                >
                  {{ $i18n.translate("adicionar") }}
                </button>
                <button
                  class="btn btn-secondary"
                  type="button"
                  v-on:click="limparCamposContato()"
                >
                  {{ $i18n.translate("cancelar") }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex mt-3 ml-1 buttonsActions">
        <button class="btn btn-success mr-2" type="submit">
          {{ $i18n.translate("salvar") }}
        </button>
        <button
          class="btn btn-secondary"
          type="reset"
          @click="$router.push('/prescritor/1')"
        >
          {{ $i18n.translate("voltar") }}
        </button>
      </div>
    </form>
    <br /><br /><br />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import enumSelect from "../../../services/enum/enum";
import Multiselect from "@vueform/multiselect";
import servico from "../../../services/pessoa/prescritor.js";
import Table from "../../../components/table/tablesimple";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";
import servicoSeletor from "../../../services/seletor.js";
import servicoEnum from "../../../services/enum/enum";
import traducaoAlertas from "../../../plugins/i18n/alertas";
import traducaoParametros from "../../../plugins/i18n/parametros";
export default {
  components: {
    Multiselect,
    Table,
  },
  setup() {
    const {
      params: { prescritorId, visualizar },
    } = useRoute();
    if (visualizar) {
      mostrarBtnSalvar = false;
    } else {
      mostrarBtnSalvar = true;
    }
    const getId = () => {
      return prescritorId ? prescritorId : store.state.emptyGuid;
    };
    let mostrarBtnSalvar;
    const store = useStore();
    let exibeCampos = ref(false);
    let optionsPais = ref([]);
    let optionsEstado = ref([]);
    let optionsCidade = ref([]);
    let optionsBairro = ref([]);
    let optionsBanco = ref([]);
    let optionsPlanoConta = ref([]);
    let optionsTipoTelefone = ref([]);
    let optionsTipoContato = ref([]);
    let optionsidentificador = ref([]);
    let optionstipocr = ref([]);
    let optionsGenero = ref([]);
    let optionsTipoPessoa = ref([]);
    let optionsEspecialidade = ref([]);

    let placeholderNome;
    let placeholderTipoPessoa;
    let placeholderCpfCnpj;
    let placeholderTipoCr;
    let placeholderSiglaUfcr;
    let placeholderNrcr;
    let placeholderNomeSecretaria;
    let placeholderGenero;
    let placeholderNomerotulo;
    let placeholderProcimidade1;
    let placeholderProcimidade2;
    let placeholderNumeroRegistroMapa;
    let placeholderVisitador;
    let placeholderObsVenda;
    let placeholderDescricao;
    let placeholderCep;
    let placeholderRua;
    let placeholderNumero;
    let placeholderComplemento;
    let placeholderPais;
    let placeholderEstado;
    let placeholderCidade;
    let placeholderBairro;
    let placeholderDDD;
    let placeholderDDI;
    let placeholderTipoTelefone;
    let placeholderTipoContato;

    let itemsEndereco = ref([]);
    let itemsContato = ref([]);
    let itemsTelefone = ref([]);
    let itemsDadosBancarios = ref([]);

    let hColumnsEndereco = ref([
      {
        key: "descricao",
        label: "descricao",
      },
      {
        key: "rua",
        label: "rua",
      },
    ]);
    let hColumnsTelefone = ref([
      {
        key: "descricao",
        label: "descricao",
      },
      {
        key: "numero",
        label: "numero",
      },
    ]);
    let hColumnsContato = ref([
      {
        key: "descContato",
        label: "descricao",
      },
      {
        key: "nome",
        label: "nome",
      },
    ]);

    let viewModel = ref({
      id: ref(getId()),
      nome: ref(""),

      tipocr: ref(),
      cpfCnpj: ref(),
      tipoPessoa: ref(),
      siglaUFCR: ref(""),
      nrCR: ref(""),
      nmSecretaria: ref(""),
      genero: ref(),
      nomeRotulo: ref(""),
      dtAniversario: ref(""),
      proximidade: ref(""),
      proximidade2: ref(""),
      numRegMapa: ref(""),
      cedh: ref(false),
      sincronizouAlcance: ref(false),
      observacaoVenda: ref(""),
      snAtivo: ref(true),
      prescritorEspecialidade: ref([]),
      flInforPessoa: ref("001000"),
      visitadorId: ref(),

      enderecos: ref([]),
      telefones: ref([]),
      contatos: ref([]),
    });

    let viewModelEndereco = ref({
      id: ref(),
      rua: ref(""),
      numero: ref(""),
      complemento: ref(""),
      cep: ref(""),
      snAtivo: ref(true),
      bairro: ref(""),
      bairo: ref(""),
      cidadeId: ref(),
      cidade: ref(""),
      estadoId: ref(),
      Estado: ref(""),
      paisId: ref(),
      pais: ref(""),
      descricao: ref(""),
      flInforPessoa: ref("100000"),
    });
    let viewModelTelefone = ref({
      id: ref(),
      telefoneId: ref(getId()),
      descricao: ref(""),
      ddd: ref(""),
      ddi: ref(""),
      numero: ref(""),
      ehWhatsApp: ref(false),
      snAtivo: ref(true),
      tipo: ref(),
      flInforPessoa: ref("100000"),
    });
    let viewModelContato = ref({
      id: ref(),
      nome: ref(""),
      tipo: ref(""),
      descContato: ref(""),
      snAtivo: ref(true),
      flInforPessoa: ref("100000"),
    });

    onMounted(async () => {
      const obterSeletor = async url => {
        var retornoBack = await servicoSeletor.obterSeletorGenerico(url);
        var returnMetodo = [];
        retornoBack.forEach(e => {
          returnMetodo.push({ value: e.id, label: e.descricao });
        });
        return returnMetodo;
      };
      const PreencherSeletores = async () => {
        optionsTipoPessoa.value = enumSelect.PessoaTipo;
        optionsPais.value = await obterSeletor("pais/obter-seletor-paises");
        optionsBairro.value = await obterSeletor("bairro/obter-seletor-bairro");
        optionsBanco.value = await obterSeletor("banco/obter-seletor-banco");
        optionsPlanoConta.value = await obterSeletor(
          "planoConta/obter-select-plano-conta"
        );
        optionsEspecialidade.value = await obterSeletor(
          "especialidade/obter-seletor-ObterSeletorEspecialidade"
        );
        optionsTipoContato.value = servicoEnum.pessoaFornecedorTipoContato;
        optionsTipoTelefone.value = servicoEnum.pessoaFornecedorTipoTelefone;
        optionsidentificador.value = servicoEnum.pessoaConveioindentificador;
        optionstipocr.value = servicoEnum.pessoaPrescritorTipoCr;
        optionsGenero.value = servicoEnum.pessoaPrescritorGenero;
        optionsTipoPessoa.value = servicoEnum.PessoaTipo;
      };
      PreencherSeletores();
    });

    //tem que buscar o cep e filtrar nos seletores se for encontrado a cidade estado bairro

    const preencherSeletorEstado = async () => {
      var paisId = viewModelEndereco.value.paisId;
      var retornoBackSeletor = [];
      console.log("paisId", paisId);
      if (paisId == "" || paisId == undefined) {
        retornoBackSeletor = await servicoSeletor.obterSeletorGenerico(
          "estado/obter-seletor-estados"
        );
      } else {
        retornoBackSeletor = await servicoSeletor.obterSeletorById(
          `estado/obter-seletor-estados-por-pais?paisid=`,
          paisId
        );
        console.log("retornoBackSeletor", retornoBackSeletor);
      }
      console.log(retornoBackSeletor);
      var returnMetodoPais = [];
      retornoBackSeletor.forEach(front => {
        returnMetodoPais.push({ value: front.id, label: front.descricao });
      });
      optionsEstado.value = returnMetodoPais;
    };
    const preencherSeletorCidade = async () => {
      var estadoId = viewModelEndereco.value.estadoId;
      var retornoBackSeletor = [];
      console.log("estadoId", estadoId);
      if (estadoId == "" || estadoId == undefined) {
        retornoBackSeletor = await servicoSeletor.obterSeletorGenerico(
          "cidade/obter-seletor-cidades"
        );
      } else {
        retornoBackSeletor = await servicoSeletor.obterSeletorById(
          `cidade/obter-seletor-cidades-por-estado/`,
          estadoId
        );
        console.log("retornoBackSeletor", retornoBackSeletor);
      }
      console.log(retornoBackSeletor);
      var returnMetodo = [];
      retornoBackSeletor.forEach(front => {
        returnMetodo.push({ value: front.id, label: front.descricao });
      });
      optionsCidade.value = returnMetodo;
    };
    const preencherSeletorBairro = async () => {
      var cidadeId = viewModelEndereco.value.cidadeId;
      var retornoBackSeletor = [];
      console.log("estadoId", cidadeId);
      if (cidadeId == "" || cidadeId == undefined) {
        retornoBackSeletor = await servicoSeletor.obterSeletorGenerico(
          "bairro/obter-seletor-bairro"
        );
      } else {
        retornoBackSeletor = await servicoSeletor.obterSeletorById(
          "bairro/obter-seletor-bairro?idCidade=",
          cidadeId
        );
        console.log("retornoBackSeletor", retornoBackSeletor);
      }
      console.log(retornoBackSeletor);
      var returnMetodo = [];
      retornoBackSeletor.forEach(front => {
        returnMetodo.push({ value: front.id, label: front.descricao });
      });
      optionsBairro.value = returnMetodo;
    };
    const buscaCep = () => {
      const options = {
        method: "GET",
        mode: "cors",
        caches: "default",
      };
      let search = viewModelEndereco.value.cep;
      let teste = search.replace("-", "");
      let teste2 = teste.replace(".", "");
      console.log("teste", teste2);

      fetch(`https://viacep.com.br/ws/${search}/json/`, options).then(
        response => {
          response.json().then(data => {
            viewModelEndereco.value.rua = data.logradouro;
            console.log(data);
          });
        }
      );
    };
    const replaceCpfCnpj = () => {
      let replaceCpfCnpj = viewModel.value.cpfCnpj.replaceAll(/(\.|\/|-)/g, "");
      let tipoPesoa = viewModel.value.tipoPessoa;
      let lengBrEs = lang();

      let nan = parseInt(replaceCpfCnpj);
      if (isNaN(nan)) {
        Swal.fire({
          icon: "warning",
          title: `${lengBrEs.erro}`,
          text: `${lengBrEs.oCampoCpfCnpjNletras}`,
        });
      } else {
        if (tipoPesoa == 0) {
          if (replaceCpfCnpj.length == 11) {
            replaceCpfCnpj = mascaraCpf(replaceCpfCnpj);
          } else {
            Swal.fire({
              icon: "warning",
              title: `${lengBrEs.erro}`,
              text: `${lengBrEs.cpf}  ${lengBrEs.deveTer} 11 ${lengBrEs.caracteres}`,
            });
          }
        } else {
          if (replaceCpfCnpj.length == 14) {
            replaceCpfCnpj = mascaraCnpj(replaceCpfCnpj);
          } else {
            Swal.fire({
              icon: "warning",
              title: `${lengBrEs.erro}`,
              text: `${lengBrEs.cnpf}  ${lengBrEs.deveTer} 14 ${lengBrEs.caracteres}`,
            });
          }
        }
      }
      function mascaraCpf(valor) {
        return valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4");
      }
      function mascaraCnpj(valor) {
        return valor.replace(
          /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,
          "$1.$2.$3/$4-$5"
        );
      }
      viewModel.value.cpfCnpj = replaceCpfCnpj;
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
    const atualizartraducaoParametros = () => {
      let languagePageNow = langParametos();
      placeholderNome = ` ${languagePageNow.digite} ${languagePageNow.o} ${languagePageNow.nome}`;
      placeholderTipoPessoa = ` ${languagePageNow.digite} ${languagePageNow.o} ${languagePageNow.tipoPessoa}`;
      placeholderCpfCnpj = ` ${languagePageNow.digite} ${languagePageNow.o} ${languagePageNow.cpfCnpj}`;
      placeholderTipoCr = ` ${languagePageNow.digite} ${languagePageNow.a} ${languagePageNow.tipoCr}`;
      placeholderSiglaUfcr = ` ${languagePageNow.digite} ${languagePageNow.a} ${languagePageNow.siglaUFCR}`;
      placeholderNrcr = ` ${languagePageNow.digite} ${languagePageNow.a} ${languagePageNow.nrcr}`;
      placeholderNomeSecretaria = ` ${languagePageNow.digite} ${languagePageNow.o} ${languagePageNow.nome} ${languagePageNow.secretaria}`;
      placeholderGenero = ` ${languagePageNow.selecione} ${languagePageNow.o} ${languagePageNow.genero}`;
      placeholderNomerotulo = ` ${languagePageNow.digite} ${languagePageNow.o} ${languagePageNow.numero} ${languagePageNow.do} ${languagePageNow.rotulo}`;
      placeholderProcimidade1 = ` ${languagePageNow.digite} ${languagePageNow.a} ${languagePageNow.proxicimidade} 1`;
      placeholderProcimidade2 = ` ${languagePageNow.digite} ${languagePageNow.a} ${languagePageNow.proxicimidade} 2`;
      placeholderNumeroRegistroMapa = ` ${languagePageNow.digite} ${languagePageNow.o} ${languagePageNow.numero} ${languagePageNow.do} ${languagePageNow.registro} ${languagePageNow.mapa} `;
      placeholderVisitador = ` ${languagePageNow.selecione} ${languagePageNow.o} ${languagePageNow.visitador}`;
      placeholderObsVenda = ` ${languagePageNow.digite} ${languagePageNow.a} ${languagePageNow.observacao} ${languagePageNow.da} ${languagePageNow.venda}`;
      placeholderDescricao = ` ${languagePageNow.digite} ${languagePageNow.a} ${languagePageNow.descricao}`;
      placeholderCep = ` ${languagePageNow.digite} ${languagePageNow.o} ${languagePageNow.cep}`;
      placeholderRua = ` ${languagePageNow.digite} ${languagePageNow.a} ${languagePageNow.rua} `;
      placeholderNumero = ` ${languagePageNow.digite} ${languagePageNow.a} ${languagePageNow.numero} `;
      placeholderComplemento = ` ${languagePageNow.digite} ${languagePageNow.a} ${languagePageNow.complemeto} `;
      placeholderEstado = ` ${languagePageNow.digite} ${languagePageNow.a} ${languagePageNow.estado} `;
      placeholderCidade = ` ${languagePageNow.digite} ${languagePageNow.a} ${languagePageNow.cidade} `;
      placeholderBairro = ` ${languagePageNow.digite} ${languagePageNow.o} ${languagePageNow.bairro} `;
      placeholderDDD = ` ${languagePageNow.digite} ${languagePageNow.o} ${languagePageNow.ddd}`;
      placeholderDDI = ` ${languagePageNow.digite} ${languagePageNow.o} ${languagePageNow.ddi}`;
      placeholderTipoTelefone = ` ${languagePageNow.selecione} ${languagePageNow.o} ${languagePageNow.tipo} `;
      placeholderTipoContato = ` ${languagePageNow.selecione} ${languagePageNow.o} ${languagePageNow.tipoContato} `;
    };
    atualizartraducaoParametros();
    const validarForm = e => {
      e.preventDefault();
      replaceCpfCnpj();
      console.log("novo/edt", viewModel.value);
      let lengBrEs = lang();
      let itemEdt = viewModel.value.nome;
      if (
        viewModel.value.id !== store.state.emptyGuid &&
        viewModel.value.id !== undefined
      ) {
        servico.edit(viewModel.value).then(response => {
          if (response.status == 200) {
            Swal.fire({
              icon: "success",
              title: `${lengBrEs.concluido}`,
              text: `${lengBrEs.oItem} "${itemEdt}" ${lengBrEs.foiEditado}.`,
            });
          } else {
            Swal.fire({
              icon: "warning",
              title: `${lengBrEs.erro}`,
              text: `${lengBrEs.oItem} "${itemEdt}"  ${lengBrEs.naoFoiEditado}.`,
            });
          }
        });
      } else {
        servico.add(viewModel.value).then(response => {
          console.log(response);
          if (response.status == 200) {
            console.log("200");
            Swal.fire({
              icon: "success",
              title: `${lengBrEs.concluido}`,
              text: `${lengBrEs.oItem} "${itemEdt}" ${lengBrEs.foiAdicionado}.`,
            });

            viewModel.value.id = ref(getId());
            viewModel.value.nome = ref("");
            viewModel.value.tipoPessoa = ref("");
            viewModel.value.CpfCnpj = ref();
            viewModel.value.tpFornecedor = ref(true);
            viewModel.value.tpFuncionario = ref(false);
            viewModel.value.tpVisitador = ref(false);
            viewModel.value.tpPrescritor = ref(false);
            viewModel.value.snAtivo = ref(true);
            viewModel.value.enderecos = ref([]);
            viewModel.value.telefones = ref([]);
            viewModel.value.contatos = ref([]);
            viewModel.value.dadosBancarios = ref([]);
          } else {
            Swal.fire({
              icon: "warning",
              title: `${lengBrEs.erro}`,
              text: `${lengBrEs.oItem} ${itemEdt} ${lengBrEs.naoFoiAdicionado}.`,
            });
          }
        });
      }
    };
    const validaCadastroEndereco = () => {
      //valida os itens obrigatorios do cadastro
      if (
        viewModelEndereco.value.rua &&
        viewModelEndereco.value.numero &&
        viewModelEndereco.value.complemento &&
        viewModelEndereco.value.cep &&
        viewModelEndereco.value.descricao
      ) {
        salvaEndereco();
      } else {
        let lengBrEs = lang();
        Swal.fire({
          icon: "warning",
          title: `${lengBrEs.atencao}`,
          text: `${lengBrEs.PreenchaOCampo}`,
        });
      }
    };
    const validaCadastroTelefone = () => {
      //valida os itens obrigatorios do cadastro
      let ddi = parseInt(viewModelTelefone.value.ddi);
      let ddd = parseInt(viewModelTelefone.value.ddd);
      let numero = parseInt(viewModelTelefone.value.numero);
      if (
        viewModelTelefone.value.descricao &&
        viewModelTelefone.value.ddd &&
        viewModelTelefone.value.ddi &&
        viewModelTelefone.value.numero
      ) {
        let lengBrEs = lang();
        if (viewModelTelefone.value.descricao.length > 50) {
          Swal.fire({
            icon: "warning",
            title: `${lengBrEs.atencao}`,
            text: `${lengBrEs.atencao} ${lengBrEs.atencao} ${lengBrEs.naoPodeTerMaisDe} 50 ${lengBrEs.caracteres}`,
          });
        } else if (viewModelTelefone.value.ddi.length > 5) {
          Swal.fire({
            icon: "warning",
            title: `${lengBrEs.atencao}`,
            text: `${lengBrEs.atencao} ${lengBrEs.ddi} ${lengBrEs.naoPodeTerMaisDe} 5 ${lengBrEs.caracteres}`,
          });
        } else if (viewModelTelefone.value.ddd.length > 5) {
          Swal.fire({
            icon: "warning",
            title: `${lengBrEs.atencao}`,
            text: `${lengBrEs.atencao} ${lengBrEs.ddd} ${lengBrEs.naoPodeTerMaisDe} 5 ${lengBrEs.caracteres}`,
          });
        } else if (viewModelTelefone.value.numero.length > 10) {
          Swal.fire({
            icon: "warning",
            title: `${lengBrEs.atencao}`,
            text: `${lengBrEs.atencao} ${lengBrEs.numero} ${lengBrEs.naoPodeTerMaisDe} 10 ${lengBrEs.caracteres}`,
          });
        } else if (isNaN(ddd)) {
          Swal.fire({
            icon: "warning",
            title: `${lengBrEs.atencao}`,
            text: `${lengBrEs.atencao} ${lengBrEs.ddd} ${lengBrEs.naoPodeTerLetras}`,
          });
        } else if (isNaN(ddi)) {
          Swal.fire({
            icon: "warning",
            title: `${lengBrEs.atencao}`,
            text: `${lengBrEs.atencao} ${lengBrEs.ddi} ${lengBrEs.naoPodeTerLetras}`,
          });
        } else if (isNaN(numero)) {
          Swal.fire({
            icon: "warning",
            title: `${lengBrEs.atencao}`,
            text: `${lengBrEs.atencao} ${lengBrEs.numero} ${lengBrEs.naoPodeTerLetras}`,
          });
        } else {
          salvaTelefone();
        }
      } else {
        let lengBrEs = lang();
        Swal.fire({
          icon: "warning",
          title: `${lengBrEs.atencao}`,
          text: `${lengBrEs.PreenchaOCampo}`,
        });
      }
    };
    const validaCadastroContato = () => {
      //valida os itens obrigatorios do cadastro
      if (viewModelContato.value.nome && viewModelContato.value.descContato) {
        salvaContato();
      } else {
        let lengBrEs = lang();
        Swal.fire({
          icon: "warning",
          title: `${lengBrEs.atencao}`,
          text: `${lengBrEs.PreenchaOCampo}`,
        });
      }
    };

    const salvaEndereco = () => {
      let viewModelValue = viewModel.value.enderecos;
      let viewModelItens = viewModelEndereco.value;
      let itemsEdicao = itemsEndereco.value;
      let viewModelItemEdicaoJson = JSON.parse(
        JSON.stringify(viewModelEndereco.value)
      );
      if (viewModelItens.id == undefined || viewModelItens.id == "") {
        viewModelItens.id = uuidv4();
        viewModelItemEdicaoJson.persistido = false;
        viewModelValue.push(viewModelItemEdicaoJson);
        var itensGrid;
        itensGrid = ref({
          id: viewModelItens.id,
          descricao: viewModelItens.descricao,
          cep: viewModelItens.cep,
          rua: viewModelItens.rua,
          numero: viewModelItens.numero,
          complemento: viewModelItens.complemento,
          snAtivo: viewModelItens.snAtivo,
          bairro: viewModelItens.bairro,
          cidadeId: viewModelItens.cidadeId,
          cidade: viewModelItens.cidade,
          estadoId: viewModelItens.estadoId,
          Estado: viewModelItens.Estado,
          paisId: viewModelItens.paisId,
          pais: viewModelItens.pais,
        });
        itemsEndereco.value.push(itensGrid.value);
        limparCamposEndereco();
      } else {
        //editar
        var intemParaEditar = "vazil";
        const filtrando = value => {
          if (value.id == viewModelItens.id) {
            intemParaEditar = value;
          }
        };
        itemsEdicao.filter(filtrando);
        let registroEdicaoRetornoFiltro = intemParaEditar;
        registroEdicaoRetornoFiltro.id = viewModelItemEdicaoJson.id;
        registroEdicaoRetornoFiltro.descricao =
          viewModelItemEdicaoJson.descricao;
        registroEdicaoRetornoFiltro.cep = viewModelItemEdicaoJson.cep;
        registroEdicaoRetornoFiltro.rua = viewModelItemEdicaoJson.rua;
        registroEdicaoRetornoFiltro.numero = viewModelItemEdicaoJson.numero;
        registroEdicaoRetornoFiltro.complemento =
          viewModelItemEdicaoJson.complemento;
        registroEdicaoRetornoFiltro.snAtivo = viewModelItemEdicaoJson.snAtivo;
        registroEdicaoRetornoFiltro.bairro = viewModelItemEdicaoJson.bairro;
        registroEdicaoRetornoFiltro.cidadeId = viewModelItemEdicaoJson.cidadeId;
        registroEdicaoRetornoFiltro.cidade = viewModelItemEdicaoJson.cidade;
        registroEdicaoRetornoFiltro.estadoId = viewModelItemEdicaoJson.estadoId;
        registroEdicaoRetornoFiltro.Estado = viewModelItemEdicaoJson.Estado;
        registroEdicaoRetornoFiltro.paisId = viewModelItemEdicaoJson.paisId;
        registroEdicaoRetornoFiltro.pais = viewModelItemEdicaoJson.pais;
      }
    };
    const salvaTelefone = () => {
      var viewModelValue = viewModel.value.telefones;
      var viewModelItens = viewModelTelefone.value;
      var itemsEdicao = itemsTelefone.value;
      var viewModelItemEdicaoJson = JSON.parse(
        JSON.stringify(viewModelTelefone.value)
      );
      if (viewModelItens.id == undefined || viewModelItens.id == "") {
        viewModelItens.id = uuidv4();
        viewModelItemEdicaoJson.persistido = false;
        viewModelValue.push(viewModelItemEdicaoJson);
        var itensGrid = ref({
          id: viewModelItens.id,
          descricao: viewModelItens.descricao,
          numero: viewModelItens.numero,
          ddd: viewModelItens.ddd,
          ddi: viewModelItens.ddi,
          ehWhatsApp: viewModelItens.ehWhatsApp,
          snAtivo: viewModelItens.snAtivo,
          tipo: viewModelItens.tipo,
        });
        itemsTelefone.value.push(itensGrid.value);
        limparCamposTelefone();
      } else {
        //editar
        var intemParaEditar = "vazil";
        const filtrando = value => {
          if (value.id == viewModelItens.id) {
            intemParaEditar = value;
          }
        };
        itemsEdicao.filter(filtrando);
        let registroEdicaoRetornoFiltro = intemParaEditar;

        registroEdicaoRetornoFiltro.id = viewModelItemEdicaoJson.id;
        registroEdicaoRetornoFiltro.ddd = viewModelItemEdicaoJson.ddd;
        registroEdicaoRetornoFiltro.ddi = viewModelItemEdicaoJson.ddi;
        registroEdicaoRetornoFiltro.descricao =
          viewModelItemEdicaoJson.descricao;
        registroEdicaoRetornoFiltro.ehWhatsApp =
          viewModelItemEdicaoJson.ehWhatsApp;
        registroEdicaoRetornoFiltro.numero = viewModelItemEdicaoJson.numero;
        registroEdicaoRetornoFiltro.snAtivo = viewModelItemEdicaoJson.snAtivo;
        registroEdicaoRetornoFiltro.tipo = viewModelItemEdicaoJson.tipo;
        registroEdicaoRetornoFiltro.ddd = viewModelItemEdicaoJson.ddd;
        limparCamposTelefone();
      }
    };
    const salvaContato = () => {
      var viewModelValue = viewModel.value.contatos;
      var viewModelItens = viewModelContato.value;
      var itemsEdicao = itemsContato.value;
      var viewModelItemEdicaoJson = JSON.parse(
        JSON.stringify(viewModelContato.value)
      );
      if (viewModelItens.id == undefined || viewModelItens.id == "") {
        viewModelItens.id = uuidv4();
        viewModelItemEdicaoJson.persistido = false;
        viewModelValue.push(viewModelItemEdicaoJson);
        var itensGrid = ref({
          id: viewModelItens.id,
          nome: viewModelItens.nome,
          tipo: viewModelItens.tipo,
          descContato: viewModelItens.descContato,
          snAtivo: viewModelItens.snAtivo,
        });
        itemsContato.value.push(itensGrid.value);
        limpaCamposContato();
      } else {
        //editar
        var intemParaEditar = "vazil";
        const filtrando = value => {
          if (value.id == viewModelItens.id) {
            intemParaEditar = value;
          }
        };
        itemsEdicao.filter(filtrando);
        let registroEdicaoRetornoFiltro = intemParaEditar;
        registroEdicaoRetornoFiltro.id = viewModelItemEdicaoJson.id;
        registroEdicaoRetornoFiltro.nome = viewModelItemEdicaoJson.nome;
        registroEdicaoRetornoFiltro.tipo = viewModelItemEdicaoJson.tipo;
        registroEdicaoRetornoFiltro.descContato =
          viewModelItemEdicaoJson.descContato;
        registroEdicaoRetornoFiltro.snAtivo = viewModelItemEdicaoJson.snAtivo;
      }
    };

    const limparCamposTelefone = () => {
      viewModelTelefone.value.id = ref();
      viewModelTelefone.value.descricao = ref("");
      viewModelTelefone.value.ddd = ref("");
      viewModelTelefone.value.ddi = ref("");
      viewModelTelefone.value.numero = ref("");
      viewModelTelefone.value.ehWhatsApp = ref(false);
      viewModelTelefone.value.snAtivo = ref(true);
      viewModelTelefone.value.tipo = ref();
    };
    const limpaCamposContato = () => {
      viewModelContato.value.id = ref();
      viewModelContato.value.nome = ref("");
      viewModelContato.value.tipo = ref("");
      viewModelContato.value.descContato = ref("");
      viewModelContato.value.snAtivo = ref(true);
      viewModelContato.value.flInforPessoa = ref();
    };
    const limparCamposEndereco = () => {
      viewModelEndereco.value.id = ref();
      viewModelEndereco.value.rua = ref("");
      viewModelEndereco.value.numero = ref("");
      viewModelEndereco.value.complemento = ref("");
      viewModelEndereco.value.cep = ref("");
      viewModelEndereco.value.snAtivo = ref(true);
      viewModelEndereco.value.bairro = ref("");
      viewModelEndereco.value.cidadeId = ref();
      viewModelEndereco.value.cidade = ref("");
      viewModelEndereco.value.estadoId = ref();
      viewModelEndereco.value.Estado = ref("");
      viewModelEndereco.value.paisId = ref();
      viewModelEndereco.value.pais = ref("");
      viewModelEndereco.value.flInforPessoa = ref("");
      viewModelEndereco.value.descricao = ref("");
    };

    const onDeleteEndereco = item => {
      try {
        var indexGrid = itemsEndereco.value.indexOf(item);
        itemsEndereco.value.splice(indexGrid, 1);
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Erro",
          text: "Erro ao processar requisição!",
        });
      }
    };
    const onDeleteTelefone = item => {
      try {
        var indexGrid = itemsTelefone.value.indexOf(item);
        itemsTelefone.value.splice(indexGrid, 1);
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Erro",
          text: "Erro ao processar requisição!",
        });
      }
    };
    const onDeleteContato = item => {
      try {
        var indexGrid = itemsContato.value.indexOf(item);
        itemsContato.value.splice(indexGrid, 1);
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Erro",
          text: "Erro ao processar requisição!",
        });
      }
    };

    const onEditEndereco = e => {
      if (!e || !e.target || !e.target.dataset) {
        console.log("Objeto Errado");
        return;
      }
      if (e.target.dataset.edit == 0) {
        Swal.fire({
          icon: "question",
          title: "Confirmar exclusão!",
          text: "Você confirma exclusão deste registro?",
          showCancelButton: true,
        }).then(response => {
          if (response.isConfirmed) {
            onDeleteEndereco(e.item);
          }
        });
      } else {
        var endereco = itemsEndereco.value;
        let id = e.item.id;
        const filtro = index => {
          if (id == index.id) {
            let viewmodelItem = viewModelEndereco.value;
            viewmodelItem.id = index.id;
            viewmodelItem.descricao = index.descricao;
            viewmodelItem.cep = index.cep;
            viewmodelItem.rua = index.rua;
            viewmodelItem.numero = index.numero;
            viewmodelItem.complemento = index.complemento;
            viewmodelItem.snAtivo = index.snAtivo;
            viewmodelItem.bairro = index.bairro;
            viewmodelItem.cidadeId = index.cidadeId;
            viewmodelItem.cidade = index.cidade;
            viewmodelItem.estadoId = index.estadoId;
            viewmodelItem.Estado = index.Estado;
            viewmodelItem.paisId = index.paisId;
            viewmodelItem.pais = index.pais;
          }
        };
        endereco.forEach(filtro);
      }
    };
    const onEditTelefone = e => {
      if (!e || !e.target || !e.target.dataset) {
        console.log("Objeto Errado");
        return;
      }
      if (e.target.dataset.edit == 0) {
        Swal.fire({
          icon: "question",
          title: "Confirmar exclusão!",
          text: "Você confirma exclusão deste registro?",
          showCancelButton: true,
        }).then(response => {
          if (response.isConfirmed) {
            onDeleteTelefone(e.item);
          }
        });
      } else {
        var telefone = itemsTelefone.value;
        let id = e.item.id;
        var editTell;
        const filtro = index => {
          if (id == index.id) {
            editTell = index;
          }
        };
        telefone.forEach(filtro);
        viewModelTelefone.value.id = editTell.id;
        viewModelTelefone.value.descricao = editTell.descricao;
        viewModelTelefone.value.ddd = editTell.ddd;
        viewModelTelefone.value.ddi = editTell.ddi;
        viewModelTelefone.value.numero = editTell.numero;
        viewModelTelefone.value.ehWhatsApp = editTell.ehWhatsApp;
        viewModelTelefone.value.snAtivo = editTell.snAtivo;

        if (editTell.tipo != undefined || editTell.tipo != null) {
          viewModelTelefone.value.tipo = parseInt(editTell.tipo);
        }
      }
    };
    const onEditContato = e => {
      if (!e || !e.target || !e.target.dataset) {
        console.log("Objeto Errado");
        return;
      }
      if (e.target.dataset.edit == 0) {
        Swal.fire({
          icon: "question",
          title: "Confirmar exclusão!",
          text: "Você confirma exclusão deste registro?",
          showCancelButton: true,
        }).then(response => {
          if (response.isConfirmed) {
            onDeleteContato(e.item);
          }
        });
      } else {
        let contato = itemsContato.value;
        let id = e.item.id;
        let filtrado;
        const filtar = index => {
          if (index.id == id) {
            filtrado = index;
          }
        };
        contato.forEach(filtar);
        viewModelContato.value.id = filtrado.id;
        viewModelContato.value.nome = filtrado.nome;
        viewModelContato.value.descContato = filtrado.descContato;
        viewModelContato.value.snAtivo = filtrado.snAtivo;
      }
    };

    const ObterPessoa = async id => {
      var retorno = await servico.getId(id);
      console.log("retorno", retorno);
      viewModel.value.id = retorno.id;
      viewModel.value.nome = retorno.nome;
      viewModel.value.tipoPessoa = !retorno.tipoPessoa
        ? ref()
        : parseInt(retorno.tipoPessoa);
      viewModel.value.cpfCnpj = retorno.cpfCnpj;
      viewModel.value.snAtivo = retorno.snAtivo;
      viewModel.value.snAtitipocrvo = retorno.tipocr;
      viewModel.value.siglaUFCR = retorno.siglaUFCR;
      viewModel.value.nmSecretaria = retorno.nmSecretaria;
      viewModel.value.genero = parseInt(retorno.genero);
      viewModel.value.nomeRotulo = retorno.nomeRotulo;
      viewModel.value.dtAniversario = ""; //retorno.dtAniversario;
      viewModel.value.proximidade = retorno.proximidade;
      viewModel.value.proximidade2 = retorno.proximidade;
      viewModel.value.numRegMapa = retorno.numRegMapa;
      viewModel.value.cedh = retorno.cedh;
      viewModel.value.sincronizouAlcance = retorno.sincronizouAlcance;
      viewModel.value.observacaoVenda = retorno.observacaoVenda;
      viewModel.value.snAtivo = retorno.snAtivo;
      viewModel.value.prescritorEspecialidade = retorno.prescritorEspecialidade;
      viewModel.value.flInforPessoa = retorno.flInforPessoa;
      viewModel.value.visitadorId = retorno.visitadorId;
      viewModel.value.snAtienderecosvo = retorno.enderecos;
      viewModel.value.telefones = retorno.telefones;
      viewModel.value.contatos = retorno.contatos;

      if (retorno.enderecos == null) {
        retorno.enderecos = [];
      }
      if (retorno.telefones == null) {
        retorno.telefones = [];
      }
      if (retorno.contatos == null) {
        retorno.contatos = [];
      }
      if (retorno.dadosBancarios == null) {
        retorno.dadosBancarios = [];
      }

      if (retorno.enderecos.length) {
        itemsEndereco.value = retorno.enderecos;
        viewModel.value.enderecos.push(retorno.enderecos);
      }
      if (retorno.telefones.length) {
        itemsTelefone.value = retorno.telefones;
        viewModel.value.telefones.push(retorno.telefones);
      }
      if (retorno.contatos.length) {
        itemsContato.value = retorno.contatos;
        viewModel.value.contatos.push(retorno.contatos);
      }
      if (retorno.dadosBancarios.length) {
        itemsDadosBancarios.value = retorno.dadosBancarios;
        viewModel.value.dadosBancarios.push(retorno.dadosBancarios);
      }
    };

    try {
      console.log("id:", prescritorId);
      if (
        prescritorId !== undefined &&
        viewModel.value.id !== store.state.emptyGuid
      ) {
        ObterPessoa(prescritorId);
      }
    } catch (err) {
      console.error("Erro ao obter grupo de usuário para edição", err);
    }

    return {
      viewModel,
      optionsTipoPessoa,
      validarForm,
      exibeCampos,
      viewModelTelefone,
      itemsEndereco,
      itemsContato,
      itemsDadosBancarios,
      limparCamposTelefone,
      itemsTelefone,
      onDeleteTelefone,
      onEditTelefone,
      viewModelEndereco,
      hColumnsTelefone,
      hColumnsEndereco,
      hColumnsContato,
      optionsBairro,
      optionsCidade,
      optionsBanco,
      optionsTipoContato,
      optionsPlanoConta,
      preencherSeletorBairro,
      optionsPais,
      optionsEstado,
      limparCamposEndereco,
      preencherSeletorEstado,
      preencherSeletorCidade,
      viewModelContato,
      onDeleteEndereco,
      onEditEndereco,
      onDeleteContato,
      onEditContato,
      limpaCamposContato,
      optionsTipoTelefone,
      buscaCep,
      optionsidentificador,
      optionstipocr,
      optionsGenero,
      validaCadastroEndereco,
      validaCadastroTelefone,
      validaCadastroContato,
      replaceCpfCnpj,
      mostrarBtnSalvar,
      placeholderNome,
      placeholderTipoPessoa,
      placeholderCpfCnpj,
      placeholderTipoCr,
      placeholderSiglaUfcr,
      placeholderNomeSecretaria,
      placeholderGenero,
      placeholderNomerotulo,
      placeholderProcimidade1,
      placeholderProcimidade2,
      placeholderNumeroRegistroMapa,
      placeholderVisitador,
      placeholderObsVenda,
      placeholderNrcr,
      placeholderDescricao,
      placeholderCep,
      placeholderRua,
      placeholderNumero,
      placeholderComplemento,
      placeholderPais,
      placeholderEstado,
      placeholderCidade,
      placeholderBairro,
      placeholderDDD,
      placeholderDDI,
      placeholderTipoTelefone,
      placeholderTipoContato,
      optionsEspecialidade,
    };
  },
};
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
<style>
.buttonsActions {
  position: fixed;
  bottom: 10px;
}
</style>