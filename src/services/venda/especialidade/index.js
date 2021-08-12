import RequisicoesPadrao from "../../../../src/requisicoes";

const getGridPage = async page => {
    let instance = new RequisicoesPadrao();
    return instance.obterGridPages(page, "especialidade/obter-grid");
};

const add = async grupo => {
    let instance = new RequisicoesPadrao();
    return instance.inserir(grupo, "especialidade/novo");
};

const getId = async id => {
    let instance = new RequisicoesPadrao();
    return instance.obterById(id, "especialidade/obter");
};

const edit = async grupoUsuario => {
    let instance = new RequisicoesPadrao();
    return instance.editar(grupoUsuario, "especialidade/editar");
};

const remove = async id => {
    let instance = new RequisicoesPadrao();
    return instance.remover(id, "especialidade/remover");
};

const user = { getId, add, edit, remove, getGridPage };

export default user;