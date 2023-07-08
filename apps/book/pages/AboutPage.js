export default {
    template: `
        <section class="about-page">
            <h2>About Our App</h2>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut accusantium placeat natus blanditiis dolorem quod ratione voluptatibus nam quae nemo, excepturi reprehenderit similique magnam! Sunt pariatur fugit eaque ex natus iste dolorem voluptate explicabo sed eum voluptatibus unde dolorum modi nihil accusamus at, maiores rerum nulla. Quisquam est adipisci earum.</p>
            <nav>
                <RouterLink to="/about/team">Team</RouterLink> |
                <RouterLink to="/about/goals">Goals</RouterLink> |
            </nav>
            <RouterView />

        </section>
    `,
}