<template>
  <button class="base-btn" :class="classButton" :disabled="disabled">
    <span class="base-btn-text" v-if="!icon">
      <slot></slot>
      <span>{{ btnText }}</span>
    </span>

    <BaseIcon class="base-btn-icon" v-if="icon" :name="icon" />
  </button>
</template>

<script setup lang="ts">
import { computed, PropType, defineProps } from "vue";
import { BaseIcon } from "../baseIcon";
import { IBtnProps } from "./types";

const baseClass = 'base-btn';

const props = defineProps({
  variant: {
    type: String as PropType<IBtnProps["variant"]>,
    validator(value: string) {
      return ["contained", "ghost"].includes(value);
    },
    default: "contained",
  },
  size: {
    type: String as PropType<IBtnProps["size"]>,
    default: 'medium',
  },
  status: {
    type: String as PropType<IBtnProps["status"]>,
    validator(value: string) {
      return ["primary", "success", "danger"].includes(value);
    },
    default: "success",
  },
  disabled: {
    type: Boolean,
  },
  icon: String,
  btnText: [String, Number],
});


const classButton = computed(() => {
  return [
    {
      [`${baseClass}-disabled`]: props.disabled,
      [`${baseClass}-only-icon`]: props.icon,
    },
    `${baseClass}-${props.status}`,
    `${baseClass}-${props.size}`,
    `${baseClass}-${props.variant}`,
  ];
});
</script>

<style lang="scss" scoped>
@import "./BaseBtn.scss";
</style>
