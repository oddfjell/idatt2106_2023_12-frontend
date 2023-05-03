<template>
    <div>
        <h3 style="text-align: center">Penger tapt på kasting siste måned</h3>
<Line v-if="loaded"  id="my-chart-id"
       :options="chartOptions"
       :data="chartData"/>
    </div>
</template>

<script>
import {Line} from 'vue-chartjs'
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement
} from 'chart.js'
import {tokenStore} from "@/stores/tokenStore";
import wasteService from "@/services/wasteService";

ChartJS.register(CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend)

export default {
    name: "GraphComponent",
    components:{Line},
    dates:[],
    totalMoneyLost:[],
    data(){
        return{
            loaded:false,
            chartData: {
                labels: this.dates,
                datasets: [{
                    label: 'Statestikk',
                    data: this.totalMoneyLost,
                    fill: false,
                    borderColor: '#6DBD5E',
                    backgroundColor:"#6DBD5E",
                    tension: 0.1,
                    datalabels: {
                        anchor: "end",
                        align: "end",
                    },
            }],
            },
            chartOptions: {
                scales: {
                    x:{
                      title:{
                          display:true,
                          text:"Måned"
                      }
                    },
                    y:{
                        min:0,
                        title:{
                            display:true,
                            text:"Penger tapt på å kaste"
                        },
                        ticks: {
                            // add "kr" behind the tick label
                            callback: function (value, index, values) {
                                return value + " kr";
                            },
                        }
                    }
                },
                plugins: {
                    // display the data label below the point and add "kr" behind it
                    datalabels: {
                        display: true,
                        color: 'black',
                        align: 'center',
                        offset: 10,
                        font: {
                            weight: 'bold',
                            size: 14,
                        },
                        formatter: function (value, context) {
                            return value + " kr";
                        },
                    },
                },
            },

        }
    },
    async created() {
        this.loaded=false
        let dates = []
        let moneyLost = []
        const thisDate = new Date()
        try{
          let response = await wasteService.getMoneyLost(tokenStore().user.jwt, thisDate.getMonth()+1)
            for (const data of response.data) {
                let date = new Date(data.date)
                dates.push(date.toLocaleDateString())
                moneyLost.push(data.total)
            }
        }catch (error){
            console.log(error)
        }
        this.chartData.datasets[0].label=thisDate.toLocaleString([], {month:'long'}).toUpperCase()
        this.chartData.labels=dates
        this.chartData.datasets[0].data= moneyLost
        this.loaded=true
    }

}
</script>

<style scoped>
#my-chart-id{
    width: 100%;
}
</style>