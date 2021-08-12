/* eslint-disable no-unused-vars */
import RequisicoesPadrao from "../../requisicoes.js";

const getGridPage = async page => {
    let instance = new RequisicoesPadrao();
    return instance.obterGridPages(page, "usuario/obter-grid");
};

const add = async usuario => {
    console.log("Objeto Usuário: ", usuario);
    let instance = new RequisicoesPadrao();
    return instance.inserir(usuario, "usuario/novo");
};

const getId = async id => {
    let instance = new RequisicoesPadrao();
    return instance.obterById(id, "usuario/obter");
};

const edit = async usuario => {
    let instance = new RequisicoesPadrao();
    return instance.editar(usuario, "usuario/editar");
};

const remove = async id => {
    let instance = new RequisicoesPadrao();
    return instance.remover(id, "usuario/remover");
};

const getSeletorGrupo = async() => {
    let instance = new RequisicoesPadrao();
    return await instance.obterSeletor("grupoUsuario/obter-seletor");
};

const getSeletorConta = async() => {
    let instance = new RequisicoesPadrao();
    return await instance.obterSeletor("conta/obter-seletor");
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