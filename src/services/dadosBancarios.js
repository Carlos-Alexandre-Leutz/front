/* eslint-disable no-unused-vars */
import RequisicoesPadrao from "../requisicoes.js";

const getGridPorPessoa = async pessoaId => {
    let instance = new RequisicoesPadrao();
    return instance.obterById(pessoaId, "dadosBancarios/obter-grid-por-pessoa");
}

const remove = async dadosBancariosId => {
    let instance = new RequisicoesPadrao();
    return instance.remover(dadosBancariosId, "dadosBancarios/remover");
}

const dadosBancarios = {  getGridPorPessoa, remove };

export default dadosBancarios;  