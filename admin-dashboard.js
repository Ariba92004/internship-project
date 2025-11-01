document.addEventListener("DOMContentLoaded", () => {
  const usersTable = document.getElementById("usersTable");
  const jobsTable = document.getElementById("jobsTable");

  // ======= Render Users Table =======
  const renderUsers = () => {
    if (!usersTable) return;
    const users = JSON.parse(localStorage.getItem("users")) || [];

    usersTable.innerHTML = users.map(user => `
      <tr>
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.role}</td>
        <td>
          <button class="edit-user-btn" data-id="${user.id}">Edit</button>
          <button class="delete-user-btn" data-id="${user.id}">Delete</button>
        </td>
      </tr>
    `).join("");

    // Edit User
    document.querySelectorAll(".edit-user-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find(u => u.id == btn.dataset.id);
        if (!user) return alert("User not found");
        const newName = prompt("Edit Name:", user.name);
        const newEmail = prompt("Edit Email:", user.email);
        const newRole = prompt("Edit Role (Admin/Candidate/Employer):", user.role);
        if (newName && newEmail && newRole) {
          user.name = newName;
          user.email = newEmail;
          user.role = newRole;
          localStorage.setItem("users", JSON.stringify(users));
          alert("User updated ✅");
          renderUsers();
        }
      });
    });

    // Delete User
    document.querySelectorAll(".delete-user-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        if (!confirm("Are you sure to delete this user?")) return;
        let users = JSON.parse(localStorage.getItem("users")) || [];
        users = users.filter(u => u.id != btn.dataset.id);
        localStorage.setItem("users", JSON.stringify(users));
        alert("User deleted ✅");
        renderUsers();
      });
    });
  };

  // ======= Render Jobs Table =======
  const renderJobs = () => {
    if (!jobsTable) return;
    const jobs = JSON.parse(localStorage.getItem("jobs")) || [];

    jobsTable.innerHTML = jobs.map(job => `
      <tr>
        <td>${job.id}</td>
        <td>${job.title}</td>
        <td>${job.company}</td>
        <td>${job.location}</td>
        <td>
          <button class="edit-job-btn" data-id="${job.id}">Edit</button>
          <button class="delete-job-btn" data-id="${job.id}">Delete</button>
        </td>
      </tr>
    `).join("");

    // Edit Job
    document.querySelectorAll(".edit-job-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
        const job = jobs.find(j => j.id == btn.dataset.id);
        if (!job) return alert("Job not found");
        const newTitle = prompt("Edit Job Title:", job.title);
        const newCompany = prompt("Edit Company:", job.company);
        const newLocation = prompt("Edit Location:", job.location);
        if (newTitle && newCompany && newLocation) {
          job.title = newTitle;
          job.company = newCompany;
          job.location = newLocation;
          localStorage.setItem("jobs", JSON.stringify(jobs));
          alert("Job updated ✅");
          renderJobs();
        }
      });
    });

    // Delete Job
    document.querySelectorAll(".delete-job-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        if (!confirm("Are you sure to delete this job?")) return;
        let jobs = JSON.parse(localStorage.getItem("jobs")) || [];
        jobs = jobs.filter(j => j.id != btn.dataset.id);
        localStorage.setItem("jobs", JSON.stringify(jobs));
        alert("Job deleted ✅");
        renderJobs();
      });
    });
  };

  renderUsers();
  renderJobs();
});
