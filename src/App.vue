<template>
  <div id="app">
    <div class="columns header">
      <div class="column is-narrow">
        <div id="bob-ross">
          <router-link to="/paintings">
            <img src="./assets/bob-ross.png">
          </router-link>
        </div>
      </div>
      <div class="column has-text-centered">
        <div class="attribution">
          Just for fun by <a href="http://agibbons.com">Adam Gibbons</a>
          <br>
          Code on <a href="https://github.com/adamgibbons/bob-ross">Github</a>
        </div>
        <router-link to="/paintings">
          The Bob Ross Explorer
        </router-link>
      </div>
    </div>

    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script>
export default {
  name: 'BobRoss'
}
</script>

<style>
  html, body {
    background-color: #333;
  }
  .title {
    font-family: 'Permanent Marker', cursive;
  }
  .title, .content, div, p {
    color: white;
  }
  .header {
    font-family: 'Permanent Marker', cursive;
    background: #555;
    font-size: 2em;
    padding-top: .33em;
  }
  .header a {
    color: white;
    background: transparent;
  }
  .header a:hover {
    color: white;
    background: transparent;
  }
  #bob-ross {
    width: 3.33em;
    position: absolute;
    margin: .1em .2em 3em .5em;
    opacity: 9;
  }
  #bob-ross img {
    width: 100%;
    max-height: unset;
    animation-name: doTheBob;
    animation-duration: 20s;
    animation-delay: 3s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }
  @keyframes doTheBob {
    0% {
      transform: rotate(0deg) scale(1);
    }
    2% {
      transform: rotate(-6deg) scale(1.2);
    }
    4% {
      transform: rotate(0deg) scale(1);
    }

    20% {
      transform: rotate(-1deg);
    }
    21% {
      transform: rotate(3deg);
    }
    22% {
      transform: rotate(-5deg);
    }
    23% {
      transform: rotate(7deg);
    }
    24% {
      transform: rotate(-5deg);
    }
    25% {
      transform: rotate(3deg);
    }
    26% {
      transform: rotate(-2deg);
    }
    27% {
      transform: rotate(1deg);
    }
    28% {
      transform: rotate(0deg);
    }

    78% {
      transform: rotate(0deg) scale(1);
    }
    80% {
      transform: rotate(-3deg) scale(.8);
    }
    82% {
      transform: rotate(0deg) scale(1);
    }
  }
  .attribution {
    font-weight: 600;
    text-align: right;
    font-family: sans-serif;
    font-size: .45em;
    margin-left: -210px;
    float: right;
    position: relative;
    top: .33em;
    right: 1em;
  }
  .attribution a {
    color: orange;
  }
</style>
