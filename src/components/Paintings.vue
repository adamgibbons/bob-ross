<template>
  <div class="container is-fluid">
    <div class="columns">
      <div class="column is-2">
        <div class="filters">
          <div class="filter-group">
            <div class="filter-group-label">Tags</div>
            <div class="filter-group-filters">
              <div v-for="tag in tags" :key="tag" class="select-container">
                <label :for="tag" class="select-label">
                  <input
                    type="checkbox"
                    :id="tag"
                    :value="tag"
                    v-model="activeFilters.tags"
                    @change="refilter">
                  {{tag | cleanTag}}
                  <span class="checkmark"></span>
                </label>
              </div>
            </div>
          </div>

          <div class="filter-group">
            <div class="filter-group-label">Season</div>
            <div class="filter-group-filters">
              <div v-for="season in seasons" :key="season" class="select-container">
                <label :for="season" class="select-label">
                  <input
                    type="checkbox"
                    :id="season"
                    :value="season"
                    v-model="activeFilters.seasons"
                    @change="refilter">
                  {{season}}
                  <span class="checkmark"></span>
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
                <a class="tag is-light">{{filter | filterLabel}}</a>
                <a class="tag is-delete" @click="deActivateFilter([$event, filter])"></a>
              </div>
            </div>
          </div>
        </div>

        <transition-group name="list" tag="div" class="columns is-multiline">
          <painting
            v-for="(painting, idx) in visiblePaintings"
            class="column is-3 list-item"
            :key="idx"
            :title="painting.title"
            :episode="painting.episode"
            :tags="extractTagsFromData(painting)"
            :id="painting.id"
            @selectedPainting="selectPainting">
          </painting>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
import paintings from '@/data/bob-ross.json'
import { uniq, clone, flatten, intersection } from 'lodash'
import Painting from '@/components/Painting'
import cleanTag from '@/utils/clean-tag'
import extractTagsFromData from '@/utils/extract-tags-from-data'

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
    extractTagsFromData,
    selectPainting (id) {
      this.$router.push(`/paintings/${id}`)
    },
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
    margin: 0 0 1em;
    padding-bottom: 1em;
    font-weight: 600;
    font-size: 1.1em;
  }
  .filters {
    margin: 5em 0 0;
    padding: 0 0 1em;
    /*background: red;*/
  }
  .filter-group {
    margin-bottom: 2.33em;
    height: 20em;
    overflow: scroll;
  }
  .filter-group-label {
    font-weight: 900;
    font-size: 1.33em;
    font-family: 'Permanent Marker', cursive;
    border-bottom: 2px solid #555;
    padding-bottom: .5em;
    margin-bottom: .33em;
  }
  .filter-group-filters {
    padding: .33em .5em;
  }

  /*filters*/
  .select-container {
    position: relative;
    font-size: .9em;
    margin: .33em 0;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .select-container:hover {
    background: #444;
    overflow: hidden;
  }

  .select-container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }

  .select-label {
    display: block;
    padding-left: 2.33em;
  }

  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 20px;
    width: 20px;
    background: #eee;
    border-radius: 2px;
  }

  /* On mouse-over, add a grey background color */
  .select-container:hover input ~ .checkmark {
    background-color: #ccc;
  }

  /* When the checkbox is checked, add a blue background */
  .select-container input:checked ~ .checkmark {
    background-color: #2196F3;
  }

  /* Create the checkmark/indicator (hidden when not checked) */
  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }

  /* Show the checkmark when checked */
  .select-container input:checked ~ .checkmark:after {
    display: block;
  }

  /* Style the checkmark/indicator */
  .select-container .checkmark:after {
    left: 9px;
    top: 5px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
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
