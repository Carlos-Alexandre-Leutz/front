/* eslint-disable no-unused-vars */
import RequisicoesPadrao from "../requisicoes.js";

const getGridGrupo = async convenioId => {
    let instance = new RequisicoesPadrao();
    return instance.obterById(convenioId, "convenio/obter-grid-convenio-grupos");
}


const removeConvenioGrupo = async convenioGrupoId => {
    let instance = new RequisicoesPadrao();
    return instance.remover(convenioGrupoId, "convenio/remover-convenio-grupo");
}

const convenio = { getGridGrupo, removeConvenioGrupo };

export default convenio;