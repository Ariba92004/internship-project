document.addEventListener("DOMContentLoaded", () => {

  // ======== INITIALIZE DEMO DATABASE =========
  if (!localStorage.getItem("jobs")) {
    const jobs = [
      { id: 1, title: "Frontend Developer", company: "ABC Ltd", location: "Karachi" },
      { id: 2, title: "Backend Developer", company: "XYZ Ltd", location: "Lahore" }
    ];
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }

  if (!localStorage.getItem("users")) {
    const users = [
      { id: 1, name: "Ali", role: "Candidate", email: "ali@example.com" },
      { id: 2, name: "Sara", role: "Employer", email: "sara@example.com" },
      { id: 3, name: "Admin", role: "Admin", email: "admin@example.com" }
    ];
    localStorage.setItem("users", JSON.stringify(users));
  }

  if (!localStorage.getItem("applications")) {
    localStorage.setItem("applications", JSON.stringify([]));
  }

  // ======== LOGIN HANDLING =========
  const adminLoginForm = document.getElementById("adminLoginForm");
  const candidateLoginForm = document.getElementById("candidateLoginForm");
  const userLoginForm = document.getElementById("userLoginForm");

  const handleLogin = (role, redirectPage, email) => {
    localStorage.setItem("role", role);
    localStorage.setItem("userEmail", email || "");
    alert(`${role} login successful! 🎉`);
    window.location.href = redirectPage;
  };

  if (adminLoginForm) {
    adminLoginForm.addEventListener("submit", e => {
      e.preventDefault();
      const email = document.getElementById("adminEmail").value;
      handleLogin("Admin", "dashboard.html", email);
    });
  }

  if (candidateLoginForm) {
    candidateLoginForm.addEventListener("submit", e => {
      e.preventDefault();
      const email = document.getElementById("candidateEmail").value;
      handleLogin("Candidate", "dashboard.html", email);
    });
  }

  if (userLoginForm) {
    userLoginForm.addEventListener("submit", e => {
      e.preventDefault();
      const roleSelect = document.querySelector("select")?.value || "Candidate";
      const email = document.getElementById("userEmail").value;
      const redirect = roleSelect === "Employer" ? "employer-dashboard.html" : "dashboard.html";
      handleLogin(roleSelect, redirect, email);
    });
  }

  // ======== LOGOUT HANDLING =========
  const logoutBtns = document.querySelectorAll("#confirmLogout, .logout, .btn.confirm");
  logoutBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      localStorage.removeItem("role");
      localStorage.removeItem("userEmail");
      alert("Logged out successfully 👋");
      window.location.href = "../index.html";
    });
  });

  // ======== FETCH JOBS TO DISPLAY =========
  const jobsContainer = document.getElementById("jobsContainer");
  if (jobsContainer) {
    const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
    jobsContainer.innerHTML = jobs.map(job => `
      <div class="job-card">
        <h4>${job.title}</h4>
        <p>${job.company} - ${job.location}</p>
        <button class="apply-btn" data-job="${job.id}">Apply</button>
        <button class="edit-btn" data-job="${job.id}">Edit</button>
        <button class="delete-btn" data-job="${job.id}">Delete</button>
      </div>
    `).join("");
  }

  // ======== APPLY JOB (Candidate) =========
  const applyBtns = document.querySelectorAll(".apply-btn");
  const applyFormContainer = document.getElementById("applyFormContainer");
  const applyForm = document.getElementById("applyForm");

  if (applyBtns && applyFormContainer && applyForm) {
    applyBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        applyFormContainer.style.display = "block";
        document.getElementById("jobId").value = btn.dataset.job;
      });
    });

    applyForm.addEventListener("submit", e => {
      e.preventDefault();
      const applications = JSON.parse(localStorage.getItem("applications")) || [];
      const newApp = {
        id: Date.now(),
        jobId: document.getElementById("jobId").value,
        candidateEmail: localStorage.getItem("userEmail")
      };
      applications.push(newApp);
      localStorage.setItem("applications", JSON.stringify(applications));
      alert("Applied successfully ✅");
      applyForm.reset();
      applyFormContainer.style.display = "none";
    });
  }

  // ======== ADD / POST JOB (Admin & Employer) =========
  const jobForms = ["jobForm", "postJobForm"];
  jobForms.forEach(id => {
    const form = document.getElementById(id);
    if (form) {
      form.addEventListener("submit", e => {
        e.preventDefault();
        const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
        const newJob = {
          id: Date.now(),
          title: form.querySelector("[name='title']").value,
          company: form.querySelector("[name='company']").value,
          location: form.querySelector("[name='location']").value
        };
        jobs.push(newJob);
        localStorage.setItem("jobs", JSON.stringify(jobs));
        alert("Job added successfully ✅");
        form.reset();
        location.reload();
      });
    }
  });

  // ======== EDIT / DELETE JOB =========
  const editButtons = document.querySelectorAll(".edit-btn");
  const deleteButtons = document.querySelectorAll(".delete-btn");

  editButtons.forEach(btn => btn.addEventListener("click", () => {
    const jobId = Number(btn.dataset.job);
    const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
    const job = jobs.find(j => j.id === jobId);
    if (!job) return alert("Job not found");
    const newTitle = prompt("Edit Job Title:", job.title);
    if (newTitle) {
      job.title = newTitle;
      localStorage.setItem("jobs", JSON.stringify(jobs));
      alert("Job updated ✅");
      location.reload();
    }
  }));

  deleteButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      if (!confirm("Are you sure to delete this job?")) return;
      const jobId = Number(btn.dataset.job);
      let jobs = JSON.parse(localStorage.getItem("jobs")) || [];
      jobs = jobs.filter(job => job.id !== jobId);
      localStorage.setItem("jobs", JSON.stringify(jobs));
      alert("Job deleted ✅");
      location.reload();
    });
  });

  // ======== PROFILE UPDATE =========
  const profileForms = ["profileForm"];
  profileForms.forEach(id => {
    const form = document.getElementById(id);
    if (form) {
      form.addEventListener("submit", e => {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const email = localStorage.getItem("userEmail");
        const user = users.find(u => u.email === email);
        if (user) {
          user.name = form.querySelector("[name='name']").value;
          user.email = form.querySelector("[name='email']").value;
          localStorage.setItem("users", JSON.stringify(users));
          localStorage.setItem("userEmail", user.email);
          alert("Profile updated ✅");
        }
      });
    }
  });

});

