/* eslint-disable no-unused-vars */
import RequisicoesPadrao from "../../requisicoes.js";

const getGridPage = async page => {
    let instance = new RequisicoesPadrao();
    return instance.obterGridPages(page, "departamento/obter-grid");
};
const getGrid = async() => {
    let instance = new RequisicoesPadrao();
    return instance.obterGrid("departamento/cargo-grid");
};

const getId = async id => {
    let instance = new RequisicoesPadrao();
    return instance.obterById(id, "departamento/obter");
};

const add = async pessoa => {
    let instance = new RequisicoesPadrao();
    return instance.inserir(pessoa, "departamento/novo");
};

const edit = async pessoa => {
    console.log("pessoa:", pessoa);
    let instance = new RequisicoesPadrao();
    return instance.editar(pessoa, "departamento/editar");
};

const remove = async id => {
    let instance = new RequisicoesPadrao();
    return instance.remover(id, "departamento/remover");
};


const obterSeletor = async() => {
    let instance = new RequisicoesPadrao();
    return instance.obterSeletor("departamento/obter-seletor-pessoa");
}
const user = { getGridPage, getGrid, getId, add, edit, remove, obterSeletor };

export default user;