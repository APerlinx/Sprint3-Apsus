export default {
  props: ['info'],
  template: `
    <div class="select-rating">
      <label>
        {{ info.label }}
        <select v-model="currentRating" @change="reportVal">
          <option v-for="opt in info.opts" :value="opt" :key="opt">{{ opt }}</option>
        </select>
      </label>
    </div>
  `,

  data() {
    return {
      currentRating: null,
    };
  },
  methods: {
    reportVal() {
      this.$emit('set-val', this.currentRating);
    },
  },
};
