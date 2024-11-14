<template>
	<div inert ref="refHtml" class="preloader-wrapper" tabindex="-1"
		:class="{ 'preloader-wrapper_has_overlay': showOverlay }">
		<div class="preloader">
			<div class="preloader__spin">
				<BaseIcon name="preloader" :size="spinSize" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref, defineProps } from 'vue';
import { BaseIcon } from '../baseIcon';


const props = defineProps({
	inFocus: {
		type: Boolean,
		default: true,
	},
	spinSize: {
		type: Number,
		default: 47,
	},
	showOverlay: {
		type: Boolean,
		default: true,
	},
});

const refHtml = ref<HTMLElement | null>(null);

onMounted(() => {
	props.inFocus && refHtml.value?.focus();
})
</script>

<style lang="scss" scoped>
@import './preloader.scss';
</style>
