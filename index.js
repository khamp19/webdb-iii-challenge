const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = require('./knexfile');

const db = knex(knexConfig.development);

const server = express();
server.use(helmet());
server.use(express.json());
const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});

server.get('/', (req, res) => {
  res.send('welcome!');
})
//To Do:
  //API Endpoints
  
//This route should save a new cohort to the database.
// `[POST] /api/cohorts` 
server.post('/api/cohorts', async (req, res) => {
  try {
    [id] = await db('cohorts').insert(req.body);

    const newCohort = await db('cohorts')
      .where({ id })
      .first();
    res.status(200).json(newCohort);
  } catch (err) {
    res.status(500).json({ msg: 'an error occurred', err});
  }
})

//This route will return an array of all cohorts.
// `[GET] /api/cohorts` 
server.get('/api/cohorts', async (req, res) => {
  try {
    const cohorts = await db('cohorts');
    res.status(200).json(cohorts);
  } catch (err) {
    res.status(500).json({ msg: 'cannot get cohorts', err})
  }
})

//This route will return the cohort with the matching`id`.
// `[GET] /api/cohorts/:id` 
server.get('/api/cohorts/:id', async (req, res) => {
  try {
    const cohort = await db('cohorts')
      .where({ id: req.params.id })
      .first();
    res.status(200).json(cohort)
  } catch (err) {
    res.status(500).json({ msg: 'cannot get cohort', err});
  }
})

// returns all students for the cohort with the specified`id`.
// `[GET] /api/cohorts/:id/students` 
//You have to SELECT ALL from table cohorts WHERE id = x
server.get('/api/cohorts/:id/students', async (req, res) => {
  try {
    const students = await db('students')
      .where({ cohort_id: req.params.id })
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ msg: 'cannot get cohort students'});
  }
})

// This route will update the cohort with the matching`id` using information sent in the body of the request.
// `[PUT] /api/cohorts/:id` 
server.put('/api/cohorts/:id', async (req, res) => {
  try {
    const count = await db('cohorts')
      .where({ id: req.params.id })
      .update(req.body);
    if (count > 0) {
      const cohort = await db('cohorts')
        .where({ id: req.params.id })
        .first();
      res.status(200).json(cohort);
    } else {
      res.status(404).json({ msg: 'cohort not found' });
    }
  } catch (error) {
    res.status(500).json({ msg: 'cannot update cohort'})
  }
})

// This route should delete the specified cohort.
// `[DELETE] /api/cohorts/:id` 
server.delete('/api/cohorts/:id', async (req, res) => {
  try {
    const count = await db('cohorts')
      .where({ id: req.params.id})
      .del();
    if(count > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({msg: 'record not found'})
    }
  } catch (err) {
    res.status(500).json({msg: 'cannot delete', err});
  }
})

//stretch problems:
//This route will return an array of all students.
//`[GET] /students` 
server.get('/students', async (req, res) => {
  try {
    const students = await db('students');
    res.status(200).json(students)
  } catch (err) {
    res.status(500).json({msg: 'cannot get students', err})
  }
})

//`[GET] /students/:id` 
//This route will return the student with the matching`id`.
// Have the student returned by the`[GET] /students/:id` endpoint include the cohort name 
  //and remove the`cohort_id` fields.The returned object should look like this:
  // {
  //   id: 1,
  //     name: 'Lambda Student',
  //       cohort: 'Full Stack Web Infinity'
  // }
//not working
server.get('/students/:id', async (req, res)=> {
  try {
    const student = await db('students')
      .where({ id: req.params.id })
      .first()
      .select('name').from('cohorts').where('id', '=', 'student.cohort_id' )
    res.status(200).json(student);
  } catch (err) {
    res.status(500).json({err})
  }
})