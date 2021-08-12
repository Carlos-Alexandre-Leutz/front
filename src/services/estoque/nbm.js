/* eslint-disable no-unused-vars */
import RequisicoesPadrao from "../../requisicoes.js";


const getGridPage = async page => {
    let instance = new RequisicoesPadrao();
    return instance.obterGridPages(page, "nbm/obter-grid");
};
const add = async nbm => {
    let instance = new RequisicoesPadrao();
    return instance.inserir(nbm, "nbm/novo");
};

const getId = async id => {
    let instance = new RequisicoesPadrao();
    return instance.obterById(id, "nbm/obter");
};

const edit = async nbm => {
    let instance = new RequisicoesPadrao();
    return instance.editar(nbm, "nbm/editar");
};

const remove = async id => {
    let instance = new RequisicoesPadrao();
    return instance.remover(id, "nbm/remover");
};

const nbm = { getId, add, edit, remove, getGridPage };

export default nbm;