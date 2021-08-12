/* eslint-disable no-unused-vars */
import RequisicoesPadrao from "../../requisicoes.js";

const getGridPage = async page => {
    let instance = new RequisicoesPadrao();
    return instance.obterGridPages(page, "pais/obter-grid");
};

const add = async pais => {
    let instance = new RequisicoesPadrao();
    return instance.inserir(pais, "pais/novo");
};

const getId = async id => {
    let instance = new RequisicoesPadrao();
    return instance.obterById(id, "pais/obter");
};

const edit = async pais => {
    let instance = new RequisicoesPadrao();
    return instance.editar(pais, "pais/editar");
};

const remove = async id => {
    let instance = new RequisicoesPadrao();
    return instance.remover(id, "pais/remover");
};

const user = { getId, add, edit, remove, getGridPage };

export default user;