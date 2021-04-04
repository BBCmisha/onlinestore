<template>
  <v-container>
    <section class="product elevation-6 mt-3" v-if="!loading">
      <v-row>
        <v-col cols="auto">
          <img :src="product.imageSrc" width="500px">
        </v-col>
        <v-col cols="auto">
          <div class="product_info">
            <h5 class="product_title display-1 mb-3 mt-3">{{ product.title }}</h5>
            <p class="title">
              <span class="product_title">Vendor: </span>
              {{ product.vendor.charAt(0).toUpperCase() + product.vendor.substr(1) }}
            </p>
            <p class="product_price title">
              <span class="product_title">Price: </span>
              {{ product.price }}$
            </p>
            <p class="title">
              <span class="product_title">Color: </span>
              <span
                :title="product.color"
                :style="{ backgroundColor: product.color }"
                class="product_color_bg"
              ></span>
            </p>
            <p class="title">
              <span class="product_title">Material: </span>
              {{ product.material.charAt(0).toUpperCase() + product.material.substr(1) }}
            </p>
            <div class="title mb-5">
              <p class="product_title mb-3">Description: </p>
              {{ product.description }}
            </div>
            <app-buy-dialog :product="product"></app-buy-dialog>
            <app-edit-product :product="product" v-if="isOwner"></app-edit-product>
          </div>
        </v-col>
      </v-row>
    </section>
    <section v-else >
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
    </section>
  </v-container>
</template>

<script>
import EditProduct from './EditProduct'
export default {
  components: {
    appEditProduct: EditProduct
  },
  props: ['id'],
  computed: {
    product () {
      const id = this.id
      return this.$store.getters.productById(id)
    },
    loading () {
      return this.$store.getters.loading
    },
    isOwner () {
      return this.product.ownerId === this.$store.getters.user.id
    }
  }
}
</script>

<style scoped>
  .product {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: 30px;
    margin-bottom: 100px;
  }
  .product_info {
    margin-left: 50px;
    max-width: 500px;
  }
  .product_title {
    font-size: 1.6rem;
    font-weight: bold;
    color: grey;
  }
  .product_price {
    color: #bf3073;
  }
  .product_color_bg {
    display: inline-block;
    width: 50px;
    height: 20px;
    border-radius: 3px;
  }
</style>
