export default {
  template: `
    <section class="filter">
    <div class="search-container">
      <i class="mdi mdi-magnify search-icon">
        <input 
            type="text"
            placeholder="Search"
            class="filter-input"
            v-model="searchQuery"
            @keyup.enter="filterBySearch">
      </i>
        <div class="title">Labels</div>
    </div>
      
     <ul>
      <li v-for="label in labels" 
             :key="label" 
             class="label-item clean-list"
             @click="filterBy(label)" >
        {{ label }}
      </li>
     </ul>
    </section>
    `,
  data() {
    return {
      searchQuery: '',
      labels: [
        'Critical',
        'Family',
        'Work',
        'Friends',
        'Spam',
        'Memories',
        'Romantic',
      ],
    }
  },
  methods: {
    filterBy(label) {
        this.$router.push({ path: '/note', query: { label } });
        console.log('label', label);
    },
    filterBySearch() { 
        console.log('filterBySearch called');
        if (this.searchQuery) {
          this.$router.push({ path: '/note', query: { search: this.searchQuery } });
          console.log('searchQuery', this.searchQuery);
        }
    },
  },
}
