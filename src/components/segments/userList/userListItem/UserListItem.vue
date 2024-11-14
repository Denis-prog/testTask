<template>
    <div class="user-list-item">
        <slot :editUser="editUser" :deleteUser="deleteUser" :user="user">
            <div class="user-list-item__content">
                <div class="user-list-item__content-col user-list-item__content-col">
                    <span class="user-list-item__content-text" :title="user.name">{{ user.name }}</span>
                    <span class="user-list-item__content-text" :title="user.mail">{{ user.mail }}</span>
                </div>
                <div class="user-list-item__content-col user-list-item__content-col_align-end">
                    <span class="user-list-item__content-text" :title="user.phone">{{ user.phone }}</span>
                </div>
            </div>
            <div class="user-list-item__controls">
                <BaseButton @click="editUser" icon="edit" />
                <BaseButton @click="deleteUser" status="danger" icon="trash" />
            </div>
        </slot>

    </div>
</template>


<script lang="ts" setup>
import { IUser } from '@/api/models';
import { defineProps, PropType, defineEmits, } from 'vue';
import { BaseButton } from "@baseComponents/baseButton";

const props = defineProps({
    user: {
        default: () => ({}),
        type: Object as PropType<IUser>,
    }
});


console.log(props.user);

const emit = defineEmits(['editUser', 'deleteUser'])


const editUser = () => {
    emit('editUser', props.user)
}

const deleteUser = () => {
    emit('deleteUser', props.user.id)
}
</script>

<style lang="scss" scoped>
@import './userList.scss';
</style>
