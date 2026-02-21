import React from 'react';

const ResumeModal = ({ onClose }) => {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-box" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>Resume — Surya Rajendra</h3>
                    <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
                </div>
                <div className="modal-body">
                    {/* Replace /resume.pdf with your actual resume file */}
                    <iframe
                        src="/resume.pdf"
                        title="Resume"
                        className="resume-iframe"
                    />
                    <p className="resume-fallback">
                        If the preview doesn't load,{' '}
                        <a href="/resume.pdf" download className="resume-download-link">
                            click here to download
                        </a>.
                    </p>
                </div>
                <div className="modal-footer">
                    <a href="/resume.pdf" download className="hero-btn" style={{ display: 'inline-block', padding: '0.75rem 2rem' }}>
                        ⬇ Download PDF
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ResumeModal;
