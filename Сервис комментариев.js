const commentContainer = document.getElementById("allComments");
const anonymous = document.getElementById("checkbox");
anonymous.onclick = checkAnon;

function checkAnon() {
  if (this.checked) {
    document.getElementById("name").disabled = true;
    document.getElementById("name").style.backgroundColor = "#A9A9A9";
    document.getElementById("name").placeholder = "";
    document.getElementById("url").disabled = true;
    document.getElementById("url").style.backgroundColor = "#A9A9A9";
    document.getElementById("url").placeholder = "";
  } else if (this.checked == false) {
    document.getElementById("name").disabled = false;
    document.getElementById("name").style.backgroundColor = "#F5F5DC";
    document.getElementById("name").placeholder = "Иванов Иван Иванович";
    document.getElementById("url").disabled = false;
    document.getElementById("url").style.backgroundColor = "#F5F5DC";
    document.getElementById("url").placeholder = "https://example.com";
  }
}

const button = document.getElementById("addComment");
button.onclick = addComment;

function addComment() {
  const nameText = document.createElement("div");
  nameText.className = "name";

  const urlImage = document.createElement("img");
  urlImage.className = "image";

  const imageArray = [
    "https://coolsen.ru/wp-content/uploads/2021/12/5-20211213_003352.jpg",
    "http://www.almazfea.com/upload/items/575.jpg",
    "https://avatars.dzeninfra.ru/get-zen_doc/15270/pub_5c5845d06277bb00aed29ea5_5c58484f5b7b5100afb0a080/scale_1200",
    "https://kartinkin.net/pics/uploads/posts/2022-06/1656366134_55-kartinkin-net-p-furri-khaski-arti-krasivo-58.jpg",
  ];

  const date = new Date().toLocaleString();
  date.className = "date";

  const commentText = document.createElement("div");
  commentText.className = "comment";

  const nameImageWrapper = document.createElement("div");
  nameImageWrapper.className = "nameImageWrapper";

  const nameImageDateWrapper = document.createElement("div");
  nameImageDateWrapper.className = "nameImageDateWrapper";

  const wrapper = document.createElement("div");
  wrapper.className = "wrapper";

  function checkFill() {
    if (document.getElementById("comment").value == "") {
      document.getElementById("warning").style.display = "block";
    } else if (document.getElementById("comment").value != "") {
      document.getElementById("warning").style.display = "none";

      function createHTML() {
        nameImageWrapper.append(urlImage, nameText);
        nameImageDateWrapper.append(nameImageWrapper, date);
        wrapper.append(nameImageDateWrapper, commentText);
        commentContainer.appendChild(wrapper);
      }

      createHTML();
    }
  }

  checkFill();

  function makeAnonOrPublicComment() {
    if (
      document.getElementById("name").disabled == true ||
      document.getElementById("name").value == ""
    ) {
      nameText.textContent = "Username";
    } else if (document.getElementById("name").disabled == false) {
      let checkedName = document.getElementById("name").value;

      function checkName() {
        checkedName = checkedName
          .replace(/\s+/g, " ")
          .trim()
          .toLowerCase()
          .split(" ");

        for (let i = 0; i < checkedName.length; i++) {
          checkedName[i] =
            checkedName[i][0].toUpperCase() + checkedName[i].slice(1);
        }

        checkedName = checkedName.join(" ");

        return checkedName;
      }

      nameText.textContent = checkName();
      document.getElementById("name").value = "";
    }
  }

  makeAnonOrPublicComment();

  function getRandomImage() {
    if (
      document.getElementById("url").disabled == true ||
      document.getElementById("url").value == ""
    ) {
      let randomImageIndex = Math.floor(Math.random() * imageArray.length);
      let randomImage = imageArray[randomImageIndex];
      urlImage.src = randomImage;
    } else if (document.getElementById("url").disabled == false) {
      urlImage.src = document.getElementById("url").value;
      document.getElementById("url").value = "";
    }
  }

  getRandomImage();

  let checkedForSpam = document.getElementById("comment").value;

  function checkForSpam() {
    if (
      /viagra/i.test(checkedForSpam) === true ||
      /XXX/i.test(checkedForSpam) === true
    ) {
      checkedForSpam = checkedForSpam.replace(/viagra/gi, "***");
      checkedForSpam = checkedForSpam.replace(/XXX/gi, "***");
    }

    return checkedForSpam;
  }

  function addCommentText() {
    commentText.textContent = checkForSpam();
    document.getElementById("comment").value = "";
  }

  addCommentText();
}