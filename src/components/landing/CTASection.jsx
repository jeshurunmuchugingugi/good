import { Button } from '../ui/button';

export default function CTASection({ onNavigate }) {
  return (
    <section className="py-20 bg-blue-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl text-white mb-6">Ready to Store with JESH?</h2>
        <p className="text-xl text-blue-100 mb-8">Join hundreds of satisfied customers who trust us with their belongings</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" variant="secondary" onClick={() => onNavigate('units')} className="text-lg px-8">View Available Units</Button>
          <Button size="lg" variant="outline" onClick={() => onNavigate('auth')} className="text-lg px-8 bg-white text-blue-600 hover:bg-gray-100">Create Account</Button>
        </div>
      </div>
    </section>
  );
}
