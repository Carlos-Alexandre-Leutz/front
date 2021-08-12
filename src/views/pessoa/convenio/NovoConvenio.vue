<template>
  <div>
    <div class="alert alert-info" role="alert">
      Esta tela suporta: <br />
      Ctrl+Enter para salvar o registro, não há verificação para campos
      obrigatórios <br />
      Ctrl+i vai para o primeiro input do formulário
    </div>
    <form id="form" @submit="validarForm">
      <div class="row">
        <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div class="card shadow">
            <header class="card-header">
              <strong class="align-self-center">{{
                $i18n.translate("convenio")
              }}</strong>
            </header>
            <div class="card-body">
              <div class="row">
                <small>{{ $i18n.translate("camposObrigatorio") }}</small>
                <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("nome") }}</label>
                    <input
                      id="primeiroInput"
                      class="form-control"
                      type="text"
                      :placeholder="placeholderNome"
                      required
                      v-model="viewModel.nome"
                      maxlength="255"
                    />
                  </div>
                </div>
                <div class="col-sm-12 col-md-3 col-lg-3 col-xl-3">
                  <div class="form-group">
                    <label> * {{ $i18n.translate("tipoPessoa") }} </label>
                    <Multiselect
                      v-model="viewModel.tipoPessoa"
                      :placeholder="placeholderTipoPessoa"
                      :options="optionsTipoPessoa"
                    />
                  </div>
                </div>
                <div class="col-sm-12 col-md-3 col-lg-3 col-xl-3">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("cpfCnpj") }}</label>
                    <input
                      id="cpfCnpj"
                      class="form-control"
                      type="text"
                      required
                      :placeholder="placeholderCpfCnpj"
                      v-model="viewModel.cpfCnpj"
                      maxlength="20"
                      @change="replaceCpfCnpj()"
                    />
                  </div>
                </div>

                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("identificador") }}</label>
                    <Multiselect
                      v-model="viewModel.identificadorConvenio"
                      :placeholder="placeholderIndentificador"
                      :options="optionsidentificador"
                      :change="
                        (exibeCampos = viewModel.identificadorConvenio == 4)
                      "
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label> {{ $i18n.translate("visitador") }}</label>
                    <Multiselect
                      v-model="viewModel.visitadorId"
                      :placeholder="placeholderVisitador"
                      :options="optionsVisitador"
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label> {{ $i18n.translate("escricaoEstadual") }}</label>
                    <input
                      class="form-control"
                      type="text"
                      :placeholder="placeholderEscricaoEstadual"
                      v-model="viewModel.ieConvenio"
                      maxlength="20"
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>{{ $i18n.translate("descontos") }}</label>
                    <input
                      class="form-control"
                      type="number"
                      step="0.010"
                      :placeholder="placeholderDesconto"
                      v-model="viewModel.desconto"
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>{{ $i18n.translate("acrescimo") }} %</label>
                    <input
                      class="form-control"
                      type="number"
                      step="0.010"
                      :placeholder="placeholderAcrecimo"
                      v-model="viewModel.acrescimo"
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("manifesto") }} %</label>
                    <input
                      class="form-control"
                      type="number"
                      step="0.010"
                      :placeholder="placeholderManifesto"
                      required
                      v-model="viewModel.manifesto"
                      maxlength="255"
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("diasRecebimento") }}</label>
                    <input
                      class="form-control"
                      type="number"
                      step="0.010"
                      :placeholder="placeholderDiasRecebimento"
                      required
                      v-model="viewModel.diaRecebimento"
                      maxlength="20"
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label> {{ $i18n.translate("cadastroFarmacia") }}</label>
                    <input
                      class="form-control"
                      type="text"
                      :placeholder="placeholderCadastroFarmacia"
                      v-model="viewModel.cadastroFarmacia"
                      maxlength="20"
                    />
                  </div>
                </div>

                <div
                  v-if="exibeCampos"
                  class="col-sm-6 col-md-6 col-lg-6 col-xl-6"
                >
                  <div class="form-group">
                    <label> {{ $i18n.translate("codigoPerdigao") }}</label>
                    <input
                      class="form-control"
                      type="text"
                      :placeholder="placeholderCodigoPerdigao"
                      v-model="viewModel.codigoPerdigao"
                      maxlength="6"
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label> {{ $i18n.translate("diasPrimeiroVencto") }}</label>
                    <input
                      class="form-control"
                      type="number"
                      :placeholder="placeholderDiasPrimeiroVencimento"
                      v-model="viewModel.diasPrimeiroVencimento"
                      maxlength="10"
                    />
                  </div>
                </div>

                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label> {{ $i18n.translate("etiqueta") }}</label>
                    <Multiselect
                      v-model="viewModel.etiquetaId"
                      :placeholder="placeholderEtiqueta"
                      :options="optionsEtiqueta"
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>
                      {{ $i18n.translate("enderecoComprovanteVenda") }}</label
                    ><br />
                    <input
                      type="checkbox"
                      v-model="viewModel.enderecoComprovanteVenda"
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label> {{ $i18n.translate("bloqueado") }}</label
                    ><br />
                    <input type="checkbox" v-model="viewModel.bloqueado" />
                  </div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>
                      {{ $i18n.translate("autorizarParcelamento") }}</label
                    ><br />
                    <input
                      type="checkbox"
                      v-model="viewModel.ieAutorizaParcelamento"
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label> {{ $i18n.translate("b2bEnviarEcommerce") }}</label
                    ><br />
                    <input
                      type="checkbox"
                      v-model="viewModel.b2bEnviaEcommerce"
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label> {{ $i18n.translate("permiteRateio") }}</label
                    ><br />
                    <input type="checkbox" v-model="viewModel.permiteRateio" />
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
      <!-- convenio grupo -->
      <div class="card shadow mt-2">
        <header class="card-header">
          <strong class="align-self-center">
            {{ $i18n.translate("convenioGrupo") }}
          </strong>
        </header>
        <div class="card-body">
          <div class="row">
            <div class="col-sm-12 col-md-4 col-lg-4 col-xl-4">
              <suspense>
                <template #default>
                  <Table
                    class="table-bordless table-striped"
                    :headerColumns="hColumnsGrupoConvenio"
                    :items="itemsGrupoConvenio"
                    action="true"
                    @on-action-click="onEditConvenioGrupo"
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
                <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("convenioGrupo") }}</label>
                    <Multiselect
                      v-model="viewModelConvenio.grupoProdutoId"
                      :placeholder="placeholderGrupoProduto"
                      :options="optionsGrupoProduto"
                    />
                  </div>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>{{ $i18n.translate("descontos") }} %</label>
                    <input
                      v-model="viewModelConvenio.percentualDesconto"
                      class="form-control"
                      type="number"
                      step="0.010"
                      :placeholder="placeholderDesconto"
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>{{
                      $i18n.translate("custoReferenciaPrecoVenda")
                    }}</label>
                    <br />
                    <input
                      v-model="viewModelConvenio.custoReferenciaPrecoVenda"
                      type="checkbox"
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>{{
                      $i18n.translate("aplicaDescontoProduto")
                    }}</label>
                    <br />
                    <input
                      v-model="viewModelConvenio.aplicaDescontoProduto"
                      type="checkbox"
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>{{ $i18n.translate("ativo") }}</label> <br />
                    <input
                      v-model="viewModelConvenio.persistido"
                      type="checkbox"
                    />
                  </div>
                </div>
              </div>
              <div class="align-right mt-3 ml-1">
                <button
                  class="btn-padrao btn-confirmar mr-1"
                  type="button"
                  v-on:click="validaCadastroGrupoConveio()"
                >
                  {{ $i18n.translate("adicionar") }}
                </button>
                <button
                  class="btn btn-secondary"
                  type="button"
                  v-on:click="limparCamposConvenioGrupo()"
                >
                  {{ $i18n.translate("canselar") }}
                </button>
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
                      placeholder="Digite a descrição"
                      maxlength="255"
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
                      placeholder="Digite o cep"
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
                      placeholder="Digite a Descrição"
                      maxlength="50"
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
                      placeholder="Digite o numero"
                      maxlength="10"
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
                      placeholder="Digite o Complemento"
                      maxlength="255"
                    />
                  </div>
                </div>

                <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("pais") }}</label>
                    <Multiselect
                      v-model="viewModelEndereco.paisId"
                      placeholder="Selecione a cidade"
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
                      placeholder="Selecione o estado"
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
                      placeholder="Selecione a cidade"
                      :options="optionsCidade"
                      v-on:select="preencherSeletorBairro()"
                    />
                  </div>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("bairro") }}</label>
                    <Multiselect
                      v-model="viewModelEndereco.bairroId"
                      placeholder="Selecione o bairro"
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
                      v-model="viewModelTelefone.descricao"
                      class="form-control"
                      type="text"
                      :placeholder="placeholderDescricao"
                      maxlength="50"
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
                  />
                </div>
                <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
                  <div class="form-group">
                    <label>{{ $i18n.translate("whatsApp") }}</label> <br />
                    <input
                      type="checkbox"
                      v-model="viewModelTelefone.ehWhatsApp"
                    />
                  </div>
                </div>
                <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
                  <div class="form-group">
                    <label>{{ $i18n.translate("ativo") }}</label> <br />
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
                      placeholder="Digite a Descrição"
                      maxlength="255"
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
                    />
                  </div>
                </div>

                <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
                  <div class="form-group">
                    <label>{{ $i18n.translate("ativo") }}</label> <br />
                    <input v-model="viewModelContato.snAtivo" type="checkbox" />
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
                  {{ $i18n.translate("canselar") }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="d-flex mt-3 ml-1 buttonsActions">
        <button
          v-if="mostrarBtnSalvar"
          class="btn btn-success mr-2"
          type="submit"
        >
          {{ $i18n.translate("salvar") }}
        </button>
        <div
          v-if="mostrarBtnSalvar"
          class="btn btn-warning mr-2"
          @click="limpaForm()"
        >
          {{ $i18n.translate("limparFormulario") }}
        </div>
        <button
          class="btn btn-secondary"
          type="reset"
          @click="$router.push('/convenio/1')"
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
import { useRoute, useRouter } from "vue-router";
import enumSelect from "../../../services/enum/enum";
import Multiselect from "@vueform/multiselect";
import servico from "../../../services/pessoa/convenio";
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
      params: { convenioId, visualizar },
    } = useRoute();
    const getId = () => {
      return convenioId ? convenioId : store.state.emptyGuid;
    };
    if (visualizar) {
      mostrarBtnSalvar = false;
    } else {
      mostrarBtnSalvar = true;
    }
    let mostrarBtnSalvar;
    const store = useStore();
    let router = useRouter();
    let exibeCampos = ref(false);
    let optionsTipoPessoa = ref([]);
    let optionsPais = ref([]);
    let optionsEstado = ref([]);
    let optionsCidade = ref([]);
    let optionsBairro = ref([]);
    let optionsBanco = ref([]);
    let optionsVisitador = ref([]);
    let optionsTipoTelefone = ref([]);
    let optionsTipoContato = ref([]);
    let optionsidentificador = ref([]);
    let optionsEtiqueta = ref([]);
    let optionsGrupoProduto = ref([]);
    let retornoGrupoConvenio;

    let itemsEndereco = ref([]);
    let itemsContato = ref([]);
    let itemsTelefone = ref([]);
    let itemsDadosBancarios = ref([]);
    let itemsGrupoConvenio = ref([]);
    let placeholderNome;
    let placeholderTipoPessoa;
    let placeholderCpfCnpj;
    let placeholderIndentificador;
    let placeholderVisitador;
    let placeholderEscricaoEstadual;
    let placeholderDesconto;
    let placeholderAcrecimo;
    let placeholderManifesto;
    let placeholderDiasRecebimento;
    let placeholderCadastroFarmacia;
    let placeholderDiasPrimeiroVencimento;
    let placeholderEtiqueta;
    let placeholderGrupoProduto;
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
    let placeholderCodigoPerdigao;

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
    let hColumnsGrupoConvenio = ref([
      {
        key: "grupoProdutoLabel",
        label: "grupoProduto",
      },
      {
        key: "percentualDesconto",
        label: "percentualDesconto",
      },
    ]);

    let viewModel = ref({
      id: ref(getId()),
      nome: ref(""),
      tipoPessoa: ref(),
      cpfCnpj: ref(""),
      snAtivo: ref(true),

      identificadorConvenio: ref(),
      visitadorId: ref(),
      ieConvenio: ref(""), //escrição estadual (ง ͡° ͜ʖ ͡°)=/̵͇̿̿/'̿'̿̿̿ ̿ ̿̿
      desconto: ref(),
      acrescimo: ref(),
      manifesto: ref(),
      diaRecebimento: ref(),
      cadastroFarmacia: ref(""),
      codigoPerdigao: ref(""),
      diasPrimeiroVencimento: ref(),
      bloqueado: ref(false),
      ieAutorizaParcelamento: ref(false),
      b2bEnviaEcommerce: ref(false),
      permiteRateio: ref(false),
      enderecoComprovanteVenda: ref(false),
      etiquetaId: ref(),
      aplicaDescontoProduto: ref(),
      flInforPessoa: ref("000010"),

      enderecos: ref([]),
      telefones: ref([]),
      contatos: ref([]),
      convenioGrupos: ref([]),
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
      tipo: ref(),
      descContato: ref(""),
      snAtivo: ref(true),
      flInforPessoa: ref("100000"),
    });
    let viewModelConvenio = ref({
      id: ref(),
      grupoProdutoId: ref(),
      grupoProdutoLabel: ref(""),
      percentualDesconto: ref(""),
      custoReferenciaPrecoVenda: ref(""),
      persistido: ref(true),
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

        optionsVisitador.value = await obterSeletor(
          "visitador/obter-seletor-visitador"
        );
        optionsGrupoProduto.value = await obterSeletor(
          "grupoProduto/obter-seletor-grupo-produto"
        );
        retornoGrupoConvenio = optionsGrupoProduto.value;
        optionsTipoContato.value = servicoEnum.pessoaFornecedorTipoContato;
        optionsTipoTelefone.value = servicoEnum.pessoaFornecedorTipoTelefone;
        optionsidentificador.value = servicoEnum.pessoaConveioindentificador;
        optionsEtiqueta.value = []; //falta criar o cadastro de etiqueta, como etiqueta não é obrigatorio vamo manda fixa na tarefa.
      };
      PreencherSeletores();
    });

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
      placeholderTipoPessoa = ` ${languagePageNow.digite} ${languagePageNow.o} ${languagePageNow.tipoPessoa}`;
      placeholderCpfCnpj = ` ${languagePageNow.digite} ${languagePageNow.o} ${languagePageNow.cpfCnpj}`;

      placeholderIndentificador = ` ${languagePageNow.selecione} ${languagePageNow.o} ${languagePageNow.indentificador}`;
      placeholderVisitador = ` ${languagePageNow.selecione} ${languagePageNow.o} ${languagePageNow.visitador}`;
      placeholderEscricaoEstadual = ` ${languagePageNow.digite} ${languagePageNow.o} ${languagePageNow.escricaoEstadual}`;
      placeholderDesconto = ` ${languagePageNow.digite} ${languagePageNow.o} ${languagePageNow.desconto}`;
      placeholderAcrecimo = ` ${languagePageNow.digite} ${languagePageNow.o} ${languagePageNow.acrecimo}`;
      placeholderManifesto = ` ${languagePageNow.digite} ${languagePageNow.o} ${languagePageNow.manifesto}`;
      placeholderDiasRecebimento = ` ${languagePageNow.digite} ${languagePageNow.o} ${languagePageNow.diasRecebimento}`;
      placeholderCadastroFarmacia = ` ${languagePageNow.digite} ${languagePageNow.o} ${languagePageNow.cadastroFarmacia}`;
      placeholderDiasPrimeiroVencimento = ` ${languagePageNow.digite} ${languagePageNow.o} ${languagePageNow.diasPrimeiroVencimento}`;
      placeholderEtiqueta = ` ${languagePageNow.selecione} ${languagePageNow.o} ${languagePageNow.etiqueta}`;
      placeholderGrupoProduto = ` ${languagePageNow.selecione} ${languagePageNow.o} ${languagePageNow.grupoProduto}`;

      placeholderDescricao = ` ${languagePageNow.digite} ${languagePageNow.o} ${languagePageNow.descricao}`;
      placeholderCep = ` ${languagePageNow.digite} ${languagePageNow.o} ${languagePageNow.cep}`;
      placeholderRua = ` ${languagePageNow.digite} ${languagePageNow.o} ${languagePageNow.rua}`;
      placeholderNumero = ` ${languagePageNow.digite} ${languagePageNow.o} ${languagePageNow.numero}`;
      placeholderComplemento = ` ${languagePageNow.digite} ${languagePageNow.o} ${languagePageNow.complemeto}`;
      placeholderPais = ` ${languagePageNow.selecione} ${languagePageNow.o} ${languagePageNow.pais}`;
      placeholderEstado = ` ${languagePageNow.selecione} ${languagePageNow.o} ${languagePageNow.estado}`;
      placeholderCidade = ` ${languagePageNow.selecione} ${languagePageNow.o} ${languagePageNow.cidade}`;
      placeholderBairro = ` ${languagePageNow.selecione} ${languagePageNow.o} ${languagePageNow.bairro}`;
      placeholderDDD = ` ${languagePageNow.digite} ${languagePageNow.o} ${languagePageNow.ddd}`;
      placeholderDDI = ` ${languagePageNow.digite} ${languagePageNow.o} ${languagePageNow.ddi}`;
      placeholderTipoTelefone = ` ${languagePageNow.selecione} ${languagePageNow.o} ${languagePageNow.tipo} ${languagePageNow.de}  ${languagePageNow.telefone}`;
      placeholderTipoContato = ` ${languagePageNow.selecione} ${languagePageNow.o} ${languagePageNow.tipo}  ${languagePageNow.de}  ${languagePageNow.contato}`;
      placeholderCodigoPerdigao = ` ${languagePageNow.digite} ${languagePageNow.o} ${languagePageNow.codigoPerdigao}`;
    };
    atualizartraducaoParametros();
    const replaceCpfCnpj = () => {
      let replaceCpfCnpj = viewModel.value.cpfCnpj.replaceAll(/(\.|\/|-)/g, "");
      let tipoPesoa = viewModel.value.tipoPessoa;
      let lengBrEs = lang();
      let nan = parseInt(replaceCpfCnpj);

      if (viewModel.value.tipoPessoa != 0 && viewModel.value.tipoPessoa != 1) {
        Swal.fire({
          icon: "warning",
          title: `${lengBrEs.erro}`,
          text: `${lengBrEs.escolhaTipoPessoa}`,
        });
      } else if (isNaN(nan)) {
        Swal.fire({
          icon: "warning",
          title: `${lengBrEs.erro}`,
          text: `${lengBrEs.oCampoCpfCnpjNletras}`,
        }).then(result => {
          if (result.isConfirmed) {
            document.getElementById("cpfCnpj").focus();
          } else {
            document.getElementById("cpfCnpj").focus();
          }
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
            }).then(result => {
              if (result.isConfirmed) {
                document.getElementById("cpfCnpj").focus();
              } else {
                document.getElementById("cpfCnpj").focus();
              }
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
            }).then(result => {
              if (result.isConfirmed) {
                document.getElementById("cpfCnpj").focus();
              } else {
                document.getElementById("cpfCnpj").focus();
              }
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
    document.addEventListener("keydown", function (event) {
      //event.preventDefault(); isso é um teste não da pra prvinir o evento do click pq se não inpede a digitação
      if (event.ctrlKey && event.which == 13) {
        console.log("cntlr enter");
        //document.getElementById("form").submit(); isso não funciona bem
        validarForm(event); // falta falidar os campos
      }
      if (event.ctrlKey && event.key == "i") {
        //vai para o primeiro input
        document.getElementById("primeiroInput").focus();
      }
    });

    const validarForm = e => {
      e.preventDefault();
      if (
        viewModel.value.tipoPessoa >= 0 &&
        viewModel.value.identificadorConvenio >= 0
      ) {
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
              text: `${lengBrEs.oItem} "${viewModel.value.nome}" ${lengBrEs.foiAdicionado}.`,
            }).then(result => {
              if (result.isConfirmed) {
                console.log("continuar cadastrando");
              } else if (result.isDenied) {
                router.push("/convenio/1");
              }
              limpaForm();
            });
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
    const validaCadastroGrupoConveio = () => {
      //valida os itens obrigatorios do cadastro
      //if produto ja cadastrado

      let teste = false;
      itemsGrupoConvenio.value.forEach(index => {
        console.log("index", index);
        if (index.grupoProdutoId == viewModelConvenio.value.grupoProdutoId) {
          teste = true;
        }
      });

      if (teste) {
        let lengBrEs = lang();
        Swal.fire({
          icon: "warning",
          title: `${lengBrEs.atencao}`,
          text: `${lengBrEs.grupoProdutoCadastrado}`,
        });
      } else {
        if (
          viewModelConvenio.value.grupoProdutoId &&
          viewModelConvenio.value.percentualDesconto
        ) {
          salvaGrupoConveio();
        } else {
          let lengBrEs = lang();
          Swal.fire({
            icon: "warning",
            title: `${lengBrEs.atencao}`,
            text: `${lengBrEs.PreenchaOCampo}`,
          });
        }
      }
      teste = false;
    };
    const validaCadastroEndereco = () => {
      //valida os itens obrigatorios do cadastro
      if (
        viewModelEndereco.value.rua &&
        viewModelEndereco.value.numero &&
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
    const salvaGrupoConveio = () => {
      let viewModelValue = viewModel.value.convenioGrupos;
      let viewModelItens = viewModelConvenio.value;
      let itemsEdicao = itemsGrupoConvenio.value;
      let viewModelItemEdicaoJson = JSON.parse(
        JSON.stringify(viewModelConvenio.value)
      );
      let labelGrupoProduto;
      const filtroLabel = index => {
        if (index.value == viewModelConvenio.value.grupoProdutoId) {
          labelGrupoProduto = index.label;
        }
      };

      if (viewModelItens.id == undefined || viewModelItens.id == "") {
        viewModelItens.id = uuidv4();
        viewModelValue.push(viewModelItemEdicaoJson);
        var itensGrid;
        retornoGrupoConvenio.forEach(filtroLabel);
        itensGrid = ref({
          id: viewModelItens.id,
          grupoProdutoId: viewModelItens.grupoProdutoId,
          grupoProdutoLabel: labelGrupoProduto,
          percentualDesconto: viewModelItens.percentualDesconto,
          custoReferenciaPrecoVenda: viewModelItens.custoReferenciaPrecoVenda,
          persistido: viewModelItens.persistido,
        });
        itemsGrupoConvenio.value.push(itensGrid.value);
        limparCamposConvenioGrupo();
      } else {
        //editar
        var intemParaEditar = "vazil";
        const filtrando = value => {
          if (value.id == viewModelItens.id) {
            intemParaEditar = value;
          }
        };
        retornoGrupoConvenio.forEach(filtroLabel);
        itemsEdicao.filter(filtrando);
        let registroEdicaoRetornoFiltro = intemParaEditar;
        registroEdicaoRetornoFiltro.grupoProdutoId =
          viewModelItemEdicaoJson.grupoProdutoId;
        registroEdicaoRetornoFiltro.grupoProdutoLabel = labelGrupoProduto;
        registroEdicaoRetornoFiltro.percentualDesconto =
          viewModelItemEdicaoJson.percentualDesconto;
        registroEdicaoRetornoFiltro.custoReferenciaPrecoVenda =
          viewModelItemEdicaoJson.custoReferenciaPrecoVenda;
        registroEdicaoRetornoFiltro.persistido =
          viewModelItemEdicaoJson.persistido;
        registroEdicaoRetornoFiltro.grupoProdutoLabel =
          viewModelItemEdicaoJson.grupoProdutoLabel;
        limparCamposConvenioGrupo();
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

    const limpaForm = () => {
      viewModel.value.id = ref(getId());
      viewModel.value.nome = ref("");
      viewModel.value.tipoPessoa = ref();
      viewModel.value.cpfCnpj = ref("");
      viewModel.value.snAtivo = ref(true);

      viewModel.value.identificadorConvenio = ref();
      viewModel.value.visitadorId = ref();
      viewModel.value.ieConvenio = ref("");
      viewModel.value.desconto = ref();
      viewModel.value.acrescimo = ref();
      viewModel.value.manifesto = ref();
      viewModel.value.diaRecebimento = ref();
      viewModel.value.cadastroFarmacia = ref("");
      viewModel.value.codigoPerdigao = ref("");
      viewModel.value.diasPrimeiroVencimento = ref();
      viewModel.value.bloqueado = ref(false);
      viewModel.value.ieAutorizaParcelamento = ref(false);
      viewModel.value.b2bEnviaEcommerce = ref(false);
      viewModel.value.permiteRateio = ref(false);
      viewModel.value.enderecoComprovanteVenda = ref(false);
      viewModel.value.etiquetaId = ref();
      viewModel.value.aplicaDescontoProduto = ref();

      viewModel.value.enderecos = ref([]);
      viewModel.value.telefones = ref([]);
      viewModel.value.contatos = ref([]);
      viewModel.value.convenioGrupos = ref([]);
      itemsEndereco = ref([]);
      itemsContato = ref([]);
      itemsTelefone = ref([]);
      itemsDadosBancarios = ref([]);
      itemsGrupoConvenio = ref([]);
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

    const limparCamposConvenioGrupo = () => {
      viewModelConvenio.value.id = ref();
      viewModelConvenio.value.grupoProdutoId = ref("");
      viewModelConvenio.value.percentualDesconto = ref("");
      viewModelConvenio.value.custoReferenciaPrecoVenda = ref("");
      viewModelConvenio.value.persistido = ref("");
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
    const onDeleteGrupoProduto = item => {
      try {
        var indexGrid = itemsGrupoConvenio.value.indexOf(item);
        itemsGrupoConvenio.value.splice(indexGrid, 1);
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
    const onEditConvenioGrupo = e => {
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
            onDeleteGrupoProduto(e.item);
          }
        });
      } else {
        let contato = itemsGrupoConvenio.value;
        let id = e.item.id;
        let filtrado;
        const filtar = index => {
          if (index.id == id) {
            filtrado = index;
          }
        };
        contato.forEach(filtar);
        viewModelConvenio.value.id = filtrado.id;
        viewModelConvenio.value.grupoProdutoId = filtrado.grupoProdutoId;
        viewModelConvenio.value.percentualDesconto =
          filtrado.percentualDesconto;
        viewModelConvenio.value.custoReferenciaPrecoVenda =
          filtrado.snAcustoReferenciaPrecoVendaivo;
        viewModelConvenio.value.persistido = filtrado.persistido;
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

    const ObterPessoa = async id => {
      var retorno = await servico.getId(id);
      console.log("retorno", retorno);
      viewModel.value.id = retorno.id;
      viewModel.value.nome = retorno.nome;
      viewModel.value.tipoPessoa = parseInt(retorno.tipoPessoa);
      viewModel.value.cpfCnpj = retorno.cpfCnpj;
      viewModel.value.identificadorConvenio = parseInt(
        retorno.identificadorConvenio
      );
      viewModel.value.visitadorId = retorno.visitadorId;
      viewModel.value.ieConvenio = retorno.ieConvenio;
      viewModel.value.desconto = retorno.desconto;
      viewModel.value.acrescimo = retorno.acrescimo;
      viewModel.value.manifesto = retorno.manifesto;
      viewModel.value.diaRecebimento = retorno.diaRecebimento;
      viewModel.value.cadastroFarmacia = retorno.cadastroFarmacia;
      viewModel.value.diasPrimeiroVencimento = retorno.diasPrimeiroVencimento;
      viewModel.value.etiquetaId = retorno.etiquetaId;
      viewModel.value.enderecoComprovanteVenda =
        retorno.enderecoComprovanteVenda;
      viewModel.value.bloqueado = retorno.bloqueado;
      viewModel.value.ieAutorizaParcelamento = retorno.ieAutorizaParcelamento;
      viewModel.value.b2bEnviaEcommerce = retorno.b2bEnviaEcommerce;
      viewModel.value.permiteRateio = retorno.permiteRateio;
      viewModel.value.permiteRateio = retorno.snAtivo;

      if (retorno.telefones == null) {
        retorno.telefones = [];
      }
      if (retorno.enderecos == null) {
        retorno.enderecos = [];
      }
      if (retorno.contatos == null) {
        retorno.contatos = [];
      }
      if (retorno.convenioGrupos == null) {
        retorno.convenioGrupos = [];
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
      if (retorno.convenioGrupos.length) {
        itemsGrupoConvenio.value = retorno.convenioGrupos;
        viewModel.value.convenioGrupos.push(retorno.convenioGrupos);
      }
    };

    try {
      console.log("id:", convenioId);
      if (
        convenioId !== undefined &&
        viewModel.value.id !== store.state.emptyGuid
      ) {
        ObterPessoa(convenioId);
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
      optionsVisitador,
      preencherSeletorBairro,
      optionsPais,
      optionsEstado,
      limparCamposEndereco,
      preencherSeletorEstado,
      preencherSeletorCidade,
      viewModelContato,
      onDeleteEndereco,
      onDeleteGrupoProduto,
      onEditEndereco,
      onDeleteContato,
      onEditContato,
      limpaCamposContato,
      optionsTipoTelefone,
      buscaCep,
      optionsidentificador,
      validaCadastroEndereco,
      validaCadastroTelefone,
      validaCadastroContato,
      replaceCpfCnpj,
      optionsGrupoProduto,
      viewModelConvenio,
      validaCadastroGrupoConveio,
      salvaGrupoConveio,
      itemsGrupoConvenio,
      hColumnsGrupoConvenio,
      onEditConvenioGrupo,
      optionsEtiqueta,
      limparCamposConvenioGrupo,
      mostrarBtnSalvar,
      placeholderNome,
      placeholderTipoPessoa,
      placeholderCpfCnpj,
      placeholderIndentificador,
      placeholderVisitador,
      placeholderEscricaoEstadual,
      placeholderDesconto,
      placeholderAcrecimo,
      placeholderManifesto,
      placeholderDiasRecebimento,
      placeholderCadastroFarmacia,
      placeholderDiasPrimeiroVencimento,
      placeholderEtiqueta,
      placeholderGrupoProduto,
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
      placeholderCodigoPerdigao,
      atualizartraducaoParametros,
      limpaForm,
      salvaForm,
    };
  },
};
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
<style scoped>
.buttonsActions {
  position: fixed;
  bottom: 10px;
}
</style>
