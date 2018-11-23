<template>
  <div>
     <div class="uploader-wrapper">
      <Uploader
        :formData.sync="formData1"
        :autoUpload="true" @uploaded="handleUploaded"></Uploader>
    </div>
  </div>
</template>
<script>
import Uploader from '@/components/uploader'

export default {
  data () {
    return {
      formData1: ''
    }
  },
  components: { Uploader },
  mounted () {
    console.log(this.formData1)
  },
  methods: {
    handleUploaded (res) {
      console.log('res')
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.show {
  width: 100px;
  height: 100px;
  overflow: hidden;
  position: relative;
  border-radius: 50%;
  border: 1px solid #d5d5d5;
}
.picture {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
