<script lang="ts" setup>
const loading = ref(false);

provide("loading", {
    loading,
    setLoading: (load: boolean) => (loading.value = load),
});
</script>

<template>
    <Loading v-if="loading" />
    <div class="layout">
        <div class="layout__wrapper">
            <slot />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.layout {
    display: flex;
    justify-content: center;
    &__wrapper {
        padding: 32px 40px;
        max-width: 1570px;
        width: 100%;

        @include sm {
            padding: 32px 20px;
        }
    }
}
</style>
