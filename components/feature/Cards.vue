<script setup lang="ts">
import products from "~/items.json";
import { useProductStore, type Product } from "~/store/product.slice";

const store = useProductStore();
const { setLoading } = inject<{
    loading: boolean;
    setLoading: (loading: boolean) => void;
}>("loading")!;

onMounted(() => {
    setLoading(true);
    setTimeout(() => {
        store.initProducts(products as Product[]);
        if (localStorage.getItem("basketProducts")) {
            store.setToBasket(
                JSON.parse(localStorage.getItem("basketProducts")!)
            );
        }
        if (localStorage.getItem("lovelyProducts")) {
            store.setToLovely(
                JSON.parse(localStorage.getItem("lovelyProducts")!)
            );
        }
        setLoading(false);
    }, 4000);
});
</script>

<template>
    <div class="cards-block">
        <Card
            v-for="product in store.getProducts"
            :key="product.id"
            :product="product"
        />
    </div>
</template>

<style lang="scss" scoped>
.cards-block {
    display: grid;
    grid-gap: 40px 48px;
    grid-template-columns: repeat(4, 1fr);
    margin-top: 41px;

    @include xxl {
        grid-template-columns: repeat(3, 1fr);
    }

    @include xl {
        grid-template-columns: repeat(2, 1fr);
    }

    @include md {
        grid-template-columns: 1fr;
    }

    @include sm {
        margin-top: 20px;
        grid-gap: 10px;
    }
}
</style>
