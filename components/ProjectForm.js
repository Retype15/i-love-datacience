import { useState } from 'react';

export default function ProjectForm({ onSubmit, initialData = {} }) {
  const [title, setTitle] = useState(initialData.title || '');
  const [video, setVideo] = useState(initialData.video || '');
  const [user, setUser] = useState(initialData.user || '');
  const [contents, setContents] = useState(initialData.contents || []);

  const [newItemType, setNewItemType] = useState('markdown');
  const [newItemContent, setNewItemContent] = useState('');

  const addContentItem = () => {
    if (newItemContent.trim()) {
      setContents([...contents, { type: newItemType, content: newItemContent }]);
      setNewItemContent('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title,
      video,
      user,
      contents,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-gray-900 text-white p-6 rounded-lg shadow-lg">
      <div>
        <label className="block text-sm font-medium text-gray-400">Título</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full border border-gray-700 bg-gray-800 p-2 rounded focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-400">Video de presentación (URL de YouTube)</label>
        <input
          type="url"
          value={video}
          onChange={(e) => setVideo(e.target.value)}
          className="mt-1 block w-full border border-gray-700 bg-gray-800 p-2 rounded focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-400">Nombre del usuario</label>
        <input
          type="text"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          className="mt-1 block w-full border border-gray-700 bg-gray-800 p-2 rounded focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          required
        />
      </div>
      <div>
        <h3 className="text-lg font-medium text-gray-400">Contenido</h3>
        <div className="space-y-2">
          {contents.map((item, index) => (
            <div key={index} className="p-2 border border-gray-700 bg-gray-800 rounded">
              <strong>{item.type === 'markdown' ? 'Markdown' : 'Gráfico (HTML)'}:</strong>
              <pre className="whitespace-pre-wrap text-gray-400">{item.content}</pre>
            </div>
          ))}
        </div>
        <div className="mt-4 space-y-2">
          <div>
            <label className="block text-sm font-medium text-gray-400">Tipo de contenido</label>
            <select
              value={newItemType}
              onChange={(e) => setNewItemType(e.target.value)}
              className="mt-1 block w-full border border-gray-700 bg-gray-800 p-2 rounded focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            >
              <option value="markdown">Markdown</option>
              <option value="html">Gráfico (HTML)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400">Contenido</label>
            <textarea
              value={newItemContent}
              onChange={(e) => setNewItemContent(e.target.value)}
              className="mt-1 block w-full border border-gray-700 bg-gray-800 p-2 rounded focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            ></textarea>
          </div>
          <button
            type="button"
            onClick={addContentItem}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300"
          >
            Agregar ítem
          </button>
        </div>
      </div>
      <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-300">
        Guardar Proyecto
      </button>
    </form>
  );
}
