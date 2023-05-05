<template>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    <div class="popup-overlay">
        <div class="popup-container">
          <span class="material-symbols-outlined" @click="close" id="popup-close">close</span>
          <h1 class="popup-title">Du har ulagrede endringer</h1>
            <div class="BtnContainer">
          <button class="button popup-button" @click="saving">Lagre endringer</button>
            <button class="button popup-button" @click="withoutSaving">Fortsett uten å lagre</button>
            <button class="button popup-button" @click="close">Avbryt</button>
            </div>
        </div>
    </div>

</template>

<script>
export default {
    name: "PasswordPopup",
    methods:{
        close(){
            this.$emit("closePopup");
        },
        saving(){
            this.$emit("saving");
        },
        withoutSaving(){
            this.$emit("withoutSaving");
        }

    }
}
</script>

<style scoped>
.BtnContainer{
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
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
    padding: 10px;
    border: none;
    border-radius: 3em;
    font-size: 1em;
    cursor: pointer;
    transition: background-color 0.3s;
    display: block;
    margin: 0 auto;
    width: 30%;
}

.button{
    background: #6dbd5e;
}
.button:hover{
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
    font-variation-settings:
            'FILL' 0,
            'wght' 400,
            'GRAD' 0,
            'opsz' 48
}

.material-symbols-outlined:hover {
    cursor: pointer;
}


</style>