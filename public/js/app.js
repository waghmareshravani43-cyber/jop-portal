/* ============================= */
/* INITIAL LOAD */
/* ============================= */

window.onload = () => {
  loadJobs();
  loadLocations();
  loadWorkTypes();
  checkAdminStatus();
};


/* ============================= */
/* LOAD JOBS */
/* ============================= */

async function loadJobs() {
  try {
    const location = document.getElementById("locationFilter")?.value;
    const workType = document.getElementById("workTypeFilter")?.value;

    let url = "/api/jobs?";

    if (location) url += `location=${encodeURIComponent(location)}&`;
    if (workType) url += `workType=${encodeURIComponent(workType)}`;

    const res = await fetch(url);
    const jobs = await res.json();

    const jobContainer = document.getElementById("jobs");
    if (!jobContainer) return;

    jobContainer.innerHTML = "";

    if (jobs.length === 0) {
      jobContainer.innerHTML = "<p>No jobs found.</p>";
      return;
    }

    jobs.forEach(job => {
      jobContainer.innerHTML += `
        <div class="job-card">
          <h3>${job.title}</h3>
          <div class="job-meta">
            ${job.company} • ${job.location} • ${job.workType}
          </div>
          <p>${job.description}</p>
          <button onclick="apply('${job._id}')">Apply</button>
        </div>
      `;
    });

  } catch (error) {
    console.error("Error loading jobs:", error);
  }
}


/* ============================= */
/* LOAD DISTINCT LOCATIONS */
/* ============================= */

async function loadLocations() {
  try {
    const res = await fetch("/api/jobs/locations");
    const locations = await res.json();

    const locationSelect = document.getElementById("locationFilter");
    if (!locationSelect) return;

    locationSelect.innerHTML = `<option value="">All Locations</option>`;

    locations.forEach(loc => {
      locationSelect.innerHTML += `
        <option value="${loc}">${loc}</option>
      `;
    });

  } catch (error) {
    console.error("Error loading locations:", error);
  }
}


/* ============================= */
/* LOAD DISTINCT WORK TYPES */
/* ============================= */

async function loadWorkTypes() {
  try {
    const res = await fetch("/api/jobs/worktypes");
    const types = await res.json();

    const workTypeSelect = document.getElementById("workTypeFilter");
    if (!workTypeSelect) return;

    workTypeSelect.innerHTML = `<option value="">All Types</option>`;

    types.forEach(type => {
      workTypeSelect.innerHTML += `
        <option value="${type}">${type}</option>
      `;
    });

  } catch (error) {
    console.error("Error loading work types:", error);
  }
}


/* ============================= */
/* APPLY REDIRECT */
/* ============================= */

function apply(id) {
  window.location.href = `apply.html?id=${id}`;
}


/* ============================= */
/* ADMIN LOGIN */
/* ============================= */

document.getElementById("loginForm")?.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = Object.fromEntries(new FormData(e.target));

  if (formData.email && formData.password) {
    localStorage.setItem("admin", "true");
    window.location.href = "admin.html";
  }
});


/* ============================= */
/* CHECK ADMIN STATUS */
/* ============================= */

function checkAdminStatus() {
  const logoutBtn = document.getElementById("logoutBtn");

  if (localStorage.getItem("admin") && logoutBtn) {
    logoutBtn.style.display = "inline";
  }
}


/* ============================= */
/* LOGOUT */
/* ============================= */

document.getElementById("logoutBtn")?.addEventListener("click", () => {
  localStorage.removeItem("admin");
  window.location.href = "index.html";
});


/* ============================= */
/* POST JOB (ADMIN) */
/* ============================= */

document.getElementById("jobForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    const formData = Object.fromEntries(new FormData(e.target));

    await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    alert("Job Posted Successfully");
    e.target.reset();

    loadLocations();
    loadWorkTypes();

  } catch (error) {
    console.error("Error posting job:", error);
  }
});


/* ============================= */
/* APPLY JOB */
/* ============================= */

document.getElementById("applyForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    const formData = Object.fromEntries(new FormData(e.target));

    await fetch("/api/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    window.location.href = "success.html";

  } catch (error) {
    console.error("Error submitting application:", error);
  }
});
