<template>
  <div v-if="username" id="page">
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
    <p id="info">{{ info }}</p>
    <div class=" Btn addToShoppingList">
      <button class="BlueBtn" @click="addToShoppingList">
        Legg til varer i handleliste
      </button>
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
  <div v-else><h1>Please log in</h1></div>
</template>

<script>
import {defineComponent, ref} from 'vue'
import {Carousel, Navigation, Slide} from 'vue3-carousel'
import recipeService from '../services/recipeService'
import {tokenStore} from "@/stores/tokenStore";

import 'vue3-carousel/dist/carousel.css'
import router from "@/router";

export default defineComponent({
  name: 'Basic',
  components: {
    Carousel,
    Slide,
    Navigation,
  },
  data() {
    return {
      info: ""
    }
  },
  setup() {
    const carousel = ref(null)

    const displayRecipes = ref([])

    const recipesShown = ref([])

    const changeRecipe = (index, recipesResponse) => {
      let oldRecipe = displayRecipes.value.splice(index, 1, recipesResponse)
      console.log(recipesResponse)
      recipesShown.value.push(oldRecipe[0])
    }

    const getAndChangeRecipe = async () => {
      try {
        let carouselIndex = carousel.value.data.currentSlide._value
        let recipesResponse = await recipeService.getNewRecipe(tokenStore().user.jwt, recipesShown.value);
        changeRecipe(carouselIndex, recipesResponse.data)
      } catch (error) {
        console.log(error)
      } finally {

      }
    }

    async function addToShoppingList() {
      this.info = "Lagrer til handleliste..."
      try {
        await recipeService.addToShoppingList(tokenStore().user.jwt, displayRecipes.value)
        this.info = "Lagret!"
      } catch (error) {
        console.log(error)
      }
    }

    return {
      displayRecipes,
      changeRecipe,
      getAndChangeRecipe,
      carousel,
      recipesShown,
      addToShoppingList
    }
  },
  async mounted() {
    let recipeEntities = [];
    try {
      let recipesResponse = await recipeService.getWeekMenu(tokenStore().user.jwt);
      let recipes = recipesResponse.data
      for (let recipe of recipes) {
        recipeEntities.push(recipe)
      }
    } catch (error) {
      console.log(error)
    } finally {

    }
    this.displayRecipes = recipeEntities
    this.recipesShown = recipeEntities.slice(0)
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

#page{
  width: 100%;
  height: 100%;
  margin: auto;
  zoom: 80%;
}

.carousel__item {
  min-height: 10em;
  padding: 4em;
  background-color: lightblue;
  color: black;
  font-size: 1.2em;
  border-radius: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  width: 100%;
  margin: auto;

}

#carousel {
  width: 50%;
  margin: auto;
}

.carousel__slide {
  padding: 5px;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
}

.addToShoppingList {
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  background-color: #f7f7f7;
  border-radius: 1.25em;
  padding: 1.875em;
  margin-bottom: 2.5em;
  width: 100%;
}

img {
  width: 2em;
  height: 2em;
  cursor: pointer;
}

#slideTitle {
  background-color: rgb(76, 75, 75, 0.6);
  color: white;
  text-shadow: 2em 2em 2em black;
  width: 100%;
}

#info {
  text-align: center;
}

.ingredients-title {
  font-size: 2.5em;
  font-weight: bold;
  margin-bottom: 1.25em;
  color: #333;
  text-transform: uppercase;
  letter-spacing: 0.125em;
  text-align: center;
}

.ingredients-text {
  color: #555;
  font-size: 1.25em;
  line-height: 1.4;
}

</style>