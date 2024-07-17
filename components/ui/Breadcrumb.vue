<template>
    <div class="breadcrumb">
        <span class="breadcrumb__text">Главная</span>
        <span class="breadcrumb__line">/</span>
        <span class="breadcrumb__text">Системы хранения</span>
        <span class="breadcrumb__line">/</span>
        <span class="breadcrumb__text breadcrumb__text_active"
            >Комплекты стеллажных систем</span
        >
    </div>
</template>

<style lang="scss" scoped>
.breadcrumb {
    color: #727783;

    &__text {
        cursor: pointer;

        &_active {
            color: $black;
        }
    }

    &__line {
        display: inline-block;
        margin: 0 7px;
    }

    @include sm {
        font-size: 14px;
    }
}
</style>
