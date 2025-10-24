export default function StepCard({ step, icon: Icon, title, description, image }) {
  return (
    <div className="p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow" style={{backgroundColor: '#FFFFFF', border: '2px solid #FEC373'}}>
      <div className="mb-6">
        <img src={image} alt={title} className="w-full h-48 object-cover rounded-lg" />
      </div>
      <h3 className="text-2xl mb-2" style={{color: '#FB8B27'}}>Step {step}</h3>
      <div className="flex items-center mb-3">
        <Icon className="w-5 h-5 text-gray-700 mr-2" />
        <h4 className="text-xl text-gray-900 font-semibold">{title}</h4>
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
