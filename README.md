# Price Checker PWA

This folder contains the Progressive Web App (PWA) for offline price checking.

## Files Structure:
- **index.html** - Main PWA application page
- **manifest.json** - PWA configuration (makes app installable)
- **service-worker.js** - Enables offline functionality and caching
- **data.json** - Dynamic price data (updated from main application)
- **icon-192.png** - App icon 192x192 (required for PWA)
- **icon-512.png** - App icon 512x512 (required for PWA)
- **PriceChecker.html** - Legacy template (kept for reference)

## Configuration (Web.config):

```xml
<add key="PriceChecker.UseExternalPWA" value="false" />
<add key="PriceChecker.ExternalPWAUrl" value="https://your-domain.com/price-checker/" />
<add key="PriceChecker.LocalPWAPath" value="~/OfflineContent/" />
```

### Local Mode (Current):
- Set `UseExternalPWA` = **false**
- PWA runs from `~/OfflineContent/`
- URL: `http://your-server/OfflineContent/index.html`

### External Mode (Future):
- Set `UseExternalPWA` = **true**
- PWA hosted on separate server (e.g., GitHub Pages, Netlify)
- Update `ExternalPWAUrl` with your PWA hosting URL
- Can add API endpoint for external PWA to fetch data

## How it Works:

1. User clicks "Download" button on login page
2. System updates `data.json` with latest prices for selected store
3. User is redirected to PWA (local or external based on config)
4. PWA loads data from `data.json` and works completely offline
5. Service worker caches everything for offline use

## Creating App Icons:

You need to create two icon files:
- **icon-192.png**: 192x192 pixels
- **icon-512.png**: 512x512 pixels

Use any image editor or online tool (e.g., https://icon.kitchen/)

## Mobile Installation:

1. Open the PWA URL in mobile browser (Chrome/Edge/Safari)
2. Browser shows "Install App" prompt
3. Tap Install
4. App appears on home screen
5. Works completely offline after installation

## External Hosting Setup (Future):

### Option 1: GitHub Pages (Free)
1. Create new repo: `price-checker-pwa`
2. Upload all OfflineContent files
3. Enable GitHub Pages
4. Update Web.config with GitHub Pages URL

### Option 2: Netlify/Vercel (Free)
1. Sign up for free account
2. Deploy OfflineContent folder
3. Get HTTPS URL
4. Update Web.config

### API Integration for External Hosting:
If hosting externally, the PWA can call:
`GET /Login/GetPriceData?storeId={id}`
to fetch latest data from main server.

## Benefits:

✅ Works completely offline
✅ Installable as native app
✅ No download required - just redirect
✅ Single data.json file updated
✅ Future-ready for external hosting
✅ Auto-updates when online
✅ Fast and lightweight
