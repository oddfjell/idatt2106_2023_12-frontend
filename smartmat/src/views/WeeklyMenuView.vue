<template>
  <div v-if="username" id="page">
      <div v-if="this.displayRecipes.length>0">
    <Carousel ref="carousel" :wrap-around="false" :items-to-show="1" id="carousel">
      <Slide v-for="recipe in displayRecipes" :key="recipe">
        <div class="carousel__item" :style="{backgroundImage: 'url(' + recipe.image + ')' }">
          <h3 id="slideTitle"> {{ recipe.title }} </h3></div>
      </Slide>
      <template #addons>
        <Navigation/>
        <button id="refreshRecipeBtn" @click="getAndChangeRecipe">
          <img src="../images/refresh-icon.png" alt="refresh-icon">
        </button>
      </template>
    </Carousel>
          <p id="info">{{info}}</p>
      <div id="controlPanel">
          <div id="containerThisWeekMenu">
        <div class=" Btn addToShoppingList">
            <button class="BlueBtn" @click="addToShoppingList">
                Legg til varer i handleliste</button>
        </div>
          </div>
          <div id="containerNewWeekMenu">
              <button @click="getNewWeekMenu" class="Btn BlueBtn"> Velg ny ukesmeny</button>
          </div>
      </div>
    <div class="container" v-if="this.carousel">
      <h1 class="ingredients-title">Ingredienser</h1>
      <p style="display: none">{{ currentSlide }}</p>
      <div v-if="this.displayRecipes[currentSlide.value]">
        <a :href="this.displayRecipes[currentSlide.value].url">Se på matprat</a>
        <p class="ingredients-text" :key="this.displayRecipes[currentSlide._value] + index"
           v-for="(ingredient, index) in this.displayRecipes[currentSlide._value].ingredients ">{{ ingredient }}</p>
      </div>
    </div>
      </div>
      <div style="text-align: center" v-else class="container">
          <h1>Du har ingen ukesmeny enda</h1>
          <div class="Btn">
            <button class="BlueBtn" @click="getNewWeekMenu"> Få en ukesmeny!</button>
          </div>
      </div>
      <div v-if="popup">
          <WeekMenuPopup @newWeekMenu="newWeekMenu" @closePopup="closeThePopup"></WeekMenuPopup>
      </div>
  </div>
  <div v-else><h1>Please log in</h1></div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { Carousel, Navigation, Slide } from 'vue3-carousel'
import recipeService from '../services/recipeService'
import {tokenStore} from "@/stores/tokenStore";

import 'vue3-carousel/dist/carousel.css'
import router from "@/router";
import WeekMenuPopup from "@/components/Common/WeekMenuPopup.vue";

export default defineComponent({
  name: 'Basic',
  components: {
      WeekMenuPopup,
    Carousel,
    Slide,
    Navigation,
  },

  methods: {
      getNewWeekMenu(){
          this.popup=true
      },
      closeThePopup() {
          this.popup = false;
      },
      async newWeekMenu(data){
          this.popup=false
          await this.loadRecipes(data.servings, data.ndays)
          try{
              await recipeService.saveRecipes(tokenStore().user.jwt, this.displayRecipes)
          }catch (error){
              console.log("error")
          }
      }
  },
  data(){
    return{
      info:"",
      popup:false,
    }
  },

  setup() {
    const carousel = ref(null)

    const displayRecipes = ref([])

    const recipesShown = ref([])

    const servings = ref(4)

    const changeRecipe = (index, recipesResponse) => {
      let oldRecipe = displayRecipes.value.splice(index, 1, recipesResponse)
      recipesShown.value.push(oldRecipe[0])
    }

    const plusServing = () => {
      if (servings.value < 25) {
        servings.value++
        loadRecipes();
      }
    }

    const minusServing = () => {
      if (servings.value > 1) {
        servings.value--
        loadRecipes();
      }
    }

    const getAndChangeRecipe = async () => {
      try {
        let carouselIndex = carousel.value.data.currentSlide._value
        let recipesResponse = await recipeService.getNewRecipe(tokenStore().user.jwt, recipesShown.value, servings.value);
        changeRecipe(carouselIndex, recipesResponse.data)
      } catch (error) {
        console.log(error)
      }
    }

    const loadRecipes = async (servings, nDays) => {
      let recipeEntities = [];
        try {
            let recipesResponse = await recipeService.getWeekMenu(tokenStore().user.jwt, servings, nDays);
            let recipes = recipesResponse.data
            for (let recipe of recipes) {
                recipeEntities.push(recipe)
            }
        }catch (error){
            console.log(error)
        }
        displayRecipes.value=recipeEntities
        recipesShown.value=recipeEntities.slice(0)
    }

    async function addToShoppingList(){
        this.info="Lagrer til handleliste..."
        try {
            await recipeService.addToShoppingList(tokenStore().user.jwt, displayRecipes.value)
            this.info="Lagret!"
        }catch (error){
            console.log(error)
            this.info="Kunne ikke lagre!"
        }
    }

    return {
      displayRecipes,
      changeRecipe,
      getAndChangeRecipe,
      carousel,
      recipesShown,
      addToShoppingList,
      servings,
      plusServing,
      minusServing,
      loadRecipes
    }
  },
    async mounted() {
      try{
          let response = await recipeService.getSavedWeekMenu(tokenStore().user.jwt)
          console.log(response.data)
          this.displayRecipes = response.data
      }catch (error){
          console.log(error)
      }
    },
    created() {
    if (!tokenStore().user.username) {
      router.push("/")
    }
  },
  computed: {
    username() {
      return tokenStore().user.username
    },
    currentSlide() {
      return this.carousel.data.currentSlide
    },
  }
})
</script>

<style scoped>
@import "../assets/style/weeklyMenu.css";
#controlPanel{
    display: flex;
    justify-content: space-evenly;
}


</style>