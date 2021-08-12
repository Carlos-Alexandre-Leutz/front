/* eslint-disable no-unused-vars */
import RequisicoesPadrao from "../../requisicoes.js";


const getGridPage = async page => {
    let instance = new RequisicoesPadrao();
    return instance.obterGridPages(page, "grupoProduto/obter-grid");
};

const add = async grupo => {
    let instance = new RequisicoesPadrao();
    return instance.inserir(grupo, "grupoProduto/novo");
};

const getId = async id => {
    let instance = new RequisicoesPadrao();
    return instance.obterById(id, "grupoProduto/obter");
};

const edit = async grupoProduto => {
    let instance = new RequisicoesPadrao();
    return instance.editar(grupoProduto, "grupoProduto/editar");
};

const remove = async id => {
    let instance = new RequisicoesPadrao();
    return instance.remover(id, "grupoProduto/remover");
};

const getSeletorTipos = async() => {
    let instance = new RequisicoesPadrao();
    return await instance.obterSeletor("grupoProduto/obter-seletor-tipos");
};

const user = { getId, add, edit, remove, getSeletorTipos, getGridPage };

export default user;