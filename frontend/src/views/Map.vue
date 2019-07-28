<template>
  <section class="main-container">
    <section class="map-container">
      <GmapMap
        class="gMap-Map"
        ref="mapRef"
        :center="{lat:10, lng:10}"
        :zoom="15"
        map-type-id="terrain"
        style="width: 100%; height: calc(100vh - 50px)"
      >
        <!-- ALL OFFERS MARKERS AND CIRCLES -->
        <gmap-marker
          v-for="(offer, index) in offersToShow"
          :key="'marker'+index"
          :position="offer.location"
          :icon="require('../assets/Maps/marker-50x50-gradient.png')"
          @click="panTo(offer)"
        ></gmap-marker>
        <gmap-circle
          v-for="(offer, index) in offersToShow"
          :key="'circle'+index"
          :center="offer.location"
          :options="{
            strokeColor: '#000',
            strokeOpacity: 0,
            strokeWeight: 0,
            fillColor: '#ff6ada',
            fillOpacity: 0.25,
            radius: 200
            }"
          @click="panTo(offer)"
        ></gmap-circle>
        <!-- MY LOCATION MARKER AND CIRCLE -->
        <gmap-marker :position="myLocation"></gmap-marker>
      </GmapMap>
    </section>
    <section class="content-container">
      <div class="type-wrapper">
        <div @click="setFilter('all')" data-value="all" ref="type1" class="selected">All offers</div>
        <div @click="setFilter('near-me', $event)" data-value="near-me" ref="type2">Near me</div>
        <div @click="setFilter('booked', $event)" data-value="booked" ref="type3">Booked</div>
      </div>
      <!-- <gmap-autocomplete @place_changed="setPlace" class="form-input"></gmap-autocomplete> -->
      <div class="distance-container">
      <span>Showing only offers with location</span>
      <span v-if="filterBy === 'near-me'"> within {{customDistance}}km</span>
      <input  type="range"  min="1" max="100" class="custom-range" id="customRange1" v-model="customDistance"   v-if="filterBy === 'near-me'" @input="setDistance()">
      </div>
      <!-- <range-slider v-if="filterBy === 'near-me'" class="slider" min="1" max="100" step="5" v-model="customDistance" @input="setDistance($event)"></range-slider> -->
      <OfferList
        class="offer-list"
        v-if="offersToShow"
        :offers="offersToShow"
        :currMarkedOfferId="currMarkedOfferId"
        :cols="2"
        @offerClicked="panTo"
      ></OfferList>
    </section>
  </section>
</template>

<script>
import OfferList from "../components/OfferList";
import _ from "lodash";
import RangeSlider from "vue-range-slider";
import "vue-range-slider/dist/vue-range-slider.css";
import { mdbRangeInput } from "mdbvue";

export default {
  async created() {
    const offers = await this.$store.dispatch({
      type: "loadOffers",
      filter: { type: "In Person" }
    });
    this.offers = offers;
  },
  async mounted() {
    const map = await this.$refs.mapRef.$mapPromise;
    this.map = map;
    map.panTo({ lng: 34.77, lat: 32.09 });
  },
  data() {
    return {
      offers: null,
      offersNearMe: null,
      map: null,
      currOfferId: "",
      filterBy: "",
      currentLocation: null,
      customDistance: 20
    };
  },
  methods: {
    panTo({ location, _id = "" }) {
      if (!this.map) return;
      const offerId = _id;
      this.map.panTo(location);
      this.currOfferId = offerId;
      setTimeout(() => {
        var el = this.$el.getElementsByClassName("offer-preview marked")[0];
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    },
    setFilter(filterBy) {
      const targets = [this.$refs.type1, this.$refs.type2, this.$refs.type3];
      targets.forEach(target => {
        if (target.dataset.value !== filterBy)
          target.classList.remove("selected");
        else target.classList.add("selected");
      });
      if (filterBy === "all") this.filterBy = "all";
      else if (filterBy === "near-me") {
        this.filterBy = filterBy;
        // TODOS: Make this ASYNC!
        this.setMyLocation();
        setTimeout(() => {
          this.panToMyLocation();
          this.setOffersNearMe(5);
        }, 100);
      }
    },
    setMyLocation() {
      navigator.geolocation.getCurrentPosition(position => {
        this.currentLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
      return this.currentLocation;
    },
    setOffersNearMe(maxDistance) {
      console.log("seeting with distance", maxDistance);
      this.offersNearMe = this.offers.filter(offer => {
        const distance = this.calcDistance(
          this.currentLocation,
          offer.location
        );
        return distance < maxDistance;
      });
    },
    panToMyLocation() {
      if (!this.map) return;
      this.map.panTo(this.currentLocation);
    },
    calcDistance(latLngA, latLngB) {
      var pointA = new google.maps.LatLng(latLngA.lat, latLngA.lng);
      var pointB = new google.maps.LatLng(latLngB.lat, latLngB.lng);
      function getDistanceInKm(pointA, pointB) {
        var distance_in_meters = google.maps.geometry.spherical.computeDistanceBetween(
          pointA,
          pointB
        );
        return distance_in_meters / 1000;
      }
      return getDistanceInKm(pointA, pointB).toFixed(2);
    },
    setDistance() {
      this.setOffersNearMe(+this.customDistance);
    }
  },
  computed: {
    offersToShow() {
      if (this.filterBy === "near-me") return this.offersNearMe;
      return this.offers;
    },
    currMarkedOfferId() {
      return this.currOfferId;
    },
    myLocation() {
      return this.currentLocation;
    }
  },
  components: {
    OfferList,
    RangeSlider,
    mdbRangeInput
  }
};
</script>


<style scoped lang="scss">
@import "~vue-range-slider/dist/vue-range-slider.scss";

.main-container {
  display: flex;
}

.map-container {
  flex: 1;
}

.content-container {
  @include flexCustom(flex-start, center, column);
  width: 40vw;
  //   flex: 1;
  padding: 20px;
  overflow: auto;
  height: calc(100vh - 50px);

  .offer-list {
    align-self: flex-start;
  }
}

.gMap-Map {
  border: 0.5px solid black;
}

.type-wrapper {
  min-height: max-content;
  display: flex;
  margin: 10px 30px;
  border-radius: 4px;
  overflow: hidden;
  div {
    background-color: $tpGray3;
    flex: 1;
    display: inline-block;
    margin: 0;
    text-align: center;
    padding: 5px 15px;
    cursor: pointer;
    height: 42px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    transition: all 0.135s;
    color: rgba(255, 255, 255, 0.7);
    line-height: 2;
  }

  div.selected {
    background-color: $tpPink2;
    color: white;
  }
}

.distance-container {
  align-self: flex-start;
  .custom-range {
    margin-top: 15px;
  }
}
</style>
