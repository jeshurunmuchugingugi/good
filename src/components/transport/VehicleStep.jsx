import VehicleCard from './VehicleCard';
import ExtraService from './ExtraService';

export default function VehicleStep({ 
  distanceKm, selectedVehicleId, onVehicleSelect, selectedExtras, onExtraToggle,
  itemDescription, setItemDescription, specialRequirements, setSpecialRequirements,
  pickupDate, setPickupDate, timeSlot, setTimeSlot, contactPerson, setContactPerson
}) {
  const extras = [
    { id: 'chk-pack', label: 'Packing Materials', desc: 'Boxes, bubble wrap, tape — KSh 500', fee: 500 },
    { id: 'chk-helper', label: 'Extra Helper', desc: 'Additional worker — KSh 1,200', fee: 1200 },
    { id: 'chk-assembly', label: 'Assembly / Disassembly', desc: 'Furniture handling — KSh 800', fee: 800 },
    { id: 'chk-insurance', label: 'Premium Insurance', desc: 'Extended coverage — KSh 300', fee: 300 }
  ];

  return (
    <>
      <h3 style={{ margin: '0 0 8px 0' }}>Select Vehicle Type</h3>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', color: '#6b7280', fontSize: '13px' }}>
        <div>Choose the vehicle that suits your load</div>
        <div>Distance: <strong>{distanceKm.toFixed(1)} km</strong></div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '16px' }}>
        <VehicleCard id="veh-small" name="Small Van" capacity="Up to 500kg · 2m³ capacity" description="Perfect for small items, boxes, and documents" rate={50} total={1265} eta="35–40 mins" isSelected={selectedVehicleId === 'veh-small'} isRecommended={false} onSelect={onVehicleSelect} />
        <VehicleCard id="veh-medium" name="Medium Truck" capacity="Up to 1,500kg · 8m³ capacity" description="Ideal for furniture, appliances, and medium loads" rate={80} total={2024} eta="45–50 mins" isSelected={selectedVehicleId === 'veh-medium'} isRecommended={true} onSelect={onVehicleSelect} />
        <VehicleCard id="veh-large" name="Large Truck" capacity="Up to 3,000kg · 15m³ capacity" description="Best for large furniture, office equipment, bulk items" rate={120} total={3036} eta="55–65 mins" isSelected={selectedVehicleId === 'veh-large'} isRecommended={false} onSelect={onVehicleSelect} />
      </div>
      <div style={{ marginTop: '12px', borderRadius: '10px', padding: '14px', border: '1px solid #eef3fb', background: '#fff' }}>
        <div style={{ fontWeight: '700', marginBottom: '8px' }}>Additional Services</div>
        {extras.map((extra, index) => (
          <div key={extra.id} style={{ borderBottom: index < 3 ? '1px dashed #f1f5f9' : '0' }}>
            <ExtraService {...extra} isSelected={!!selectedExtras[extra.id]} onToggle={onExtraToggle} />
          </div>
        ))}
      </div>
      <div style={{ marginTop: '14px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div>
          <label style={{ color: '#6b7280', fontSize: '13px' }}>Item Description</label>
          <textarea value={itemDescription} onChange={(e) => setItemDescription(e.target.value)} placeholder="Describe your items (furniture, electronics...)" style={{ padding: '12px', borderRadius: '10px', border: '1px solid #e6eef6', fontSize: '14px', background: '#fff', width: '100%', minHeight: '80px', resize: 'vertical' }} />
        </div>
        <div>
          <label style={{ color: '#6b7280', fontSize: '13px' }}>Special Requirements</label>
          <textarea value={specialRequirements} onChange={(e) => setSpecialRequirements(e.target.value)} placeholder="Access restrictions, stairs, fragile handling..." style={{ padding: '12px', borderRadius: '10px', border: '1px solid #e6eef6', fontSize: '14px', background: '#fff', width: '100%', minHeight: '80px', resize: 'vertical' }} />
        </div>
      </div>
      <div style={{ marginTop: '14px', background: '#f8fbff', padding: '12px', borderRadius: '10px', border: '1px solid #eef7ff' }}>
        <div style={{ fontWeight: '700', marginBottom: '8px' }}>Pickup Preferences</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
          <input type="date" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} style={{ padding: '12px', borderRadius: '10px', border: '1px solid #e6eef6', fontSize: '14px', background: '#fff' }} />
          <select value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)} style={{ padding: '12px', borderRadius: '10px', border: '1px solid #e6eef6', fontSize: '14px', background: '#fff' }}>
            <option>Morning (8AM - 12PM)</option>
            <option>Afternoon (12PM - 5PM)</option>
            <option>Evening (5PM - 8PM)</option>
          </select>
          <input type="text" value={contactPerson} onChange={(e) => setContactPerson(e.target.value)} placeholder="Contact person" style={{ padding: '12px', borderRadius: '10px', border: '1px solid #e6eef6', fontSize: '14px', background: '#fff' }} />
        </div>
      </div>
    </>
  );
}
