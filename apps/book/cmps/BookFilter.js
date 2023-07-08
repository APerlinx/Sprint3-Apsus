export default {
  template: `
    <section class="book-filter">
         <fieldset>
           <legend>Search by title/authors</legend>
            <input 
                v-model="filterBy.title" 
                @input="onSetFilterBy"
                type="text" 
                placeholder="Search by title"
                class="title-input">
            <input 
                v-model="filterBy.authors" 
                @input="onAuthorsInput"
                type="text" 
                placeholder="Search by authors">
          </fieldset>

          <fieldset>
           <legend>Year published</legend>
          
            <input 
                v-model="filterBy.published" 
                @input="onSetFilterBy"
                type="text" 
                placeholder="Search by year"
                pattern="[0-9]{4}"
                title="Please enter a four-digit year"
                maxlength="4"
                class="year-input">
          </fieldset>

          <fieldset>
            <legend>Budget</legend>
             <select v-model="filterBy.price" @change="onSetFilterBy">
               <option value="">All Prices</option>
               <option value="5">5</option>
               <option value="10">10</option>
               <option value="20">20</option>
               <option value="30">30</option>
               <option value="40">40</option>
               <option value="50">50</option>
             </select>
         </fieldset>

         <fieldset>
           <legend>Sales</legend>
             <input type="radio" :value="null" v-model="filterBy.isOnSale"> All
             <input type="radio" :value="true" v-model="filterBy.isOnSale"> On sale
             <br>
             <input type="radio" :value="false" v-model="filterBy.isOnSale"> Full price
         </fieldset>

         <fieldset>   
            <legend>Categories</legend>
              <select v-model="filterBy.categories">
                <option>all</option>
                <option>Computers</option>
                <option>Hack</option>
                </select>
         </fieldset>

         <fieldset>   
            <legend>Max pages</legend>
              <select v-model="filterBy.pageCount">
                 <option value="">all</option>
                <option value="500">Serious Reading</option>
                <option value="200">Descent Reading</option>
                <option value="100">Light Reading</option>
                </select>
         </fieldset>
    
         <fieldset>   
            <legend>Language</legend>
              <select v-model="filterBy.lang">
                 <option value="">all</option>
                <option value="he">hebrew</option>
                <option value="sp">spansih</option>
                <option value="en">english</option>
                </select>
         </fieldset>
    </section>

       
    `,
  data() {
    return {
      filterBy: {
        title: '',
        price: null,
        isOnSale: null,
        authors: [],
        categories: [],
        lang: [],
        published: '',
        pageCount: [],
      },
    }
  },
  methods: {
    onSetFilterBy() {
      this.$emit('filter', this.filterBy)
    },
   
    onAuthorsInput() {
      if (typeof this.filterBy.authors === 'string') {
        this.filterBy.authors = this.filterBy.authors.split(',').map((author) => author.trim());
      }
    },
  },
  watch: {
    filterBy: {
      deep: true,
      handler() {
        this.onSetFilterBy();
      },
    },
   
  },
}
