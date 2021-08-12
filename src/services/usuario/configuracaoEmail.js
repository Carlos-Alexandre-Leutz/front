/* eslint-disable no-unused-vars */
import RequisicoesPadrao from "../../requisicoes.js";

const getGridPage = async page => {
    let instance = new RequisicoesPadrao();
    return instance.obterGridPages(page, "configuracao-email/obter-grid");
};

const add = async grupo => {
    let instance = new RequisicoesPadrao();
    return instance.inserir(grupo, "configuracao-email/novo"); //ok
};

const getId = async id => {
    let instance = new RequisicoesPadrao();
    return instance.obterById(id, "configuracao-email/obter");
};
const edit = async email => {
    console.log("aqui", email)
    let instance = new RequisicoesPadrao();
    return instance.editar(email, "configuracao-email/editar");
};
const remove = async id => {
    let instance = new RequisicoesPadrao();
    return instance.remover(id, "configuracao-email/remover"); //ok
};

const getSeletorTipos = async() => {
    let instance = new RequisicoesPadrao();
    return await instance.obterSeletor("grupoProduto/obter-seletor-tipos");
};

const user = { getId, add, edit, remove, getSeletorTipos, getGridPage };

export default user;