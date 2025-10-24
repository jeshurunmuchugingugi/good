# Chatbot Integration Guide

## ✅ Already Integrated!

The Chatbot is already imported and rendered in your `LandingPage.jsx`:

```jsx
import Chatbot from './Chatbot';

export default function LandingPage({ onNavigate }) {
  return (
    <div className="min-h-screen bg-white">
      {/* Other components */}
      <Chatbot />  {/* ← Floating chat widget */}
    </div>
  );
}
```

## 🎨 Features

- **Floating Button**: Bottom-right corner, always visible
- **Fixed Position**: Stays visible while scrolling
- **Smooth Animations**: Slide-in effect when opening
- **Toggle Logic**: Click to open/close
- **Auto-scroll**: Messages scroll automatically
- **Typing Indicator**: Shows bot is "typing"
- **Clean Design**: Modern, minimal Tailwind styling

## 🚀 Usage in Other Pages

To add the chatbot to any other page:

```jsx
import Chatbot from './components/Chatbot';

function AnyPage() {
  return (
    <div>
      {/* Your page content */}
      <Chatbot />
    </div>
  );
}
```

## 🎯 Customization

### Change Colors
Edit the `bg-purple-600` classes in `Chatbot.jsx`:
- Button: Line 35
- Header: Line 45
- User messages: Line 68
- Send button: Line 91

### Change Position
Modify `bottom-6 right-6` classes:
- Button: Line 34
- Chat window: Line 42

### Change Size
Adjust `w-96 h-[500px]` on line 42 for chat window dimensions.

## 📱 Responsive
The chatbot is fully responsive and works on mobile devices.
