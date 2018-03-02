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
        <router-link to="/paintings">
          The Bob Ross Explorer
        </router-link>
      </div>
    </div>

    <router-view/>

    <footer class="footer">
      <div class="container">
        <div class="content has-text-centered">
          <p>
            A just-for-fun project by <a href="http://agibbons.com">Adam Gibbons</a>.
            Code available on <a href="https://github.com/adamgibbons/bob-ross">Github</a>.
          </p>
        </div>
      </div>
    </footer>
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
  .title, .content, div, p, footer, .footer {
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
  footer.footer {
    margin-top: 10em;
    background-color: transparent;
    padding: 1em 0 2em;
  }
  footer a {
    color: orange;
    font-weight: 900;
  }
  footer a:hover {
    color: orange;
    text-decoration: underline;
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
  }
</style>
