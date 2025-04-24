import { NextApiRequest, NextApiResponse } from 'next';

interface Project {
    id: string;
    clerkUserId: string;
    name: string;
    icon: string;
    components: any[];
}

// Simulated in-memory database (replace with actual database logic)
const projects: Project[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { clerkUserId, name, icon, components } = req.body;

        if (!clerkUserId || !name || !icon) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const newProject: Project = {
            id: `${Date.now()}`,C
            clerkUserId,
            name,
            icon,
            components: components || [],
        };

        projects.push(newProject);
        return res.status(201).json({ message: 'Project created successfully', project: newProject });
    }

    if (req.method === 'GET') {
        const { clerkUserId } = req.query;

        if (!clerkUserId || typeof clerkUserId !== 'string') {
            return res.status(400).json({ error: 'clerkUserId is required' });
        }

        const userProjects = projects.filter((project) => project.clerkUserId === clerkUserId);
        return res.status(200).json({ projects: userProjects });
    }

    if (req.method === 'DELETE') {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ error: 'Project ID is required' });
        }

        const projectIndex = projects.findIndex((project) => project.id === id);

        if (projectIndex === -1) {
            return res.status(404).json({ error: 'Project not found' });
        }

        projects.splice(projectIndex, 1);
        return res.status(200).json({ message: 'Project deleted successfully' });
    }

    return res.status(405).json({ error: 'Method not allowed' });
}
