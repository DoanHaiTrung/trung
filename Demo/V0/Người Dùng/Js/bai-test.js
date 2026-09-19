document.addEventListener('DOMContentLoaded',()=> {
    const questions=[
    {
        q:'Ngôn ngữ bạn quan tâm?',answers:['Tiếng Anh','Tiếng Hàn','Tiếng Trung','Khác'],correct:0
    }
    ,
    {
        q:'She ___ to school every day.',answers:['go','goes','going','gone'],correct:1
    }
    ,
    {
        q:'Choose the meaning of “hello”.',answers:['Xin chào','Tạm biệt','Cảm ơn','Xin lỗi'],correct:0
    }
    ,
    {
        q:'I ___ coffee every morning.',answers:['drink','drinks','drinking','drank'],correct:0
    }
    ,
    {
        q:'What is the opposite of “big”?',answers:['long','small','fast','high'],correct:1
    }
    ,
    {
        q:'“Thank you” means:',answers:['Xin lỗi','Cảm ơn','Tạm biệt','Chúc ngủ ngon'],correct:1
    }
    ,
    {
        q:'They ___ playing football now.',answers:['is','are','am','be'],correct:1
    }
    ,
    {
        q:'Choose the correct plural:',answers:['childs','childes','children','childrens'],correct:2
    }
    ,
    {
        q:'We use “yesterday” with:',answers:['present','past','future','continuous only'],correct:1
    }
    ,
    {
        q:'How ___ are you?',answers:['old','many','much','far'],correct:0
    }
    ];
    let step=0,score=0,chosen=[];
    const qbox=qs('#questionBox'),stepText=qs('#stepText'),prev=qs('#prevBtn'),next=qs('#nextBtn');
    function render() {
        const q=questions[step];
        stepText.textContent=`Bước ${step+1}/10`;
        qbox.innerHTML=`<div class="question-title">${q.q}</div><div class="answers">${q.answers.map((a,i)=>`<label class="answer"><input type="radio" name="answer" value="${i}" $ {
            chosen[step]===i?'checked':''
        }
        >$ {
            a
        }
        </label>`).join('')}</div>`;
        prev.style.visibility=step?'visible':'hidden';
        next.textContent=step===questions.length-1?'Hoàn thành':'Tiếp tục'
    }
    function selected() {
        const x=qs('input[name="answer"]:checked');
        return x?Number(x.value):null
    }
    next.addEventListener('click',()=> {
        const s=selected();
        if(s===null)return;
        if(chosen[step]===undefined&&s===questions[step].correct)score++;
        chosen[step]=s;
        if(step<questions.length-1) {
            step++;
            render()
        }
        else {
            qbox.style.display='none';
            document.querySelector('.test-actions').style.display='none';
            const r=qs('#testResult');
            r.classList.add('show');
            r.innerHTML=`<strong>Hoàn thành bài test!</strong><br>Bạn đúng ${score}/10 câu.`
        }
    }
    );
    prev.addEventListener('click',()=> {
        if(step>0) {
            step--;
            render()
        }
    }
    );
    render()
}
);
