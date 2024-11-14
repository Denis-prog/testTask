<template>
    <div class="base-input" :class="[classInput, attrs.class]" :style="attrs.style">
        <input @focus="onFocus" v-model="modelValue" v-bind="inputAttrs" ref="inputHtmlRef" class="base-input__control"
            :value="modelValue" :disabled="disabled" />

        <BaseButton :disabled="disabled" class="base-input__clear-btn" variant="ghost" size="small" status="primary"
            @click="clearInput" v-if="isCanClear" icon="close" />
    </div>
</template>

<script setup lang="ts">
import {
    computed,
    PropType,
    ref,
    useAttrs,
    defineModel,
    defineProps,
    defineOptions,
    inject,
    defineEmits,
} from "vue";

import type { IBaseInput } from "./types";
import { BaseButton } from '../baseButton';

defineOptions({
    inheritAttrs: false
})

const clearValidity: any = inject("clearValidity");

const props = defineProps({
    modelValue: {
        type: String as PropType<IBaseInput["modelValue"]>,
        default: "",
    },
    disabled: {
        type: Boolean,
    },
    cleanable: {
        type: Boolean,
        default: true,
    },
});

const emit = defineEmits(['focus'])

const baseClass = "base-input";

const modelValue = defineModel({ default: '' });

const inputHtmlRef = ref<HTMLInputElement | null>(null);
const attrs = useAttrs();

const classInput = computed(() => {
    return [
        {
            [`${baseClass}_disabled`]: props.disabled,
        },
    ];
});

const isCanClear = computed(() => modelValue.value.length && props.cleanable);


const inputAttrs = computed(() => {
    /* eslint-disable */
    const { style: styles, class: className, ...rest } = attrs;

    return rest;
});

const clearInput = () => {
    modelValue.value = ''
}


const onFocus = () => {
    typeof clearValidity === 'function' && clearValidity();
    emit('focus');
}

</script>

<style lang="scss" scoped>
@import "./baseInput.scss";
</style>