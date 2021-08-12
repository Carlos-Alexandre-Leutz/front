<template>
  <div>
    <Tabs :tabs="tabs"> </Tabs>

    <form @submit="validarForm">
      <!--Inicio da tab de Pessoa -->
      <div v-if="tabs[0].active">
        <div class="row">
          <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <div class="card shadow">
              <header class="card-header">
                <strong class="align-self-center">Manutenção de Pessoa</strong>
              </header>
              <div class="card-body">
                <div class="row">
                  <div class="col">
                    <div class="form-group">
                      <small
                        >Campos com * são de preenchimento obrigatório</small
                      >
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-8 col-md-8 col-lg-8 col-xl-8">
                    <div class="form-group">
                      <label>* Nome</label>
                      <input
                        class="form-control"
                        type="text"
                        placeholder="Digite o Nome"
                        required
                        v-model="viewModelPessoa.nome"
                      />
                    </div>
                  </div>
                  <div class="col-sm-4 col-md-4 col-lg-4 col-xl-4">
                    <div class="form-group">
                      <label>Tipo de Pessoa</label>
                      <Multiselect
                        v-model="viewModelPessoa.tipoPessoa"
                        placeholder="Selecione o Ncm"
                        :options="optionsTipoPessoa"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-4 col-md-4 col-lg-4 col-xl-4">
                    <div class="form-group">
                      <label>* Documento Fiscal</label>
                      <input
                        class="form-control"
                        type="text"
                        placeholder="Digite o Documento Fiscal"
                        v-model="viewModelPessoa.documentoFiscal"
                      />
                    </div>
                  </div>
                  <div
                    class="col-sm-4 col-md-4 col-lg-4 col-xl-4"
                    v-if="viewModelPessoa.tipoPessoa === '1'"
                  >
                    <div class="form-group">
                      <label>Inscrição Estadual</label>
                      <input
                        class="form-control"
                        type="text"
                        placeholder="Digite a Inscrição Estadual"
                        v-model="viewModelPessoa.inscricaoEstadual"
                      />
                    </div>
                  </div>
                  <div
                    class="col-sm-4 col-md-4 col-lg-4 col-xl-4"
                    v-if="viewModelPessoa.tipoPessoa === '0'"
                  >
                    <div class="form-group">
                      <label>RG</label>
                      <input
                        class="form-control"
                        type="text"
                        placeholder="Digite o RG"
                        v-model="viewModelPessoa.rg"
                      />
                    </div>
                  </div>
                  <div class="col-sm-4 col-md-4 col-lg-4 col-xl-4">
                    <div class="form-group">
                      <label>Home Page</label>
                      <input
                        class="form-control"
                        type="text"
                        placeholder="Digite a Home Page"
                        v-model="viewModelPessoa.homePage"
                      />
                    </div>
                  </div>
                </div>
                <div class="row" v-if="viewModelPessoa.tipoPessoa === '1'">
                  <div class="col-sm-8 col-md-8 col-lg-8 col-xl-8">
                    <div class="form-group">
                      <label>Nome Fantasia</label>
                      <input
                        class="form-control"
                        type="text"
                        placeholder="Digite o Nome Fantasia"
                        v-model="viewModelPessoa.nomeFantasia"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-2 col-md-1 col-lg-1 col-xl-1">
                    <div
                      class="form-group form-check"
                      style="padding-top: 20px"
                    >
                      <input
                        type="checkbox"
                        id="isFornecedor"
                        class="form-check-input"
                        v-model="viewModelPessoa.fornecedor"
                        v-on:click="
                          habilitaTab('Fornecedor', viewModelPessoa.fornecedor)
                        "
                      />
                      <label class="form-check-label" for="isFornecedor"
                        >Fornecedor</label
                      >
                    </div>
                  </div>
                  <div
                    class="col-sm-2 col-md-1 col-lg-1 col-xl-1"
                    v-if="viewModelPessoa.tipoPessoa === '0'"
                  >
                    <div
                      class="form-group form-check"
                      style="padding-top: 20px"
                    >
                      <input
                        type="checkbox"
                        id="isFuncionario"
                        class="form-check-input"
                        v-model="viewModelPessoa.funcionario"
                        v-on:click="
                          habilitaTab(
                            'Funcionário',
                            viewModelPessoa.funcionario
                          )
                        "
                      />
                      <label class="form-check-label" for="isFuncionario"
                        >Funcionário</label
                      >
                    </div>
                  </div>
                  <div class="col-sm-2 col-md-1 col-lg-1 col-xl-1">
                    <div
                      class="form-group form-check"
                      style="padding-top: 20px"
                    >
                      <input
                        type="checkbox"
                        id="isVisitador"
                        class="form-check-input"
                        v-model="viewModelPessoa.visitador"
                        v-on:click="
                          habilitaTab('Visitador', viewModelPessoa.visitador)
                        "
                      />
                      <label class="form-check-label" for="isVisitador"
                        >Visitador</label
                      >
                    </div>
                  </div>
                  <div class="col-sm-2 col-md-1 col-lg-1 col-xl-1">
                    <div
                      class="form-group form-check"
                      style="padding-top: 20px"
                    >
                      <input
                        type="checkbox"
                        id="isConvenio"
                        class="form-check-input"
                        v-model="viewModelPessoa.convenio"
                        v-on:click="
                          habilitaTab('Convênio', viewModelPessoa.convenio)
                        "
                      />
                      <label class="form-check-label" for="isConvenio"
                        >Convênio</label
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--Fim da tab de Pessoa -->
      <!--Inicio da tab de Endereço -->
      <div v-if="tabs[1].active">
        <div class="row">
          <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <div class="card shadow">
              <header class="card-header">
                <strong class="align-self-center">Endereços</strong>
              </header>
              <div class="card-body">
                <div class="row">
                  <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div class="card shadow">
                      <header class="card-header">
                        <strong class="align-self-center"
                          >Manutenção de Endereços</strong
                        >
                      </header>
                      <div class="card-body">
                        <div class="row">
                          <div class="col">
                            <div class="form-group">
                              <small
                                >Campos com * são de preenchimento
                                obrigatório</small
                              >
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2">
                            <div class="form-group">
                              <label>* CEP</label>
                              <input
                                class="form-control"
                                type="number"
                                maxlength="9"
                                placeholder="Digite o CEP"
                                v-model="viewModelEndereco.cep"
                              />
                            </div>
                          </div>
                          <div class="col-sm-9 col-md-9 col-lg-9 col-xl-9">
                            <div class="form-group">
                              <label>* Rua</label>
                              <input
                                class="form-control"
                                type="text"
                                maxlength="50"
                                placeholder="Digite a Rua"
                                v-model="viewModelEndereco.rua"
                              />
                            </div>
                          </div>
                          <div class="col-sm-1 col-md-1 col-lg-1 col-xl-1">
                            <div class="form-group">
                              <label>* Número</label>
                              <input
                                class="form-control"
                                type="text"
                                maxlength="7"
                                placeholder="Digite o Número"
                                v-model="viewModelEndereco.numero"
                              />
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-sm-5 col-md-5 col-lg5 col-xl-5">
                            <div class="form-group">
                              <label>Complemento</label>
                              <input
                                class="form-control"
                                type="text"
                                maxlength="20"
                                placeholder="Digite o Complemento"
                                v-model="viewModelEndereco.complemento"
                              />
                            </div>
                          </div>
                          <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2">
                            <div class="form-group">
                              <label>* UF</label>
                              <Multiselect
                                v-model="viewModelEndereco.estadoId"
                                placeholder="Selecione a UF"
                                :options="optionsEstados"
                                :searchable="true"
                                v-on:select="preencherSeletorCidades()"
                              />
                            </div>
                          </div>
                          <div class="col-sm-4 col-md-4 col-lg-4 col-xl-4">
                            <div class="form-group">
                              <label>* Cidade</label>
                              <Multiselect
                                v-model="viewModelEndereco.cidadeId"
                                placeholder="Selecione a Cidade"
                                :options="optionsCidades"
                                :searchable="true"
                              />
                            </div>
                          </div>
                          <div class="col-sm-1 col-md-1 col-lg-1 col-xl-1">
                            7
                            <div
                              class="form-group form-check"
                              style="padding-top: 20px"
                            >
                              <input
                                type="checkbox"
                                id="enderecoPrincipal"
                                class="form-check-input"
                                v-model="viewModelEndereco.padrao"
                              />
                              <label
                                class="form-check-label"
                                for="enderecoPrincipal"
                                >Endereço Padrão?</label
                              >
                            </div>
                          </div>
                        </div>
                        <div class="align-right mt-3 ml-1">
                          <button
                            class="btn-padrao btn-confirmar mr-1"
                            type="button"
                            v-on:click="salvarEndereco()"
                          >
                            Confirmar
                          </button>
                          <button
                            class="btn btn-secondary"
                            type="button"
                            v-on:click="limparCamposEndereco()"
                          >
                            Cancelar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <br />
                </div>
                <suspense>
                  <template #default>
                    <Table
                      class="table-bordless table-striped"
                      :headerColumns="hColumnsEndereco"
                      :items="itemsEndereco"
                      action="true"
                      @on-action-click="onEdit"
                    >
                      <template v-slot:table-header-actions>
                        <div
                          class="d-flex flex-center justify-content-center align-items-center"
                        >
                          Ações
                        </div>
                      </template>
                      <template v-slot:table-actions>
                        <div
                          class="d-flex flex-center justify-content-center align-items-center"
                        >
                          <button
                            data-edit="1"
                            class="btn btn-sm btn-warning mr-2"
                            type="button"
                          >
                            Editar
                          </button>
                          <button
                            data-edit="0"
                            class="btn btn-sm btn-danger"
                            type="button"
                          >
                            Deletar
                          </button>
                        </div>
                      </template>
                    </Table>
                  </template>
                  <template #fallback>Carregando tabela...</template>
                </suspense>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--Fim da tab de Endereço -->
      <!--Inicio da tab de Contato -->
      <div v-if="tabs[2].active">
        <div class="row">
          <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <div class="card shadow">
              <header class="card-header">
                <strong class="align-self-center">Contatos</strong>
              </header>
              <div class="card-body">
                <div class="row">
                  <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div class="card shadow">
                      <header class="card-header">
                        <strong class="align-self-center"
                          >Manutenção de Contatos</strong
                        >
                      </header>
                      <div class="card-body">
                        <div class="row">
                          <div class="col">
                            <div class="form-group">
                              <small
                                >Campos com * são de preenchimento
                                obrigatório</small
                              >
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-sm-4 col-md-4 col-lg-4 col-xl-4">
                            <div class="form-group">
                              <label>Endereço</label>
                              <Multiselect
                                v-model="viewModelContato.enderecoId"
                                placeholder="Selecione o Endereço"
                                :options="optionsEnderecos"
                                :searchable="true"
                              />
                            </div>
                          </div>
                          <div class="col-sm-4 col-md-4 col-lg-4 col-xl-4">
                            <div class="form-group">
                              <label>* Nome</label>
                              <input
                                class="form-control"
                                type="text"
                                maxlength="50"
                                placeholder="Digite o Nome"
                                v-model="viewModelContato.nome"
                              />
                            </div>
                          </div>
                          <div class="col-sm-4 col-md-4 col-lg-4 col-xl-4">
                            <div class="form-group">
                              <label>Email</label>
                              <input
                                class="form-control"
                                type="text"
                                maxlength="60"
                                placeholder="Digite o E-Mail"
                                v-model="viewModelContato.email"
                              />
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
                            <div class="form-group">
                              <label>Tipo Telefone</label>
                              <Multiselect
                                v-model="viewModelContato.tipoTelefone"
                                placeholder="Selecione o Tipo de Telefone"
                                :options="optionsTipoTelefones"
                                :searchable="false"
                              />
                            </div>
                          </div>
                          <div class="col-sm-1 col-md-1 col-lg-1 col-xl-1">
                            <div class="form-group">
                              <label>DDD</label>
                              <input
                                class="form-control"
                                type="number"
                                maxlength="2"
                                placeholder="Digite o DDD"
                                v-model="viewModelContato.ddd"
                              />
                            </div>
                          </div>
                          <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
                            <div class="form-group">
                              <label>Telefone</label>
                              <input
                                class="form-control"
                                type="number"
                                maxlength="8"
                                placeholder="Digite o Telefone"
                                v-model="viewModelContato.telefone"
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
                                id="contatoPadrao"
                                class="form-check-input"
                                v-model="viewModelContato.padrao"
                              />
                              <label
                                class="form-check-label"
                                for="contatoPadrao"
                                >Contato Padrão?</label
                              >
                            </div>
                          </div>
                        </div>
                        <div class="align-right mt-3 ml-1">
                          <button
                            class="btn-padrao btn-confirmar mr-1"
                            type="button"
                            v-on:click="salvarContato()"
                          >
                            Confirmar
                          </button>
                          <button
                            class="btn btn-secondary"
                            type="button"
                            v-on:click="limparCamposContato()"
                          >
                            Cancelar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <suspense>
                  <template #default>
                    <Table
                      class="table-bordless table-striped"
                      :headerColumns="hColumnsContato"
                      :items="itemsContato"
                      action="true"
                      @on-action-click="onEdit"
                    >
                      <template v-slot:table-header-actions>
                        <div
                          class="d-flex flex-center justify-content-center align-items-center"
                        >
                          Ações
                        </div>
                      </template>
                      <template v-slot:table-actions>
                        <div
                          class="d-flex flex-center justify-content-center align-items-center"
                        >
                          <button
                            data-edit="1"
                            class="btn btn-sm btn-warning mr-2"
                            type="button"
                          >
                            Editar
                          </button>
                          <button
                            data-edit="0"
                            class="btn btn-sm btn-danger"
                            type="button"
                          >
                            Deletar
                          </button>
                        </div>
                      </template>
                    </Table>
                  </template>
                  <template #fallback>Carregando tabela...</template>
                </suspense>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--Fim da tab de Contato -->
      <!--Inicio da tab de Dados Bancários -->
      <div v-if="tabs[3].active">
        <div class="row">
          <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <div class="card shadow">
              <header class="card-header">
                <strong class="align-self-center">Dados Bancários</strong>
              </header>
              <div class="card-body">
                <div class="row">
                  <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div class="card shadow">
                      <header class="card-header">
                        <strong class="align-self-center"
                          >Manutenção de Dados Bancários</strong
                        >
                      </header>
                      <div class="card-body">
                        <div class="row">
                          <div class="col">
                            <div class="form-group">
                              <small
                                >Campos com * são de preenchimento
                                obrigatório</small
                              >
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-sm-4 col-md-4 col-lg-4 col-xl-4">
                            <div class="form-group">
                              <label>* Banco</label>
                              <Multiselect
                                v-model="viewModelDadosBancarios.bancoId"
                                placeholder="Selecione o Banco"
                                :options="optionsBancos"
                                :searchable="true"
                              />
                            </div>
                          </div>
                          <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2">
                            <div class="form-group">
                              <label>* Agência</label>
                              <input
                                class="form-control"
                                type="text"
                                maxlength="6"
                                placeholder="Informe a Agência"
                                v-model="viewModelDadosBancarios.agencia"
                              />
                            </div>
                          </div>
                          <div class="col-sm-1 col-md-1 col-lg-1 col-xl-1">
                            <div class="form-group">
                              <label>DV</label>
                              <input
                                class="form-control"
                                type="text"
                                maxlength="1"
                                placeholder="Informe o DV da Agência"
                                v-model="viewModelDadosBancarios.dvAgencia"
                              />
                            </div>
                          </div>
                          <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
                            <div class="form-group">
                              <label>* Conta</label>
                              <input
                                class="form-control"
                                type="text"
                                maxlength="15"
                                placeholder="Informe a Conta"
                                v-model="viewModelDadosBancarios.conta"
                              />
                            </div>
                          </div>
                          <div class="col-sm-1 col-md-1 col-lg-1 col-xl-1">
                            <div class="form-group">
                              <label>DV</label>
                              <input
                                class="form-control"
                                type="text"
                                maxlength="1"
                                placeholder="Informe o DV da Conta"
                                v-model="viewModelDadosBancarios.dvConta"
                              />
                            </div>
                          </div>
                        </div>
                        <div class="align-right mt-3 ml-1">
                          <button
                            class="btn-padrao btn-confirmar mr-1"
                            type="button"
                            v-on:click="salvarDadosBancarios()"
                          >
                            Confirmar
                          </button>
                          <button
                            class="btn btn-secondary"
                            type="button"
                            v-on:click="limparCamposDadosBancarios()"
                          >
                            Cancelar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <suspense>
                  <template #default>
                    <Table
                      class="table-bordless table-striped"
                      :headerColumns="hColumnsDadosBancarios"
                      :items="itemsDadosBancarios"
                      action="true"
                      @on-action-click="onEdit"
                    >
                      <template v-slot:table-header-actions>
                        <div
                          class="d-flex flex-center justify-content-center align-items-center"
                        >
                          Ações
                        </div>
                      </template>
                      <template v-slot:table-actions>
                        <div
                          class="d-flex flex-center justify-content-center align-items-center"
                        >
                          <button
                            data-edit="1"
                            class="btn btn-sm btn-warning mr-2"
                            type="button"
                          >
                            Editar
                          </button>
                          <button
                            data-edit="0"
                            class="btn btn-sm btn-danger"
                            type="button"
                          >
                            Deletar
                          </button>
                        </div>
                      </template>
                    </Table>
                  </template>
                  <template #fallback>Carregando tabela...</template>
                </suspense>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--Fim da tab de Dados Bancários -->
      <!--Inicio da tab de Funcionário -->
      <div v-if="tabs[4].active">
        <div class="row">
          <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <div class="card shadow">
              <header class="card-header">
                <strong class="align-self-center"
                  >Manutenção de Funcionário</strong
                >
              </header>
              <div class="card-body">
                <div class="row">
                  <div class="col">
                    <div class="form-group">
                      <small
                        >Campos com * são de preenchimento obrigatório</small
                      >
                    </div>
                  </div>
                </div>
                <div class="row"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--Fim da tab de Funcionário -->
      <!--Inicio da tab de Fornecedor -->
      <div v-if="tabs[5].active">
        <div class="row">
          <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <div class="card shadow">
              <header class="card-header">
                <strong class="align-self-center"
                  >Manutenção de Fornecedor</strong
                >
              </header>
              <div class="card-body">
                <div class="row">
                  <div class="col">
                    <div class="form-group">
                      <small
                        >Campos com * são de preenchimento obrigatório</small
                      >
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-4 col-md-4 col-lg-4 col-xl-4">
                    <div class="form-group">
                      <label>Endereço</label>
                      <Multiselect
                        v-model="viewModelFornecedor.enderecoId"
                        placeholder="Selecione o Endereço"
                        :options="optionsEnderecos"
                        :searchable="true"
                      />
                    </div>
                  </div>
                  <div class="col-sm-4 col-md-4 col-lg-4 col-xl-4">
                    <div class="form-group">
                      <label>Contato</label>
                      <Multiselect
                        v-model="viewModelFornecedor.contatoId"
                        placeholder="Selecione o Contato"
                        :options="optionsContatos"
                        :searchable="true"
                      />
                    </div>
                  </div>
                  <div class="col-sm-4 col-md-4 col-lg-4 col-xl-4">
                    <div class="form-group">
                      <label>Dados Bancários</label>
                      <Multiselect
                        v-model="viewModelFornecedor.dadosBancariosId"
                        placeholder="Selecione os Dados Bancários"
                        :options="optionsDadosBancarios"
                        :searchable="true"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-4 col-md-4 col-lg-4 col-xl-4">
                    <div class="form-group">
                      <label>Responsável Técnico</label>
                      <input
                        class="form-control"
                        type="text"
                        maxlength="50"
                        placeholder="Digite nome do Responsável Técnico"
                        v-model="viewModelFornecedor.responsavelTecnico"
                      />
                    </div>
                  </div>
                  <div class="col-sm-4 col-md-4 col-lg-4 col-xl-4">
                    <div class="form-group">
                      <label>Licença Mapa</label>
                      <input
                        class="form-control"
                        type="text"
                        maxlength="50"
                        placeholder="Digite a Licença do Mapa"
                        v-model="viewModelFornecedor.licencaMapa"
                      />
                    </div>
                  </div>
                  <div class="col-sm-4 col-md-4 col-lg-2 col-xl-2">
                    <div class="form-group">
                      <label>Alvará Sanitário</label>
                      <input
                        class="form-control"
                        type="text"
                        maxlength="10"
                        placeholder="Digite o Alvará Sanitário"
                        v-model="viewModelFornecedor.alvaraSanitario"
                      />
                    </div>
                  </div>
                  <div class="col-sm-4 col-md-4 col-lg-2 col-xl-2">
                    <div class="form-group">
                      <label>Autorização Especial</label>
                      <input
                        class="form-control"
                        type="text"
                        maxlength="10"
                        placeholder="Digite a Autorização Especial"
                        v-model="viewModelFornecedor.autorizacaoEspecial"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-4 col-md-4 col-lg-4 col-xl-4">
                    <div class="form-group">
                      <label>Autorização Funcionamento</label>
                      <input
                        class="form-control"
                        type="text"
                        maxlength="10"
                        placeholder="Digite a Autorização de Funcionamento"
                        v-model="viewModelFornecedor.autorizacaoFuncionamento"
                      />
                    </div>
                  </div>
                  <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2">
                    <div class="form-group">
                      <label>Cadastro Farmácia</label>
                      <input
                        class="form-control"
                        type="text"
                        maxlength="10"
                        placeholder="Digite o Cadastro da Farmácia"
                        v-model="viewModelFornecedor.cadastroFarmacia"
                      />
                    </div>
                  </div>
                  <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
                    <div class="form-group">
                      <label>Valor Mínimo Pedido</label>
                      <input
                        class="form-control"
                        type="number"
                        maxlength="10"
                        placeholder="Digite o Valor Mínimo"
                        v-model="viewModelFornecedor.valorMinimoPedido"
                      />
                    </div>
                  </div>
                  <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
                    <div class="form-group">
                      <label>Previsão de Entrega (dias)</label>
                      <input
                        class="form-control"
                        type="number"
                        maxlength="10"
                        placeholder="Digite a Previsão de Entrega"
                        v-model="viewModelFornecedor.previsaoEntrega"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-12 col-md-12 col-lg-12 col-xl-6">
                    <div class="form-group">
                      <label>Forma de Pagamento</label>
                      <input
                        class="form-control"
                        type="text"
                        maxlength="100"
                        placeholder="Digite a Forma de Pagamento"
                        v-model="viewModelFornecedor.formaPagamento"
                      />
                    </div>
                  </div>
                  <div class="col-sm-12 col-md-12 col-lg-12 col-xl-6">
                    <div class="form-group">
                      <label>Frete</label>
                      <input
                        class="form-control"
                        type="text"
                        maxlength="100"
                        placeholder="Digite informações do Frete"
                        v-model="viewModelFornecedor.frete"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-4 col-md-4 col-lg-4 col-xl-4">
                    <div class="form-group">
                      <label>Host</label>
                      <input
                        class="form-control"
                        type="text"
                        maxlength="50"
                        placeholder="Digite o Host"
                        v-model="viewModelFornecedor.hostFtp"
                      />
                    </div>
                  </div>
                  <div class="col-sm-4 col-md-4 col-lg-4 col-xl-4">
                    <div class="form-group">
                      <label>Usuário</label>
                      <input
                        class="form-control"
                        type="text"
                        maxlength="15"
                        placeholder="Digite o Usuário"
                        v-model="viewModelFornecedor.usuarioFtp"
                      />
                    </div>
                  </div>
                  <div class="col-sm-4 col-md-4 col-lg-4 col-xl-4">
                    <div class="form-group">
                      <label>Senha</label>
                      <input
                        class="form-control"
                        type="password"
                        maxlength="15"
                        placeholder="Digite a Senha"
                        v-model="viewModelFornecedor.senhaFtp"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div class="form-group">
                      <label>Observações</label>
                      <input
                        class="form-control"
                        type="text"
                        maxlength="100"
                        placeholder="Digite as Observações"
                        v-model="viewModelFornecedor.observacao"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--Fim da tab de Fornecedor -->
      <!--Inicio da tab de Visitador -->
      <div v-if="tabs[6].active">
        <div class="row">
          <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <div class="card shadow">
              <header class="card-header">
                <strong class="align-self-center"
                  >Manutenção de Visitador</strong
                >
              </header>
              <div class="card-body">
                <div class="row">
                  <div class="col">
                    <div class="form-group">
                      <small
                        >Campos com * são de preenchimento obrigatório</small
                      >
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-5 col-md-5 col-lg-5 col-xl-5">
                    <div class="form-group">
                      <label>Endereço</label>
                      <Multiselect
                        v-model="viewModelVisitador.enderecoId"
                        placeholder="Selecione o Endereço"
                        :options="optionsEnderecos"
                        :searchable="true"
                      />
                    </div>
                  </div>
                  <div class="col-sm-5 col-md-5 col-lg-5 col-xl-5">
                    <div class="form-group">
                      <label>Contato</label>
                      <Multiselect
                        v-model="viewModelVisitador.contatoId"
                        placeholder="Selecione o Contato"
                        :options="optionsContatos"
                        :searchable="true"
                      />
                    </div>
                  </div>
                  <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2">
                    <div class="form-group">
                      <label>% Comissão</label>
                      <input
                        class="form-control"
                        type="number"
                        maxlength="8"
                        placeholder="Digite o Percentual de Comissão"
                        v-model="viewModelVisitador.percentualComissao"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--Fim da tab de Visitador -->
      <!--Inicio da tab de Convenio -->
      <div v-if="tabs[7].active">
        <div class="row">
          <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <div class="card shadow">
              <header class="card-header">
                <strong class="align-self-center"
                  >Manutenção de Convênio</strong
                >
              </header>
              <div class="card-body">
                <div class="row">
                  <div class="col">
                    <div class="form-group">
                      <small
                        >Campos com * são de preenchimento obrigatório</small
                      >
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-4 col-md-4 col-lg-4 col-xl-4">
                    <div class="form-group">
                      <label>Endereço</label>
                      <Multiselect
                        v-model="viewModelConvenio.enderecoId"
                        placeholder="Selecione o Endereço"
                        :options="optionsEnderecos"
                        :searchable="true"
                      />
                    </div>
                  </div>
                  <div class="col-sm-4 col-md-4 col-lg-4 col-xl-4">
                    <div class="form-group">
                      <label>Contato</label>
                      <Multiselect
                        v-model="viewModelConvenio.contatoId"
                        placeholder="Selecione o Contato"
                        :options="optionsContatos"
                        :searchable="true"
                      />
                    </div>
                  </div>
                  <div class="col-sm-4 col-md-4 col-lg-4 col-xl-4">
                    <div class="form-group">
                      <label>Identificador Convênio</label>
                      <Multiselect
                        v-model="viewModelConvenio.identificadorConvenio"
                        placeholder="Selecione o Identificador do Convênio"
                        :options="optionsIdentificadorConvenio"
                        :searchable="true"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2">
                    <div class="form-group">
                      <label>% Desconto</label>
                      <input
                        class="form-control"
                        type="number"
                        maxlength="8"
                        placeholder="Digite % de Desconto"
                        v-model="viewModelConvenio.percentualDesconto"
                      />
                    </div>
                  </div>
                  <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2">
                    <div class="form-group">
                      <label>% Acréscimo</label>
                      <input
                        class="form-control"
                        type="number"
                        maxlength="8"
                        placeholder="Digite % de Acréscimo"
                        v-model="viewModelConvenio.percentualAcrescimo"
                      />
                    </div>
                  </div>
                  <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2">
                    <div class="form-group">
                      <label>% Manifesto</label>
                      <input
                        class="form-control"
                        type="number"
                        maxlength="8"
                        placeholder="Digite % Manifesto"
                        v-model="viewModelConvenio.percentualManifesto"
                      />
                    </div>
                  </div>
                  <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2">
                    <div class="form-group">
                      <label>Dia Recebimento</label>
                      <input
                        class="form-control"
                        type="number"
                        maxlength="8"
                        placeholder="Digite o Dia de Recebimento"
                        v-model="viewModelConvenio.diaRecebimento"
                      />
                    </div>
                  </div>
                  <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
                    <div class="form-group">
                      <label>Dias Primeiro Vencimento</label>
                      <input
                        class="form-control"
                        type="number"
                        maxlength="8"
                        placeholder="Digite a Qtd de Dias Para o Primeiro Vencimento"
                        v-model="viewModelConvenio.diasPrimeiroVencimento"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-4 col-md-4 col-lg-4 col-xl-4">
                    <div class="form-group">
                      <label>Cadastro Farmácia</label>
                      <input
                        class="form-control"
                        type="number"
                        maxlength="20"
                        placeholder="Digite o Cadastro da Farmácia"
                        v-model="viewModelConvenio.cadastroFarmacia"
                      />
                    </div>
                  </div>
                  <div class="col-sm-1 col-md-1 col-lg-1 col-xl-1">
                    <div
                      class="form-group form-check"
                      style="padding-top: 20px"
                    >
                      <input
                        type="checkbox"
                        id="bloqueado"
                        class="form-check-input"
                        v-model="viewModelConvenio.bloqueado"
                      />
                      <label class="form-check-label" for="bloqueado"
                        >Bloqueado?</label
                      >
                    </div>
                  </div>
                  <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2">
                    <div
                      class="form-group form-check"
                      style="padding-top: 20px"
                    >
                      <input
                        type="checkbox"
                        id="permiteParcelamento"
                        class="form-check-input"
                        v-model="viewModelConvenio.permiteParcelamento"
                      />
                      <label class="form-check-label" for="permiteParcelamento"
                        >Permite Parcelamento?</label
                      >
                    </div>
                  </div>
                  <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2">
                    <div
                      class="form-group form-check"
                      style="padding-top: 20px"
                    >
                      <input
                        type="checkbox"
                        id="enviarEcommerce"
                        class="form-check-input"
                        v-model="viewModelConvenio.enviarEcommerce"
                      />
                      <label class="form-check-label" for="enviarEcommerce"
                        >Enviar E-Commerce?</label
                      >
                    </div>
                  </div>
                  <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
                    <div
                      class="form-group form-check"
                      style="padding-top: 20px"
                    >
                      <input
                        type="checkbox"
                        id="permitirRateio"
                        class="form-check-input"
                        v-model="viewModelConvenio.permitirRateio"
                      />
                      <label class="form-check-label" for="permitirRateio"
                        >Permitir Rateio? (Funcionário/Empresa)</label
                      >
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-4 col-md-4 col-lg-4 col-xl-4">
                    <div class="form-group">
                      <label>Visitador</label>
                      <Multiselect
                        v-model="viewModelConvenio.visitadorId"
                        placeholder="Selecione o Visitador"
                        :options="optionsVisitador"
                        :searchable="true"
                      />
                    </div>
                  </div>
                  <div class="col-sm-4 col-md-4 col-lg-4 col-xl-4">
                    <div class="form-group">
                      <label>Etiqueta</label>
                      <Multiselect
                        v-model="viewModelConvenio.etiquetaId"
                        placeholder="Selecione a Etiqueta"
                        :options="optionsEtiqueta"
                        :searchable="true"
                      />
                    </div>
                  </div>
                  <div class="col-sm-4 col-md-4 col-lg-4 col-xl-4">
                    <div
                      class="form-group form-check"
                      style="padding-top: 20px"
                    >
                      <input
                        type="checkbox"
                        id="enderecoComprovanteVenda"
                        class="form-check-input"
                        v-model="viewModelConvenio.enderecoComprovanteVenda"
                      />
                      <label
                        class="form-check-label"
                        for="enderecoComprovanteVenda"
                        >Utilizar Endereço do Convênio no Comprovante de
                        Venda?</label
                      >
                    </div>
                  </div>
                </div>
                <div class="row" style="margin-top: 10px">
                  <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div class="card shadow">
                      <header class="card-header">
                        <strong class="align-self-center"
                          >Desconto Diferenciado em Grupos Drogaria</strong
                        >
                      </header>
                      <div class="card-body">
                        <div class="row">
                          <div class="col-sm-4 col-md-4 col-lg-4 col-xl-4">
                            <div class="form-group">
                              <label>* Grupo Produto</label>
                              <Multiselect
                                v-model="viewModelConvenioGrupo.grupoProdutoId"
                                placeholder="Selecione o Grupo de Produto"
                                :options="optionsGrupoProduto"
                                :searchable="true"
                              />
                            </div>
                          </div>
                          <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2">
                            <div class="form-group">
                              <label>% Desconto</label>
                              <input
                                class="form-control"
                                type="number"
                                maxlength="8"
                                placeholder="Digite % de Desconto"
                                v-model="
                                  viewModelConvenioGrupo.percentualDesconto
                                "
                              />
                            </div>
                          </div>
                          <div class="col-sm-3 col-md-3 col-lg-3 col-xl-2">
                            <div
                              class="form-group form-check"
                              style="padding-top: 20px"
                            >
                              <input
                                type="checkbox"
                                id="aplicaDescontoProduto"
                                class="form-check-input"
                                v-model="
                                  viewModelConvenioGrupo.aplicaDescontoProduto
                                "
                              />
                              <label
                                class="form-check-label"
                                for="aplicaDescontoProduto"
                                >Aplica Desconto Produto?</label
                              >
                            </div>
                          </div>
                          <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
                            <div
                              class="form-group form-check"
                              style="padding-top: 20px"
                            >
                              <input
                                type="checkbox"
                                id="custoReferenciaPrecoVenda"
                                class="form-check-input"
                                v-model="viewModelConvenioGrupo.custoReferenciaPrecoVenda"
                              />
                              <label
                                class="form-check-label"
                                for="custoReferenciaPrecoVenda"
                                >Custo Referência como Preço Venda?</label
                              >
                            </div>
                          </div>
                        </div>
                        <div class="align-right mt-3 ml-1">
                          <button
                            class="btn-padrao btn-confirmar mr-1"
                            type="button"
                            v-on:click="salvarGrupoConvenio()"
                          >
                            Confirmar
                          </button>
                          <button
                            class="btn btn-secondary"
                            type="button"
                            v-on:click="limparCamposConvenioGrupo()"
                          >
                            Cancelar
                          </button>
                        </div>
                        <suspense>
                          <template #default>
                            <Table
                              class="table-bordless table-striped"
                              :headerColumns="hColumnsConvenioGrupo"
                              :items="itemsConvenioGrupo"
                              action="true"
                              @on-action-click="onEdit"
                              style="padding-top: 20px"
                            >
                              <template v-slot:table-header-actions>
                                <div
                                  class="d-flex flex-center justify-content-center align-items-center"
                                >
                                  Ações
                                </div>
                              </template>
                              <template v-slot:table-actions>
                                <div
                                  class="d-flex flex-center justify-content-center align-items-center"
                                >
                                  <button
                                    data-edit="1"
                                    class="btn btn-sm btn-warning mr-2"
                                    type="button"
                                  >
                                    Editar
                                  </button>
                                  <button
                                    data-edit="0"
                                    class="btn btn-sm btn-danger"
                                    type="button"
                                  >
                                    Deletar
                                  </button>
                                </div>
                              </template>
                            </Table>
                          </template>
                          <template #fallback>Carregando tabela...</template>
                        </suspense>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--Fim da tab de Convenio -->
      <div class="d-flex mt-3 ml-1">
        <button class="btn btn-success mr-2" type="submit">
          Salvar Pessoa
        </button>
        <button
          class="btn btn-secondary"
          type="reset"
          @click="$router.push('/pessoa/1')"
        >
          Voltar
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref, inject, watch, reactive, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import Tabs from "../../../components/tabs/Tabs";
import Multiselect from "@vueform/multiselect";

