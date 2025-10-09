// Button Status: Đây là đoạn code để xử lý sự kiện khi người dùng nhấn vào các nút lọc trạng thái sản phẩm.    
const buttonStatus = document.querySelectorAll("[button-status]"); // những thuộc tính tự định nghĩa thì phải đặt trong dấu ngoặc vuông
if(buttonStatus.length > 0){ 
    //Kiểm tra xem có ít nhất một button tìm được hay không trước khi gán sự kiện.
    // Nếu buttonStatus.length === 0, đoạn code bên trong sẽ không chạy, tránh lỗi
    let url = new URL(window.location.href); // Lấy URL hiện tại dưới dạng đối tượng URL
    
    buttonStatus.forEach(button => {
        button.addEventListener("click", () => {
            const status = button.getAttribute("button-status");

            if(status){ // Nếu status không rỗng
                url.searchParams.set("status", status); // Thêm hoặc cập nhật tham số status trong URL
            } else{
                url.searchParams.delete("status")
            }

            console.log("Updated URL:", url.href); // In ra URL đã cập nhật để kiểm tra
            window.location.href = url.href; // Trình duyệt sẽ điều hướng (redirect) sang URL mới. Nó sẽ cập nhật được url mới ở đk If
        });
    }); 
    // buttonStatus.forEach → lặp qua từng button trong NodeList.
    // button.addEventListener("click", ...) → gắn sự kiện click cho button đó.
    // Khi click:

    //     Lấy giá trị attribute button-status bằng button.getAttribute("button-status").
    //     Ví dụ: "active" hoặc "inactive".
}
// End Button Status

// Form Search
const formSearch = document.querySelector("#form-search")   // lấy phần tử form có id="form-search"
if (formSearch){
    let url = new URL(window.location.href)  // lấy URL hiện tại của trang

    formSearch.addEventListener("submit", (e) => {
        e.preventDefault(); // chặn hành vi mặc định (không gửi form như bình thường)

        const keyword = e.target.elements.keyword.value; // lấy giá trị từ input có name="keyword"
        // ⛔ Ở đây có lỗi chính tả: "vaule" => phải sửa thành "value"

        if (keyword){
            url.searchParams.set("keyword", keyword); // thêm hoặc cập nhật tham số "keyword" vào URL
        }else{
            url.searchParams.delete("keyword"); // nếu không nhập thì xóa "keyword" khỏi URL
        }

        window.location.href = url.href; // chuyển hướng trình duyệt tới URL mới
    }); 
}
// 👉 Tóm gọn:
// Chức năng: khi bạn nhập từ khóa vào ô tìm kiếm và bấm submit, trang sẽ tải lại với URL dạng:
// http://localhost:3000/admin/product?keyword=value
// Lợi ích:
// URL giữ được từ khóa tìm kiếm → dễ chia sẻ hoặc reload.
// Không cần backend xử lý form POST mà dùng query string GET.
//End Form Search

//Pagination: Phân Trang
const ButtonPagination = document.querySelectorAll("[button-pagination]");
if (ButtonPagination){
    let url = new URL(window.location.href);

    ButtonPagination.forEach(button => {
        button.addEventListener("click", () => {
            const page = button.getAttribute("button-pagination");

            url.searchParams("page", page);
            
            window.location.href = url.href;
        })
    })
}
//End Pagination

//Check Box Multi
const checkBoxMulti = document.querySelector("[checkbox-multi]");
if (checkBoxMulti) {
    const inputCheckAll = checkBoxMulti.querySelector("input[name='checkall']");
    const inputIDs = checkBoxMulti.querySelectorAll("input[name='id']"); // sửa ở đây
    const hiddenInput = document.querySelector("input[name='id']");

    // Hàm cập nhật danh sách ID vào input ẩn
    function updateIDs() {
        const checked = document.querySelectorAll("input[name='id']:checked"); // sửa ở đây
        const values = Array.from(checked).map(input => input.value);
        if(hiddenInput){
            hiddenInput.value = values.join(",");
        }
    }

    // Sự kiện click checkall
    inputCheckAll.addEventListener("click", () => {
        inputIDs.forEach(input => input.checked = inputCheckAll.checked);
        updateIDs();
    });

    // Sự kiện click từng checkbox
    inputIDs.forEach((input) => {
        input.addEventListener("click", () => {
            const countChecked = document.querySelectorAll("input[name='id']:checked").length; // sửa ở đây
            inputCheckAll.checked = (countChecked === inputIDs.length);
            updateIDs();
        });
    });
}
//End Check Box Multi

//Form Change Multi
const formChangeMulti = document.querySelector("[form-change-multi]");
if (formChangeMulti) {
    formChangeMulti.addEventListener("submit", (event) => {
        event.preventDefault();

        const inputChecked = document.querySelectorAll("input[name='id']:checked"); 
        const inputIDs = formChangeMulti.querySelector("input[name='ids']");
        const typeChange = event.target.elements.value;
        if(typeChange == "delete-all"){
            const isConfirm = confirm("Bạn có chắc muốn xoá không?");

            if(!isConfirm){
                return;
            }
        }
        if (inputChecked.length > 0) {
            const ids = Array.from(inputChecked).map(input => input.value);

            if(typeChange == "change-position"){
                const position = input
                    .closet("tr")
                    .querySelector("input[name='position']").value;

                ids.push(`${id} - ${position}`);
            }else{
                ids.push(id);
            }

            inputIDs.value = ids.join(",");
            formChangeMulti.submit();
        } else {
            alert("Vui lòng chọn ít nhất 1 bản ghi!");
        }
    });
}

//End Form Change Multi

//DeletedItem
const buttonDeleted = document.querySelectorAll("[button-delete]");
if(buttonDeleted.length > 0){
    const formDeleted = document.querySelector("#form-deleted-item");
    const path = formDeleted.getAttribute("data-path");

    buttonDeleted.forEach(button => {
        button.addEventListener("click", () => {
            const isConfirm = confirm("Are you sure?");

            if(isConfirm){
                const id = button.getAttribute("data-id");

                const action = `${path}/${id}?_method=DELETE`;
                
                formDeleted.action= action;
                formDeleted.submit();
            }
        })
    });
}
//End DeletedItem

//RestoreProduct
const buttonsRestore = document.querySelectorAll("[button-restore]");

if (buttonsRestore.length > 0) {
  const formRestore = document.createElement("form");
  formRestore.method = "POST";
  formRestore.style.display = "none";
  document.body.appendChild(formRestore);

  buttonsRestore.forEach(button => {
    button.addEventListener("click", () => {
      const isConfirm = confirm("Bạn có chắc muốn khôi phục sản phẩm này không?");
      if (isConfirm) {
        const id = button.getAttribute("data-id");
        formRestore.action = `/admin/product/restore/${id}?_method=PATCH`;
        formRestore.submit();
      }
    });
  });
}

//End RestoreProduct
