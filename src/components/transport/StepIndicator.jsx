export default function StepIndicator({ currentStep }) {
  const steps = [{ num: 1, label: 'Location' }, { num: 2, label: 'Vehicle' }, { num: 3, label: 'Payment' }];
  
  return (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', margin: '12px 0 20px' }}>
      {steps.map((step, idx) => (
        <>
          <div key={step.num} style={{ display: 'flex', gap: '10px', alignItems: 'center', fontSize: '13px', color: '#6b7280' }}>
            <div style={{
              width: '30px', height: '30px', borderRadius: '50%', display: 'inline-grid', placeItems: 'center', fontWeight: '700', fontSize: '13px',
              background: currentStep > step.num ? '#ecfdf5' : (currentStep === step.num ? 'linear-gradient(180deg,#FC9E3B,#e8891a)' : '#eef2f7'),
              color: currentStep > step.num ? '#16a34a' : (currentStep === step.num ? '#fff' : '#94a3b8'),
              border: currentStep > step.num ? '1px solid rgba(22,163,74,0.08)' : 'none',
              boxShadow: currentStep === step.num ? '0 6px 14px rgba(252,158,59,0.25)' : 'none'
            }}>{currentStep > step.num ? '✓' : step.num}</div>
            <div>{step.label}</div>
          </div>
          {idx < steps.length - 1 && <div style={{ height: '2px', width: '36px', background: '#eef2f7', borderRadius: '4px' }}></div>}
        </>
      ))}
    </div>
  );
}
