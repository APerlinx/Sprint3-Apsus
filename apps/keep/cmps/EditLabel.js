export default {
  props: {
    labels: {
      type: Array,
      default: () => [],
    },
  },
  template: `
  <div class="label-modal-backdrop">
    <div class="label-modal">
        <div class="label-modal-content">
          <h2>{{ modalTitle }}</h2>
          <div class="input-wrapper">
            <input ref="labelInput" type="text" v-model="labelName" placeholder="Create Label">
            <i class="mdi mdi-check input-icon" @click="createLabel"></i>
          </div>
        <div class="label-section">
          
          <div v-for="(label, index) in labels"
            :key="index" class="label-item" 
            @mouseover="hoverLabel = index" 
            @mouseleave="hoverLabel = null">

            <i class="mdi" 
             :class="{'mdi-label': hoverLabel !== index, 'mdi-trash-can': hoverLabel === index}"
              @click="deleteLabel(index)"></i>
            <span class="label">{{ label }}</span>
          </div>

        </div>
      </div>
        <button class="clean-btn done-btn" @click="closeModal">Done</button>
    </div>
  </div>

  `,
  data() {
    return {
      modalTitle: 'Edit labels',
      labelName: '',
      hoverLabel: null,
    };
  },
  methods: {
    createLabel() {
      if (!this.labelName) return
      const newLabel = this.labelName
      this.labels.push(newLabel)
      this.labelName = ''
      const index = this.labels.length - 1
      this.labels.splice(index, 0, newLabel)
      this.$emit('new-label-created', newLabel)
    },
    deleteLabel(index) {
      const deletedLabel = this.labels[index]
      this.labels.splice(index, 1)
      this.$emit('delete-label', deletedLabel)
    },
    closeModal() {
      this.$emit('close-add-label')
    },
  },
  mounted() {
    this.$nextTick(function () {
      this.$refs.labelInput.focus()
    });
  },
};
