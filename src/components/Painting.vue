<template>
  <div v-show="isVisible" class="card"
    @click="selectPainting">
    <div class="card-image">
      <figure class="image is-4by3">
        <img :src="imgSrc" :alt="imgDescription" />
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title is-4">{{title}}</p>
          <p class="subtitle is-6 episode">{{episode | seasonAndEpisode}}</p>
        </div>
      </div>
      <div class="content">
        <span class="tag" v-for="tag in tags" :key="tag">
          {{tag | cleanTag}}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import cleanTag from '@/utils/clean-tag'
import seasonAndEpisode from '@/utils/season-and-episode'

export default {
  props: ['title', 'episode', 'tags', 'id'],
  methods: {
    selectPainting () {
      this.$emit('selectedPainting', this.id)
    }
  },
  data () {
    return {
      selectedPainting: {}
    }
  },
  filters: {
    cleanTag,
    seasonAndEpisode
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
    margin: 0 2px 2px 0;
    background-color: #bbb;
    color: #222;
    font-size: .8em;
  }
/*  .tag:hover {
    background-color: #ddd;
  }*/
  .episode {
    text-transform: uppercase;
    font-size: .95em;
    color: #ccc;
    font-weight: 400;
  }
  .media-content {
    overflow: visible;
  }
  .card {
    background-color: #444;
    padding: 1em;
    border: 1px solid #333;
    transition: all 0.2s;
  }
  .card:hover {
    background-color: #666;
  }
</style>
