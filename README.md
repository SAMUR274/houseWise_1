# HouseWise 🏠

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-13+-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)

> A modern real estate platform combining interactive property mapping with AI assistance for the Canadian market.

## ✨ Features

- **Interactive Property Map**
  - 🗺️ Real-time property visualization
  - 🏷️ Dynamic price markers
  - 🔍 Area-based search
  - 📱 Responsive design

- **AI Chat Assistant**
  - 🤖 Property-specific insights
  - 💬 Real-time market advice
  - 📝 Search history
  - 🔄 Context-aware responses

- **Advanced Search**
  - 🎯 Multi-parameter filtering
  - 💾 Save search preferences
  - ⚡ Real-time updates
  - 📊 Price analytics

## 🚀 Quick Start

### Prerequisites

```bash
node >= 18.0.0
npm >= 9.0.0
```

### Installation

1. Clone the repo
```bash
git clone https://github.com/SAMUR274/houseWise_1.git
cd houseWise_1
```

2. Install NPM packages
```bash
npm install
```

3. Create environment file
```bash
cp .env.example .env.local
```

4. Add your environment variables
```env
GROQ_API_KEY=your_groq_api_key
```

5. Start development server
```bash
npm run dev
```

## 🛠️ Built With

- [Next.js 13+](https://nextjs.org/) - React Framework
- [TypeScript](https://www.typescriptlang.org/) - Programming Language
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - UI Components
- [Leaflet](https://leafletjs.com/) - Mapping Library
- [Groq](https://groq.com/) - AI Integration

## 📁 Project Structure

```
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts
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

## 🔧 Core Components

### PropertyMap Component

```typescript
interface PropertyMapProps {
  properties: Property[];
  onPropertySelect: (property: Property) => void;
}
```

### AiChat Component

```typescript
interface AiChatProps {
  selectedProperty?: Property;
  isOpen: boolean;
  onClose: () => void;
}
```

## 📡 API Endpoints

### Chat API

**Endpoint:** `/api/chat`  
**Method:** POST  
**Body:**
```typescript
{
  message: string;
  propertyContext?: {
    id: string;
    address: string;
    price: number;
  }
}
```

## 📜 Available Scripts

```bash
# Development
npm run dev

# Build
npm run build

# Production
npm start

# Linting
npm run lint
```

## 🤝 Contributing

1. Fork the Project
2. Create your Feature Branch
```bash
git checkout -b feature/AmazingFeature
```
3. Commit your Changes
```bash
git commit -m 'Add some AmazingFeature'
```
4. Push to the Branch
```bash
git push origin feature/AmazingFeature
```
5. Open a Pull Request

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

## 👥 Project Links

- Repository: [https://github.com/SAMUR274/houseWise_1.git](https://github.com/SAMUR274/houseWise_1.git)
- Issues: [https://github.com/SAMUR274/houseWise_1/issues](https://github.com/SAMUR274/houseWise_1/issues)

## 🙏 Acknowledgments

* [OpenStreetMap](https://www.openstreetmap.org/) for map data
* [shadcn/ui](https://ui.shadcn.com/) for UI components
* [Groq](https://groq.com/) for AI capabilities

---

<p align="center">Made with ❤️ in Canada</p>
