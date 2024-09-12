"use strict";
var _a, _b;
//Toggle between url image or upload image
const urlInput = document.querySelector("#photo");
const fileInput = document.querySelector("#upload");
urlInput.addEventListener("input", () => {
    if (urlInput.value) {
        fileInput.style.display = "none";
    }
    else {
        fileInput.style.display = "block";
    }
});
fileInput.addEventListener("change", () => {
    var _a;
    if (fileInput.files && ((_a = fileInput.files) === null || _a === void 0 ? void 0 : _a.length) > 0) {
        urlInput.style.display = "none";
    }
    else {
        urlInput.style.display = "block";
    }
});
//Toggle between Display url image and display uploaded image in generated Card
const displayUrl = document.querySelector("#display-image");
const displayUploadedImage = document.querySelector("#display-upload-image");
function toggleImage() { }
//Toggle between form and generated card
const formSection = document.querySelector(".form-section");
const generatedCardSection = document.querySelector(".generated-card");
const generatedCardBtn = document.querySelector("#btn");
const backBtn = document.querySelector("#back-button");
generatedCardSection.style.display = "none";
generatedCardBtn.addEventListener("click", () => {
    formSection.style.display = "none";
    generatedCardSection.style.display = "block";
    backBtn.style.display = "block";
});
backBtn.addEventListener("click", () => {
    formSection.style.display = "block";
    generatedCardSection.style.display = "none";
    generatedCardBtn.style.display = "block";
    resetForm();
});
(_a = document.querySelector("#btn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", (e) => {
    var _a;
    e.preventDefault();
    //access input fields
    const userName = document.querySelector("#name").value;
    const bio = document.querySelector("#short-bio").value;
    const profileImage = document.querySelector("#photo")
        .value;
    const uploadInput = (_a = document.querySelector("#upload")
        .files) === null || _a === void 0 ? void 0 : _a[0];
    const imageUrlContainer = document.querySelector("#display-image");
    const imageUploadContainer = document.querySelector("#display-upload-image");
    const linkedinUrl = document.querySelector("#linkedin")
        .value;
    const githubUrl = document.querySelector("#github")
        .value;
    //will check it later
    //validate form fields
    // if(!validateFormInput()){
    //   return;
    // }
    //dynamically display name and bio
    document.querySelector("#display-name").textContent =
        userName;
    document.querySelector("#display-bio").textContent = bio;
    // IMAGE SECTION
    // 1:Display image dynamically using uploaded image
    if (uploadInput) {
        const imageFileReader = new FileReader();
        imageFileReader.onload = (e) => {
            var _a;
            document.querySelector("#display-upload-image").src = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
            imageUrlContainer.style.display = "none";
            imageUploadContainer.style.display = "block";
        };
        imageFileReader.readAsDataURL(uploadInput); // Read the file as a data URL
    }
    // 2:display image dynamically using image url
    const imageElement = document.createElement("img");
    imageElement.src = profileImage;
    imageElement.alt = "profile-image";
    imageElement.style.maxWidth = "50px";
    imageUrlContainer.appendChild(imageElement);
    imageUploadContainer.style.display = "none";
    imageUrlContainer.style.display = "block";
    // LINK SECTION
    //captured an underorderd list that contain url li items.
    const urls = document.querySelector("#links-list");
    //creates li item and anchor tag
    function createAnchorElement(url, innerText) {
        //create li element
        const liElement = document.createElement("li");
        //create anchor tag
        const anchorElement = document.createElement("a");
        //pass the url string as an href for the anchor tag
        anchorElement.href = url;
        //add inner text in anchor tag
        anchorElement.innerText = innerText;
        //open url in new tab
        anchorElement.target = "blank";
        //append anchor tag as a child element of li element
        liElement.appendChild(anchorElement);
        //this return li element that will append as a child element of ul element
        return liElement;
    }
    //call function and store in a variable
    const LinkedinLi = createAnchorElement(linkedinUrl, linkedinUrl);
    const GithubLi = createAnchorElement(githubUrl, githubUrl);
    //append the variable as a child element of ul element
    urls === null || urls === void 0 ? void 0 : urls.appendChild(LinkedinLi);
    urls === null || urls === void 0 ? void 0 : urls.appendChild(GithubLi);
});
//download functionality
function downloadButton() {
    //regenerate button when printing
    if (backBtn) {
        backBtn.style.display = "none";
    }
    //print the page
    window.print();
    //again display the button after printing
    if (backBtn) {
        backBtn.style.display = "block";
    }
}
(_b = document.querySelector("#download-button")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
    downloadButton();
});
//Form Validation
function validateFormInput() {
    const userName = document.querySelector("#name").value;
    const bio = document.querySelector("#short-bio").value;
    const linkedinUrl = document.querySelector("#linkedin")
        .value;
    const githubUrl = document.querySelector("#github")
        .value;
    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
    let errorMessage = "";
    if (!userName) {
        errorMessage += "Enter your username";
    }
    if (!bio) {
        errorMessage += "Enter short bio";
    }
    if (!linkedinUrl && urlPattern.test(linkedinUrl)) {
        errorMessage += "Please enter the valid url";
    }
    if (!githubUrl && urlPattern.test(githubUrl)) {
        errorMessage += "Please enter the valid url";
    }
    if (errorMessage) {
        alert(errorMessage);
    }
    return errorMessage;
}
//Reset Form
function resetForm() {
    // Clear text inputs
    document.querySelector("#name").value = "";
    document.querySelector("#short-bio").value = "";
    document.querySelector("#linkedin").value = "";
    document.querySelector("#github").value = "";
    // Clear image inputs (file input and URL)
    document.querySelector("#upload").value = ""; // Clear the file input
    document.querySelector("#photo").value = ""; // Clear the URL input
    // Clear image preview
    const displayImage = document.querySelector("#display-upload-image");
    if (displayImage) {
        displayImage.src = ""; // Reset the image preview
    }
    const displayImage2 = document.querySelector("#display-image");
    if (displayImage2) {
        displayImage2.src = ""; // Reset the image preview
    }
    // Optionally clear any other generated content
    document.querySelector("#display-name").innerText = "";
    document.querySelector("#display-bio").innerText = "";
    // Clear link display
    const linksList = document.querySelector("#links-list");
    if (linksList) {
        linksList.innerHTML = ""; // Remove any generated links
    }
}
// //Editing functionality
function editable() {
    let isEditable = false;
    const userName = document.querySelector("#display-name");
    const userBio = document.querySelector("#display-bio");
    const userUrlImage = document.querySelector("#display-image");
    const userUploadImage = document.querySelector("#display-upload-image");
    const editButton = document.querySelector("#edit-button");
    userName.contentEditable = "false";
    userBio.contentEditable = "false";
    userUploadImage.contentEditable = "false";
    userUrlImage.contentEditable = "false";
    editButton.addEventListener("click", () => {
        if (isEditable) {
            userName.contentEditable = "false";
            userBio.contentEditable = "false";
            userUploadImage.contentEditable = "false";
            userUrlImage.contentEditable = "false";
            editButton.textContent = "Edit";
            const updatedName = userName.textContent;
            const updatedBio = userBio.textContent;
            const updatedUserUrlImage = userUrlImage.textContent;
            const updatedUserImageUplaod = userUploadImage.textContent;
            console.log("Updated Name:", updatedName);
            console.log("Updated Bio:", updatedBio);
            console.log("Updated URL Image:", updatedUserUrlImage);
            console.log("Updated Upload Image:", updatedUserImageUplaod);
        }
        else {
            userName.contentEditable = "true";
            userBio.contentEditable = "true";
            userUploadImage.contentEditable = "true";
            userUrlImage.contentEditable = "true";
            editButton.textContent = "Save";
        }
        isEditable = !isEditable;
    });
}
