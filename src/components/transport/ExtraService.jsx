export default function ExtraService({ id, label, description, fee, isSelected, onToggle }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', padding: '10px 0' }}>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <div onClick={() => onToggle(id, fee)} style={{
          width: '18px', height: '18px', border: '1px solid #dbe7ff', borderRadius: '6px', display: 'inline-grid', placeItems: 'center', cursor: 'pointer',
          background: isSelected ? 'linear-gradient(180deg,#ecf5ff,#dbeeff)' : '#fff',
          borderColor: isSelected ? '#FC9E3B' : '#dbe7ff'
        }}>{isSelected && '✓'}</div>
        <div>
          <strong>{label}</strong>
          <div style={{ color: '#6b7280', fontSize: '13px' }}>{description}</div>
        </div>
      </div>
      <div style={{ color: '#6b7280' }}>KSh {fee}</div>
    </div>
  );
}
