const express = require('express');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Base de datos simulada
let projects = [
  { id: 1, name: "Sistema Educativo", description: "Sistema de Gestión Escolar", status: "active" }
];

let tasks = [
  { id: 1, title: "Diseñar BD", description: "Crear diagrama ER", projectId: 1, completed: false }
];

let people = [
  { id: 1, name: "Juan Rodríguez", email: "juan@example.com", role: "Developer" }
];

// ============================================
// PROJECTS ROUTES
// ============================================

app.get('/api/v1/projects', (req, res) => {
  res.status(200).json({
    success: true,
    count: projects.length,
    data: projects
  });
});

app.get('/api/v1/projects/:id', (req, res) => {
  const project = projects.find(p => p.id === parseInt(req.params.id));
  
  if (!project) {
    return res.status(404).json({
      success: false,
      message: 'Proyecto no encontrado'
    });
  }
  
  res.status(200).json({
    success: true,
    data: project
  });
});

app.post('/api/v1/projects', (req, res) => {
  const { name, description, status } = req.body;
  
  if (!name) {
    return res.status(400).json({
      success: false,
      message: 'El nombre es requerido'
    });
  }
  
  const newProject = {
    id: projects.length + 1,
    name,
    description: description || '',
    status: status || 'active'
  };
  
  projects.push(newProject);
  
  res.status(201).json({
    success: true,
    data: newProject
  });
});

app.put('/api/v1/projects/:id', (req, res) => {
  const project = projects.find(p => p.id === parseInt(req.params.id));
  
  if (!project) {
    return res.status(404).json({
      success: false,
      message: 'Proyecto no encontrado'
    });
  }
  
  const { name, description, status } = req.body;
  
  project.name = name || project.name;
  project.description = description || project.description;
  project.status = status || project.status;
  
  res.status(200).json({
    success: true,
    data: project
  });
});

app.delete('/api/v1/projects/:id', (req, res) => {
  const index = projects.findIndex(p => p.id === parseInt(req.params.id));
  
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: 'Proyecto no encontrado'
    });
  }
  
  projects.splice(index, 1);
  res.status(204).send();
});

// ============================================
// TASKS ROUTES
// ============================================

app.get('/api/v1/tasks', (req, res) => {
  res.status(200).json({
    success: true,
    count: tasks.length,
    data: tasks
  });
});

app.get('/api/v1/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  
  if (!task) {
    return res.status(404).json({
      success: false,
      message: 'Tarea no encontrada'
    });
  }
  
  res.status(200).json({
    success: true,
    data: task
  });
});

app.post('/api/v1/tasks', (req, res) => {
  const { title, description, projectId, completed } = req.body;
  
  if (!title) {
    return res.status(400).json({
      success: false,
      message: 'El título es requerido'
    });
  }
  
  const newTask = {
    id: tasks.length + 1,
    title,
    description: description || '',
    projectId: projectId || null,
    completed: completed || false
  };
  
  tasks.push(newTask);
  
  res.status(201).json({
    success: true,
    data: newTask
  });
});

app.put('/api/v1/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  
  if (!task) {
    return res.status(404).json({
      success: false,
      message: 'Tarea no encontrada'
    });
  }
  
  const { title, description, projectId, completed } = req.body;
  
  task.title = title || task.title;
  task.description = description || task.description;
  task.projectId = projectId !== undefined ? projectId : task.projectId;
  task.completed = completed !== undefined ? completed : task.completed;
  
  res.status(200).json({
    success: true,
    data: task
  });
});

app.delete('/api/v1/tasks/:id', (req, res) => {
  const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
  
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: 'Tarea no encontrada'
    });
  }
  
  tasks.splice(index, 1);
  res.status(204).send();
});

// ============================================
// PEOPLE ROUTES
// ============================================

app.get('/api/v1/people', (req, res) => {
  res.status(200).json({
    success: true,
    count: people.length,
    data: people
  });
});

app.get('/api/v1/people/:id', (req, res) => {
  const person = people.find(p => p.id === parseInt(req.params.id));
  
  if (!person) {
    return res.status(404).json({
      success: false,
      message: 'Persona no encontrada'
    });
  }
  
  res.status(200).json({
    success: true,
    data: person
  });
});

app.post('/api/v1/people', (req, res) => {
  const { name, email, role } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({
      success: false,
      message: 'Nombre y email son requeridos'
    });
  }
  
  const newPerson = {
    id: people.length + 1,
    name,
    email,
    role: role || 'Member'
  };
  
  people.push(newPerson);
  
  res.status(201).json({
    success: true,
    data: newPerson
  });
});

app.put('/api/v1/people/:id', (req, res) => {
  const person = people.find(p => p.id === parseInt(req.params.id));
  
  if (!person) {
    return res.status(404).json({
      success: false,
      message: 'Persona no encontrada'
    });
  }
  
  const { name, email, role } = req.body;
  
  person.name = name || person.name;
  person.email = email || person.email;
  person.role = role || person.role;
  
  res.status(200).json({
    success: true,
    data: person
  });
});

app.delete('/api/v1/people/:id', (req, res) => {
  const index = people.findIndex(p => p.id === parseInt(req.params.id));
  
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: 'Persona no encontrada'
    });
  }
  
  people.splice(index, 1);
  res.status(204).send();
});

// ============================================
// START SERVER
// ============================================
app.listen(PORT, () => {
  console.log('🚀 Servidor corriendo en http://localhost:' + PORT);
  console.log('📚 API Base URL: http://localhost:' + PORT + '/api/v1');
  console.log('✅ Prueba: http://localhost:' + PORT + '/api/v1/projects');
});