<template>
  <section>This is inbox</section>
</template>

<script>
export default {
  async created() {
    try {
      const inbox = await this.$store.dispatch({
        type: "getInbox",
        filter: { connectedUser: this.connectedUser }
      });
      console.log("inbox is:", inbox);
    } catch (err) {
      console.log(err);
    }
  },
  computed: {
    connectedUser() {
      return this.$store.getters.connectedUser;
    }
  }
};
</script>


<style scoped lang="scss">
</style>
