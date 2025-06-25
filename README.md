# Picsum Image Gallery

A modern and responsive image gallery application built with **Next.js**, **Tailwind CSS**, and the **Picsum Photos API**. This project demonstrates best practices in frontend development, including infinite scroll, modal views, and robust error handling.

## 🚀 Features Implemented

### ✅ Responsive Grid Layout
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3 columns
- Consistent `gap-6` (1.5rem) spacing between images

### 🔄 Infinite Scroll Loading
- Images are loaded dynamically as the user scrolls
- Automatically fetches 9 new images per page
- Efficient scroll event handling to prevent performance issues

### 🖼️ Modal View on Image Click
- Clicking an image opens a full-screen modal with a larger version
- Shows image details: author, ID, and dimensions

### ✨ Smooth Open/Close Animations
- Uses `useState` and `useEffect` with CSS transitions
- Modal can be closed by:
  - Clicking the "X" button
  - Clicking on the overlay
  - Pressing the Escape key

### 🔒 Scroll Lock and Modal Scrollability
- Prevents background scrolling when modal is open
- Modal itself scrolls if content overflows

### ⏳ Loading States & Animations
- A loading spinner shows while new images are fetched

### 🛡️ Robust Error Handling
- Displays errors when the API fails (network/server issues)
- Handles edge cases like no images found

### 🌐 API Integration
- Uses the [Picsum Photos API](https://picsum.photos/) for high-quality placeholder images
- No API key required

---

## 🛠️ Setup Instructions

### 1. Prerequisites
Ensure you have Node.js installed. You may use `npm`, `yarn`, or `pnpm`.

### 2. Clone the Repository
```bash
git clone https://github.com/godman32770/ImageGallery.git
```

### 3. Navigate to the Project Directory
```bash
cd ImageGallery
```

### 4. Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```


---

## 🏃 How to Run the Project

Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Then open [http://localhost:3000](http://localhost:3000) to view the gallery.

---

Feel free to explore the code and extend its functionality!
