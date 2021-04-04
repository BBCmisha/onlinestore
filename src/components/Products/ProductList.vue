<template>
  <v-container>
    <v-row justify="center" v-if="!loading && myProducts.length !== 0">
      <v-col cols="6">
        <h1 class="text--secondary mb-3">My Products</h1>

        <v-card
          class="elevation-6 mb-3"
          v-for="(product, idx) of myProducts"
          :key="idx"
        >
          <v-container>
            <v-row>
              <v-col align-self="center">
                <v-img :src="product.imageSrc" width="300px" style="margin: 0 auto;"></v-img>
              </v-col>
              <v-col>
                <v-row
                  class="flex-column ma-0 fill-height"
                  justify="center"
                >
                  <v-col class="px-0">
                    <v-card-subtitle class="title">{{ product.title }}</v-card-subtitle>
                    <v-card-subtitle>
                      <span class="title card_price">
                        Price: {{ product.price }}$
                      </span>
                    </v-card-subtitle>
                    <v-card-text>{{ product.description }}</v-card-text>
                  </v-col>
                  <v-col>
                    <v-card-actions>
                      <v-btn
                        text
                        outlined
                        :to="'/product/' + product.id"
                      >Open</v-btn>
                    </v-card-actions>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center" v-else-if="!loading && myProducts.length === 0">
      <v-col cols="6">
        <h1 class="text--primary">You have no products</h1>
      </v-col>
    </v-row>
    <v-row
          align="center"
          justify="center"
          v-else
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
</template>

<script>
export default {
  computed: {
    myProducts () {
      return this.$store.getters.myProducts
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
</style>
