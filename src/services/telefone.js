/* eslint-disable no-unused-vars */
import RequisicoesPadrao from "../requisicoes.js";

const getGridPorPessoa = async pessoaId => {
    let instance = new RequisicoesPadrao();
    return instance.obterById(pessoaId, "telefone/obter-grid-por-pessoa");
};

const remove = async dadosBancariosId => {
    let instance = new RequisicoesPadrao();
    return instance.remover(dadosBancariosId, "telefone/remover");
};

const telefone = { getGridPorPessoa, remove };

export default telefone;