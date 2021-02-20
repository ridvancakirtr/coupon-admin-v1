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
        <h4>{{ Object.entries(this.data).length === 0 ? "ADD NEW" : "UPDATE" }} USER</h4>
        <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>

    <component :is="scrollbarTag" class="scroll-area--data-list-add-new" :settings="settings" :key="$vs.rtl">

      <div class="p-6">

         <v-select :options="companies" v-model="company" :reduce="companies => companies._id" label="companyName"  :dir="$vs.rtl ? 'rtl' : 'ltr'"/>

        <vs-input label="Name" v-model="name" class="mt-5 w-full" name="name" v-validate="'required|max:50'" />
        <span class="text-danger text-sm" v-show="errors.has('name')">{{ errors.first('name') }}</span>

        <vs-input label="Surname" v-model="surname" class="mt-5 w-full" name="surname" v-validate="'required|max:50'" />
        <span class="text-danger text-sm" v-show="errors.has('surname')">{{ errors.first('surname') }}</span>

        <vs-input label="Email" v-model="email" class="mt-5 w-full" name="email" v-validate="'required|email|max:50'" />
        <span class="text-danger text-sm" v-show="errors.has('email')">{{ errors.first('email') }}</span>

        <vs-input label="Phone" v-model="phone" class="mt-5 w-full" name="phone" v-validate="{regex: '^([0-9]+)$' }" />
        <span class="text-danger text-sm" v-show="errors.has('phone')">{{ errors.first('phone') }}</span>

        <v-select :options="['Male','Female']" v-model="gender" class="mt-5 w-full" :dir="$vs.rtl ? 'rtl' : 'ltr'"/>

        <vs-input label="New Password" v-model="newPassword" v-show="isEditNormal" class="mt-5 w-full" name="newPassword" v-validate="'max:50'" />
        <span class="text-danger text-sm" v-show="errors.has('newPassword')">{{ errors.first('newPassword') }}</span>

        <vs-input label="New Password Re" v-model="newPassword2" v-show="isEdit" class="mt-5 w-full" name="newPassword2" v-validate="'max:50'" />
        <span class="text-danger text-sm" v-show="errors.has('newPassword2')">{{ errors.first('newPassword2') }}</span>
        
      </div>
    </component>

    <div class="flex flex-wrap items-center p-6" slot="footer">
      <vs-button class="mr-6" @click="submitData" :disabled="!isFormValid">Submit</vs-button>
      <vs-button color="warning" class="mr-6" @click="updatePassword" :disabled="!isPasswordValid">Pass Update</vs-button>
    </div>
  </vs-sidebar>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import vSelect from 'vue-select'

export default {
  props: {
    isSidebarActive: {
      type: Boolean,
      required: true
    },
    data: {
      type: Object,
      default: () => {}
    },
    settings: { // perfectscrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed: .60
      }
  },
  components: {
    VuePerfectScrollbar,
    'v-select': vSelect
  },
  data () {
    return {
      isEdit:false,
      isEditNormal:false,
      _id:null,
      name: null,
      surname: null,
      email: null,
      phone: null,
      gender:null,
      company:null,
      newPassword:null,
      newPassword2:null
    }
  },
  watch: {
    isSidebarActive (val) {
      if (!val) return
      if (Object.entries(this.data).length === 0) {
        this.initValues()
        this.$validator.reset()
      } else {
        const { _id, name, surname, email, phone, gender, company} = JSON.parse(JSON.stringify(this.data))
        this._id = _id
        this.name= name
        this.surname = surname
        this.email= email
        this.phone = phone
        this.gender= gender
        this.company= company
        this.newPassword=null,
        this.newPassword2=null
        this.isEdit=true
        this.isEditNormal=true
      }
      // Object.entries(this.data).length === 0 ? this.initValues() : { this.dataId, this.categoryName, this.dataCategory, this.dataOrder_status, this.dataPrice } = JSON.parse(JSON.stringify(this.data))
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
        && this.name
        && this.surname
        && this.email
        && this.phone
        && this.gender
        && this.company
    },
    isPasswordValid () {
      if(this.newPassword==this.newPassword2 && !this.errors.any() && this.newPassword!="" && this.newPassword2){
        return true
      }else{
        return false
      }

    },
    scrollbarTag () { return this.$store.getters.scrollbarTag },
    companies () {
      return this.$store.state.companies.allCompanies
    }
  },
  methods: {
    initValues () {
        this._id = null,
        this.name= null,
        this.surname = null,
        this.email= null,
        this.phone = null,
        this.gender= null,
        this.company= null
        this.newPassword=null
        this.isEditNormal=true,
        this.isEdit=false
    },
    
    submitData () {
      this.$validator.validateAll().then(result => {
        if (result) {
          const obj = {
            name:this.name,
            surname:this.surname,
            email:this.email,
            password:this.newPassword,
            phone:this.phone,
            gender:this.gender,
            company:this.company
          }
          
          if (this._id !== null) {
            let payload={
              obj,
              _id:this._id
            }
            console.log("payload",payload);
            this.$store.dispatch('updateUser', payload).catch(err => { console.error(err) })
          } else {
            delete obj._id
            this.$store.dispatch('createUser', obj).catch(err => { console.error(err) })
          }

          this.$emit('closeSidebar')
          this.initValues()
        }
      })
    },

    updatePassword(){
      let payload={
        _id:this._id,
        newPassword:this.newPassword
      }
      this.$store.dispatch('passwordUpdate', payload).catch(err => { console.error(err) })
    }
  },
  async mounted(){
    await this.$store.dispatch('getAllCompanies')
  }
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
