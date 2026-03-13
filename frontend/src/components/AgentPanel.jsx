import React from 'react';
import { Check } from 'lucide-react';
import ReasoningStream from './ReasoningStream';
import FindingCard from './FindingCard';

export default function AgentPanel({ name, color, icon: Icon, status, reasoning, findings }) {
  const isAnalyzing = status === 'analyzing';
  const isComplete = status === 'complete';
  const findingCount = findings ? findings.length : 0;

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        background: '#0f0f17',
        borderRadius: '12px',
        border: isAnalyzing
          ? `1px solid ${color}66`
          : '1px solid #1e1e2e',
        boxShadow: isAnalyzing
          ? `0 0 25px ${color}33`
          : 'none',
        overflow: 'hidden',
        transition: 'border 0.3s ease, box-shadow 0.3s ease',
        minHeight: 0,
        position: 'relative',
      }}
    >
      {/* Scanning line animation when analyzing */}
      {isAnalyzing && (
        <div
          className="scan-line"
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            height: '2px',
            background: `linear-gradient(90deg, transparent, ${color}60, transparent)`,
            boxShadow: `0 0 15px ${color}40, 0 0 30px ${color}20`,
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Header */}
      <div
        style={{
          background: '#13131a',
          padding: '16px',
          borderBottom: '1px solid #1e1e2e',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Icon size={20} color={color} />
          <span
            style={{
              fontWeight: 700,
              fontSize: '14px',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: '#f8fafc',
            }}
          >
            {name}
          </span>
          {/* Findings counter badge */}
          {findingCount > 0 && (
            <span
              style={{
                background: `${color}20`,
                color: color,
                fontSize: '10px',
                fontWeight: 700,
                padding: '2px 7px',
                borderRadius: '999px',
                minWidth: '20px',
                textAlign: 'center',
                border: `1px solid ${color}30`,
              }}
            >
              {findingCount}
            </span>
          )}
        </div>
        <div>
          {status === 'idle' && (
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#555',
              }}
            />
          )}
          {isAnalyzing && (
            <div
              className="pulse-dot"
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: color,
              }}
            />
          )}
          {isComplete && <Check size={16} color={color} />}
        </div>
      </div>

      {/* Reasoning Section */}
      <div style={{ padding: '12px 16px 0 16px', flexShrink: 0 }}>
        <div
          style={{
            fontSize: '10px',
            color: '#94a3b8',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '8px',
            fontWeight: 600,
          }}
        >
          REASONING
        </div>
        <ReasoningStream reasoning={reasoning} color={color} />
      </div>

      {/* Divider */}
      <div style={{ height: '1px', background: '#1e1e2e', margin: '12px 16px' }} />

      {/* Findings Section */}
      <div
        style={{
          padding: '0 16px 16px 16px',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            fontSize: '10px',
            color: '#94a3b8',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '8px',
            fontWeight: 600,
            flexShrink: 0,
          }}
        >
          FINDINGS
        </div>
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            minHeight: 0,
          }}
        >
          {findings && findings.length > 0 ? (
            findings.map((finding, i) => (
              <div
                key={i}
                style={{
                  transform: `translateX(${Math.min(i * 1, 4)}px)`,
                  position: 'relative',
                  zIndex: findings.length - i,
                }}
              >
                <FindingCard
                  severity={finding.severity}
                  category={finding.category}
                  text={finding.text}
                />
              </div>
            ))
          ) : (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                minHeight: '60px',
                color: '#555',
                fontStyle: 'italic',
                fontSize: '13px',
              }}
            >
              Scanning...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
