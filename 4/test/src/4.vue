<template>
  <div>
    <div id="screen" v-bind:class="state" @click="onClickScn">{{message}}</div>
      <template v-if="result.length"><!--div 대신 쓸 수 있음-->
        <!--show: 태그가 있지만 display:none-->
        <!--if: 값이 true가 아니면 태그가 아예 없어짐-->
        <div>평균 시간: {{average}}ms</div>
        <button @click="onReset">리셋</button>
      </template>
  </div>
</template>

<script>
  let startTime=0;
  let endTime=0;
  let timeout=null;

  export default {
    name: 'App',
    data(){
      return{
        result:[],
        state:'waiting',
        message:'클릭해서 시작하세요'
      }
    },
    computed:{ //데이터를 가공해서 쓸 때
    //이렇게 계산하는 부분을 template안에 넣으면
    //다른 요소들 바뀔 때 얘도 계속 바뀌어서 성능에 좋지 않음
      average(){
        return this.result.reduce((a,c)=>a+c,0)/this.result.length || 0
      }
    },
    methods:{
      onReset(){
        console.log("리셋")
        this.result=[]
      },
      onClickScn(){
        if(this.state==="waiting"){
          this.state="ready"
          this.message="초록색이 되면 클릭하세요"
          timeout=setTimeout(()=>{
            this.state="now"
            this.message="지금 클릭"
            startTime=new Date();
          },Math.floor(Math.random()*1000)+1000) //약 2초
        } else if (this.state==="ready"){
          clearTimeout(timeout);
          this.state="waiting"
          this.message="너무 성급하시네요 초록색이 된 후에 클릭하세요"
        } else if(this.state==="now"){
          endTime=new Date();
          this.state="waiting"
          this.message="클릭해서 시작하세요"
          this.result.push(endTime-startTime);
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
