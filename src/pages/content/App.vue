<template>
  <div id="typein-app">
    <div id="typein-search">
      <input
        v-model="filterValue"
        @keydown="handleActionListKeyDown"
        type="text"
        placeholder="TypeIn."
      />
    </div>
    <div id="typein-list">
      <div
        v-for="action of actionList"
        @mouseover="handleActionListMouseOver($event, action)"
        @click="handleActionClick"
        class="typein-action"
        :class="{ 'typein-action-active': action.isActive }"
      >
        <img class="icon" :src="getIconPath(action)" />
        <div class="action-info">
          <div class="name">{{ action.name }}</div>
          <div class="description">{{ action.description }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  filterValue,
  actionList,
  handleActionListKeyDown,
  handleActionListMouseOver,
  handleActionClick
} from '@/hooks'

const getIconPath = (action: any) => chrome.runtime.getURL(`static/img/${action.icon}.svg`)
</script>
<style lang="less" scoped>
@import '@/style/index.less';
</style>
