<template>
    <section class="review-wrapper">
        <h4 style="margin-top: 8px; font-weight: 600;">Leave A Review!</h4>
        <label for="review-title">Title</label>
        <input type="text" id="review-title" class="form-control" v-model="review.title" required>
        <StarRating :increment="1" :star-size="30" text-class="pretty-text" v-model="review.score" />
        <div>
         <label for="exampleFormControlTextarea1">What Did You Think Of The Lesson?</label>
    <textarea class="form-control" id="exampleFormControlTextarea1" rows="5" v-model="review.body" required></textarea>
    <div class="btn-wrapper">
     <button class="submit-review-btn" @click="emitRating">Submit</button>
     <button class="submit-clear-btn" color="default" @click="clearFields">Clear</button>
     <div class="icon-container">
     <v-icon name="sync" spin scale="1.2" v-if="status === 'submitting'"/>
     <span class="review-success-msg" v-else-if="status === 'success'"><v-icon name="check-circle" scale="1.5" class="success" /> Review added</span>
     <v-icon name="check-circle" scale="1.5" class="failure" v-else-if="status === 'error'"/>
     </div>
    </div>
        </div>
    </section>
</template>

<script>


import StarRating from 'vue-star-rating';
import 'vue-awesome/icons/sync';
import 'vue-awesome/icons/check-circle';
import 'vue-awesome/icons/exclamation-circle';
import Icon from 'vue-awesome/components/Icon'; 

export default {

    mounted() {
        const connectedUser = this.$store.getters.connectedUser
        const {_id, name, nickName, imgUrl, email, age} = connectedUser;
        this.review.maker = {_id, name, nickName, imgUrl, email, age}
    },
    components: {
        StarRating,
        'v-icon': Icon
    },
    props: {
        status: {
            type: String
        }
    },
    data() {
        return {
            review: {
                body: '',
                score: 0,
                maker: null
            },
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
        margin-top: 20px;
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

.icon-container {
    width: 150px;
    @include flexCenter(row);
}

.fa-icon.success {
    fill: rgb(9, 211, 9);
}

.fa-icon.failure {
    fill: rgb(255, 0, 0);
}

.submit-review-btn {
    @include btnActionColorSm;
    margin-right: 10px;
}

.submit-clear-btn {
    @include btnActionGreySm;
}

</style>


