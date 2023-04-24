<template>
    <button class="Btn throwModalBtn" @click="showThrowModal=true"> Kastet </button>
    <Teleport to="body">
        <BaseModal id="throwModal" :show="showThrowModal">
            <template #header>
                <h3>Kastet</h3>
            </template>
            <template #body>
                <p>Hvor mye var det igjen av varen?</p>
                <div class="slidecontainer">
                <input tabindex="0" type="range" step="10" min="0" max="100" value="100" class="slider" id="throwSlider" @input="onSliderInput">
                </div>
                <p v-if="value>90">Hele varen ble kastet :(</p>
                <p v-else-if="value<10">Ingenting! Hele varen ble brukt! :)</p>
                <p v-else>{{value}}% igjen</p>
            </template>
            <template #footer>
                <button class="Btn throwModalBtn" @click="close">Kast</button>
                <button class="Btn" @click="close" id="cancelBtn" >Avbryt</button>
            </template>
        </BaseModal>
    </Teleport>
</template>

<script>
import BaseModal from "@/components/Common/BaseModal.vue";

export default {
    name: "ThrowComponent",
    components: {BaseModal},
    data() {
        return {
            showThrowModal: false,
            value:100
        }
    },
    methods:{
        onSliderInput(event){
            this.value=event.target.value;
        },
        close(){
            console.log("Bruh")
            this.showThrowModal=false
        }
    }
}
</script>

<style scoped>
.slidecontainer {
    width: 100%;
}
.slider{
    width: 100%;
}
.Btn{
    float: right;
    border: 0;
    width: fit-content;
    padding: 5%;
    border-radius: 5px;
    margin: 0;
}

.throwModalBtn{
    background: #fc546c;
    color: white;
}

#cancelBtn{
    background: #d5d5d5;
    color: black;
    margin-right: 10px;
}

.throwModalBtn:hover {
    background-color: #ff2222;
    cursor: pointer;
}

#cancelBtn:hover {
    background-color: #b7b7b7;
    cursor: pointer;
}

</style>