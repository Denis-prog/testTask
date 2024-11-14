<template>
  <svg :style="styles" class="base-svg-icon" aria-hidden="true">
    <use :xlink:href="xlinkHref" />
  </svg>
</template>

<script setup lang="ts">
import { computed, withDefaults, defineProps } from "vue";

interface IIcon {
  size?: number;
  name: string;
}

const props = withDefaults(defineProps<IIcon>(), {});

const xlinkHref = computed(() => `#${props.name}`);

const styles = computed(() => {
  return {
    width: props.size,
    height: props.size,
  };
});
</script>

<style lang="scss" scoped>
.base-svg-icon {
  width: 16px;
  height: 16px;
  fill: currentColor;
  overflow: hidden;
}
</style>
