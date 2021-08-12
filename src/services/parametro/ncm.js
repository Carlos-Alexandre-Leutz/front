/* eslint-disable no-unused-vars */
import RequisicoesPadrao from "../../requisicoes.js";


const getGridPage = async page => {
    let instance = new RequisicoesPadrao();
    return instance.obterGridPages(page, "ncm/obter-grid");
};


const add = async ncm => {
    let instance = new RequisicoesPadrao();
    return instance.inserir(ncm, "ncm/novo");
};

const getId = async id => {
    let instance = new RequisicoesPadrao();
    return instance.obterById(id, "ncm/obter");
};


const edit = async ncm => {
    let instance = new RequisicoesPadrao();
    return instance.editar(ncm, "ncm/editar");
};

const remove = async id => {
    let instance = new RequisicoesPadrao();
    return instance.remover(id, "ncm/remover");
};

const getSeletorTributos = async() => {
    let instance = new RequisicoesPadrao();
    return instance.obterSeletor("tributo/obter-seletor-tributos");
}

const getSeletorEstados = async() => {
    let instance = new RequisicoesPadrao();
    return instance.obterSeletor("estado/obter-seletor-estados");
}

const getGridNcmEstados = async(ncmId) => {
    let instance = new RequisicoesPadrao();
    return instance.obterById(ncmId, "ncm/obter-grid-ncm-estados")
}

const removeNcmEstado = async(ncmId, ncmEstadoId) => {
    let instance = new RequisicoesPadrao();
    return instance.removerUrlCompleta("ncm/remover-estado/{" + ncmId + "}/{" + ncmEstadoId + "}")
}


const ncm = {

    getId,
    add,
    edit,
    remove,
    getSeletorTributos,
    getSeletorEstados,
    getGridNcmEstados,
    removeNcmEstado,
    getGridPage
};

// eslint-disable-next-line prettier/prettier
export default ncm;