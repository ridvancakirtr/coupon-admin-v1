<template>
    <div class="vx-row">
        <div class="vx-col md:w-1/2 w-full mb-base">
            <vx-card title="Profile">
                <div class="vx-row mb-6">
                <div class="vx-col w-full">
                    <vs-input class="w-full" label="First Name" name="name" v-validate="'required|max:50'" v-model="profile.name" />
                    <span class="text-danger text-sm" v-show="errors.has('name')">{{ errors.first('name') }}</span>
                </div>
                </div>
                <div class="vx-row mb-6">
                <div class="vx-col w-full">
                    <vs-input class="w-full" label="Surname" name="surname" v-validate="'required|max:50'" v-model="profile.surname" />
                    <span class="text-danger text-sm" v-show="errors.has('surname')">{{ errors.first('surname') }}</span>
                </div>
                </div>
                <div class="vx-row mb-6">
                <div class="vx-col w-full">
                    <vs-input class="w-full" type="email" name="email" label="Email" v-validate="'required|email|max:50'" v-model="profile.email" />
                    <span class="text-danger text-sm" v-show="errors.has('email')">{{ errors.first('email') }}</span>
                </div>
                </div>
                <div class="vx-row mb-6">
                <div class="vx-col w-full">
                    <vs-input class="w-full" label="Mobile" name="phone" v-validate="{regex: '^([0-9]+)$' }" v-model="profile.phone" />
                    <span class="text-danger text-sm" v-show="errors.has('phone')">{{ errors.first('phone') }}</span>
                </div>
                </div>
                <div class="vx-row mb-6">
                <div class="vx-col w-full">
                    <v-select :options="['Male','Female']" v-model="profile.gender" :dir="$vs.rtl ? 'rtl' : 'ltr'"/>
                </div>
                </div>
                <div class="vx-row">
                <div class="vx-col w-full">
                    <vs-button class="mr-3 mb-2" :disabled="!isProfileValid" @click="updateProfile">Update Profile</vs-button>
                </div>
                </div>
            </vx-card>
        </div>
        <div class="vx-col md:w-1/2 w-full mb-base">
            <vx-card title="Password">
                <div class="vx-row mb-6">
                <div class="vx-col w-full">
                    <vs-input class="w-full" type="password" label="Current Password" v-model="password.currentPassword" />
                </div>
                </div>
                <div class="vx-row mb-6">
                <div class="vx-col w-full">
                    <vs-input class="w-full" type="password" label="New Password" v-model="password.newPassword" />
                </div>
                </div>
                <div class="vx-row mb-6">
                <div class="vx-col w-full">
                    <vs-input class="w-full" type="password" label="New Password Re" v-model="password.newPassword2" />
                    <span class="text-danger text-sm" v-show="this.password.newPassword!=this.password.newPassword2">Passwords does not match</span>
                </div>
                </div>
                <div class="vx-row">
                <div class="vx-col w-full">
                    <vs-button class="mr-3 mb-2" @click="updatePassword" :disabled="!isPasswordValid">Update Password</vs-button>
                </div>
                </div>
            </vx-card>
        </div>
    </div>
</template>

<script>
import vSelect from 'vue-select'
export default {
  data() {
    return {
        profile:{
            name: null,
            surname: null,
            email: null,
            phone: null,
            gender: null
        },
        password:{
            currentPassword: null,
            newPassword: null,
            newPassword2: null
        }
    }
  },
  computed:{
    me() {
        let me=this.$store.state.auth.me
        this.profile.name= me.name,
        this.profile.surname= me.surname,
        this.profile.email= me.email,
        this.profile.phone= me.phone,
        this.profile.gender= me.gender
    },
    isProfileValid () {
      return !this.errors.any() 
        && this.profile.name
        && this.profile.surname
        && this.profile.email
        && this.profile.phone
        && this.profile.gender
    },
    isPasswordValid () {
      if(this.password.newPassword!=this.password.newPassword2){
          return false
      }

      if(this.password.newPassword==null && this.password.newPassword2==null){
          return false
      }

      if(this.password.newPassword=='' && this.password.newPassword2==''){
          return false
      }

      return true
    }
  },
  components: {
    'v-select': vSelect,
  },
  methods:{
    async updateProfile(){
        await this.$store.dispatch('updateDetails',this.profile)
    },
    async updatePassword(){
        if(this.password.newPassword==this.password.newPassword2){
            delete this.password.newPassword2
            await this.$store.dispatch('updatePassword',this.password)
        }
    }
  },
  async mounted(){
        await this.$store.dispatch('me')
        this.me
  }
}
</script>