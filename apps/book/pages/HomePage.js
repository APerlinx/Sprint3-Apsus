import LongTxt from '../cmps/LongTxt.js'

export default {
    template: `
        <section class="about-page">
            <h2>Home</h2>
                <LongTxt :txt="fullText" :length="100" />
        </section>
    `,
      data() {
        return {
          fullText: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut accusantium placeat natus blanditiis dolorem quod ratione voluptatibus nam quae nemo, excepturi reprehenderit similique magnam! Sunt pariatur fugit eaque ex natus iste dolorem voluptate explicabo sed eum voluptatibus unde dolorum modi nihil accusamus at, maiores rerum nulla. Quisquam est adipisci earum.',
        };
      },
      components: {
        LongTxt,
      },
}