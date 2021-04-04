<template>
  <div>
    <v-navigation-drawer app temporary v-model="sideNav">
      <v-list>
        <v-list-item
          v-for="(link, idx) in links"
          :key="idx"
          :to="link.url"
        >
          <v-list-item-icon>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="link.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="onLogout" v-if="isUserLoggedIn">
          <v-list-item-icon>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="'Log Out'"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
    </v-list>
    </v-navigation-drawer>

    <v-app-bar app dark>
      <v-app-bar-nav-icon
        @click="sideNav = !sideNav"
        class="hidden-md-and-up"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link
          to="/"
          tag="span"
          class="pointer"
        >MyStore</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn
          text
          x-large
          v-for="(link, idx) in links"
          :key="idx"
          :to="link.url"
        >
          <v-icon left>{{ link.icon }}</v-icon>
          {{ link.title }}
        </v-btn>
        <v-btn
          text
          x-large
          @click="onLogout"
          v-if="isUserLoggedIn"
        >
          <v-icon left>mdi-exit-to-app</v-icon>
          Log Out
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-main style="min-height: 100vh;">
      <router-view></router-view>
    </v-main>
  </div>
</template>

<script>
export default {
  data () {
    return {
      sideNav: false
    }
  },
  methods: {
    onLogout () {
      this.$store.dispatch('logoutUser')
      this.$router.push('/')
    }
  },
  computed: {
    isUserLoggedIn () {
      return this.$store.getters.isUserLoggedIn
    },
    links () {
      if (this.isUserLoggedIn) {
        return [
          { title: 'Cart', icon: 'mdi-cart', url: '/checkout' },
          { title: 'New Product', icon: 'mdi-plus', url: '/new' },
          { title: 'My Products', icon: 'mdi-format-list-bulleted', url: '/list' }
        ]
      }
      return [
        { title: 'Login', icon: 'mdi-account-box', url: '/login' },
        { title: 'Register', icon: 'mdi-face', url: '/register' }
      ]
    }
  }
}
</script>

<style scoped>
  .pointer {
    cursor: pointer;
  }
</style>
