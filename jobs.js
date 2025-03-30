document.addEventListener("DOMContentLoaded", function () {
    let jobsData = []; // Store fetched jobs

    // Fetch jobs from JSON file
    fetch("jobs-data.json")
        .then(response => response.json())
        .then(jobs => {
            jobsData = jobs;
            populateFilters(jobs);
            displayJobs(jobs);
        })
        .catch(error => console.error("Error loading job data:", error));

    function populateFilters(jobs) {
        const locationFilter = document.getElementById("locationFilter");
        const uniqueLocations = [...new Set(jobs.map(job => job.location))];

        uniqueLocations.forEach(location => {
            const option = document.createElement("option");
            option.value = location;
            option.textContent = location;
            locationFilter.appendChild(option);
        });
    }

    function displayJobs(jobs) {
        const jobContainer = document.querySelector(".job-listings");
        jobContainer.innerHTML = jobs.length > 0 ? "" : "<p>No jobs found.</p>";

        jobs.forEach(job => {
            const jobElement = document.createElement("div");
            jobElement.classList.add("job");
            jobElement.innerHTML = `
                <h2>${job.title}</h2>
                <p><strong>Company:</strong> ${job.company}</p>
                <p><strong>Location:</strong> ${job.location}</p>
                <p><strong>Work Mode:</strong> ${job.work_mode}</p>
                <p>${job.description}</p>
                <p><a href="#">Apply Now</a></p>
            `;
            jobContainer.appendChild(jobElement);
        });
    }

    function filterJobs() {
        const selectedLocation = document.getElementById("locationFilter").value;
        const selectedWorkMode = document.getElementById("workModeFilter").value;

        const filteredJobs = jobsData.filter(job => 
            (selectedLocation === "all" || job.location === selectedLocation) &&
            (selectedWorkMode === "all" || job.work_mode === selectedWorkMode)
        );

        displayJobs(filteredJobs);
    }

    document.getElementById("locationFilter").addEventListener("change", filterJobs);
    document.getElementById("workModeFilter").addEventListener("change", filterJobs);
});
