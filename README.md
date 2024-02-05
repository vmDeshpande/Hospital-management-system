# Hospital Management System

A simple Hospital Management System implemented using HTML, CSS, JavaScript (Node.js with Express), and MongoDB.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

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
