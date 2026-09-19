(function(){
  'use strict';
  if(document.getElementById('accountModal')) return;
  const modal = document.createElement('div');
  modal.id='accountModal';
  modal.className='account-modal';
  modal.setAttribute('aria-hidden','true');
  modal.innerHTML=`
    <div class="account-backdrop" data-close-account></div>
    <section class="account-dialog" role="dialog" aria-modal="true" aria-labelledby="accountTitle">
      <button class="account-close" type="button" data-close-account aria-label="Đóng">×</button>
      <h2 id="accountTitle">Đăng nhập</h2>
      <p class="account-subtitle">Đăng nhập để tiếp tục sử dụng dịch vụ của Yuna.</p>
      <div class="tabs">
        <button class="active" type="button" data-tab="login">Đăng nhập</button>
        <button type="button" data-tab="register">Đăng ký</button>
      </div>
      <form id="loginForm">
        <div class="form-group"><label for="homeLoginEmail">Email hoặc số điện thoại</label><input id="homeLoginEmail" autocomplete="username" placeholder="Email hoặc số điện thoại" required></div>
        <div class="form-group"><label for="homePassword">Mật khẩu</label><div class="password-input"><input id="homePassword" autocomplete="current-password" placeholder="Mật khẩu" required type="password"><button data-toggle-home-password type="button">Hiện</button></div></div>
        <button class="account-submit" type="submit">Đăng nhập →</button>
        <p class="account-foot">Chưa có tài khoản? <button data-tab="register" type="button">Đăng ký ngay</button></p>
      </form>
      <form class="hidden" id="registerForm">
        <div class="form-group"><label for="regName">Họ và tên</label><input id="regName" name="name" placeholder="Nguyễn Văn A" required></div>
        <div class="form-group"><label for="regEmail">Email</label><input id="regEmail" name="email" placeholder="you@example.com" required type="email"></div>
        <div class="form-group"><label for="regLanguage">Ngôn ngữ</label><select id="regLanguage" name="language"><option>Tiếng Anh</option><option>Tiếng Trung</option><option>Tiếng Nhật</option><option>Tiếng Hàn</option></select></div>
        <div class="form-group"><label for="homeRegisterPassword">Mật khẩu</label><div class="password-input"><input id="homeRegisterPassword" minlength="6" name="password" placeholder="Tối thiểu 6 ký tự" required type="password"><button data-toggle-home-register-password type="button">Hiện</button></div></div>
        <button class="account-submit" type="submit">Tạo tài khoản →</button>
      </form>
    </section>`;
  document.body.appendChild(modal);

  // Default local demo administrator requested by the site owner.
  // This is client-side demo authentication, not production security.
  const defaultAdmin={email:'admin@gmail.com',password:'Myduyen952004',name:'Quản trị viên',role:'admin'};
  const storedAccounts=JSON.parse(localStorage.getItem('yuna_accounts')||'[]');
  if(!storedAccounts.some(x=>(x.email||'').toLowerCase()===defaultAdmin.email)) {
    storedAccounts.push(defaultAdmin);
    localStorage.setItem('yuna_accounts',JSON.stringify(storedAccounts));
  }

  const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const title=$('#accountTitle',modal);
  function tab(name){
    $$('.tabs [data-tab]',modal).forEach(b=>b.classList.toggle('active',b.dataset.tab===name));
    $('#loginForm',modal).classList.toggle('hidden',name!=='login');
    $('#registerForm',modal).classList.toggle('hidden',name!=='register');
    title.textContent=name==='login'?'Đăng nhập':'Đăng ký tài khoản';
  }
  function open(name='login'){
    tab(name); modal.classList.add('open'); modal.setAttribute('aria-hidden','false'); document.body.classList.add('modal-open');
    setTimeout(()=>$(name==='login'?'#homeLoginEmail':'#regName',modal)?.focus(),50);
  }
  function close(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.classList.remove('modal-open');}
  $$('[data-open-account]').forEach(b=>b.addEventListener('click',()=>open(b.dataset.openAccount||'login')));
  $$('[data-close-account]',modal).forEach(b=>b.addEventListener('click',close));
  $$('.tabs [data-tab], .account-foot [data-tab]',modal).forEach(b=>b.addEventListener('click',()=>tab(b.dataset.tab)));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal.classList.contains('open'))close();});
  $('[data-toggle-home-password]',modal)?.addEventListener('click',e=>{const i=$('#homePassword',modal);i.type=i.type==='password'?'text':'password';e.currentTarget.textContent=i.type==='password'?'Hiện':'Ẩn';});
  $('[data-toggle-home-register-password]',modal)?.addEventListener('click',e=>{const i=$('#homeRegisterPassword',modal);i.type=i.type==='password'?'text':'password';e.currentTarget.textContent=i.type==='password'?'Hiện':'Ẩn';});
  $('#loginForm',modal).addEventListener('submit',e=>{
    e.preventDefault();
    const email=$('#homeLoginEmail',modal).value.trim(), pass=$('#homePassword',modal).value;
    if(email.toLowerCase()==='admin@gmail.com'&&pass==='Myduyen952004'){localStorage.setItem('yuna_logged_in','true');localStorage.setItem('yuna_role','admin');location.href='../../Quan Tri/quan-tri.html';return;}
    const accounts=JSON.parse(localStorage.getItem('yuna_accounts')||'[]');
    const a=accounts.find(x=>(x.email===email||x.phone===email)&&x.password===pass);
    if(!a){alert('Email/số điện thoại hoặc mật khẩu chưa đúng.');return;}
    localStorage.setItem('yuna_logged_in','true');localStorage.setItem('yuna_role','student');localStorage.setItem('yuna_current_user',JSON.stringify(a));alert('Đăng nhập thành công!');close();
  });
  $('#registerForm',modal).addEventListener('submit',e=>{
    e.preventDefault();const fd=new FormData(e.target);const a={name:String(fd.get('name')||'').trim(),email:String(fd.get('email')||'').trim(),language:String(fd.get('language')||''),password:String(fd.get('password')||'')};
    if(a.password.length<6){alert('Mật khẩu phải có ít nhất 6 ký tự.');return;}
    const accounts=JSON.parse(localStorage.getItem('yuna_accounts')||'[]');if(accounts.some(x=>(x.email||'').toLowerCase()===a.email.toLowerCase())){alert('Email này đã được đăng ký.');return;}
    accounts.push(a);localStorage.setItem('yuna_accounts',JSON.stringify(accounts));localStorage.setItem('yuna_logged_in','true');localStorage.setItem('yuna_role','student');localStorage.setItem('yuna_current_user',JSON.stringify(a));alert('Đăng ký thành công!');close();
  });
  if(location.hash==='#account') open('login');
})();
