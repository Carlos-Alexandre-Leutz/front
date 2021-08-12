/* eslint-disable no-unused-vars */
import RequisicoesPadrao from "../../requisicoes.js";

const getGrid = async() => {
    let instance = new RequisicoesPadrao();
    return instance.obterGrid("tipoContato/obter-grid");
};
const getGridPage = async page => {
    let instance = new RequisicoesPadrao();
    return instance.obterGridPages(page, "tipoContato/obter-grid");
};

const add = async tipoContato => {
    let instance = new RequisicoesPadrao();
    return instance.inserir(tipoContato, "tipoContato/novo");
};

const getId = async id => {
    let instance = new RequisicoesPadrao();
    return instance.obterById(id, "tipoContato/obter");
};

const edit = async tipoContato => {
    let instance = new RequisicoesPadrao();
    return instance.editar(tipoContato, "tipoContato/editar");
};

const remove = async id => {
    let instance = new RequisicoesPadrao();
    return instance.remover(id, "tipoContato/remover");
};

const tipoContato = { getGridPage, getGrid, getId, add, edit, remove };

export default tipoContato;