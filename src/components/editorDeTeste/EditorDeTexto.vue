<template>
  <QuillEditor :options="options"/>
</template>
<script>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

export default {
  components: {
    QuillEditor
  },
  
  data() {
    return {       
      options: {
        debug: 'info',
        // modules: {
        //   toolbar: ['bold', 'italic', 'underline']
        // },
        placeholder: 'Compose an epic...',
        readOnly: false,
        theme: 'snow'
      }
    }
  },
}
</script>