export default function SuccessModal({ bookingReference, onClose, onNavigate }) {
  return (
    <div style={{ position: 'fixed', inset: '0', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(12, 20, 35, 0.45)', zIndex: '100' }}>
      <div style={{ width: '90%', maxWidth: '480px', background: 'white', borderRadius: '16px', padding: '32px', boxShadow: '0 20px 50px rgba(2,6,23,0.35)', textAlign: 'center' }}>
        <div style={{ width: '64px', height: '64px', background: 'linear-gradient(135deg, #10b981, #059669)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', color: 'white', fontSize: '28px' }}>✓</div>
        <h2 style={{ margin: '0 0 12px', fontSize: '24px', fontWeight: '700', color: '#111827' }}>Payment Successful!</h2>
        <p style={{ margin: '0 0 20px', color: '#6b7280', fontSize: '16px' }}>Your booking has been confirmed. You'll receive an SMS confirmation shortly.</p>
        <div style={{ background: '#f0f9ff', border: '1px solid #e0f2fe', borderRadius: '12px', padding: '16px', marginBottom: '24px' }}>
          <div style={{ fontSize: '14px', color: '#0369a1', marginBottom: '8px' }}>Booking Reference</div>
          <div style={{ fontSize: '20px', fontWeight: '700', color: '#0c4a6e', letterSpacing: '1px' }}>{bookingReference}</div>
        </div>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button onClick={onClose} style={{ padding: '12px 24px', borderRadius: '10px', border: '1px solid #e6eef6', background: 'transparent', color: '#6b7280', fontWeight: '600', cursor: 'pointer' }}>Close</button>
          <button onClick={() => { onClose(); onNavigate('landing'); }} style={{ padding: '12px 24px', borderRadius: '10px', border: '0', background: '#FC9E3B', color: 'white', fontWeight: '600', cursor: 'pointer' }}>Go to Dashboard</button>
        </div>
      </div>
    </div>
  );
}
