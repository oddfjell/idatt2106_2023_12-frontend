<template>
    <div>
        <h3 style="text-align: center">Penger tapt på kasting per kategori</h3>
    <Pie v-if="loaded" id="my-chart-id" :data="chartData" :options="options" />
    </div>
</template>

<script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'vue-chartjs'
import {tokenStore} from "@/stores/tokenStore";
import wasteService from "@/services/wasteService";

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
    name: "GraphComponent",
    components:{Pie},
    dates:[],
    totalMoneyLost:[],
    data(){
        return{
            loaded:false,
            chartData:{
                labels: [],
                datasets: [
                    {
                        backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
                        data: []
                    }
                ],
            },
            options:{
            }
        }
    },
    async created() {
        this.loaded=false
        let categories = []
        let percentage = []
        try{
            let response = await wasteService.getMoneyLostPerCategory(tokenStore().user.jwt)
            console.log(response)
            for (const data of response.data) {
                categories.push(data.category)
                percentage.push(data.money_lost)
            }
        }catch (error){
            console.log(error)
        }
        this.chartData.labels=categories
        this.chartData.datasets[0].data= percentage
        this.loaded=true
    }
}
</script>

<style scoped>
#my-chart-id{
    width: 100%;
}
</style>