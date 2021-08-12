/* eslint-disable no-unused-vars */
import RequisicoesPadrao from "../../requisicoes.js";


const getGridPage = async page => {
    let instance = new RequisicoesPadrao();
    return instance.obterGridPages(page, "unidadeMedida/obter-grid");
};

const getId = async id => {
    let instance = new RequisicoesPadrao();
    return instance.obterById(id, "unidadeMedida/obter");
};

const add = async unidadeMedida => {
    let instance = new RequisicoesPadrao();
    return instance.inserir(unidadeMedida, "unidadeMedida/novo");
};

const edit = async unidadeMedida => {
    let instance = new RequisicoesPadrao();
    return instance.editar(unidadeMedida, "unidadeMedida/editar");
};

const remove = async id => {
    let instance = new RequisicoesPadrao();
    return instance.remover(id, "unidadeMedida/remover");
};

const getSeletorTipos = async() => {
    let instance = new RequisicoesPadrao();
    return await instance.obterSeletor("unidadeMedida/obter-seletor-tipos");
}

const getGridConversao = async id => {
    let instance = new RequisicoesPadrao();
    return await instance.obterById(id, "unidadeMedida/obter-grid-conversao");
}

const removeConversao = async(unidadeMedidaId, unidadeConversaoId) => {
        let instance = new RequisicoesPadrao();
        return instance.removerUrlCompleta("unidadeMedida/remover-unidade-conversao/{" + unidadeMedidaId + "}/{" + unidadeConversaoId + "}")
    }
    //removerUnidadeConversao

const user = { getId, add, edit, remove, getSeletorTipos, getGridConversao, removeConversao, getGridPage };

export default user;