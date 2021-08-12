/* eslint-disable no-unused-vars */
import RequisicoesPadrao from "../requisicoes.js";

const getGrid = async() => {
    let instance = new RequisicoesPadrao();
    return instance.obterGrid("endereco/obter-grid");
};

const getGridPorPessoa = async pessoaId => {
    let instance = new RequisicoesPadrao();
    return instance.obterById(pessoaId, "endereco/obter-grid-por-pessoa");
}

const remove = async enderecoId => {
    let instance = new RequisicoesPadrao();
    return instance.remover(enderecoId, "endereco/remover");
}

const enderecos = { getGrid, getGridPorPessoa, remove /*, getId, add, edit, , obterSeletorTipoPessoa */ };

export default enderecos;