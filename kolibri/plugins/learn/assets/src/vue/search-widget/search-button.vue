<template>

  <button aria-label="Search" class='search-btn' :class="{ active: searchOpen }" @click='toggleSearch'>
    <svg src="search.svg"></svg>
  </button>

</template>


<script>

  const actions = require('../../actions');

  module.exports = {
    vuex: {
      getters: {
        searchOpen: state => state.searchOpen,
      },
      actions: {
        toggleSearch: actions.toggleSearch,
      },
    },
  };

</script>


<style lang="stylus" scoped>

  @require '~core-theme.styl'

  button
    border: none
    height: 36px
    width: 36px
    background-color: $core-bg-canvas

    svg
      fill: $core-action-normal
    &.active
      background-color: $core-action-normal
      svg
        fill: #FFFFFF

    &:focus
      outline: $core-action-light 2px solid

</style>
