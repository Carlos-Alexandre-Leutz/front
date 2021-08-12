/* eslint-disable no-unused-vars */
import RequisicoesPadrao from "../../requisicoes";


const getGridPage = async page => {
    let instance = new RequisicoesPadrao();
    return instance.obterGridPages(page, "ensaio/obter-grid");
};

const add = async grupo => {
    let instance = new RequisicoesPadrao();
    return instance.inserir(grupo, "ensaio/novo");
};

const getId = async id => {
    let instance = new RequisicoesPadrao();
    return instance.obterById(id, "ensaio/obter");
};

const edit = async grupoProduto => {
    let instance = new RequisicoesPadrao();
    return instance.editar(grupoProduto, "ensaio/editar");
};

const remove = async id => {
    let instance = new RequisicoesPadrao();
    return instance.remover(id, "ensaio/remover");
};

const getSeletor = async() => {
    let instance = new RequisicoesPadrao();
    return await instance.obterSeletor("Farmacopeia/obter-seletor-Farmacopeia");
};

const user = { getId, add, edit, remove, getSeletor, getGridPage };

export default user;