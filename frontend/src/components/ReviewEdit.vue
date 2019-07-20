<template>
    <section class="review-wrapper">
        <h4 style="margin-top: 8px;">Leave A Review!</h4>
        <label for="review-title">Title</label>
        <input type="text" id="review-title" class="form-control" v-model="review.title" required>
        <StarRating :increment="0.1" :star-size="30" text-class="pretty-text" v-model="review.score" />
        <div>
         <label for="exampleFormControlTextarea1">What Did You Think Of The Lesson?</label>
    <textarea class="form-control" id="exampleFormControlTextarea1" rows="5" v-model="review.body" required></textarea>
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
        this.review.maker = {_id, name, nickName, imgUrl, email, age}
    },
    components: {
        StarRating,
        mdbInput,
        mdbBtn
    },
    data() {
        return {
            review: {
                body: '',
                score: 0,
                maker: null
            }
        }
    },
    methods: {
        clearFields() {
            this.review.body = '';
            this.review.title = '';
            this.review.score = 0;
        },
        emitRating() {
            this.$emit('add-review', this.review)
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
    input {
        margin: 5px 0;
    }
    label {
        margin: 5px 0;
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


