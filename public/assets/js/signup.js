const signupFormHandler = async function (event) {
  event.preventDefault();

  const emailEl = document.querySelector("#email-signup");
  const passwordEl = document.querySelector("#password-signup");

  const response = await fetch("/api/users", {
      console.log('POST /api/users');
    method: "POST",
    body: JSON.stringify({
      email: emailEl.value,
      password: passwordEl.value,
    }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/");
  } else {
    alert("Failed to signup");
  }
};
console.log(signupFormHandler);

document
  .querySelector("#signup-form")
  .addEventListener("submit", signupFormHandler);

document.getElementById("signup-btn").onclick = function () {
  location.href("/");
};
