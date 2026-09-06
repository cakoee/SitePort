"use strict";

const applicantForm = document.getElementById("applicantForm");
const employerForm = document.getElementById("employerForm");
const applicantUserEl = document.getElementById("usernameApplicant");
const applicantPasswordEl = document.getElementById("passwordApplicant");
const employerUserEl = document.getElementById("usernameEmployer");
const employerPasswordEl = document.getElementById("passwordEmployer");
const invisTextApplicant = document.getElementById("invisTextApplicant");
const invisTextEmployer = document.getElementById("invisTextEmployer");
const redirectionForm = document.getElementById("redirectionForm");

const sendMsgToServer = (message, callback) => {
  fetch("./loginPHP/server.php", {
    method: "POST",
    headers: { "Context-Type": "application/json" },
    body: JSON.stringify(message),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      callback(res);
    });
};

const resultHandler = (message, type) => {
  const element = type === "employer" ? invisTextEmployer : invisTextApplicant;
  if (!message.success) {
    element.style.visibility = "visible";
    return;
  }
  redirectionForm.action =
    type === "employer" ? "companyHome.php" : "userSpreadsheet.php";
  redirectionForm.submit();
};

applicantForm.addEventListener("submit", (e) => {
  e.preventDefault();
  invisTextApplicant.style.visibility = "hidden";
  sendMsgToServer(
    {
      action: "applicantLogin",
      username: applicantUserEl.value,
      password: applicantPasswordEl.value,
    },
    (msg) => {
      resultHandler(msg, "applicant");
    },
  );
});

employerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  invisTextEmployer.style.visibility = "hidden";
  sendMsgToServer(
    {
      action: "employerLogin",
      username: employerUserEl.value,
      password: employerPasswordEl.value,
    },
    (msg) => {
      resultHandler(msg, "employer");
    },
  );
});
