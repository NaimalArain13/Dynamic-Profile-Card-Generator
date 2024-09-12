//Toggle between url image or upload image
const urlInput = document.querySelector("#photo") as HTMLInputElement;
const fileInput = document.querySelector("#upload") as HTMLInputElement;

urlInput.addEventListener("input", () => {
  if (urlInput.value) {
    fileInput.style.display = "none";
  } else {
    fileInput.style.display = "block";
  }
});
fileInput.addEventListener("change", () => {
  if (fileInput.files && fileInput.files?.length > 0) {
    urlInput.style.display = "none";
  } else {
    urlInput.style.display = "block";
  }
});

//Toggle between Display url image and display uploaded image in generated Card
const displayUrl = document.querySelector("#display-image") as HTMLInputElement;
const displayUploadedImage = document.querySelector(
  "#display-upload-image"
) as HTMLInputElement;

function toggleImage() {}

//Toggle between form and generated card
const formSection = document.querySelector(".form-section") as HTMLInputElement;
const generatedCardSection = document.querySelector(
  ".generated-card"
) as HTMLInputElement;
const generatedCardBtn = document.querySelector("#btn") as HTMLButtonElement;
const backBtn = document.querySelector("#back-button") as HTMLButtonElement;

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

document.querySelector("#btn")?.addEventListener("click", (e) => {
  e.preventDefault();

  //access input fields
  const userName = (document.querySelector("#name") as HTMLInputElement).value;
  const bio = (document.querySelector("#short-bio") as HTMLInputElement).value;
  const profileImage = (document.querySelector("#photo") as HTMLInputElement)
    .value;
  const uploadInput = (document.querySelector("#upload") as HTMLInputElement)
    .files?.[0];
  const imageUrlContainer = document.querySelector(
    "#display-image"
  ) as HTMLElement;
  const imageUploadContainer = document.querySelector(
    "#display-upload-image"
  ) as HTMLElement;
  const linkedinUrl = (document.querySelector("#linkedin") as HTMLInputElement)
    .value;
  const githubUrl = (document.querySelector("#github") as HTMLInputElement)
    .value;

  //will check it later
  //validate form fields
  // if(!validateFormInput()){
  //   return;
  // }

  //dynamically display name and bio
  (document.querySelector("#display-name") as HTMLElement).textContent =
    userName;
  (document.querySelector("#display-bio") as HTMLElement).textContent = bio;

  // IMAGE SECTION
  // 1:Display image dynamically using uploaded image
  if (uploadInput) {
    const imageFileReader = new FileReader();
    imageFileReader.onload = (e) => {
      (
        document.querySelector("#display-upload-image") as HTMLImageElement
      ).src = e.target?.result as string;
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
  function createAnchorElement(url: string, innerText: string) {
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
  urls?.appendChild(LinkedinLi);
  urls?.appendChild(GithubLi);
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
document.querySelector("#download-button")?.addEventListener("click", () => {
  downloadButton();
});

//Form Validation
function validateFormInput() {
  const userName = (document.querySelector("#name") as HTMLInputElement).value;
  const bio = (document.querySelector("#short-bio") as HTMLInputElement).value;
  const linkedinUrl = (document.querySelector("#linkedin") as HTMLInputElement)
    .value;
  const githubUrl = (document.querySelector("#github") as HTMLInputElement)
    .value;
  const urlPattern =
    /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;

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
  (document.querySelector("#name") as HTMLInputElement).value = "";
  (document.querySelector("#short-bio") as HTMLInputElement).value = "";
  (document.querySelector("#linkedin") as HTMLInputElement).value = "";
  (document.querySelector("#github") as HTMLInputElement).value = "";

  // Clear image inputs (file input and URL)
  (document.querySelector("#upload") as HTMLInputElement).value = ""; // Clear the file input
  (document.querySelector("#photo") as HTMLInputElement).value = ""; // Clear the URL input

  // Clear image preview
  const displayImage = document.querySelector(
    "#display-upload-image"
  ) as HTMLImageElement;
  if (displayImage) {
    displayImage.src = ""; // Reset the image preview
  }
  const displayImage2 = document.querySelector(
    "#display-image"
  ) as HTMLImageElement;
  if (displayImage2) {
    displayImage2.src = ""; // Reset the image preview
  }

  // Optionally clear any other generated content
  (document.querySelector("#display-name") as HTMLElement).innerText = "";
  (document.querySelector("#display-bio") as HTMLElement).innerText = "";

  // Clear link display
  const linksList = document.querySelector("#links-list") as HTMLElement;
  if (linksList) {
    linksList.innerHTML = ""; // Remove any generated links
  }
}


// //Editing functionality
//call this function on edit button click handler
function editable(){
  //tracking for editable or non-editable fields
  let isEditable = false;

  //access all fields for editing
  const userName = document.querySelector("#display-name") as HTMLElement;
  const userBio  = document.querySelector("#display-bio") as HTMLElement;
  const editButton = document.querySelector("#edit-button") as HTMLButtonElement;


  //initially all fields are non-editable
  userName.contentEditable = "false";
  userBio.contentEditable = "false";
 


  editButton.addEventListener("click" , ()=>{
    if(isEditable){
      userName.contentEditable = "false";
      userBio.contentEditable = "false";

      //change button content and allow the fields to be edit
      editButton.textContent = "Edit";

      //save updated content
      const updatedName = userName.textContent;
      const updatedBio = userBio.textContent;


      //log updated content to make sure the changes
      console.log("Updated Name:" , updatedName)
      console.log("Updated Bio:" , updatedBio)
      
    }
    else{
      //make fields editable
      userName.contentEditable = "true";
      userBio.contentEditable = "true";


      //update the button content after updating the fields content and then save it. 
      editButton.textContent = "Save";
    
    }

    //Toggle the edit mode
    isEditable = !isEditable
  })

}