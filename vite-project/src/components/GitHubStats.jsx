import React, { useEffect, useState, useRef } from 'react';

const GITHUB_USERNAME = 'surya1290000-tech';

const LANG_COLORS = {
    JavaScript: '#f7df1e',
    Python: '#3572A5',
    HTML: '#e34c26',
    CSS: '#563d7c',
    TypeScript: '#2b7489',
    Java: '#b07219',
    'C++': '#f34b7d',
    Shell: '#89e051',
    default: '#8b8b8b',
};

const GitHubStats = () => {
    const [stats, setStats] = useState(null);
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);
    const ref = useRef(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [userRes, reposRes] = await Promise.all([
                    fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
                    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`),
                ]);
                const user = await userRes.json();
                const reposData = await reposRes.json();
                setStats(user);
                setRepos(Array.isArray(reposData) ? reposData : []);
            } catch {
                setStats(null);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

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

    const totalStars = repos.reduce((acc, r) => acc + (r.stargazers_count || 0), 0);
    const topLangs = [...new Set(repos.map(r => r.language).filter(Boolean))].slice(0, 6);
    const topRepos = [...repos]
        .sort((a, b) => (b.stargazers_count + b.forks_count) - (a.stargazers_count + a.forks_count))
        .slice(0, 3);

    const counters = [
        { label: 'Repositories', value: stats?.public_repos ?? 0, icon: '📁' },
        { label: 'Followers', value: stats?.followers ?? 0, icon: '👥' },
        { label: 'Following', value: stats?.following ?? 0, icon: '➕' },
        { label: 'Total Stars', value: totalStars, icon: '⭐' },
    ];

    return (
        <section id="github-stats" className="github-stats" ref={ref}>
            <div className="reveal">
                <h2 className="section-title">github activity</h2>
                <div className="section-title-line" />
            </div>

            {loading ? (
                <div className="gh-loading reveal">
                    <div className="gh-spinner" />
                    <p>Fetching GitHub data…</p>
                </div>
            ) : stats && stats.login ? (
                <div className="gh-wrapper reveal">

                    {/* Top row: Profile card + Counters */}
                    <div className="gh-top-row">
                        {/* Profile card */}
                        <div className="gh-profile-card">
                            <img src={stats.avatar_url} alt="GitHub Avatar" className="gh-avatar" />
                            <div className="gh-profile-info">
                                <h3 className="gh-name">{stats.name || GITHUB_USERNAME}</h3>
                                <p className="gh-username">@{stats.login}</p>
                                <p className="gh-bio">{stats.bio || 'Full Stack Developer & CS Student'}</p>
                                <a
                                    href={`https://github.com/${GITHUB_USERNAME}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="gh-profile-btn"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                    View Profile
                                </a>
                            </div>
                        </div>

                        {/* Stat counters */}
                        <div className="gh-counters">
                            {counters.map(s => (
                                <div key={s.label} className="gh-counter-card">
                                    <span className="gh-counter-icon">{s.icon}</span>
                                    <span className="gh-counter-value">{s.value}</span>
                                    <span className="gh-counter-label">{s.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Languages */}
                    {topLangs.length > 0 && (
                        <div className="gh-langs reveal">
                            <h4 className="gh-subheading">Top Languages</h4>
                            <div className="gh-lang-pills">
                                {topLangs.map(lang => (
                                    <span key={lang} className="gh-lang-pill"
                                        style={{ borderColor: LANG_COLORS[lang] || LANG_COLORS.default }}>
                                        <span className="gh-lang-dot"
                                            style={{ background: LANG_COLORS[lang] || LANG_COLORS.default }} />
                                        {lang}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Top Repos */}
                    {topRepos.length > 0 && (
                        <div className="gh-repos reveal">
                            <h4 className="gh-subheading">Top Repositories</h4>
                            <div className="gh-repo-grid">
                                {topRepos.map(repo => (
                                    <a
                                        key={repo.id}
                                        href={repo.html_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="gh-repo-card"
                                    >
                                        <div className="gh-repo-top">
                                            <span className="gh-repo-name">{repo.name}</span>
                                            {repo.language && (
                                                <span className="gh-repo-lang"
                                                    style={{ color: LANG_COLORS[repo.language] || LANG_COLORS.default }}>
                                                    {repo.language}
                                                </span>
                                            )}
                                        </div>
                                        <p className="gh-repo-desc">{repo.description || 'No description provided.'}</p>
                                        <div className="gh-repo-meta">
                                            <span>⭐ {repo.stargazers_count}</span>
                                            <span>🍴 {repo.forks_count}</span>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Contribution Chart */}
                    <div className="gh-contrib reveal">
                        <h4 className="gh-subheading">Contribution Graph</h4>
                        <div className="gh-contrib-wrap">
                            <img
                                src={`https://ghchart.rshah.org/818cf8/${GITHUB_USERNAME}`}
                                alt="GitHub Contribution Chart"
                                className="gh-contrib-img"
                                onError={e => e.target.style.display = 'none'}
                            />
                        </div>
                    </div>

                </div>
            ) : (
                <p className="gh-error reveal">Could not load GitHub stats. Check your internet connection.</p>
            )}
        </section>
    );
};

export default GitHubStats;
