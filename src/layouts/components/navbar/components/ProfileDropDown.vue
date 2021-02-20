<template>
  <div class="the-navbar__user-meta flex items-center" v-if="profile.name">

    <div class="text-right leading-tight hidden sm:block">
      <p class="font-semibold">{{ profile.name }}</p>
      <small>{{ profile.surname }}</small>
    </div>

    <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">

      <div class="con-img ml-3">
        <img v-if="activeUserInfo.photoURL" key="onlineImg" :src="activeUserInfo.photoURL" alt="user-img" width="40" height="40" class="rounded-full shadow-md cursor-pointer block" />
      </div>

      <vs-dropdown-menu class="vx-navbar-dropdown">
        <ul style="min-width: 9rem">

          <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"  @click="profilePage">
            <feather-icon icon="UserIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">Profile</span>
          </li>
          
          <vs-divider class="m-1" />

          <li
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
            @click="logout">
            <feather-icon icon="LogOutIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">Logout</span>
          </li>
        </ul>
      </vs-dropdown-menu>
    </vs-dropdown>
  </div>
</template>

<script>
export default {
  data() {
    return {
      profile:{
          name: null,
          surname: null,
          email: null,
          phone: null,
          gender: null
      }
    }
  },
  computed: {
    activeUserInfo () {
      return this.$store.state.AppActiveUser
    },
    me() {
        let me=this.$store.state.auth.me
        this.profile.name= me.name,
        this.profile.surname= me.surname,
        this.profile.email= me.email,
        this.profile.phone= me.phone,
        this.profile.gender= me.gender
    }
  },
  methods: {
    async logout () {
      let isLogout = await this.$store.dispatch('logout')
      if(isLogout){
        this.$store.commit('IS_LOGGED',false);
        this.$router.push('/login')
      }
    },
    profilePage () {
      this.$router.push('/profile')
    }
  },
  async mounted(){
        await this.$store.dispatch('me')
        this.me
  }
}
</script>
