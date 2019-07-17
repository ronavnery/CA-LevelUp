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

Vue.filter('rating', ratingAvg =>{
    if (!ratingAvg) return 'Not rated yet'
    else return ratingAvg
 })