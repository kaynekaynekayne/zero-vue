<template>
  <div>
    <div id="screen" v-bind:class="state" @click="onClickScn">{{message}}</div>
      <div>
        <div>평균 시간: {{}}</div>
        <button @click="onReset">리셋</button>
      </div>
  </div>
</template>

<script>

  export default {
    name: 'App',
    data(){
      return{
        result:[],
        state:'waiting',
        message:'클릭해서 시작하세요'
      }
    },
    methods:{
      onReset(){
        console.log("리셋")
      },
      onClickScn(){
        if(this.state==="waiting"){
          this.state="ready"
        } else if (this.state==="ready"){
          this.state="now"
        } else if(this.state==="now"){
          this.state="ready"
        }

      }
    }
}
</script>

<style>
  #screen{
    width:300px;
    height:200px;
  }
  #screen.waiting{
    background-color: aqua;
  }
  #screen.ready{
    background-color:red;
  }
  #screen.now{
    background-color:greenyellow;
  }
</style>
