# N1 Nail Shop - Luxury Nail Care Website

A minimalistic, modern luxury nail shop website built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- **Modern Design**: Clean, black and white luxury aesthetic with no rounded borders
- **Responsive**: Mobile-first design that works on all devices
- **TypeScript**: Full type safety throughout the application
- **Component Reusability**: Highly modular component architecture
- **Data-Driven**: All content sourced from organized data files
- **Animations**: Smooth Framer Motion animations for enhanced UX
- **SEO Optimized**: Proper meta tags and structured data

## Tech Stack

- **Framework**: Next.js 15.3.4 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Shadcn UI
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Package Manager**: npm

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── about/             # About page
│   ├── gallery/           # Gallery page
│   ├── services/          # Services page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── layout/           # Layout components (Header, Footer)
│   └── ui/               # UI components (Cards, Buttons, etc.)
├── data/                 # All website data
│   ├── about.ts          # About page content
│   ├── gallery.ts        # Gallery items
│   ├── navigation.ts     # Navigation structure
│   ├── services.ts       # Services and pricing
│   └── site.ts           # Site configuration
└── lib/                  # Utility functions
    └── utils.ts          # Shadcn utilities
```

## Data Organization

All content is organized in the `src/data/` directory:

- **site.ts**: Site-wide configuration (name, contact info, social links)
- **navigation.ts**: Navigation menu structure
- **services.ts**: Service categories and individual services with pricing
- **gallery.ts**: Gallery items with categories and tags
- **about.ts**: About page content including team and values

## Components

### Layout Components

- **Header**: Sticky navigation with active state indicators
- **Footer**: Comprehensive footer with contact info and links

### UI Components

- **HeroSection**: Reusable hero section with customizable content
- **ServiceCard**: Service display cards with pricing and features
- **GalleryCard**: Gallery item cards with filtering support

## Pages

1. **Home** (`/`): Landing page with hero, featured services, and gallery preview
2. **Services** (`/services`): Complete service catalog organized by category
3. **Gallery** (`/gallery`): Portfolio with category filtering
4. **About** (`/about`): Company story, mission, values, and team

## Getting Started

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Run the development server**:

   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to `http://localhost:3000`

## Build and Deploy

1. **Build for production**:

   ```bash
   npm run build
   ```

2. **Start production server**:
   ```bash
   npm start
   ```

## Customization

### Adding New Services

Edit `src/data/services.ts` to add new service categories or individual services.

### Updating Gallery

Modify `src/data/gallery.ts` to add new gallery items with appropriate categories and tags.

### Changing Site Information

Update `src/data/site.ts` to modify contact information, social links, and site metadata.

### Styling

The website uses a strict black and white luxury theme. All styling is done through Tailwind CSS classes and custom CSS variables in `src/app/globals.css`.

## Design Principles

- **Minimalism**: Clean, uncluttered design focusing on content
- **Luxury**: Premium feel through typography, spacing, and color choices
- **No Rounded Corners**: Sharp, modern aesthetic
- **Black and White**: High contrast, timeless color scheme
- **Responsive**: Mobile-first approach with progressive enhancement

## Performance

- **Server-Side Rendering**: All pages are server-rendered for optimal SEO
- **Image Optimization**: Next.js Image component for optimized loading
- **Code Splitting**: Automatic code splitting for better performance
- **Minimal Dependencies**: Only essential packages included

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is created for N1 Nail Shop. All rights reserved.
