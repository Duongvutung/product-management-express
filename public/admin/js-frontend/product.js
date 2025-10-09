const ButtonChangeStatus = document.querySelectorAll("[button-change-status]");

if (ButtonChangeStatus.length > 0) {
  const formChangeStatus = document.querySelector("#form-change-status");
  const path = formChangeStatus.getAttribute("data-path");

  ButtonChangeStatus.forEach(button => {
    button.addEventListener("click", () => {
      const StatusCurrent = button.getAttribute("data-status");
      const id = button.getAttribute("data-id");

      if (!id) {
        console.error("❌ Không tìm thấy ID sản phẩm");
        return;
      }

      let statusChange = StatusCurrent === "active" ? "inactive" : "active";

      const action = `${path}/${statusChange}/${id}?_method=PATCH`;
      console.log("👉 Submit change status:", action);

      formChangeStatus.action = action;
      formChangeStatus.submit();
    });
  });
}

//Show-alert
const showalert = document.querySelector("[show-alert]")
if(showalert){
  const time = parseInt(showalert.getAttribute("data-time"))
  const closeAlert = showalert.getAttribute("[close-alert]")

  setTimeout(() => {
    showalert.classList.add("alert-hidden");
  }, time);

  closeAlert.addEventListener("click", () => {
    showalert.classList.add("alert-hidden");
  })
}
//End show-alert