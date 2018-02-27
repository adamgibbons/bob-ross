<template>
  <div class="container is-fluid" style="margin-top:2em">
    <div class="columns is-multiline">
      <div class="column is-3" v-for="swatch in swatches" :key="swatch.painting">
        <div class="swatch">
          <div class="title is-5">{{swatch.painting | paintingTitle}}</div>
          <div
            v-for="color in swatch.colors"
            class="color"
            :key="color"
            :style="{'background-color': color}">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import colorsByPainting from '@/data/colors.json'

export default {
  data () {
    return {
      swatches: colorsByPainting
    }
  },
  filters: {
    paintingTitle (string) {
      return string.replace(/-/g, ' ').replace('.png', '')
    }
  }
}
</script>

<style scoped>
  .swatch {
    border: 1px solid #aaa;
    padding: 0 1em 1em;
    border-radius: 3px;
  }
  .color {
    background-color: gray;
    height: 2em;
    margin-top: .33em;
  }
  .title.is-5 {
    margin: 1em 0 .33em;
  }
</style>
