<template>
	<div>
		<div class="vx-row">

            <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
                <statistics-card-line
                  hideChart
                  class="mb-base"
                  icon="CodepenIcon"
                  icon-right
                  :statistic="Number(totalCategory)"
                  statisticTitle="Total Category" />
            </div>

            <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
                <statistics-card-line
                  hideChart
                  class="mb-base"
                  icon="CommandIcon"
                  icon-right
                  :statistic="Number(totalCompany)"
                  statisticTitle="Total Company"
                  color="success" />
            </div>

            <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
                <statistics-card-line
                  hideChart
                  class="mb-base"
                  icon="ActivityIcon"
                  icon-right
                  :statistic="Number(totalDeal)"
                  statisticTitle="Total Deal"
                  color="danger" />
            </div>

			<div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
                <statistics-card-line
                  hideChart
                  class="mb-base"
                  icon="GitCommitIcon"
                  icon-right
                  :statistic="Number(getUsageDeals)"
                  statisticTitle="Total Usage Deal"
                  color="danger" />
            </div>

        </div>
	</div>
</template>
<script>
import StatisticsCardLine from '@/components/statistics-cards/StatisticsCardLine.vue'
export default {
  	data() {
		return {
			totalDeal:0,
			totalCompany:0,
			totalCategory:0,
			totalUsageDeal:0
		}
  	},
	components: {
    	StatisticsCardLine
  	},
	methods:{
		
	},
	computed:{
		getAllDCC() {
			let total = this.$store.state.dashboard.getAllDCC
			this.totalDeal = total.deal
			this.totalCompany = total.company
			this.totalCategory = total.category
		},

		getUsageDeals() {
			this.totalUsageDeal = this.$store.state.dashboard.totalDealUsage
			return this.totalUsageDeal
		}
	},
	async mounted(){
		await this.$store.dispatch('getTotalDCC')
		await this.$store.dispatch('getUsageDeals')
		
		this.getAllDCC;
  }
}
</script>