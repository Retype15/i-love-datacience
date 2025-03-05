import os
import json
import markdown
import plotly
import plotly.io as pio

from fastapi import FastAPI, Request, Form, UploadFile, File, HTTPException
from fastapi.responses import HTMLResponse, RedirectResponse, FileResponse
from fastapi.templating import Jinja2Templates
from starlette.middleware.sessions import SessionMiddleware
from werkzeug.utils import secure_filename

app = FastAPI()
app.add_middleware(SessionMiddleware, secret_key="secret")

# Usamos /tmp para almacenamiento temporal en entornos serverless (Vercel)
UPLOAD_FOLDER = '/tmp/uploads'
VIDEO_FOLDER = os.path.join(UPLOAD_FOLDER, 'videos')
HTML_FOLDER = os.path.join(UPLOAD_FOLDER, 'html')
PLOTLY_FOLDER = os.path.join(UPLOAD_FOLDER, 'plotly')

# Crear las carpetas necesarias
for folder in [UPLOAD_FOLDER, VIDEO_FOLDER, HTML_FOLDER, PLOTLY_FOLDER]:
    os.makedirs(folder, exist_ok=True)

templates = Jinja2Templates(directory="templates")

# Extensiones permitidas
ALLOWED_VIDEO_EXTENSIONS = {'mp4', 'webm', 'ogg'}
ALLOWED_HTML_EXTENSIONS = {'html', 'htm'}
ALLOWED_JSON_EXTENSIONS = {'json'}

def allowed_file(filename: str, allowed_ext: set):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in allowed_ext

# Almacenamiento en memoria para proyectos (en producción usar una base de datos)
projects = {}
project_counter = 1

@app.get("/", response_class=HTMLResponse)
def index(request: Request):
    return templates.TemplateResponse("index.html", {"request": request, "projects": projects})

@app.post("/", response_class=HTMLResponse)
async def create_project(
    request: Request,
    title: str = Form(...),
    description: str = Form(""),
    video: UploadFile = File(None),
    plotly_file: UploadFile = File(None),
    html_file: UploadFile = File(None)
):
    global project_counter
    # Convertir Markdown a HTML
    description_html = markdown.markdown(description) if description else ""
    
    # Procesar video
    video_filename = None
    if video and allowed_file(video.filename, ALLOWED_VIDEO_EXTENSIONS):
        video_filename = secure_filename(video.filename)
        video_path = os.path.join(VIDEO_FOLDER, video_filename)
        with open(video_path, "wb") as f:
            content = await video.read()
            f.write(content)
    
    # Procesar gráfica Plotly (archivo JSON)
    plotly_div = ""
    if plotly_file and allowed_file(plotly_file.filename, ALLOWED_JSON_EXTENSIONS):
        try:
            content = await plotly_file.read()
            data = json.loads(content.decode("utf-8"))
            fig = plotly.io.from_json(json.dumps(data))
            plotly_div = pio.to_html(fig, full_html=False)
        except Exception as e:
            plotly_div = f"Error al procesar la gráfica Plotly: {e}"
    
    # Procesar archivo HTML adicional (para animaciones u otras páginas)
    html_filename = None
    if html_file and allowed_file(html_file.filename, ALLOWED_HTML_EXTENSIONS):
        html_filename = secure_filename(html_file.filename)
        html_path = os.path.join(HTML_FOLDER, html_filename)
        with open(html_path, "wb") as f:
            content = await html_file.read()
            f.write(content)
    
    # Crear el proyecto y guardarlo en memoria
    project = {
        "id": project_counter,
        "title": title,
        "description_html": description_html,
        "video_filename": video_filename,
        "plotly_div": plotly_div,
        "html_filename": html_filename,
    }
    projects[project_counter] = project
    project_counter += 1
    
    # Redireccionar a la vista del proyecto
    return RedirectResponse(url=f"/project/{project['id']}", status_code=303)

@app.get("/project/{project_id}", response_class=HTMLResponse)
def project_detail(request: Request, project_id: int):
    project = projects.get(project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Proyecto no encontrado")
    return templates.TemplateResponse("project.html", {"request": request, "project": project})

@app.get("/uploads/videos/{filename}")
def get_video(filename: str):
    video_path = os.path.join(VIDEO_FOLDER, filename)
    if os.path.exists(video_path):
        return FileResponse(video_path)
    else:
        raise HTTPException(status_code=404, detail="Video no encontrado")

@app.get("/uploads/html/{filename}")
def get_html(filename: str):
    html_path = os.path.join(HTML_FOLDER, filename)
    if os.path.exists(html_path):
        return FileResponse(html_path)
    else:
        raise HTTPException(status_code=404, detail="Archivo HTML no encontrado")
