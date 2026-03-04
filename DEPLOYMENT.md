# Deployment Guide - Price Checker PWA

## 🏠 Current Setup (Local Hosting)

The PWA is currently configured to run on the same server as your main application.

### Configuration:
```xml
<add key="PriceChecker.UseExternalPWA" value="false" />
```

### Access URL:
```
http://your-server/OfflineContent/index.html
```

### Workflow:
1. User logs into retail system
2. Selects store and clicks "Download"
3. System updates `/OfflineContent/data.json`
4. Redirects to `/OfflineContent/index.html`
5. PWA opens in browser

---

## 🌐 Future External Hosting

When you're ready to host the PWA on a separate server for better performance and scalability:

### Step 1: Generate App Icons
1. Open `/OfflineContent/generate-icons.html` in browser
2. Download both `icon-192.png` and `icon-512.png`
3. Save them in `/OfflineContent/` folder

### Step 2: Choose Hosting Provider

#### Option A: GitHub Pages (Recommended - FREE)
**Pros:** Free, automatic HTTPS, fast CDN, easy updates
**Cons:** Public repository (unless GitHub Pro)

**Setup:**
1. Create new GitHub repo: `price-checker-pwa`
2. Upload all files from `/OfflineContent/`:
   - index.html
   - manifest.json
   - service-worker.js
   - data.json (template)
   - icon-192.png
   - icon-512.png
   - .htaccess (optional)

3. Enable GitHub Pages:
   - Repo Settings → Pages
   - Source: main branch / root folder
   - Save

4. Your PWA URL: `https://username.github.io/price-checker-pwa/`

#### Option B: Netlify (Easy - FREE)
**Pros:** Free, drag-and-drop, instant HTTPS, custom domain
**Cons:** None for basic use

**Setup:**
1. Sign up at https://netlify.com
2. Drag `/OfflineContent/` folder to Netlify dashboard
3. Get instant HTTPS URL: `https://your-app-name.netlify.app`

#### Option C: Vercel (Fast - FREE)
**Pros:** Fast, free, automatic HTTPS
**Cons:** Primarily for Node.js apps

**Setup:**
1. Sign up at https://vercel.com
2. Import GitHub repo or upload folder
3. Get HTTPS URL: `https://your-app.vercel.app`

#### Option D: Your Own Server
**Pros:** Full control, privacy
**Cons:** Need to manage server, SSL certificates

**Requirements:**
- Web server (Apache/Nginx)
- HTTPS enabled (required for PWA)
- Static file hosting

### Step 3: Update Web.config

After hosting externally:

```xml
<add key="PriceChecker.UseExternalPWA" value="true" />
<add key="PriceChecker.ExternalPWAUrl" value="https://your-chosen-url.com/" />
```

### Step 4: Data Sync Options

#### Option A: Manual Upload (Simple)
- Export data.json from main server
- Upload to hosting provider
- User downloads in PWA

#### Option B: API Integration (Automatic)
External PWA calls your server API:
```
GET https://your-main-server.com/Login/GetPriceData?storeId=1
```

**Enable CORS in Web.config:**
```xml
<system.webServer>
  <httpProtocol>
    <customHeaders>
      <add name="Access-Control-Allow-Origin" value="https://your-pwa-url.com" />
      <add name="Access-Control-Allow-Methods" value="GET, POST, OPTIONS" />
      <add name="Access-Control-Allow-Headers" value="Content-Type" />
    </customHeaders>
  </httpProtocol>
</system.webServer>
```

**Update index.html to fetch from API:**
```javascript
// In external PWA, change data.json fetch to:
fetch('https://your-main-server.com/Login/GetPriceData?storeId=' + storeId)
    .then(response => response.json())
    .then(data => { /* ... */ });
```

---

## 📱 Testing Guide

### Local Testing (Before External Hosting):

1. **Build and run application**
   ```
   F5 in Visual Studio
   ```

2. **Test on Desktop:**
   - Login to retail system
   - Select store
   - Click "Download" button
   - Should redirect to PWA
   - Test price checking

3. **Test on Mobile (Same Network):**
   - Find your local IP (e.g., 192.168.1.100)
   - On mobile, open: `http://192.168.1.100:port/OfflineContent/index.html`
   - Test functionality
   - Try installing as PWA

### Testing PWA Installation:

1. Open PWA URL in mobile browser
2. Look for "Add to Home Screen" prompt
3. Or tap browser menu → "Install App"
4. App icon appears on home screen
5. Open from home screen (runs like native app)

### Testing Offline Mode:

1. Install PWA on mobile
2. Turn on Airplane Mode
3. Open app from home screen
4. Should work completely offline
5. Test price checking

---

## 🔄 Update Workflow

### Current (Local Hosting):
1. User opens retail system
2. Clicks "Download" button
3. System updates data.json
4. Opens PWA with fresh data

### Future (External Hosting):
1. User opens retail system
2. Clicks "Download" button
3. Option A: System updates data.json, uploads to hosting
4. Option B: PWA fetches from API when opened
5. User redirected to external PWA URL

---

## 📊 Migration Checklist

When ready to move to external hosting:

- [ ] Generate app icons (icon-192.png, icon-512.png)
- [ ] Choose hosting provider
- [ ] Upload PWA files
- [ ] Test PWA on hosting provider
- [ ] Verify HTTPS is working
- [ ] Test PWA installation on mobile
- [ ] Update Web.config with external URL
- [ ] Test redirect from main app
- [ ] (Optional) Setup API integration with CORS
- [ ] (Optional) Setup automated data sync
- [ ] Test offline functionality
- [ ] Train users on new workflow

---

## 🎯 Benefits of External Hosting

1. **Performance:** PWA served from CDN, faster load times
2. **Scalability:** No load on main server
3. **Reliability:** PWA available even if main server is down
4. **Updates:** Can update PWA independently
5. **Cost:** Free hosting options available
6. **Mobile-First:** Optimized delivery for mobile devices
7. **Security:** HTTPS enforced by hosting providers

---

## 📞 Support

If you encounter issues:

1. Check browser console for errors (F12)
2. Verify Web.config settings
3. Test with sample data from test-data-generator.html
4. Ensure icons are present
5. Check service worker registration
6. Verify HTTPS on production

---

## 🚀 Quick Start (Right Now)

Want to test immediately?

1. **Generate test icons:**
   - Open `generate-icons.html`
   - Download both icons
   - Save in OfflineContent folder

2. **Generate test data:**
   - Open `test-data-generator.html`
   - Download `data.json`
   - Replace existing `data.json`

3. **Test locally:**
   - Run application (F5)
   - Navigate to: `http://localhost:port/OfflineContent/index.html`
   - Test price checking

4. **Test on mobile:**
   - Find your PC's local IP
   - On mobile: `http://your-ip:port/OfflineContent/index.html`
   - Try installing as PWA

That's it! You now have a working PWA that can be hosted anywhere.
