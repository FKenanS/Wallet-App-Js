//? selectors

//*ekle formu

const ekleBtn = document.querySelector(`#ekle-btn`)
const gelirBtn = document.querySelector(`#gelir-input`)
const ekleFormu = document.querySelector(`#ekle-formu`)

//*sonuc tablosu

const gelirinizTable = document.getElementById(`geliriniz`)
const giderinizTable = document.getElementById(`gideriniz`)
const kalanTable = document.getElementById(`kalan`)

//? variables

let gelirler = 0;
let harcamaListesi = [];

//* Harcama Formu

const harcamaFormu = document.getElementById("harcama-formu");
const tarihInput = document.getElementById("tarih");
const miktarInput = document.getElementById("miktar");
const harcamaAlaniInput = document.getElementById("harcama-alani");

//* harcama tablosu
const harcamaBody = document.getElementById("harcama-body");
const temizleBtn = document.getElementById("temizle-btn");

//! ilk formu doldurma.

harcamaFormu.addEventListener(`submit`, (e) => {
    e.preventDefault() //submiti gorunce hemen database a gonderme yapma demek reload engellenir.
    const yeniHarcama = {
        tarih: tarihInput.value,
        miktar: miktarInput.value,
        aciklama: harcamaAlaniInput.value,
        id: new Date().getTime() //db ile calisirken kendisi otomatik atama yapiyor ama local yaptigimiz icin kendimiz id atamasi yaptik.
    }
    harcamaListesi.push(yeniHarcama)
    //console.table(harcamaListesi);// refresh yapinca kalici degil... 
    //ekrana bastir ayni yere yazmak mantikli degil 
    harcamayiShowScreen(yeniHarcama)
    harcamaFormu.reset() //form doldurma islemi sonrasi kaydedince alanlari sifirlama
    // harcama()
    // render()
    hesaplaGuncelle()
})

//! harcamalari DOM daki table a bastir.

const harcamayiShowScreen = ({ id, tarih, miktar, aciklama }) => {
    harcamaBody.innerHTML += `<tr>
    <td class="bg-warning">${tarih}</td>
    <td>${aciklama}</td>
    <td>${miktar}</td>
    <td><i id=${id} class="fa-solid fa-trash-can text-danger"  type="button"></i></td>
    </tr>`;
    // silme islemi sonradan render edildigi icin bu kisimda yapilmali disina yaparsak render edilmemis bir seye tiklaninca sil gibi sacma bir sey olur.
    document.querySelectorAll(`.fa-trash-can`).forEach((sil) => {
        sil.onclick = () => {
            // sil.parentElement.parentElement.remove() 
            sil.closest(`tr`).remove()
        }
    })
}

//todo global array ile yapilisi ve map ile 

// const harcama = ()=>{
//     harcamaBody.innerHTML = "";
//     harcamaListesi.forEach((a)=>{
//             harcamaBody.innerHTML += `<tr>
//     <td class="bg-danger">${a.tarih}</td>
//     <td>${a.aciklama}</td>
//     <td>${a.miktar}</td>
//     <td><i id=${id} class="fa-solid fa-trash-can text-danger"  type="button"></i></td>
//     </tr>`
// }
//     )
// };


//todo map ile yapilisi
//const render = ()=> {
//     harcamaBody.innerHTML = harcamaListesi.map((a,i)=>  `
//       <tr>
//         <td>${a.tarih}</td>
//         <td>${a.aciklama}</td>
//         <td>${a.miktar}</td>
//         <td>
//           sil
//         </td>
//       </tr>
//     ` ).join(``)
// }; map ile indeksini de alman lazim (a,i)
//
//
//
//
//
//--------------





//! ekle formu
ekleFormu.addEventListener(`submit`, (e) => {
    e.preventDefault()
    gelirler += +gelirBtn.value
    hesaplaGuncelle()
    gelirBtn.value = ``;
})


//! hesapla ve guncelle 

const hesaplaGuncelle = () => {
    gelirinizTable.textContent = gelirler;

    const giderler = harcamaListesi.reduce((acc, giderler)=> acc + +giderler.miktar , 0)
    giderinizTable.textContent = giderler
    kalanTable.textContent = gelirler - giderler
}



//! Bilgileri Temizle

temizleBtn.onclick=()=>{
    if(confirm(`All data will deleted ?`)){
        harcamaListesi = [];
        gelirler = 0;
        hesaplaGuncelle()
        harcamaBody.innerHTML = ``
    }
}