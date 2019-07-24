<template>
  <section class="main-container">
    <section class="map-container">
      <GmapMap
        class="gMap-Map"
        ref="mapRef"
        :center="{lat:10, lng:10}"
        :zoom="12"
        map-type-id="terrain"
        style="width: 100%; height: calc(100vh - 50px)"
      >
        <gmap-marker
          v-for="(offer, index) in offers"
          :key="'marker'+index"
          :position="offer.location"
          :icon="offer.imgsUrl[0]"
          @click="panTo(offer)"
        ></gmap-marker>
        <gmap-circle
          v-for="(offer, index) in offers"
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
      </GmapMap>
    </section>
    <section class="content-container">
      <div class="type-wrapper">
        <div @click="setType('all')" data-value='all' ref="type1" class="selected">All offers</div>
        <div @click="setType('near-me', $event)" data-value="near-me" ref="type2">Near me</div>
        <div @click="setType('booked', $event)" data-value="booked" ref="type3">Booked</div>
      </div>
      <!-- <gmap-autocomplete @place_changed="setPlace" class="form-input"></gmap-autocomplete> -->
      <span>Showing only offers with location</span>
      <OfferList
        class="offer-list"
        v-if="offers"
        :offers="offers"
        :currMarkedOfferId="currMarkedOfferId"
        :cols="2"
        @offerClicked="panTo"
      ></OfferList>
    </section>
  </section>
</template>

<script>
import OfferList from "../components/OfferList";

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
      map: null,
      currOfferId: "",
      filterBy: 'all'
    };
  },
  methods: {
    panTo({ location, _id }) {
      if (!this.map) return;
      const offerId = _id;
      this.map.panTo(location);
      this.currOfferId = offerId;
      setTimeout(()=>{
          var el = this.$el.getElementsByClassName("offer-preview marked")[0];
      el.scrollIntoView({behavior: "smooth",block: "center"});
      },100)
    },
    setType(selectedValue) {
      const targets = [this.$refs.type1, this.$refs.type2, this.$refs.type3];
      targets.forEach(target => {
        if (target.dataset.value !== selectedValue)
          target.classList.remove("selected");
        else target.classList.add("selected");
      });

      console.log("changed to:", this.filterBy);
    }
  },
  computed: {
    currMarkedOfferId() {
      return this.currOfferId;
    }
  },
  components: {
    OfferList
  }
};
</script>


<style scoped lang="scss">
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
</style>
