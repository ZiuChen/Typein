<template>
  <div
    class="typein-action"
    @mouseover="handleActionListMouseOver($event, action)"
    @click="handleActionClick"
    :class="{ 'typein-action-active': action?.isActive }"
  >
    <img class="typein-icon" :src="getIconPath(action)" />
    <div class="action-info">
      <div class="name">{{ action.name }}</div>
      <div class="description">{{ action.description }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { handleActionListMouseOver, handleActionClick } from '@/hooks'
import type { PropType } from 'vue'
import type { ITypeInAction } from '@/types'
const props = defineProps({
  action: {
    type: Object as PropType<ITypeInAction>,
    required: true
  }
})
const getIconPath = (action: any) => chrome.runtime.getURL(`static/img/${action.icon}.svg`)
</script>

<style lang="less" scoped>
@import '@/style/index.less';
</style>
