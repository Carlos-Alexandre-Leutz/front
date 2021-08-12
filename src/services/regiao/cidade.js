/* eslint-disable no-unused-vars */
import RequisicoesPadrao from "../../requisicoes.js";


const getGridPage = async page => {
    let instance = new RequisicoesPadrao();
    return instance.obterGridPages(page, "cidade/obter-grid");
};

const getId = async id => {
    let instance = new RequisicoesPadrao();
    return instance.obterById(id, "cidade/obter");
};

const add = async cidade => {
    console.log("cidade:", cidade);
    let instance = new RequisicoesPadrao();
    return instance.inserir(cidade, "cidade/novo");
};

const edit = async cidade => {
    console.log("cidade:", cidade);
    let instance = new RequisicoesPadrao();
    return instance.editar(cidade, "cidade/editar");
};

const remove = async id => {
    let instance = new RequisicoesPadrao();
    return instance.remover(id, "cidade/remover");
};

const getSeletorEstados = async() => {
    let instance = new RequisicoesPadrao();
    return instance.obterSeletor("estado/obter-seletor-estados");
}

const obterSeletorCidade = async() => {
    let instance = new RequisicoesPadrao();
    return instance.obterSeletor("cidade/obter-seletor-cidades");
}

const obterSeletorCidadePorEstado = async estadoId => {
    let instance = new RequisicoesPadrao();
    return instance.obterById(estadoId, "cidade/obter-seletor-cidades-por-estado");
}


const user = { getId, add, edit, remove, getSeletorEstados, obterSeletorCidade, obterSeletorCidadePorEstado, getGridPage };

export default user;