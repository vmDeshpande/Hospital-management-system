document.addEventListener("DOMContentLoaded", async () => {
  toggleAuthLinks();
  const patientForm = document.getElementById("patientForm");
  const doctorsDiv = document.getElementById("doctorDiv");
  const doctorForm = document.getElementById("doctorForm");
  const patientsDiv = document.getElementById("patientsDiv");
  const bedForm = document.getElementById("bedForm");
  const DoctorDeleteForm = document.getElementById("DoctorDeleteForm");
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const logoutButton = document.getElementById('logoutButton');

        logoutButton.addEventListener('click', () => {
            fetch('/logout')
                .then(response => response.json())
                .then(data => {
                    console.log(data.message);
                    window.location.href = '/pages/login.html';
                })
                .catch(error => console.error('Error:', error));
        });

  async function toggleAuthLinks() {
    const loginLink = document.getElementById("loginLink");
    const registerLink = document.getElementById("registerLink");
    const logoutButton = document.getElementById("logoutButton");
    const booking = document.getElementById("booking");
  
    console.log("waiting for login...");
    if (await isUser()) {
      console.log("User Logged in");
      loginLink.style.display = "none";
      registerLink.style.display = "none";
      logoutButton.style.display = "inline";
      booking.style.display = "inline";
    } else {
      console.log("no one logged in");
      loginLink.style.display = "inline";
      registerLink.style.display = "inline";
      logoutButton.style.display = "none";
      booking.style.display = "none";
    }
  }

  async function isUser() {
    try {
      const response = await fetch("/check-auth-status");
      const data = await response.json();
  
      return data.isUser || false;
    } catch (error) {
      console.error("Error checking company status:", error);
      return false;
    }
  }

    const submitLoginForm = async (e) => {
        e.preventDefault();

        const aadhaar = document.getElementById('aadhaar').value;
        const password = document.getElementById('password').value;

        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                aadhaar,
                password,
            }),
        });

        if (response.ok) {
            console.log('Login successful.');
            alert("Login successful")
            window.location.href = './index.html';
        } else {
            alert("Login failed")
            console.error('Login failed.');
        }
    };

    const submitRegisterForm = async (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const phone = document.getElementById('phone').value;
        const aadhaar = document.getElementById('aadhaar').value;

        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
                phone,
                aadhaar,
            }),
        });

        if (response.ok) {
            console.log('Registration successful.');
            // Redirect or perform any actions after successful registration
        } else {
            console.error('Registration failed.');
            // Handle registration failure
        }
    };

    if (loginForm) {
        loginForm.addEventListener('submit', submitLoginForm);
    }

    if (registerForm) {
        registerForm.addEventListener('submit', submitRegisterForm);
    }

  const updateDoctors = async () => {
    const response = await fetch("/getdoctors");
    const doctors = await response.json();

    doctorsDiv.innerHTML = "";

    doctors.forEach((doctor) => {
      const modificationDiv = document.createElement("tr");
      modificationDiv.innerHTML = `
                <td>${doctor.doctor_name}</td>
                <td>${doctor.specialization}</td>
                <td>${doctor.patient_id}</td>
                <td>${doctor.working_days}</td>
            `;

      doctorsDiv.appendChild(modificationDiv);
    });
  };

  const updatePatients = async (doctorName) => {
    const response = await fetch(`/getpatients?patient_name=${doctorName}`);
    const patients = await response.json();

    patientsDiv.innerHTML = "";

    patients.forEach((patient) => {
      const modificationDiv = document.createElement("tr");
      modificationDiv.innerHTML = `
                <td>${patient.id}</td>
                <td>${patient.name}</td>
                <td>${patient.age}</td>
                <td>${patient.issues}</td>
            `;

      patientsDiv.appendChild(modificationDiv);
    });
  };

  const submitbedForm = async (e) => {
    e.preventDefault();

    const bed = document.getElementById("bed").value;
    const patientID = document.getElementById("PID").value;

    const response = await fetch("/updatelab", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bed,
        patientID,
      }),
    });

    if (response.ok) {
      console.log("Patient data updated successfully with Lab ID.");
    } else {
      console.error("Failed to update patient data with Lab ID.");
    }
  };

  const deleteDoctor = async (PIDToDelete) => {
    const response = await fetch("/deletedoctor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        PIDToDelete,
      }),
    });

    if (response.ok) {
      console.log("Doctor and associated patient data deleted successfully.");
    } else {
      console.error("Failed to delete doctor and associated patient data.");
    }
  };

  if (DoctorDeleteForm) {
    DoctorDeleteForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const PIDToDelete = document.getElementById("PIDToDelete").value;

      try {
        deleteDoctor(PIDToDelete);
      } catch (error) {
        console.log(error);
      }
    });
  }

  if (doctorForm) {
    doctorForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const doctorName = document.getElementById("patient_name").value;
      try {
        updatePatients(doctorName);
      } catch (error) {
        console.log(error);
      }
    });
  }
  if (patientForm) {
    updateDoctors();
    patientForm.addEventListener("submit", async (e) => {
      try {
        updateDoctors();
      } catch (error) {
        console.log(error);
      }
    });
  }

  if (bedForm) {
    bedForm.addEventListener("submit", submitbedForm);
  }
});
