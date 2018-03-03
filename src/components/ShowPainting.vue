<template>
  <div class="container">
    <section class="section">
      <div class="columns">
        <div class="column is-narrow has-text-left">
          <router-link class="button is-outlined is-white" to="/paintings">&laquo; Back to paintings</router-link>
        </div>
        <div class="column is-4 has-text-right">
          <div class="title is-4">{{painting.title}}</div>
          <div class="title is-6 episode">{{episode | seasonAndEpisode}}</div>
          <div class="content">
            <span class="tag is-light" v-for="tag in tags" :key="tag">
              {{tag | cleanTag}}
            </span>
          </div>
        </div>
        <div class="column is-narrow">
          <img :src="imgSrc">
        </div>
      </div>
    </section>

    <div class="section">
      <div class="columns">
        <div class="column is-10 is-offset-1">
          <p class="content has-text-centered">Select a color from this swatch to view paintings with similar colors</p>
          <div class="columns is-multiline">
            <div v-if="palette.length > 0" v-for="color in palette" :key="color" class="column">
              <div class="color activating-border" :style="{'background-color': color }" @click="selectColor(color)">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div>
      <div class="columns is-multiline">
        <div class="column is-3" v-for="(painting, idx) in similarPaintings" :key="idx">
          <img :src="getSource(painting)" @click="selectPainting(painting)" class="related-painting activating-border">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import paintingsData from '@/data/bob-ross.json'
import colorsData from '@/data/colors.json'
import seasonAndEpisode from '@/utils/season-and-episode'
import extractTagsFromData from '@/utils/extract-tags-from-data'
import cleanTag from '@/utils/clean-tag'
import chroma from 'chroma-js'

export default {
  methods: {
    getSource ({ id }) {
      return `${process.env.S3_URL}${id}.png`
    },
    selectPainting ({ id }) {
      this.similarPaintings = []
      this.$router.push(`/paintings/${id}`)
      this.paintingId = id
    },
    selectColor (color) {
      this.similarPaintings = colorsData.map(({ painting, colors }) => {
        const similarColors = colors.filter((c) => {
          return chroma.deltaE(color, c) < 4 && painting !== this.paintingId
        })

        if (similarColors.length > 0) {
          return {
            colors: similarColors,
            id: painting
          }
        }

        return {}
      }).filter((painting) => {
        return !!painting.id
      })
    }
  },
  data () {
    return {
      paintingId: this.$route.params.paintingId,
      painting: {},
      palette: [],
      similarPaintings: []
    }
  },
  watch: {
    paintingId (id) {
      this.painting = paintingsData.find(painting => painting.id === id)
      this.palette = colorsData.find(palette => palette.painting === id).colors
      this.similarPaintings = []
    }
  },
  mounted () {
    this.painting = paintingsData.find(painting => painting.id === this.paintingId)
    this.palette = colorsData.find(palette => palette.painting === this.paintingId).colors
  },
  computed: {
    episode () {
      return this.painting.episode || ''
    },
    imgSrc () {
      return `${process.env.S3_URL}${this.painting.id}.png`
    },
    tags () {
      return extractTagsFromData(this.painting)
    }
  },
  filters: { seasonAndEpisode, cleanTag }
}
</script>

<style scoped>
  .color {
    margin-bottom: 1em;
  }
  .activating-border {
    transition: all .2s;
    border: 0px solid orange;
    border-radius: 3px;
  }
  .activating-border:hover {
    transform: scale(1.05);
    cursor: pointer;
    border: 2px solid orange;
  }
  .episode {
    text-transform: uppercase;
    font-weight: 200;
  }
  .tag {
    margin: 2px;
  }
  .color {
    height: 5em;
  }
</style>
