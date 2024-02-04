document.addEventListener('DOMContentLoaded', async () => {
  const patientForm = document.getElementById('patientForm');
  const doctorsDiv = document.getElementById('doctorDiv');
    const doctorForm = document.getElementById('doctorForm');
    const patientsDiv = document.getElementById('patientsDiv');
    const labForm = document.getElementById('labForm');
    const labDiv = document.getElementById('labDiv');
    const labDeleteForm = document.getElementById('LabDeleteForm');
    const DoctorDeleteForm = document.getElementById('DoctorDeleteForm');
    const issueForm = document.getElementById('IssueForm');

    const updateDoctors = async () => {
        const response = await fetch('/getdoctors');
        const doctors = await response.json();

        doctorsDiv.innerHTML = '';

        doctors.forEach((doctor) => {
            const modificationDiv = document.createElement('tr');
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
        const response = await fetch(`/getpatients?doctor_name=${doctorName}`);
        const patients = await response.json();

        patientsDiv.innerHTML = '';

        patients.forEach((patient) => {
            const modificationDiv = document.createElement('tr');
            modificationDiv.innerHTML = `
                <td>${patient.id}</td>
                <td>${patient.name}</td>
                <td>${patient.age}</td>
                <td>${patient.issues}</td>
            `;

            patientsDiv.appendChild(modificationDiv);
        });
    };

   const submitLabForm = async (e) => {
        e.preventDefault();

        const labID = document.getElementById('lab_ID').value;
        const patientID = document.getElementById('PID').value;

        const response = await fetch('/updatelab', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                labID,
                patientID,
            }),
        });

        if (response.ok) {
            console.log('Patient data updated successfully with Lab ID.');
        } else {
            console.error('Failed to update patient data with Lab ID.');
        }
    };

   const submitIssueForm = async (e) => {
        e.preventDefault();

        const Issue = document.getElementById('Issue').value;
        const patientID = document.getElementById('PID').value;

        const response = await fetch('/submitissue', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Issue,
                patientID,
            }),
        });

        if (response.ok) {
            console.log('Patient data updated successfully with Issue.');
        } else {
            console.error('Failed to update patient data with Issue.');
        }
    };

    const updatePatientsByLab = async (labID) => {
      const response = await fetch(`/getpatientsbylab?lab_id=${labID}`);
      const patients = await response.json();

      labDiv.innerHTML = '';

      patients.forEach((patient) => {
          const modificationDiv = document.createElement('tr');
          modificationDiv.innerHTML = `
              <td>${patient.id}</td>
              <td>${patient.name}</td>
              <td>${patient.age}</td>
              <td>${patient.issues}</td>
          `;

          labDiv.appendChild(modificationDiv);
      });
  };
  const updateLabAssignment = async (patientID) => {
    const response = await fetch('/deletelab', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          patientID,
        }),
    });

    if (response.ok) {
        console.log('Lab assignment deleted successfully.');
    } else {
        console.error('Failed to delete lab assignment.');
    }
};

const deleteDoctor = async (PIDToDelete) => {
  const response = await fetch('/deletedoctor', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        PIDToDelete,
      }),
  });

  if (response.ok) {
      console.log('Doctor and associated patient data deleted successfully.');
  } else {
      console.error('Failed to delete doctor and associated patient data.');
  }
};

if (DoctorDeleteForm) {
  DoctorDeleteForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const PIDToDelete = document.getElementById('PIDToDelete').value;

      try {
          deleteDoctor(PIDToDelete);
      } catch (error) {
          console.log(error);
      }
  });
}

if (labDeleteForm) {
    labDeleteForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const patientIDToDelete = document.getElementById('patientIDToDelete').value;

        try {
            updateLabAssignment(patientIDToDelete);
        } catch (error) {
            console.log(error);
        }
    });
}

  if (labForm) {
      labForm.addEventListener('submit', async (e) => {
          e.preventDefault();
          const labID = document.getElementById('lab_ID').value;
          try {
              updatePatientsByLab(labID);
          } catch (error) {
              console.log(error);
          }
      });
  }

    if (doctorForm) {
        doctorForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const doctorName = document.getElementById('doctor_name').value;
            try {
                updatePatients(doctorName);
            } catch (error) {
                console.log(error);
            }
        });
    }
    if(patientForm){
      updateDoctors();
      patientForm.addEventListener('submit', async (e) => {
          try {
            updateDoctors();
          } catch (error) {
              console.log(error)
          }
      })
    }

    if (labForm) {
        labForm.addEventListener('submit', submitLabForm);
    }
    if (issueForm) {
      issueForm.addEventListener('submit', submitIssueForm);
    }
});
