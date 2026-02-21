import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitMessage('');

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          title: formData.subject,
          message: formData.message,
          reply_to: formData.email,
        },
        PUBLIC_KEY
      );
      setIsError(false);
      setSubmitMessage("Message sent! I'll get back to you soon 🎉");
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error('EmailJS error:', err);
      console.error('Status:', err?.status, '| Text:', err?.text);
      setIsError(true);
      setSubmitMessage(`Error ${err?.status || ''}: ${err?.text || 'Something went wrong. Please email me directly at suryabodi100@gmail.com'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="contact">

      {/* Heading */}
      <div className="contact-heading">
        <h2 className="section-title">let's connect</h2>
        <div className="section-title-line" />
        <p className="contact-subheading">
          Ready to bring your ideas to life? I'm available for freelance opportunities,
          collaborative projects, and full-time positions. Let's discuss how we can create
          something exceptional together.
        </p>
      </div>

      {/* Two-column panel */}
      <div className="contact-panel">

        {/* LEFT — Get In Touch */}
        <div className="contact-info-panel">
          <div className="cip-icon-wrap">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <h3 className="cip-title">Get In Touch</h3>
          <p className="cip-sub">I'm always open to discussing new opportunities and exciting projects.</p>

          <div className="cip-info-cards">
            <div className="cip-info-item">
              <div className="cip-info-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <span className="cip-info-label">Location</span>
                <span className="cip-info-value">Vijayawada, Andhra Pradesh</span>
              </div>
            </div>

            <div className="cip-info-item">
              <div className="cip-info-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div>
                <span className="cip-info-label">Email</span>
                <a href="mailto:suryabodi100@gmail.com" className="cip-info-value cip-link">
                  suryabodi100@gmail.com
                </a>
              </div>
            </div>

            <div className="cip-info-item">
              <div className="cip-info-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </div>
              <div>
                <span className="cip-info-label">LinkedIn</span>
                <a href="https://in.linkedin.com/in/surya-rajendra-562934283" target="_blank" rel="noopener noreferrer" className="cip-info-value cip-link">
                  surya-rajendra
                </a>
              </div>
            </div>

            <div className="cip-info-item">
              <div className="cip-info-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </div>
              <div>
                <span className="cip-info-label">GitHub</span>
                <a href="https://github.com/surya1290000-tech" target="_blank" rel="noopener noreferrer" className="cip-info-value cip-link">
                  surya1290000-tech
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — Send a Message form */}
        <div className="contact-form-panel">
          <h3 className="cfp-title">Send a Message</h3>
          <p className="cfp-sub">Tell me about your project and I'll get back to you as soon as possible.</p>

          <form className="cfp-form" onSubmit={handleSubmit}>
            <div className="cfp-row">
              <div className="form-group">
                <label htmlFor="name">Full Name <span className="req">*</span></label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="Enter your full name" />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address <span className="req">*</span></label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required placeholder="your.email@company.com" />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject <span className="req">*</span></label>
              <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} required placeholder="Project inquiry, collaboration, or general message" />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message <span className="req">*</span></label>
              <textarea id="message" name="message" rows={5} value={formData.message} onChange={handleChange} required placeholder="Please describe your project requirements, timeline, and any specific questions you may have." />
            </div>

            {submitMessage && (
              <p className={isError ? 'form-error' : 'form-success'}>{submitMessage}</p>
            )}

            <button type="submit" className="cfp-submit" disabled={loading}>
              {loading ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 0.8s linear infinite' }}>
                    <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" />
                    <path d="M12 2a10 10 0 0 1 10 10" />
                  </svg>
                  Sending…
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>

      </div>
    </section>
  );
};

export default Contact;