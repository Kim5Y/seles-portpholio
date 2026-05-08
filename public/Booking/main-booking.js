function getBookingValues() {
    const inputs = document.querySelectorAll("input#input");
    const firstName = inputs[0] ? inputs[0].value.trim() : "";
    const lastName = inputs[1] ? inputs[1].value.trim() : "";
    const email = inputs[2] ? inputs[2].value.trim() : "";
    const dateEl = document.getElementById("date");
    const date = dateEl ? dateEl.value : "";

    return { firstName, lastName, email, date };
}

async function submitBooking(event) {
    event.preventDefault();

    const { firstName, lastName, email, date } = getBookingValues();
    if (!firstName || !lastName || !email || !date) {
        alert("Please fill in all fields.");
        return;
    }

    const button = document.getElementById("button");
    const prevLabel = button ? button.value : null;
    if (button) {
        button.disabled = true;
        button.value = "SENDING...";
    }

    try {
        const res = await fetch("/api/booking", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                date,
                package: "booking.html",
            }),
        });

        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
            throw new Error((data && data.error) || "Failed to send booking request.");
        }

        alert("Booking request sent. We will contact you soon.");
        const form = document.getElementById("booking-form");
        if (form) form.reset();
    } catch (err) {
        alert(err && err.message ? err.message : "Something went wrong.");
    } finally {
        if (button) {
            button.disabled = false;
            if (prevLabel) button.value = prevLabel;
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("booking-form");
    if (form) form.addEventListener("submit", submitBooking);
});
