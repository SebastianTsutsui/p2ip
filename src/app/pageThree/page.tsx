import HomeButton from "../../utils/HomeButton";

export default function AboutUs() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#D2B48C] to-[#483C32] text-white">
      <HomeButton />
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          About <span className="text-[#6A4325]">Us</span>
        </h1>
        <div className="max-w-4xl space-y-8 text-lg">
          <section>
            <h2 className="text-3xl font-bold">Our Story</h2>
            <p>
              This WebApp is the brainchild of a dedicated student who is
              passionate about technology and cinema. Created as part of a
              project, this platform aims to bring movie enthusiasts together
              and provide a space for sharing and rating films.
            </p>
          </section>
          <section>
            <h2 className="text-3xl font-bold">Mission</h2>
            <p>
              Our mission is to create a seamless and enjoyable experience for
              users to rate and review movies. We believe that every movie
              deserves a voice, and every review contributes to a richer film
              community.
            </p>
          </section>
          <section>
            <h2 className="text-3xl font-bold">Meet the Team</h2>
            <p>
              <strong>Jane Doe</strong> - Founder & Developer
            </p>
            <p>
              Jane is a computer science student with a passion for web
              development and film. She loves combining her technical skills
              with her love for storytelling to create innovative projects.
            </p>
            <p>
              <strong>John Smith</strong> - UX/UI Designer
            </p>
            <p>
              John is an art enthusiast who believes in the power of beautiful
              design. He ensures that every user interaction is smooth and
              aesthetically pleasing.
            </p>
            <p>
              <strong>Emily White</strong> - Content Strategist
            </p>
            <p>
              Emily is a communication major who loves curating content that
              engages and informs. She works on developing strategies to keep
              our community active and thriving.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}