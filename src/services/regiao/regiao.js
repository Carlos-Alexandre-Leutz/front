/* eslint-disable no-unused-vars */
import RequisicoesPadrao from "../../requisicoes.js";

const getGrid = async() => {
    let instance = new RequisicoesPadrao();
    return instance.obterGrid("regiao/obter-grid");
};
const getGridPage = async page => {
    let instance = new RequisicoesPadrao();
    return instance.obterGridPages(page, "regiao/obter-grid");
};
const add = async regiao => {
    let instance = new RequisicoesPadrao();
    console.log("json que vai pro backend:", JSON.stringify(regiao))
    return instance.inserir(regiao, "regiao/novo");
};

const getId = async id => {
    let instance = new RequisicoesPadrao();
    return instance.obterById(id, "regiao/obter");
};

const edit = async regiao => {
    let instance = new RequisicoesPadrao();
    return instance.editar(regiao, "regiao/editar");
};

const remove = async id => {
    let instance = new RequisicoesPadrao();
    return instance.remover(id, "regiao/remover");
};


const regiao = { getGrid, getId, add, edit, remove, getGridPage };

export default regiao;