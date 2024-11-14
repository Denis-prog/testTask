<template>
    <div class="user-form">
        <div class="user-form__main">
            <BaseForm ref="form" :model="model" :rules="rules">
                <BaseFormItem field="name" required label="Имя">
                    <BaseInput v-model="model.name" placeholder="Укажите имя" />
                </BaseFormItem>

                <BaseFormItem field="mail" required label="Почта">
                    <BaseInput v-model="model.mail" placeholder="Укажите почту" />
                </BaseFormItem>

                <BaseFormItem field="phone" required label="Телефон">
                    <BaseInput v-model="model.phone" placeholder="Укажите телефон" />
                </BaseFormItem>
            </BaseForm>
        </div>


        <footer class="user-form__footer">
            <BaseButton status="success" @click="onSubmit">Сохранить</BaseButton>

            <BaseButton status="danger" @click="onCancel">Очистить</BaseButton>
        </footer>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, defineEmits, defineProps, PropType, watch } from 'vue';
import { BaseInput } from '@baseComponents/baseInput';
import { BaseForm, BaseFormItem } from '@baseComponents/baseForm';
import { BaseButton } from '@/components/base/baseButton';
import { required } from '@/validators/required';
import { email } from '@/validators/strings';
import { CreateUserRequestType } from '@/api/models';

const defaultUser: CreateUserRequestType = {
    name: '',
    phone: '',
    mail: ''
};


const props = defineProps({
    user: {
        type: Object as PropType<CreateUserRequestType>,
        default: null,
    }
});

const form = ref(null);


const model = ref<CreateUserRequestType>({ ...defaultUser });

const rules = computed(() => ({
    name: [required()],
    mail: [required(), email()],
    phone: [required()],
}))


const emit = defineEmits(['cancel', 'submit']);

const onCancel = () => {
    emit('cancel')
}

const onSubmit = () => {
    (form.value as any)
        .validate()
        .then(() => {
            emit('submit', model.value);
            model.value = { ...defaultUser };
        }).catch(() => {
            console.log('ошбика валидации')
        })

}

watch(() => props.user, (user) => {
    const nextUser = user ?? defaultUser;

    model.value = { ...nextUser };
}, {
    immediate: true
})
</script>

<style lang="scss" scoped>
@import './userForm.scss';
</style>