/* eslint-disable no-unused-vars */
import RequisicoesPadrao from "../../requisicoes";


const getGridPage = async page => {
    let instance = new RequisicoesPadrao();
    return instance.obterGridPages(page, "cotacaomoeda/obter-grid");
};

const add = async grupo => {
    let instance = new RequisicoesPadrao();
    return instance.inserir(grupo, "cotacaomoeda/novo");
};

const getId = async id => {
    let instance = new RequisicoesPadrao();
    return instance.obterById(id, "cotacaomoeda/obter");
};

const edit = async grupoProduto => {
    let instance = new RequisicoesPadrao();
    return instance.editar(grupoProduto, "cotacaomoeda/editar");
};

const remove = async id => {
    let instance = new RequisicoesPadrao();
    return instance.remover(id, "cotacaomoeda/remover");
};

const getSeletorTipos = async() => {
    let instance = new RequisicoesPadrao();
    return await instance.obterSeletor("moeda/obter-seletor-moeda");
};

const user = { getId, add, edit, remove, getSeletorTipos, getGridPage };

export default user;