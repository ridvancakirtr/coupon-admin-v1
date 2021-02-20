import Vue from 'vue'

import stringHelpers from '@/helpers/string-helpers'
import notify from '@/helpers/notify'
export default {
  install: () => {
    Vue.prototype.$dateHelpers = stringHelpers
    Vue.$dateHelpers = stringHelpers

    Vue.prototype.$notifyService = notify
    Vue.$notifyService = notify
  }
}