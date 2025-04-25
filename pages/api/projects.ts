import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import connect from "@/app/lib/connect";
import Project from "@/app/Models/ProjectSchema";
import { v4 as uuidv4 } from "uuid";

interface Project {
  id: string;
  clerkUserId: string;
  name: string;
  icon: string;
  components: any[];
}

// Simulated in-memory database (replace with actual database logic)
const projects: Project[] = [];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { name, icon, clerkUserId, components } = req.body;

      await connect();

      const project = new Project({
        _id: uuidv4(), // Explicitly generate _id
        name,
        icon,
        clerkUserId,
        components: components.map((component: any) => ({
          _id: uuidv4(), // Generate _id for each component
          name: component.name,
          projectName: name,
          code: component.code,
          isFavorite: component.isFavorite || false,
        })),
      });

      const savedProject = await project.save();

      return res.status(201).json({ project: savedProject });
    } catch (error) {
      console.error("Error creating project:", error);
      return res.status(400).json({ error: "Failed to create project" });
    }
  }

  if (req.method === "GET") {
    try {
      const { clerkUserId } = req.query;

      if (!clerkUserId || typeof clerkUserId !== "string") {
        return res.status(400).json({ error: "clerkUserId is required" });
      }

      await connect();

      const userProjects = await Project.find({ clerkUserId });
      return res.status(200).json({ projects: userProjects });
    } catch (error) {
      console.error("Error fetching projects:", error);
      return res.status(400).json({ error: "Failed to fetch projects" });
    }
  }

  if (req.method === "DELETE") {
    try {
      const { id } = req.body;

      if (!id) {
        return res.status(400).json({ error: "Project ID is required" });
      }

      await connect();

      const projectToDelete = await Project.findOneAndDelete({ _id: id });

      if (!projectToDelete) {
        return res.status(404).json({ error: "Project not found" });
      }

      return res.status(200).json({ message: "Project deleted successfully" });
    } catch (error) {
      console.error("Error deleting project:", error);
      return res.status(500).json({ error: "Failed to delete project" });
    }
  }

  if (req.method === "PUT") {
    try {
      const { action, name, icon, component, isFavorite } = req.body;
      const { projectId, componentId } = req.query;

      if (!projectId || typeof projectId !== "string") {
        return res.status(400).json({ error: "Project ID is required" });
      }

      await connect();

      let updatedProject;

      if (action === "addComponent") {
        updatedProject = await Project.findByIdAndUpdate(
          projectId,
          { $push: { components: component } },
          { new: true }
        );
      } else if (action === "updateComponent") {
        if (!componentId || typeof componentId !== "string") {
          return res.status(400).json({ error: "Component ID is required for updating" });
        }
        updatedProject = await Project.findOneAndUpdate(
          { _id: projectId, "components._id": componentId },
          { $set: { "components.$": component } },
          { new: true }
        );
      } else if (action === "deleteComponent") {
        if (!componentId || typeof componentId !== "string") {
          return res.status(400).json({ error: "Component ID is required for deleting" });
        }
        updatedProject = await Project.findByIdAndUpdate(
          projectId,
          { $pull: { components: { _id: componentId } } },
          { new: true }
        );
      } else if (action === "updateFavoriteState") {
        if (!componentId || typeof componentId !== "string") {
          return res.status(400).json({ error: "Component ID is required for updating favorite state" });
        }
        updatedProject = await Project.findOneAndUpdate(
          { _id: projectId, "components._id": componentId },
          { $set: { "components.$.isFavorite": isFavorite } },
          { new: true }
        );
      } else {
        updatedProject = await Project.findByIdAndUpdate(
          projectId,
          { name, icon },
          { new: true }
        );
      }

      if (!updatedProject) {
        return res.status(404).json({ error: "Project not found" });
      }

      return res.status(200).json({ project: updatedProject });
    } catch (error) {
      console.error("Error updating project:", error);
      return res.status(500).json({ error: "Failed to update project" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
