const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const app = express();
const PORT = 3000;

try {
    mongoose.connect('mongodb+srv://Dusty:Vedant2006%40%23%24@cluster0.by28ib4.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Database connection established...');
} catch (error) {
    console.log(`cannot connect to Mongoose ${error.message}`);
}

const patientSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: false,
        required: true,
      },
    name: {
        type: String,
        unique: false,
        required: true
    },
    age: {
        type: Number,
        unique: false,
        required: true
    },
    issues: {
        type: String,
        unique: false,
        required: true
    },
    lab_assigned: {
        type: String,
        unique: false,
        required: false
    },
    doctor_assigned: {
        type: String,
        unique: false,
        required: false
    },
    
});

const doctorsSchema = new mongoose.Schema({
    doctor_name: {
        type: String,
    },
    specialization: {
        type: String,
    },
    patient_id: {
        type: String,
    },
    working_days: {
        type: String,
    },
})

const Post = mongoose.model('patients', patientSchema);
const Doctor = mongoose.model('doctors', doctorsSchema);

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.json());
app.get('/', async (req, res) => {
    res.sendFile(__dirname + '/public/pages/index.html')
});

app.post('/send', async (req, res) => {
    try {
    const { doctor_assigned } = req.body;
    const doctorString = String(doctor_assigned)
    const Doctors = await Doctor.findOne({ doctor_name: doctorString });
    const randomDecimal = Math.random();
    const id = `PID${Math.floor(randomDecimal * 100) + 1}`;

        const newPost = new Post({
            id: id,
            name: req.body.name,
            age: req.body.age,
            issues: req.body.issues,
            lab_assigned: req.body.lab_assigned,
            doctor_assigned: req.body.doctor_assigned
        });

        Doctors.patient_id += id;
        Doctors.save();
    await newPost.save();
        res.send({ status: 'success' });
    } catch (err) {
        console.error(err);
        res.status(500).send({ status: 'failed' });
    }
});

app.get('/getpatients', async (req, res) => {
    try {
        const doctorName = req.query.doctor_name;
        const posts = await Post.find({ doctor_assigned: doctorName });
        res.json(posts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/getdoctors', async (req, res) => {
    try {
        const Doctors = await Doctor.find();
        res.json(Doctors);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/updatelab', async (req, res) => {
    try {
        const { labID, patientID } = req.body;

        await Post.findOneAndUpdate({ id: patientID }, { lab_assigned: labID });

        res.status(200).json({ status: 'success' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'failed' });
    }
});

app.get('/getpatientsbylab', async (req, res) => {
    try {
        const labID = req.query.lab_id;
        const patients = await Post.find({ lab_assigned: labID });
        res.json(patients);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/submitissue', async (req, res) => {
    try {
        const { patientID, Issue } = req.body;

        await Post.findOneAndUpdate({ id: patientID }, { issues: Issue });

        res.status(200).json({ status: 'success' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'failed' });
    }
});

app.post('/deletelab', async (req, res) => {
    try {
        const { patientID } = req.body;

        await Post.findOneAndUpdate({ id: patientID }, { lab_assigned: "" });

        res.status(200).json({ status: 'success' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'failed' });
    }
});
app.post('/deletedoctor', async (req, res) => {
    try {
        const { PIDToDelete } = req.body;
        await Post.findOneAndDelete({ id: PIDToDelete });
        await Doctor.findOneAndUpdate({ patient_id: PIDToDelete}, { patient_id: ''})
        res.status(200).json({ status: 'success' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'failed' });
    }
});
app.use('/style.css', express.static(__dirname + '/pages/style.css'));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
module.exports = Doctor;