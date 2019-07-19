<template>
  <section class="offer-list-container">
   <div class="offer-items">
     <div class="offer-item" v-for="offer in offers" :key="offer._id">
       <div class="offer-cover" :style="getCover(offer.imgs[0])"></div>
       <div class="offer-body">
         <div class="offer-info">
           <div class="offer-info-header">Learn Javascript</div>
           <div class="offer-info-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitation!</div>
           <div class="offer-info-category">Personal Development</div>
         </div>
         <div class="offer-actions"></div>
       </div>
     </div>
   </div>
  </section>
</template>

<script>
import OfferPreview from "./OfferPreview";

export default {
  name: "OfferList",
  props: {
    offers: {
      type: Array
    }
  },
  methods: {
    removeOffer(offerId) {
      this.$emit("removeOffer", offerId);
    },
    getCover(url) {
      return {
        'background-image': `url(${url})`
        }
    }
  },
  components: {
    OfferPreview
  }
};
</script>

<style scoped>
.offer-list-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 50px;
}

.offer-items {
  display: flex;
  flex-wrap: wrap;
}

.offer-item {
  cursor: pointer;
  width: calc((100% / 3) - 60px);
  margin: 30px;
  /* box-shadow: 0 0 1px #00000040; */
  transition: all .1s cubic-bezier(0.0,0.0,0.2,1);
  border-radius: 4px;
  overflow: hidden;
}

.offer-item:hover {
  background: #ffffff4a;

  box-shadow: 0 4px 15px 0 rgba(40,44,53,.06), 0 2px 2px 0 rgba(40,44,53,.08);

}

.offer-cover {
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  padding-bottom: 50%;
  transition: all .135s cubic-bezier(0.0,0.0,0.2,1);
  width: 100%;
  height: 0px;
  background: white;
  border-radius: 4px;
  /* border: 1px solid #eeedf2; */
}

.offer-item:hover .offer-cover {
   border-radius: 0px;
   /* border: 1px solid transparent; */
}

.offer-body {
  display: flex;
  flex-direction: column;
}

.offer-info {
  display: flex;
  flex-direction: column;
  padding: 10px;
  align-items: flex-start;
}

.offer-info-header {
  font-family: 'Montserrat-Bold', sans-serif;
  font-size: 18px;
  margin-bottom: 10px;
}

.offer-info-desc {
  text-overflow: ellipsis;
  overflow: hidden;
  line-clamp: 3;
  margin-bottom: 10px;
  font-size: 12px;
}

.offer-info-category {
  padding: 4px 10px;
  font-size: 12px;
  border-radius: 4px;
  background: lightblue;
}

</style>
