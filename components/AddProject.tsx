async function addProject(projectData) {
  try {
    console.log("Sending data to API:", projectData); // Debug log

    const response = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(projectData),
    });

    const result = await response.json();
    console.log("API Response:", result); // Debug log

    if (!response.ok) {
      throw new Error(result.error || 'Failed to add project');
    }

    alert('Project added successfully!');
    // Update the UI or state here
  } catch (error) {
    console.error("Error adding project:", error); // Debug log
    alert(error.message);
  }
}

// Example usage
addProject({
  name: "New Project",
  icon: "icon-url",
  clerkUserId: "user-id",
  components: [],
});
