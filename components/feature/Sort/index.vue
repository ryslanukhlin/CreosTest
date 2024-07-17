<script lang="ts" setup>
import { SortPriceEnum } from "~/store/product.slice";
import type { Option } from "./option.model";

import materials from "~/materials.json";

const state = useProductStore();
const optionsSortPrice: Option[] = [
    { id: "1", name: "по возрастанию" },
    { id: "2", name: "по убыванию" },
];
const optionsMaterial: Option[] = [];

const priceSelect = ref(optionsSortPrice[0]);
const materialSelect = ref(materials[0]);

watch(priceSelect, (value) => {
    const result = value.id === "1" ? SortPriceEnum.ASC : SortPriceEnum.DESC;
    state.setFilterPriceSort(result);
});

watch(materialSelect, (value) => {
    state.setFilterMaterialSort(value.id);
});

onMounted(() => {
    optionsMaterial.push(...(materials as Option[]));
});
</script>
<template>
    <div class="sotr-block">
        <SelectInpit
            :options="optionsSortPrice"
            label="Сортировать по:"
            v-model:select="priceSelect"
        />
        <SelectInpit
            :options="optionsMaterial"
            label="Материал"
            v-model:select="materialSelect"
        />
    </div>
</template>

<style lang="scss" scoped>
.sotr-block {
    display: flex;

    & div:first-of-type {
        margin-right: 24px;
    }

    @include md {
        flex-direction: column;

        & div {
            margin-top: 10px;
        }

        & div:first-of-type {
            margin-right: 0;
            margin-top: 0;
        }
    }
}
</style>
