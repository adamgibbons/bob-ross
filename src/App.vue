<template>
  <div id="app">
    <nav class="navbar">
      <div class="navbar-brand">
        <router-link class="navbar-item" to="/paintings">
          The Bob Ross Explorer
        </router-link>
        <!-- <div class="navbar-burger">
          <span></span>
          <span></span>
          <span></span>
        </div> -->
      </div>

      <!-- <div class="navbar-menu">
        <div class="navbar-end">
          <a class="navbar-item" href="http://agibbons.com">
            Adam Gibbons
          </a>
          <a class="navbar-item" href="https://github.com/adamgibbons/bob-ross">
            Github
          </a>
        </div>
      </div> -->
    </nav>

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
  .title, .content, div, p, footer, .footer {
    color: white;
  }
  .navbar {
    background: #555;
    margin-bottom: 2em;
  }
  .navbar-item {
    color: white;
    font-size: 1.1em;
  }
  a.navbar-item:hover {
    background-color: #555;
    text-decoration: underline;
    color: white;
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
</style>
