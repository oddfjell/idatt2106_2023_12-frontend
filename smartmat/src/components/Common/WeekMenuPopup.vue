<template>
  <link rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"/>
  <div class="popup-overlay">
    <div class="popup-container">
      <form @submit.prevent="WeekMenu">
        <span class="material-symbols-outlined" @click="close" id="popup-close">close</span>
        <h1 class="popup-title">Tilpass din ukesmeny</h1>
        <h3 style="text-align: center">Antall personer</h3>
        <div id="serving-wrapper" class="numberInput">
          <button type="button" class="incrementbutton" @click="minusServing">-</button>
          <p id="serving-size"> {{ servings }}</p>
          <button type="button" class="incrementbutton" @click="plusServing">+</button>
        </div>
        <h3 style="text-align: center">Antall dager</h3>
        <div id="ndays-wrapper" class="numberInput">
          <button type="button" class="incrementbutton" @click="minusNdays">-</button>
          <p id="serving-size"> {{ ndays }}</p>
          <button type="button" class="incrementbutton" @click="plusNdays">+</button>
        </div>
        <button type="submit" class="popup-button" id="WeekMenu">Lag ukesmeny</button>
      </form>
    </div>
  </div>

</template>

<script>

export default {
  name: "weekMenuPopup",
  props: {},
  /**
   * Returns an object with the initial data of the component.
   * @returns {Object} An object with two properties: `servings` and `ndays` both initialized to 1 and 7, respectively.
   */
  data() {
    return {
      servings: 1,
      ndays: 7,
    }
  },
  methods: {
    /**
     * Emits a 'newWeekMenu' event with an object containing the number of servings and number of days.
     * @emits newWeekMenu
     */
    WeekMenu() {
      this.$emit('newWeekMenu', {servings: this.servings, ndays: this.ndays})
    },
    /**
     * Emits a "closePopup" event to the parent component.
     *
     * @emits closePopup
     */
    close() {
      this.$emit("closePopup");
    },

    /**
     * Increases the number of servings by 1 if the current number of servings is less than 25.
     */
    plusServing() {
      console.log("bip")
      if (this.servings < 25) {
        this.servings++
      }
    },
    /**
     *Decreases the number of servings by one if it is greater than 1.
     */
    minusServing() {
      if (this.servings > 1) {
        this.servings--
      }
    },
    /**
     * Increases the number of days for which the menu is planned.
     * If the number of days is already at its maximum (7), nothing happens.
     */
    plusNdays() {
      if (this.ndays < 7) {
        this.ndays++
      }
    },
    /**

     Decreases the number of days in the week menu by 1, if it's greater than 1.
     */
    minusNdays() {
      if (this.ndays > 1) {
        this.ndays--
      }
    }
  }
}
</script>

<style scoped>
.numberInput {
  margin: auto;
  width: 50%;
  display: flex;
  justify-content: space-evenly;
}

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-container {
  position: relative;
  background-color: #fff;
  width: 25em;
  max-width: 90%;
  padding: 2.5em;
  border-radius: 2em;
  box-shadow: 0 0 4em rgba(0, 0, 0, 0.5);
}

.popup-title {
  margin-top: 0;
  font-size: 2em;
  font-weight: bold;
  text-align: center;
  color: #333;
}

.popup-button {
  color: #fff;
  padding: 1em 2em;
  border: none;
  border-radius: 3em;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s;
  display: block;
  margin: 0 auto;
  width: 50%;
}

#WeekMenu {
  background: #6dbd5e;
  margin-top: 20px;
}

#WeekMenu:hover {
  background: black;
}

#popup-close {
  position: absolute;
  top: 1em;
  right: 1em;
  font-size: 1.5em;
  font-weight: bold;
  color: #333;
  cursor: pointer;
  transition: color 0.3s;
}


#popup-close:hover {
  color: #de1726;
}

.material-symbols-outlined {
  float: right;
  font-variation-settings: 'FILL' 0,
  'wght' 400,
  'GRAD' 0,
  'opsz' 48
}

.material-symbols-outlined:hover {
  cursor: pointer;
}


</style>