// pages/api/projects/index.js
let projects = global.projects || [];
export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json({ projects });
  } else {
    res.status(405).end();
  }
}
