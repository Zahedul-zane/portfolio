import React from 'react';

export default function Dashboards() {
  return (
    <section id="dashboards" className="section" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <span className="section-label">COMPETITIVE PROGRAMMING</span>
        <h2 className="section-title">Coding Dashboards</h2>
        <p className="section-subtitle">
          Real-time problem-solving activity and contest ratings across competitive programming platforms.
        </p>

        <div className="dashboards-grid">
          
          {/* CODEFORCES */}
          <div className="dashboard-card">
            <div className="dashboard-head">
              <h3>
                <i className="fa-solid fa-chart-simple" style={{ color: '#ef4444' }}></i>
                Codeforces
              </h3>
              <span className="tag-chip" style={{ background: 'var(--mint-light)', color: 'var(--mint-text-dark)' }}>
                Contest Active
              </span>
            </div>

            <div className="dash-user-row">
              <img src="DP.jpg" alt="ZaHeDuL" className="dash-avatar" />
              <div>
                <a
                  href="https://codeforces.com/profile/ZaHeDuL"
                  target="_blank"
                  rel="noreferrer"
                  style={{ textDecoration: 'none', color: 'var(--text-main)', fontWeight: '700', fontSize: '1.1rem' }}
                >
                  ZaHeDuL
                </a>
                <div style={{ color: 'var(--text-subtle)', fontSize: '0.85rem' }}>Rank: Newbie</div>
              </div>
            </div>

            <div className="dash-stats-list">
              <div className="dash-stat-row">
                <span>Contest Rating:</span>
                <strong>978 <span style={{ color: 'var(--text-subtle)', fontSize: '0.8rem' }}>(Max 978)</span></strong>
              </div>
              <div className="dash-stat-row">
                <span>Problems Solved:</span>
                <strong style={{ color: 'var(--mint-text-dark)' }}>95</strong>
              </div>
              <div className="dash-stat-row">
                <span>Friends:</span>
                <strong>3 users</strong>
              </div>
            </div>
          </div>

          {/* LEETCODE */}
          <div className="dashboard-card">
            <div className="dashboard-head">
              <h3>
                <i className="fa-solid fa-code" style={{ color: '#f59e0b' }}></i>
                LeetCode
              </h3>
              <span className="tag-chip" style={{ background: 'var(--mint-light)', color: 'var(--mint-text-dark)' }}>
                DSA Solved
              </span>
            </div>

            <div className="dash-user-row">
              <img src="DP.jpg" alt="ZaHeDuL" className="dash-avatar" />
              <div>
                <a
                  href="https://leetcode.com/u/vsJ2gRZWWX/"
                  target="_blank"
                  rel="noreferrer"
                  style={{ textDecoration: 'none', color: 'var(--text-main)', fontWeight: '700', fontSize: '1.1rem' }}
                >
                  ZaHeDuL
                </a>
                <div style={{ color: 'var(--text-subtle)', fontSize: '0.85rem' }}>Global Rank ~5,000,000</div>
              </div>
            </div>

            <div className="dash-stats-list">
              <div className="dash-stat-row">
                <span>Problems Solved:</span>
                <strong style={{ color: 'var(--mint-text-dark)' }}>20</strong>
              </div>
              <div className="dash-stat-row">
                <span>Easy Solved:</span>
                <strong style={{ color: '#10b981' }}>17</strong>
              </div>
              <div className="dash-stat-row">
                <span>Medium Solved:</span>
                <strong style={{ color: '#f59e0b' }}>3</strong>
              </div>
            </div>
          </div>

          {/* ATCODER */}
          <div className="dashboard-card">
            <div className="dashboard-head">
              <h3>
                <i className="fa-solid fa-cubes" style={{ color: '#6366f1' }}></i>
                AtCoder
              </h3>
              <span className="tag-chip" style={{ background: 'var(--mint-light)', color: 'var(--mint-text-dark)' }}>
                Rating Active
              </span>
            </div>

            <div className="dash-user-row">
              <img src="DP.jpg" alt="ZaHeDuL" className="dash-avatar" />
              <div>
                <a
                  href="https://atcoder.jp/users/ZaHeDuL"
                  target="_blank"
                  rel="noreferrer"
                  style={{ textDecoration: 'none', color: 'var(--text-main)', fontWeight: '700', fontSize: '1.1rem' }}
                >
                  ZaHeDuL
                </a>
                <div style={{ color: 'var(--text-subtle)', fontSize: '0.85rem' }}>14 Kyu</div>
              </div>
            </div>

            <div className="dash-stats-list">
              <div className="dash-stat-row">
                <span>Current Rating:</span>
                <strong>32</strong>
              </div>
              <div className="dash-stat-row">
                <span>Global Rank:</span>
                <strong>Top 65.32%</strong>
              </div>
              <div className="dash-stat-row">
                <span>Rated Matches:</span>
                <strong style={{ color: 'var(--mint-text-dark)' }}>8</strong>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
