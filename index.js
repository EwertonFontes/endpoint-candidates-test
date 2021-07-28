'use strict';

const express = require('express');
const app = express();
app.use(express.json());

let candidates = [
    {
        "id": "P1",
        "name": "Person 1",
        "skills": [ "javascript", "es6", "nodejs", "express" ]
      },
      
      {
        "id": "P2",
        "name": "Person 2",
        "skills": [ "javascript", "typescript", "php"]
      },
      
      {
        "id": "P3",
        "name": "Person 3",
        "skills": [ "pyhton", "go", "java", "php", "typescript" ]
      },
      
      {
        "id": "P4",
        "name": "Person 4",
        "skills": [ "javascript", "es6", "nodejs", "express", "aws", "azure" ]
      },
      
      
      {
        "id": "P5",
        "name": "Person 5",
        "skills": [ "sql", "elixir", "elm", "c", "c++", "azure" ]
      }
]
// Your code starts here. Placeholders for .get and .post are provided for
//  your convenience.

app.post('/candidates', function(req, res) {
    if (req.body.constructor === Object && Object.keys(req.body).length > 0) {
        let candidate = req.body
        candidates.push(candidate)
        res.send('Candidate successfully added')
    } else {
        res.status(400).send('has no body');
    }
});

app.get('/candidates/search', function(req, res) {
    if (Object.keys(req.query).length > 0) {
        if (candidates.length > 0) {
            let skills = req.query.skills
            let eachSkill = skills.split(',')
            let amt_skills_found = 0
            candidates.forEach(candidate => {
                let candidate_amt_skills = 0
                eachSkill.forEach(skill => {
                    let candidates_skill = candidate.skills.filter(s => s === skill)
                    if (candidates_skill.length > 0) {
                        candidate_amt_skills+=1
                        amt_skills_found+=1
                    }
                })
                candidate['candidate_amt_skills'] = candidate_amt_skills
            })
            
            if (amt_skills_found > 0) {
                let max_skill = Math.max.apply(Math, candidates.map(function(candidate) { return candidate.candidate_amt_skills; }))
                let candidates_skills = candidates.find(candidate => candidate.candidate_amt_skills === max_skill);

                let candidate = {
                    'id': candidates_skills['id'],
                    'name': candidates_skills['name'],
                    'skills': candidates_skills['skills']
                }
                
                res.send(candidate)
            } else {
                res.status(404).send('No candidates match any skill');
            }
        } else {
            res.status(404).send('No candidates registered');    
        }
    } else {
        res.status(400).send('Has no skills to find');
    }
    
});

const PORT = process.env.HTTP_PORT || 3000
app.listen(PORT, () => {
    console.log(`Listening port:  ${PORT}`)
});
