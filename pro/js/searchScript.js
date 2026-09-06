"use strict";

const searchBtn = document.getElementById("searchBtn");
const hiddenForm = document.getElementById("hiddenForm");
const jobIDField = document.getElementById("jobID");
const searchResultsPanel = document.getElementById("searchResults");
const companyTypeSelect = document.getElementById("companyTypeOption");
const positionTypeSelect = document.getElementById("positionTypeOption");
const minPay = document.getElementById("min");
const maxPay = document.getElementById("max");
const minDate = document.getElementById("minDate");
const maxDate = document.getElementById("maxDate");
const errorText = document.getElementById("error");
const logOutLink = document.getElementById("logOut");
const username = document.getElementById("hiddenInput").value;
let companyTypeCheckboxes;
let positionTypeCheckboxes;

const sendMsgToServer = (message, callback) => {
  fetch("./searchPHP/server.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(message),
  })
    .then((res) => res.json())
    .then((res) => {
      callback(res);
    });
};

const setSelectOptions = (element, arr, classname) => {
  let html = `<input type="checkbox" value='any' class="${classname}"><label>Any</label><br>`;
  arr.forEach((el) => {
    html += `<input type="checkbox" value='${el}' class="${classname}"><label>${el}</label><br>`;
  });
  element.innerHTML = html;
};

const getCheckboxesInput = (boxes) => {
  const selected = [];
  for (let i = 0; i < boxes.length; i++) {
    if (!boxes[i].checked) continue;
    if (boxes[i].value === "any") return "any";
    selected.push(boxes[i].value);
  }
  return selected;
};

const validateDate = (date) => {
  if (date === false) return true;
  const format = /^\d{4}-[0-1]\d{1}-\d{2}$/;
  if (!format.test(date)) return;
  const [a, b, c] = date.split("-");
  return b <= 12 && c <= 31;
};

const updateErrorText = (minDateVal, maxDateVal) => {
  const invalidMin = !validateDate(minDateVal);
  const invalidMax = !validateDate(maxDateVal);
  const text =
    invalidMin && invalidMax
      ? "Start date range values were invalid"
      : invalidMin
        ? "Start date min value was invalid"
        : "Start date max value was invalid";
  errorText.innerText = text;
};

const createJobDiv = (obj) => {
  const jobContainer = document.createElement("div");
  jobContainer.classList.add("jobContainer");
  const middleJobContainer = document.createElement("div");
  middleJobContainer.classList.add("middleJobContainer");
  const innerJobContainer = document.createElement("div");
  innerJobContainer.classList.add("innerJobContainer");
  const salaryText = document.createElement("h3");
  salaryText.classList.add("innerJobContainer");
  salaryText.innerText = `Salary: $${obj.PositionPay}`;
  const addBtn = document.createElement("button");
  addBtn.classList.add("addBtn");
  addBtn.innerText = "Add to Spreadsheet";
  const infoBtn = document.createElement("button");
  infoBtn.classList.add("infoBtn");
  infoBtn.innerText = "More Info";
  const hiddenJobContainer = document.createElement("div");
  hiddenJobContainer.classList.add("hiddenJobContainer");
  hiddenJobContainer.innerHTML = `
    <div class="hiddenMiddleJobContainer">
        <h3 class="hiddenSubtext">Position Type: ${obj.PositionType}</h3>
        <div class="vr"></div>
        <h3 class="hiddenSubtext">Company Type: ${obj.CompanyType}</h3>
        <div class="vr"></div>
        <h3 class="hiddenSubtext">Start Date: ${obj.StartDate}</h3>
        <div class="vr"></div>
        <h3 class="hiddenSubtext">End Date: ${obj.EndDate}</h3>
    </div>
    <p>${obj.JobDescription}</p>`;
  innerJobContainer.innerHTML = `<h3 class="jobHeaderText">${obj.JobTitle}</h3><h3 class="companySubtext">${obj.CompanyName}</h3>`;
  middleJobContainer.appendChild(innerJobContainer);
  middleJobContainer.appendChild(salaryText);
  middleJobContainer.appendChild(addBtn);
  middleJobContainer.appendChild(infoBtn);
  jobContainer.appendChild(middleJobContainer);
  jobContainer.appendChild(hiddenJobContainer);
  searchResultsPanel.appendChild(jobContainer);
  infoBtn.addEventListener("click", () => {
    hiddenJobContainer.style.display =
      hiddenJobContainer.style.display === "flex" ? "none" : "flex";
    infoBtn.innerText =
      infoBtn.innerText === "More Info" ? "Less Info" : "More Info";
  });
  addBtn.addEventListener("click", () => {
    jobIDField.value = obj.id;
    hiddenForm.submit();
  });
};

let companyTypes = [];
let positionTypes = [];
const selectedCompanyTypes = [];
const selectedPositionTypes = [];

username
  ? sendMsgToServer({ action: "getCompanyTypes" }, (res) => {
      companyTypes = res;
      setSelectOptions(companyTypeSelect, companyTypes, "companyTypeCheckbox");
      companyTypeCheckboxes = document.getElementsByClassName(
        "companyTypeCheckbox",
      );
    })
  : "";

username
  ? sendMsgToServer({ action: "getPositionTypes" }, (res) => {
      positionTypes = res;
      setSelectOptions(
        positionTypeSelect,
        positionTypes,
        "positionTypeCheckbox",
      );
      positionTypeCheckboxes = document.getElementsByClassName(
        "positionTypeCheckbox",
      );
    })
  : "";

searchBtn.addEventListener("click", () => {
  const cType = getCheckboxesInput(companyTypeCheckboxes);
  const pType = getCheckboxesInput(positionTypeCheckboxes);
  const minPayValue = minPay.value;
  const maxPayValue = maxPay.value;
  const minDateValue = !minDate.value ? false : minDate.value;
  const maxDateValue = !maxDate.value ? false : maxDate.value;
  const bool = validateDate(minDateValue) && validateDate(maxDateValue);
  if (!cType.length || !pType.length) {
    errorText.innerText =
      "At least one option must be selected for both company and position type";
    return;
  }
  if (!bool) {
    updateErrorText(minDateValue, maxDateValue);
    return;
  }
  errorText.innerText = "";
  sendMsgToServer(
    {
      action: "search",
      companyType: cType,
      positionType: pType,
      pay: minPayValue && maxPayValue ? [minPayValue, maxPayValue] : false,
      startDate:
        minDateValue && maxDateValue ? [minDateValue, maxDateValue] : false,
    },
    (res) => {
      const text = !res.length
        ? "No postings found"
        : res.length < 2
          ? "Found 1 posting"
          : `Found ${res.length} postings`;
      searchResultsPanel.innerHTML = `<h2 id="resText">${text}</h2>`;
      res.forEach((job) => createJobDiv(job));
    },
  );
});

logOutLink.addEventListener("click", () => {
  sendMsgToServer({ action: "logOut" }, () => {});
});
