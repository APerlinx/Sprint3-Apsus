export default {
  props: ['info'],
  template: `
    <div class="select-rating">
    {{info.label}}
      <input 
        v-model="currentRating" 
        @input="reportVal"
        type="number"
        min="0"
        :max="info.maxRating" />
    </div>
  `,

  data() {
    return {
      currentRating: 0,
    };
  },
  computed: {},
  methods: {
    reportVal() {
      this.$emit('set-val', this.currentRating);
    },
  },
};
