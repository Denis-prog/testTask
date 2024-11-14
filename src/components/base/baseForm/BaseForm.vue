<template>
  <form ref="form" class="base-form" :autocomplete="htmlAutocomplete" novalidate @submit.prevent="submit">
    <slot />
  </form>
</template>

<script lang="ts" setup>
import { ref, provide, withDefaults, defineProps, defineExpose, defineEmits, ComponentInternalInstance } from "vue";
import { get, has } from "lodash";

import { BaseFormItem } from "./index";
import { computed } from "vue";
import type { IFormItemProps, IFormProps } from "./types";

type IFormItem = InstanceType<typeof BaseFormItem>;

const props = withDefaults(defineProps<IFormProps>(), {
  autocomplete: false,
  rules: Object,
  model: Object,
});

const emit = defineEmits(["submit"]);

const submit = (e: any) => {
  emit("submit", e);
};

provide("submitForm", submit);

const fields = ref<Array<ComponentInternalInstance>>([]);

const htmlAutocomplete = computed(() => {
  return props.autocomplete ? "on" : "off";
});

const clearFieldsValidity = function (fieldToClear: string | string[]) {
  const _fields: { [key: string]: boolean } = (
    Array.isArray(fieldToClear) ? fieldToClear : [fieldToClear]
  ).reduce(
    (acc, cur) => ({
      ...acc,
      [cur]: true,
    }),
    {}
  );

  fields.value
    .filter((item) => {
      return _fields[(item?.props as unknown as IFormItemProps).field] && has(props.rules, item.props.field);
    })
    .forEach((item) => {
      item.exposed?.clearValidity();
    });
};

const clearAllValidity = function () {
  fields.value.forEach((field) => {
    field.exposed?.clearValidity();
  });
};

const addControl = function (field: IFormItem) {
  if (field) {
    fields.value.push(field);
  }
  return false;
};

provide("addFormControl", addControl);

const validateSingleItem = function (formItem: IFormItem) {
  if (!props.model) return false;

  if (!props.rules[formItem.props.field]) return false;

  const invalid = (props.rules[formItem.props.field] || []).find(
    (rule: any) => !rule.validator(get(props.model, formItem.props.field))
  );
  formItem?.exposed.setValidity(!invalid, invalid ? invalid.message : null);

  return !invalid;
};

const removeControl = function (field: IFormItem) {
  if (field) {
    fields.value.splice(fields.value.indexOf(field), 1);
  }

  return false;
};

provide("removeFormControl", removeControl);

const validate = function () {
  return new Promise((resolve, reject) => {
    let formValid = true;

    fields.value
      .filter((item: any) => {
        return item.props.field && has(props.rules, item.props.field);
      })
      .forEach((item) => {
        const fieldValid = validateSingleItem(item);

        if (formValid && !fieldValid) {
          formValid = false;
        }
      });

    formValid ? resolve(formValid) : reject(formValid);
  });
};

const validateFields = function (fieldsToValidate: string | string[]) {

  if (!props.model) return false;

  const _fields: { [key: string]: boolean } = (
    Array.isArray(fieldsToValidate) ? fieldsToValidate : [fieldsToValidate]
  ).reduce(
    (acc, cur) => ({
      ...acc,
      [cur]: true,
    }),
    {}
  );

  return new Promise((resolve, reject) => {
    let formValid = true;

    fields.value
      .filter((item) => {
        return (
          _fields[(item?.props as any).field] && has(props.rules, item?.props.field)
        );
      })
      .forEach((item) => {
        const fieldValid = validateSingleItem(item);

        if (formValid && !fieldValid) {
          formValid = false;
        }
      });

    formValid ? resolve(formValid) : reject(formValid);
  });
};

defineExpose({
  validate,
  clearAllValidity,
  validateFields,
  clearFieldsValidity,
});
</script>

<style scoped lang="scss">
@import "./baseForm.scss";
</style>
