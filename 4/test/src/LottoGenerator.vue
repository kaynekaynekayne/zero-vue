<template>
    <div>
        <div>당첨 숫자</div>
        <div id="결과창">
            <lotto-ball v-for="ball in winBalls" :number="ball" :key="ball">
                <!--위에 number="5" props임-->
            </lotto-ball>
        </div>
        <div>보너스</div>
        <lotto-ball v-if="bonus" :number="bonus"></lotto-ball>
        <button v-if='redo' @click="onClickRedo">한 번 더</button>
    </div>
</template>

<script>
    import LottoBall from './LottoBall.vue';
    function getWinNumbers(){
        console.log('getWinNumbers');
        const candidate=Array(45).fill().map((v,i)=>i+1);
        const shuffle=[];
        while (candidate.length>0){
            shuffle.push(candidate.splice(Math.floor(Math.random()*candidate.length),1)[0])
        }
        const bonusNumber=shuffle[shuffle.length-1];
        const winNumbers=shuffle.slice(0,6).sort((p,c)=>p-c);
        return [...winNumbers, bonusNumber];
    }

    const timeouts=[];

    export default{
        components:{
            LottoBall,
        },
        data(){
            return{
                winNumbers:getWinNumbers(),
                winBalls:[],
                bonus:null,
                redo:false
            }
        },
        computed:{

        },
        methods:{
            onClickRedo(){
                this.winNumbers=getWinNumbers();
                this.winBalls=[];
                this.bonus=null;
                this.redo=false;
                this.showBalls();
            },
            showBalls(){
                for(let i=0; i<this.winNumbers.length-1; i++){
                    timeouts[i]=setTimeout(()=>{
                        this.winBalls.push(this.winNumbers[i]);
                    },(i+1)*1000)
                }
                timeouts[6]=setTimeout(()=>{
                    this.bonus=this.winNumbers[6];
                    this.redo=true;
                }, 7000)
            }
        },
        mounted(){ //화면이 뜨자마자 하는거
            this.showBalls(); //중복되면 메서드 안에 넣음
        },
        beforeDestroy(){
            timeouts.forEach((t)=>{
                clearTimeout(t)
            })
        },
        watch:{ //감시하는 기능
            winBalls(val, oldVal){
                console.log(val, oldVal)
                if(val.length===0){ //winBalls가 빈 배열이 됐을 때
                    this.showBalls();
                }
            }
        }
    }
</script>

<style>

</style>
