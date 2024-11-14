<template>
  <div class="base-form-item" :class="classes">
    <div v-if="label || hasSlot('label')" class="base-form-item-label">
      <slot name="label">
        <label v-if="label" class="label-text">{{ label }}</label>
      </slot>
    </div>

    <div class="control-wrapper">
      <slot />
    </div>

    <div v-if="showError" class="base-form-item-message" :class="{ '-error': showError }">
      <span>
        {{ errorMessage }}
      </span>

    </div>
  </div>
</template>

<script lang="ts" setup>
import { withDefaults, defineProps, defineExpose } from 'vue';
import type { IFormItemProps } from "../types";
import {
  inject,
  computed,
  ref,
  onMounted,
  onBeforeMount,
  provide,
  useSlots,
  getCurrentInstance,
} from "vue";

const addFormControl: any = inject("addFormControl");
const removeFormControl: any = inject("removeFormControl");

const props = withDefaults(defineProps<IFormItemProps>(), {
  label: null,
  required: false,
  showErrorMessage: true,
  message: null,
});

const errorMessage = ref<string | null>();
const valid = ref(true);

const classes = computed(() => {
  return {
    "-error": (errorMessage.value || !valid.value),
    "-required": props.required,
  };
});

const showError = computed(() => {
  return props.showErrorMessage && errorMessage.value;
});

const setValidity = function (isValid: boolean, errorMessages?: string | null) {
  errorMessage.value = errorMessages;
  valid.value = isValid;
};

const clearValidity = () => {
  setValidity(true, null);
};

const slots = useSlots();

const hasSlot = function (slotName: string) {
  return !!slots[slotName];
};

const instance = getCurrentInstance();

onMounted(() => {
  if (addFormControl && instance) {
    addFormControl(instance);
  }
});

onBeforeMount(() => {
  if (removeFormControl && instance) {
    removeFormControl(instance);
  }
});

provide("clearValidity", clearValidity);

defineExpose({
  setValidity,
  clearValidity,
});
</script>

<style lang="scss" scoped>
@import "./baseFormItem.scss";
</style>
