/* ==========================================================
TRANG CHỦ
- Hiển thị các khóa học nổi bật.
- Chặn bài test nếu người dùng chưa đăng nhập.
========================================================== */
document.addEventListener("DOMContentLoaded", function ()  {
    hienThiKhoaHocNoiBat();
    xuLyLienKetBaiTest();
}
);
/* Hiển thị 4 khóa học đầu tiên */
function hienThiKhoaHocNoiBat()  {
    const courseBox = document.getElementById("coursePreview");
    if (!courseBox || typeof getData !== "function")  {
        return;
    }
    const data = getData();
    const courses = data.courses || [];
    courseBox.innerHTML = courses
    .slice(0, 4)
    .map(taoTheKhoaHoc)
    .join("");
}
/* Tạo HTML cho một khóa học */
function taoTheKhoaHoc(course)  {
    return `
        <article class="course-card">
            <img src="${course.image}" alt="${course.name}">

            <div class="course-body">
                <span class="eyebrow">${course.language}</span>

                <h3>${course.name}</h3>

                <p>${course.desc}</p>

                <div class="course-meta">
                    <span class="tag">${course.duration}</span>
                    <span class="tag">Chứng chỉ: ${course.certificate}</span>
                </div>

                <div class="price">
                    ${typeof money === "function" ? money(course.price) : course.price}
                </div>

                <a
                    class="btn"
                    href="chi-tiet-khoa-hoc.html?id=${course.id}"
                >
                    Xem chi tiết
                </a>
            </div>
        </article>
    `;
}
/* Bài test yêu cầu đăng nhập trước */
function xuLyLienKetBaiTest()  {
    const testLinks = document.querySelectorAll("[data-test-link]");
    testLinks.forEach(function (link)  {
        link.addEventListener("click", function (event)  {
            const loggedIn = localStorage.getItem("yuna_logged_in") === "true";
            if (!loggedIn)  {
                event.preventDefault();
                if (typeof moTaiKhoan === "function")  {
                    moTaiKhoan("login");
                }
                const message = document.getElementById("loginMessage");
                if (message)  {
                    message.textContent = "Bạn cần đăng nhập hoặc đăng ký trước khi làm bài test.";
                }
            }
        }
        );
    }
    );
}
