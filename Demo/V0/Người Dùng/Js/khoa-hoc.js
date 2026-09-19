document.addEventListener('DOMContentLoaded',()=> {
    const d=getData();
    const target=[
    {
        id:1,name:'Tiếng Anh Giao Tiếp',language:'Tiếng Anh',duration:'3 tháng',price:3200000,certificate:'Có',image:'../../IMG/course-english.png',desc:'Tiếng Anh Giao tiếp với trọng tâm phản xạ, phát âm và giao tiếp thực tế.'
    }
    ,
    {
        id:2,name:'Tiếng Hàn Sơ cấp',language:'Tiếng Hàn',duration:'4 tháng',price:4200000,certificate:'Có',image:'../../IMG/course-korean.png',desc:'Nắm nền tảng tiếng Hàn, giao tiếp cơ bản và làm quen văn hóa.'
    }
    ,
    {
        id:3,name:'Tiếng Trung Chuyên sâu',language:'Tiếng Trung',duration:'6 tháng',price:5200000,certificate:'Có',image:'../../IMG/course-chinese.png',desc:'Chinh phục tiếng Trung chuyên sâu, giao tiếp và luyện thi HSK.'
    }
    ];
    const courses=target.concat((d.courses||[]).filter(x=>!target.some(t=>t.language===x.language))).slice(0,6);
    const langs=[...new Set(courses.map(x=>x.language))],dur=[...new Set(courses.map(x=>x.duration))];
    qs('#languageFilter').insertAdjacentHTML('beforeend',langs.map(x=>`<option>${x}</option>`).join(''));
    qs('#durationFilter').insertAdjacentHTML('beforeend',dur.map(x=>`<option>${x}</option>`).join(''));
    function imgPath(x) {
        return x && x.includes('/') ? x : '../../IMG/course-english.png'
    }
    function render() {
        let a=courses.slice(),q=new URLSearchParams(location.search).get('search')?.toLowerCase()||'',l=qs('#languageFilter').value,du=qs('#durationFilter').value,c=qs('#certificateFilter').value;
        if(q)a=a.filter(x=>(x.name+' '+x.language+' '+x.desc).toLowerCase().includes(q));
        if(l)a=a.filter(x=>x.language===l);
        if(du)a=a.filter(x=>x.duration===du);
        if(c)a=a.filter(x=>x.certificate===c);
        qs('#courseList').innerHTML=a.map(x=>`<article class="course-card"><img src="${imgPath(x.image)}" alt="${x.name}"><div class="course-body"><span class="tag">${x.language}</span><h3>${x.name}</h3><p>${x.desc}</p><div class="course-meta"><span class="tag">◷ ${x.duration}</span><span class="tag">Chứng chỉ: ${x.certificate}</span></div><div class="price">${money(x.price)}</div><a class="btn primary" href="chi-tiet-khoa-hoc.html?id=${x.id}">Xem chi tiết</a></div></article>`).join('')||'<p>Không tìm thấy khóa học phù hợp.</p>'
    }
    qsa('.filters select').forEach(x=>x.addEventListener('change',render));
    render()
}
);
