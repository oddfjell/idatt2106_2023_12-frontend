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
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels)

export default {
    name: "GraphComponent",
    components:{Pie},
  /**
   * @returns {{loaded: boolean, chartData: {datasets: [{backgroundColor: string[], data: number[], datalabels: {anchor: string, align: string}}], labels: *[]}, options: {plugins: {datalabels: {formatter: (function(*): string), color: string, font: {weight: string}}}}}}
   */
    data(){
        return{
            loaded:false,
            chartData:{
                labels: [],
                datasets: [
                    {
                        datalabels: {
                            anchor: "end",
                            align: "start",
                        },
                        backgroundColor: ["Yellow"],
                        data: [100]
                    }
                ],
            },
            options: {
                plugins: {
                    datalabels: {
                        formatter: (value) => value + " kr",
                        color: '#000000',
                        font:{
                            weight:"bold"
                        }
                    }
                },
            },
        }
    },

  /**
   * @async
   * @function created fetches money lost per category and data to dislpay chart
   * @returns {Promise<void>}
   */
    async created() {
        this.loaded=false
        let categories = []
        let percentage = []
        let colors = ['#00D8FF', '#E46651', '#41B883', '#DD1B16']
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
        for (let i = 4; i < categories.length; i++) {
            colors.push('#'+Math.floor(Math.random()*16777215).toString(16));
        }
        this.chartData.labels=categories
        this.chartData.datasets[0].data= percentage
        this.chartData.datasets[0].backgroundColor = colors
        this.loaded=true
        if(this.chartData.datasets[0].data.length===0){
            this.chartData.labels=["No data"]
        }
    }
}
</script>

<style scoped>
#my-chart-id{
    width: 100%;
}
</style>