# ME API Playground

A full-stack portfolio management web application where you can store and display personal profile data with a MongoDB backend API and a responsive frontend interface.

**Built by:** Kapil Meena | **School:** NIT Delhi (CSE) | **Portfolio:** [kapill09.github.io](https://kapill09.github.io/Portfolio/)

---

## Features

✅ Backend API - Express.js with MongoDB  
✅ Profile Management - Create, read, update profile  
✅ Search Functionality - Search by name, skills, projects  
✅ Skill-based Filtering - Filter projects by technology  
✅ Skills Analytics - View skills ranked by project usage  
✅ Dark Theme UI - Modern, eye-friendly interface  
✅ Responsive Design - Works on desktop and mobile  
✅ RESTful API - 7 well-designed endpoints  
✅ Error Handling - Comprehensive error middleware  
✅ No Dependencies - Vanilla HTML/CSS/JS frontend  

---

## Project Structure

```
me-api-playground/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js              # MongoDB connection
│   │   ├── controllers/
│   │   │   └── profileController.js     # 7 API endpoints
│   │   ├── middlewares/
│   │   │   └── errorHandler.js          # Error handling
│   │   ├── models/
│   │   │   └── Profile.js               # MongoDB schema
│   │   ├── routes/
│   │   │   └── profileRoutes.js         # Route definitions
│   │   └── server.js                    # Express server
│   ├── .env                             # Environment variables
│   ├── package.json                     # Dependencies
│   └── schema.md                        # Database schema docs
├── frontend/
│   ├── index.html                       # Main UI
│   ├── app.js                           # Frontend logic
│   └── style.css                        # Dark theme styling
└── README.md                            # This file
```

---

## Tech Stack

| Category | Technology |
|----------|------------|
| **Backend** | Node.js, Express.js, MongoDB, Mongoose |
| **Frontend** | HTML5, CSS3, JavaScript (Vanilla) |
| **Database** | MongoDB Atlas (Cloud) |
| **Deployment Ready** | Vercel, Railway, Heroku |

---

## Quick Start (5 minutes)

### Prerequisites

- **Node.js** v16+ ([Download](https://nodejs.org/))
- **MongoDB Atlas Account** (Free at [mongodb.com](https://www.mongodb.com/cloud/atlas))
- **Text Editor** (VS Code recommended)

### Step 1: Setup MongoDB (Free)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account
3. Create a **Free Cluster** (AWS, US region)
4. Create database user (save credentials)
5. Add your IP to **Network Access** (use `0.0.0.0/0` for development)
6. Click **Connect** → **Drivers** → Copy connection string

### Step 2: Setup Backend

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file with:
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/me-api?retryWrites=true&w=majority
NODE_ENV=development

# Start backend
npm run dev
```

**Expected output:**
```
✅ MongoDB Connected: cluster0.xyz.mongodb.net
✅ Server running on http://localhost:5000
```

### Step 3: Start Frontend

**Option A - Live Server (Recommended):**
1. Install VS Code extension: **Live Server**
2. Right-click `frontend/index.html` → "Open with Live Server"
3. Browser opens at `http://localhost:5500`

**Option B - Direct:**
- Double-click `frontend/index.html` to open in browser

### Step 4: Test the App

1. ✅ Click **"Create Sample Profile"** (loads Kapil's data)
2. ✅ Click **"Load Profile"** (displays all sections)
3. ✅ Try **Search**: Type "React" and click Search
4. ✅ Try **Filter**: Search for "Python", "JavaScript", etc.

---

## API Endpoints

### 1. Health Check
```http
GET /health
```

### 2. Profile Management

**Create Profile**
```http
POST /api/profile
```

**Get Profile**
```http
GET /api/profile
```

**Update Profile**
```http
PUT /api/profile
```

**Delete Profile**
```http
DELETE /api/profile
```

### 3. Search & Filter

**Get Projects by Skill**
```http
GET /api/projects?skill=React
```

**Search Profile**
```http
GET /api/search?q=javascript
```

**Get Top Skills**
```http
GET /api/skills/top
```

### Request/Response Examples

**Create Profile Request:**
```json
POST /api/profile

{
  "name": "Kapil Meena",
  "email": "231210056@nitdelhi.ac.in",
  "education": [
    {
      "college": "NIT Delhi",
      "degree": "BTech CSE",
      "year": "2027"
    }
  ],
  "skills": ["JavaScript", "React", "Python", "Node.js"],
  "projects": [
    {
      "title": "Phalfresh",
      "description": "Fruit freshness detection app",
      "techStack": ["React", "TypeScript", "TailwindCSS"],
      "github": "https://github.com/Kapill09/Phalfresh",
      "live": ""
    }
  ],
  "links": {
    "github": "https://github.com/Kapill09",
    "linkedin": "https://www.linkedin.com/in/kapil-meena-b4884a313/",
    "portfolio": "https://kapill09.github.io/Portfolio/"
  }
}
```

**Create Profile Response:**
```json
{
  "status": "success",
  "message": "Profile created",
  "data": { /* profile object */ }
}
```

---

## Frontend Features

### Main Buttons
| Button | Function |
|--------|----------|
| Load Profile | Fetch profile from backend |
| Create Sample Profile | Load sample data (Kapil's profile) |
| Delete Profile | Remove current profile |
| Search | Search across profile data |

### Display Sections
- **Profile Card** - Name, email, links (GitHub, LinkedIn, Portfolio)
- **Education** - School, degree, graduation year
- **Skills** - List of technical skills
- **Projects** - Project cards with tech stack and links
- **Search Results** - Categorized matching results

### UI Features
- Dark Theme - Easy on the eyes (cyan + dark gray)
- Responsive - Mobile, tablet, desktop
- Real-time Search - Instant results
- Smooth Animations - Professional feel
- Full Mobile Support - Works everywhere

---

## Database Schema

```javascript
Profile {
  name: String (required),
  email: String (required, validated),
  education: [{
    college: String,
    degree: String,
    year: String
  }],
  skills: [String],
  projects: [{
    title: String,
    description: String,
    techStack: [String],
    github: String,
    live: String
  }],
  links: {
    github: String,
    linkedin: String,
    portfolio: String
  },
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

---

## Sample Profile (Included)

The app comes with **Kapil Meena's** profile:

**Skills:**
- JavaScript, React, TypeScript, Tailwind CSS
- Python, XGBoost, Pandas, NumPy, Matplotlib, Streamlit
- Node.js, MongoDB, HTML, CSS

**Projects:**
1. **Phalfresh** - Fruit freshness detection (React, TypeScript, Tailwind)
2. **Medicare Fraud Detection** - ML fraud detection (Python, XGBoost, Streamlit)
3. **Cafe Finder** - Google Maps café app (JavaScript, CSS, HTML) - [Live](https://cafe-finder-theta.vercel.app/)
4. **API Playground** - This project!

**Links:**
- [GitHub](https://github.com/Kapill09)
- [LinkedIn](https://www.linkedin.com/in/kapil-meena-b4884a313/)
- [Portfolio](https://kapill09.github.io/Portfolio/)
- [Email](mailto:231210056@nitdelhi.ac.in)

---

## Development

### Backend Development

```bash
cd backend

# Install dependencies
npm install

# Run with auto-reload
npm run dev

# Run normally
npm start

# Install new package
npm install package-name
```

### Frontend Development

- Edit `frontend/app.js` for functionality
- Edit `frontend/style.css` for styling
- Edit `frontend/index.html` for structure
- Changes auto-reload with Live Server

### Environment Variables

Create `backend/.env`:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
NODE_ENV=development
```

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| "Profile not found" | Click "Create Sample Profile" first |
| CORS Error | Ensure backend running on port 5000 |
| MongoDB Connection Failed | Check MONGO_URI and credentials in .env |
| Port 5000 in use | Change PORT in .env to 5001 |
| "Cannot find module" | Run `npm install` in backend folder |
| Live Server not working | Install "Live Server" VS Code extension |

---

## Deployment

### Deploy Backend to Railway

1. Push code to GitHub
2. Go to [Railway.app](https://railway.app)
3. Create project → Import GitHub repo
4. Add environment variables (MONGO_URI, PORT)
5. Deploy!

### Deploy Frontend to Vercel

1. Push code to GitHub
2. Go to [Vercel.com](https://vercel.com)
3. Import GitHub repo → Deploy
4. Update API_URL in `app.js` to deployed backend

### Deploy Backend to Heroku

1. Create `Procfile`: `web: node src/server.js`
2. `git push heroku main`
3. Set environment variables on Heroku dashboard

---

## Learning Resources

- [Express.js Official Docs](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Guide](https://mongoosejs.com/docs/guide.html)
- [Fetch API MDN](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [REST API Best Practices](https://restfulapi.net/)
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)

---

## What You'll Learn

This project teaches:
- Full-stack development (frontend & backend)
- RESTful API design
- MongoDB & Mongoose
- Express.js server setup
- Error handling & validation
- CORS configuration
- Fetch API usage
- Responsive web design
- Git version control
- Deployment strategies

---

## License

Open source - Use freely for learning!

---

## About Creator

**Kapil Meena**
- School: National Institute of Technology Delhi (NIT Delhi)
- Major: Computer Science & Engineering (CSE)
- Graduating: 2027
- Location: Delhi, India

**Connect:**
- [GitHub](https://github.com/Kapill09) - @Kapill09
- [LinkedIn](https://www.linkedin.com/in/kapil-meena-b4884a313/)
- [Portfolio](https://kapill09.github.io/Portfolio/)
- Email: 231210056@nitdelhi.ac.in

---

## Acknowledgments

- MongoDB - Free cloud database
- Express.js - Web framework
- Node.js - Runtime environment
- All open-source contributors - Making development easier

---

## Support

Having issues? Check the Troubleshooting section above or contact:
- Email: 231210056@nitdelhi.ac.in
- GitHub Issues: [Create Issue](https://github.com/Kapill09/me-api-playground/issues)

---

If this project helped you, please star the repository!

Made with love by Kapil Meena

Happy Coding!

