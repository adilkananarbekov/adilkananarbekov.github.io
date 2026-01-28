export default function About() {
    return (
        <section id="about" data-reveal data-parallax>
            <div className="parallax-layer" aria-hidden="true" />
            <div className="container">
                <div className="section-header">
                    <h2>About</h2>
                    <p>
                        Third-year college student in Kyrgyzstan specializing in Flutter mobile
                        development with a strong programming foundation, hackathon experience, and
                        collaborative team delivery.
                    </p>
                </div>
                <div className="grid-2">
                    <div className="card">
                        <h3>Profile</h3>
                        <p>
                            I build mobile and embedded systems that move from prototype to working
                            product. My focus is clean architecture, reliable communication, and tight
                            user experiences.
                        </p>
                        <ul className="about-list">
                            <li>Strong base in programming and problem solving.</li>
                            <li>Mobile-first mindset with embedded integration.</li>
                            <li>Team collaboration and clear handoffs.</li>
                        </ul>
                    </div>
                    <div className="card">
                        <h3>Education</h3>
                        <p>
                            College, year three (in progress). Completed a 6-month Flutter intensive at
                            App IT Company.
                        </p>
                        <ul className="about-list">
                            <li>Participated in two hackathons.</li>
                            <li>Two years of C++ with competitive programming focus.</li>
                            <li>Hands-on experience in team-based development.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
