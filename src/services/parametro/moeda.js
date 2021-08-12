/* eslint-disable no-unused-vars */
import RequisicoesPadrao from "../../requisicoes";


const getGridPage = async page => {
    let instance = new RequisicoesPadrao();
    return instance.obterGridPages(page, "moeda/obter-grid");
};

const add = async grupo => {
    let instance = new RequisicoesPadrao();
    return instance.inserir(grupo, "moeda/novo");
};

const getId = async id => {
    let instance = new RequisicoesPadrao();
    return instance.obterById(id, "moeda/obter");
};

const edit = async grupoProduto => {
    let instance = new RequisicoesPadrao();
    return instance.editar(grupoProduto, "moeda/editar");
};

const remove = async id => {
    let instance = new RequisicoesPadrao();
    return instance.remover(id, "moeda/remover");
};

const getSeletorTipos = async() => {
    let instance = new RequisicoesPadrao();
    return await instance.obterSeletor("moeda/obter-seletor-tipos");
};

const user = { getId, add, edit, remove, getSeletorTipos, getGridPage };

export default user;