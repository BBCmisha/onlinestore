<template>
  <v-dialog width="400px" v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn
        text
        outlined
        class="ml-10"
        v-on="on"
      >Edit</v-btn>
    </template>
    <v-card>
      <v-container>
        <v-row>
          <v-col cols="auto">
            <v-card-title>
              <h1 class="text--primary">Edit Product</h1>
            </v-card-title>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col cols="12">
            <v-card-text>
              <v-text-field
                name="title"
                label="Title"
                type="text"
                v-model="editedTitle"
              ></v-text-field>
              <v-textarea v-model="editedDescription">
                <template v-slot:label>
                  <div>
                    Description product
                  </div>
                </template>
              </v-textarea>
            </v-card-text>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col cols="auto">
            <v-card-actions>
              <v-btn color="#F27405" dark @click="onSave">Save</v-btn>
              <v-btn text outlined @click="onCancel">Cancel</v-btn>
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
      editedTitle: this.product.title,
      editedDescription: this.product.description
    }
  },
  methods: {
    onCancel () {
      this.editedTitle = this.product.title
      this.editedDescription = this.product.description
      this.dialog = false
    },
    onSave () {
      if (this.editedTitle !== '' && this.editedDescription !== '') {
        this.$store.dispatch('updateProduct', {
          title: this.editedTitle,
          description: this.editedDescription,
          id: this.product.id
        })
        this.dialog = false
      }
    }
  }
}
</script>
