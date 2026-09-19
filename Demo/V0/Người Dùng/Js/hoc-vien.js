document.addEventListener('DOMContentLoaded',()=> {
    const sId=Number(localStorage.getItem('merimaid_student'));
    const d=getData(),s=d.students.find(x=>x.id===sId);
    if(s) {
        const f=qs('#studentForm');
        ['name','email','phone'].forEach(k=> {
            if(f.elements[k])f.elements[k].value=s[k]||''
        }
        );
        if(f.elements.language)f.elements.language.value=s.language||'Tiếng Anh'
    }
    qs('#studentForm').addEventListener('submit',e=> {
        e.preventDefault();
        const fd=new FormData(e.target),d=getData(),id=Number(localStorage.getItem('merimaid_student'))||Date.now(),obj= {
            id,name:fd.get('name'),email:fd.get('email'),phone:fd.get('phone'),language:fd.get('language'),goal:fd.get('goal'),dob:fd.get('dob'),note:fd.get('note'),status:'Đang học'
        }
        ;
        const i=d.students.findIndex(x=>x.id===id);
        if(i>=0)d.students[i]=obj;
        else d.students.push(obj);
        d.activity.unshift(`${obj.name} cập nhật thông tin học viên`);
        saveData(d);
        qs('#studentMessage').textContent='Đã lưu thông tin học viên.'
    }
    )
}
);
