document.addEventListener("DOMContentLoaded", () => {
  const jobsTable = document.getElementById("jobsTable");
  const userEmail = localStorage.getItem("userEmail");

  if (!jobsTable) return;

  const renderJobs = () => {
    const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
    const myJobs = jobs; // demo mode: all jobs visible; real app: filter by employer

    jobsTable.innerHTML = myJobs.map(job => `
      <tr>
        <td>${job.title}</td>
        <td>${job.company}</td>
        <td>${job.location}</td>
        <td>
          <button class="edit-btn" data-job="${job.id}">Edit</button>
          <button class="delete-btn" data-job="${job.id}">Delete</button>
        </td>
      </tr>
    `).join("");

    // Edit/Delete handlers
    document.querySelectorAll(".edit-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
        const job = jobs.find(j => j.id == btn.dataset.job);
        if (!job) return alert("Job not found");
        const newTitle = prompt("Edit Job Title:", job.title);
        if (newTitle) {
          job.title = newTitle;
          localStorage.setItem("jobs", JSON.stringify(jobs));
          alert("Job updated ✅");
          renderJobs();
        }
      });
    });

    document.querySelectorAll(".delete-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        if (!confirm("Are you sure to delete this job?")) return;
        let jobs = JSON.parse(localStorage.getItem("jobs")) || [];
        jobs = jobs.filter(j => j.id != btn.dataset.job);
        localStorage.setItem("jobs", JSON.stringify(jobs));
        alert("Job deleted ✅");
        renderJobs();
      });
    });
  };

  renderJobs();
});
