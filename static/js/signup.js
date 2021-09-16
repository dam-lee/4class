const signupBtn = document.querySelector(".signup-btn");
const idCheckBtn = document.querySelector(".id-check");
const signupId = document.querySelector(".signup-id");
const signupPw = document.querySelector(".signup-pw");
const signupCheckPw = document.querySelector(".signup-check-pw");
const signupName = document.querySelector(".signup-name");
const signupTeam = document.querySelector(".signup-team");
// help text
let helpId = document.querySelector(".help-text-id");
let helpPw = document.querySelector(".help-text-pw");
let helpCheckPw = document.querySelector(".help-text-check-pw");
let helpName = document.querySelector(".help-text-name");
let helpTeam = document.querySelector(".help-text-team");

function checkText(value) {
  switch (value) {
    case "signupId":
      helpId.innerHTML = `아이디를 입력해주세요`;
      break;
    case "signupId-reg":
      helpId.innerHTML = `아이디는 영문자로 시작하는 6~20자 영문자 또는 숫자만 가능합니다`;
      break;
    case "signupId-reg-Btn":
      helpId.innerHTML = `아이디 중복 체크를 확인해주세요.`;
      break;
    case "signupId-reg-check":
      helpId.innerHTML = `사용할 수 있는 아이디입니다.`;
      break;
    case "signupId-haveId":
      helpId.innerHTML = `중복된 아이디 입니다.`;
      break;
    case "signupId-hidden":
      helpId.innerHTML = ``;
      break;
    case "signupPw":
      helpPw.innerHTML = `비밀번호를 입력해주세요`;
      break;
    case "signupPw-hidden":
      helpPw.innerHTML = ``;
      break;
    case "signupCheckPw":
      helpCheckPw.innerHTML = `비밀번호를 한번 더 입력해주세요`;
      break;
    case "signupCheckPw-check":
      helpCheckPw.innerHTML = `동일한 비밀번호를 입력해주세요`;
      break;
    case "signupCheckPw-hidden":
      helpCheckPw.innerHTML = ``;
      break;
    case "signupName":
      helpName.innerHTML = `이름을 입력해주세요`;
      break;
    case "signupName-hidden":
      helpName.innerHTML = ``;
      break;
    case "signupTeam":
      helpTeam.innerHTML = `조를 입력해주세요`;
      break;
    case "signupTeam-number":
      helpTeam.innerHTML = `숫자로만 입력해주세요`;
      break;
    case "signupTeam-hidden":
      helpTeam.innerHTML = ``;
      break;
    default:
      console.log("check check!!");
  }
}
// 아이디 중복 확인 버튼 클릭했는지 확인하는 변수
let checkId = false;
// 회원가입 버튼 클릭 했을 때
signupBtn.addEventListener("click", () => {
  if (signupId.value === "") checkText("signupId");
  if (signupId.value !== "") checkText("signupId-hidden");
  if (signupPw.value === "") checkText("signupPw");
  if (signupPw.value !== "") checkText("signupPw-hidden");
  if (signupCheckPw.value === "") checkText("signupCheckPw");
  if (signupCheckPw.value !== "") checkText("signupCheckPw-hidden");
  if (signupPw.value !== signupCheckPw.value) checkText("signupCheckPw-check");
  if (signupName.value === "") checkText("signupName");
  if (signupName.value !== "") checkText("signupName-hidden");
  if (signupTeam.value === "") checkText("signupTeam");
  if (signupTeam.value !== "") checkText("signupTeam-hidden");
  if (isNaN(signupTeam.value)) checkText("signupTeam-number");

  if (!checkId) {
    checkText("signupId-reg-Btn");
    return null;
  } else if (
    checkId &&
    signupId.value !== "" &&
    signupPw.value !== "" &&
    signupPw.value === signupCheckPw.value &&
    signupName.value !== "" &&
    signupTeam.value !== "" &&
    !isNaN(signupTeam.value)
  ) {
    fetch("/signup/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userid_give: signupId.value,
        password_give: signupPw.value,
        username_give: signupName.value,
        userteam_give: signupTeam.value,
      }),
    })
      .then((res) => res.json())
      .then((response) => alert(response.result))
      .then(() => (window.location.href = "/"))
      .catch((error) => {
        alert(error);
        console.error("Error:", error);
      });
  }
});

idCheckBtn.addEventListener("click", () => {
  helpId.style.color = "#fa5252";
  if (signupId.value === "") {
    helpId.classList.contains("show-color") &&
      helpId.classList.remove("show-color");
    checkText("signupId");
    return null;
  }
  if (!is_id(signupId.value)) {
    checkText("signupId-reg");
    return null;
  }
  if (is_id(signupId.value)) {
    checkText("signupId-reg-check");
    checkId = true;
  }
  fetch("/signup/check_dup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userid_give: signupId.value }),
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.exists) {
        // 중복된 아이디일때
        checkText("signupId-haveId");
      } else {
        checkId = true;
        helpId.style.color = "#4dabf7";
        checkText("signupId-reg-check");
      }
    });
});

// id 값 정규표현식
function is_id(value) {
  // 영어로 시작하고 영어+숫자 포함한 6자리 이상 20자리 미만
  const regExp = /^[a-z]+[a-z0-9]{5,19}$/g;
  return regExp.test(value);
}
