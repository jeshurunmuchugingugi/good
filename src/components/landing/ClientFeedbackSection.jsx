import { useState } from 'react';
import { ChevronLeft, ChevronRight, MessageCircle, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Sarah Mitchell",
    location: "Happy Resident, Denver",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=400&q=80",
    text: "From start to finish, the process was smooth, transparent, and hassle-free. Clear communication and excellent results made the experience outstanding.",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Johnson",
    location: "Business Owner, Austin",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    text: "Exceptional service! The storage facility is clean, secure, and the staff is incredibly helpful. I've been using their services for over a year now.",
    rating: 5
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    location: "Student, Miami",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80",
    text: "Perfect solution for my storage needs during college. Affordable pricing and convenient location made it the ideal choice for me.",
    rating: 5
  }
];

export default function ClientFeedbackSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentTestimonial = testimonials[currentIndex];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8" style={{backgroundColor: '#FFF8ED'}}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-lg mb-4">
            <MessageCircle className="w-5 h-5" style={{color: '#FC9E3B'}} />
            <span className="font-semibold" style={{color: '#1A2637'}}>CLIENT FEEDBACK</span>
          </div>
          <p className="text-sm uppercase tracking-wider text-gray-600 font-medium">GET TO HEAR CLIENT TESTIMONIALS</p>
        </div>

        {/* Testimonial */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
          {/* Left - Photo */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-80 h-80 rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src={currentTestimonial.image}
                  alt={currentTestimonial.name}
                  className="w-full h-full object-cover transition-all duration-500"
                />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full shadow-lg flex items-center justify-center" style={{backgroundColor: '#FC9E3B'}}>
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          {/* Right - Testimonial */}
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 h-80 flex flex-col justify-center">
            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {[...Array(currentTestimonial.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" style={{color: '#FC9E3B'}} />
              ))}
            </div>
            
            {/* Quote */}
            <div className="mb-6">
              <span className="text-6xl font-serif" style={{color: '#FC9E3B'}}>"</span>
              <p className="text-lg leading-relaxed inline" style={{color: '#1A2637'}}>
                {currentTestimonial.text}
              </p>
            </div>
            
            {/* Author */}
            <div className="border-t pt-6">
              <h4 className="font-bold text-xl mb-1" style={{color: '#1A2637'}}>{currentTestimonial.name}</h4>
              <p className="text-gray-600">— {currentTestimonial.location}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-center items-center gap-6">
          <button 
            onClick={prevTestimonial}
            className="w-14 h-14 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 shadow-lg"
            style={{backgroundColor: '#FC9E3B'}}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          {/* Dots indicator */}
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'scale-125' : 'hover:scale-110'
                }`}
                style={{
                  backgroundColor: index === currentIndex ? '#FC9E3B' : '#D1D5DB'
                }}
              />
            ))}
          </div>
          
          <button 
            onClick={nextTestimonial}
            className="w-14 h-14 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 shadow-lg"
            style={{backgroundColor: '#FC9E3B'}}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
}