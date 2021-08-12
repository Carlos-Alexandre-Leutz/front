/* eslint-disable no-unused-vars */
import RequisicoesPadrao from "../../requisicoes.js";

const getGridPage = async page => {
    let instance = new RequisicoesPadrao();
    return instance.obterGridPages(page, "tributo/obter-grid");
};
const add = async tributo => {
    let instance = new RequisicoesPadrao();
    return instance.inserir(tributo, "tributo/novo");
};


const getId = async id => {
    let instance = new RequisicoesPadrao();
    return instance.obterById(id, "tributo/obter");
};

const edit = async tributo => {
    let instance = new RequisicoesPadrao();
    return instance.editar(tributo, "tributo/editar");
};

const remove = async id => {
    let instance = new RequisicoesPadrao();
    return instance.remover(id, "tributo/remover");
};

const getSeletor = async() => {
    let instance = new RequisicoesPadrao();
    return await instance.obterSeletor("tributo/obter-seletor-tipos");
};

const getSeletorNcm = async() => {
    let instance = new RequisicoesPadrao();
    return instance.obterSeletor("ncm/obter-seletor-ncm");
};


const tributo = {
    getId,
    add,
    edit,
    remove,
    getSeletor,
    getSeletorNcm,
    getGridPage
};

// eslint-disable-next-line prettier/prettier
export default tributo;