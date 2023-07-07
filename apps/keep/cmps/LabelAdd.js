export default {
    emits: ['labels'],
    template: `
 <div class="label-add-modal" @click="closeModal">
  <button class="label-btn clean-btn">x</button>
  <h3>Choose Labels</h3>
  <ul @click.stop>
    <li v-for="label in labels" :key="label" class="clean-list label">
      <label>
        <input type="checkbox" :value="label" v-model="selectedLabels" @change="updateSelectedLabels(note)" @click.stop />
        {{ label }}
      </label>
    </li>
  </ul>
  <div class="modal-actions">
  
  </div>
</div>

    `,
      data() {
        return {
          selectedLabels: [],
          labels: ['Critical', 'Family', 'Work', 'Friends', 'Spam', 'Memories', 'Romantic'],
        }
      },
      methods: {
        updateSelectedLabels() {
          this.$emit('selected-labels', this.selectedLabels);
        },
        closeModal() {
            this.$emit('close-modal')
          },
      }
}