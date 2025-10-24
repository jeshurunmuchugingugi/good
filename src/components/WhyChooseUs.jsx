export default function WhyChooseUs() {
  return (
    <section style={{backgroundColor: '#FFF6ED', padding: '80px 24px'}}>
      <div style={{maxWidth: '1100px', margin: '0 auto'}}>
        <div style={{textAlign: 'center', marginBottom: '22px'}}>
          <h2 style={{fontSize: '28px', margin: 0, fontWeight: 800, letterSpacing: '-0.02em', color: '#0F1724'}}>
            Why Choose Us
          </h2>
          <p style={{margin: '10px auto 0', color: '#6B7280', maxWidth: '760px', fontWeight: 500}}>
            Safe, simple, all-in-one storage and transport — here's why customers trust us.
          </p>
        </div>

        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '34px', alignItems: 'start', marginTop: '26px'}} className="why-choose-grid">
          {/* Left: Image */}
          <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
            <div style={{width: '100%', maxWidth: '420px', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 12px 30px rgba(16,24,40,0.09)', border: '1px solid rgba(11,21,48,0.04)'}}>
              <img 
                src="https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=900&q=80" 
                alt="Secure storage facility with organized shelving" 
                style={{display: 'block', width: '100%', height: '100%', objectFit: 'cover', aspectRatio: '4/5'}}
              />
            </div>
          </div>

          {/* Right: Feature Cards */}
          <div style={{display: 'flex', flexDirection: 'column', gap: '22px', justifyContent: 'center'}}>
            {/* Card 1 */}
            <div style={{display: 'flex', alignItems: 'center', gap: '16px', background: '#FFFFFF', borderRadius: '16px', padding: '18px', boxShadow: '0 6px 18px rgba(16,24,40,0.08)', border: '1px solid rgba(11,21,48,0.04)', transition: 'transform .18s ease, box-shadow .18s ease'}} className="feature-card-hover">
              <div style={{minWidth: '72px', minHeight: '72px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(180deg, rgba(255,157,66,0.12), rgba(255,157,66,0.06))', boxShadow: '0 6px 20px rgba(255,157,66,0.08) inset', flexShrink: 0}}>
                <div style={{width: '52px', height: '52px', borderRadius: '10px', background: '#FF9D42', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, boxShadow: '0 6px 18px rgba(255,157,66,0.18)'}}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M2 7h20v10H2z" fill="currentColor" opacity="0.12"></path>
                    <path d="M3 9h18v2H3z" fill="white"></path>
                    <path d="M7 13h4v1H7z" fill="white" opacity="0.9"></path>
                  </svg>
                </div>
              </div>
              <div style={{flex: 1}}>
                <h3 style={{fontWeight: 700, margin: 0, fontSize: '16px', color: '#0F1724'}}>Instant Online Payments</h3>
                <p style={{margin: '6px 0 0', color: '#6B7280', fontSize: '14px'}}>Pay securely via M-PESA, Visa, or Mastercard — quick and convenient.</p>
              </div>
            </div>

            {/* Card 2 */}
            <div style={{display: 'flex', alignItems: 'center', gap: '16px', background: '#FFFFFF', borderRadius: '16px', padding: '18px', boxShadow: '0 6px 18px rgba(16,24,40,0.08)', border: '1px solid rgba(11,21,48,0.04)', transition: 'transform .18s ease, box-shadow .18s ease'}} className="feature-card-hover">
              <div style={{minWidth: '72px', minHeight: '72px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(180deg, rgba(255,157,66,0.12), rgba(255,157,66,0.06))', boxShadow: '0 6px 20px rgba(255,157,66,0.08) inset', flexShrink: 0}}>
                <div style={{width: '52px', height: '52px', borderRadius: '10px', background: '#FF9D42', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, boxShadow: '0 6px 18px rgba(255,157,66,0.18)'}}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2l7 3v5c0 5-3.6 9.8-7 11-3.4-1.2-7-6-7-11V5l7-3z" fill="currentColor"></path>
                  </svg>
                </div>
              </div>
              <div style={{flex: 1}}>
                <h3 style={{fontWeight: 700, margin: 0, fontSize: '16px', color: '#0F1724'}}>24/7 Security & Monitoring</h3>
                <p style={{margin: '6px 0 0', color: '#6B7280', fontSize: '14px'}}>Your items are guarded with CCTV, access control and secure storage monitoring.</p>
              </div>
            </div>

            {/* Card 3 */}
            <div style={{display: 'flex', alignItems: 'center', gap: '16px', background: '#FFFFFF', borderRadius: '16px', padding: '18px', boxShadow: '0 6px 18px rgba(16,24,40,0.08)', border: '1px solid rgba(11,21,48,0.04)', transition: 'transform .18s ease, box-shadow .18s ease'}} className="feature-card-hover">
              <div style={{minWidth: '72px', minHeight: '72px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(180deg, rgba(255,157,66,0.12), rgba(255,157,66,0.06))', boxShadow: '0 6px 20px rgba(255,157,66,0.08) inset', flexShrink: 0}}>
                <div style={{width: '52px', height: '52px', borderRadius: '10px', background: '#FF9D42', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, boxShadow: '0 6px 18px rgba(255,157,66,0.18)'}}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M3 7h11v8H3z" fill="currentColor" opacity="0.14"></path>
                    <path d="M16 11h4l1 3h-5z" fill="currentColor"></path>
                    <circle cx="7.5" cy="18.5" r="1.5" fill="white"></circle>
                    <circle cx="18.5" cy="18.5" r="1.5" fill="white"></circle>
                  </svg>
                </div>
              </div>
              <div style={{flex: 1}}>
                <h3 style={{fontWeight: 700, margin: 0, fontSize: '16px', color: '#0F1724'}}>Real-Time Tracking</h3>
                <p style={{margin: '6px 0 0', color: '#6B7280', fontSize: '14px'}}>Know where your items are at all times with our live tracking system.</p>
              </div>
            </div>

            {/* Card 4 - Transport & Flexible Pricing */}
            <div style={{display: 'flex', alignItems: 'center', gap: '16px', background: '#FFFFFF', borderRadius: '16px', padding: '18px', boxShadow: '0 6px 18px rgba(16,24,40,0.08)', border: '1px solid rgba(11,21,48,0.04)', transition: 'transform .18s ease, box-shadow .18s ease'}} className="feature-card-hover">
              <div style={{minWidth: '72px', minHeight: '72px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(180deg, rgba(255,157,66,0.12), rgba(255,157,66,0.06))', boxShadow: '0 6px 20px rgba(255,157,66,0.08) inset', flexShrink: 0}}>
                <div style={{width: '52px', height: '52px', borderRadius: '10px', background: '#FF9D42', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, boxShadow: '0 6px 18px rgba(255,157,66,0.18)'}}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M3 3h9l9 9-9 9-9-9V3z" fill="currentColor" opacity="0.14"></path>
                    <circle cx="8" cy="8" r="1.5" fill="white"></circle>
                    <path d="M12 12l6 6" stroke="white" strokeWidth="2" strokeLinecap="round"></path>
                  </svg>
                </div>
              </div>
              <div style={{flex: 1}}>
                <h3 style={{fontWeight: 700, margin: 0, fontSize: '16px', color: '#0F1724'}}>Transport & Flexible Pricing</h3>
                <p style={{margin: '6px 0 0', color: '#6B7280', fontSize: '14px'}}>Affordable delivery options with transparent pricing that fits your budget.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .feature-card-hover:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(16,24,40,0.10) !important;
        }
        @media (max-width: 880px) {
          .why-choose-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
