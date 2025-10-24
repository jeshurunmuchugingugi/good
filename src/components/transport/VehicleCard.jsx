export default function VehicleCard({ id, name, capacity, description, rate, total, eta, isSelected, isRecommended, onSelect }) {
  return (
    <div onClick={() => onSelect(id)} style={{
      background: '#fff', borderRadius: '12px', padding: '18px',
      border: isSelected ? '3px solid rgba(252,158,59,0.3)' : (isRecommended ? '2px solid #fff4e6' : '1px solid #eef2f7'),
      boxShadow: isRecommended ? '0 10px 30px rgba(59,130,246,0.07)' : 'none',
      transition: 'all .18s ease', display: 'flex', flexDirection: 'column', gap: '10px', minHeight: '210px', cursor: 'pointer'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '700' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 10h13v6H3z" stroke="#0f172a" strokeWidth="1.1"/></svg>
            {name}
          </div>
          {isRecommended && <div style={{ background: '#ecf5ff', color: '#3b82f6', padding: '6px 8px', borderRadius: '999px', fontWeight: '700', fontSize: '12px' }}>RECOMMENDED</div>}
        </div>
        {isSelected && <div style={{ color: '#16a34a', fontWeight: '700' }}>✔</div>}
      </div>
      <div style={{ color: '#6b7280', fontSize: '13px' }}>{capacity} · {eta}</div>
      <div style={{ color: '#6b7280', fontSize: '13px' }}>{description}</div>
      <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
        <div style={{ fontSize: '13px', color: '#6b7280' }}>KSh <span style={{ fontWeight: '800', fontSize: '16px' }}>{rate}</span>/km</div>
        <div style={{ fontWeight: '800', fontSize: '16px' }}>Total: KSh {total.toLocaleString()}</div>
      </div>
    </div>
  );
}
