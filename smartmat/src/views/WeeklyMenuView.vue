<template>
  <link rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"/>
  <div v-if="username" id="page">
    <div v-if="this.displayRecipes.length>0">

      <div id="carousel-wrapper">
        <button class="navigation-icon" id="btn-left" @click="carousel.prev()"> &lt</button>
        <Carousel ref="carousel" :wrap-around="true" :settings="settings" :breakpoints="breakpoints" id="carousel">
          <Slide v-for="recipe in displayRecipes" :key="recipe">
            <div class="carousel__item" :style="{backgroundImage: 'url(' + recipe.image + ')' }">
              <h3 id="slideTitle"> {{ recipe.title }} </h3></div>
          </Slide>
          <template #addons>
            <div id="pagination">
              <Pagination/>
            </div>
            <Navigation>
              <template #next>
              </template>
              <template #prev>
              </template>
            </Navigation>


          </template>
        </Carousel>
        <button class="navigation-icon" id="btn-right" @click="carousel.next()"> ></button>
      </div>

      <p id="info">{{ info }}</p>
      <div id="controlPanel">
        <div id="containerThisWeekMenu">
          <div class=" Btn addToShoppingList">
            <button class="GreenBtn" @click="addToShoppingList">
              Legg til varer i handleliste
            </button>
          </div>
        </div>
        <button class="GreenBtn" id="refreshRecipeBtn" :disabled="isLoading"
                @click="getAndChangeRecipe">
          <span class="material-symbols-outlined">sync</span>
        </button>
        <div id="containerNewWeekMenu">
          <button @click="getNewWeekMenu" class="Btn GreenBtn"> Velg ny ukesmeny</button>
        </div>
      </div>
      <div class="container" v-if="this.carousel">
        <h1 class="ingredients-title">Ingredienser</h1>
        <p style="display: none">{{ currentSlide }}</p>
        <div v-if="this.displayRecipes[currentSlide.value]">
          <a :href="this.displayRecipes[currentSlide.value].url" class="ingredients-title" id="link">Se på matprat</a>
          <p class="ingredients-text" :key="this.displayRecipes[currentSlide._value] + index"
             v-for="(ingredient, index) in this.displayRecipes[currentSlide._value].ingredients ">
            {{ ingredient }}</p>
        </div>
      </div>
    </div>
    <div style="text-align: center" v-else class="container">
      <h1>Du har ingen ukesmeny enda</h1>
      <div class="Btn">
        <button class="Btn GreenBtn" @click="getNewWeekMenu"> Få en ukesmeny!</button>
      </div>
    </div>
    <div v-if="popup">
      <WeekMenuPopup @newWeekMenu="newWeekMenu" @closePopup="closeThePopup"></WeekMenuPopup>
    </div>
  </div>
  <div v-else><h1>Please log in</h1></div>
</template>

<script>
import {defineComponent, ref} from 'vue'
import {Carousel, Navigation, Slide, Pagination} from 'vue3-carousel'
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
    Pagination,
  },

  methods: {
    /**
     *method that shows a popup of weekly menu which allows the user to select number of servings and number of days
     */
    getNewWeekMenu() {
      this.popup = true
    },

    /**
     *closed the popup of weekly menu which allows the user to select number of servings and number of days
     */
    closeThePopup() {
      this.popup = false;
    },
    /**
     * @async
     * @function Method that generates a new week menu based on the users preferance
     * @param data.servings object with number of servings for the week  menu
     * @param data.ndays object with number of days for the week menu
     * @returns {Promise<void>}
     */
    async newWeekMenu(data) {
      this.popup = false
      await this.loadRecipes(data.servings, data.ndays)
      try {
        await recipeService.saveRecipes(tokenStore().user.jwt, this.displayRecipes)
        this.servings = data.servings
      } catch (error) {
        console.log("error")
      }
    }
  },
  data() {
    return {
      popup: false,
    }
  },

  setup() {
    const carousel = ref(null)

    const displayRecipes = ref([])

    const recipesShown = ref([])
    const servings = ref(1)
    const info = ref("")
    const isLoading = ref(false)

    /**
     * @async
     * @function changeRecipe method that changes the recipe in the menu
     * @param {number} index the index of the recipe that  is getting changed
     * @param recipesResponse New recipe object
     * @returns {Promise<void>}
     */

    const changeRecipe = async (index, recipesResponse) => {
      let oldRecipe = displayRecipes.value.splice(index, 1, recipesResponse)
      recipesShown.value.push(recipesResponse)
      let recipes = [oldRecipe[0], recipesResponse]
      try {
        await recipeService.replaceRecipe(tokenStore().user.jwt, recipes)
      } catch (error) {
        console.log(error)
      } finally {
        info.value = ""
        isLoading.value = false
      }
    }

    /**
     * @async
     * @function getAndChangeRecipe fetches new  recipe
     * @returns {Promise<void>}
     */
    const getAndChangeRecipe = async () => {
      try {
        info.value = "Laster..."
        isLoading.value = true
        let carouselIndex = carousel.value.data.currentSlide._value
        console.log(recipesShown.value)
        let recipesResponse = await recipeService.getNewRecipe(tokenStore().user.jwt, recipesShown.value, servings.value);
        changeRecipe(carouselIndex, recipesResponse.data)
      } catch (error) {
        console.log(error)
      }
    }

    /**
     * @async
     * @function loadRecipes loads recipes for the serving amount
     * @param {number} servings amount of servings per recipe
     * @param{number} nDays amount of days per  recipe
     * @returns {Promise<void>}
     */

    const loadRecipes = async (servings, nDays) => {
      let recipeEntities = [];
      try {
        let recipesResponse = await recipeService.getWeekMenu(tokenStore().user.jwt, servings, nDays);
        let recipes = recipesResponse.data
        for (let recipe of recipes) {
          recipeEntities.push(recipe)
        }
      } catch (error) {
        console.log(error)
      }
      displayRecipes.value = recipeEntities
      recipesShown.value = recipeEntities.slice(0)
      console.log(recipesShown)
    }

    /**
     * @async
     * @function addToShoppingList adds recipes to  the users shoppinglist
     * @returns {Promise<void>}
     */

    async function addToShoppingList() {
      this.info = "Lagrer til handleliste..."
      try {
        await recipeService.addToShoppingList(tokenStore().user.jwt, displayRecipes.value)
        this.info = "Lagret!"
      } catch (error) {
        console.log(error)
        this.info = "Kunne ikke lagre!"
      }
    }

    return {
      displayRecipes,
      changeRecipe,
      getAndChangeRecipe,
      carousel,
      recipesShown,
      servings,
      addToShoppingList,
      loadRecipes,
      info,
      isLoading,
      settings: {
        itemsToShow: 1,
        snapAlign: "start",
      },
      breakpoints: {
        501: {
          itemsToShow: 2.5,
          snapAlign: "center",
        },
      }
    }
  },
  /**
   * @async
   * @function mounted fetches the week menu when  mounted
   * @returns {Promise<void>}
   */
  async mounted() {
    try {
      let response = await recipeService.getSavedWeekMenu(tokenStore().user.jwt)
      this.recipesShown = response.data.slice(0)
      console.log(this.recipesShown)
      this.displayRecipes = response.data
    } catch (error) {
      console.log(error)
    }
  },
  /**
   *  @function created
   */
  created() {
    if (!tokenStore().user.username) {
      router.push("/")
    }
  },

  /**
   *  @computed
   */
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
</style>