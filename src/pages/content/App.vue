<template>
  <div id="typein-app">
    <div id="typein-search">
      <input v-model="filterValue" @keydown="handleKeyDown" type="text" placeholder="TypeIn" />
    </div>
    <div id="typein-list">
      <template v-for="action of actionList">
        <TypeinAction :action="action" />
      </template>
      <template v-for="item of tableList">
        <TypeinItem :item="item" />
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
import TypeinAction from './cpns/TypeInAction.vue'
import TypeinItem from './cpns/TypeinItem.vue'
import {
  filterValue,
  actionList,
  handleActionListKeyDown,
  tableList,
  handleItemListKeyDown
} from '@/hooks'
const handleKeyDown = (ev: KeyboardEvent) => {
  handleActionListKeyDown(ev)
  handleItemListKeyDown(ev)
}
</script>
<style lang="less" scoped>
@import '@/style/index.less';
</style>
