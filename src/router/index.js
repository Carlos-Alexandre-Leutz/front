import { createRouter, createWebHashHistory } from "vue-router";
import Container from "../components/base/Container.vue";
import AppContainer from "../components/base/AppContainer.vue";
import EmailViews from "./usuario/email";
import BasePages from "./base";
import UsuarioViews from "./usuario/usuario";
import PaisViews from "./regiao/pais";
import EstadoViews from "./regiao/estado";
import CidadeViews from "./regiao/cidade";
import PessoaViews from "./pessoa";
import GrupoUsuarioViews from "./usuario/grupoUsuario";
import GrupoProdutoViews from "./estoque/grupoProduto";
import LaboratorioViews from "./estoque/laboratorio";
import UnidadeMedidaViews from "./parametro/unidadeMedida";
import PrincipioAtivo from "./estoque/principioAtivo";
import ClasseViews from "./estoque/classe";
import ListaControladoViews from "./estoque/listaControlado";
import DcbViews from "./estoque/dcb";
import NbmViews from "./estoque/nbm";
import TributoViews from "./parametro/tributo";
import NcmViews from "./parametro/ncm";
import DciViews from "./estoque/dci";
import ConvenioViews from "./pessoa/convenio";
import RegiaoViews from "./regiao/regiao";
import BancoViews from "./financeiro/banco";
import FormaPagamentoViews from "./financeiro/formaPagamento";
import LoginViews from "./login"
import DashboarViews from "./dashboard"
import AlteraSenhaViews from "./alteraSenha"
import PlanoDeContasViews from "./parametro/planoDeContas"
import CadastroPlanoDeContasViews from "./planoDeContas/cadostroDePlanoDeContas"
import RemoveItemPlanoContaViews from "./planoDeContas/RemoveItemPlanoConta"
import EditarRegistroPlanoContaViews from "./planoDeContas/EditarItemPlanoConta"
import PbmVies from "./parametro/pbm"
import EspecificacaoCapsula from "./producao/EspecificacaoCapsula/index"
import EspecialidadeViews from "./venda/especialidade/index"
import MensagemPadraoViews from "./venda/mensagemPadrao/index"
import FidelidadeViews from "./venda/fidelidade/index"
import MetodoViews from "./venda/metodo/index"
import BulaViews from "./producao/cadastroBula/index"
import TransacaoViews from "./financeiro/transacao/index"
import MoedaViews from "./parametro/moeda/index"
import CotacaoViews from "./parametro/cotacao/index"
import EnsaioViews from "./parametro/ensaio/index"
import FarmacopeiaViews from "./parametro/farmacopeia/index"
import NaturezaOperacaoViews from "./parametro/naturezaOperacao/index"
import BairoViews from "./regiao/bairo/index"
import FuncionarioViews from "./pessoa/funcionario/index"
import ContabilistaViews from "./parametro/contabilista/index"
import PosAdiquirinteViews from "./parametro/posAdiquirinte/index"
import PortadorViews from "./financeiro/portador/index"
import AdimistradorCartaoViews from "./parametro/admCartao"
import SiproquimViews from "./estoque/siproquim/index"
import FloralViews from "./venda/floral/index"
import testeTabelaViews from "./regiao/testeeTabela/index"
import VisitadorViews from "./pessoa/visitador/index"
import testeViews from "./teste/teste/index"
import PrescritorViews from "./pessoa/prescritor/index"
import CargoViews from "./pessoa/cargo/index"
import DepartamentoViews from "./pessoa/departamento/index"
import FuncaoViews from "./pessoa/funcao/index"
import ContatoViews from "./contato/tipoContato/index"
import EspecieViews from "./parametro/especie/index"
import ClienteViews from "./pessoa/cliente/index"


const Login = () =>
    import ("@/views/login/Login.vue");
const ForgotPassword = () =>
    import ("@/views/login/ForgotPassword.vue");
const EsqueciSenha = () =>
    import ("@/views/login/esqueci-senha.vue");
const logout = () =>
    import ("@/views/login/logout.vue");
/* const BancoViews = () =>
    import ("@/views/banco/Banco.vue");
 */
const routes = [{
        path: "/",
        name: "Main",
        component: AppContainer,
        children: [
            EmailViews,
            UsuarioViews,
            PaisViews,
            EstadoViews,
            CidadeViews,
            PessoaViews,
            GrupoUsuarioViews,
            GrupoProdutoViews,
            UnidadeMedidaViews,
            LaboratorioViews,
            PrincipioAtivo,
            ClasseViews,
            ListaControladoViews,
            DcbViews,
            NbmViews,
            TributoViews,
            NcmViews,
            DciViews,
            ConvenioViews,
            RegiaoViews,
            BancoViews,
            FormaPagamentoViews,
            BasePages,
            LoginViews,
            DashboarViews,
            AlteraSenhaViews,
            PlanoDeContasViews,
            CadastroPlanoDeContasViews,
            RemoveItemPlanoContaViews,
            EditarRegistroPlanoContaViews,
            PbmVies,
            EspecificacaoCapsula,
            EspecialidadeViews,
            MensagemPadraoViews,
            FidelidadeViews,
            MetodoViews,
            BulaViews,
            TransacaoViews,
            MoedaViews,
            CotacaoViews,
            EnsaioViews,
            FarmacopeiaViews,
            NaturezaOperacaoViews,
            BairoViews,
            FuncionarioViews,
            ContabilistaViews,
            PosAdiquirinteViews,
            PortadorViews,
            AdimistradorCartaoViews,
            SiproquimViews,
            FloralViews,
            testeTabelaViews,
            VisitadorViews,
            testeViews,
            PrescritorViews,
            CargoViews,
            DepartamentoViews,
            FuncaoViews,
            ContatoViews,
            EspecieViews,
            ClienteViews
        ]
    },
    {
        path: "/base",
        name: "Base",
        component: Container,
        children: [BasePages]
    },
    {
        path: "/Login",
        name: "Login",
        component: Login,
    },
    {
        path: "/ForgotPassword",
        name: "ForgotPassword",
        component: ForgotPassword,
    },
    {
        path: "/esqueci-senha/:id",
        name: "esqueciDenha",
        component: EsqueciSenha,
    },
    {
        path: "/logout",
        name: "logout",
        component: logout,
    }
];
const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;