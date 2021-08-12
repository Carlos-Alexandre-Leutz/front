/* eslint-disable no-unused-vars */
import RequisicoesPadrao from "../../../requisicoes";

const getGridPage = async page => {
    let instance = new RequisicoesPadrao();
    return instance.obterGridPages(page, "metodo/obter-grid");
};

const add = async usuario => {
    console.log("Objeto Usuário: ", usuario);
    let instance = new RequisicoesPadrao();
    return instance.inserir(usuario, "metodo/novo");
};

const getId = async id => {
    let instance = new RequisicoesPadrao();
    return instance.obterById(id, "metodo/obter");
};

const edit = async usuario => {
    let instance = new RequisicoesPadrao();
    return instance.editar(usuario, "metodo/editar");
};

const remove = async id => {
    let instance = new RequisicoesPadrao();
    return instance.remover(id, "metodo/remover");
};

const getSeletorGrupo = async() => {
    let instance = new RequisicoesPadrao();
    return await instance.obterSeletor("metodo/obter-seletor");
};

const getSeletorConta = async() => {
    let instance = new RequisicoesPadrao();
    return await instance.obterSeletor("metodo/obter-seletor");
};

const user = {

    getId,
    add,
    edit,
    remove,
    getSeletorGrupo,
    getSeletorConta,
    getGridPage
};

export default user;