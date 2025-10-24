export default function LocationStep({ streetAddress, setStreetAddress, city, setCity, pickupDate, setPickupDate, timeSlot, setTimeSlot }) {
  return (
    <>
      <h3 style={{ margin: '0 0 8px 0' }}>Pickup Location</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginTop: '8px' }}>
        <div>
          <label style={{ fontSize: '13px', color: '#6b7280', marginBottom: '6px', display: 'block' }}>Street Address</label>
          <input type="text" value={streetAddress} onChange={(e) => setStreetAddress(e.target.value)} placeholder="Enter your address" style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid #e6eef6', background: '#fff', fontSize: '14px' }} />
        </div>
        <div>
          <label style={{ fontSize: '13px', color: '#6b7280', marginBottom: '6px', display: 'block' }}>City</label>
          <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid #e6eef6', background: '#fff', fontSize: '14px' }} />
        </div>
      </div>
      <div style={{ marginTop: '12px', height: '120px', borderRadius: '8px', border: '2px dashed #e9eef6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280', background: 'linear-gradient(180deg, rgba(255,255,255,0.8), rgba(255,255,255,0.6))' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '8px' }}>Or use map to select location</div>
          <button type="button" style={{ padding: '10px 16px', borderRadius: '10px', border: '1px solid rgba(59,130,246,0.12)', background: 'transparent', color: '#3b82f6', fontWeight: '600', cursor: 'pointer', fontSize: '14px' }}>Open Map</button>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginTop: '14px' }}>
        <div>
          <label style={{ fontSize: '13px', color: '#6b7280', marginBottom: '6px', display: 'block' }}>Pickup Date</label>
          <input type="date" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid #e6eef6', background: '#fff', fontSize: '14px' }} />
        </div>
        <div>
          <label style={{ fontSize: '13px', color: '#6b7280', marginBottom: '6px', display: 'block' }}>Preferred Time</label>
          <select value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)} style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid #e6eef6', background: '#fff', fontSize: '14px' }}>
            <option>Morning (8AM - 12PM)</option>
            <option>Afternoon (12PM - 5PM)</option>
            <option>Evening (5PM - 8PM)</option>
          </select>
        </div>
      </div>
    </>
  );
}
