<<<<<<< HEAD
# Hospital-Management-System
=======
# Hospital Management System

A simple Hospital Management System implemented using HTML, CSS, JavaScript (Node.js with Express), and MongoDB.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Contributing](#contributing)

## Overview

This Hospital Management System allows for the registration of patients, assignment of doctors and labs, fetching patient information based on doctors and labs, updating lab assignments, and even includes functionality for deleting doctors and associated patient data.

## Features

- Patient Registration
- Doctor Assignment
- Lab Assignment
- Fetching Patient Information by Doctor
- Fetching Patient Information by Lab
- Updating Lab Assignments
- Deleting Doctors and Associated Patient Data

## Project Structure

The project structure follows the MVC (Model-View-Controller) architecture.

```plaintext
Hospital-Management-System/
|-- public/
|   |-- pages/
|       |-- doctor.html
|       |-- lab.html
|       |-- patient.html
|       |-- index.html
|   |-- style.css
|-- src/
|   |-- app.js
|   |-- controllers/
|       |-- doctorController.js
|       |-- labController.js
|       |-- patientController.js
|   |-- models/
|       |-- doctorModel.js
|       |-- labModel.js
|       |-- patientModel.js
|   |-- routes/
|       |-- doctorRoutes.js
|       |-- labRoutes.js
|       |-- patientRoutes.js
|   |-- views/
|       |-- doctorView.ejs
|       |-- labView.ejs
|       |-- patientView.ejs
|-- .gitignore
|-- package.json
|-- README.md
```
## Getting Started
1. Clone the repository:
```
git clone https://github.com/your-username/Hospital-Management-System.git
cd Hospital-Management-System
```
2. Install dependencies:
```
npm install
```
3. Set up MongoDB:
- Create a MongoDB Atlas account and set up a cluster.
- Obtain the connection string and replace it in `app.js` and `labModel.js.`
4. Run the application:
```
npm start
```

## Usage

- Access the Hospital Management System at `http://localhost:3000` in your web browser.
- Follow the provided forms to register patients, assign doctors and labs, fetch patient information, update lab assignments, and more.

## Contributing

Contributions are welcome! Please feel free to open issues or submit pull requests.
>>>>>>> b62b6134380c011d643e29739edac7a87c75e646
