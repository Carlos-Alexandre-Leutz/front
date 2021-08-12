/* eslint-disable no-unused-vars */
import RequisicoesPadrao from "../../requisicoes";


const getGridPage = async page => {
    let instance = new RequisicoesPadrao();
    return instance.obterGridPages(page, "naturezaoperacao/obter-grid");
};

const add = async grupo => {
    let instance = new RequisicoesPadrao();
    return instance.inserir(grupo, "naturezaoperacao/novo");
};

const getId = async id => {
    let instance = new RequisicoesPadrao();
    return instance.obterById(id, "naturezaoperacao/obter");
};

const edit = async grupoProduto => {
    let instance = new RequisicoesPadrao();
    return instance.editar(grupoProduto, "naturezaoperacao/editar");
};

const remove = async id => {
    let instance = new RequisicoesPadrao();
    return instance.remover(id, "naturezaoperacao/remover");
};

const getSeletorTipos = async() => {
    let instance = new RequisicoesPadrao();
    return await instance.obterSeletor("naturezaoperacao/obter-seletor-tipos");
};

const user = { getId, add, edit, remove, getSeletorTipos, getGridPage };

export default user;