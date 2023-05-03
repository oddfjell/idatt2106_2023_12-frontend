<template>
    <div v-if="username">
  <Carousel ref="carousel" :wrap-around="false" :items-to-show="1">
    <Slide v-for="recipe in displayRecipes" :key="recipe">
      <div class="carousel__item" :style="{backgroundImage: 'url(' + recipe.image + ')' }">
          <h3 id="slideTitle"> {{ recipe.title }} </h3></div>
    </Slide>
    <template #addons>
      <Navigation />
      <button id="refreshRecipeBtn" @click="getAndChangeRecipe">
        <img src="../images/refresh-icon.png" alt="refresh-icon">
      </button>
    </template>
  </Carousel>
        <p id="info">{{info}}</p>
        <div id="serving-wrapper">
          <button class="incrementbutton" @click="minusServing">-</button>
          <p id="serving-size"> {{ servings }}</p>
          <button class="incrementbutton" @click="plusServing">+</button>
        </div>
        <div class=" Btn addToShoppingList">
            <button class="BlueBtn" @click="addToShoppingList">
                Legg til varer i handleliste</button>
        </div>
        <div class="container" v-if="this.carousel">
            <h1>Ingredienser</h1>
        <p style="display: none">{{currentSlide}}</p>
            <div v-if="this.displayRecipes[currentSlide.value]">
            <a :href="this.displayRecipes[currentSlide.value].url">Se på matprat</a>
            <p :key="this.displayRecipes[currentSlide._value] + index" v-for="(ingredient, index) in this.displayRecipes[currentSlide._value].ingredients ">{{ingredient}}</p>
            </div>
        </div>

    </div>
  <div v-else><h1>Please log in</h1></div>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
import { Carousel, Navigation, Slide } from 'vue3-carousel'
import recipeService from '../services/recipeService'
import { tokenStore } from "@/stores/tokenStore";

import 'vue3-carousel/dist/carousel.css'
import router from "@/router";

export default defineComponent({
  name: 'Basic',
  components: {
    Carousel,
    Slide,
    Navigation,
  },
  methods: {
    async loadRecipes() {
      
    }
  },
    data(){
      return{
          info:""
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
      if(servings.value < 25) {
        servings.value++
        loadRecipes();
      }
    }

    const minusServing = () => {
      if(servings.value > 1){
      servings.value--
      loadRecipes();
    }
    }

    const getAndChangeRecipe = async () => {
        try {
            let carouselIndex = carousel.value.data.currentSlide._value
            let recipesResponse = await recipeService.getNewRecipe(tokenStore().user.jwt, recipesShown.value, servings.value);
            changeRecipe(carouselIndex, recipesResponse.data)
        }catch (error){
            console.log(error)
        }finally {
        
        }
    }

    const loadRecipes = async () => {
      let recipeEntities = [];
        try {
            let recipesResponse = await recipeService.getWeekMenu(tokenStore().user.jwt, servings.value);
            let recipes = recipesResponse.data
            for (let recipe of recipes) {
                recipeEntities.push(recipe)
            }
        }catch (error){
            console.log(error)
        }finally {
        
        }
        displayRecipes.value=recipeEntities
        recipesShown.value=recipeEntities.slice(0)
    }

    onMounted(() => {
      loadRecipes()
    })

    async function addToShoppingList(){
        this.info="Lagrer til handleliste..."
        try {
            await recipeService.addToShoppingList(tokenStore().user.jwt, displayRecipes.value)
            this.info="Lagret!"
        }catch (error){
            console.log(error)
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
    
  },
    created() {
        if(!tokenStore().user.username){
            router.push("/")
        }
    },
  computed:{
      username(){
          return tokenStore().user.username
      },
      currentSlide(){
          return this.carousel.data.currentSlide
      },
  }
})
</script>

<style scoped>
.carousel__item {
  min-height: 200px;
    padding: 50px;
  background-color: lightblue;
  color: black;
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
    background-size:     cover;                      /* <------ */
    background-repeat:   no-repeat;
    background-position: center center;

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
 .container{
     border: 1px solid black
 }
img {
  width: 20px;
  height: 20px;
}
#slideTitle{
    background-color: rgb(76, 75, 75, 0.6);
    color: white;
    text-shadow: 2px 2px 2px black;
    width: 100%;
}
#info{
    text-align: center;
}

#serving-wrapper{
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>