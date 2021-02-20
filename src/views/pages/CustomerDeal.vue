<!-- =========================================================================================
  File Name: DataListListView.vue
  Description: Data List - List View
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="data-list-thumb-view" class="data-list-container">
    <div class="vx-row">
            <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
                <statistics-card-line
                  hideChart
                  class="mb-base"
                  icon="AlertOctagonIcon"
                  icon-right
                  :statistic="companyInform.companyName"
                  statisticTitle="Company Name" />
            </div>

            <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
                <statistics-card-line
                  hideChart
                  class="mb-base"
                  icon="AlertOctagonIcon"
                  icon-right
                  :statistic="deals.length"
                  statisticTitle="Total Deal"
                  color="Danger" />
            </div>
        </div>
    <vs-table ref="table" v-model="selected" pagination :max-items="itemsPerPage" search :data="deals">

      <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">

        <!-- ITEMS PER PAGE -->
        <vs-dropdown vs-trigger-click class="cursor-pointer mb-4 mr-4 items-per-page-handler">
          <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
            <span class="mr-2">{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{ deals.length - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage : deals.length }} of {{ queriedItems }}</span>
            <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
          </div>
          <!-- <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
          <vs-dropdown-menu>

            <vs-dropdown-item @click="itemsPerPage=4">
              <span>4</span>
            </vs-dropdown-item>
            <vs-dropdown-item @click="itemsPerPage=10">
              <span>10</span>
            </vs-dropdown-item>
            <vs-dropdown-item @click="itemsPerPage=15">
              <span>15</span>
            </vs-dropdown-item>
            <vs-dropdown-item @click="itemsPerPage=20">
              <span>20</span>
            </vs-dropdown-item>
          </vs-dropdown-menu>
        </vs-dropdown>
      </div>

      <template slot="thead">
        <vs-th sort-key="name">Status</vs-th>
        <vs-th sort-key="name">Name</vs-th>
        <vs-th sort-key="name">Surname</vs-th>
        <vs-th>Phone</vs-th>
        <vs-th>Code</vs-th>
        <vs-th>Title</vs-th>
        <vs-th>Description</vs-th>
        <vs-th>Start Date</vs-th>
        <vs-th>End Date</vs-th>
        <vs-th>Image</vs-th>
      </template>

        <template slot-scope="{data}">
          <tbody>
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
              <vs-td>
                <vs-chip :color="tr.isNotification ? 'danger' : 'success' " class="product-name font-medium truncate ml-5"></vs-chip>
              </vs-td>
              <vs-td>
                <p class="product-name font-medium truncate">{{ tr.name }}</p>
              </vs-td>

              <vs-td>
                <p class="product-name font-medium truncate">{{ tr.surname }}</p>
              </vs-td>

              <vs-td>
                <p class="product-name font-medium truncate">{{ tr.phone }}</p>
              </vs-td>

              <vs-td>
                <p class="product-name font-medium truncate">{{ tr.deal.code }}</p>
              </vs-td>

              <vs-td>
                <p class="product-name font-medium truncate">{{ tr.deal.title }}</p>
              </vs-td>

              <vs-td>
                <p class="product-name font-medium truncate">{{ tr.deal.description }}</p>
              </vs-td>

              <vs-td>
                <vs-chip color="success" class="product-name font-medium truncate">{{ tr.deal.startDate | date }}</vs-chip>
              </vs-td>

              <vs-td>
                <vs-chip color="danger" class="product-name font-medium truncate">{{ tr.deal.endDate | date  }}</vs-chip>
              </vs-td>

              <vs-td class="img-container">
                <img :src="image+tr.deal.image" class="product-img" />
              </vs-td>

            </vs-tr>
          </tbody>
        </template>
    </vs-table>
  </div>
</template>

