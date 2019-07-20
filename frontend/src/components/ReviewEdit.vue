<template>
    <section class="review-wrapper">
        <StarRating :increment="0.1" :star-size="30" text-class="pretty-text" v-model="rating.score"/>
        <div>
         <label for="exampleFormControlTextarea1">What Did You Think Of The Lesson?</label>
    <textarea class="form-control" id="exampleFormControlTextarea1" rows="5" v-model="rating.body"></textarea>
    <div class="btn-wrapper">
     <mdb-btn color="deep-purple" @click="emitRating">Submit</mdb-btn>
     <mdb-btn color="default" @click="clearFields">Clear</mdb-btn>
    </div>
        </div>
    </section>
</template>

<script>
import StarRating from 'vue-star-rating';
import { mdbInput, mdbBtn } from 'mdbvue';

export default {

    mounted() {
        const connectedUser = this.$store.getters.connectedUser
        const {_id, name, nickName, imgUrl, email, age} = connectedUser;
        this.rating.maker = {_id, name, nickName, imgUrl, email, age}
    },
    components: {
        StarRating,
        mdbInput,
        mdbBtn
    },
    data() {
        return {
            rating: {
                body: '',
                score: 0,
                maker: null
            }
        }
    },
    methods: {
        clearFields() {
            this.rating.body = '';
            this.rating.score = 0;
        },
        emitRating() {
            
        }
    }
}
</script>

<style lang="scss">

.review-wrapper {
    max-width: 300px;
    .btn-wrapper {
        display: flex;
        justify-content: center;
    }
}

.pretty-text {
    color: red;
}

textarea {
    // max-width: 300px;
    resize: none;
}



</style>


