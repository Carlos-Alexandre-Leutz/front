import RequisicoesPadrao from "../requisicoes.js";

const obterSeletorGenerico = async url => {
    let instance = new RequisicoesPadrao();
    return instance.obterSeletor(url);
};

const obterSeletorById = async(url, id) => {
    let instance = new RequisicoesPadrao();
    return instance.obterSeletorById(id, url);
}

const obterSeletor2Params = async(url, id1, id2) => {
    let instance = new RequisicoesPadrao();
    return instance.obterBy2Params(url, id1, id2);
}

const seletor = { obterSeletorGenerico, obterSeletorById, obterSeletor2Params };

export default seletor;