/* eslint-disable no-unused-vars */
import RequisicoesPadrao from "../../requisicoes.js";

const getGridPage = async page => {
    let instance = new RequisicoesPadrao();
    return instance.obterGridPages(page, "convenio/obter-grid");
};
const getGrid = async() => {
    let instance = new RequisicoesPadrao();
    return instance.obterGrid("convenio/cargo-grid");
};

const getId = async id => {
    let instance = new RequisicoesPadrao();
    return instance.obterById(id, "convenio/obter");
};

const add = async pessoa => {
    let instance = new RequisicoesPadrao();
    return instance.inserir(pessoa, "convenio/novo");
};

const edit = async pessoa => {
    console.log("pessoa:", pessoa);
    let instance = new RequisicoesPadrao();
    return instance.editar(pessoa, "convenio/editar");
};

const remove = async id => {
    let instance = new RequisicoesPadrao();
    return instance.remover(id, "convenio/remover");
};


const obterSeletor = async() => {
    let instance = new RequisicoesPadrao();
    return instance.obterSeletor("convenio/obter-seletor-pessoa");
}
const user = { getGridPage, getGrid, getId, add, edit, remove, obterSeletor };

export default user;