/* eslint-disable no-unused-vars */
import RequisicoesPadrao from "../../requisicoes.js";

const getGridPage = async page => {
    let instance = new RequisicoesPadrao();
    return instance.obterGridPages(page, "endereco/obter-grid");
};
const getGrid = async() => {
    let instance = new RequisicoesPadrao();
    return instance.obterGrid("endereco/obter-grid");
};

const getId = async id => {
    let instance = new RequisicoesPadrao();
    return instance.obterById(id, "endereco/obter");
};

const add = async pessoa => {
    let instance = new RequisicoesPadrao();
    return instance.inserir(pessoa, "endereco/novo");
};

const edit = async pessoa => {
    console.log("pessoa:", pessoa);
    let instance = new RequisicoesPadrao();
    return instance.editar(pessoa, "endereco/editar");
};

const remove = async id => {
    let instance = new RequisicoesPadrao();
    return instance.remover(id, "endereco/remover");
};


const obterSeletor = async() => {
    let instance = new RequisicoesPadrao();
    return instance.obterSeletor("pessoa/obter-seletor-pessoa");
}
const user = { getGridPage, getGrid, getId, add, edit, remove, obterSeletor };

export default user;