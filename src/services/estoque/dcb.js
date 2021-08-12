/* eslint-disable no-unused-vars */
import RequisicoesPadrao from "../../requisicoes.js";


const getGridPage = async page => {
    let instance = new RequisicoesPadrao();
    return instance.obterGridPages(page, "dcb/obter-grid");
};
const add = async dcb => {
    let instance = new RequisicoesPadrao();
    return instance.inserir(dcb, "dcb/novo");
};

const getId = async id => {
    let instance = new RequisicoesPadrao();
    return instance.obterById(id, "dcb/obter");
};

const edit = async dcb => {
    let instance = new RequisicoesPadrao();
    return instance.editar(dcb, "dcb/editar");
};

const remove = async id => {
    let instance = new RequisicoesPadrao();
    return instance.remover(id, "dcb/remover");
};

const dcb = { getId, add, edit, remove, getGridPage };

export default dcb;