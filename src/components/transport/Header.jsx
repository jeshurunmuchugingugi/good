export default function Header({ onNavigate }) {
  return (
    <header style={{
      height: '72px',
      background: 'linear-gradient(180deg, rgba(255,255,255,0.98), rgba(255,255,255,0.95))',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderBottom: '1px solid rgba(15,23,42,0.04)'
    }}>
      <div style={{ width: '100%', maxWidth: '1200px', padding: '0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={() => onNavigate('landing')} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600', fontSize: '16px', background: 'none', border: 'none', cursor: 'pointer', padding: '8px 12px', borderRadius: '8px', color: '#0f172a' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 19l-7-7 7-7" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to Home
        </button>
        <nav style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <button onClick={() => onNavigate('units')} style={{ textDecoration: 'none', color: '#6b7280', fontSize: '14px', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '600' }}>Storage</button>
        </nav>
      </div>
    </header>
  );
}
