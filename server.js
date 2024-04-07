const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const ejs = require('ejs');
const app = express();
const crypto = require('crypto');
const secretKey = crypto.randomBytes(64).toString('hex');
const PORT = 3000;

app.use(session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true,
}));

try {
    mongoose.connect('mongodb+srv://Dusty:Vedant2006%40%23%24@cluster0.by28ib4.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Database connection established...');
    })
    .catch((error) => {
        console.log(`Cannot connect to Mongoose: ${error.message}`);
    });
} catch (error) {
    console.log(`cannot connect to Mongoose ${error.message}`);
}

const Post = require('./public/models/appointmentSchema');
const Doctor = require('./public/models/doctorsSchema');
const User = require('./public/models/userSchema');
const Hospital = require('./public/models/hospitalSchema');


// example entry
// const cityHospitalList = [
//     {
//         name: 'Mumbai',
//         hospitals: ['Shri Sant Gadge Maharaj Maternity & General Hospital', 'Xenon Multispeciality', 'Sanghvi Hospital', 'BAXAY PRIME (Primary Health Center)', 'Aayush Multispeciality Hospital & Advanced Laproscopy Centre']
//     },
//     {
//         name: 'Pune',
//         hospitals: ['Sahyadri Super Speciality Hospital - Deccan', 'Unicare Hospital', 'Aditya Birla Memorial Hospital', 'Easyheals Healthcare Marketplace', 'Amrute Hospital']
//     },
//     {
//         name: 'Nagpur',
//         hospitals: ['Hcg Cancer Centre', 'Kims - Kingsway Hospitals', 'Upcharya An Institute Of Orthopaedic Surgery and Trauma Care Centre']
//     },
//     {
//         name: 'Nashik',
//         hospitals: ['Chopda Hospital', 'Namco Charitable Trust Multispeciality Hospital', 'Symphony Hospital']
//     },
//     {
//         name: 'Aurangabad',
//         hospitals: ['Wadgaonkar Eye Hospital', 'United Ciigma Hospital', 'Aasha Kendra Ardhangwayu Dawakhana Badnapur']
//     },
//     {
//         name: 'Solapur',
//         hospitals: ['Chitale Clinic Pvt Ltd', 'Shri Vishwarpan Ayurved Panchakarma Centre', 'Venkateshwara Maternity Home']
//     },
//     {
//         name: 'Jalgaon',
//         hospitals: ['Dr. Rohan Patil - Piyush Hospital', 'Mulik Eye Hospital', 'Anand Hospital and Dialysis Unit']
//     },
//     {
//         name: 'Malegaon',
//         hospitals: ['Mamta Maternity Surgical General Hospital', 'Saiseva Hospital', 'Diya Eye Care']
//     },
//     {
//         name: 'Dhule',
//         hospitals: ['Deore Eye & ENT Hospital and Shri Ramchandra Netralaya', 'Shree Chatrapati Neurotrauma and Superspeciality Hospital', 'Anjana Heart Hospital']
//     },
// ];

// const addInventoryOptions = (cities) => {
//     return cities.map(city => ({
//         name: city.name,
//         hospitals: city.hospitals.map(hospital => ({
//             name: hospital,
//             inventory: {
//                 medicalEquipment: 100,
//                 beds: 50,
//             },
//             doctors: [
//                 {
//                     doctor_name: "Dr. John Doe",
//                     specialization: "General Medicine",
//                     patient_id: "",
//                     working_days: "Monday to Friday"
//                 },
//                 {
//                     doctor_name: "Dr. Jane Smith",
//                     specialization: "Pediatrics",
//                     patient_id: "",
//                     working_days: "Monday to Saturday"
//                 }
//             ]
//         })),
//     }));
// };

// const hospitalData = {
//     cities: addInventoryOptions(cityHospitalList),
// };

// const exampleHospital = new Hospital(hospitalData);

// exampleHospital.save()
//     .then(savedHospital => {
//         console.log('Hospital data saved successfully:');
//     })
//     .catch(error => {
//         console.error('Error saving hospital data:', error);
//     });


app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.json());
app.get('/', async (req, res) => {
    res.sendFile(__dirname + '/public/pages/home.html')
});

