<template>
  <h1>teste</h1>
  <emitir></emitir>
  <br><br><br><br><br><br><br>
  <TableDybamnics></TableDybamnics>
  <tabela2></tabela2>
  <graficoBarra></graficoBarra>
  <graficoLinhas></graficoLinhas>
  <graficoPizza></graficoPizza>
  <editorDeTexto></editorDeTexto>
</template>

<script>
import TableDybamnics from "../../../components/table/TableDynamics"
import tabela2 from "../../../components/table/tabela2"
import graficoBarra from "../../../components/table/graficoBarra"
import graficoLinhas from "../../../components/table/graficoLinha"
import graficoPizza from "../../../components/table/graficoPizza"
import editorDeTexto from "../../../components/editorDeTeste/EditorDeTexto"
import emitir from "../../../components/emitireventos/paiRecebeEvento.vue"
export default {
  components:{
    TableDybamnics, tabela2, graficoBarra,graficoLinhas,graficoPizza,editorDeTexto,emitir
  },
  return:{

  }
}
</script>