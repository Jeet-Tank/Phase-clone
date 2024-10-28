const images = document.querySelectorAll('.image_class');
const hoverArea = document.querySelectorAll('.img_holder');
const hoverText = {
    "1": document.querySelector("#img1>.hover_text"),
    "2": document.querySelector("#img2>.hover_text"),
    "3": document.querySelector("#img3>.hover_text"),
    "4": document.querySelector("#img4>.hover_text"),
}
var enabled = true;

function loadpage(){
    document.getElementById("loader").style.display = "none";
    document.getElementById("main").style.display="block";
}

function hover_image_animation(){
    hoverArea.forEach(function (area){
        const text_index = area.querySelector(".image_class").getAttribute("data-index");
        var bodyRect = document.body.getBoundingClientRect();
        area.addEventListener('mousemove',function(dets){
            if(!enabled){
                return 0;
            }
            var elemRect = area.getBoundingClientRect();
            const current_image = area.querySelector(".image_class");
            const current_image_src = area.querySelector(".image_class").src;
            
            images.forEach(function(img){
                img.src = './assets/pixelcut-export (1).png';
                img.style.width ="84%";
                img.style.objectFit = "cover";
                img.style.objectPosition = "center";
            })
            current_image.src = current_image_src;
            current_image.style.width ="84%";
            document.querySelectorAll(".hero_text_wrapper h1").forEach(function (text){
                text.style.color="transparent";
                text.style.webkitTextStroke="1px #afafaf";
                text.style.transition = "0.3s ease"
            });
            document.querySelectorAll(".hero_text_wrapper").forEach(function(text){
                text.style.zIndex=8;
            })
            
            area.querySelector(".image_class").style.transition = "none"
            area.querySelector(".image_class").style.transform= 'translate('+ (dets.x - elemRect.left-bodyRect.left - 20) + 'px,'+ (dets.y - elemRect.top-bodyRect.top - 150) + 'px)';
            document.getElementById("hover_text_"+text_index).style.display = "block";
            hoverText[text_index].style.transform = 'translate('+ (dets.x - elemRect.left-bodyRect.left - 10) + 'px,'+ (dets.y - elemRect.top-bodyRect.top - 150) + 'px)';
            hoverText[text_index].style.transition = " transform 0.3s cubic-bezier(.24,.71,.45,.91)";
            
        })
        hoverArea.forEach(function(area){
            area.addEventListener('mouseleave',function(){
                document.getElementById("hover_text_"+text_index).style.display = "none";
                enabled = false;
                setTimeout(function(){
                    enabled=true;
                },800)
                area.querySelector(".image_class").style.transition = "transform 0.7s cubic-bezier(.24,.71,.45,.91)"
            })
        })
    })
    hoverArea.forEach(function (area){
        area.addEventListener('mouseleave',function(){
            images.forEach(function(img){
                img.src = img.getAttribute("data-src");
                img.style.width ="84%";
            })
            document.querySelectorAll(".hero_text_wrapper h1").forEach(function (text){
                text.style.color="white";
                text.style.webkitTextStroke="0px";
            })
            document.querySelectorAll(".hero_text_wrapper").forEach(function(text){
                text.style.zIndex=11;
            })
            area.querySelector(".image_class").style.transform= 'translate(0%,0%)';
        })
    })
}

function gsap_animation(){
    gsap.from(".hero_text_wrapper h1",{
        delay:2,
        y:100,
        stagger:0.1,
    })
    var tl1 = gsap.timeline();
    
    tl1.from("#img1>img",{
        delay:2.2,
        scale:0.2,
        duration:0.8,
        opacity:0,
    })
    tl1.from("#img4>img",{
        scale:0.2,
        duration:0.4,
        opacity:0,
    })
    tl1.from("#img2>img",{
        scale:0.2,
        duration:0.5,
        opacity:0,
    })
    tl1.from("#img3>img",{
        scale:0.2,
        duration:0.2,
        opacity:0,
    })
}

setTimeout(hover_image_animation,5000);
window.setTimeout(loadpage,2000);
gsap_animation();