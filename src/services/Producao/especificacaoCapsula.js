import RequisicoesPadrao from "../../requisicoes.js";


const getGridPage = async page => {
    let instance = new RequisicoesPadrao();
    return instance.obterGridPages(page, "especificacaoCapsula/obter-grid");
};
const add = async id => {
    let instance = new RequisicoesPadrao();
    return instance.inserir(id, "especificacaoCapsula/novo");
};
const edit = async estado => {
    console.log("estado:", estado);
    let instance = new RequisicoesPadrao();
    return instance.editar(estado, "especificacaoCapsula/editar");
};
const getId = async id => {
    let instance = new RequisicoesPadrao();
    return instance.obterById(id, "especificacaoCapsula/obter");
};
const remove = async id => {
    let instance = new RequisicoesPadrao();
    return instance.remover(id, "especificacaoCapsula/remover");
};

const capsula = { getGridPage, add, edit, getId, remove };

export default capsula;