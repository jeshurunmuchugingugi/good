import { useState } from 'react';
import Header from './transport/Header';
import StepIndicator from './transport/StepIndicator';
import LocationStep from './transport/LocationStep';
import VehicleStep from './transport/VehicleStep';
import PaymentStep from './transport/PaymentStep';
import BookingSummary from './transport/BookingSummary';
import SuccessModal from './transport/SuccessModal';

export default function TransportScheduling({ booking, onNavigate }) {
  const [currentStep, setCurrentStep] = useState(2);
  const [selectedVehicleId, setSelectedVehicleId] = useState('veh-medium');
  const [selectedExtras, setSelectedExtras] = useState({});
  const [itemDescription, setItemDescription] = useState('');
  const [specialRequirements, setSpecialRequirements] = useState('');
  const [pickupDate, setPickupDate] = useState('2024-01-15');
  const [timeSlot, setTimeSlot] = useState('Afternoon (12PM - 5PM)');
  const [contactPerson, setContactPerson] = useState('');
  const [streetAddress, setStreetAddress] = useState('123 Westlands Ave');
  const [city, setCity] = useState('Nairobi');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [bookingReference, setBookingReference] = useState('');

  const distanceKm = 25.3;
  const vehicles = {
    'veh-small': { name: 'Small Van', rate: 50, subtotal: 1265, eta: '35–40 minutes' },
    'veh-medium': { name: 'Medium Truck', rate: 80, subtotal: 2024, eta: '45–50 minutes' },
    'veh-large': { name: 'Large Truck', rate: 120, subtotal: 3036, eta: '55–65 minutes' },
  };

  const selectedVehicle = vehicles[selectedVehicleId];
  const extrasSum = Object.values(selectedExtras).reduce((a, b) => a + b, 0);
  const grandTotal = selectedVehicle.subtotal + extrasSum;

  const handleExtraToggle = (id, fee) => {
    setSelectedExtras(prev => {
      const newExtras = { ...prev };
      if (newExtras[id]) delete newExtras[id];
      else newExtras[id] = fee;
      return newExtras;
    });
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f6f8fb', fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial' }}>
      <Header onNavigate={onNavigate} />
      <main style={{ display: 'flex', justifyContent: 'center', padding: '28px 16px 80px' }}>
        <div style={{ width: '100%', maxWidth: '1200px', display: 'grid', gridTemplateColumns: '1fr 360px', gap: '24px', alignItems: 'start', padding: '0' }}>
          <section style={{ background: '#ffffff', borderRadius: '14px', padding: '22px', boxShadow: '0 10px 30px rgba(12,20,40,0.06)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px' }}>
              <div style={{ fontSize: '20px', fontWeight: '700', display: 'flex', gap: '10px', alignItems: 'center' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ opacity: '.9' }}>
                  <path d="M3 10h13v6H3z" stroke="#0f172a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Book Transport Service
              </div>
              <div style={{ color: '#6b7280', fontSize: '13px' }}>Schedule pickup from your location to our secure storage facility</div>
            </div>
            <StepIndicator currentStep={currentStep} />
            <div style={{ marginTop: '8px' }}>
              {currentStep === 1 && (
                <LocationStep
                  streetAddress={streetAddress}
                  setStreetAddress={setStreetAddress}
                  city={city}
                  setCity={setCity}
                  pickupDate={pickupDate}
                  setPickupDate={setPickupDate}
                  timeSlot={timeSlot}
                  setTimeSlot={setTimeSlot}
                />
              )}
              {currentStep === 2 && (
                <VehicleStep
                  distanceKm={distanceKm}
                  selectedVehicleId={selectedVehicleId}
                  onVehicleSelect={setSelectedVehicleId}
                  selectedExtras={selectedExtras}
                  onExtraToggle={handleExtraToggle}
                  itemDescription={itemDescription}
                  setItemDescription={setItemDescription}
                  specialRequirements={specialRequirements}
                  setSpecialRequirements={setSpecialRequirements}
                  pickupDate={pickupDate}
                  setPickupDate={setPickupDate}
                  timeSlot={timeSlot}
                  setTimeSlot={setTimeSlot}
                  contactPerson={contactPerson}
                  setContactPerson={setContactPerson}
                />
              )}
              {currentStep === 3 && <PaymentStep grandTotal={grandTotal} />}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '18px', gap: '12px' }}>
                {currentStep > 1 && (
                  <button onClick={() => setCurrentStep(currentStep - 1)} style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid #e6eef6', background: 'transparent', color: '#6b7280', fontWeight: '700', cursor: 'pointer' }}>
                    ← Previous
                  </button>
                )}
                <button onClick={() => {
                  if (currentStep < 3) setCurrentStep(currentStep + 1);
                  else { setBookingReference(`SM-${Math.floor(Math.random()*900000+100000)}`); setShowSuccessModal(true); }
                }} style={{ padding: '10px 14px', borderRadius: '10px', border: '0', background: '#FC9E3B', color: '#fff', fontWeight: '700', cursor: 'pointer', marginLeft: currentStep === 1 ? 'auto' : '0' }}>
                  {currentStep === 1 ? 'Next →' : currentStep === 2 ? 'Continue to Payment →' : 'Pay with M-Pesa'}
                </button>
              </div>
            </div>
          </section>
          <BookingSummary distanceKm={distanceKm} selectedVehicle={selectedVehicle} extrasSum={extrasSum} grandTotal={grandTotal} />
        </div>
      </main>
      {showSuccessModal && <SuccessModal bookingReference={bookingReference} onClose={() => setShowSuccessModal(false)} onNavigate={onNavigate} />}
    </div>
  );
}
