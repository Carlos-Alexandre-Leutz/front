/* eslint-disable no-unused-vars */
import RequisicoesPadrao from "../../requisicoes.js";

const getGridPage = async page => {
    let instance = new RequisicoesPadrao();
    return instance.obterGridPages(page, "classe/obter-grid");
};

const add = async classe => {
    let instance = new RequisicoesPadrao();
    return instance.inserir(classe, "classe/novo");
};

const getId = async id => {
    let instance = new RequisicoesPadrao();
    return instance.obterById(id, "classe/obter");
};

const edit = async classe => {
    let instance = new RequisicoesPadrao();
    return instance.editar(classe, "classe/editar");
};

const remove = async id => {
    let instance = new RequisicoesPadrao();
    return instance.remover(id, "classe/remover");
};

const classe = { getId, add, edit, remove, getGridPage };

export default classe;