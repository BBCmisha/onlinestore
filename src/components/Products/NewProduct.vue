<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="6">
        <h1 class="text--secondary mb-3">Create New Product</h1>

        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
        >
          <v-text-field
            label="Title"
            name="title"
            type="text"
            v-model="title"
            required
            :rules="[v => !!v || 'Title is require']"
          ></v-text-field>

          <v-text-field
            label="Vendor product"
            name="vendor"
            type="text"
            v-model="vendor"
          ></v-text-field>

          <v-text-field
            label="Color product"
            name="color"
            type="text"
            v-model="color"
          ></v-text-field>

          <v-text-field
            label="Material product"
            name="material"
            type="text"
            v-model="material"
          ></v-text-field>

          <v-text-field
            label="Price product"
            name="price"
            type="text"
            v-model="price"
            required
            :rules="[v => !!v || 'Price is required']"
          ></v-text-field>

          <v-textarea v-model="description">
            <template v-slot:label>
              <div>
                Description product
              </div>
            </template>
          </v-textarea>
        </v-form>

      </v-col>
    </v-row>

    <v-row justify="center" class="mb-3">
      <v-col cols="6">
        <v-switch
          color="#f27405"
          v-model="promo"
          label="Add to promo?"
        ></v-switch>
      </v-col>
    </v-row>

    <v-row justify="center" class="mb-3">
      <v-col cols="6">
        <v-btn text outlined @click="upload">
          Upload img
          <v-icon right>mdi-cloud-upload</v-icon>
        </v-btn>
        <input
          ref="fileInput"
          type="file"
          style="display: none;"
          accept="image/*"
          @change="onFileChange"
          >
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="6">
        <img :src="imageSrc" height="200px" v-if="imageSrc">
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="6">
        <v-btn
          :disabled="!valid || !image || loading"
          text
          outlined
          @click="createProduct"
          :loading="loading"
        >Create product</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      title: '',
      vendor: '',
      color: '',
      material: '',
      price: 0,
      description: '',
      promo: false,
      valid: false,
      image: null,
      imageSrc: ''
    }
  },
  methods: {
    createProduct () {
      if (this.$refs.form.validate() && this.image) {
        const product = {
          title: this.title,
          vendor: this.vendor,
          color: this.color,
          material: this.material,
          price: this.price,
          description: this.description,
          promo: this.promo,
          image: this.image
        }

        this.$store.dispatch('createProduct', product)
          .then(() => {
            this.$router.push('/list')
          })
          .catch(() => {})
      }
    },
    upload () {
      this.$refs.fileInput.click()
    },
    onFileChange (event) {
      const file = event.target.files[0]
      const reader = new FileReader()
      reader.onload = e => {
        this.imageSrc = reader.result
      }
      reader.readAsDataURL(file)
      this.image = file
      console.log(this.image)
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  }
}
</script>
