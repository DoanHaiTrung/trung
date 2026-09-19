const A=window;
document.addEventListener('DOMContentLoaded',()=> {
    if(localStorage.getItem('yuna_role')!=='admin') {
        location.href='../Người Dùng/html/index.html#account';
        return
    }
    let d=getData();
    const sections=qsa('.admin-section'),title=qs('#sectionTitle');
    qsa('.sidebar nav button').forEach(b=>b.onclick=()=> {
        qsa('.sidebar nav button').forEach(x=>x.classList.remove('active'));
        b.classList.add('active');
        sections.forEach(s=>s.classList.remove('active'));
        qs('#'+b.dataset.section).classList.add('active');
        title.textContent=b.textContent;
        renderAll()
    }
    );
    qs('#logoutBtn').onclick=()=> {
        localStorage.removeItem('yuna_logged_in');
        localStorage.removeItem('yuna_role');
        location.href='../Người Dùng/html/index.html#account'
    }
    ;
    qs('#addCourse').onclick=()=>courseForm();
    qs('#addClass').onclick=()=>classForm();
    qs('#addTeacher').onclick=()=>teacherForm();
    qs('#addQuestion').onclick=()=>questionForm();
    renderAll();
    function renderAll() {
        d=getData();
        renderStats();
        renderCourses();
        renderClasses();
        renderTeachers();
        renderStudents();
        renderQuestions();
        renderReports()
    }
    function renderStats() {
        qs('#stats').innerHTML=[['Học viên',d.students.length],['Khóa học',d.courses.length],['Lớp học',d.classes.length],['Giáo viên',d.teachers.length]].map(x=>`<div class="stat"><strong>${x[1]}</strong><span>${x[0]}</span></div>`).join('');
        qs('#recentList').innerHTML=d.activity.slice(0,6).map(x=>`<p>${x}</p>`).join('')||'<p>Chưa có hoạt động.</p>'
    }
    function table(headers,rows) {
        return `<div class="table-wrap"><table class="data-table"><thead><tr>${headers.map(h=>`<th>$ {
            h
        }
        </th>`).join('')}</tr></thead><tbody>${rows.join('')}</tbody></table></div>`
    }
    function renderCourses() {
        qs('#courseTable').innerHTML=table(['Tên khóa học','Ngôn ngữ','Thời lượng','Học phí','Chứng chỉ','Thao tác'],d.courses.map(c=>`<tr><td>${c.name}</td><td>${c.language}</td><td>${c.duration}</td><td>${money(c.price)}</td><td>${c.certificate}</td><td><button class="small-btn" data-edit-course="${c.id}">Sửa</button> <button class="small-btn danger" data-del-course="${c.id}">Xóa</button></td>`))
    }
    function renderClasses() {
        qs('#classTable').innerHTML=table(['Lớp','Khóa học','Giáo viên','Phòng','Lịch'],d.classes.map(c=>`<tr><td>${c.name}</td><td>${c.course}</td><td>${c.teacher}</td><td>${c.room}</td><td>${c.schedule}</td></tr>`))
    }
    function renderTeachers() {
        qs('#teacherTable').innerHTML=table(['Họ tên','Email','Chuyên môn'],d.teachers.map(t=>`<tr><td>${t.name}</td><td>${t.email}</td><td>${t.specialty}</td></tr>`))
    }
    function renderStudents() {
        qs('#studentTable').innerHTML=d.students.length?table(['Họ tên','Email','Điện thoại','Ngôn ngữ','Trạng thái'],d.students.map(s=>`<tr><td>${s.name}</td><td>${s.email}</td><td>${s.phone}</td><td>${s.language}</td><td>${s.status||'Chờ tư vấn'}</td></tr>`)):'<p>Chưa có học viên.</p>'
    }
    function renderQuestions() {
        qs('#questionTable').innerHTML=table(['Câu hỏi','Đáp án đúng','Thao tác'],d.questions.map(q=>`<tr><td>${q.q}</td><td>${q.answers[q.correct]}</td><td><button class="small-btn danger" data-del-question="${q.id}">Xóa</button></td></tr>`))
    }
    function renderReports() {
        const revenue=d.students.length*3200000;
        qs('#reportCards').innerHTML=`<div class="report"><span>Doanh thu ước tính</span><b>${money(revenue)}</b></div><div class="report"><span>Tỷ lệ có chứng chỉ</span><b>${d.courses.length?Math.round(d.courses.filter(x=>x.certificate==='Có').length/d.courses.length*100):0}%</b></div><div class="report"><span>Ngôn ngữ phổ biến</span><b>${d.students[0]?.language||'Tiếng Anh'}</b></div>`;
        const vals=[35,55,72,48,86,65];
        qs('#revenueChart').innerHTML=vals.map((v,i)=>`<div class="bar" style="height:${v}%"><span>T${i+1}</span></div>`).join('')
    }
    document.addEventListener('click',e=> {
        const id=e.target.dataset.delCourse;
        if(id) {
            d.courses=d.courses.filter(x=>x.id!==Number(id));
            saveData(d);
            renderAll()
        }
        const qid=e.target.dataset.delQuestion;
        if(qid) {
            d.questions=d.questions.filter(x=>x.id!==Number(qid));
            saveData(d);
            renderAll()
        }
        const eid=e.target.dataset.editCourse;
        if(eid)courseForm(d.courses.find(x=>x.id===Number(eid)))
    }
    )
    function modal(title,body) {
        const m=qs('#adminModal');
        m.className='modal open';
        m.innerHTML=`<div class="admin-modal"><button class="modal-close" onclick="this.closest('.modal').className='modal'">×</button><h2>${title}</h2>${body}</div>`;
        return m
    }
    function courseForm(c= {
    }
    ) {
        const m=modal(c.id?'Sửa khóa học':'Thêm khóa học',`<form id="entityForm"><label>Tên khóa học<input name="name" required value="${c.name||''}"></label><label>Ngôn ngữ<input name="language" required value="${c.language||''}"></label><label>Thời lượng<input name="duration" required value="${c.duration||''}"></label><label>Học phí<input name="price" type="number" required value="${c.price||''}"></label><label>Chứng chỉ<select name="certificate"><option ${c.certificate==='Có'?'selected':''}>Có</option><option ${c.certificate==='Không'?'selected':''}>Không</option></select></label><label>Mô tả<textarea name="desc">${c.desc||''}</textarea></label><button class="btn primary">Lưu khóa học</button></form>`);
        qs('#entityForm',m).onsubmit=e=> {
            e.preventDefault();
            const f=new FormData(e.target),obj= {
                id:c.id||Date.now(),name:f.get('name'),language:f.get('language'),duration:f.get('duration'),price:Number(f.get('price')),certificate:f.get('certificate'),image:c.image||'../../IMG/course-english.png',desc:f.get('desc')
            }
            ;
            if(c.id) {
                const i=d.courses.findIndex(x=>x.id===c.id);
                d.courses[i]=obj
            }
            else d.courses.push(obj);
            d.activity.unshift(`Cập nhật khóa học: ${obj.name}`);
            saveData(d);
            m.className='modal';
            renderAll()
        }
    }
    function classForm() {
        const m=modal('Thêm lớp học',`<form id="entityForm"><label>Tên lớp<input name="name" required></label><label>Khóa học<input name="course" required></label><label>Giáo viên<input name="teacher" required></label><label>Phòng<input name="room" required></label><label>Lịch học<input name="schedule" required placeholder="T2-T4-T6 | 18:30"></label><button class="btn primary">Lưu lớp</button></form>`);
        qs('#entityForm',m).onsubmit=e=> {
            e.preventDefault();
            const f=new FormData(e.target);
            d.classes.push( {
                id:Date.now(),name:f.get('name'),course:f.get('course'),teacher:f.get('teacher'),room:f.get('room'),schedule:f.get('schedule')
            }
            );
            saveData(d);
            m.className='modal';
            renderAll()
        }
    }
    function teacherForm() {
        const m=modal('Tạo tài khoản giáo viên',`<form id="entityForm"><label>Họ tên<input name="name" required></label><label>Email<input name="email" type="email" required></label><label>Chuyên môn<input name="specialty" required></label><button class="btn primary">Tạo tài khoản</button></form>`);
        qs('#entityForm',m).onsubmit=e=> {
            e.preventDefault();
            const f=new FormData(e.target);
            d.teachers.push( {
                id:Date.now(),name:f.get('name'),email:f.get('email'),specialty:f.get('specialty')
            }
            );
            saveData(d);
            m.className='modal';
            renderAll()
        }
    }
    function questionForm() {
        const m=modal('Thêm câu hỏi',`<form id="entityForm"><label>Câu hỏi<textarea name="q" required></textarea></label><label>Đáp án A<input name="a" required></label><label>Đáp án B<input name="b" required></label><label>Đáp án C<input name="c" required></label><label>Đáp án D<input name="d" required></label><label>Đáp án đúng<select name="correct"><option value="0">A</option><option value="1">B</option><option value="2">C</option><option value="3">D</option></select></label><button class="btn primary">Lưu câu hỏi</button></form>`);
        qs('#entityForm',m).onsubmit=e=> {
            e.preventDefault();
            const f=new FormData(e.target);
            d.questions.push( {
                id:Date.now(),q:f.get('q'),answers:[f.get('a'),f.get('b'),f.get('c'),f.get('d')],correct:Number(f.get('correct'))
            }
            );
            saveData(d);
            m.className='modal';
            renderAll()
        }
    }
}
);
