document.addEventListener('DOMContentLoaded',()=> {
    const id=Number(new URLSearchParams(location.search).get('id'))||1,d=getData(),c=d.courses.find(x=>x.id===id)||d.courses[0];
    qs('#courseDetail').innerHTML=`<div class="detail"><div><img src="${c.image}" alt="${c.name}"></div><div><span class="eyebrow">${c.language}</span><h1>${c.name}</h1><p>${c.desc}</p><div class="detail-price">${money(c.price)}</div><ul><li>Thời lượng: ${c.duration}</li><li>Chứng chỉ: ${c.certificate}</li><li>Lớp học trực tiếp và lịch linh hoạt</li><li>Theo dõi tiến độ học tập</li></ul><div class="detail-actions"><button class="btn primary" data-open-register>Đăng ký khóa học</button><a class="btn ghost" href="khoa-hoc.html">Quay lại</a></div></div></div>`;
    qs('[data-open-register]').addEventListener('click',openRegister)
}
);
