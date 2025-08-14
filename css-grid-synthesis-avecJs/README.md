# CSS Grid Learning Platform

A comprehensive educational project featuring interactive demonstrations and structured examples for mastering CSS Grid layout.

## 🎯 Overview

This project provides a hands-on learning experience for CSS Grid through progressive demonstrations, from basic concepts to advanced techniques. Each demo includes interactive elements, code examples, and visual explanations to help understand CSS Grid properties and behaviors.

## ✨ Features

- **Interactive Demonstrations**: Real-time property manipulation with immediate visual feedback
- **Progressive Learning**: Structured from basic concepts (fr units) to advanced topics (alignment, auto-flow)
- **Code Visibility**: Toggle buttons to reveal HTML and CSS implementation details
- **Responsive Design**: Optimized for both desktop and mobile learning
- **Visual Feedback**: Grid lines, colored containers, and animations for better understanding

## 📚 Demo Contents

| Demo | Topic | Description |
|------|-------|-------------|
| **A** | `fr` units | Fractional unit basics and proportional sizing |
| **B** | Fixed + fr + gap | Combining fixed widths with flexible units |
| **C** | Gap properties | Row and column spacing techniques |
| **D** | `minmax()` | Responsive sizing with minimum and maximum constraints |
| **E** | `fit-content()` | Content-based sizing with maximum limits |
| **F** | min/max-content | Intrinsic sizing based on content |
| **G** | Template areas | Named grid areas for semantic layouts |
| **H** | auto-fit vs auto-fill | Dynamic column creation and behavior |
| **I** | auto-flow: column | Automatic item placement strategies |
| **J** | Alignment | **Interactive demo** for justify/align properties |

## 🎮 Interactive Features

### Alignment Demo (Demo J)
The most advanced demonstration featuring:
- **Real-time controls**: Radio buttons for axis selection (justify/align)
- **Target selection**: Switch between items and content alignment
- **Value picker**: Dropdown with all alignment values
- **Live preview**: Immediate visual feedback with grid line visualization
- **Educational explanations**: Context-aware descriptions for each combination

## 🗂 Project Structure

```
css-grid-synthesis-avecJs/
├── index.html              # Main navigation page
├── guide.css              # Comprehensive styling system
├── guide.js               # Interactive functionality
├── README.md              # Project documentation
└── demos/                 # Individual demonstration pages
    ├── fr.html           # A — fr units
    ├── fixed-fr-gap.html # B — Fixed + fr + gap
    ├── gap.html          # C — Gap properties
    ├── minmax.html       # D — minmax() function
    ├── fit-content.html  # E — fit-content() function
    ├── min-max-content.html # F — min/max-content
    ├── template-areas.html  # G — Template areas
    ├── auto-fit-fill.html   # H — auto-fit vs auto-fill
    ├── auto-flow-column.html # I — auto-flow: column
    └── alignment.html    # J — Alignment (interactive)
```

## 🚀 Getting Started

1. **Local Development**: Open `index.html` in your browser
2. **Live Demo**: Visit [GitHub Pages deployment](https://ewingella.github.io/teste-web/)
3. **Navigation**: Use the header navigation or index page to explore demos

## 💡 Learning Path

**Recommended progression for beginners:**

1. Start with **Demo A (fr)** to understand the fundamental unit
2. Progress through **B-C** for layout basics (fixed + flexible + spacing)
3. Explore **D-F** for responsive sizing techniques
4. Learn **G** for semantic layout with template areas
5. Master **H-I** for dynamic and automatic layouts
6. Practice with **J** interactive alignment demo

## 🛠 Technical Implementation

- **Vanilla JavaScript**: No dependencies, pure DOM manipulation
- **CSS Grid**: Modern layout techniques with fallbacks
- **Progressive Enhancement**: Works without JavaScript (static demos)
- **Responsive Design**: Mobile-first approach with flexible layouts

## 🎨 Design System

- **Color-coded demos**: Each demo has distinct visual identity
- **Consistent spacing**: 12px base unit system
- **Typography**: System fonts for optimal readability
- **Animations**: Smooth transitions for code block reveals

## 📱 Browser Support

- Modern browsers with CSS Grid support (2017+)
- Interactive features require JavaScript
- Graceful degradation for older browsers

## 🤝 Contributing

This project serves as an educational resource. Feel free to:
- Fork and adapt for your learning needs
- Suggest improvements for clarity
- Report issues or unclear explanations

## 📄 License

Educational project - free to use and adapt for learning purposes.— Projet de synthèse (avec boutons et animations)

- Ouvrez `index.html` pour naviguer.
- Chaque démo inclut deux boutons : “Voir le code” (HTML) et “Voir le code” (CSS pertinent).
- Les blocs s’ouvrent avec une animation (hauteur/opacity) et un indicateur ▶ / ▼.

Structure :
- index.html
- demos/ (A→J)
- guide.css
- guide.js
