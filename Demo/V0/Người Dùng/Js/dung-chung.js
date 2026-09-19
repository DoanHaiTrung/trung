const YUNA_KEY='yuna_data_v3';
const defaultData= {
    courses:[ {
        id:1,name:'Tiếng Anh Giao Tiếp',language:'Tiếng Anh',duration:'3 - 6 tháng',price:3200000,certificate:'Có',image:'../../IMG/course-english.png',desc:'Tự tin giao tiếp - Vươn ra thế giới'
    }
    , {
        id:2,name:'Tiếng Trung',language:'Tiếng Trung',duration:'3 - 6 tháng',price:4200000,certificate:'Có',image:'../../IMG/course-chinese.png',desc:'Giao tiếp tự nhiên - Mở rộng cơ hội'
    }
    , {
        id:3,name:'Tiếng Nhật',language:'Tiếng Nhật',duration:'3 - 6 tháng',price:4800000,certificate:'Có',image:'../../IMG/course-japanese.png',desc:'Chinh phục ngôn ngữ - Khám phá văn hóa'
    }
    , {
        id:4,name:'Tiếng Hàn',language:'Tiếng Hàn',duration:'3 - 6 tháng',price:3500000,certificate:'Không',image:'../../IMG/course-korean.png',desc:'Tự tin giao tiếp - Chạm tới ước mơ'
    }
    ],students:[],questions:[ {
        q:'Ngôn ngữ bạn quan tâm?',answers:['Tiếng Anh','Tiếng Hàn','Tiếng Trung','Tiếng Nhật'],correct:0
    }
    , {
        q:'She ___ to school every day.',answers:['go','goes','going','gone'],correct:1
    }
    , {
        q:'Choose the meaning of “hello”.',answers:['Xin chào','Tạm biệt','Cảm ơn','Xin lỗi'],correct:0
    }
    ],activity:[]
}
;
function getData() {
    try {
        return JSON.parse(localStorage.getItem(YUNA_KEY))||structuredClone(defaultData)
    }
    catch {
        return structuredClone(defaultData)
    }
}
function saveData(d) {
    localStorage.setItem(YUNA_KEY,JSON.stringify(d))
}
function money(v) {
    return new Intl.NumberFormat('vi-VN').format(v)+'đ'
}
function qs(s,p=document) {
    return p.querySelector(s)
}
function qsa(s,p=document) {
    return [...p.querySelectorAll(s)]
}
function header() {
    const el=qs('#header');
    if(!el)return;
    const page=location.pathname.split('/').pop()||'index.html';
    el.innerHTML=`<header class="site-header"><div class="header-inner"><a class="brand" href="index.html"><span class="brand-avatar"><img src="../../IMG/logo-yuna.svg" alt="Yuna"></span><span class="brand-name"><strong>YUNA</strong><small>LANGUAGE CENTER</small></span></a><nav class="main-nav"><a class="${page==='index.html'?'active':''}" href="index.html">Trang chủ</a><a class="${page==='khoa-hoc.html'?'active':''}" href="khoa-hoc.html">Khóa học</a><a class="${page==='gioi-thieu.html'?'active':''}" href="gioi-thieu.html">Giới thiệu</a><a class="${page==='bai-test.html'?'active':''}" href="bai-test.html">Bài test</a><a class="${page==='lien-he.html'?'active':''}" href="lien-he.html">Liên hệ</a></nav><button class="search-icon" type="button" aria-label="Tìm kiếm">⌕</button><a class="header-account" href="index.html#account">♙ &nbsp; Đăng nhập / Đăng ký</a><button class="menu-btn" id="menuBtn">☰</button></div></header>`;
    qs('#menuBtn')?.addEventListener('click',()=>qs('.main-nav').classList.toggle('open'));
    qs('.search-icon')?.addEventListener('click',()=> {
        const q=prompt('Bạn muốn tìm khóa học nào?');
        if(q&&q.trim())location.href='khoa-hoc.html?search='+encodeURIComponent(q.trim())
    }
    )
}
function footer() {
    const el=qs('#footer');
    if(!el)return;
    el.innerHTML=`<footer class="site-footer"><div class="footer-inner"><div><h3>YUNA</h3><p>Đồng hành cùng bạn trên hành trình chinh phục ngôn ngữ và khám phá thế giới.</p></div><div><h3>Khám phá</h3><a href="khoa-hoc.html">Khóa học</a><a href="bai-test.html">Bài test</a><a href="gioi-thieu.html">Giới thiệu</a></div><div><h3>Liên hệ</h3><p>0900 123 456<br>hello@yuna.vn</p><a href="tu-van.html">Gửi tin nhắn tư vấn →</a></div></div></footer>`
}
document.addEventListener('DOMContentLoaded',()=> {
    header();
    footer()
}
);
