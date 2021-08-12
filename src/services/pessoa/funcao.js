/* eslint-disable no-unused-vars */
import RequisicoesPadrao from "../../requisicoes.js";

const getGridPage = async page => {
    let instance = new RequisicoesPadrao();
    return instance.obterGridPages(page, "funcao/obter-grid");
};
const getGrid = async() => {
    let instance = new RequisicoesPadrao();
    return instance.obterGrid("endereco/funcao-grid");
};

const getId = async id => {
    let instance = new RequisicoesPadrao();
    return instance.obterById(id, "funcao/obter");
};

const add = async pessoa => {
    let instance = new RequisicoesPadrao();
    return instance.inserir(pessoa, "funcao/novo");
};

const edit = async pessoa => {
    console.log("pessoa:", pessoa);
    let instance = new RequisicoesPadrao();
    return instance.editar(pessoa, "funcao/editar");
};

const remove = async id => {
    let instance = new RequisicoesPadrao();
    return instance.remover(id, "funcao/remover");
};


const obterSeletor = async() => {
    let instance = new RequisicoesPadrao();
    return instance.obterSeletor("funcao/obter-seletor-pessoa");
}
const user = { getGridPage, getGrid, getId, add, edit, remove, obterSeletor };

export default user;