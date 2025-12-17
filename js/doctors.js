// js/doctors.js

/**
 * Mock function to simulate booking an appointment.
 * @param {string} doctorName
 */
function bookAppointment(doctorName) {
  if (
    confirm(
      `Do you want to confirm your appointment with ${doctorName} for the selected slot?`
    )
  ) {
    // Mock API call simulation
    setTimeout(() => {
      // Use the global utility from app.js
      window.showToast(
        `Success! Your appointment with ${doctorName} is confirmed. Check your email.`,
        "success"
      );
      // Logic to disable the booked slot could go here
    }, 500);
  }
}

const doctors = [
  {
    name: "Dr. Sarah Khan",
    specialty: "Cardiologist",
    experience: 12,
    rating: 4.8,
    reviews: 250,
    fee: 850,
    slots: ["10:00 AM", "11:30 AM", "02:00 PM"],
  },
  {
    name: "Dr. Rohit Sharma",
    specialty: "General Physician",
    experience: 8,
    rating: 4.5,
    reviews: 180,
    fee: 600,
    slots: ["09:00 AM", "03:00 PM"],
  },
  {
    name: "Dr. Asha Verma",
    specialty: "Dermatologist",
    experience: 10,
    rating: 4.6,
    reviews: 140,
    fee: 700,
    slots: ["11:00 AM", "04:00 PM"],
  },
  {
    name: "Dr. Meera Patel",
    specialty: "Pediatrician",
    experience: 9,
    rating: 4.7,
    reviews: 200,
    fee: 650,
    slots: ["10:30 AM", "01:00 PM"],
  },
  {
    name: "Dr. Ajay Menon",
    specialty: "Neurologist",
    experience: 15,
    rating: 4.9,
    reviews: 320,
    fee: 1200,
    slots: ["12:00 PM", "03:30 PM"],
  },
  {
    name: "Dr. Kavita Desai",
    specialty: "Orthopedist",
    experience: 11,
    rating: 4.4,
    reviews: 95,
    fee: 900,
    slots: ["09:30 AM", "02:30 PM"],
  },
];

function renderDoctors(list = doctors) {
  const container = document.getElementById("doctor-list");
  if (!container) return;

  if (!list.length) {
    container.innerHTML = `
      <div class="text-center p-8 bg-white rounded-xl shadow-inner text-gray-500">
        <p>No doctors found. Try widening your filters.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = list
    .map((d) => {
      const slotsHtml = d.slots
        .slice(0, 3)
        .map(
          (s, i) =>
            `<button class="p-2 text-sm ${
              i === d.slots.length - 1
                ? "bg-teal-600 text-white"
                : "bg-teal-50 text-teal-700"
            } rounded-md hover:bg-teal-100 transition" ${
              i === d.slots.length - 1
                ? `onclick="bookAppointment('${d.name}')"`
                : ""
            }>${s}</button>`
        )
        .join("");

      return `
        <div class="bg-white p-6 rounded-xl shadow-md border-l-4 border-teal-500 flex flex-col md:flex-row justify-between items-start md:items-center">
          <div class="flex-grow mb-4 md:mb-0">
            <h4 class="text-2xl font-bold text-gray-900">${d.name}</h4>
            <p class="text-teal-600 font-semibold mb-2">
              ${d.specialty} - ${d.experience} Years Experience
            </p>
            <div class="flex items-center text-yellow-500 mb-2">
              <span class="font-bold mr-2">${d.rating}</span>
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"></svg>
              <span class="text-gray-500 ml-2">(${d.reviews} Reviews)</span>
            </div>
            <p class="text-gray-700">
              Fee: <span class="font-bold text-lg text-green-600">₹${d.fee}</span>
            </p>
          </div>
          <div class="flex flex-col space-y-2 w-full md:w-auto">
            <p class="text-sm text-gray-500">Next Available Slot:</p>
            <div class="grid grid-cols-3 gap-2">
              ${slotsHtml}
            </div>
          </div>
        </div>
      `;
    })
    .join("");
}

function filterDoctors(specialty = "All", name = "") {
  const nameLower = name.trim().toLowerCase();
  return doctors.filter((d) => {
    const matchesSpecialty = specialty === "All" || d.specialty === specialty;
    const matchesName = !nameLower || d.name.toLowerCase().includes(nameLower);
    return matchesSpecialty && matchesName;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("Doctor Booking Module Loaded.");

  // Populate specialty select dynamically (keeps existing options if present)
  const specialtySelect = document.getElementById("specialty-select");
  if (specialtySelect) {
    const existing = Array.from(specialtySelect.options).map((o) => o.value);
    const unique = Array.from(new Set(doctors.map((d) => d.specialty)));
    unique.forEach((s) => {
      if (!existing.includes(s)) {
        const opt = document.createElement("option");
        opt.value = s;
        opt.textContent = s;
        specialtySelect.appendChild(opt);
      }
    });
  }

  // Initial render
  renderDoctors(doctors);

  // Filter button logic
  const applyBtn = document.getElementById("apply-filters");
  if (applyBtn) {
    applyBtn.addEventListener("click", () => {
      const specialty = document.getElementById("specialty-select").value;
      const name = document.getElementById("search-name").value;
      const filtered = filterDoctors(specialty, name);
      renderDoctors(filtered);
      window.showToast("Filter applied.", "info");
    });
  }

  // Optional: filter on change
  if (specialtySelect) {
    specialtySelect.addEventListener("change", () => {
      document.getElementById("apply-filters").click();
    });
  }
});
