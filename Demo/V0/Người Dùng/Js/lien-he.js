document.addEventListener('DOMContentLoaded',()=>qs('#contactForm').addEventListener('submit',e=> {
    e.preventDefault();
    qs('#contactMessage').textContent='Cảm ơn bạn. Tin nhắn đã được ghi nhận.';
    e.target.reset()
}
));
