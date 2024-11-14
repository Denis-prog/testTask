<template>

  <BaseInput v-model="model" @blur="onBlur" class="base-search-input" />

</template>

<script setup lang="ts">
import {
  PropType,
  ref,
  defineModel,
  defineProps,
  defineEmits,
  watch
} from "vue";

import { BaseInput } from '../baseInput';
import { debounce, type DebouncedFunc } from "lodash";
import { SearchTriggerTypeEnum } from './types';

/* eslint-disable */
let onSearchDebounce: DebouncedFunc<(value: any) => void> | null = null;

const props = defineProps({
  searchDebounce: {
    type: Number,
    default: 500,
  },
  searchTrigger: {
    type: String as PropType<SearchTriggerTypeEnum>,
    default: 'blur',
  },
  countSymbolSearchTrigger: {
    type: Number,
    default: 1
  },
  modelValue: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['search', 'blur'])

const wasSearch = ref(false);
const model = defineModel({ default: '' });

const onSearch = (value: string) => {
  emit("search", value);
};

const checkSearchTrigger = (trigger: SearchTriggerTypeEnum) =>
  trigger === props.searchTrigger;


const onBlur = (e: Event) => {
  if (checkSearchTrigger(SearchTriggerTypeEnum.blur)) {
    onSearch(model.value);
  }

  emit("blur", e);
};

watch(
  () => props.searchDebounce,
  (time) => {
    onSearchDebounce = debounce((value) => {
      onSearch(value);
    }, time);
  },
  {
    immediate: true,
  }
);


watch(
  () => model.value,
  (val) => {
    const isInputTrigger = checkSearchTrigger(SearchTriggerTypeEnum.input);

    if (val && val.length >= props.countSymbolSearchTrigger) {
      wasSearch.value = true;

      isInputTrigger && onSearchDebounce && onSearchDebounce(val);
    }

    if (!val && wasSearch.value) {
      wasSearch.value = false;

      isInputTrigger && onSearch(val);
    }
  },
  {
    immediate: true,
  }
);
</script>

<style lang="scss"></style>