const API_URL = "http://localhost:5000";

const loadProfileBtn = document.getElementById("loadProfileBtn");
const createProfileBtn = document.getElementById("createProfileBtn");
const deleteProfileBtn = document.getElementById("deleteProfileBtn");
const skillSearch = document.getElementById("skillSearch");
const searchBtn = document.getElementById("searchBtn");
const loading = document.getElementById("loading");
const error = document.getElementById("error");

loadProfileBtn.addEventListener("click", loadProfile);
createProfileBtn.addEventListener("click", createSampleProfile);
deleteProfileBtn.addEventListener("click", deleteProfile);
searchBtn.addEventListener("click", searchBySkill);
skillSearch.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    searchBySkill();
  }
});

function showLoading(show = true) {
  loading.style.display = show ? "block" : "none";
}

function showError(message) {
  error.textContent = `❌ ${message}`;
  error.style.display = "block";
  setTimeout(() => {
    error.style.display = "none";
  }, 5000);
}

async function loadProfile() {
  showLoading(true);
  try {
    const response = await fetch(`${API_URL}/api/profile`);
    
    if (!response.ok) {
      if (response.status === 404) {
        showError("No profile found. Create one first!");
      } else {
        showError(`Error: ${response.status}`);
      }
      showLoading(false);
      return;
    }

    const data = await response.json();
    const profile = data.data;

    displayProfile(profile);
    populateSkillFilter(profile);
    showLoading(false);
  } catch (err) {
    showError(`Failed to load profile: ${err.message}`);
    showLoading(false);
  }
}

