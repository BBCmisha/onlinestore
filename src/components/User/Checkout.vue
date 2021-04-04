<template>
  <v-container>
    <v-row
      align="center"
      justify="center"
    >
      <v-col cols="6" class="pt-5" v-if="loading">
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
      </v-col>
      <v-col cols="6" offset-sm v-else-if="!loading && orders.length !== 0">

        <v-list
          subheader
          two-line
          flat
        >
          <h1 class="text--secondary mb-3">Orders</h1>

          <v-list-item-group
            multiple
          >
            <v-list-item
              v-for="(order, idx) of orders"
              :key="idx"
            >
              <template>
                <v-list-item-action>
                  <v-checkbox
                    :input-value="order.done"
                    color="#f27405"
                    @change="markDone(order)"
                    :disabled="order.done"
                  ></v-checkbox>
                </v-list-item-action>

                <v-list-item-content>
                  <v-list-item-title>{{ order.name }}</v-list-item-title>
                  <v-list-item-subtitle>{{ order.phone }}</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                  <v-btn text outlined :to="'/product/' + order.productId">Open</v-btn>
                </v-list-item-action>
              </template>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>
      <v-col cols="6" class="pt-5" v-else>
        <h1 class="text--secondary">You have no orders</h1>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  methods: {
    markDone (order) {
      this.$store.dispatch('markOrderDone', order.id)
        .then(() => {
          order.done = true
        })
        .catch(() => {})
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    orders () {
      return this.$store.getters.orders
    }
  },
  created () {
    this.$store.dispatch('fetchOrders')
  }
}
</script>
