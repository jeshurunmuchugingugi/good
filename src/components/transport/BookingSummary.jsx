export default function BookingSummary({ distanceKm, selectedVehicle, extrasSum, grandTotal }) {
  return (
    <aside style={{ background: '#ffffff', borderRadius: '14px', padding: '18px', boxShadow: '0 10px 30px rgba(12,20,40,0.06)' }}>
      <h4 style={{ margin: '0 0 8px', fontSize: '16px' }}>Booking Summary</h4>
      {[
        ['Pickup Location', '123 Westlands Ave'],
        ['Distance', `${distanceKm.toFixed(1)} km`],
        ['Vehicle Type', selectedVehicle.name],
        ['Rate per km', `KSh ${selectedVehicle.rate}`],
        ['Estimated Time', selectedVehicle.eta]
      ].map(([label, value]) => (
        <div key={label} style={{ display: 'flex', justifyContent: 'space-between', color: '#6b7280', margin: '8px 0' }}>
          <div>{label}</div>
          <div><strong style={{ color: '#111827' }}>{value}</strong></div>
        </div>
      ))}
      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#6b7280', margin: '8px 0' }}>
        <div>Subtotal</div>
        <div>KSh {selectedVehicle.subtotal.toLocaleString()}</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#6b7280', margin: '8px 0' }}>
        <div>Additional Services</div>
        <div>KSh {extrasSum.toLocaleString()}</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: '800', marginTop: '8px', fontSize: '16px' }}>
        <div>Total Cost</div>
        <div style={{ color: '#3b82f6', fontWeight: '900' }}>KSh {grandTotal.toLocaleString()}</div>
      </div>
      <div style={{ marginTop: '12px', background: '#f1f8ff', padding: '12px', borderRadius: '8px', color: '#0b3a66', fontSize: '13px' }}>
        <strong>What's included:</strong>
        <ul style={{ margin: '8px 0 0 16px', padding: '0' }}>
          {['Professional driver & helper', 'Loading & unloading service', 'Basic insurance coverage', 'Real-time GPS tracking', '24/7 customer support'].map(item => <li key={item}>{item}</li>)}
        </ul>
      </div>
      <div style={{ marginTop: '10px', background: '#fff7ed', padding: '10px', borderRadius: '8px', color: '#92400e', fontSize: '13px', border: '1px solid rgba(245,158,11,0.08)' }}>
        🟠 Free cancellation up to 2 hours before pickup.
      </div>
    </aside>
  );
}
