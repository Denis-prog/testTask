<template>
    <div >
        <TransitionGroup class="user-list" name="user-list" tag="ul" v-if="list.length">
            <li v-for="user in list" :key="user.id">
                <slot :user="user" />
            </li>
        </TransitionGroup>
        <span v-else>Справочник пуст</span>
    </div>


</template>

<script lang="ts" setup>
import { IUser } from '@/api/models';
import { defineProps, PropType } from 'vue';

defineProps({
    list: {
        default: () => [],
        type: Array as PropType<Array<IUser>>,
    }
});

</script>

<style lang="scss" scoped>
@import './userList.scss';
</style>