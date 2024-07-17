<script lang="ts" setup>
import type { Product } from "~/store/product.slice";

const state = useProductStore();
const statusBasketAdd = ref(false);

const { product } = defineProps({
    product: {
        type: Object as () => Product,
        required: true,
    },
});

const addBasket = () => {
    statusBasketAdd.value = true;
    state.addToBasket(product.id);
};

const addLovely = () => state.addToLovely(product.id);

const heartColor = computed(() =>
    state.lovelyProducts.includes(product.id) ? "#eb5757" : "black"
);
</script>

<template>
    <div class="card">
        <div v-if="product.price.old_price" class="card__discount">Скидка</div>
        <div class="card__image-wrapper">
            <NuxtImg :src="product.image.url" sizes="238px" />
        </div>
        <div class="card__code">{{ product.code }}</div>
        <div class="card__name">{{ product.name }}</div>
        <div class="card__footer">
            <div class="card__prices">
                <div class="card__price-old" v-if="product.price.old_price">
                    {{ Math.floor(product.price.old_price) }}₽
                </div>
                <div class="card__price-current">
                    {{ Math.floor(product.price.current_price) }}₽
                </div>
            </div>
            <div class="card__actions">
                <IconButton
                    v-if="!state.basketProducts.includes(product.id)"
                    @click="addBasket"
                    ><NuxtImg src="/svg/Trolley.svg" height="18px" width="18px"
                /></IconButton>
                <NuxtImg
                    v-if="statusBasketAdd"
                    class="card__success"
                    src="/svg/Success.svg"
                    height="18px"
                    width="18px"
                />
                <IconButton @click="addLovely"
                    ><Heart :color="heartColor"
                /></IconButton>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.card {
    border: 1px solid #eeeeee;
    padding: 4px 13px 9px;
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &__discount {
        position: absolute;
        top: 11px;
        left: 0;
        background-color: $red;
        color: white;
        font-size: 14px;
        padding: 3px 16px;
        font-family: "SF PRO UI Text";
    }

    &__image-wrapper {
        display: flex;
        justify-content: center;
        cursor: pointer;
    }

    &__code {
        color: $gray;
        font-size: 10px;
        margin-top: 23px;
    }

    &__name {
        font-weight: 500;
        color: $black;
        margin-top: 6px;
        cursor: pointer;
    }

    &__footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 4px;
    }

    &__prices {
        display: flex;
    }

    &__price-old {
        color: $gray;
        text-decoration: line-through;
        margin-right: 9px;
    }

    &__price-current {
        color: $black;
    }

    &__actions {
        display: flex;
    }

    &__success {
        height: 40px;
        width: 40px;
        padding: 10px;
    }
}
</style>
