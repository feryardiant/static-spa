const ParentComponent = {
  name: 'parent',
  template: '<router-view/>'
}

const ChildComponent = {
  name: 'child',
  template: '<h1>Static-Page SPA : {{ $route.meta.title }}</h1>'
}

const router = new VueRouter({
  mode: 'history',
  base: '/static-spa/',
  routes: [
    {
      path: '/',
      name: 'home',
      component: {
        name: 'home',
        template: '<h1>Static-Page SPA : Home</h1>'
      },
    },
    {
      path: '/foo',
      component: ParentComponent,
      children: [
        {
          path: '',
          name: 'foo',
          component: ChildComponent,
          meta: {
            title: 'Foo'
          }
        },
        {
          path: 'bar',
          component: ParentComponent,
          children: [
            {
              path: '',
              name: 'bar',
              component: ChildComponent,
              meta: {
                title: 'Foo / Bar'
              }
            },
            {
              path: 'baz',
              name: 'baz',
              component: ChildComponent,
              meta: {
                title: 'Foo / Bar / Baz'
              }
            }
          ]
        }
      ]
    },
    {
      path: '*',
      name: 'e404',
      component: {
        name: 'e404',
        template: '<h1>404 Page Not Found!</h1>'
      }
    }
  ]
})

const $app = new Vue({
  router,
  template: '<router-view/>',
  created () {
    if (sessionStorage.redirect) {
      const redirect = sessionStorage.redirect
      delete sessionStorage.redirect
      this.$router.push(redirect)
    }
  }
})

$app.$mount('#app')
