import { ratingService } from '../services/user-rating.service.js';
import RateBySelect from '../cmps/RateBySelect.js';
import RateByStar from '../cmps/RateByStar.js';
import RateByTextbox from '../cmps/RateByTextbox.js';

export default {
    template: `
      <div class="form-container" v-if="answers.length">
        <h2>Add a Review</h2>
  
        <form @submit.prevent="onSubmitReview">
          <div v-for="(cmp, idx) in rating.cmps" :key="idx">
            <label>
              <input type="radio" v-model="selectedComponent" :value="idx">
              <span>{{ cmp.info.label }}</span>
            </label>
          </div>
          <div v-if="selectedComponent !== null">
            <component
              :is="rating.cmps[selectedComponent].type"
              :value="answers[selectedComponent]"
              :info="rating.cmps[selectedComponent].info"
              @set-val="setAns"
            />
          </div>
          
          <div class="form-row">
            <label for="fullname">Full Name:</label>
            <input type="text" id="fullname" v-model="review.fullname" required class="form-input">
          </div>
  
          <div class="form-row">
            <label for="readAt">Read At:</label>
            <input type="date" id="readAt" v-model="review.readAt" required class="form-input">
          </div>
  
          <button type="submit" class="form-btn">Submit</button>
        </form>
      </div>
      <div v-else>Loading...</div> 
    `,
    data() {
      return {
        review: {
          fullname: '',
          readAt: '',
          rating: null,
        },
        rating: {},
        answers: [],
        selectedComponent: null,
      };
    },
    created() {
      ratingService.getRating().then((rating) => {
        this.rating = rating;
        this.answers = new Array(this.rating.cmps.length).fill(null);
      });
    },
    methods: {
      setAns(value, idx) {
        this.answers.splice(idx, 1, value);
      },
      onSubmitReview() {
        this.review.rating = this.answers[this.selectedComponent]; // Assign the selected rating
        this.$emit('add-review', this.review);
        this.review = {
          fullname: '',
          rating: null,
          readAt: '',
        };
        this.selectedComponent = null;
        this.answers = new Array(this.rating.cmps.length).fill(null);
      },
    },
    components: {
      RateBySelect,
      RateByStar,
      RateByTextbox,
    },
  };
  
  
