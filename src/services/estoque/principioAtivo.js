/* eslint-disable no-unused-vars */
import RequisicoesPadrao from "../../requisicoes.js";


const getGridPage = async page => {
    let instance = new RequisicoesPadrao();
    return instance.obterGridPages(page, "principioAtivo/obter-grid");
};
const getId = async id => {
    let instance = new RequisicoesPadrao();
    return instance.obterById(id, "principioAtivo/obter");
};

const add = async princioAtivo => {
    let instance = new RequisicoesPadrao();
    return instance.inserir(princioAtivo, "principioAtivo/novo");
};

const edit = async princioAtivo => {
    let instance = new RequisicoesPadrao();
    return instance.editar(princioAtivo, "principioAtivo/editar");
};

const remove = async id => {
    let instance = new RequisicoesPadrao();
    return instance.remover(id, "principioAtivo/remover");
}

const user = { getId, add, edit, remove, getGridPage };

export default user;