// pages/api/createProject.js
import formidable from "formidable";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false
  }
};

// Variables globales para simular almacenamiento (no es persistente)
let projects = global.projects || [];
global.projects = projects;
let projectCounter = global.projectCounter || 1;
global.projectCounter = projectCounter;

const UPLOAD_FOLDER = "/tmp/uploads";
const VIDEO_FOLDER = path.join(UPLOAD_FOLDER, "video");
const HTML_FOLDER = path.join(UPLOAD_FOLDER, "html");
const PLOTLY_FOLDER = path.join(UPLOAD_FOLDER, "plotly");

// Asegurar que existan las carpetas
[UPLOAD_FOLDER, VIDEO_FOLDER, HTML_FOLDER, PLOTLY_FOLDER].forEach((folder) => {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    const form = formidable({
      multiples: false,
      uploadDir: UPLOAD_FOLDER,
      keepExtensions: true
    });

    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Error al procesar el formulario" });
        return;
      }

      const { title, description } = fields;
      let videoFilename = null;
      let plotlyContent = null;
      let htmlFilename = null;

      // Procesar archivo de video
      if (files.video) {
        const file = files.video;
        const ext = file.originalFilename.split(".").pop().toLowerCase();
        if (["mp4", "webm", "ogg"].includes(ext)) {
          const dest = path.join(VIDEO_FOLDER, file.newFilename + "." + ext);
          fs.renameSync(file.filepath, dest);
          videoFilename = path.basename(dest);
        }
      }

      // Procesar archivo Plotly (JSON)
      if (files.plotly) {
        const file = files.plotly;
        const ext = file.originalFilename.split(".").pop().toLowerCase();
        if (ext === "json") {
          const content = fs.readFileSync(file.filepath, "utf8");
          plotlyContent = content;
        }
      }

      // Procesar archivo HTML
      if (files.html) {
        const file = files.html;
        const ext = file.originalFilename.split(".").pop().toLowerCase();
        if (["html", "htm"].includes(ext)) {
          const dest = path.join(HTML_FOLDER, file.newFilename + "." + ext);
          fs.renameSync(file.filepath, dest);
          htmlFilename = path.basename(dest);
        }
      }

      const project = {
        id: projectCounter,
        title,
        description,
        video: videoFilename,
        plotly: plotlyContent,
        html: htmlFilename
      };

      projects.push(project);
      global.projectCounter = projectCounter + 1;

      res.status(200).json({ id: project.id });
    });
  } else {
    res.status(405).end();
  }
}
