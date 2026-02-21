import React, { useRef } from 'react';

const LEETCODE_STATS = {
    username: 'surya_rajendra',
    solved: 142,
    easy: 74,
    medium: 58,
    hard: 10,
    ranking: '~350,000',
    streak: 21,
};

const LeetCodeStats = () => {
    const ref = useRef(null);

    const total = 3400; // approx total problems
    const pct = Math.round((LEETCODE_STATS.solved / total) * 100);

    return (
        <section id="leetcode" className="leetcode-stats" ref={ref}>
            <div className="reveal">
                <h2 className="section-title">LeetCode Progress</h2>
                <div className="section-title-line" />
            </div>

            <div className="leetcode-wrapper reveal">
                {/* Donut visual */}
                <div className="leet-donut-wrapper">
                    <svg viewBox="0 0 120 120" className="leet-donut">
                        <circle cx="60" cy="60" r="50" fill="none" stroke="var(--border-color)" strokeWidth="12" />
                        <circle
                            cx="60" cy="60" r="50"
                            fill="none"
                            stroke="url(#leetGrad)"
                            strokeWidth="12"
                            strokeLinecap="round"
                            strokeDasharray={`${2 * Math.PI * 50}`}
                            strokeDashoffset={`${2 * Math.PI * 50 * (1 - pct / 100)}`}
                            transform="rotate(-90 60 60)"
                            style={{ transition: 'stroke-dashoffset 1.4s ease' }}
                        />
                        <defs>
                            <linearGradient id="leetGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#6c63ff" />
                                <stop offset="100%" stopColor="#a855f7" />
                            </linearGradient>
                        </defs>
                        <text x="60" y="55" textAnchor="middle" fill="var(--text-primary)" fontSize="18" fontWeight="700" fontFamily="Space Grotesk, sans-serif">
                            {LEETCODE_STATS.solved}
                        </text>
                        <text x="60" y="72" textAnchor="middle" fill="var(--text-muted)" fontSize="9">
                            Solved
                        </text>
                    </svg>
                </div>

                {/* Stats grid */}
                <div className="leet-stats-grid">
                    {[
                        { label: 'Easy', value: LEETCODE_STATS.easy, color: '#22c55e' },
                        { label: 'Medium', value: LEETCODE_STATS.medium, color: '#f59e0b' },
                        { label: 'Hard', value: LEETCODE_STATS.hard, color: '#ef4444' },
                        { label: 'Ranking', value: LEETCODE_STATS.ranking, color: 'var(--accent)' },
                        { label: 'Day Streak', value: `${LEETCODE_STATS.streak} 🔥`, color: '#f97316' },
                    ].map(s => (
                        <div key={s.label} className="leet-stat-item">
                            <span className="leet-stat-value" style={{ color: s.color }}>{s.value}</span>
                            <span className="leet-stat-label">{s.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            <a
                href={`https://leetcode.com/${LEETCODE_STATS.username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="leet-link-btn reveal"
            >
                View LeetCode Profile →
            </a>
        </section>
    );
};

export default LeetCodeStats;
