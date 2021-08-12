/* eslint-disable no-unused-vars */
import RequisicoesPadrao from "../../requisicoes.js";


const getGridPage = async page => {
    let instance = new RequisicoesPadrao();
    return instance.obterGridPages(page, "dci/obter-grid");
};
const add = async dci => {
    let instance = new RequisicoesPadrao();
    return instance.inserir(dci, "dci/novo");
};

const getId = async id => {
    let instance = new RequisicoesPadrao();
    return instance.obterById(id, "dci/obter");
};

const edit = async dci => {
    let instance = new RequisicoesPadrao();
    return instance.editar(dci, "dci/editar");
};

const remove = async id => {
    let instance = new RequisicoesPadrao();
    return instance.remover(id, "dci/remover");
};

const dci = { getId, add, edit, remove, getGridPage };

export default dci;