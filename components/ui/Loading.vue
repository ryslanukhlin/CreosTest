<template>
    <div class="loading"></div>
</template>

<style lang="scss" scoped>
.loading {
    position: fixed;
    bottom: 10px;
    right: 10px;
    width: 48px;
    height: 48px;
    border: 5px solid $red;
    border-radius: 50%;
    border-bottom-color: transparent;

    animation: rotate 1s linear infinite;

    @keyframes rotate {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
}
</style>
