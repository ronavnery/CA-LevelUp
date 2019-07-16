<template>
  <div>
    <input
      type="text"
      v-model="newRequirementText"
      placeholder="New Requirement"
      @keydown.enter.prevent="addRequirement"
    />
    <ul v-if="requirements.length">
      <li v-for="(requirement,idx) in requirements" :key="idx">
        {{requirement}}
        <button @click="removeRequirement(idx)">X</button>
      </li>
    </ul>
    <p v-else>Nothing left in the list. Add a new Requirement in the input above.</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newRequirementText: "",
      requirements: []
    };
  },
  watch: {
    requirements(old, newVal) {
      console.log('i was updated')
    }
  },

  methods: {
    addRequirement() {
      const trimmedText = this.newRequirementText.trim();
      if (trimmedText) {
        this.requirements.push(trimmedText);
        this.newRequirementText = "";
      this.$emit("requirements-updated", this.requirements);
      this.$emit("whatIncluded-updated", this.requirements);
      }
    },
    removeRequirement(idx) {
      this.requirements.splice(idx, 1);
      this.$emit("requirements-updated", this.requirements);
      this.$emit("whatIncluded-updated", this.requirements);
    }
  }
};
</script>