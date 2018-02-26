<template>
  <div class="container is-fluid">
    <h1 class="title is-2">The Bob Ross Explorer</h1>

    <div class="columns">
      <div class="column is-2">
        <div class="filters">
          <div class="filter-group">
            <div class="filter-group-label">Tags</div>
            <div class="filter-group-filters">
              <div v-for="tag in tags" :key="tag">
                <label :for="tag">
                  <input
                    type="checkbox"
                    :id="tag"
                    :value="tag"
                    v-model="activeFilters.tags"
                    @change="refilter">
                  {{tag | cleanTag}}
                </label>
              </div>
            </div>
          </div>

          <div class="filter-group">
            <div class="filter-group-label">Season</div>
            <div class="filter-group-filters">
              <div v-for="season in seasons" :key="season">
                <label :for="season">
                  <input
                    type="checkbox"
                    :id="season"
                    :value="season"
                    v-model="activeFilters.seasons"
                    @change="refilter">
                  {{season}}
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="column">
        <div class="active-filters">
          <p v-show="noResults" class="results-messaging">
            No paintings match your filters. You can adjust or <a @click="resetFilters">reset</a> them.
          </p>
          <div v-show="!noResults" class="results-messaging">
            ({{visiblePaintings.length}} matches)
          </div>

          <div class="field is-grouped is-grouped-multiline">
            <div class="control" v-for="filter in consolidatedActiveFilters" :key="filter.label">
              <div class="tags has-addons">
                <a class="tag is-link">{{filter | filterLabel}}</a>
                <a class="tag is-delete" @click="deActivateFilter([$event, filter])"></a>
              </div>
            </div>
          </div>
        </div>

        <transition-group name="list" tag="div" class="columns is-multiline">
          <painting
            v-for="(painting, idx) in visiblePaintings"
            class="column is-3 card list-item"
            :key="idx"
            :title="painting.title"
            :episode="painting.episode"
            :tags="extractTagsFromData(painting)">
          </painting>
        </transition-group>
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
    consolidatedActiveFilters () {
      const seasons = this.activeFilters.seasons.map((label) => {
        return {
          type: 'seasons',
          label: label
        }
      })

      const tags = this.activeFilters.tags.map((label) => {
        return {
          type: 'tags',
          label: label
        }
      })

      return seasons.concat(tags)
    },
    seasons () {
      return uniq(parseSeasonFromString(this.paintings))
    },
    tags () {
      return parseTags(this.paintings)
    },
    noResults () {
      return this.visiblePaintings.length === 0
    }
  },
  filters: {
    cleanTag,
    filterLabel (filtr) {
      if (filtr.type === 'seasons') {
        return `season ${filtr.label}`
      }

      return filtr.label
    }
  },
  methods: {
    deActivateFilter ([event, tag]) {
      const idx = this.activeFilters[tag.type].indexOf(tag.label)
      this.activeFilters[tag.type].splice(idx, 1)

      this.refilter()
    },
    resetFilters () {
      this.visiblePaintings = clone(this.paintings)
      this.activeFilters.seasons = []
      this.activeFilters.tags = []
    },
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
  .active-filters {
    margin: 0 0 2em;
    border-bottom: 2px solid #ccc;
    padding-bottom: 1em;
    font-weight: 600;
    font-size: 1.1em;
  }
  .filters {
    margin: 0 0 2em;
    padding: 0 0 1em;
  }
  .filter-group {
    margin-bottom: 1em;
  }
  .filter-group-label {
    font-weight: 900;
    font-size: 1.33em;
  }
  .filter-group-filters {
    max-height: 20em;
    overflow: scroll;
    background: #eee;
    padding: .33em .5em;
    border-radius: 4px;
  }
  .select{
    width: 100%;
  }
  select {
    width: 90%;
    margin-top: .33em;
  }
  h1 {
    padding: .33em 0 1em;
    text-align: center;
  }
  .filters .title.is-4 {
    margin-top: 0;
    padding-top: 0;
  }
  .list-enter-active, .list-leave-active {
    transition: all .2s;
  }
  .list-enter, .list-leave-to {
    opacity: 0;
  }
  .results-messaging {
    margin-bottom: .5em;
  }
</style>
