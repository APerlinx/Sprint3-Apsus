export default {
  props: ['info'],
  template: `
    <div class="star-rating">
      <label for="rating">{{ info.label }}</label>
      <div class="rating-stars">
        <span class="star" v-for="index in info.MaxStars" :key="index" @click="setRating(index)">
          <span :class="['star-icon', { 'selected': index <= currentRating }]">&starf;</span>
        </span>
      </div>
    </div>
  `,
  data() {
    return {
      currentRating: null,
    };
  },
  methods: {
    setRating(index) {
      this.currentRating = index;
      this.reportVal();
    },
    reportVal() {
      this.$emit('set-val', this.currentRating);
    },
  },
};
