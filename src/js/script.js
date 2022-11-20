document.addEventListener('DOMContentLoaded', ()=>{
    init();
});

function init(){
    create_gallery();
    scroll_nav();
    fix_header();
}

function fix_header(){

    const header = document.querySelector('.header');
    const festival = document.querySelector('.festival');
    const body = document.querySelector('body');

    window.addEventListener('scroll', ()=>{
        if(festival.getBoundingClientRect().bottom<0){
            header.classList.add('fixed');
            body.classList.add('scrollfix')
        }else{
            header.classList.remove('fixed');
            body.classList.remove('scrollfix')
        }
    });
}

function scroll_nav(){
    const enlaces = document.querySelectorAll('.header__nav a');
    enlaces.forEach( enlace => {
        enlace.addEventListener('click', e=>{
            e.preventDefault();
            const dir = e.target.attributes.href.value;
            const seccion = document.querySelector(dir);
            seccion.scrollIntoView({behavior: 'smooth'});
        });
    });

}

function create_gallery(){
    const gallery = document.querySelector('.galeria__imagenes');
    for(let i=1; i<=12; i++){
        const imagen = document.createElement('picture');
        imagen.innerHTML = `<source srcset="/build/img/thumbs/${i}.avif" type="image/avif" />
        <source srcset="/build/img/thumbs/${i}.webp" type="image/webp" />
        <img width="200" height="300" src="/build/img/thumbs/${i}.png" alt="imagen galeria" loading="lazy" />
        `;
        imagen.onclick = () => show_image(i);
        gallery.appendChild(imagen);
    }
}

function show_image(img){
    const imagen = document.createElement('picture');
    imagen.innerHTML = `<source srcset="/build/img/grandle/${img}.avif" type="image/avif" />
    <source srcset="/build/img/grandle/${img}.webp" type="image/webp" />
    <img width="200" height="300" src="/build/img/grandle/${img}.png" alt="imagen galeria" loading="lazy" />
    `;
    const overlay = document.createElement('div');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');
    overlay.onclick = ()=>{
        overlay.remove();
        const body = document.querySelector('body');
        body.classList.remove('fixed');
    }

    const boton = document.createElement('button');
    boton.textContent = 'X';
    boton.classList.add('overlay__boton');
    boton.addEventListener('click', ()=>{
        overlay.remove();
        const body = document.querySelector('body');
        body.classList.remove('fixed');
    });
    overlay.appendChild(boton);

    const body = document.querySelector('body');
    body.classList.add('fixed');
    body.appendChild(overlay);
}