app.get('/getcities', async (req, res) => {
    try {
        const cities = await Hospital.find().distinct('cities.name');
        res.json(cities);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/inventory', async (req, res) => {
    try {
        const hospitalName = req.query.hospitalName; // Use req.query instead of req.params

        // Find the hospital in the database
        const hospital = await Hospital.findOne({ 'cities.hospitals.name': hospitalName });

        if (!hospital) {
            return res.status(404).json({ error: 'Hospital not found' });
        }

        // Find the city containing the specified hospital
        const cityWithHospital = hospital.cities.find(city => city.hospitals.some(h => h.name === hospitalName));

        if (!cityWithHospital) {
            return res.status(404).json({ error: 'Hospital not found in any city' });
        }

        // Extract inventory data for the specified hospital
        const inventoryData = cityWithHospital.hospitals.find(h => h.name === hospitalName).inventory;

        res.json({ hospitalName, inventoryData });
    } catch (error) {
        console.error('Error fetching inventory data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});




// Get hospitals based on the selected city
app.get('/gethospitals', async (req, res) => {
    try {
        const selectedCity = req.query.city;
        const hospitalsData = await Hospital.findOne({ 'cities.name': selectedCity }, 'cities.$');
        
        if (hospitalsData && hospitalsData.cities.length > 0) {
            const hospitals = hospitalsData.cities[0].hospitals;
            res.json(hospitals);
        } else {
            res.json([]);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.post('/login', async (req, res) => {
    try {
        const { aadhaar, password } = req.body;
        const user = await User.findOne({ aadhaar });

        if (user && user.password) {
            // Set user information in the session
            req.session.user = user

            res.status(200).json({ status: 'success' });
        } else {
            res.status(401).json({ status: 'failure' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'error' });
    }
});

app.post("/register", async (req, res) => {
  try {
    const { username, password, phone, aadhaar } = req.body;
    const randomDecimal = Math.random();
    const id = `PID${Math.floor(randomDecimal * 100) + 1}`;
    const newUser = new User({
      id,
      username,
      password: password,
      phone,
      aadhaar,
    });

    await newUser.save();
    res.status(200).json({ status: "success" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error" });
  }
});

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            res.status(500).json({ message: 'Logout failed' });
        } else {
            res.json({ message: 'Logout successful' });
        }
    });
});

app.get('/check-auth-status', (req, res) => {
    const isAuthenticated = req.session.user;

    const isUser = req.session.user !== undefined;

    res.json({ isAuthenticated, isUser });
});

app.post('/send', async (req, res) => {
    try {
    const loggedInUser = req.session.user;

        const newPost = new Post({
            id: loggedInUser.id,
            name: loggedInUser.username,
            age: req.body.age,
            issues: req.body.issues,
            city: req.body.city,
            hospital: req.body.hospital
        });
    await newPost.save();
    res.status(200).json({ status: 'success' });
    } catch (err) {
        console.error(err);
        res.status(500).send({ status: 'failed' });
    }
});

app.get('/getpatients', async (req, res) => {
    try {
        const patientName = req.query.patient_name;
        const posts = await Post.find({ name: patientName });
        res.json(posts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/getdoctors', async (req, res) => {
    try {
        const selectedHospital = req.query.hospital;
        
        // Query to find the specific hospital and retrieve its doctors
        const hospital = await Hospital.findOne(
            { 'cities.hospitals': { $elemMatch: { name: selectedHospital } } }
        );

       if(hospital) {      
            const hospitalData = hospital.cities.find(city => city.hospitals.some(h => h.name === selectedHospital));
            const doctorsList = hospitalData ? hospitalData.hospitals.find(h => h.name === selectedHospital).doctors || [] : [];
            if(doctorsList){
                res.json(doctorsList);
            } else {
                
            }
        } else {
            
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/updatelab', async (req, res) => {
    try {
        const { bed, patientID, normalHospital, encodedHospital, city } = req.body;

        // Update the bed count for the patient in the Post collection
        await Post.findOneAndUpdate({ id: patientID }, { bed: bed });

        // Find the hospital in the specified city
        const hospital = await Hospital.findOne({ 'cities.name': city, 'cities.hospitals.name': normalHospital });

        // Update the inventory of the hospital
        if (hospital) {
            const cityIndex = hospital.cities.findIndex(cityy => cityy.name === city);
            const hospitalIndex = hospital.cities[cityIndex].hospitals.findIndex(h => h.name === normalHospital);
            if (hospitalIndex !== -1) {
                hospital.cities[cityIndex].hospitals[hospitalIndex].inventory.beds -= bed;
                await hospital.save();
            } else {
                console.log('Hospital not found in the city');
            }
        } else {
            console.log('Hospital not found');
        }

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

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});