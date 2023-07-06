export default {
    emits: ['labels'],
    props: ['note'],
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
          noteLabels: this.note.labels,
        }
      },
      methods: {
        updateSelectedLabels(note) {
            this.$eventBus.emit('selected-labels-updated', { selectedLabels: this.selectedLabels, note });
        },
        closeModal() {
            this.$emit('close-modal')
          },
      }
}