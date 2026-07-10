"use client";

import { useEffect, useState } from "react";

type Stats = {
  all: { total: number; solved: number };
  easy: { total: number; solved: number };
  medium: { total: number; solved: number };
  hard: { total: number; solved: number };
};

export function LeetcodeStats() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/leetcode");
        const data = await res.json();
        if (data.all) {
          setStats(data);
          // Thoda delay taaki mount hone par animation smooth lage
          setTimeout(() => setAnimate(true), 150);
        }
      } catch (err) {
        console.error("Failed to fetch LeetCode stats:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  // Arc path generate karne ka function
  function describeArc(cx: number, cy: number, r: number, pct: number, startAngle = -210, sweepAngle = 240) {
    const clamp = Math.min(Math.max(pct, 0), 0.9999);
    const start = (startAngle * Math.PI) / 180;
    const end = start + (sweepAngle * clamp * Math.PI) / 180;
    const x1 = cx + r * Math.cos(start);
    const y1 = cy + r * Math.sin(start);
    const x2 = cx + r * Math.cos(end);
    const y2 = cy + r * Math.sin(end);
    const largeArc = sweepAngle * clamp > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`;
  }

  function trackArc(cx: number, cy: number, r: number, startAngle = -210, sweepAngle = 240) {
    return describeArc(cx, cy, r, 1, startAngle, sweepAngle);
  }

  // Smooth CSS animation ke liye SVG dash math
  const getArcAnimationProps = (r: number, total: number, solved: number) => {
    const pct = total > 0 ? solved / total : 0;
    const animatedPct = animate ? pct : 0;
    const sweepAngle = 240;
    const pathLength = 2 * Math.PI * r * (sweepAngle / 360);
    const strokeDashoffset = pathLength - pathLength * animatedPct;

    return {
      strokeDasharray: pathLength,
      strokeDashoffset,
    };
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", maxWidth: "600px", height: "300px", backgroundColor: "var(--bg-color)", borderRadius: "1rem", border: "1px solid var(--border-color)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.875rem", color: "var(--subtle-text-color)" }}>
          loading leetcode stats...
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", maxWidth: "600px", height: "300px", backgroundColor: "var(--bg-color)", borderRadius: "1rem", border: "1px solid var(--border-color)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.875rem", color: "#ef4444" }}>
          failed to load stats_
        </div>
      </div>
    );
  }

  const { easy, medium, hard, all } = stats;
  const totalSolved = all.solved;
  const totalProblems = all.total;
  const overallPct = totalProblems > 0 ? totalSolved / totalProblems : 0;

  const cx = 110;
  const cy = 110;

  return (
    <>
      <style>{`
        .lc-container {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          gap: 2rem;
          padding: 1.5rem;
          background-color: var(--bg-color, #fff);
          border-radius: 1rem;
          border: 1px solid var(--border-color, #e5e7eb);
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          max-width: 680px;
          width: 100%;
          margin-bottom: 44px;
          flex-wrap: wrap;
        }
        @media (min-width: 768px) {
          .lc-container {
            flex-wrap: nowrap;
            gap: 3.5rem;
          }
        }
        .lc-svg-container {
          position: relative;
          flex-shrink: 0;
          display: flex;
          justify-content: center;
          width: 100%;
        }
        @media (min-width: 768px) {
          .lc-svg-container {
            width: auto;
          }
        }
        .lc-text-primary {
          fill: var(--heading-color, #1a202c);
          color: var(--heading-color, #1a202c);
        }
        .lc-text-secondary {
          fill: var(--subtle-text-color, #4a5568);
          color: var(--subtle-text-color, #4a5568);
        }
        .lc-track-easy { stroke: #d1fae5; }
        .lc-track-medium { stroke: #fef3c7; }
        .lc-track-hard { stroke: #fee2e2; }
        
        .lc-bg-easy { background-color: #10b981; }
        .lc-bg-medium { background-color: #f59e0b; }
        .lc-bg-hard { background-color: #ef4444; }

        .lc-track-bg-easy { background-color: #d1fae5; }
        .lc-track-bg-medium { background-color: #fef3c7; }
        .lc-track-bg-hard { background-color: #fee2e2; }

        .lc-badge-easy { background-color: rgba(209, 250, 229, 0.8); border-color: #a7f3d0; color: #047857; }
        .lc-badge-medium { background-color: rgba(254, 243, 199, 0.8); border-color: #fde68a; color: #b45309; }
        .lc-badge-hard { background-color: rgba(254, 226, 226, 0.8); border-color: #fecaca; color: #be123c; }

        body.dark-mode .lc-track-easy { stroke: rgba(6, 78, 59, 0.4); }
        body.dark-mode .lc-track-medium { stroke: rgba(120, 53, 15, 0.4); }
        body.dark-mode .lc-track-hard { stroke: rgba(136, 19, 55, 0.4); }

        body.dark-mode .lc-track-bg-easy { background-color: rgba(6, 78, 59, 0.3); }
        body.dark-mode .lc-track-bg-medium { background-color: rgba(120, 53, 15, 0.3); }
        body.dark-mode .lc-track-bg-hard { background-color: rgba(136, 19, 55, 0.3); }

        body.dark-mode .lc-badge-easy { background-color: rgba(6, 78, 59, 0.4); border-color: rgba(6, 78, 59, 0.5); color: #34d399; }
        body.dark-mode .lc-badge-medium { background-color: rgba(120, 53, 15, 0.4); border-color: rgba(120, 53, 15, 0.5); color: #fbbf24; }
        body.dark-mode .lc-badge-hard { background-color: rgba(136, 19, 55, 0.4); border-color: rgba(136, 19, 55, 0.5); color: #fb7185; }

        .lc-legend {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          width: 100%;
          max-width: 380px;
        }
        .lc-stat-box {
          background-color: var(--hover-bg-color, #f9fafb);
          border: 1px solid var(--border-color, #e5e7eb);
          border-radius: 1rem;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        body.dark-mode .lc-stat-box {
          background-color: #121212;
        }
      `}</style>

      <div className="lc-container">
        {/* SVG Arc chart */}
        <div className="lc-svg-container">
          <svg width={220} height={220} viewBox="0 0 220 220" style={{ maxWidth: "100%", filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.05))" }}>
            {/* Easy */}
            <path d={trackArc(cx, cy, 90)} fill="none" strokeWidth={10} strokeLinecap="round" className="lc-track-easy" />
            <path
              d={trackArc(cx, cy, 90)}
              fill="none"
              stroke="#10b981"
              strokeWidth={10}
              strokeLinecap="round"
              {...getArcAnimationProps(90, easy.total, easy.solved)}
              style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(0.25, 1, 0.5, 1)" }}
            />

            {/* Medium */}
            <path d={trackArc(cx, cy, 73)} fill="none" strokeWidth={10} strokeLinecap="round" className="lc-track-medium" />
            <path
              d={trackArc(cx, cy, 73)}
              fill="none"
              stroke="#f59e0b"
              strokeWidth={10}
              strokeLinecap="round"
              {...getArcAnimationProps(73, medium.total, medium.solved)}
              style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(0.25, 1, 0.5, 1) 0.1s" }}
            />

            {/* Hard */}
            <path d={trackArc(cx, cy, 56)} fill="none" strokeWidth={10} strokeLinecap="round" className="lc-track-hard" />
            <path
              d={trackArc(cx, cy, 56)}
              fill="none"
              stroke="#ef4444"
              strokeWidth={10}
              strokeLinecap="round"
              {...getArcAnimationProps(56, hard.total, hard.solved)}
              style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(0.25, 1, 0.5, 1) 0.2s" }}
            />

            {/* Centre Text */}
            <g style={{ opacity: animate ? 1 : 0, transition: "opacity 1s ease" }}>
              <text x={cx} y={cy - 10} textAnchor="middle" className="lc-text-primary" fontSize={32} fontWeight={800} fontFamily="inherit">
                {totalSolved}
              </text>
              <text x={cx} y={cy + 12} textAnchor="middle" className="lc-text-secondary" fontSize={11} fontWeight={600} fontFamily="inherit">
                / {totalProblems}
              </text>
              <text x={cx} y={cy + 28} textAnchor="middle" className="lc-text-secondary" fontSize={10} fontFamily="inherit" fontWeight={500}>
                solved
              </text>

              {/* Bottom Badge */}
              <text x={cx} y={200} textAnchor="middle" fill="#059669" fontSize={12} fontWeight={700} fontFamily="inherit">
                {Math.round(overallPct * 100)}% complete
              </text>
            </g>
          </svg>
        </div>

        {/* Difficulty legend + bars */}
        <div className="lc-legend">
          {[
            { label: "Easy", data: easy, color: "lc-bg-easy", track: "lc-track-bg-easy", text: "#047857", badge: "lc-badge-easy", delay: "0s" },
            { label: "Medium", data: medium, color: "lc-bg-medium", track: "lc-track-bg-medium", text: "#b45309", badge: "lc-badge-medium", delay: "0.1s" },
            { label: "Hard", data: hard, color: "lc-bg-hard", track: "lc-track-bg-hard", text: "#be123c", badge: "lc-badge-hard", delay: "0.2s" },
          ].map(({ label, data, color, track, badge, delay }) => {
            const targetPct = data.total > 0 ? Math.round((data.solved / data.total) * 100) : 0;
            const currentPct = animate ? targetPct : 0;

            return (
              <div key={label}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.375rem" }}>
                  <span style={{ fontSize: "11px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.05em" }} className={badge.replace("badge", "text")}>
                    {label}
                  </span>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span className={badge} style={{ fontSize: "10px", fontWeight: "bold", padding: "2px 8px", borderRadius: "0.5rem", border: "1px solid" }}>
                      {data.solved} / {data.total}
                    </span>
                    <span className="lc-text-secondary" style={{ fontSize: "11px", fontWeight: "bold", width: "2rem", textAlign: "right" }}>
                      {targetPct}%
                    </span>
                  </div>
                </div>
                <div className={track} style={{ width: "100%", height: "0.625rem", borderRadius: "9999px", overflow: "hidden" }}>
                  <div
                    className={color}
                    style={{ 
                      height: "100%",
                      borderRadius: "9999px",
                      width: `${currentPct}%`,
                      transition: `width 1.2s cubic-bezier(0.25, 1, 0.5, 1) ${delay}`
                    }}
                  />
                </div>
              </div>
            );
          })}

          {/* Overall stats row */}
          <div style={{ paddingTop: "1rem", borderTop: "1px solid var(--border-color)", display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "0.75rem" }}>
            <div className="lc-stat-box">
              <div className="lc-text-secondary" style={{ fontSize: "10px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>Total Solved</div>
              <div className="lc-text-primary" style={{ fontSize: "1.5rem", fontWeight: "800" }}>{totalSolved}</div>
            </div>
            <div className="lc-stat-box">
              <div className="lc-text-secondary" style={{ fontSize: "10px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>Total Problems</div>
              <div className="lc-text-primary" style={{ fontSize: "1.5rem", fontWeight: "800" }}>{totalProblems}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}