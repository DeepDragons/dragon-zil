import { createApp, h } from 'vue'
import NotFound from './page/404'

import routes from './routers';

const Router = {
  data: () => ({
    currentRoute: window.location.pathname
  }),

  computed: {
    ViewComponent () {
      const matchingPage = routes[this.currentRoute] || NotFound
      return matchingPage
    }
  },

  render () {
    return h(this.ViewComponent)
  },

  created () {
    window.addEventListener('popstate', () => {
      this.currentRoute = window.location.pathname
    })
  }
}

createApp(Router).mount('#app')
