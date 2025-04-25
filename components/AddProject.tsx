interface ProjectData {
  name: string;
  icon: string;
  clerkUserId: string;
  components: any[]; // Replace `any` with a more specific type if available
}

interface ApiResponse {
  error?: string;
  [key: string]: any; // Replace with a more specific type if the API response structure is known
}

async function addProject(projectData: ProjectData): Promise<void> {
  try {
    console.log("Sending data to API:", projectData); // Debug log

    const response = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(projectData),
    });

    const result: ApiResponse = await response.json();
    console.log("API Response:", result); // Debug log

    if (!response.ok) {
      throw new Error(result.error || 'Failed to add project');
    }

    alert('Project added successfully!');
    // Update the UI or state here
  } catch (error: any) {
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
