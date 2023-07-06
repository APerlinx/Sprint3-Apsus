export default {
    props: ['subject'],
    // emits: [''],
    template: `
     <h2>{{formatText}}</h2>
      `,
    data() {
      return {
       
      }
    },
    created() { },
    methods: {
      
    },
    computed: {
      formatText() {
        if(this.subject.length > 12){

          return this.subject.slice(0, 12) + '...'
        }
        return this.subject
       
      },
      
    },
  }
  

  