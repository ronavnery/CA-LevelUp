<template>
  <div v-if="list">
    <input
      class="form-control"
      type="text"
      v-model="newText"
      placeholder="Add something..."
      @keydown.enter.prevent="addText"
    />
    <mdb-list-group class="list-container" horizontal v-if="list.length">
      <mdb-list-group-item class="list-item" v-for="(text,idx) in list" :key="idx" :action="true">
        {{text}} <i class="fs12 far fa-trash-alt" @click.prevent="removeText(idx)"></i>
      </mdb-list-group-item>
      
    </mdb-list-group>
    <!-- <p v-else>Nothing left in the list. Add a new text in the input above.</p> -->
  </div>
</template>

<script>
import { mdbListGroup, mdbListGroupItem } from "mdbvue";
export default {
  props: {
    list: {
      type: Array
    }
  },
  data() {
    return {
      newText: ""
    };
  },

  methods: {
    addText() {
      const trimmedText = this.newText.trim();
      if (trimmedText) {
        this.list.push(trimmedText);
        this.newText = "";
        this.$emit("requirements-updated", this.list);
        this.$emit("whatIncluded-updated", this.list);
      }
    },
    removeText(idx) {
      this.list.splice(idx, 1);
      this.$emit("requirements-updated", this.list);
      this.$emit("whatIncluded-updated", this.list);
    }
  },
  components: {
    mdbListGroup,
    mdbListGroupItem
  }
};
</script>

<style scoped lang="scss">

.list-item {
  margin-top: 5px;
  height: 20px;
  background: $tpPink2;
  opacity: 0.9  ;
}

.list-container {
  display: flex;
  max-width: 360px;
  // flex-wrap: wrap
}

</style>
