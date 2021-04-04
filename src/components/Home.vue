<template>
  <div v-if="!loading">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-carousel height="600">
            <v-carousel-item
              reverse-transition="fade-transition"
              transition="fade-transition"
              v-for="(item, idx) of promoProducts"
              :key="idx"
              :src="item.imageSrc"
            ></v-carousel-item>
          </v-carousel>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-row>
        <v-col
          cols="12"
          v-for="(item, idx) of products"
          :key="idx"
          sm
        >
          <v-card
            class="mx-auto"
            max-width="400"
          >
            <router-link
              :aria-label="item.title"
              :to="'/product/' + item.id"
               class="decoration_none"
            >
              <v-img
                class="white--text align-end"
                height="300px"
                :src="item.imageSrc"
              >
                <v-card-title>{{ item.title }}</v-card-title>
              </v-img>
            </router-link>

            <v-card-subtitle>
              <span class="title card_price">
                Price: {{ item.price }}$
              </span>
            </v-card-subtitle>
            <v-card-text class="text--primary">
              <div>{{ item.description.substring(0,65) }}...</div>
            </v-card-text>

            <v-card-actions>
              <app-buy-dialog :product="item"></app-buy-dialog>
              <v-btn text outlined :to="'/product/' + item.id" class="ml-3">Description</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
  <div v-else>
    <v-container>
      <v-row
        align="center"
        justify="center"
      >
        <v-col cols="auto">
          <v-progress-circular
            :size="100"
            :width="4"
            color="#f27405"
            indeterminate
          ></v-progress-circular>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  computed: {
    promoProducts () {
      return this.$store.getters.promoProducts
    },
    products () {
      return this.$store.getters.products
    },
    loading () {
      return this.$store.getters.loading
    }
  }
}
</script>

<style scoped>
  .card_price {
    color: #bf3073;
  }

  .decoration_none {
    text-decoration: none!important;
  }
</style>
