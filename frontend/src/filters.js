import Vue from 'vue'
import moment from 'moment'


Vue.filter('durationInMins', mins =>{
    const res = moment.duration(mins, 'minutes')
    const hours = res._data.hours
    const minutes = res._data.minutes
    if (hours && minutes) return hours + 'h ' + minutes + 'm'
    else if (hours && !minutes) return hours + 'h'
    return minutes + 'm'
 })

Vue.filter('formatDate', timestamp => moment(timestamp).calendar())
Vue.filter('formatDateFromNow', timestamp => moment(timestamp).calendar(Date.now()))

Vue.filter('rating', ratingAvg =>{
    if (!ratingAvg) return 'Not rated yet'
    ratingAvg = +ratingAvg;
    return ratingAvg + '/5'
 })

 Vue.filter('truncateText', (txt, limit) => {
     if (txt.length >= limit) return txt.substring(0, limit) + '...'
     return txt;
})