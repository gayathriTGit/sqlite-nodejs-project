// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const studentRepo = require('./StudentRepository')


router.get('/:id', async(req, res) => {
    try{
        const id = Number(req.params.id);
        if (Number.isNaN(id)) return res.status(400).json({error: 'invalid id'});
        const student = studentRepo.getStudentInfo(id);
        if (!student) return res.status(404).json({error: 'Student not found'});        
        res.json(student);
    }catch(err) {
        res.status(500).json({message: err.message});
    }
})

router.get("/", async(req, res) => {
    try{
        res.json(studentRepo.getAllStudents());
    }catch(err) {
        res.status(500).json({message: err.message});
    }
})

module.exports = router;