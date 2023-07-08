export default {
  props: {
     txt: {
      type: String,
      required: true,
    },
    length: {
      type: Number,
      default: 100,
    },
  },
  template: `
      <div>
        <p>{{ renderTxt }}</p>
        <button @click="toggleExpand">{{ buttonText }}</button>
      </div>
    `,
  data() {
    return {
      isExpanded: false,
    };
  },
  methods: {
    toggleExpand() {
      this.isExpanded = !this.isExpanded
    },
  },
  computed: {
    renderTxt() {
        if (this.isExpanded) {
          return this.txt
        } else if (this.txt.length > this.length) {
          return this.txt.slice(0, this.length) + '...'
        } else {
          return this.txt
        }
      },
    buttonText() {
      return this.isExpanded ? 'Show Less' : 'Show More'
    },
  },
};
