<template>
    <button class="icon-button">
        <slot class="icon-button" />
    </button>
</template>

<style lang="scss" scoped>
.icon-button {
    border: none;
    background: none;
    border-radius: 50%;
    padding: 2px;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    z-index: 2;

    &:hover {
        background: $lightGray;
    }

    &::after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        width: 1px;
        height: 1px;
        background: #d6d6d6;
        opacity: 0;
        border-radius: 100%;
        transform: scale(1, 1) translate(-50%);
        transform-origin: 50% 50%;
        z-index: -1;
    }

    @keyframes wave {
        0% {
            transform: scale(0, 0);
            opacity: 1;
        }
        20% {
            transform: scale(25, 25);
            opacity: 1;
        }
        100% {
            opacity: 1;
            transform: scale(40, 40);
        }
    }

    &:focus:not(:active)::after {
        animation: wave 0.2s ease-out;
    }
}
</style>
