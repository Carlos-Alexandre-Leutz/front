/* eslint-disable no-unused-vars */
import RequisicoesPadrao from "../../requisicoes.js";


const getGridPage = async page => {
    let instance = new RequisicoesPadrao();
    return instance.obterGridPages(page, "pbm/obter-grid");
};

const add = async pais => {
    let instance = new RequisicoesPadrao();
    return instance.inserir(pais, "pbm/novo");
};

const getId = async id => {
    let instance = new RequisicoesPadrao();
    return instance.obterById(id, "pbm/obter");
};

const edit = async pais => {
    let instance = new RequisicoesPadrao();
    return instance.editar(pais, "pbm/editar");
};

const remove = async id => {
    let instance = new RequisicoesPadrao();
    return instance.remover(id, "pbm/remover");
};

const user = { getId, add, edit, remove, getGridPage };

export default user;