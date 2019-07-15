<template>
  <li>
    {{ requirement }}
      X
    <!-- <button @click="$emit('remove', require.id)"> -->
    <!-- </button> -->
  </li>
</template>

<script>
export default {
  props: {
    requirement: {
      type: String,
      required: true
    }
  }
}
</script>