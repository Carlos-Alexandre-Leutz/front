/* eslint-disable no-unused-vars */
import RequisicoesPadrao from "../../requisicoes.js";

const getGrid = async() => {
    let instance = new RequisicoesPadrao();
    return instance.obterGrid("planoConta/obter-grid");
};
const obterSelectPlanoConta = async() => {
    let instance = new RequisicoesPadrao();
    return instance.obterSelectPlanoConta("planoConta/obter-select-plano-conta");
};

const add = async planoConta => {
    let instance = new RequisicoesPadrao();
    return instance.inserir(planoConta, "planoconta/novo");
};

const getId = async id => {
    let instance = new RequisicoesPadrao();
    return instance.obterById(id, "planoConta/obter");
};

const edit = async planoConta => {
    let instance = new RequisicoesPadrao();
    return instance.editar(planoConta, "planoConta/editar");
};

const remove = async id => {
    let instance = new RequisicoesPadrao();
    return instance.remover(id, "planoConta/remover");
};

const user = { getGrid, obterSelectPlanoConta, getId, add, edit, remove };

export default user;