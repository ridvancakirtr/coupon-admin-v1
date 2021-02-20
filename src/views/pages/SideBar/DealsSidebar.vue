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
            <img v-if="!isNew" :src="imageURL+image" alt="img" class="responsive">
            <img v-if="isNew" :src="image" alt="img" class="responsive">
            
          </div>

          <!-- Image upload Buttons -->
          <div class="modify-img flex justify-between mt-5">
            <input type="file" class="hidden" name="xyz" ref="updateImgInput" @change="updateCurrImg" accept="image/*">
            <vs-button class="mr-4" type="flat" @click="$refs.updateImgInput.click()">Update Image</vs-button>
            <vs-button type="flat" color="#999" @click="image = 'no-photo.jpg'">Remove Image</vs-button>
          </div>

        </template>

        <v-select :options="companies" v-model="company" :reduce="companies => companies._id" label="companyName"  :dir="$vs.rtl ? 'rtl' : 'ltr'"/>
        
        <vs-input label="Title" v-model="title" class="mt-5 w-full" name="title" v-validate="'required|max:50'" />
        <span class="text-danger text-sm" v-show="errors.has('title')">{{ errors.first('title') }}</span>

        <vs-input label="Description" v-model="description" class="mt-5 w-full" name="description" v-validate="'required|max:255'" />
        <span class="text-danger text-sm" v-show="errors.has('description')">{{ errors.first('description') }}</span>

        <vs-input label="Code" v-model="code" class="mt-5 w-full" name="code" v-validate="'required|max:50'" />
        <span class="text-danger text-sm" v-show="errors.has('code')">{{ errors.first('code') }}</span>

        <datepicker placeholder="Select Date" v-model="startDate" class="mt-5 w-full"></datepicker>

        <datepicker placeholder="End Date" v-model="endDate" class="mt-5 w-full"></datepicker>
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
import Datepicker from 'vuejs-datepicker';
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
    Datepicker
  },
  data () {
    return {
      _id:null,

      title: null,
      description: null,
      code: null,
      company: null,
      image:null,
      settings: { // perfectscrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed: .60
      },
      imageURL:imgURL.photoDealbaseURL,
      startDate:null,
      endDate:null,
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
        const { _id, title,image,description,code,company,startDate,endDate} = JSON.parse(JSON.stringify(this.data))
            this._id=_id,
            this.image=image,
            this.title= title,
            this.description= description,
            this.code= code
            this.company= company
            this.startDate=startDate,
            this.endDate=endDate
      }
      // Object.entries(this.data).length === 0 ? this.initValues() : { this.dataId, this.dataName, this.dataCategory, this.dataOrder_status, this.dataPrice } = JSON.parse(JSON.stringify(this.data))
    },
    startDate(a){
      console.log(a);
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
        && this.title
        && this.description
        && this.code
        && this.company
        && this.startDate
        && this.endDate
    },
    scrollbarTag () { return this.$store.getters.scrollbarTag },
    companies () {
      return this.$store.state.companies.allCompanies
    }
  },
  methods: {
    initValues () {
      this._id=null
      this.title = null
      this.description = null
      this.code = null
      this.company = null
      this.image = "no-photo.jpg"
      this.startDate = null
      this.endDate = null
    },
    submitData () {
      this.$validator.validateAll().then(result => {
        if (result) {
          let obj = {
            _id:this._id,
            title: this.title,
            description: this.description,
            image: this.image,
            code: this.code,
            company: this.company,
            startDate: this.startDate,
            endDate: this.endDate,
          }
          
          if (this._id !== null) {
            this.$store.dispatch('updateDeal', obj).catch(err => { console.error(err) })
          } else {
            delete obj._id
            this.$store.dispatch('addDeal', obj).catch(err => { console.error(err) })
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
          this.image = e.target.result
          
        }
        reader.readAsDataURL(input.target.files[0])

        var formData = new FormData();
        formData.append("xyz", input.target.files[0]);

        let payload={
          _id:this._id,
          data:formData
        }
        await this.$store.dispatch('uploadDealImage',payload)
        this.isNew=true
      }
    }
  },
  created () {
    this.$store.dispatch('getAllCompanies')
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
