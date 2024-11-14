<template>
    <div class="catalog-users">
        <UserForm :user="userToUpdate" @submit="submitUserForm" @cancel="clearEditUser" />

        <div class="catalog-users__search-bar">
            <BaseSearchInput placeholder="Поиск по имени" v-model="searchValue" @search="onSearch" />
        </div>

        <UserList :list="filterList">
            <template #default="{ user }">
                <UserListItem :user="user" @deleteUser="deleteUser" @editUser="setEditUser" />
            </template>
        </UserList>
    </div>
    <BasePreloader v-if="isLoader" />
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { IUser, CreateUserRequestType } from '@/api/models';
import api from '@/api';
import { LocalStorageController, LocalDbController } from '@/utils/LocalDbController';
import { UserList, UserListItem } from '@/components/segments/userList';
import { UserForm } from '@/components/segments/userForm';
import { BasePreloader } from '@baseComponents/basePreloader';
import { BaseSearchInput } from '@baseComponents/baseSearchInput';

const cacheController: LocalDbController = LocalStorageController;
const cacheKey = 'userList';

const updateUser = async (dto: IUser) => {
    try {
        showLoader();
        await api.User.updateUser(dto.id, dto);
        await getUsers();
    } catch (e) {
        console.log(e);
    } finally {
        offLoader();
    }
}

const addUser = async (dto: CreateUserRequestType) => {
    try {
        showLoader();
        await api.User.addUser(dto);
        await getUsers();
    } catch (e) {
        console.log(e);
    } finally {
        offLoader();
    }
}

const deleteUser = async (id: string) => {
    try {
        showLoader();
        await api.User.deleteUser(id);
        await getUsers();
    } catch (e) {
        console.log(e);
    } finally {
        offLoader();
    }

}

const listFromCache = cacheController.getData<Array<IUser>, Array<IUser>>(cacheKey, []);
const isLoader = ref(false);


const showLoader = () => {
    isLoader.value = true;
}

const offLoader = () => {
    isLoader.value = false;
}

const userList = ref(listFromCache);
const filterList = ref([]);
const userToUpdate = ref<IUser | null>(null);

init(listFromCache);

const getUsers = async () => {
    showLoader();

    try {
        showLoader();
        const { data = [] } = await api.User.getUsers();

        userList.value = data;
        cacheController.setData<Array<IUser>>(data, cacheKey);
    }
    finally {
        offLoader();
    }
}


const setEditUser = (user: IUser) => {
    clearSearchValue();
    userToUpdate.value = user;
}

const submitUserForm = (dto: CreateUserRequestType) => {
    clearSearchValue();

    if (dto.id) {
        updateUser(dto as IUser);
        return;
    }

    addUser(dto);
}

const clearEditUser = () => {
    userToUpdate.value = null;
}

function init(cache: Array<IUser>) {
    //для тестирования работы локальной бд
    api.Test.resetDb();
    api.User.addUsers(cache);
}


const searchValue = ref('');

const clearSearchValue = () => {
    searchValue.value = ''
}


const searchByName = (name: string) => {
    if (!name.length) return userList.value;

    return userList.value.filter((item: IUser) => {
        return !!~item.name
            .toLowerCase()
            .indexOf(name.toLowerCase());
    });
}

const onSearch = (v: string) => {
    console.log(v);
    if (!isLoader.value) {
        filterList.value = searchByName(v)
    }
}

watch(() => userList.value, () => {
    filterList.value = searchByName(searchValue.value);
}, {
    immediate: true
})



</script>

<style lang="scss" scoped>
@import './catalogUsers.scss';
</style>