/* eslint-disable no-unused-vars */
import RequisicoesPadrao from "../../requisicoes";

const getGrid = async() => {
    let instance = new RequisicoesPadrao();
    return instance.obterGrid("banco/obter-grid");
};
const getGridPage = async page => {
    let instance = new RequisicoesPadrao();
    return instance.obterGridPages(page, "banco/obter-grid");
};

const add = async banco => {
    let instance = new RequisicoesPadrao();
    return instance.inserir(banco, "banco/novo");
};

const getId = async id => {
    let instance = new RequisicoesPadrao();
    return instance.obterById(id, "banco/obter");
};

const edit = async banco => {
    let instance = new RequisicoesPadrao();
    return instance.editar(banco, "banco/editar");
};

const remove = async id => {
    let instance = new RequisicoesPadrao();
    return instance.remover(id, "banco/remover");
};

const banco = { getGrid, getId, add, edit, remove, getGridPage };

export default banco;