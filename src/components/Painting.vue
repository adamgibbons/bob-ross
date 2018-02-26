<template>
  <div v-show="isVisible">
    <div class="card-image">
      <figure class="image is-4by3">
        <!-- <img :src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image"> -->
        <img :src="imgSrc" :alt="imgDescription" />
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title is-4">{{title | stripTicks}}</p>
          <p class="subtitle is-6">{{episode | seasonAndEpisode}}</p>
        </div>
      </div>
      <div class="content">
        <span class="tag is-light" v-for="tag in tags" :key="tag">
          {{tag | cleanTag}}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import cleanTag from '@/utils/clean-tag'

export default {
  props: ['title', 'episode', 'tags'],
  filters: {
    cleanTag,
    seasonAndEpisode (string) {
      const season = parseInt(string.slice(1))
      const episode = parseInt(string.slice(4))

      return `season ${season} • episode ${episode}`
    },
    stripTicks (title) {
      return title.replace(/'/g, '')
    }
  },
  computed: {
    isVisible () {
      return true
    },
    imgSrc () {
      const title = this.title
        .toLowerCase()
        .replace(/\./g, '')
        .replace(/'/g, '')
        .replace(/ /g, '-')

      return `${process.env.S3_URL}${title}.png`
    },
    imgDescription () {
      return this.title
    }
  }
}
</script>

<style scoped>
  .tag {
    margin: 1px;
  }
  .subtitle.is-6 {
    text-transform: uppercase;
    font-size: .9em;
    color: #666;
  }
  .media-content {
    overflow: visible;
  }
</style>
