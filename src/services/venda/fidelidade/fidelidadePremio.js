import RequisicoesPadrao from "../../../../src/requisicoes";

const getGridPage = async page => {
    let instance = new RequisicoesPadrao();
    return instance.obterGridPages(page, "fidelidadePremios/obter-grid");
};

const add = async grupo => {
    let instance = new RequisicoesPadrao();
    return instance.inserir(grupo, "fidelidadePremios/novo");
};

const getId = async id => {
    let instance = new RequisicoesPadrao();
    return instance.obterById(id, "fidelidadePremios/obter");
};

const edit = async grupoUsuario => {
    let instance = new RequisicoesPadrao();
    return instance.editar(grupoUsuario, "fidelidadePremios/editar");
};

const remove = async id => {
    let instance = new RequisicoesPadrao();
    return instance.remover(id, "fidelidadePremios/remover");
};

const user = { getId, add, edit, remove, getGridPage };

export default user;