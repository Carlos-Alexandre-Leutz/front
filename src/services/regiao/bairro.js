/* eslint-disable no-unused-vars */
import RequisicoesPadrao from "../../requisicoes";


const getGridPage = async page => {
    let instance = new RequisicoesPadrao();
    return instance.obterGridPages(page, "bairro/obter-grid");
};

const getId = async id => {
    let instance = new RequisicoesPadrao();
    return instance.obterById(id, "bairro/obter");
};

const add = async cidade => {
    console.log("cidade:", cidade);
    let instance = new RequisicoesPadrao();
    return instance.inserir(cidade, "bairro/novo");
};

const edit = async cidade => {
    console.log("cidade:", cidade);
    let instance = new RequisicoesPadrao();
    return instance.editar(cidade, "bairro/editar");
};

const remove = async id => {
    let instance = new RequisicoesPadrao();
    return instance.remover(id, "bairro/remover");
};

const getSeletorEstados = async() => {
    let instance = new RequisicoesPadrao();
    return instance.obterSeletor("cidade/obter-seletor-cidades");
}

const user = { getId, add, edit, remove, getSeletorEstados, getGridPage };

export default user;