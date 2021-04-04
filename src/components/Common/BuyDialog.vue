<template>
  <v-dialog width="500px" v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn
        color="#F27405"
        dark
        v-on="on"
      >Buy</v-btn>
    </template>
    <v-card>
      <v-container>
        <v-row>
          <v-col cols="auto">
            <v-card-title>
              <h1 class="text--primary">Do you want to buy it?</h1>
            </v-card-title>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col cols="12">
            <v-card-text>
              <v-text-field
                name="name"
                label="Name"
                type="text"
                v-model="name"
              ></v-text-field>
              <v-text-field
                name="phone"
                label="Phone"
                type="text"
                v-model="phone"
              ></v-text-field>
            </v-card-text>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col cols="auto">
            <v-card-actions>
              <v-btn
                color="#F27405"
                dark @click="onBuy"
                :disabled="localLoading"
                :loading="localLoading"
              >Buy it!</v-btn>
              <v-btn
                text
                outlined
                @click="onClose"
                :disabled="localLoading"
              >Close</v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['product'],
  data () {
    return {
      dialog: false,
      name: '',
      phone: '',
      localLoading: false
    }
  },
  methods: {
    onClose () {
      this.name = ''
      this.phone = ''
      this.dialog = false
    },
    onBuy () {
      if (this.name !== '' && this.phone !== '') {
        this.localLoading = true
        this.$store.dispatch('createOrder', {
          name: this.name,
          phone: this.phone,
          productId: this.product.id,
          ownerId: this.product.ownerId
        })
          .finally(() => {
            this.name = ''
            this.phone = ''
            this.localLoading = false
            this.dialog = false
          })
      }
    }
  }
}
</script>
