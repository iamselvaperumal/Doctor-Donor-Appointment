// js/donation.js

let currentStep = 1;

function getDonors() {
  return JSON.parse(localStorage.getItem("donors") || "[]");
}

function saveDonor(donor) {
  const donors = getDonors();
  donors.unshift(donor);
  localStorage.setItem("donors", JSON.stringify(donors));
}

function renderDonorList() {
  const donors = getDonors();
  const section = document.getElementById("donor-list-section");
  const table = document.getElementById("donor-table");
  const count = document.getElementById("donor-count");

  if (!section || !table || !count) return;

  if (donors.length === 0) {
    section.classList.add("hidden");
    table.innerHTML = "";
    count.textContent = "0 donors registered";
    return;
  }

  section.classList.remove("hidden");
  count.textContent = `${donors.length} donor(s) registered`;

  table.innerHTML = donors
    .map((d) => {
      const registered = new Date(d.registeredAt).toLocaleString();
      const organs =
        d.organs && d.organs.length ? d.organs.join(", ") : "(None)";
      return `
        <tr class="border-t">
          <td class="py-3">${d.name}</td>
          <td class="py-3">${d.dob}</td>
          <td class="py-3">${d.email}</td>
          <td class="py-3">${organs}</td>
          <td class="py-3">${registered}</td>
        </tr>
      `;
    })
    .join("");
}

function clearAllDonors() {
  localStorage.removeItem("donors");
  renderDonorList();
  window.showToast("Donor list cleared.", "info");
}

/**
 * Manages the multi-step form navigation.
 * @param {number} step - The step number to navigate to (1, 2, or 3).
 */
function nextStep(step) {
  const totalSteps = 3;
  const form = document.getElementById("donation-form");

  // Basic client-side validation for Step 1
  if (currentStep === 1 && step === 2) {
    const name = document.getElementById("donor-name").value;
    const email = document.getElementById("donor-email").value;

    if (!name || !email || !document.getElementById("donor-dob").value) {
      window.showToast(
        "Please fill out all required fields in Step 1.",
        "error"
      );
      return;
    }
  }

  // Hide all steps
  document
    .querySelectorAll(".step-content")
    .forEach((el) => el.classList.add("hidden"));

  // Show the target step
  document.getElementById(`step-${step}`).classList.remove("hidden");
  currentStep = step;

  // Update the progress circles and text
  for (let i = 1; i <= totalSteps; i++) {
    const circle = document.getElementById(`step-${i}-circle`);
    if (i < currentStep) {
      circle.classList.remove("bg-gray-300", "text-gray-600");
      circle.classList.add("bg-green-600", "text-white");
    } else if (i === currentStep) {
      circle.classList.remove("bg-gray-300", "text-gray-600");
      circle.classList.add("bg-green-600", "text-white");
    } else {
      circle.classList.remove("bg-green-600", "text-white");
      circle.classList.add("bg-gray-300", "text-gray-600");
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("Organ Donation Module Loaded.");

  // Handle form submission from Step 2
  document
    .getElementById("donation-form")
    .addEventListener("submit", (event) => {
      event.preventDefault();

      if (currentStep !== 2) return;

      if (!document.getElementById("consent-check").checked) {
        window.showToast("You must check the consent box to proceed.", "error");
        return;
      }

      // Gather donor data
      const donorName = document.getElementById("donor-name").value;
      const donorDob = document.getElementById("donor-dob").value;
      const donorEmail = document.getElementById("donor-email").value;
      const organs = Array.from(
        document.querySelectorAll(".organ-checkbox:checked")
      ).map((c) => c.value);

      const donor = {
        name: donorName,
        dob: donorDob,
        email: donorEmail,
        organs,
        registeredAt: new Date().toISOString(),
      };

      // Save locally (mock for API)
      saveDonor(donor);

      // Simulate API call success
      setTimeout(() => {
        document.getElementById("step-3").innerHTML = document
          .getElementById("step-3")
          .innerHTML.replace("[Donor Name]", donorName);
        nextStep(3); // Go to the confirmation page
        window.showToast(
          "Registration Complete! Thank you for your decision.",
          "success"
        );
        renderDonorList();
      }, 1000);
    });

  // Attach clear donors button
  const clearBtn = document.getElementById("clear-donors");
  if (clearBtn) clearBtn.addEventListener("click", clearAllDonors);

  // Initialize to Step 1 and render list
  nextStep(1);
  renderDonorList();
});
