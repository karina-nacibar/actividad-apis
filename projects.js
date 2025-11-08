app.get('/api/v1/projects', (req, res) => {
  res.status(200).json({
    success: true,
    count: projects.length,
    data: projects
  });
});

// GET single project
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

// POST create project
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

// PUT update project
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

// DELETE project
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