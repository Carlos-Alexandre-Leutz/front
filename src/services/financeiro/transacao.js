/* eslint-disable no-unused-vars */
import RequisicoesPadrao from "../../requisicoes.js";

const getGrid = async() => {
    let instance = new RequisicoesPadrao();
    return instance.obterGrid("transacao/obter-grid");
};
const getGridPage = async page => {
    let instance = new RequisicoesPadrao();
    return instance.obterGridPages(page, "transacao/obter-grid");
};

const add = async formaPagamento => {
    let instance = new RequisicoesPadrao();
    return instance.inserir(formaPagamento, "transacao/novo");
};

const getId = async id => {
    let instance = new RequisicoesPadrao();
    return instance.obterById(id, "transacao/obter");
};

const edit = async formaPagamento => {
    let instance = new RequisicoesPadrao();
    return instance.editar(formaPagamento, "transacao/editar");
};

const remove = async id => {
    let instance = new RequisicoesPadrao();
    return instance.remover(id, "transacao/remover");
};

const getSeletor = async() => {
    let instance = new RequisicoesPadrao();
    return instance.obterSelectPlanoConta("planoConta/obter-select-plano-conta");
};
const getSeletorFornecedor = async() => {
    let instance = new RequisicoesPadrao();
    return instance.obterSelectPlanoConta("fornecedor/obter-seletor-fornecedor");
};
const getSeletorPessoa = async() => {
    let instance = new RequisicoesPadrao();
    return instance.obterSelectPlanoConta("pessoa/obter-seletor-pessoa");
};

const formaPagamento = { getGrid, getId, add, edit, remove, getGridPage, getSeletor, getSeletorFornecedor, getSeletorPessoa };

export default formaPagamento;