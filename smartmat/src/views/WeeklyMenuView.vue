<template>
    <div v-if="username">
  <Carousel ref="carousel" :wrap-around="false" :items-to-show="1">
    <Slide v-for="recipe in displayRecipes" :key="recipe">
      <div class="carousel__item"> {{ recipe.title }}</div>
    </Slide>
    <div></div>

    <template #addons>
      <Navigation />
      <button @click="getAndChangeRecipe">
        <img src="../images/refresh-icon.png" alt="refresh-icon">
      </button>
    </template>
  </Carousel>
    </div>
  <div v-else><h1>Please log in</h1></div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { Carousel, Navigation, Slide } from 'vue3-carousel'
import recipeService from '../services/recipeService'
import { tokenStore } from "@/stores/tokenStore";

import 'vue3-carousel/dist/carousel.css'

export default defineComponent({
  name: 'Basic',
  components: {
    Carousel,
    Slide,
    Navigation,
  },
  setup() {
    const carousel = ref(null)

    const displayRecipes = ref([])

    const recipesShown = ref([])

    const changeRecipe = (index, recipesResponse) => {
      recipesShown.value.push(displayRecipes.value[index])
      displayRecipes.value.splice(index, 1, recipesResponse)
    }

    const getAndChangeRecipe = async () => {
        try {
            let carouselIndex = carousel.value.data.currentSlide._value
            let recipesResponse = await recipeService.getNewRecipe(tokenStore().user.jwt, recipesShown.value);
            changeRecipe(carouselIndex, recipesResponse.data)
        }catch (error){
            console.log(error)
        }finally {
        
        }
    }
    return {
      displayRecipes,
      changeRecipe,
      getAndChangeRecipe,
      carousel,
      recipesShown
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
        }catch (error){
            console.log(error)
        }finally {
        
        }
        this.displayRecipes=recipeEntities
        this.recipesShown=recipeEntities
  },
  computed:{
      username(){
          return tokenStore().user.username
      }
  }
})
</script>

<style scoped>
.carousel__item {
  min-height: 200px;
  width: 100%;
  background-color: lightblue;
  color: black;
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel__slide {
  padding: 5px;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
}
button {
  border: none;
  cursor: pointer;
  appearance: none;
  background-color: inherit;
  transition: transform 0.3s ease-in-out;
}

button:hover {
  transform: scale(1.2);
}


img {
  width: 20px;
  height: 20px;
}
</style>