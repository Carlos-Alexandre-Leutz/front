/* eslint-disable no-unused-vars */
import RequisicoesPadrao from "../../requisicoes";


const getGridPage = async page => {
    let instance = new RequisicoesPadrao();
    return instance.obterGridPages(page, "portador/obter-grid");
};

const add = async grupo => {
    let instance = new RequisicoesPadrao();
    return instance.inserir(grupo, "portador/novo");
};

const getId = async id => {
    let instance = new RequisicoesPadrao();
    return instance.obterById(id, "portador/obter");
};



const edit = async grupoUsuario => {
    let instance = new RequisicoesPadrao();
    return instance.editar(grupoUsuario, "portador/editar");
};

const remove = async id => {
    let instance = new RequisicoesPadrao();
    return instance.remover(id, "portador/remover");
};

const user = { getId, add, edit, remove, getGridPage };

export default user;