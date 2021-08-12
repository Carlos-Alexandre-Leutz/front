/* eslint-disable no-unused-vars */
import RequisicoesPadrao from "../../requisicoes.js";

const getGrid = async() => {
    let instance = new RequisicoesPadrao();
    return instance.obterGrid("formaPagamento/obter-grid");
};
const getGridPage = async page => {
    let instance = new RequisicoesPadrao();
    return instance.obterGridPages(page, "formaPagamento/obter-grid");
};

const add = async formaPagamento => {
    let instance = new RequisicoesPadrao();
    return instance.inserir(formaPagamento, "formaPagamento/novo");
};

const getId = async id => {
    let instance = new RequisicoesPadrao();
    return instance.obterById(id, "formaPagamento/obter");
};

const edit = async formaPagamento => {
    let instance = new RequisicoesPadrao();
    return instance.editar(formaPagamento, "formaPagamento/editar");
};

const remove = async id => {
    let instance = new RequisicoesPadrao();
    return instance.remover(id, "formaPagamento/remover");
};

const formaPagamento = { getGrid, getId, add, edit, remove, getGridPage };

export default formaPagamento;