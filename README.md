# 🏠 HomeAI Canada

A cutting-edge real estate platform combining interactive property search with AI-powered assistance to revolutionize home buying in Canada. Built with Next.js 13+, React, and TypeScript, featuring real-time property data and intelligent chat support.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-13+-black)
![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)

## ✨ Features

- **Interactive Property Map** 
  - Real-time property markers
  - Custom filtering by price/beds/baths
  - Detailed property cards on click

- **AI Chat Assistant**
  - Property-specific inquiries
  - Market insights and advice
  - Natural language search
  - Conversation history

- **Advanced Search**
  - Multi-parameter filtering
  - Save search preferences
  - Real-time results

## 🛠 Tech Stack

- **Frontend Framework**: Next.js 13+
- **Language**: TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Map Integration**: Leaflet with OpenStreetMap
- **AI Integration**: Groq AI
- **State Management**: React Hooks

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn
- Git

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/homeai-canada.git
cd homeai-canada
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env.local
```

4. Add your API keys to `.env.local`:
```plaintext
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
GROQ_API_KEY=your_groq_api_key
```

5. Start the development server
```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GROQ_API_KEY` | Groq AI API key for chat functionality | Yes |
| `NEXT_PUBLIC_MAPBOX_TOKEN` | Mapbox token for map visualization | No |

## 📁 Project Structure

```
homeai-canada/
├── app/
│   ├── api/
│   │   └── chat/
│   ├── components/
│   │   ├── AiChat.tsx
│   │   ├── PropertyMap.tsx
│   │   └── SearchFilters.tsx
│   ├── layout.tsx
│   └── page.tsx
├── public/
│   └── assets/
├── styles/
│   └── globals.css
└── types/
    └── index.ts
```

## 🖥 Core Components

### PropertyMap
```typescript
interface PropertyMapProps {
  properties: Property[];
  onPropertySelect: (property: Property) => void;
}
```

### AiChat
```typescript
interface AiChatProps {
  selectedProperty?: Property;
  isOpen: boolean;
  onClose: () => void;
}
```

## 🔄 API Routes

### Chat Endpoint
- **Route**: `/api/chat`
- **Method**: POST
- **Body**:
```typescript
{
  message: string;
  propertyContext?: {
    id: string;
    address: string;
    price: number;
  };
}
```

## 📝 Scripts

```bash
# Development
npm run dev

# Build
npm run build

# Production
npm start

# Type checking
npm run type-check

# Linting
npm run lint
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
```bash
git checkout -b feature/AmazingFeature
```
3. Commit your changes
```bash
git commit -m 'Add some AmazingFeature'
```
4. Push to the branch
```bash
git push origin feature/AmazingFeature
```
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenStreetMap for map data
- shadcn/ui for UI components
- Groq AI for chat capabilities

## 📮 Contact

Project Link: [[https://github.com/yourusername/homeai-canada](https://github.com/SAMUR274/houseWise_1.git)]([https://github.com/yourusername/homeai-canada](https://github.com/SAMUR274/houseWise_1.git))

---

Built with ❤️ by [Your Name]
