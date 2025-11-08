// GET all people
app.get('/api/v1/people', (req, res) => {
  res.status(200).json({
    success: true,
    count: people.length,
    data: people
  });
});

// GET single person
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

// POST create person
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

// PUT update person
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

// DELETE person
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