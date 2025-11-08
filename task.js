app.get('/api/v1/tasks', (req, res) => {
  res.status(200).json({
    success: true,
    count: tasks.length,
    data: tasks
  });
});

// GET single task
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

// POST create task
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

// PUT update task
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

// DELETE task
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