<!-- =========================================================================================
  File Name: AddNewDataSidebar.vue
  Description: Add New Data - Sidebar component
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  <vs-sidebar click-not-close position-right parent="body" default-index="1" color="primary" class="add-new-data-sidebar items-no-padding" spacer v-model="isSidebarActiveLocal">
    <div class="mt-6 flex items-center justify-between px-6">
        <h4>{{ Object.entries(this.data).length === 0 ? "ADD NEW" : "UPDATE" }} ITEM</h4>
        <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>

    <component :is="scrollbarTag" class="scroll-area--data-list-add-new" :settings="settings" :key="$vs.rtl">

      <div class="p-6">

        <!-- Product Image -->
        <template v-if="$data._id==null ? false : true">

          <!-- Image Container -->
          <div class="img-container w-64 mx-auto flex items-center justify-center">
            <img v-if="!isNew" :src="imageURL+logo" alt="img" class="responsive">
            <img v-if="isNew" :src="logo" alt="img" class="responsive">
          </div>

          <!-- Image upload Buttons -->
          <div class="modify-img flex justify-between mt-5">
            <input type="file" class="hidden" ref="updateImgInput" @change="updateCurrImg" accept="image/*">
            <vs-button class="mr-4" type="flat" @click="$refs.updateImgInput.click()">Update Image</vs-button>
            <vs-button type="flat" color="#999" @click="logo = 'no-photo.jpg'">Remove Image</vs-button>
          </div>

        </template>

        <v-select :options="categories" v-model="category" :reduce="categories => categories._id" label="name"  :dir="$vs.rtl ? 'rtl' : 'ltr'"/>
        
        <vs-input label="Company Name" v-model="companyName" class="mt-5 w-full" name="companyName" v-validate="'required|max:50'" />
        <span class="text-danger text-sm" v-show="errors.has('companyName')">{{ errors.first('companyName') }}</span>

        <vs-input label="Coordinates(EX : 38.1223,37.54545)" v-model="location.coordinates" class="mt-5 w-full" name="coordinates" v-validate="'required|max:50'" />
        <span class="text-danger text-sm" v-show="errors.has('coordinates')">{{ errors.first('coordinates') }}</span>

        <vs-input label="Street" v-model="location.street" class="mt-5 w-full" name="street" v-validate="'required|max:50'" />
        <span class="text-danger text-sm" v-show="errors.has('street')">{{ errors.first('street') }}</span>

        <vs-input label="City" v-model="location.city" class="mt-5 w-full" name="city" v-validate="'required|max:50'" />
        <span class="text-danger text-sm" v-show="errors.has('city')">{{ errors.first('city') }}</span>

        <vs-input label="State" v-model="location.state" class="mt-5 w-full" name="state" v-validate="'required|max:50'" />
        <span class="text-danger text-sm" v-show="errors.has('state')">{{ errors.first('state') }}</span>

        <vs-input label="Zipcode" v-model="location.zipcode" class="mt-5 w-full" name="zipcode" v-validate="{regex: '^([0-9]+)$' }" />
        <span class="text-danger text-sm" v-show="errors.has('zipcode')">{{ errors.first('zipcode') }}</span>

        <vs-input label="Country" v-model="location.country" :disabled="true" class="mt-5 w-full" name="country" v-validate="'required|max:50'" />
        <span class="text-danger text-sm" v-show="errors.has('country')">{{ errors.first('country') }}</span>
      </div>
    
    </component>

    <div class="flex flex-wrap items-center p-6" slot="footer">
      <vs-button class="mr-6" @click="submitData" :disabled="!isFormValid">Submit</vs-button>
      <vs-button type="border" color="danger" @click="isSidebarActiveLocal = false">Cancel</vs-button>
    </div>
  </vs-sidebar>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import vSelect from 'vue-select'