<script>
import imgURL from '../../helpers/imgURL'
import beep from '../../helpers/beep.mp3'
import StatisticsCardLine from '@/components/statistics-cards/StatisticsCardLine.vue'
export default {
  components: {
    StatisticsCardLine
  },
  data () {
    return {
      selected: [],
      // categories: [],
      itemsPerPage: 10,
      isMounted: false,

      // Data Sidebar
      addNewDataSidebar: false,
      sidebarData: {},
      image:imgURL.photoDealbaseURL,
      companyInform:{
        companyName:""
      },
      oneTime:true
    }
  },
  watch:{
    async selected(item){
      let payload={
        _id:item._id,
        isNotification:false,
      }
      await this.$store.dispatch('updateCustomerNotification',payload)
      await this.$store.dispatch('getAllDealsbyCustomers',this.$store.state.auth.me.company)
    },
    times(value){
      if(value==3){
        clearInterval(myVar);
      }
    }
  },
  computed: {
    currentPage () {
      if (this.isMounted) {
        return this.$refs.table.currentx
      }
      return 0
    },
    deals () {
      let allDeals=this.$store.state.customer.allDeals
      if(allDeals.length!=0){
          allDeals.forEach(element => {
            this.notification(element.isNotification)
          });
      } 

      return allDeals;
    },
    queriedItems () {
      return this.$refs.table ? this.$refs.table.queriedResults.length : this.deals.length
    }
  },
  methods: {
    toggleDataSidebar (val = false) {
      this.addNewDataSidebar = val
    },
    notification(bool) {
      console.log("bool-->",bool);
      if(bool && this.oneTime) {
        var time = 0;
        var id = setInterval(frame, 1000);
        function frame() {
          if (time == 3) {
            clearInterval(id);
          } else {
            var audio = new Audio(beep);
            audio.play();
            time++; 
          }
        }
      }
    }
  },
  async created () {
    let newThis=this;
    setInterval(frame, 1000*60);
    async function frame() {
      await newThis.$store.dispatch('getAllDealsbyCustomers',newThis.$store.state.auth.me.company)
    }
    await this.$store.dispatch('getAllDealsbyCustomers',this.$store.state.auth.me.company)
    await this.$store.dispatch('getCompany',this.$store.state.auth.me.company)
    this.companyInform=this.$store.state.companies.companyInform
  },
  mounted () {
    this.isMounted = true
  }
}
</script>

<style lang="scss">
#data-list-thumb-view {
  .vs-con-table {

    .product-name {
      max-width: 23rem;
    }

    .vs-table--header {
      display: flex;
      flex-wrap: wrap-reverse;
      margin-left: 1.5rem;
      margin-right: 1.5rem;
      > span {
        display: flex;
        flex-grow: 1;
      }

      .vs-table--search{
        padding-top: 0;

        .vs-table--search-input {
          padding: 0.9rem 2.5rem;
          font-size: 1rem;

          &+i {
            left: 1rem;
          }

          &:focus+i {
            left: 1rem;
          }
        }
      }
    }

    .vs-table {
      border-collapse: separate;
      border-spacing: 0 1.3rem;
      padding: 0 1rem;


      tr{
          box-shadow: 0 4px 20px 0 rgba(0,0,0,.05);
          td{
            padding: 10px;
            &:first-child{
              border-top-left-radius: .5rem;
              border-bottom-left-radius: .5rem;
            }
            &:last-child{
              border-top-right-radius: .5rem;
              border-bottom-right-radius: .5rem;
            }
            &.img-container {
              // width: 1rem;
              // background: #fff;

              span {
                display: flex;
                justify-content: flex-start;
              }

              .product-img {
                height: 110px;
              }
            }
          }
          td.td-check{
            padding: 20px !important;
          }
      }
    }

    .vs-table--thead{
      th {
        padding-top: 0;
        padding-bottom: 0;

        .vs-table-text{
          text-transform: uppercase;
          font-weight: 600;
        }
      }
      th.td-check{
        padding: 0 15px !important;
      }
      tr{
        background: none;
        box-shadow: none;
      }
    }

    .vs-table--pagination {
      justify-content: center;
    }
  }
}
</style>
