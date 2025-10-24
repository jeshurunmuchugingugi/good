# Header and Hero Section Components

This document describes the new responsive header and hero section components created for the logistics and storage company website.

## Components Created

### 1. Header.jsx
A sticky navigation header with:
- Logo on the left ("LOGISTICS & STORAGE")
- Center navigation links (Home, Services, Storage, Resources, More)
- Right-side buttons ("Book Transport" link and "Rent A Unit" button)
- Responsive design that adapts to mobile screens

### 2. HeroSection.jsx
A hero section with:
- Light beige background (#FFF4E6)
- Left side text content with heading and call-to-action buttons
- Right side image with floating info cards
- Fully responsive layout

### 3. HomePage.jsx
A main component that combines Header and HeroSection

### 4. Demo.jsx
A demo component showing how to use the new components

## Features

### Responsive Design
- Mobile-first approach
- Sticky header that remains visible on scroll
- Responsive grid layout for hero section
- Floating cards adjust position and size on different screens

### Styling
- Uses TailwindCSS for all styling
- Orange color scheme (#f97316 / orange-500)
- Subtle shadows and hover effects
- Smooth transitions

### Icons
- Uses lucide-react icons (Clock, Shield, MessageCircle)
- Properly sized and colored icons

## Usage

### Basic Usage
```jsx
import HomePage from './components/HomePage';

function App() {
  return <HomePage />;
}
```

### Individual Components
```jsx
import Header from './components/Header';
import HeroSection from './components/HeroSection';

function CustomPage() {
  return (
    <div>
      <Header />
      <HeroSection />
      {/* Your other content */}
    </div>
  );
}
```

### Integration with Existing App
To use the new components in the existing app, navigate to the 'home' page:
```jsx
// In your navigation logic
navigate('home');
```

## Customization

### Colors
The orange color can be customized by changing the Tailwind classes:
- `bg-orange-500` → `bg-blue-500` (for blue theme)
- `border-orange-200` → `border-blue-200`
- `text-orange-500` → `text-blue-500`

### Content
- Update the logo text in `Header.jsx`
- Modify the heading and description in `HeroSection.jsx`
- Replace the placeholder image URL with your actual image
- Customize the floating card content and icons

### Layout
- Adjust spacing using Tailwind spacing classes (`p-4`, `m-8`, etc.)
- Modify grid layouts (`lg:grid-cols-2`)
- Change responsive breakpoints (`md:`, `lg:`, `xl:`)

## Dependencies

- React 18+
- TailwindCSS
- lucide-react (for icons)

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Responsive design works on all screen sizes

## Performance

- Optimized images with proper sizing
- Minimal CSS with Tailwind's utility classes
- Smooth transitions without performance impact
- Lazy loading ready (can be added to images)