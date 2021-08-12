/* eslint-disable no-unused-vars */
import RequisicoesPadrao from "../../requisicoes.js";


const getGridPage = async page => {
    let instance = new RequisicoesPadrao();
    return instance.obterGridPages(page, "estado/obter-grid");
};

const getId = async id => {
    let instance = new RequisicoesPadrao();
    return instance.obterById(id, "estado/obter");
};

const add = async estado => {
    let instance = new RequisicoesPadrao();
    return instance.inserir(estado, "estado/novo");
};

const edit = async estado => {
    console.log("estado:", estado);
    let instance = new RequisicoesPadrao();
    return instance.editar(estado, "estado/editar");
};

const remove = async id => {
    let instance = new RequisicoesPadrao();
    return instance.remover(id, "estado/remover");
};

const obterSeletorPais = async() => {
    let instance = new RequisicoesPadrao();
    return instance.obterSeletor("pais/obter-seletor-paises");
}

const obterSeletorEstado = async() => {
    let instance = new RequisicoesPadrao();
    return instance.obterSeletor("estado/obter-seletor-estados");
}

const user = { getId, add, edit, remove, obterSeletorPais, obterSeletorEstado, getGridPage };

export default user;