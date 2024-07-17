<script setup lang="ts">
import { onMounted } from "vue";
import type { Option } from "../feature/Sort/option.model";

const select = defineModel("select", {
    required: true,
    type: Object as () => Option,
});
const { options, label } = defineProps({
    options: {
        type: Array<Option>,
        required: true,
    },
    label: String,
});

const show = ref(false);
const labelRef = ref<Node | null>(null);
const input = ref<Node | null>(null);

const changeValue = (option: Option) => {
    select.value = option;
    show.value = false;
};

const checkClick = (e: MouseEvent) => {
    if (
        input.value?.contains(e.target as Node) ||
        labelRef.value?.contains(e.target as Node)
    )
        show.value = true;
    else show.value = false;
};

onMounted(() => {
    document.addEventListener("click", checkClick);
});

onUnmounted(() => {
    document.removeEventListener("click", checkClick);
});
</script>

<template>
    <div class="select-input" :class="{ 'select-input_active': show }">
        <div class="select-input__label" ref="labelRef">{{ label }}</div>
        <div class="select-input__textblock" ref="input">
            <div class="select-input__wrapper">
                <div class="select-input__value">{{ select.name }}</div>
                <div class="select-input__arrow" />
            </div>
            <div class="select-input__options" v-if="show">
                <div
                    class="select-input__option"
                    v-for="option in options"
                    :key="option.id"
                    @click="changeValue(option)"
                >
                    {{ option.name }}
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.select-input {
    &__textblock {
        padding: 9px 16px;
        background-color: $lightGray;
        border: none;
        position: relative;
        min-width: 288px;
        font-size: 14px;
        cursor: pointer;

        @include sm {
            min-width: auto;
            width: 100%;
        }
    }

    &_active {
        z-index: 2;
    }

    &__label {
        display: inline-block;
        font-size: 12px;
        margin-left: 16px;
        font-family: "SF PRO UI Text";
        color: #4f4f4f;
        margin-bottom: 6px;
        cursor: pointer;
    }

    &__value {
        color: $black;
        font-family: "SF PRO UI Text";
    }

    &__options {
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
    }

    &__option {
        padding: 9px 16px;
        background-color: $lightGray;
        border: none;
        color: $black;
        width: 100%;
        border-bottom: 1px solid gray;
        font-family: "SF PRO UI Text";
        font-size: 14px;

        &:first-child {
            border-top: 1px solid gray;
        }

        &:last-child {
            border-bottom: none;
        }

        &:hover {
            background-color: #bbbbbb;
        }
    }

    &__wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    &__arrow {
        position: relative;
        height: 10px;
        width: 18px;

        &::after,
        &::before {
            content: "";
            position: absolute;
            background-color: $black;
            height: 12px;
            width: 2px;
        }

        &::after {
            transform: rotate(45deg);
            left: 11px;
        }

        &::before {
            transform: rotate(-45deg);
            right: 12px;
        }
    }
}
</style>
