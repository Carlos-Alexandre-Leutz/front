import RequisicoesPadrao from "../../requisicoes.js";

const logar = async params => {
    let instance = new RequisicoesPadrao();
    return instance.logar(params, "login/autenticar");
};


const seletor = { logar };

export default seletor;