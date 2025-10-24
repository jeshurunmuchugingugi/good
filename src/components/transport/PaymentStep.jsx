export default function PaymentStep({ grandTotal }) {
  return (
    <>
      <h3 style={{ margin: '0 0 8px 0' }}>Payment & Confirmation</h3>
      <div style={{ color: '#6b7280', fontSize: '13px', marginBottom: '12px' }}>Complete your booking with secure M-Pesa payment</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
        <div style={{ marginLeft: 'auto', color: '#6b7280', fontSize: '13px', display: 'flex', gap: '8px', alignItems: 'center' }}>🔐 <span>SSL Secured</span></div>
      </div>
      <div style={{ borderRadius: '12px', border: '1px solid rgba(34,197,94,0.12)', background: 'linear-gradient(180deg, #f7fff7, #f1fff4)', padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', fontWeight: '700', color: '#0b3a66' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="7" width="13" height="9" stroke="#065f46" strokeWidth="1.2" rx="1"/>
              <path d="M16 10l3 3" stroke="#065f46" strokeWidth="1.2"/>
            </svg>
            M-Pesa Payment
          </div>
          <div style={{ background: '#16a34a', color: '#fff', padding: '6px 10px', borderRadius: '999px', fontWeight: '700', fontSize: '13px' }}>Selected</div>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: '13px', color: '#6b7280', display: 'block', marginBottom: '6px' }}>Phone Number</label>
            <input type="tel" defaultValue="+254 722123456" style={{ padding: '10px 12px', borderRadius: '10px', border: '1px solid #e6eef6', fontSize: '14px', background: '#fff', width: '100%' }} />
          </div>
          <div style={{ width: '180px' }}>
            <label style={{ fontSize: '13px', color: '#6b7280', display: 'block', marginBottom: '6px' }}>Amount to Pay</label>
            <input type="text" value={`KSh ${grandTotal.toLocaleString()}`} readOnly style={{ padding: '10px 12px', borderRadius: '10px', border: '1px solid #e6eef6', fontSize: '14px', background: '#fff', width: '100%' }} />
          </div>
        </div>
        <div style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.08)', padding: '10px', borderRadius: '8px', color: '#065f46', fontSize: '13px' }}>
          <strong>Payment Instructions</strong>
          <ol style={{ margin: '6px 0 0 18px', padding: '0' }}>
            <li>Click "Pay with M-Pesa" button below</li>
            <li>You'll receive an STK push notification on your phone</li>
            <li>Enter your M-Pesa PIN to complete payment</li>
            <li>You'll receive confirmation SMS and booking details</li>
          </ol>
        </div>
      </div>
      <div style={{ borderRadius: '10px', background: '#f5fbff', padding: '14px', border: '1px solid #e6f0ff', marginBottom: '14px' }}>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '15px' }}>Contact Information</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <div>
            <label style={{ fontSize: '13px', color: '#6b7280' }}>Full Name</label>
            <input type="text" defaultValue="Sarah Johnson" style={{ padding: '10px 12px', borderRadius: '10px', border: '1px solid #e6eef6', fontSize: '14px', background: '#fff', width: '100%' }} />
          </div>
          <div>
            <label style={{ fontSize: '13px', color: '#6b7280' }}>Email Address</label>
            <input type="email" defaultValue="sarah.johnson@email.com" style={{ padding: '10px 12px', borderRadius: '10px', border: '1px solid #e6eef6', fontSize: '14px', background: '#fff', width: '100%' }} />
          </div>
          <div>
            <label style={{ fontSize: '13px', color: '#6b7280' }}>Alternative Phone</label>
            <input type="tel" placeholder="Optional backup number" style={{ padding: '10px 12px', borderRadius: '10px', border: '1px solid #e6eef6', fontSize: '14px', background: '#fff', width: '100%' }} />
          </div>
          <div>
            <label style={{ fontSize: '13px', color: '#6b7280' }}>Emergency Contact</label>
            <input type="tel" placeholder="Emergency contact number" style={{ padding: '10px 12px', borderRadius: '10px', border: '1px solid #e6eef6', fontSize: '14px', background: '#fff', width: '100%' }} />
          </div>
        </div>
      </div>
      <div style={{ borderRadius: '10px', background: '#fff', border: '1px solid #eef3fb', padding: '12px', marginBottom: '16px', fontSize: '13px' }}>
        <label style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', marginBottom: '8px' }}>
          <input type="checkbox" style={{ width: '16px', height: '16px', marginTop: '4px' }} />
          I agree to the <a href="#" style={{ color: '#FC9E3B', textDecoration: 'none' }}>Terms of Service</a> and <a href="#" style={{ color: '#FC9E3B', textDecoration: 'none' }}>Privacy Policy</a>. I understand that this booking is subject to availability and confirmation.
        </label>
        <label style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', marginBottom: '8px' }}>
          <input type="checkbox" style={{ width: '16px', height: '16px', marginTop: '4px' }} />
          I consent to receive SMS notifications about my booking status, driver details, and delivery updates.
        </label>
        <label style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
          <input type="checkbox" style={{ width: '16px', height: '16px', marginTop: '4px' }} />
          I understand the cancellation policy: Free cancellation up to 2 hours before pickup; 50% charge for cancellations within 2 hours.
        </label>
      </div>
    </>
  );
}
