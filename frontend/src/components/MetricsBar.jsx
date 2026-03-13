import React, { useEffect, useState, useRef } from 'react';

function AnimatedNumber({ value, duration = 600 }) {
  const [display, setDisplay] = useState(0);
  const frameRef = useRef(null);
  const startRef = useRef(null);
  const fromRef = useRef(0);

  useEffect(() => {
    if (value === null || value === undefined) return;

    fromRef.current = display;
    startRef.current = performance.now();

    const animate = (now) => {
      const elapsed = now - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(fromRef.current + (value - fromRef.current) * eased);
      setDisplay(current);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration]);

  return display;
}

function ProgressBar({ value, max, color }) {
  const pct = max > 0 ? Math.min((value / max) * 100, 100) : 0;

  return (
    <div
      style={{
        width: '60%',
        height: '2px',
        background: '#1e1e2e',
        borderRadius: '1px',
        margin: '0 auto 8px auto',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: `${pct}%`,
          height: '100%',
          background: color,
          borderRadius: '1px',
          transition: 'width 0.6s ease-out',
          boxShadow: pct > 0 ? `0 0 6px ${color}60` : 'none',
        }}
      />
    </div>
  );
}

export default function MetricsBar({ metrics }) {
  const [breakingFlash, setBreakingFlash] = useState(false);
  const prevBreaking = useRef(null);

  useEffect(() => {
    if (metrics.breakingPoint !== null && prevBreaking.current === null) {
      setBreakingFlash(true);
      const timer = setTimeout(() => setBreakingFlash(false), 1800);
      return () => clearTimeout(timer);
    }
    prevBreaking.current = metrics.breakingPoint;
  }, [metrics.breakingPoint]);

  const items = [
    {
      label: 'ENDPOINTS FOUND',
      value: metrics.endpoints,
      color: '#f8fafc',
      barColor: '#3b82f6',
      max: 100,
    },
    {
      label: 'VULNERABILITIES',
      value: metrics.vulnerabilities,
      color: metrics.vulnerabilities > 0 ? '#ef4444' : '#f8fafc',
      barColor: '#ef4444',
      max: 20,
    },
    {
      label: 'BREAKING POINT',
      value: metrics.breakingPoint,
      color: breakingFlash ? '#ff0000' : '#f8fafc',
      barColor: '#f59e0b',
      max: 2000,
      isBreaking: true,
    },
    {
      label: 'UX FAILURES',
      value: metrics.uxFailures,
      color: '#f8fafc',
      barColor: '#a855f7',
      max: 20,
    },
    {
      label: 'BUSINESS GAPS',
      value: metrics.businessGaps,
      color: '#f8fafc',
      barColor: '#f59e0b',
      max: 20,
    },
  ];

  return (
    <div
      style={{
        width: '100%',
        background: '#13131a',
        borderTop: '1px solid #1e1e2e',
        padding: '16px 32px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexShrink: 0,
      }}
    >
      {items.map((m, idx) => (
        <React.Fragment key={m.label}>
          <div
            style={{
              textAlign: 'center',
              flex: 1,
            }}
          >
            {/* Progress bar */}
            <ProgressBar
              value={m.isBreaking ? (m.value || 0) : (m.value || 0)}
              max={m.max}
              color={m.barColor}
            />
            <div
              className={m.isBreaking && breakingFlash ? 'flash-red' : ''}
              style={{
                fontSize: '28px',
                fontWeight: 900,
                color: m.color,
                lineHeight: 1,
                marginBottom: '6px',
                transition: 'color 0.3s ease',
              }}
            >
              {m.isBreaking ? (
                m.value === null || m.value === undefined ? (
                  '—'
                ) : (
                  <>
                    <AnimatedNumber value={m.value} /> users
                  </>
                )
              ) : (
                <AnimatedNumber value={m.value || 0} />
              )}
            </div>
            <div
              style={{
                fontSize: '10px',
                color: '#94a3b8',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                fontWeight: 600,
              }}
            >
              {m.label}
            </div>
          </div>
          {/* Separator line between metrics */}
          {idx < items.length - 1 && (
            <div
              style={{
                width: '1px',
                height: '40px',
                background: '#1e1e2e',
                flexShrink: 0,
              }}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