import imgURL from '../../../helpers/imgURL'
export default {
  props: {
    isSidebarActive: {
      type: Boolean,
      required: true
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    VuePerfectScrollbar,
    'v-select': vSelect,
  },
  data () {
    return {
      _id:null,
      location: {
          type:"Point",
          coordinates:null,
          street: null,
          city: null,
          state: null,
          zipcode: null,
          country: "USA"
      },
      logo: null,
      companyName: null,
      category: null,
      settings: { // perfectscrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed: .60
      },
      imageURL:imgURL.photoCompanyLogobaseURL,
      isNew:false
    }
  },
  watch: {
    isSidebarActive (val) {
      if(!val){
        this.isNew=false
      }
      if (!val) return
      if (Object.entries(this.data).length === 0) {
        this.initValues()
        this.$validator.reset()
      } else {
        const { _id, location,logo,companyName,name,surname,phone,email,category } = JSON.parse(JSON.stringify(this.data))
            this._id=_id,
            this.location= {
                coordinates: location.coordinates[0]+","+location.coordinates[1],
                street: location.street,
                city: location.city,
                state: location.state,
                zipcode: location.zipcode,
                country: location.country
            },
            this.logo= logo,
            this.companyName= companyName,
            this.category= category
      }
      // Object.entries(this.data).length === 0 ? this.initValues() : { this.dataId, this.dataName, this.dataCategory, this.dataOrder_status, this.dataPrice } = JSON.parse(JSON.stringify(this.data))
    }
  },
  computed: {
    isSidebarActiveLocal: {
      get () {
        return this.isSidebarActive
      },
      set (val) {
        if (!val) {
          this.$emit('closeSidebar')
          // this.$validator.reset()
          // this.initValues()
        }
      }
    },
    isFormValid () {
      return !this.errors.any() 
        && this.location.coordinates
        && this.location.street
        && this.location.city
        && this.location.state
        && this.location.zipcode
        && this.location.country
        && this.companyName
        && this.category
    },
    scrollbarTag () { return this.$store.getters.scrollbarTag },
    categories () {
      return this.$store.state.categories.allCategories
    }
  },
  methods: {
    initValues () {
      this._id=null
      this.categoryName =null
      this.location.coordinates = null
      this.location.street = null
      this.location.city = null
      this.location.state = null
      this.location.zipcode = null
      this.location.country = "USA"
      this.companyName = null
      this.category = null
      this.logo = 'no-photo.jpg'
    },
    submitData () {
      this.$validator.validateAll().then(result => {
        if (result) {
          var res = this.location.coordinates.split(",");
          let obj = {
            _id:this._id,
            location: {
                type:"Point",
                coordinates:[res[0],res[1]],
                street: this.location.street,
                city: this.location.city,
                state: this.location.state,
                zipcode: this.location.zipcode,
                country: this.location.country
            },
            logo: "no-photo.jpg",
            companyName: this.companyName,
            category: this.category,
          }
          
          if (this._id !== null) {
            this.$store.dispatch('updateCompany', obj).catch(err => { console.error(err) })
          } else {
            delete obj._id
            this.$store.dispatch('addCompany', obj).catch(err => { console.error(err) })
          }
          
          this.$emit('closeSidebar')
          this.initValues()
        }
      })
    },
    async updateCurrImg (input) {
      
      if (input.target.files && input.target.files[0]) {
        const reader = new FileReader()
        reader.onload = e => {
          this.logo = e.target.result
          
        }
        reader.readAsDataURL(input.target.files[0])

        var formData = new FormData();
        formData.append("file", input.target.files[0]);

        let payload={
          _id:this._id,
          data:formData
        }
        await this.$store.dispatch('uploadCompanyImage',payload)
        this.isNew=true
      }
    }
  },
  created () {
    this.$store.dispatch('getAllCategories')
  },
}
</script>

<style lang="scss" scoped>
.add-new-data-sidebar {
  ::v-deep .vs-sidebar--background {
    z-index: 52010;
  }

  ::v-deep .vs-sidebar {
    z-index: 52010;
    width: 400px;
    max-width: 90vw;

    .img-upload {
      margin-top: 2rem;

      .con-img-upload {
        padding: 0;
      }

      .con-input-upload {
        width: 100%;
        margin: 0;
      }
    }
  }
}

.scroll-area--data-list-add-new {
    // height: calc(var(--vh, 1vh) * 100 - 4.3rem);
    height: calc(var(--vh, 1vh) * 100 - 16px - 45px - 82px);

    &:not(.ps) {
      overflow-y: auto;
    }
}
</style>
