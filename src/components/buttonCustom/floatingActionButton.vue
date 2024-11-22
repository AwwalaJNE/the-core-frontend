<template>
    <div class="fab-container">
        <button class="fab" @click="handleClick">
            <img 
                :src="require('../../assets/svg/receiving.svg')" 
            >
        </button>
    </div>
</template>
<script>
export default {
    name: "FloatingActionButton",
    props: {
        handleClick: Function
    }
};
</script>
<style scoped>
.fab-container {
    position: fixed;
    bottom: 50px;
    right: 30px;
    z-index: 1001;
}

.fab {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background-color: rgb(25 91 255);
    color: white;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    font-size: 24px;
    transition: all 0.3s ease;
}
</style>
  