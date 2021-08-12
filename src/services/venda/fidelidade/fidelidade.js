import RequisicoesPadrao from "../../../../src/requisicoes";

const getGridPage = async page => {
    let instance = new RequisicoesPadrao();
    return instance.obterGridPages(page, "fidelidade/obter-grid");
};

const add = async grupo => {
    let instance = new RequisicoesPadrao();
    return instance.inserir(grupo, "fidelidade/novo");
};

const getId = async id => {
    let instance = new RequisicoesPadrao();
    return instance.obterById(id, "fidelidade/obter");
};

const edit = async grupoUsuario => {
    let instance = new RequisicoesPadrao();
    return instance.editar(grupoUsuario, "fidelidade/editar");
};

const remove = async id => {
    let instance = new RequisicoesPadrao();
    return instance.remover(id, "fidelidade/remover");
};
const getSeletor = async() => {
    let instance = new RequisicoesPadrao();
    return await instance.obterSeletor("formaPagamento/obter-seletor-forma-pagamento");
};

const user = { getId, add, edit, remove, getGridPage, getSeletor };

export default user;