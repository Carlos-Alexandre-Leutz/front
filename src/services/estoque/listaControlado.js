/* eslint-disable no-unused-vars */
import RequisicoesPadrao from "../../requisicoes.js";

const getGridPage = async page => {
    let instance = new RequisicoesPadrao();
    return instance.obterGridPages(page, "listaControlado/obter-grid");
};
const add = async listaControlado => {
    console.log("listaControlado no add: ", listaControlado);
    let instance = new RequisicoesPadrao();
    return instance.inserir(listaControlado, "listaControlado/novo");
};

const getId = async id => {
    let instance = new RequisicoesPadrao();
    return instance.obterById(id, "listaControlado/obter");
};

const edit = async listaControlado => {
    let instance = new RequisicoesPadrao();
    return instance.editar(listaControlado, "listaControlado/editar");
};

const remove = async id => {
    let instance = new RequisicoesPadrao();
    return instance.remover(id, "listaControlado/remover");
};

const getSeletorTipos = async() => {
    let instance = new RequisicoesPadrao();
    return await instance.obterSeletor("listaControlado/obter-seletor");
};

const listaControlado = {
    getId,
    add,
    edit,
    remove,
    getSeletorTipos,
    getGridPage
};

// eslint-disable-next-line prettier/prettier
export default listaControlado;