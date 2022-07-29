<template>
  <div
    class="typein-action"
    @mouseover="handleTableListMouseOver($event, item)"
    @click="handleItemClick"
    :class="{ 'typein-action-active': item?.isActive }"
  >
    <img class="typein-icon" :src="getIconPath(item)" />
    <div class="action-info">
      <div class="name">{{ item.name }}</div>
      <div class="description">{{ item.description }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { handleTableListMouseOver, handleItemClick } from '@/hooks'
import type { PropType } from 'vue'
import type { ITableListItem } from '@/types'
const props = defineProps({
  item: {
    type: Object as PropType<ITableListItem>,
    required: true
  }
})
const getIconPath = (action: any) => chrome.runtime.getURL(`static/img/${action.icon}.svg`)
</script>

<style lang="less" scoped>
@import '@/style/index.less';
</style>
