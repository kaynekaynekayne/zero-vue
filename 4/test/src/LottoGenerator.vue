<template>
    <div>
        <div>당첨 숫자</div>
        <div id="결과창">
            <lotto-ball v-for="ball in winBalls" number="5" :key="ball">
                <!--위에 number="5" props임-->
            </lotto-ball>
        </div>
        <div>보너스</div>
        <lotto-ball v-if="bonus"></lotto-ball>
        <button v-if='redo'>한 번 더</button>
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

        },
        mounted(){ //화면이 뜨자마자 하는거
            for(let i=0; i<this.winNumbers.length-1; i++){
                setTimeout(()=>{
                    this.winBalls.push(this.winNumbers[i]);
                },(i+1)*1000)
            }
            setTimeout(()=>{
                this.bonus=this.winNumbers[6];
                this.redo=true;
            }, 7000)
        },
        beforeDestroy(){

        },
        watch:{

        }
    }
</script>

<style>

</style>
