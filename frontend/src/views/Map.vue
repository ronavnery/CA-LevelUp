<template>
  <section class="main-container">
    <section class="map-container">
      <GmapMap
        class="gMap-Map"
        ref="mapRef"
        :center="{lat:10, lng:10}"
        :zoom="7"
        map-type-id="terrain"
        style="width: 100%; height: calc(100vh - 50px)"
      >
        <gmap-marker
          v-for="(event, index) in events"
          :key="'marker'+index"
          :position="event.position"
          :icon="require('../assets/Maps/marker-50x50-gradient.png')"
          @click="panTo(event.position)"
        ></gmap-marker>
        <gmap-circle
          v-for="(event, index) in events"
          :key="'circle'+index"
          :center="event.position"
          :options="{
            strokeColor: '#000',
            strokeOpacity: 0,
            strokeWeight: 0,
            fillColor: '#ff6ada',
            fillOpacity: 0.25,
            radius: 200
            }"
          @click="panTo(event.position)"
        ></gmap-circle>
      </GmapMap>
    </section>
    <section class="content-container">
      <div class="type-wrapper">
        <div @click="setType('')" data-value ref="type1" class="selected">All offers</div>
        <div @click="setType('group', $event)" data-value="group" ref="type2">Near me</div>
        <div @click="setType('single', $event)" data-value="single" ref="type3">Booked</div>
      </div>
    </section>
  </section>
</template>

<script>
export default {
  //   async mounted() {
  //     const map = await this.$refs.mapRef.$mapPromise;
  //     map.panTo({ lat: 1.38, lng: 103.8 });
  //   },
  mounted() {
    this.$refs.mapRef.$mapPromise.then(map => {
      this.map = map;
    });
  },
  methods: {
    panTo(position) {
      if (!this.map) return;
      this.map.panTo(position);
    },
    setType(selectedValue) {
      const targets = [this.$refs.type1, this.$refs.type2, this.$refs.type3];
      targets.forEach(target => {
        if (target.dataset.value !== selectedValue)
          target.classList.remove("selected");
        else target.classList.add("selected");
      });
      console.log("changed to:", selectedValue);
      //   this.filter.type = selectedValue;
      //   this.emitFilter();
    }
  },
  data() {
    return {
      map: null,
      events: [
        {
          position: {
            lng: 34.77,
            lat: 32.09
          }
        },
        {
          position: {
            lng: 34.78,
            lat: 32.08
          }
        }
      ],
      location: {
        lng: 34.77,
        lat: 32.09
      }
    };
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
  width: 40vw;
}

.gMap-Map {
  border: 0.5px solid black;
}

.type-wrapper {
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
