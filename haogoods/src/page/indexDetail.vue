<template> 
    <div>
      我是详情页面
    </div>
</template>
<script>
export default {
  components: {
   
  },
  data () {
    return {
      id: ''
      
     
    }
  },
  mounted () {
   this.id = this.$route.params.id;
  },
  methods: {
    
  }
}
</script>