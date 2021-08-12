/* eslint-disable no-unused-vars */
import RequisicoesPadrao from "../../requisicoes";

const getGridPage = async page => {
    let instance = new RequisicoesPadrao();
    return instance.obterGridPages(page, "laboratorio/obter-grid");
};

const getId = async id => {
    let instance = new RequisicoesPadrao();
    return instance.obterById(id, "laboratorio/obter");
}

const add = async laboratorio => {
    console.log("laboratorio:", laboratorio);
    let instance = new RequisicoesPadrao();
    return instance.inserir(laboratorio, "laboratorio/novo");
}

const edit = async laboratorio => {
    let instance = new RequisicoesPadrao();
    return instance.editar(laboratorio, "laboratorio/editar");
}

const remove = async id => {
    let instance = new RequisicoesPadrao();
    return instance.remover(id, "laboratorio/remover");
};

const user = { getId, add, edit, remove, getGridPage };

export default user;