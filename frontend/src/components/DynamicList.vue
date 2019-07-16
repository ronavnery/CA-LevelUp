<template>
  <div>
    <input
      type="text"
      v-model="newText"
      placeholder="New Text List"
      @keydown.enter.prevent="addText"/>
    <ul v-if="list.length">
      <li v-for="(text,idx) in list" :key="idx">
        {{text}}
        <button @click.prevent="removeText(idx)">X</button>
      </li>
    </ul>
    <p v-else>Nothing left in the list. Add a new text in the input above.</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newText: "",
      list: []
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
  }
};
</script>