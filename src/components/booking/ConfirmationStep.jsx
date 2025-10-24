export default function ConfirmationStep({ formData, paymentData, unit }) {
  return (
    <>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Confirm Payment</h2>
      <p className="text-gray-600 mb-8">Review your details and confirm payment</p>
      
      <div className="space-y-4 bg-gray-50 p-6 rounded-lg">
        <div className="flex justify-between">
          <span className="font-medium">Name:</span>
          <span>{formData.fullName}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Email:</span>
          <span>{formData.email}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Payment Method:</span>
          <span className="capitalize">{paymentData.method}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Unit:</span>
          <span>{unit?.unit_number}</span>
        </div>
        <div className="flex justify-between font-bold text-lg">
          <span>Total Amount:</span>
          <span style={{color: '#FC9E3B'}}>Ksh. {unit?.monthly_price?.toLocaleString()}</span>
        </div>
      </div>
    </>
  );
}
