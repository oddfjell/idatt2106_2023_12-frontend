<template>
    <button id="throwModalBtn" @click="showThrowModal=true"> Kast </button>
    <Teleport to="body">
        <BaseModal id="throwModal" :show="showThrowModal" @close="showThrowModal = false">
            <template #header>
                <h3>Kast</h3>
            </template>
            <template #body>
                <p>Hvor mye var det igjen av varen?</p>
                <div class="slidecontainer">
                <input tabindex="0" type="range" step="10" min="0" max="100" value="100" class="slider" id="throwSlider" @input="onSliderInput">
                </div>
                <p v-if="value>90">Hele varen ble kastet :(</p>
                <p v-else-if="value<10">Ingenting! Hele varen var brukt! :)</p>
                <p v-else>{{value}}% igjen</p>
            </template>
            <template #footer>
            <button class="Btn" @click="$emit('close')" id="throwBtn">Kast</button>
                <button class="Btn" @click="$emit('close')" id="cancelBtn" >Avbryt</button>
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
    padding: 10px;
    width: 25%;
    border-radius: 5px;
    margin: 0;
}

#throwBtn{
    background: #0b6dff;
    color: white;
}

#cancelBtn{
    background: #b7b7b7;
    color: black;
    margin-right: 10px;
}

#throwBtn:hover {
    background-color: #4169a8;
    cursor: pointer;
}

#cancelBtn:hover {
    background-color: #d0cece;
    cursor: pointer;
}

</style>