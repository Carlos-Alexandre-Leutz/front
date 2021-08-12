/* eslint-disable no-unused-vars */
import RequisicoesPadrao from "../../requisicoes.js";

const getGridPage = async page => {
    let instance = new RequisicoesPadrao();
    return instance.obterGridPages(page, "cargo/obter-grid");
};
const getGrid = async() => {
    let instance = new RequisicoesPadrao();
    return instance.obterGrid("endereco/cargo-grid");
};

const getId = async id => {
    let instance = new RequisicoesPadrao();
    return instance.obterById(id, "cargo/obter");
};

const add = async pessoa => {
    let instance = new RequisicoesPadrao();
    return instance.inserir(pessoa, "cargo/novo");
};

const edit = async pessoa => {
    console.log("pessoa:", pessoa);
    let instance = new RequisicoesPadrao();
    return instance.editar(pessoa, "cargo/editar");
};

const remove = async id => {
    let instance = new RequisicoesPadrao();
    return instance.remover(id, "cargo/remover");
};


const obterSeletor = async() => {
    let instance = new RequisicoesPadrao();
    return instance.obterSeletor("cargo/obter-seletor-pessoa");
}
const user = { getGridPage, getGrid, getId, add, edit, remove, obterSeletor };

export default user;