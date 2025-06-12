const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('FitGoal API is running');
});

app.get('/test-db', async (req, res) => {
  try {
    const plan = await prisma.workoutPlan.create({
      data: {
        goal: 'Build strength',
        days: 'Mon,Wed,Fri',
        equipment: 'Dumbbells',
      },
    });
    res.json(plan);
  } catch (err) {
    console.error(err);
    res.status(500).send('DB test failed');
  }
});

const prisma = require('./prisma/client');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.post('/setup-plan', async (req, res) => {
  const {goal, days, equipment} = req.body;

  if (!goal || !days) {
    return res.status(400).json({error: 'Goal and days are required' })
  };

  try {
    const plan = await prisma.workoutPlan.create({
      data: {
        goal,
        days,
        equipment,
      },
    });
    res.status(201).json(plan);
  } catch(err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save plan '})
  }
});

app.get('/today', async (req, res) => {
  const planId = req.query.planId;

  if (!planId) {
    return res.status(400).json({ error: 'Missing planId' });
  }

  const id = Number(planId);

  const plan = await prisma.workoutPlan.findUnique({
    where: { id },
  });

  if (!plan) {
    return res.status(404).json({ error: 'Invalid planId' });
  }

  res.json(plan);
});

app.post('/track', async (req, res) => {
  const { planId, date } = req.body;

  if (!planId || !date) {
    return res.status(400).json({ error: 'planId and date are required' });
  }

  try {
    const log = await prisma.workoutLog.create({
      data: {
        planId,
        date: new Date(date),
      },
    });
    res.status(201).json(log);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to log workout' });
  }
});



