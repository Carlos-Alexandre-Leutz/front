var urlBase = "https://hapi-farmafacil.prismafive.com.br/";
const token = JSON.parse(localStorage.getItem("user-token"));
console.log(token);

export default class RequisicoesPadrao {
    // class methods
    constructor() {
        if (process.env.NODE_ENV === "development") {
            urlBase = "https://localhost:5001/";
        }
    }
    async obterGridPages(pagina, url) {
        try {
            console.log("url:" + urlBase + url + "/" + pagina);
            const res = await fetch(urlBase + url + "/" + pagina, {
                method: "get",
                headers: { Authorization: "Bearer " + token.token }
            });
            const json = await res.json();
            return json;
        } catch (err) {
            console.error("Erro ao obter grid! ", err);
        }
    }
    async obterGrid(url) {
        try {
            const res = await fetch(urlBase + url, {
                method: "get",
                headers: { Authorization: "Bearer " + token.token }
            });
            const json = await res.json();
            return json;
        } catch (err) {
            console.error("Erro ao obter grid! ", err);
        }
    }

    async obterSelectPlanoConta(url) {
        try {
            const res = await fetch(urlBase + url, {
                method: "get",
                headers: { Authorization: "Bearer " + token.token }
            });
            const json = await res.json();
            return json;
        } catch (err) {
            console.error("Erro ao obter grid! ", err);
        }
    }
    async obterById(id, url) {
        console.log(urlBase + url + "/{" + id + "}");
        const res = await fetch(urlBase + url + "/{" + id + "}", {
            method: "get",
            headers: { Authorization: "Bearer " + token.token }
        });
        const text = await res.text();
        const data = JSON.parse(text);
        return data;
    }
    async obterSeletorById(id, url) {
        console.log(urlBase + url + "/{" + id + "}");
        const res = await fetch(urlBase + url + id, {
            method: "get",
            headers: { Authorization: "Bearer " + token.token }
        });
        const text = await res.text();
        const data = JSON.parse(text);
        return data;
    }

    async inserir(objeto, url) {
        try {
            const props = {
                method: "post",
                body: JSON.stringify(objeto),
                headers: {
                    "content-type": "application/json",
                    Authorization: "Bearer " + token.token
                }
            };
            const res = await fetch(urlBase + url, props);
            return res;
        } catch (error) {
            console.error("erro ao inserir", error);
        }
    }

    async editar(objeto, url) {
        const props = {
            method: "post",
            body: JSON.stringify(objeto),
            headers: {
                "content-type": "application/json",
                Authorization: "Bearer " + token.token
            }
        };
        console.log(urlBase + url);
        const res = await fetch(urlBase + url, props);
        return res;
    }

    async remover(id, url) {
        const props = {
            method: "post",
            data: JSON.stringify({
                id: id
            }),
            headers: {
                "content-type": "application/json",
                Authorization: "Bearer " + token.token
            }
        };

        const res = await fetch(urlBase + url + "/{" + id + "}", props);
        return res;
    }

    async removerUrlCompleta(urlCompleta) {
        const props = {
            method: "post",
            headers: {
                "content-type": "application/json",
                Authorization: "Bearer " + token.token
            }
        };

        const res = await fetch(urlBase + urlCompleta, props);
        return res;
    }

    async obterSeletor(url) {
        try {
            console.log("url seletor: ", url);
            const res = await fetch(urlBase + url, {
                method: "get",
                headers: { Authorization: "Bearer " + token.token }
            });
            const json = await res.json();
            return json;
        } catch (err) {
            console.error("Erro ao obter seletor! ", err);
        }
    }

    async obterBy2Params(url, id1, id2) {
        try {
            const res = await fetch(urlBase + url + "/{" + id1 + "}/{" + id2 + "}", {
                method: "get",
                headers: { Authorization: "Bearer " + token.token }
            });
            const data = await res.json();
            return data;
        } catch (err) {
            console.error("Erro ao obter!", err);
        }
    }
    async logar(objeto, url) {
        console.log("obj ", objeto);
        console.log("url ", url);
        try {
            const props = {
                method: "post",
                body: JSON.stringify(objeto),
                headers: {
                    "content-type": "application/json"
                }
            };

            const res = await fetch(urlBase + url, props);
            return res;
        } catch (error) {
            console.error("erro ao inserir", error);
        }
    }
}