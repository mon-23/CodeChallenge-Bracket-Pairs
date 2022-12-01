const sonder = document.querySelector(':root');
const light_body = getComputedStyle(sonder).getPropertyValue('--color_light');
const dark_body = getComputedStyle(sonder).getPropertyValue('--color_dark');
const light_inp = getComputedStyle(sonder).getPropertyValue('--c2');
const dark_inp = getComputedStyle(sonder).getPropertyValue('--c1');




// dark_mode/light_mode //
let darkmode = document.querySelector('#dark_light');
let switcher = 0
darkmode.addEventListener('click', () => {
    if(switcher == 0){
        $('body').css('background-color', dark_body);
        $('#dark_light').css('color', light_body);
        $('#dark_light').css('background-color', dark_body);
        switcher = 1;
    }
    else{
        $('body').css('background-color', light_body);
        $('#dark_light').css('color', dark_body);
        $('#dark_light').css('background-color', light_body);
        switcher = 0;
    }
});

// show input in color //


function show_content(list, rog){
    let p = document.createElement('p');
    let container = document.createElement('div');
    let add_p = document.querySelector('.show');

    container.style.display = 'flex';
    container.style.marginTop = '0.2rem';
    container.style.marginBottom = '0.2rem';
    container.style.justifyContent = 'center';
    container.style.marginLeft = '50%';
    container.style.transform = 'translate(-50%)';
    container.style.color = rog;
    container.style.backgroundColor = dark_inp;
    container.style.fontWeight = 'bold';
    container.style.fontSize = '1.25rem';

    console.log(list);
    if(cache_1.length == 1){ p.innerText = list[0]; container.appendChild(p); add_p.appendChild(container);  cache_1 = []};
    if(cache_2.length == 1){ p.innerText = list[0]; container.appendChild(p); add_p.appendChild(container);  cache_2 = []};
    if(cache_3.length == 1){ p.innerText = list[0]; container.appendChild(p); add_p.appendChild(container); cache_3 = []};
};

let cache_1 = [];
let cache_2 = [];
let cache_3 = [];

// get input //
let enter = document.querySelector('#enter_btn');
let inp = document.querySelector('#inp');
let num = 0;

function make_loop(str, len){
    
    $.ajax({
        url: '/s1',
        type:'POST',
        data: JSON.stringify(str),
        contentType: 'application/json',
        success: function(data){
            data = JSON.parse(data);
            console.log(data);
            if(data['char'] == 'INVALID' || data['char'] == 'BLOCK'){
                num ++;
                $(inp).css('color', 'red');
                cache_1.push(inp.value[num-1]);
                if(cache_1.length == 1){
                    show_content(cache_1, 'red');
                };
            }
            else if(data['char'] == 'OK'){
                num ++;
                cache_2.push(inp.value[num-1]);
                if(cache_2.length == 1){
                    show_content(cache_2, 'orange');
                };
            }
            else{
                num ++;
                $(inp).css('color', 'green');
                cache_3.push(inp.value[num-1]);
                if(cache_3.length == 1){
                    show_content(cache_3, 'green');
                };
                if(data['char'].length > 3){
                    document.querySelector('#counter').value = data['char'].substr(3);
                };
            };
            if(num == len){num = 0};
        },
        error: function(){
            console.log(str);
            console.log('error');
        },
    });
};

enter.addEventListener('click', () => {
    document.querySelector('.show').innerHTML = '';
    document.querySelector('#counter').value = '';

    let inp_val = inp.value;
    let len = inp_val.length;

    for (i in inp_val){
        let dict = {'char': inp_val[i], len};
        let trans = JSON.stringify(dict);
        make_loop(trans, len);
    };
});

// clear input //
let del = document.getElementById('clear');
del.addEventListener('click', () => {
    document.querySelector('.show').innerHTML = '';
    document.querySelector('#counter').value = '';
    inp.value = '';
    $(inp).css('color', 'black');
});