import Table from "../../../components/table/tablesimple";

import servicoPessoa from "../../../services/pessoa/pessoa";
import servicoEndereco from "../../../services/endereco.js";
import servicoContato from "../../../services/contato/contato.js";
import servicoDadosBancarios from "../../../services/dadosBancarios.js";
import servicoSeletor from "../../../services/seletor.js";
import servicoConvenio from "../../../services/convenio.js";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";
import enumSelect from "../../../services/enum/enum.js";
import traducaoAlertas from "../../../plugins/i18n/alertas";

export default {
  setup() {
    const {
      params: { pessoaId },
    } = useRoute();
    const store = useStore();
    const tipoPessoa = "";
    const defaultModal = inject("defaultModal");
    const defaultModalActions = inject("defaultModalActions");

    const getId = () => {
      return pessoaId ? pessoaId : store.state.emptyGuid;
    };

    //declaração dos arrays que preenchem as tables
    var itemSelected = ref(null);
    var itemsEndereco = ref([]);
    var itemsContato = ref([]);
    var itemsDadosBancarios = ref([]);
    var itemsConvenioGrupo = ref([]);

    //declaração dos arrays que preenchem os seletores
    var optionsTipoPessoa = ref([]);
    var listaSeletorCidades = [];
    var optionsCidades = ref([]);
    var listaSeletorEstados = [];
    var optionsEstados = ref([]);
    var optionsEnderecos = ref([]);
    var optionsTipoTelefones = ref([]);
    var optionsContatos = ref([]);
    var optionsBancos = ref([]);
    var optionsDadosBancarios = ref([]);
    var optionsIdentificadorConvenio = ref([]);
    var optionsVisitador = ref([]);
    var optionsEtiqueta = ref([]);
    var optionsGrupoProduto = ref([]);

    //declaração das columns das tables
    var hColumnsEndereco = ref([
      {
        key: "endereco",
        label: "Endreço",
      },
      {
        key: "cep",
        label: "Cep",
      },
      {
        key: "cidade",
        label: "Cidade",
      },
      {
        key: "tipoEndereco",
        label: "Tipo Endereço",
      },
    ]);

    var hColumnsContato = ref([
      {
        key: "nome",
        label: "Nome",
      },
      {
        key: "email",
        label: "E-Mail",
      },
      {
        key: "telefone",
        label: "Telefone",
      },
    ]);

    var hColumnsDadosBancarios = ref([
      {
        key: "banco",
        label: "Banco",
      },
      {
        key: "agencia",
        label: "Agência",
      },
      {
        key: "conta",
        label: "Conta",
      },
    ]);

    var hColumnsConvenioGrupo = ref([
      {
        key: "grupo",
        label: "Grupo Produto",
      },
      {
        key: "percDescontoGrupo",
        label: "Desconto (%)",
      },
      {
        key: "aplicaDescontoProduto",
        label: "Aplica Desconto Produto?",
      },
      {
        key: "custoReferenciaPrecoVenda",
        label: "Custo Referência como Preço Venda?",
      },
    ]);

    //inicio da declaracao dos view models
    var viewModelPessoa = ref({
      id: ref(getId()),
      nome: ref(""),
      documentoFiscal: ref(""),
      inscricaoEstadual: ref(""),
      rg: ref(""),
      homePage: ref(""),
      nomeFantasia: ref(""),
      tipoPessoa: ref(""),
      fornecedor: ref(false),
      fornecedorId: ref(""),
      funcionario: ref(false),
      funcionarioId: ref(""),
      convenio: ref(false),
      convenioId: ref(""),
      visitador: ref(false),
      visitadorId: ref(""),
      enderecos: ref([]),
      contatos: ref([]),
      dadosBancarios: ref([]),
      fornecedorObjeto: ref(""),
      visitadorObjeto: ref(""),
      convenioObjeto: ref(""),
    });

    var viewModelEndereco = ref({
      //id: ref(uuidv4()),
      id: ref(""),
      pessoaId: ref(viewModelPessoa.value.id),
      rua: ref(""),
      numero: ref(""),
      complemento: ref(""),
      cep: ref(""),
      estadoId: ref(""),
      estado: ref(""),
      cidadeId: ref(""),
      cidade: ref(""),
      tipoEndereco: ref(""),
      padrao: ref(false),
      persistido: Boolean,
      endereco: ref(""),
    });

    var viewModelContato = ref({
      id: ref(uuidv4()),
      pessoaId: ref(viewModelPessoa.value.id),
      enderecoId: ref(""),
      nome: ref(""),
      email: ref(""),
      tipoTelefone: ref(""),
      ddd: ref(""),
      telefone: ref(""),
      persistido: Boolean,
      padrao: ref(false),
    });

    var viewModelDadosBancarios = ref({
      id: ref(uuidv4()),
      pessoaId: ref(viewModelPessoa.value.id),
      bancoId: ref(""),
      banco: ref(""),
      agencia: ref(""),
      dvAgencia: ref(""),
      conta: ref(""),
      dvConta: ref(""),
      persistido: Boolean,
    });

    var viewModelFornecedor = ref({
      id: ref(uuidv4()),
      pessoaId: ref(viewModelPessoa.value.id),
      enderecoId: ref(""),
      contatoId: ref(""),
      dadosBancariosId: ref(""),
      usuarioFtp: ref(""),
      senhaFtp: ref(""),
      hostFtp: ref(""),
      valorMinimoPedido: ref(""),
      responsavelTecnico: ref(""),
      cadastroFarmacia: ref(""),
      autorizacaoFuncionamento: ref(""),
      autorizacaoEspecial: ref(""),
      alvaraSanitario: ref(""),
      licencaMapa: ref(""),
      // planoContasId: ref(""),
      formaPagamento: ref(""),
      previsaoEntrega: ref(""),
      observacao: ref(""),
      frete: ref(""),
    });

    var viewModelVisitador = ref({
      id: ref(uuidv4()),
      pessoaId: ref(viewModelPessoa.value.id),
      enderecoId: ref(""),
      contatoId: ref(""),
      percentualComissao: ref(""),
    });

    var viewModelConvenio = ref({
      id: ref(uuidv4()),
      pessoaId: ref(viewModelPessoa.value.id),
      enderecoId: ref(""),
      contatoId: ref(""),
      percentualDesconto: ref(""),
      percentualAcrescimo: ref(""),
      percentualManifesto: ref(""),
      diaRecebimento: ref(""),
      diasPrimeiroVencimento: ref(""),
      identificadorConvenio: ref(""),
      cadastroFarmacia: ref(""),
      bloqueado: ref(false),
      permiteParcelamento: ref(false),
      enviarEcommerce: ref(false),
      permitirRateio: ref(false),
      visitadorId: ref(""),
      etiqueta: ref(""),
      enderecoComprovanteVenda: ref(false),
      convenioGrupos: ref([]),
    });

    var viewModelConvenioGrupo = ref({
      id: ref(uuidv4()),
      convenioId: ref(viewModelConvenio.value.id),
      grupoProdutoId: ref(""),
      grupoProduto: ref(""),
      percentualDesconto: ref(""),
      aplicaDescontoProduto: ref(false),
      custoReferenciaPrecoVenda: ref(false),
      persistido: Boolean,
    });
    //fim da declaração dos view models

    //declaração das tabs
    const tabs = reactive([
      { name: "Pessoa", active: true },
      { name: "Endereço", active: false },
      { name: "Contato", active: false },
      { name: "Dados Bancários", active: false },
      {
        name: "Funcionário",
        active: false,
        hidden:
          !viewModelPessoa.value.funcionario &&
          viewModelPessoa.value.tipoPessoa !== "0",
      },
      {
        name: "Fornecedor",
        active: false,
        hidden: !viewModelPessoa.value.fornecedor,
      },
      {
        name: "Visitador",
        active: false,
        hidden: !viewModelPessoa.value.visitador,
      },
      {
        name: "Convênio",
        active: false,
        hidden: !viewModelPessoa.value.convenio,
      },
    ]);

    const onEdit = e => {
      if (!e || !e.target || !e.target.dataset) {
        console.log("Objeto Errado");
        return;
      }
      if (e.target.dataset.edit == 1) {
        //endereco
        if (tabs[1].active) {
          var endereco = viewModelPessoa.value.enderecos.find(
            end => end.id === e.item.id
          );
          viewModelEndereco.value = JSON.parse(JSON.stringify(endereco));
        }
        //contato
        if (tabs[2].active) {
          var contato = viewModelPessoa.value.contatos.find(
            c => c.id === e.item.id
          );
          viewModelContato.value = JSON.parse(JSON.stringify(contato));
        }
        //dados bancarios
        if (tabs[3].active) {
          var dadosBancarios = viewModelPessoa.value.dadosBancarios.find(
            d => d.id === e.item.id
          );
          viewModelDadosBancarios.value = JSON.parse(
            JSON.stringify(dadosBancarios)
          );
        }
        //convenio
        if (tabs[7].active) {
          var convenioGrupo = viewModelConvenio.value.convenioGrupos.find(
            c => c.id === e.item.id
          );
          viewModelConvenioGrupo.value = JSON.parse(
            JSON.stringify(convenioGrupo)
          );
        }
      }

      if (e.target.dataset.edit == 0) {
        console.log("Deletar", defaultModal);
        defaultModal.show = true;
        defaultModal.title = "Confirmar exclusão!";
        defaultModal.bodyMessage = "Você confirma exclusão deste registro?";
        itemSelected = e.item;
      }
    };

    onMounted(async () => {
      const obterSeletor = async url => {
        var retornoBack = await servicoSeletor.obterSeletorGenerico(url);
        var returnMetodo = [];
        retornoBack.forEach(e => {
          returnMetodo.push({ value: e.id, label: e.descricao });
        });
        return returnMetodo;
      };

      const obterSeletorById = async (url, id) => {
        var retornoBack = await servicoSeletor.obterSeletorById(url, id);
        var returnMetodo = [];
        retornoBack.forEach(e => {
          returnMetodo.push({ value: e.id, label: e.descricao });
        });
        return returnMetodo;
      };
      const preencherSelect = async () => {
        optionsTipoPessoa.value = enumSelect.PessoaTipo;
      };
      preencherSelect();

      const onDelete = async item => {
        try {
          console.log("item: ", item);
          if (tabs[1].active) {
            //endereco
            var endereco = viewModelPessoa.value.enderecos.find(
              e => e.id == item.id
            );
            if (endereco.persistido) {
              await servicoEndereco.remove(endereco.id, store.state.contaFake);
            } else {
              var indexViewModel = viewModelPessoa.value.enderecos.indexOf(
                endereco
              );
              viewModelPessoa.value.enderecos.splice(indexViewModel, 1);
            }
            var indexGrid = itemsEndereco.value.indexOf(item);
            itemsEndereco.value.splice(indexGrid, 1);
          }
          if (tabs[2].active) {
            //contato
            var contato = viewModelPessoa.value.contatos.find(
              c => c.id == item.id
            );
            if (contato.persistido) {
              await servicoContato.remove(contato.id, store.state.contaFake);
            } else {
              var indexViewModelContato = viewModelPessoa.value.contatos.indexOf(
                contato
              );
              viewModelPessoa.value.contatos.splice(indexViewModelContato, 1);
            }
            var indexGridContato = itemsContato.value.indexOf(item);
            itemsContato.value.splice(indexGridContato, 1);
          }
          if (tabs[3].active) {
            //dados bancarios
            var dadosBancarios = viewModelPessoa.value.dadosBancarios.find(
              d => d.id == item.id
            );
            if (dadosBancarios.persistido) {
              await servicoDadosBancarios.remove(
                dadosBancarios.id,
                store.state.contaFake
              );
            } else {
              var indexViewModelDadosBanc = viewModelPessoa.value.dadosBancarios.indexOf(
                dadosBancarios
              );
              viewModelPessoa.value.dadosBancarios.splice(
                indexViewModelDadosBanc,
                1
              );
            }
            var indexGridDb = itemsDadosBancarios.value.indexOf(item);
            itemsDadosBancarios.value.splice(indexGridDb, 1);
          }
          if (tabs[7].active) {
            //convenio
            console.log(item.id);
            var convenioGrupo = viewModelConvenio.value.convenioGrupos.find(
              c => c.id == item.id
            );
            console.log("convenioGrupo:", convenioGrupo);
            if (convenioGrupo.persistido) {
              await servicoConvenio.removeConvenioGrupo(
                convenioGrupo.id,
                store.state.contaFake
              );
            } else {
              var indexViewModelConvenioGrupo = viewModelConvenio.value.convenioGrupo.indexOf(
                convenioGrupo
              );
              viewModelConvenio.value.convenioGrupos.splice(
                indexViewModelConvenioGrupo,
                1
              );
            }
            var indexGridCg = itemsConvenioGrupo.value.indexOf(item);
            itemsConvenioGrupo.value.splice(indexGridCg, 1);
          }
        } catch (err) {
          console.error("Erro ao buscar Endereco!", err);
        }
      };
      watch(defaultModalActions, actions => {
        if (actions.confirmAction) {
          onDelete(itemSelected);
        }
      });

      const ObterPessoa = async id => {
        var retorno = await servicoPessoa.getId(id);
        viewModelPessoa.value.id = retorno.id;
        viewModelPessoa.value.nome = retorno.nome;
        viewModelPessoa.value.documentoFiscal = retorno.documentoFiscal;
        viewModelPessoa.value.inscricaoEstadual = retorno.inscricaoEstadual;
        viewModelPessoa.value.rg = retorno.rg;
        viewModelPessoa.value.homePage = retorno.homePage;
        viewModelPessoa.value.nomeFantasia = retorno.nomeFantasia;
        viewModelPessoa.value.tipoPessoa = retorno.tipoPessoa;
        viewModelPessoa.value.fornecedor = retorno.fornecedor;
        viewModelPessoa.value.convenio = retorno.convenio;
        viewModelPessoa.value.visitador = retorno.visitador;
        viewModelPessoa.value.enderecos = retorno.enderecos;
        viewModelPessoa.value.contatos = retorno.contatos;
        viewModelPessoa.value.dadosBancarios = retorno.dadosBancarios;
        viewModelPessoa.value.fornecedorObjeto = retorno.fornecedorObjeto;
        viewModelPessoa.value.visitadorObjeto = retorno.visitadorObjeto;
        viewModelPessoa.value.convenioObjeto = retorno.convenioObjeto;

        if (viewModelPessoa.value.fornecedor) {
          viewModelFornecedor.value = viewModelPessoa.value.fornecedorObjeto;
          tabs[5].hidden = false;
        }
        if (viewModelPessoa.value.visitador) {
          viewModelVisitador.value = viewModelPessoa.value.visitadorObjeto;
          tabs[6].hidden = false;
        }
        if (viewModelPessoa.value.convenio) {
          viewModelConvenio.value = viewModelPessoa.value.convenioObjeto;
          tabs[7].hidden = false;
        }

        console.log("pessoa: ", viewModelPessoa.value);
      };

      const PreencherGrids = async pessoaId => {
        itemsEndereco.value = await servicoEndereco.getGridPorPessoa(pessoaId);
        itemsContato.value = await servicoContato.getGridPorPessoa(pessoaId);
        itemsDadosBancarios.value = await servicoDadosBancarios.getGridPorPessoa(
          pessoaId
        );
        console.log("convenioId:", viewModelConvenio.value.id);
        if (viewModelConvenio.value.id !== undefined) {
          itemsConvenioGrupo.value = await servicoConvenio.getGridGrupo(
            viewModelConvenio.value.id
          );
        }
      };

      const PreencherSeletores = async () => {
        optionsTipoPessoa.value = enumSelect.PessoaTipo;

        optionsEstados.value = await obterSeletor(
          "estado/obter-seletor-estados"
        );
        optionsCidades.value = await obterSeletor(
          "cidade/obter-seletor-cidades"
        );
        optionsTipoTelefones.value = enumSelect.PessoaTipoTelefone;

        optionsBancos.value = await obterSeletor("banco/obter-seletor-banco");
        optionsIdentificadorConvenio.value = await obterSeletor(
          "convenio/obter-seletor-identificador-convenio"
        );
        optionsGrupoProduto.value = await obterSeletor(
          "grupoProduto/obter-seletor-grupo-produto"
        );
        //optionsEtiqueta.value = await obterSeletor("");

        optionsEnderecos.value = await obterSeletorById(
          "endereco/obter-seletor-endereco",
          viewModelPessoa.value.id
        );
        optionsContatos.value = await obterSeletorById(
          "contato/obter-seletor-contatos",
          viewModelPessoa.value.id
        );
        optionsDadosBancarios.value = await obterSeletorById(
          "dadosBancarios/obter-seletor-dados-bancarios",
          viewModelPessoa.value.id
        );
        optionsVisitador.value = await obterSeletorById(
          "visitador/obter-seletor-visitador",
          viewModelPessoa.value.id
        );

        listaSeletorEstados.value = optionsEstados.value;
        listaSeletorCidades.value = optionsCidades.value;
      };

      try {
        if (
          pessoaId !== undefined &&
          viewModelPessoa.value.id !== store.state.emptyGuid
        ) {
          console.log(pessoaId);
          await ObterPessoa(pessoaId);
          PreencherGrids(pessoaId);
        }
        PreencherSeletores();
      } catch (err) {
        console.error("Erro ao obter Ncm para edição", err);
      }
    });
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
     // if (viewModelPessoa.value.nome && viewModelPessoa.value.documentoFiscal) {
        // if (
        //   viewModelPessoa.value.nome &&
        //   viewModelPessoa.value.tipoPessoa &&
        //   viewModelPessoa.value.documentoFiscal
        // ) {
          if (viewModelPessoa.value.fornecedor) {
            viewModelPessoa.value.fornecedorObjeto = viewModelFornecedor.value;
          }
          if (viewModelPessoa.value.visitador) {
            viewModelPessoa.value.visitadorObjeto = viewModelVisitador.value;
          }
          if (viewModelPessoa.value.convenio) {
            viewModelPessoa.value.convenioObjeto = viewModelConvenio.value;
          }
          if (
            viewModelPessoa.value.id !== store.state.emptyGuid &&
            viewModelPessoa.value.id !== undefined
          ) {
            servicoPessoa.edit(viewModelPessoa.value).then(response => {
              if (response.status == 200) {
                Swal.fire({
                  icon: "success",
                  title: `${lengBrEs.concluido}`,
                  text: `${lengBrEs.oItem}  ${lengBrEs.foiEditado}.`,
                });
              } else {
                Swal.fire({
                  icon: "warning",
                  title: "Erro",
                  text: `O item  não pode ser editado `,
                });
              }
            });
          } else {
            servicoPessoa.add(viewModelPessoa.value).then(response => {
              if (response.status == 200) {
                Swal.fire({
                  icon: "success",
                  title: "Concluído",
                  text: `O item  foi adicionado `,
                });
              } else {
                Swal.fire({
                  icon: "warning",
                  title: "Erro",
                  text: `O item  não pode ser adicionado `,
                });
              }
            });
          }
        // } else {
        //   Swal.fire({
        //     icon: "warning",
        //     title: "Atenção",
        //     text: `Preencha o tipo de pessoa `,
        //   });
        // }
      // } else {
      //   Swal.fire({
      //     icon: "warning",
      //     title: "Atenção",
      //     text: `Preencha a aba pessoa `,
      //   });
      // }
    };
    return {
      tabs,
      viewModelPessoa,
      viewModelEndereco,
      viewModelContato,
      viewModelDadosBancarios,
      viewModelFornecedor,
      viewModelVisitador,
      viewModelConvenio,
      viewModelConvenioGrupo,
      tipoPessoa,
      optionsTipoPessoa,
      optionsCidades,
      optionsEstados,
      optionsTipoTelefones,
      optionsEnderecos,
      optionsContatos,
      optionsBancos,
      optionsDadosBancarios,
      optionsIdentificadorConvenio,
      optionsVisitador,
      optionsEtiqueta,
      optionsGrupoProduto,
      listaSeletorCidades,
      listaSeletorEstados,
      servicoPessoa,
      servicoSeletor,
      hColumnsEndereco,
      hColumnsContato,
      hColumnsDadosBancarios,
      hColumnsConvenioGrupo,
      itemsEndereco,
      itemsContato,
      itemsDadosBancarios,
      itemsConvenioGrupo,
      onEdit,
      store,
      validarForm,
    };
  },
  async mounted() {},
  methods: {
    habilitaTab(tab, hidden) {
      var tabSelecionada = this.tabs.find(e => e.name == tab);
      tabSelecionada.hidden = hidden;
    },

    async preencherSeletorCidades() {
      var estadoId = this.viewModelEndereco.estadoId;
      this.viewModelEndereco.cidadeId = ref("");
      var retornoBackSeletor = [];
      console.log("estadoId", estadoId);
      if (estadoId == "" || estadoId == undefined) {
        retornoBackSeletor = await this.servicoSeletor.obterSeletorGenerico(
          "cidade/obter-seletor-cidades"
        );
      } else {
        retornoBackSeletor = await this.servicoSeletor.obterSeletorById(
          "cidade/obter-seletor-cidades-por-estado",
          estadoId
        );
      }
      console.log(retornoBackSeletor);
      var returnMetodoCidades = [];
      retornoBackSeletor.forEach(front => {
        returnMetodoCidades.push({ value: front.id, label: front.descricao });
      });
      this.optionsCidades = returnMetodoCidades;
    },

    async salvarEndereco() {
      console.log(this.viewModelEndereco.estadoId);
      console.log(this.viewModelEndereco.cidadeId);

      if (this.viewModelEndereco.estadoId && this.viewModelEndereco.cidadeId) {
        this.viewModelEndereco.estado = this.listaSeletorEstados.value.find(
          f => f.value == this.viewModelEndereco.estadoId
        ).label;
        this.viewModelEndereco.cidade = this.listaSeletorCidades.value.find(
          f => f.value == this.viewModelEndereco.cidadeId
        ).label;

        if (
          this.viewModelEndereco.id == undefined ||
          this.viewModelEndereco.id == ""
        ) {
          this.viewModelEndereco.id = uuidv4();
        }
        var endereco = JSON.parse(JSON.stringify(this.viewModelEndereco));
        var registroEdicao = this.viewModelPessoa.enderecos.find(
          e => e.id == this.viewModelEndereco.id
        );
        if (registroEdicao !== undefined) {
          //atualização do viewmodel
          registroEdicao.value = endereco;
          var item = this.viewModelPessoa.enderecos.find(
            e => e.id == registroEdicao.value.id
          );
          item.rua = registroEdicao.value.rua;
          item.numero = registroEdicao.value.numero;
          item.complemento = registroEdicao.value.complemento;
          item.cep = registroEdicao.value.cep;
          item.estadoId = registroEdicao.value.estadoId;
          item.estado = registroEdicao.value.estado;
          item.cidadeId = registroEdicao.value.cidadeId;
          item.cidade = registroEdicao.value.cidade;
          item.tipoEndereco = registroEdicao.value.tipoEndereco;
          item.padrao = registroEdicao.value.padrao;

          //atualização do grid
          var enderecoLista = this.itemsEndereco.find(
            e => e.id == registroEdicao.value.id
          );
          enderecoLista.endereco =
            registroEdicao.value.rua +
            (registroEdicao.value.numero == ""
              ? ""
              : ", " + registroEdicao.value.numero);
          enderecoLista.cep = registroEdicao.value.cep;
          enderecoLista.cidade = registroEdicao.value.cidade;
          enderecoLista.tipoEndereco = "Faturamento";
        } else {
          endereco.persistido = false;
          this.viewModelPessoa.enderecos.push(endereco);

          var enderecoGrid = ref({
            id: this.viewModelEndereco.id,
            idPessoa: this.viewModelPessoa.id,
            cep: this.viewModelEndereco.cep,
            cidade: this.viewModelEndereco.cidade,
            endereco:
              this.viewModelEndereco.rua +
              (this.viewModelEndereco.numero == ""
                ? ""
                : ", " + this.viewModelEndereco.numero),
            tipoEndereco: "Faturamento",
          });
          this.itemsEndereco.push(enderecoGrid.value);
        }
        this.limparCamposEndereco();
      } else {
        Swal.fire({
          icon: "warning",
          title: "Atenção",
          text: `Preencha todos os campo marcados com *`,
        });
      }
    },

    async salvarContato() {
      if (
        this.viewModelContato.id == undefined ||
        this.viewModelContato.id == ""
      ) {
        this.viewModelContato.id = uuidv4();
      }

      var contato = JSON.parse(JSON.stringify(this.viewModelContato));
      var registroEdicao = this.viewModelPessoa.contatos.find(
        c => c.id == this.viewModelContato.id
      );
      if (registroEdicao !== undefined) {
        registroEdicao.value = contato;
        var item = this.viewModelPessoa.contatos.find(
          c => c.id == registroEdicao.value.id
        );
        item.enderecoId = registroEdicao.value.enderecoId;
        item.nome = registroEdicao.value.nome;
        item.email = registroEdicao.value.email;
        item.tipoTelefone = registroEdicao.value.tipoTelefone;
        item.ddd = registroEdicao.value.ddd;
        item.telefone = registroEdicao.value.telefone;
        item.padrao = registroEdicao.value.padrao;

        var contatoLista = this.itemsContato.find(
          c => c.id == registroEdicao.value.id
        );
        contatoLista.nome = registroEdicao.value.nome;
        contatoLista.email = registroEdicao.value.email;
        contatoLista.telefone =
          (registroEdicao.value.ddd == ""
            ? ""
            : "(" + registroEdicao.value.ddd + ") ") +
          registroEdicao.value.telefone;
      } else {
        contato.persistido = false;
        this.viewModelPessoa.contatos.push(contato);

        var contatoGrid = ref({
          id: this.viewModelContato.id,
          idPessoa: this.viewModelPessoa.id,
          nome: this.viewModelContato.nome,
          email: this.viewModelContato.email,
          telefone:
            (this.viewModelContato.ddd == ""
              ? ""
              : "(" + this.viewModelContato.ddd + ") ") +
            this.viewModelContato.telefone,
        });
        this.itemsContato.push(contatoGrid.value);
      }
      this.limparCamposContato();
    },

    async salvarDadosBancarios() {
      if (this.viewModelDadosBancarios.bancoId) {
        this.viewModelDadosBancarios.banco = this.optionsBancos.find(
          f => f.value == this.viewModelDadosBancarios.bancoId
        ).label;

        if (
          this.viewModelDadosBancarios.id == undefined ||
          this.viewModelDadosBancarios.id == ""
        ) {
          this.viewModelDadosBancarios.id = uuidv4();
        }

        var dadosBancarios = JSON.parse(
          JSON.stringify(this.viewModelDadosBancarios)
        );
        var registroEdicao = this.viewModelPessoa.dadosBancarios.find(
          d => d.id == this.viewModelDadosBancarios.id
        );
        if (registroEdicao !== undefined) {
          registroEdicao.value = dadosBancarios;
          var item = this.viewModelPessoa.dadosBancarios.find(
            d => d.id == registroEdicao.value.id
          );
          item.bancoId = registroEdicao.value.bancoId;
          item.agencia = registroEdicao.value.agencia;
          item.dvAgencia = registroEdicao.value.dvAgencia;
          item.conta = registroEdicao.value.conta;
          item.dvConta = registroEdicao.value.dvConta;

          var dadosBancariosLista = this.itemsDadosBancarios.find(
            d => d.id == registroEdicao.value.id
          );
          dadosBancariosLista.banco = registroEdicao.value.banco;
          dadosBancariosLista.agencia =
            registroEdicao.value.agencia +
            (registroEdicao.value.dvAgencia == ""
              ? ""
              : "-" + registroEdicao.value.dvAgencia);
          dadosBancariosLista.conta =
            registroEdicao.value.conta +
            (registroEdicao.value.dvConta == ""
              ? ""
              : "-" + registroEdicao.value.dvConta);
        } else {
          dadosBancarios.persistido = false;
          this.viewModelPessoa.dadosBancarios.push(dadosBancarios);

          var dadosBancariosGrid = ref({
            id: this.viewModelDadosBancarios.id,
            idPessoa: this.viewModelPessoa.id,
            banco: this.viewModelDadosBancarios.banco,
            agencia:
              this.viewModelDadosBancarios.agencia +
              (this.viewModelDadosBancarios.dvAgencia == ""
                ? ""
                : "-" + this.viewModelDadosBancarios.dvAgencia),
            conta:
              this.viewModelDadosBancarios.conta +
              (this.viewModelDadosBancarios.dvConta == ""
                ? ""
                : "-" + this.viewModelDadosBancarios.dvConta),
          });
          this.itemsDadosBancarios.push(dadosBancariosGrid.value);
        }
        this.limparCamposDadosBancarios();
      } else {
        Swal.fire({
          icon: "warning",
          title: "Atenção",
          text: `Preencha todos os campo marcados com *`,
        });
      }
    },

    async salvarGrupoConvenio() {
      if(this.viewModelConvenioGrupo.grupoProdutoId){
        if (
        this.viewModelConvenioGrupo.id == undefined ||
        this.viewModelConvenioGrupo.id == ""
      ) {
        this.viewModelConvenioGrupo.id = uuidv4();
      }
      var convenioGrupo = JSON.parse(
        JSON.stringify(this.viewModelConvenioGrupo)
      );
      var registroEdicao = this.viewModelConvenio.convenioGrupos.find(
        c => c.id == this.viewModelConvenioGrupo.id
      );
      if (registroEdicao !== undefined) {
        registroEdicao.value = convenioGrupo;

        var item = this.viewModelConvenio.convenioGrupos.find(
          c => c.id == this.viewModelConvenioGrupo.id
        );
        item.grupoProdutoId = registroEdicao.value.grupoProdutoId;
        item.percentualDesconto = registroEdicao.value.percentualDesconto;
        item.aplicaDescontoProduto = registroEdicao.value.aplicaDescontoProduto;
        item.custoReferenciaPrecoVenda =
          registroEdicao.value.custoReferenciaPrecoVenda;

        var convenioGrupoLista = this.itemsConvenioGrupo.find(
          g => g.id == registroEdicao.value.id
        );
        convenioGrupoLista.grupoProduto = registroEdicao.value.grupoProduto;
        convenioGrupoLista.percDescontoGrupo =
          registroEdicao.value.percentualDesconto;
        convenioGrupoLista.aplicaDescontoProduto = registroEdicao.value
          .aplicaDescontoProduto
          ? "Sim"
          : "Não";
        convenioGrupoLista.custoReferenciaPrecoVenda = registroEdicao.value
          .custoReferenciaPrecoVenda
          ? "Sim"
          : "Não";
      } else {
        convenioGrupo.persistido = false;
        this.viewModelConvenio.convenioGrupos.push(convenioGrupo);
        console.log(this.viewModelConvenio.convenioGrupo);
        var convenioGrupoGrid = ref({
          id: this.viewModelConvenioGrupo.id,
          grupo: this.viewModelConvenioGrupo.grupoProduto,
          percDescontoGrupo: this.viewModelConvenioGrupo.percentualDesconto,
          aplicaDescontoProduto: this.viewModelConvenioGrupo
            .aplicaDescontoProduto
            ? "Sim"
            : "Não",
          custoReferenciaPrecoVenda: this.viewModelConvenioGrupo
            .custoReferenciaPrecoVenda
            ? "Sim"
            : "Não",
        });
        this.itemsConvenioGrupo.push(convenioGrupoGrid.value);
      }
      this.limparCamposConvenioGrupo();

      }else{
        Swal.fire({
          icon: "warning",
          title: "Atenção",
          text: `Preencha todos os campo marcados com *`,
        });
      }
      this.viewModelConvenioGrupo.grupoProduto = this.optionsGrupoProduto.find(
        g => g.value == this.viewModelConvenioGrupo.grupoProdutoId
      ).label;
      console.log(this.viewModelConvenio);

    
    },

    limparCamposEndereco() {
      this.viewModelEndereco.id = ref(uuidv4());
      this.viewModelEndereco.cep = ref("");
      this.viewModelEndereco.rua = ref("");
      this.viewModelEndereco.numero = ref("");
      this.viewModelEndereco.complemento = ref("");
      this.viewModelEndereco.estadoId = ref("");
      this.viewModelEndereco.cidadeId = ref("");
      this.viewModelEndereco.tipoEndereco = ref("");
      this.viewModelEndereco.padrao = ref("");
      this.viewModelEndereco.endereco = ref("");
      this.viewModelEndereco.estado = ref("");
      this.viewModelEndereco.cidade = ref("");
    },
    limparCamposContato() {
      this.viewModelContato.id = ref(uuidv4());
      this.viewModelContato.nome = ref("");
      this.viewModelContato.enderecoId = ref("");
      this.viewModelContato.email = ref("");
      this.viewModelContato.tipoTelefone = ref("");
      this.viewModelContato.ddd = ref("");
      this.viewModelContato.telefone = ref("");
      this.viewModelContato.padrao = ref("");
    },
    limparCamposDadosBancarios() {
      this.viewModelDadosBancarios.id = ref(uuidv4());
      this.viewModelDadosBancarios.bancoId = ref("");
      this.viewModelDadosBancarios.banco = ref("");
      this.viewModelDadosBancarios.agencia = ref("");
      this.viewModelDadosBancarios.dvAgencia = ref("");
      this.viewModelDadosBancarios.conta = ref("");
      this.viewModelDadosBancarios.dvConta = ref("");
    },
    limparCamposConvenioGrupo() {
      this.viewModelConvenioGrupo.id = ref(uuidv4());
      this.viewModelConvenioGrupo.grupoProdutoId = ref("");
      this.viewModelConvenioGrupo.grupoProduto = ref("");
      this.viewModelConvenioGrupo.percentualDesconto = ref("");
      this.viewModelConvenioGrupo.aplicaDescontoProduto = ref(false);
      this.viewModelConvenioGrupo.custoReferenciaPrecoVenda = ref(false);
    },
  },
  components: {
    Tabs,
    Multiselect,
    Table,
  },
};
</script>
<style src="@vueform/multiselect/themes/default.css"></style>