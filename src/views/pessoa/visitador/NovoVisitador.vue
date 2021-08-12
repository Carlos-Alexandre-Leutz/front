<template>
  <div>
    <form @submit="validarForm">
      <div class="row">
        <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div class="card shadow">
            <header class="card-header">
              <strong class="align-self-center">{{
                $i18n.translate("visitador")
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
                <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("nome") }}</label>
                    <input
                      class="form-control"
                      type="text"
                      :placeholder="placeholderNome"
                      required
                      v-model="viewModel.nome"
                      maxlength="255"
                      :readonly="inputReadonly"
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("tipoPessoa") }} </label>
                    <Multiselect
                      v-model="viewModel.tipoPessoa"
                      :placeholder="placeholderTipoPessoa"
                      :options="optionsTipoPessoa"
                      :disabled="inputReadonly"
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
                      maxlength="20"
                      @change="replaceCpfCnpj()"
                      :readonly="inputReadonly"
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("comissaoVendedor") }}</label>
                    <input
                      class="form-control"
                      type="number"
                      :placeholder="placeholderComicaoVendedor"
                      v-model="viewModel.comissaoVendedor"
                      required
                      step="any"
                      :readonly="inputReadonly"
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>{{ $i18n.translate("SincronizouAlcance") }}</label
                    ><br />
                    <input
                      type="checkbox"
                      v-model="viewModel.sincronizouAlcance"
                      :disabled="inputReadonly"
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>{{ $i18n.translate("ativo") }}</label
                    ><br />
                    <input type="checkbox" v-model="viewModel.snAtivo" :disabled="inputReadonly" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
     <!-- endereço -->
      <div class="card shadow mt-2">
        <header class="card-header">
          <strong class="align-self-center">
            {{ $i18n.translate("endereco") }}
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
                          v-if="inputReadonly"
                          data-edit="1"
                          class="btn btn-sm btn-warning mr-2"
                          type="button"
                        >
                          {{ $i18n.translate("visualizar") }}
                        </button>
                        <button
                          v-if="mostrarBtnSalvar"
                          data-edit="1"
                          class="btn btn-sm btn-warning mr-2"
                          type="button"
                        >
                          {{ $i18n.translate("editar") }}
                        </button>
                        <button
                          v-if="mostrarBtnSalvar"
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
                      type="text"
                      :placeholder="placeholderDescricao"
                      maxlength="255"
                      :readonly="inputReadonly"
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
                      :readonly="inputReadonly"
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
                      maxlength="50"
                      :readonly="inputReadonly"
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
                      maxlength="10"
                      :readonly="inputReadonly"
                    />
                  </div>
                </div>
                <div class="col-sm-12 col-md-8 col-lg-8 col-xl-8">
                  <div class="form-group">
                    <label>{{ $i18n.translate("complemento") }}</label>
                    <input
                      v-model="viewModelEndereco.complemento"
                      class="form-control"
                      type="nome"
                      :placeholder="placeholderComplemento"
                      maxlength="255"
                      :readonly="inputReadonly"
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
                      :disabled="inputReadonly"
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
                      :disabled="inputReadonly"
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
                      :disabled="inputReadonly"
                    />
                  </div>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("bairro") }}</label>
                    <Multiselect
                      v-model="viewModelEndereco.bairroId"
                      :placeholder="placeholderBairro"
                      :options="optionsBairro"
                      :disabled="inputReadonly"
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
                      :disabled="inputReadonly"
                    />
                  </div>
                </div>
              </div>
              <div v-if="mostrarBtnSalvar" class="align-right mt-3 ml-1">
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
                  {{ $i18n.translate("canselar") }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- telefone -->
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
                          v-if="inputReadonly"
                          data-edit="1"
                          class="btn btn-sm btn-warning mr-2"
                          type="button"
                        >
                          {{ $i18n.translate("visualizar") }}
                        </button>
                        <button
                          v-if="mostrarBtnSalvar"
                          data-edit="1"
                          class="btn btn-sm btn-warning mr-2"
                          type="button"
                        >
                          {{ $i18n.translate("editar") }}
                        </button>
                        <button
                          v-if="mostrarBtnSalvar"
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
                      v-model="viewModelTelefone.descricao"
                      class="form-control"
                      type="text"
                      :placeholder="placeholderDescricao"
                      maxlength="50"
                      :readonly="inputReadonly"
                    />
                  </div>
                </div>
                <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("ddd") }}</label>
                    <input
                      v-model="viewModelTelefone.ddd"
                      class="form-control"
                      type="nome"
                      :placeholder="placeholderDDD"
                      maxlength="5"
                      :readonly="inputReadonly"
                    />
                  </div>
                </div>
                <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("ddi") }}</label>
                    <input
                      v-model="viewModelTelefone.ddi"
                      class="form-control"
                      type="nome"
                      :placeholder="placeholderDDI"
                      maxlength="5"
                      :readonly="inputReadonly"
                    />
                  </div>
                </div>

                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("numero") }}</label>
                    <input
                      v-model="viewModelTelefone.numero"
                      class="form-control"
                      type="nome"
                      :placeholder="placeholderNome"
                      maxlength="10"
                      :readonly="inputReadonly"
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("tipo") }}</label>
                  </div>
                  <Multiselect
                    v-model="viewModelTelefone.tipo"
                    :options="optionsTipoTelefone"
                    :placeholder="placeholderTipoTelefone"
                    :disabled="inputReadonly"
                  />
                </div>
                <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
                  <div class="form-group">
                    <label>{{ $i18n.translate("whatsApp") }}</label> <br />
                    <input
                      :disabled="inputReadonly"
                      type="checkbox"
                      v-model="viewModelTelefone.ehWhatsApp"
                      :readonly="inputReadonly"
                    />
                  </div>
                </div>
                <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
                  <div class="form-group">
                    <label>{{ $i18n.translate("ativo") }}</label> <br />
                    <input
                      type="checkbox"
                      v-model="viewModelTelefone.snAtivo"
                      :disabled="inputReadonly"
                    />
                  </div>
                </div>
              </div>
              <div v-if="mostrarBtnSalvar" class="align-right mt-3 ml-1">
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
                  {{ $i18n.translate("canselar") }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--contato-->
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
                          v-if="inputReadonly"
                          data-edit="1"
                          class="btn btn-sm btn-warning mr-2"
                          type="button"
                        >
                          {{ $i18n.translate("visualizar") }}
                        </button>
                        <button
                          v-if="mostrarBtnSalvar"
                          data-edit="1"
                          class="btn btn-sm btn-warning mr-2"
                          type="button"
                        >
                          {{ $i18n.translate("editar") }}
                        </button>
                        <button
                          v-if="mostrarBtnSalvar"
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
                      maxlength="255"
                      :readonly="inputReadonly"
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
                      maxlength="50"
                      :readonly="inputReadonly"
                    />
                  </div>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("tipo") }}</label>
                    <Multiselect
                      :placeholder="placeholderTipoContato"
                      :options="optionsTipoContato"
                      v-model="viewModelContato.tipo"
                      :disabled="inputReadonly"
                    />
                  </div>
                </div>

                <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
                  <div class="form-group">
                    <label>{{ $i18n.translate("ativo") }}</label> <br />
                    <input
                      v-model="viewModelContato.snAtivo"
                      type="checkbox"
                      :disabled="inputReadonly"
                    />
                  </div>
                </div>
              </div>

              <div v-if="mostrarBtnSalvar" class="align-right mt-3 ml-1">
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
                  {{ $i18n.translate("canselar") }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- dados bancarios -->
      <div class="card shadow mt-2">
        <header class="card-header">
          <strong class="align-self-center">
            {{ $i18n.translate("dadosBancarios") }}
          </strong>
        </header>
        <div class="card-body">
          <div class="row">
            <div class="col-sm-12 col-md-4 col-lg-4 col-xl-4">
              <suspense>
                <template #default>
                  <Table
                    class="table-bordless table-striped"
                    :headerColumns="hColumnsDadosBancarios"
                    :items="itemsDadosBancarios"
                    action="true"
                    @on-action-click="onEditDadosBancarios"
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
                          v-if="inputReadonly"
                          data-edit="1"
                          class="btn btn-sm btn-warning mr-2"
                          type="button"
                        >
                          {{ $i18n.translate("visualizar") }}
                        </button>
                        <button
                          v-if="mostrarBtnSalvar"
                          data-edit="1"
                          class="btn btn-sm btn-warning mr-2"
                          type="button"
                        >
                          {{ $i18n.translate("editar") }}
                        </button>
                        <button
                          v-if="mostrarBtnSalvar"
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
                    <label
                      >* {{ $i18n.translate("descricao") }} {campo n esta no
                      beck ainda}</label
                    >
                    <input
                      v-model="viewModelDadosBancario.descricao"
                      class="form-control"
                      type="numtextber"
                      :placeholder="placeholderDescricao"
                      maxlength="255"
                      :readonly="inputReadonly"
                    />
                  </div>
                </div>

                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("banco") }}</label>
                    <Multiselect
                      v-model="viewModelDadosBancario.bancoId"
                      :placeholder="placeholderBanco"
                      :options="optionsBanco"
                      :disabled="inputReadonly"
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("agencia") }}</label>
                    <input
                      v-model="viewModelDadosBancario.agencia"
                      class="form-control"
                      type="number"
                      :placeholder="placeholderAgencia"
                      maxlength="6"
                      :readonly="inputReadonly"
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("DvAgencia") }}</label>
                    <input
                      v-model="viewModelDadosBancario.dvAgencia"
                      class="form-control"
                      type="number"
                      :placeholder="placeholderDigitoVerificadorAgencia"
                      maxlength="1"
                      :readonly="inputReadonly"
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("conta") }}</label>
                    <input
                      v-model="viewModelDadosBancario.conta"
                      class="form-control"
                      type="number"
                      :placeholder="placeholderConta"
                      maxlength="6"
                      :readonly="inputReadonly"
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("dvConta") }}</label>
                    <input
                      v-model="viewModelDadosBancario.dvConta"
                      class="form-control"
                      type="number"
                      :placeholder="placeholderDigitoVerificadorConta"
                      maxlength="1"
                      :readonly="inputReadonly"
                    />
                  </div>
                </div>
                <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <div class="form-group">
                    <label>{{ $i18n.translate("ativo") }}</label> <br />
                    <input
                      v-model="viewModelDadosBancario.persistido"
                      type="checkbox"
                      placeholder="Digite a Descrição"
                      :disabled="inputReadonly"
                    />
                  </div>
                </div>
              </div>

              <div v-if="mostrarBtnSalvar" class="align-right mt-3 ml-1">
                <button
                  class="btn-padrao btn-confirmar mr-1"
                  type="button"
                  v-on:click="validaCadastroDadosBancarios()"
                >
                  {{ $i18n.translate("adicionar") }}
                </button>
                <button
                  class="btn btn-secondary"
                  type="button"
                  v-on:click="limparCamposContato()"
                >
                  {{ $i18n.translate("canselar") }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="d-flex mt-3 ml-1 buttonsActions">
        <button v-if="mostrarBtnSalvar" class="btn btn-success" type="submit">
          {{ $i18n.translate("salvar") }}
        </button>
        <div
          v-if="mostrarBtnSalvar"
          class="btn btn-warning ml-2 mr-2"
          @click="limpaForm()"
        >
          {{ $i18n.translate("limparFormulario") }}
        </div>
        <button
          class="btn btn-secondary"
          type="reset"
          @click="$router.push('/visitador/1')"
        >
          {{ $i18n.translate("voltar") }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import enumSelect from "../../../services/enum/enum";
import Multiselect from "@vueform/multiselect";
import servico from "../../../services/pessoa/visitador";
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
      params: { visitadorId, visualizar },
    } = useRoute();
    const getId = () => {
      return visitadorId ? visitadorId : store.state.emptyGuid;
    };
    if (visualizar) {
      mostrarBtnSalvar = false;
      inputReadonly = true;
    } else {
      mostrarBtnSalvar = true;
      inputReadonly = false;
    }
    let mostrarBtnSalvar;
    let inputReadonly;
    const store = useStore();
    let router = useRouter();
    let exibeCampos = ref(false);
    let optionsTipoPessoa = ref([]);
    let optionsPais = ref([]);
    let optionsEstado = ref([]);
    let optionsCidade = ref([]);
    let optionsBairro = ref([]);
    let optionsBanco = ref([]);
    let optionsPlanoConta = ref([]);
    let optionsTipoTelefone = ref([]);
    let optionsTipoContato = ref([]);

    let placeholderNome;
    let placeholderTipoPessoa;
    let placeholderCpfCnpj;

    let placeholderComicaoVendedor;

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
    let placeholderBanco;
    let placeholderAgencia;
    let placeholderDigitoVerificadorAgencia;
    let placeholderConta;
    let placeholderDigitoVerificadorConta;

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
    let hColumnsDadosBancarios = ref([
      {
        key: "conta",
        label: "conta",
      },
      {
        key: "agencia",
        label: "agencia",
      },
    ]);

    let viewModel = ref({
      //visitador
      id: ref(getId()),
      comissaoVendedor: ref(""),
      sincronizouAlcance: ref(false),
      flInforPessoa: ref("000100"),
      //pessoa
      nome: ref(""),
      tipoPessoa: ref(),
      cpfCnpj: ref(),
      tpFornecedor: ref(false),
      tpFuncionario: ref(false),
      tpVisitador: ref(true),
      tpPrescritor: ref(false),
      snAtivo: ref(true),
      //adicional pessoa
      enderecos: ref([]),
      telefones: ref([]),
      contatos: ref([]),
      dadosBancarios: ref([]),
    });

    let viewModelEndereco = ref({
      id: ref(),
      rua: ref(""),
      numero: ref(""),
      complemento: ref(""),
      cep: ref(""),
      snAtivo: ref(true),
      bairroId: ref(),
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
      tipo: ref(),
      descContato: ref(""),
      snAtivo: ref(true),
      flInforPessoa: ref("100000"),
    });
    let viewModelDadosBancario = ref({
      id: ref(),
      bancoId: ref(),
      agencia: ref(""),
      dvAgencia: ref(""),
      conta: ref(""),
      persistido: ref(true),
      dvConta: ref(""),
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
        // optionsEstado.value = await obterSeletor(
        //   "estado/obter-seletor-estados"
        // );
        // optionsCidade.value = await obterSeletor(
        //   "cidade/obter-seletor-cidades"
        // );
        optionsBairro.value = await obterSeletor("bairro/obter-seletor-bairro");
        optionsBanco.value = await obterSeletor("banco/obter-seletor-banco");
        optionsPlanoConta.value = await obterSeletor(
          "planoConta/obter-select-plano-conta"
        );
        optionsTipoContato.value = servicoEnum.pessoaFornecedorTipoContato;
        optionsTipoTelefone.value = servicoEnum.pessoaFornecedorTipoTelefone;
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
      placeholderTipoPessoa = ` ${languagePageNow.selecione} ${languagePageNow.o} ${languagePageNow.tipoPessoa}`;
      placeholderCpfCnpj = ` ${languagePageNow.digite} ${languagePageNow.o} ${languagePageNow.cpfCnpj}`;

      placeholderComicaoVendedor = ` ${languagePageNow.digite} ${languagePageNow.o} ${languagePageNow.comicaoVendedor}`;

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

      placeholderBanco = ` ${languagePageNow.selecione} ${languagePageNow.o} ${languagePageNow.banco}`;
      placeholderAgencia = ` ${languagePageNow.digite} ${languagePageNow.a} ${languagePageNow.agencia}`;
      placeholderDigitoVerificadorAgencia = ` ${languagePageNow.digite} ${languagePageNow.o} ${languagePageNow.digitoAgencia}`;
      placeholderConta = ` ${languagePageNow.digite} ${languagePageNow.a} ${languagePageNow.contaCorente}`;
      placeholderDigitoVerificadorConta = ` ${languagePageNow.digite} ${languagePageNow.o} ${languagePageNow.digitoVerificador} ${languagePageNow.da} ${languagePageNow.contaCorente} `;
    };
    atualizartraducaoParametros();
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
    const validarForm = e => {
      e.preventDefault();
      if (viewModel.value.cpfCnpj >= 0) {
        salvaForm();
      } else {
        let lengBrEs = lang();
        Swal.fire({
          icon: "warning",
          title: `${lengBrEs.atencao}`,
          text: `${lengBrEs.PreenchaOCampo}`,
        });
      }
    };
    const salvaForm = () => {
      let lengBrEs = lang();
      let itemEdt = viewModel.value.nome;
      viewModel.value.cpfCnpj = viewModel.value.cpfCnpj.replaceAll(
        /(\.|\/|-)/g,
        ""
      );
      if (
        viewModel.value.id !== store.state.emptyGuid &&
        viewModel.value.id !== undefined
      ) {
        console.log("viewModel", viewModel.value);
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
            Swal.fire({
              icon: "success",
              title: `${lengBrEs.concluido}`,
              showDenyButton: true,
              confirmButtonText: `${lengBrEs.continuarCadastrando}`,
              denyButtonText: `${lengBrEs.voltar}`,
              text: `${lengBrEs.oItem} "${viewModel.value.descricao}" ${lengBrEs.foiAdicionado}.`,
            }).then(result => {
              if (result.isConfirmed) {
                console.log("continuar cadastrando");
              } else if (result.isDenied) {
                router.push("/visitador/1");
              }
            });
            limpaForm();
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
    const limpaForm = () => {
      viewModel.value.id = ref(getId());
      viewModel.value.nome = ref("");
      viewModel.value.tipoPessoa = ref("");
      viewModel.value.cpfCnpj = ref();
      viewModel.value.tpFornecedor = ref(false);
      viewModel.value.comissaoVendedor = ref("");
      viewModel.value.sincronizouAlcance = ref(false);
      viewModel.value.tpFuncionario = ref(false);
      viewModel.value.tpVisitador = ref(true);
      viewModel.value.tpPrescritor = ref(false);
      viewModel.value.snAtivo = ref(true);
      viewModel.value.enderecos = ref([]);
      viewModel.value.telefones = ref([]);
      viewModel.value.contatos = ref([]);
      viewModel.value.dadosBancarios = ref([]);
      viewModel.value.fornecedores = ref([]);
      itemsEndereco.value = [];
      itemsContato.value = [];
      itemsTelefone.value = [];
      itemsDadosBancarios.value = [];
    };

    const validaCadastroEndereco = () => {
      //valida os itens obrigatorios do cadastro
      if (
        viewModelEndereco.value.rua &&
        viewModelEndereco.value.numero &&
        viewModelEndereco.value.cep &&
        viewModelEndereco.value.descricao &&
        viewModelEndereco.value.paisId &&
        viewModelEndereco.value.estadoId &&
        viewModelEndereco.value.cidadeId &&
        viewModelEndereco.value.bairroId
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
    const validaCadastroDadosBancarios = () => {
      //valida os itens obrigatorios do cadastro
      if (
        viewModelDadosBancario.value.agencia &&
        viewModelDadosBancario.value.dvAgencia &&
        viewModelDadosBancario.value.conta &&
        viewModelDadosBancario.value.dvConta &&
        viewModelDadosBancario.value.bancoId
      ) {
        if (viewModelDadosBancario.value.bancoId) {
          salvaDadosBancarios();
        } else {
          let lengBrEs = lang();
          Swal.fire({
            icon: "warning",
            title: `${lengBrEs.atencao}`,
            text: `${lengBrEs.PreenchaOCampo}`,
          });
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
          bairroId: viewModelItens.bairroId,
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
    const salvaDadosBancarios = () => {
      let viewModelValue = viewModel.value.dadosBancarios;
      let viewModelItens = viewModelDadosBancario.value;
      let itemsEdicao = itemsDadosBancarios.value;
      let viewModelItemEdicaoJson = JSON.parse(
        JSON.stringify(viewModelDadosBancario.value)
      );
      if (viewModelItens.id == undefined || viewModelItens.id == "") {
        viewModelItens.id = uuidv4();
        viewModelItemEdicaoJson.persistido = false;
        viewModelValue.push(viewModelItemEdicaoJson);
        let itensGrid = ref({
          id: viewModelItens.id,
          bancoId: viewModelItens.bancoId,
          descricao: viewModelItens.descricao,
          agencia: viewModelItens.agencia,
          dvAgencia: viewModelItens.dvAgencia,
          conta: viewModelItens.conta,
          persistido: viewModelItens.persistido,
          dvConta: viewModelItens.dvConta,
        });
        itemsDadosBancarios.value.push(itensGrid.value);
        limpaCamposDadosBancarios();
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
        registroEdicaoRetornoFiltro.descricao =
          viewModelItemEdicaoJson.descricao;
        registroEdicaoRetornoFiltro.id = viewModelItemEdicaoJson.id;
        registroEdicaoRetornoFiltro.bancoId = viewModelItemEdicaoJson.bancoId;
        registroEdicaoRetornoFiltro.agencia = viewModelItemEdicaoJson.agencia;
        registroEdicaoRetornoFiltro.dvAgencia =
          viewModelItemEdicaoJson.dvAgencia;
        registroEdicaoRetornoFiltro.conta = viewModelItemEdicaoJson.conta;
        registroEdicaoRetornoFiltro.persistido =
          viewModelItemEdicaoJson.persistido;
        registroEdicaoRetornoFiltro.dvConta = viewModelItemEdicaoJson.dvConta;
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
    const limpaCamposDadosBancarios = () => {
      viewModelDadosBancario.value.id = ref();
      viewModelDadosBancario.value.descricao = ref("");
      viewModelDadosBancario.value.bancoId = ref("");
      viewModelDadosBancario.value.dvAgencia = ref("");
      viewModelDadosBancario.value.agencia = ref("");
      viewModelDadosBancario.value.conta = ref("");
      viewModelDadosBancario.value.persistido = ref(true);
      viewModelDadosBancario.value.flInforPessoa = ref();
      viewModelDadosBancario.value.dvConta = ref("");
    };
    const limparCamposEndereco = () => {
      viewModelEndereco.value.id = ref();
      viewModelEndereco.value.rua = ref("");
      viewModelEndereco.value.numero = ref("");
      viewModelEndereco.value.complemento = ref("");
      viewModelEndereco.value.cep = ref("");
      viewModelEndereco.value.snAtivo = ref(true);
      viewModelEndereco.value.bairroId = ref("");
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
        let lengBrEs = lang();
        Swal.fire({
          icon: "error",
          title: `${lengBrEs.erro}`,
          text: `${lengBrEs.erroProcessarRequisição}`,
        });
      }
    };
    const onDeleteTelefone = item => {
      try {
        var indexGrid = itemsTelefone.value.indexOf(item);
        itemsTelefone.value.splice(indexGrid, 1);
      } catch (err) {
        let lengBrEs = lang();
        Swal.fire({
          icon: "error",
          title: `${lengBrEs.erro}`,
          text: `${lengBrEs.erroProcessarRequisição}`,
        });
      }
    };
    const onDeleteContato = item => {
      try {
        var indexGrid = itemsContato.value.indexOf(item);
        itemsContato.value.splice(indexGrid, 1);
      } catch (err) {
        let lengBrEs = lang();
        Swal.fire({
          icon: "error",
          title: `${lengBrEs.erro}`,
          text: `${lengBrEs.erroProcessarRequisição}`,
        });
      }
    };
    const onDeleteDadosBancarios = item => {
      try {
        var indexGrid = itemsDadosBancarios.value.indexOf(item);
        itemsDadosBancarios.value.splice(indexGrid, 1);
      } catch (err) {
        let lengBrEs = lang();
        Swal.fire({
          icon: "error",
          title: `${lengBrEs.erro}`,
          text: `${lengBrEs.erroProcessarRequisição}`,
        });
      }
    };

    const onEditEndereco = e => {
      if (!e || !e.target || !e.target.dataset) {
        console.log("Objeto Errado");
        return;
      }
      if (e.target.dataset.edit == 0) {
        let lengBrEs = lang();
        Swal.fire({
          icon: "question",
          title: `${lengBrEs.confirmaExcluzao}`,
          text: `${lengBrEs.voceConfirmaExcluzao}`,
          showCancelButton: true,
          confirmButtonText: `${lengBrEs.sim}`,
          cancelButtonText: `${lengBrEs.canselar}`,
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
            viewmodelItem.bairroId = index.bairroId;
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
        let lengBrEs = lang();
        Swal.fire({
          icon: "question",
          title: `${lengBrEs.confirmaExcluzao}`,
          text: `${lengBrEs.voceConfirmaExcluzao}`,
          showCancelButton: true,
          confirmButtonText: `${lengBrEs.sim}`,
          cancelButtonText: `${lengBrEs.canselar}`,
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
        let lengBrEs = lang();
        Swal.fire({
          icon: "question",
          title: `${lengBrEs.confirmaExcluzao}`,
          text: `${lengBrEs.voceConfirmaExcluzao}`,
          showCancelButton: true,
          confirmButtonText: `${lengBrEs.sim}`,
          cancelButtonText: `${lengBrEs.canselar}`,
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
        viewModelContato.value.tipo = filtrado.tipo;
        viewModelContato.value.snAtivo = filtrado.snAtivo;
      }
    };
    const onEditDadosBancarios = e => {
      if (!e || !e.target || !e.target.dataset) {
        console.log("Objeto Errado");
        return;
      }
      if (e.target.dataset.edit == 0) {
        let lengBrEs = lang();
        Swal.fire({
          icon: "question",
          title: `${lengBrEs.confirmaExcluzao}`,
          text: `${lengBrEs.voceConfirmaExcluzao}`,
          showCancelButton: true,
          confirmButtonText: `${lengBrEs.sim}`,
          cancelButtonText: `${lengBrEs.canselar}`,
        }).then(response => {
          if (response.isConfirmed) {
            onDeleteDadosBancarios(e.item);
          }
        });
      } else {
        var banco = itemsDadosBancarios.value;
        let id = e.item.id;
        let filtrado;
        const filtrar = index => {
          if (index.id == id) {
            filtrado = index;
          }
        };
        banco.forEach(filtrar);
        viewModelDadosBancario.value.id = filtrado.id;
        viewModelDadosBancario.value.bancoId = filtrado.bancoId;
        viewModelDadosBancario.value.agencia = filtrado.agencia;
        viewModelDadosBancario.value.dvAgencia = filtrado.dvAgencia;
        viewModelDadosBancario.value.conta = filtrado.conta;
        viewModelDadosBancario.value.persistido = filtrado.persistido;
        viewModelDadosBancario.value.dvConta = filtrado.dvConta;
      }
    };
    const ObterPessoa = async id => {
      var retorno = await servico.getId(id);
      console.log("viewModel", viewModel);
      console.log("retorno", retorno);
      viewModel.value.id = retorno.id;
      viewModel.value.nome = retorno.nome;
      viewModel.value.tipoPessoa = !retorno.tipoPessoa
        ? ref()
        : parseInt(retorno.tipoPessoa);
      viewModel.value.cpfCnpj = retorno.cpfCnpj;
      viewModel.value.snAtivo = retorno.snAtivo;
      viewModel.value.comissaoVendedor = retorno.comissaoVendedor;
      viewModel.value.sincronizouAlcance = retorno.sincronizouAlcance;
      replaceCpfCnpj();

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
      console.log("viewModel", viewModel);
    };
    try {
      console.log("id:", visitadorId);
      if (
        visitadorId !== undefined &&
        viewModel.value.id !== store.state.emptyGuid
      ) {
        ObterPessoa(visitadorId);
      }
    } catch (err) {
      console.error("Erro ao obter grupo de usuário para edição", err);
    }

    return {
      viewModel,
      optionsTipoPessoa,
      inputReadonly,
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
      viewModelDadosBancario,
      hColumnsDadosBancarios,
      onDeleteEndereco,
      onEditEndereco,
      onDeleteContato,
      onEditContato,
      limpaCamposContato,
      limpaCamposDadosBancarios,
      onEditDadosBancarios,
      onDeleteDadosBancarios,
      optionsTipoTelefone,
      buscaCep,
      validaCadastroEndereco,
      validaCadastroTelefone,
      validaCadastroContato,
      validaCadastroDadosBancarios,
      replaceCpfCnpj,

      placeholderNome,
      placeholderTipoPessoa,
      placeholderCpfCnpj,

      placeholderComicaoVendedor,

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

      placeholderBanco,
      placeholderAgencia,
      placeholderDigitoVerificadorAgencia,
      placeholderConta,
      placeholderDigitoVerificadorConta,

      mostrarBtnSalvar,
      limpaForm,
      salvaForm,
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