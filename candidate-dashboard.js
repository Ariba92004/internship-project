document.addEventListener("DOMContentLoaded", () => {
  const jobsContainer = document.getElementById("jobsContainer");
  const applicationsTable = document.getElementById("applicationsTable");
  const userEmail = localStorage.getItem("userEmail");

  // ======= Display available jobs =======
  if (jobsContainer) {
    const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
    jobsContainer.innerHTML = jobs.map(job => `
      <div class="job-card">
        <h4>${job.title}</h4>
        <p>${job.company} - ${job.location}</p>
        <button class="apply-btn" data-job="${job.id}">Apply</button>
      </div>
    `).join("");

    // Apply button handler
    const applyBtns = document.querySelectorAll(".apply-btn");
    applyBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const applications = JSON.parse(localStorage.getItem("applications")) || [];
        const jobId = btn.dataset.job;
        const exists = applications.find(a => a.jobId == jobId && a.candidateEmail === userEmail);
        if (exists) return alert("You already applied to this job!");
        applications.push({ id: Date.now(), jobId, candidateEmail: userEmail });
        localStorage.setItem("applications", JSON.stringify(applications));
        alert("Applied successfully ✅");
        renderApplications(); // refresh table
      });
    });
  }

  // ======= Display applied jobs =======
  const renderApplications = () => {
    if (!applicationsTable) return;
    const applications = JSON.parse(localStorage.getItem("applications")) || [];
    const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
    const myApps = applications.filter(a => a.candidateEmail === userEmail);

    applicationsTable.innerHTML = myApps.map(a => {
      const job = jobs.find(j => j.id == a.jobId);
      return `<tr>
        <td>${job?.title || "Deleted Job"}</td>
        <td>${job?.company || "-"}</td>
        <td>${job?.location || "-"}</td>
      </tr>`;
    }).join("");
  };

  renderApplications();
});
