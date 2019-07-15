<template>
	<div>
		<BaseInputText 
			v-model="newRequireText"
			placeholder="New Require"
			@keydown.enter="addRequire"
		/>
		<ul v-if="requires.length">
			<RequireListItem
				v-for="require in requires"
				:key="require.id"
				:requirement="require"
				@remove="removeRequire"
			/>
		</ul>
		<p v-else>
			Nothing left in the list. Add a new Require in the input above.
		</p>
	</div>
</template>

<script>
import BaseInputText from './BaseInputText.vue'
import RequireListItem from './RequirementListItem.vue'

let nextRequireId = 1

export default {
	components: {
		BaseInputText, RequireListItem
	},
  data () {
    return {
			newRequireText: '',
      requires: []
    }
  },
	methods: {
		addRequire () {
      const trimmedText = this.newRequireText.trim()
			if (trimmedText) {
        this.requires.push(trimmedText)
				this.newRequireText = ''
			}
      this.$emit('new-requirements', this.requires)
		},
		removeRequire (idToRemove) {
			this.requires = this.requires.filter(require => {
				return require.id !== idToRemove
			})
		}
	}
}
</script>