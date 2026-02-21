import React, { useEffect, useRef } from 'react';

const About = () => {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e =>
        e.target.querySelectorAll('.reveal').forEach(el => el.classList.toggle('visible', e.isIntersecting))
      ),
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="about" ref={ref}>
      <div className="about-inner">

        {/* LEFT — Bio Text */}
        <div className="about-left reveal">
          <h2 className="about-big-title">About me</h2>

          <div className="about-bio">
            <p>
              <strong>Hi, I'm Surya.</strong>
            </p>
            <p>
              I am a 19-year-old Computer Science Engineering student at KLU with a deep passion
              for crafting seamless, data-driven digital experiences. I believe that great software
              lives at the intersection of beautiful design and robust logic.
            </p>

            <p className="about-what-title">What I Do:</p>

            <p>
              <strong>Web & App Development:</strong> I build responsive, scalable, and user-centric
              applications from the ground up.
            </p>
            <p>
              <strong>UI/UX Design:</strong> I don't just write code; I design intuitive interfaces
              that prioritize the user's journey. (My eye for photography definitely influences my
              approach to visual hierarchy and aesthetics!)
            </p>
            <p>
              <strong>Data & DSA:</strong> I am a data enthusiast with a strong foundation in Data
              Structures and Algorithms. This means the solutions I build aren't just
              functional — they are optimized, efficient, and built to scale.
            </p>

            <p className="about-what-title">How I Fit Into Your Team:</p>
            <p>
              Companies often have to choose between developers who can build complex systems and
              designers who understand user needs. My goal is to bridge that gap. Whether it's
              optimizing a backend algorithm, designing a wireframe, or deploying a full-stack
              application, I bring an entrepreneurial mindset to the table. I thrive in environments
              where I can wear multiple hats, take ownership of a product's lifecycle, and translate
              complex data into actionable, user-friendly solutions.
            </p>
          </div>
        </div>

        {/* RIGHT — Photo + Contact */}
        <div className="about-right reveal">
          <div className="about-photo-wrap">
            <img src="/about-photo.jpg" alt="Surya Rajendra" className="about-photo" />
          </div>

          <div className="about-contact-row">
            <div className="about-contact-item">
              <span className="about-contact-label">Email</span>
              <a href="mailto:suryabodi100@gmail.com" className="about-contact-value">
                suryabodi100@gmail.com
              </a>
            </div>
            <div className="about-contact-item">
              <span className="about-contact-label">Phone</span>
              <a href="tel:+919110310219" className="about-contact-value">
                +91 9110310219
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;