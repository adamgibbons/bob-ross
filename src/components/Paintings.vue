<template>
  <div class="container is-fluid">
    <h1 class="title is-1">The Bob Ross Explorer</h1>

    <div class="columns">
      <div class="column is-2">
        <div class="filters">
          <div class="title is-4">Filters</div>
            <div>
              <div class="select is-multiple">
                <label>Tags</label>
                <select v-model="activeFilters.tags" multiple size="8" @change="refilter">
                  <option v-for="tag in tags" :key="tag" :value="tag">
                    {{tag | cleanTag}}
                  </option>
                </select>
              </div>
            </div>

            <br>

            <div>
              <div class="select is-multiple" style="margin-right: 1em">
                <label>Season</label>
                <select v-model="activeFilters.seasons" multiple size="8" @change="refilter">
                  <option v-for="season in seasons" :key="season" :value="season">
                    {{season}}
                  </option>
                </select>
              </div>
            </div>
        </div>
      </div>

      <div class="column">
        <div class="columns is-multiline">
          <painting
            v-for="(painting, idx) in visiblePaintings"
            class="column is-3 card"
            :key="idx"
            :title="painting.title"
            :episode="painting.episode"
            :tags="extractTagsFromData(painting)">
          </painting>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import paintings from '@/data/bob-ross.json'
import { uniq, clone, omitBy, flatten, intersection } from 'lodash'
import Painting from '@/components/Painting'
import cleanTag from '@/utils/clean-tag'

function parseSeasonFromString (data) {
  return data.map((row) => {
    return parseInt(row.episode.slice(1))
  })
}

function parseTags (episodes) {
  return uniq(flatten(episodes.map((episode) => {
    const obj = clone(episode)

    delete obj.episode
    delete obj.title

    return Object.keys(obj)
  })))
}

export default {
  components: { Painting },
  data () {
    return {
      paintings,
      visiblePaintings: [],
      activeFilters: {
        seasons: [],
        tags: []
      }
    }
  },
  computed: {
    seasons () {
      return uniq(parseSeasonFromString(this.paintings))
    },
    tags () {
      return parseTags(this.paintings)
    }
  },
  filters: { cleanTag },
  methods: {
    extractTagsFromData (data) {
      const obj = clone(data)

      delete obj.episode
      delete obj.title

      return Object.keys(omitBy(obj, (val) => {
        return val === 0
      }))
    },
    refilter () {
      this.visiblePaintings = this.paintings.filter((painting) => {
        if (this.activeFilters.tags.length === 0) return true

        const tags = this.extractTagsFromData(painting)

        return intersection(tags, this.activeFilters.tags).length > 0
      }).filter((painting) => {
        if (this.activeFilters.seasons.length === 0) return true

        const season = parseInt(painting.episode.slice(1))

        return this.activeFilters.seasons.indexOf(season) !== -1
      })
    }
  },
  mounted () {
    this.visiblePaintings = clone(this.paintings)
  }
}
</script>

<style scoped>
  .filters {
    margin: 0 0 2em;
    padding: 0 0 1em;
  }
  .select {
    width: 100%;
  }
  select {
    width: 90%;
  }
  h1 {
    padding: .33em 0 1em;
    text-align: center;
  }
  .filters .title.is-4 {
    margin-top: 0;
    padding-top: 0;
  }
</style>
