"use client";

import { useEffect, useState, useRef } from "react";
import "jheat.js/dist/heat.js.css";

export function GithubHeatmap() {
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const containerId = "github-heatmap-container";
  const isRendered = useRef(false);

  // Use environment variable or fallback
  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "riteshh01";

  useEffect(() => {
    let isMounted = true;
    async function fetchAndRenderData() {
      try {
        if (typeof window !== "undefined" && !(window as any).$heat) {
          try {
            await import("jheat.js");
          } catch (e) {
            console.warn("Failed to load jheat.js", e);
          }
        }
        
        const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`);
        const json = await res.json();
        
        if (!isMounted) return;

        const dates: Date[] = [];
        if (json.contributions) {
          json.contributions.forEach((sub: any) => {
            const count = sub.count;
            if (count > 0) {
              const d = new Date(sub.date);
              for (let i = 0; i < count; i++) {
                dates.push(d);
              }
            }
          });
        }

        const $heat = (window as any).$heat;
        if ($heat && containerRef.current && !isRendered.current) {
          $heat.render(containerRef.current, {
            views: {
              map: {
                showDayNames: false
              }
            },
            defaultView: "map",
            colorRanges: [
              { id: "level1", color: "#9be9a8", minimum: 1, cssClassName: "c1" },
              { id: "level2", color: "#40c463", minimum: 2, cssClassName: "c2" },
              { id: "level3", color: "#30a14e", minimum: 4, cssClassName: "c3" },
              { id: "level4", color: "#216e39", minimum: 7, cssClassName: "c4" }
            ]
          });
          
          $heat.addDates(containerId, dates);
          isRendered.current = true;
        }
      } catch (err) {
        console.error("Failed to fetch github heatmap data:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    
    fetchAndRenderData();
    
    return () => {
      isMounted = false;
      const $heat = (window as any).$heat;
      if ($heat && isRendered.current) {
        try {
          $heat.destroy(containerId);
          isRendered.current = false;
        } catch (e) {}
      }
    };
  }, [username]);

  return (
    <div style={{ marginTop: "1rem", width: "100%" }}>
      {loading && <div style={{ color: "var(--subtle-text-color)" }}>Loading GitHub Heatmap...</div>}
      <div style={{ overflowX: "auto", width: "100%", paddingBottom: "1rem", display: loading ? "none" : "block" }}>
        <div id={containerId} ref={containerRef} style={{ minWidth: "800px" }}></div>
      </div>
    </div>
  );
}
