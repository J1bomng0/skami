const termList = [
    "ეთანხმებით, წესებსა და პირობებს.",
    "თანახმა ხართ შექმნათ ანგარიში, აპლიკაციაში შესასვლელად.",
    "ადასტურებთ რომ ხართ სრულწლოვანი, არასრულწოლოვნების შემთხვევაში გაქვთ მშობლის თანხმობა",
    "ყველა კონტენტი ეკუთვნის აპლიკაციას და დაცულია საავტორო უფლებების კანონით.",
    "არ გაქვთ უფლება ჩაერთოთ საქმიანობაში, რომელიც აზიანებს აპლიკაციას ან არღვევს კანონს.",
    "თანხმა ვარ, დაამუშავოთ და გაყიდოთ ჩემი მონაცემები საჭიროებისამებრ და ისე, როგორც შემქმნელებს მოესურვებათ",
    "ზოგიერთი ფუნქცია შეიძლება საჭიროებდეს გადახდას. თქვენ ეთანხმებით გადასახადების გადახდას.",
    "ჩვენ გვაქვს უფლება, შევაჩეროთ ან შევწყვიტოთ თქვენი წვდომა, თუ დაარღვევთ ამ პირობებს.",
    "აპლიკაციის ზოგიერთი ფუნქცია საჭიროებს სტაბილურ ინტერნეტ კავშირს. არ ვიღებთ პასუხისმგებლობას ინტერნეტთან დაკავშირებული პრობლემების გამო.",
    "თქვენ ეთანხმებით, რომ პერიოდულად შემოგთავაზოთ განახლებები, რომლებიც მიიღებს შესწორებებს ფუნქციონალებში, პარამეტრებში და მომსახურებაში."
];

const termsContainer = document.getElementById("terms");

// Dynamically generate checkboxes
termList.forEach((term, index) => {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `term${index + 1}`;

    const label = document.createElement("label");
    label.setAttribute("for", checkbox.id);
    label.innerText = term;

    const br = document.createElement("br");

    termsContainer.appendChild(checkbox);
    termsContainer.appendChild(label);
    termsContainer.appendChild(br);
});

// Check all functionality
document.getElementById("checkAll").addEventListener("change", function () {
    const isChecked = this.checked;
    termList.forEach((_, index) => {
        document.getElementById(`term${index + 1}`).checked = isChecked;
    });
});

// Agree button behavior
document.getElementById("agreeBtn").addEventListener("click", () => {
    let allChecked = true;
    let sixthUnchecked = false;

    termList.forEach((_, index) => {
        const checkbox = document.getElementById(`term${index + 1}`);
        if (!checkbox.checked) {
            allChecked = false;
            if (index === 5) sixthUnchecked = true; // 6th term
        }
    });

    if (allChecked) {
        document.body.innerHTML = ""; // Remove all content
    document.body.style.backgroundColor = "red"; // Make full screen red
    } else if (sixthUnchecked && !confettiTriggered) {
        showCongrats(); // trigger confetti + message
    } else {
        alert("Please agree to all terms.");
    }
});

let confettiTriggered = false; // Flag to trigger confetti only once

function showCongrats() {
    document.body.style.backgroundColor = "green";
    document.getElementById("congratsMessage").classList.remove("hidden");
    startConfetti();
    confettiTriggered = true; // Set flag to prevent future triggers
    setTimeout(() => {
        document.getElementById("congratsMessage").classList.add("hidden"); // Hide message after a delay
    }, 3000); // Hide message after 3 seconds (you can adjust this time)
}

function startConfetti() {
    const canvas = document.getElementById("confettiCanvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces = [];
    const isMobile = window.innerWidth < 768;

    // Add more customization here
    const particleCount = isMobile ? 100 : 150;
    const gravity = isMobile ? 0.4 : 0.7;
    const scalar = isMobile ? 1.5 : 1.2;

    // Create confetti pieces
    for (let i = 0; i < particleCount; i++) {
        pieces.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            size: Math.random() * 10 + 5,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`, // rainbow colors
            speed: Math.random() * 3 + 2,
            gravity: gravity,
            scalar: scalar,
        });
    }

    function update() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        pieces.forEach(p => {
            p.y += p.speed * p.gravity; // Apply gravity for a more realistic fall
            if (p.y > canvas.height) p.y = -p.size;

            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        });

        requestAnimationFrame(update);
    }

    update();
}
