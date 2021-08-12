/* eslint-disable no-unused-vars */
import RequisicoesPadrao from "../../requisicoes.js";


const getGridPorPessoa = async pessoaId => {
    let instance = new RequisicoesPadrao();
    return instance.obterById(pessoaId, "contato/obter-grid-por-pessoa");
}

const remove = async contatoId => {
    let instance = new RequisicoesPadrao();
    return instance.remover(contatoId, "contato/remover");
}

const contatos = { getGridPorPessoa, remove /*, getId, add, edit, , obterSeletorTipoPessoa */ };

export default contatos;