async function createSampleProfile() {
  showLoading(true);

  const sampleProfile = {
    name: "Kapil Meena",
    email: "231210056@nitdelhi.ac.in",
    education: [
      {
        college: "National Institute of Technology Delhi",
        degree: "BTech Computer Science and Engineering",
        year: "2027",
      },
    ],
    skills: ["JavaScript", "React", "Node.js", "MongoDB", "Python", "AWS"],
    projects: [
      {
        title: "Phalfresh",
        description: "An intelligent app that scans photos of fruits to detect freshness status, estimate shelf life, and identify fruit type using advanced image recognition and ML models",
        techStack: ["React", "TypeScript", "Tailwind CSS", "Machine Learning"],
        github: "https://github.com/Kapill09/Phalfresh",
        live: "https://github.com/Kapill09/Phalfresh",
      },
      {
        title: "Medicare Fraud Detection",
        description: "A machine learning-based system to detect fraudulent Medicare claims submitted by healthcare providers. Uses advanced analytics to identify anomalies, detect high-risk providers, and improve fraud prevention accuracy with explainable ML models",
        techStack: ["Python", "XGBoost", "Pandas", "NumPy", "Matplotlib", "Streamlit", "Scikit-learn"],
        github: "https://github.com/Kapill09",
        live: "",
      },
      {
        title: "Cafe Finder",
        description: "A responsive JavaScript app using Google Maps JavaScript API and Places API to find nearby cafés with advanced filters, photos, distance calculations, and directions. Features offline support by caching last results in localStorage",
        techStack: ["JavaScript", "CSS", "HTML", "Google Maps API"],
        github: "https://github.com/Kapill09",
        live: "https://cafe-finder-theta.vercel.app/",
      },
      {
        title: "API Playground",
        description: "A full-stack personal profile management system with API endpoints. Features profile creation, skill filtering, project search, and top skills analytics",
        techStack: ["Node.js", "Express", "MongoDB", "React", "JavaScript"],
        github: "https://github.com/Kapill09",
        live: "http://localhost:3000",
      },
    ],
    links: {
      github: "https://github.com/Kapill09",
      linkedin: "https://www.linkedin.com/in/kapil-meena-b4884a313/",
      portfolio: "https://kapill09.github.io/Portfolio/",
    },
  };

  try {
    const response = await fetch(`${API_URL}/api/profile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sampleProfile),
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 409) {
        showError("Profile already exists! Use Load Profile or update it.");
      } else {
        showError(data.message || "Failed to create profile");
      }
    } else {
      alert("✅ Sample profile created successfully!");
      loadProfile();
    }
  } catch (err) {
    showError(`Failed to create profile: ${err.message}`);
  }
  showLoading(false);
}

async function deleteProfile() {
  if (!confirm("Are you sure you want to delete the profile?")) {
    return;
  }

  showLoading(true);

  try {
    const response = await fetch(`${API_URL}/api/profile`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      showError(data.message || "Failed to delete profile");
    } else {
      alert("✅ Profile deleted successfully!");
      // Clear the display
      document.getElementById("profileSection").style.display = "none";
      document.getElementById("educationSection").style.display = "none";
      document.getElementById("skillsSection").style.display = "none";
      document.getElementById("projectsSection").style.display = "none";
      document.getElementById("topSkillsSection").style.display = "none";
    }
  } catch (err) {
    showError(`Failed to delete profile: ${err.message}`);
  }
  showLoading(false);
}

function displayProfile(profile) {
  document.getElementById("profileSection").style.display = "block";
  document.getElementById("profileName").textContent = profile.name;
  document.getElementById("profileEmail").textContent = profile.email;

  const githubLink = document.getElementById("githubLink");
  const linkedinLink = document.getElementById("linkedinLink");
  const portfolioLink = document.getElementById("portfolioLink");

  if (profile.links?.github) {
    githubLink.href = profile.links.github;
    githubLink.style.display = "inline-block";
  } else {
    githubLink.style.display = "none";
  }

  if (profile.links?.linkedin) {
    linkedinLink.href = profile.links.linkedin;
    linkedinLink.style.display = "inline-block";
  } else {
    linkedinLink.style.display = "none";
  }

  if (profile.links?.portfolio) {
    portfolioLink.href = profile.links.portfolio;
    portfolioLink.style.display = "inline-block";
  } else {
    portfolioLink.style.display = "none";
  }

  if (profile.education && profile.education.length > 0) {
    document.getElementById("educationSection").style.display = "block";
    const educationList = document.getElementById("educationList");
    educationList.innerHTML = profile.education
      .map(
        (edu) => `
        <div class="education-card">
          <h4>${edu.college}</h4>
          <p><strong>${edu.degree}</strong></p>
          <span class="year">${edu.year}</span>
        </div>
      `
      )
      .join("");
  }

  if (profile.skills && profile.skills.length > 0) {
    document.getElementById("skillsSection").style.display = "block";
    const skillsList = document.getElementById("skillsList");
    skillsList.innerHTML = profile.skills
      .map((skill) => `<span class="skill-badge">${skill}</span>`)
      .join("");
  }

  if (profile.projects && profile.projects.length > 0) {
    document.getElementById("projectsSection").style.display = "block";
    const projectsList = document.getElementById("projectsList");
    projectsList.innerHTML = profile.projects
      .map(
        (project) => `
        <div class="project-card">
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <div class="tech-stack">
            ${project.techStack.map((tech) => `<span class="tech-badge">${tech}</span>`).join("")}
          </div>
          <div class="project-links">
            ${project.github ? `<a href="${project.github}" target="_blank" class="link">GitHub</a>` : ""}
            ${project.live ? `<a href="${project.live}" target="_blank" class="link">Live Demo</a>` : ""}
          </div>
        </div>
      `
      )
      .join("");
  }
}

function populateSkillFilter(profile) {
}

async function searchBySkill() {
  const skill = document.getElementById("skillSearch").value.trim();

  if (!skill) {
    showError("Please enter a skill to search");
    return;
  }

  showLoading(true);

  try {
    const response = await fetch(
      `${API_URL}/api/projects?skill=${encodeURIComponent(skill)}`
    );
    const data = await response.json();

    if (!response.ok) {
      showError(data.message);
      showLoading(false);
      return;
    }

    document.getElementById("projectsSection").style.display = "block";
    const projectsList = document.getElementById("projectsList");

    if (data.data.projects.length === 0) {
      projectsList.innerHTML = `<p class="no-results">No projects found with skill: <strong>${skill}</strong></p>`;
    } else {
      projectsList.innerHTML = data.data.projects
        .map(
          (project) => `
          <div class="project-card">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="tech-stack">
              ${project.techStack.map((tech) => `<span class="tech-badge">${tech}</span>`).join("")}
            </div>
            <div class="project-links">
              ${project.github ? `<a href="${project.github}" target="_blank" class="link">GitHub</a>` : ""}
              ${project.live ? `<a href="${project.live}" target="_blank" class="link">Live Demo</a>` : ""}
            </div>
          </div>
        `
        )
        .join("");
    }
  } catch (err) {
    showError(`Search failed: ${err.message}`);
  }

  showLoading(false);
}

// Show Top Skills - REMOVED

