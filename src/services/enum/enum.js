//nomenclatura primeira parte do nome da const e o arquivo
const ListaControladoTipo = [{
        value: 0,
        label: "Entorpecentes"
    },
    {
        value: 1,
        label: "Psicotrópicos"
    },
    {
        value: 2,
        label: "Controle Especial"
    }
];
const TributoTipo = [{
        value: 0,
        label: "CST"
    },
    {
        value: 1,
        label: "CSOSN"
    },
    {
        value: 2,
        label: "Situação Documento"
    },
    {
        value: 3,
        label: "Documentos Fiscais"
    },
    {
        value: 5,
        label: "CST ISS"
    },
    {
        value: 7,
        label: "CEST"
    },
    {
        value: 8,
        label: "CBENEF"
    }
];
const UnidadeMedidaTipo = [{
        value: 0,
        label: "Massa"
    },
    {
        value: 1,
        label: "Volume"
    }
];
const PessoaTipo = [{
        value: 0,
        label: "Física"
    },
    {
        value: 1,
        label: "Jurídica"
    }
];
const PessoaTipoTelefone = [{
        value: 0,
        label: "Fixo"
    },
    {
        value: 1,
        label: "Celular"
    },
    {
        value: 2,
        label: "Fax"
    }
];
const GrupoProdutoTipo = [{
        value: 0,
        label: "Nenhum"
    },
    {
        value: 1,
        label: "Matéria-Prima"
    },
    {
        value: 2,
        label: "Semi-Acabado"
    },
    {
        value: 3,
        label: "Acabado"
    },
    {
        value: 4,
        label: "Embalagem"
    },
    {
        value: 5,
        label: "Cápsula"
    },
    {
        value: 6,
        label: "Drogaria"
    },
    {
        value: 7,
        label: "Homeopatia"
    },
    {
        value: 8,
        label: "Floral"
    }
];
const FormaPagamentoTipo = [{
        value: 0,
        label: "Nenhum"
    },
    {
        value: 1,
        label: "Moeda"
    },
    {
        value: 2,
        label: "Cheque"
    },
    {
        value: 3,
        label: "Cartão"
    },
    {
        value: 4,
        label: "Prazo ficha"
    },
    {
        value: 5,
        label: "Convenio"
    },
    {
        value: 6,
        label: "Prazo - Parcelamento"
    },
    {
        value: 7,
        label: "Convenio - Parcelamento"
    },
    {
        value: 8,
        label: "Boleto"
    },
    {
        value: 9,
        label: "Deposito"
    }
];
const FormaPagamentoDescontos = [{
        value: 0,
        label: "Nenhum"
    },
    {
        value: 1,
        label: "Autorizado"
    },
    {
        value: 2,
        label: "Autorizado através de senha "
    },
    {
        value: 3,
        label: "Não autorizado"
    }
];
const BulaTipo = [{
        value: 0,
        label: "Nenhum"
    },
    {
        value: 1,
        label: "Alopática"
    },
    {
        value: 2,
        label: "Homeopática"
    }
];
const TransacaoTipo = [{
        value: 0,
        label: "Crédito"
    },
    {
        value: 1,
        label: "Débito"
    }
];
const TransacaoAdiminstradora = [{
        value: 0,
        label: "Crédito"
    },
    {
        value: 1,
        label: "Débito"
    }
];
const naturezaoperacao = [{
        value: 0,
        label: "Entrada"
    },
    {
        value: 1,
        label: "Saida"
    }
];
const gerencCartaoAdmCArtao = [{
        value: 0,
        label: "Visa/Master/Amex"
    },
    {
        value: 1,
        label: "BanriCompras"
    },
    {
        value: 2,
        label: "ConvCard"
    },
    {
        value: 3,
        label: "EDMCard"
    },
    {
        value: 4,
        label: "TRNCentre"
    },
    {
        value: 5,
        label: "HiperCard"
    },
    {
        value: 6,
        label: "Integração4S"
    }
];
const pessoaFornecedorTipoTelefone = [{
        value: 0,
        label: "Não Informado"
    },
    {
        value: 1,
        label: "Residencial"
    },
    {
        value: 2,
        label: "Comercial"
    },
    {
        value: 3,
        label: "Celular"
    }
];
const pessoaFornecedorTipoContato = [{
        value: 0,
        label: "E-mail"
    },
    {
        value: 1,
        label: "Site"
    },
    {
        value: 2,
        label: "Rede Social"
    }
];
const pessoaConveioindentificador = [{
        value: 0,
        label: "Outros"
    },
    {
        value: 1,
        label: "Pertech"
    },
    {
        value: 2,
        label: "Tekla"
    },
    {
        value: 3,
        label: "Celos"
    },
    {
        value: 4,
        label: "Perdigão"
    },
    {
        value: 5,
        label: "Brandili"
    }
];
const pessoaPrescritorTipoCr = [{
        value: 0,
        label: "CRM"
    },
    {
        value: 1,
        label: "pessoaPrescritorTipoCr"
    },
    {
        value: 2,
        label: "CRO"
    },
    {
        value: 3,
        label: "Outro"
    }
];
const pessoaPrescritorGenero = [{
        value: 0,
        label: "Feminino"
    },
    {
        value: 1,
        label: "Masculino"
    },
    {
        value: 2,
        label: "Não informado"
    }
];
const pessoaDepartamentoTipoDepartamento = [{
        value: 0,
        label: "Analítico"
    },
    {
        value: 1,
        label: "Sintético"
    }
];
const funcionarioEstadoCivil = [{
        value: 0,
        label: "Casado(a)"
    },
    {
        value: 1,
        label: "Solteiro(a)"
    },
    {
        value: 2,
        label: "Divorcido(a)"
    },
    {
        value: 3,
        label: "Víuvo(a)"
    },
    {
        value: 4,
        label: "Separado(a)"
    },
    {
        value: 5,
        label: "União Estável"
    }
];
const pessoaFuncionarioTipoContrato = [{
        value: 0,
        label: "Prazo Inderteminado"
    },
    {
        value: 1,
        label: "Prazo determinado (dias)"
    },
    {
        value: 2,
        label: "Prazo determinado por um fato"
    }
];
const pessoaFuncionarioSalario = [{
        value: 0,
        label: "Mensal"
    },
    {
        value: 1,
        label: "Quinzenal"
    },
    {
        value: 2,
        label: "Semanal"
    },
    {
        value: 3,
        label: "Diário"
    },
    {
        value: 4,
        label: "Horista"
    },
    {
        value: 5,
        label: "Hora-Aula"
    },
    {
        value: 6,
        label: "Tarefa"
    },
    {
        value: 7,
        label: "Pro-Labrore"
    },
    {
        value: 8,
        label: "RPA"
    },
];


const enumSelect = {
    BulaTipo,
    ListaControladoTipo,
    TributoTipo,
    PessoaTipo,
    UnidadeMedidaTipo,
    PessoaTipoTelefone,
    GrupoProdutoTipo,
    FormaPagamentoTipo,
    FormaPagamentoDescontos,
    TransacaoTipo,
    naturezaoperacao,
    gerencCartaoAdmCArtao,
    TransacaoAdiminstradora,
    pessoaFornecedorTipoContato,
    pessoaFornecedorTipoTelefone,
    pessoaConveioindentificador,
    pessoaPrescritorTipoCr,
    pessoaPrescritorGenero,
    pessoaDepartamentoTipoDepartamento,
    funcionarioEstadoCivil,
    pessoaFuncionarioTipoContrato,
    pessoaFuncionarioSalario
};

export default enumSelect;