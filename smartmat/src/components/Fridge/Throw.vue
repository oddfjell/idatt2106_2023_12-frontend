<template>
  <button class="Btn throwModalBtn" @click="showThrowModal=true"> Kastet</button>
  <Teleport to="body">
    <BaseModal id="throwModal" :show="showThrowModal">
      <template #header>
        <h3>Kastet</h3>
      </template>
      <template #body>
        <p>Hvor mye var det igjen av varen?</p>
        <div class="slidecontainer">
          <input tabindex="0" type="range" step="10" min="0" max="100" value="100" class="slider" id="throwSlider"
                 @input="onSliderInput">
        </div>
        <p v-if="value>90">Hele varen ble kastet :(</p>
        <p v-else-if="value<10">Ingenting! Hele varen ble brukt! :)</p>
        <p v-else>{{ value }}% igjen</p>
      </template>
      <template #footer>
        <button class="Btn throwModalBtn" id="throwModalBtn" @click="close">Kast</button>  <!--id="throwModalBtn"-->
        <button class="Btn" @click="exit" id="cancelBtn">Avbryt</button>
      </template>
    </BaseModal>
  </Teleport>
</template>

<script>
import BaseModal from "@/components/Common/BaseModal.vue";
import fridgeService from "@/services/fridgeService";
import {tokenStore} from "@/stores/tokenStore";

export default {
  name: "ThrowComponent",
  components: {BaseModal},
  data() {
    return {
      showThrowModal: false,
      value: 100,
    }
  },
  props: {
    grocery: Object
  },
  methods: {
    /**
     * @function updates the value on the slider
     * @param event
     */
    onSliderInput(event) {
      this.value = event.target.value;
    },

    /**
     * @function close closes the throw modal
     * @async
     * @returns {Promise<void>}
     */
    async close() {
      this.showThrowModal = false
      console.log(this.grocery.name)
      //TODO pris
      let thrownProduct = {name: this.grocery.name, newMoneyValue: this.value}
      await fridgeService.throwGrocery(thrownProduct, tokenStore().user.jwt)
      location.reload();
    },

    /**
     *
     * @returns {Promise<void>}
     */
    async exit() {
      this.showThrowModal = false
    }
  }
}
</script>

<style scoped>
@import "../../assets/style/Throw.css";

</style>