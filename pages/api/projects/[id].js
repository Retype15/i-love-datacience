// pages/api/projects/[id].js
let projects = global.projects || [];
export default function handler(req, res) {
  const { id } = req.query;
  const project = projects.find((p) => p.id === parseInt(id));
  if (!project) {
    res.status(404).json({ error: "Proyecto no encontrado" });
  } else {
    res.status(200).json({ project });
  }
}
