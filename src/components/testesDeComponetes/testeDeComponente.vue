<template>
  <div>
   <quill-editor
    ref="myQuillEditor"
    v-model="content"
    :options="options"
    @blur="onEditorBlur($event)"
  />
    <!-- @focus="onEditorFocus($event)"
    @ready="onEditorReady($event)" -->
  </div>
</template>
<script>
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
export default {
  data () {
      let teste ;
      return {
        options: {
        placeholder: "Digite a bula",
        readOnly: false,
        theme: "snow"
      },
        content: '',
        teste,
        
        
      }
    },
    methods: {
      onEditorBlur(quill) {
          console.log('editor blur!', quill.value)
          this.teste = quill.value;
          console.log('teste',typeof  this.teste)



      },
    //   onEditorFocus(quill) {
    //     console.log('editor focus!', quill)
    //   },
    //   onEditorReady(quill) {
    //     console.log('editor ready!', quill)
    //   },
    //   onEditorChange({ quill, html, text }) {
    //     console.log('editor change!', quill, html, text)
    //     this.content = html
    //   }
    },
    computed: {
      editor() {
        return this.$refs.myQuillEditor.quill
      }
    },
    mounted() {
      console.log('this is current quill instance object', this.editor)
    },
  components: {
    QuillEditor,
  },
};
</script>