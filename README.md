# Personal Website

A clean, modern personal website built with vanilla HTML, CSS, and JavaScript.

## Getting Started

### Local Development

Simply open `index.html` in your web browser:

```bash
open index.html
```

Or use a local server for the best development experience:

```bash
# Using Python 3
python3 -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js (if you have http-server installed)
npx http-server
```

Then visit `http://localhost:8000` in your browser.

## Project Structure

```
.
├── index.html      # Main HTML file
├── styles.css      # Stylesheet
├── script.js       # JavaScript functionality
├── README.md       # This file
└── CLAUDE.md       # AI assistant guidance
```

## Customization

### Personal Information

Edit `index.html` and update:
- Page title in `<title>` tag
- Your name in the hero section
- Subtitle/tagline
- About section content
- Project cards with your actual projects
- Contact links (email, GitHub, LinkedIn, Twitter)
- Footer text

### Styling

Customize the look in `styles.css`:
- Colors: Modify CSS variables in `:root`
- Fonts: Change the `font-family` in the `body` selector
- Layout: Adjust padding, margins, and grid settings
- Responsive breakpoints: Modify media queries

### Color Scheme

The site uses CSS variables for easy theming. Update these in `styles.css`:

```css
:root {
    --primary-color: #2563eb;    /* Main accent color */
    --text-primary: #1f2937;     /* Main text color */
    --text-secondary: #6b7280;   /* Secondary text */
    --bg-primary: #ffffff;        /* Main background */
    --bg-secondary: #f9fafb;     /* Alternate background */
    --border-color: #e5e7eb;     /* Borders */
}
```

## Deployment

This site can be deployed to any static hosting service:

- **GitHub Pages**: Push to a GitHub repo and enable Pages
- **Netlify**: Drag and drop the folder or connect your repo
- **Vercel**: Import your project or use Vercel CLI
- **Cloudflare Pages**: Connect your repo or use direct upload

## License

MIT License - feel free to use this template for your own personal website.
