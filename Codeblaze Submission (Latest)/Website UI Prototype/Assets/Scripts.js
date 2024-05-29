const dropArea = document.getElementById('drop-area');
const fileInput = document.getElementById('fileInput');
const imageContainer = document.getElementById('imageContainer');
const pname=document.getElementById('pname');
const info=document.getElementById('info');
const ARFrame=document.getElementById('ARFrame');
const RefreshAR=document.getElementById('RefreshAR');

function refreshPage() {
    location.reload();
}

function RefreshARFrame(){
    const temp=ARFrame.src;
    console.log(temp);
    ARFrame.src=temp;
}

RefreshAR.addEventListener('click',RefreshARFrame);

dropArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropArea.style.border = '2px dashed #aaa';
});

dropArea.addEventListener('drop', (e) => {
    e.preventDefault();
    const images = e.dataTransfer.files;
    printImage(images[0]);
});

fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        printImage(file);
    }
});

function printImage(image) {
    const reader = new FileReader();
    const img = document.createElement('img');
    reader.onload = function (e) {
        img.src = e.target.result;
        img.style.width = '250px';
        img.style.height = '250px';
        imageContainer.innerHTML = '';
        imageContainer.appendChild(img);
    };
    reader.readAsDataURL(image);
    information(image.name);
}

function information(name){
        if(name=='Neem1.png'||name=='Neem2.png'||name=='Neem3.png'||name=='Neem4.png'){
            pname.innerHTML='Plant Name: Neem'; 
            info.innerHTML='1. Neem, or Azadirachta indica, boasts medicinal properties.\n\n2. It yields diverse products like neem oil, soap, and toothpaste.\n\n3. Neem treats skin issues, dental problems, and digestive disorders.';
        }
        else if(name=='Pomegranate1.png'||name=='Pomegranate2.png'||name=='Pomegranate3.png'||name=='Pomegranate4.png'){
            pname.innerHTML='Plant Name: Pomegranate'; 
            info.innerHTML='1. Pomegranate, a fruit of Punica granatum, is prized for its health benefits.\n\n2. It is used to make pomegranate juice, supplements, and extracts.\n\n3. Pomegranate aids heart health and may reduce inflammation.';
        }
        else if(name=='Mango1.png'||name=='Mango2.png'||name=='Mango3.png'||name=='Mango4.png'){
            pname.innerHTML='Plant Name: Mango'; 
            info.innerHTML='1. Mango, a tropical fruit, offers numerous health benefits.\n\n2. It is used to make various products, including mango juice and chutney.\n\n3. Mango helps boost immunity, aids digestion, and supports eye health.';
        }
        else if(name=='Peepal1.png'||name=='Peepal2.png'||name=='Peepal3.png'||name=='Peepal4.png'){
            pname.innerHTML='Plant Name: Peepal'; 
            info.innerHTML='1. Peepal, also known as Ficus religiosa, holds medicinal significance.\n\n2. Its extracts are used in various products like herbal remedies and cosmetics.\n\n3. Peepal addresses health concerns such as respiratory ailments, skin issues, and digestive disorders.';
        }
        else if(name=='Mint1.png'||name=='Mint2.png'||name=='Mint3.png'||name=='Mint4.png'){
            pname.innerHTML='Plant Name: Mint'; 
            info.innerHTML='1. Mint, a fragrant herb, offers numerous medicinal benefits.\n\n2. It is used to create products like mint oil, teas, and chewing gum.\n\n3. Mint aids in alleviating digestive problems, soothing headaches, and freshening breath.';
        }
        else if(name=='cotton1.png'||name=='cotton2.png'||name=='cotton3.png'||name=='cotton4.png'){
            pname.innerHTML='Raw Material: Cotton'; 
            info.innerHTML='Cotton is extensively used in textiles for clothing, linens, and towels. It plays a crucial role in the medical field, used in bandages and swabs due to its absorbent and hypoallergenic properties. Premium paper products like currency notes and stationery benefit from cotton is durable and fine fibers.';
        }
        else if(name=='starch1.png'||name=='starch2.png'||name=='starch3.png'||name=='starch4.png'){
            pname.innerHTML='Raw Material: Starch'; 
            info.innerHTML='Starch serves as a thickening agent in food products and an adhesive in non-food industries. It is also used as a filler in pharmaceutical tablets and capsules.';
        }
        else if(name=='hemp1.png'||name=='hemp2.png'||name=='hemp3.png'||name=='hemp4.png'){
            pname.innerHTML='Raw Material: Hemp'; 
            info.innerHTML='Hemp is a versatile plant used for strong fibers in textiles, rope, and paper. Hemp seeds are nutritious and used for food. It is also an eco-friendly building material, particularly in the form of hempcrete.';
        }
        else{
            pname.innerHTML=''; 
            info.innerHTML='';
        }

}