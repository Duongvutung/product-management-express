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

//Create-Product
const CreateProduct = document.querySelector("[Create-Product]");
if(CreateProduct){
  CreateProduct.addEventListener("click", (event) => {
    event.defaultPrevented()
    const title = CreateProduct.querySelector("input[name='title']").value.trim();
    const description = CreateProduct.querySelector("texarea[name='description']") .value.trim();
    const price = parseFloat(CreateProduct.querySelector("input[name='price']").value);
    const discountPercentage = parseFloat(CreateProduct.querySelector("input[name='discountPercentage']").value);
    const Number = parseInt(CreateProduct.querySelector("input[name='stock']").value);
    const Picture = CreateProduct.querySelector("input[name='thumbnail']").file[0];
    const position = CreateProduct.querySelector("input[name='position']").value;
    const status = CreateProduct.querySelector("select[name='status']").value;

    // Kiểm tra dữ liệu
    if (!title) {
      alert("Vui lòng nhập tên sản phẩm!");
      return;
    }

    if (!description) {
      alert("Vui lòng nhập mô tả sản phẩm!");
      return;
    }

    if (isNaN(price) || price <= 0) {
      alert("Giá sản phẩm phải lớn hơn 0!");
      return;
    }

    if (isNaN(discountPercentage) || discountPercentage < 0 || discountPercentage > 100) {
      alert("Phần trăm giảm giá phải trong khoảng 0 - 100!");
      return;
    }

    if (isNaN(stock) || stock < 0) {
      alert("Số lượng không được âm!");
      return;
    }

    if (!status || status === "-- Chọn hành động --") {
      alert("Vui lòng chọn trạng thái sản phẩm!");
      return;
    }

    if (!file) {
      alert("Vui lòng chọn ảnh sản phẩm!");
      return;
    }

    // Nếu hợp lệ → gửi form
    CreateProduct.submit();
  });
};
//End Create-Product