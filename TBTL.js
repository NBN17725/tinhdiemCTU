// mảng lưu điểm của số tín chỉ, điểm của môn cải thiện và số tín chỉ, điểm tích lũy hiện tại
let tinChivaDiemTL = [];
let caithien = [];

// hàm thêm môn cải thiện ở học kỳ hiện tại
function themmonCT(){
    let inputTinChi = document.getElementById("input-number");
    let selectBefore = document.getElementById("Diem-before");
    let selectAfter = document.getElementById("Diem-after");

    let TinChi = inputTinChi.value;
    let diemAfter = selectAfter.value;
    let diemBefore = selectBefore.value;

      if (TinChi === "" || diemAfter === "" || diemBefore==="") {
        alert("Vui lòng nhập số tín chỉ và chọn điểm!");
        return;
    }

    caithien.push({
        soTinChiCT : Number(TinChi),
        diemTruoc : diemBefore,
        diemSau : diemAfter
    });

    hienthi();
    inputTinChi.value="";
    selectAfter.value=0;
    selectBefore.value=0;
}

// hàm thêm môn học kỳ hiện tại
function themmonHK(){
    let inputTC = document.getElementById("inputTC");
    let selectDiem = document.getElementById("Diem");

    let soTC = inputTC.value;
    let Diemso = selectDiem.value;

    if(soTC === "" || Diemso === ""){
        alert("Vui lòng nhập số tín chỉ và chọn điểm!");
        return;
    }

    tinChivaDiemTL.push({
        soTinChiHK : Number(soTC),
        Diem : Diemso
    });
    hienthiDiemHK();
    inputTC.value="";
    selectDiem.value=0;
}

// hàm hiển thị môn cải thiện ở học kỳ hiện tại
function hienthi(){
    let ul = document.getElementById("list");
    ul.innerHTML="";

    caithien.forEach((item,index)=>{
        let li = document.createElement("li");
        li.innerHTML=`<span class="col Tinchi" >Số tín chỉ: ${item.soTinChiCT}</span>
                      <span class="col DiemSo">Điểm: ${item.diemSau}</span>
                      <button class="xoa" onclick="xoaHang(${index},caithien,hienthi)">Xóa</button>`;
        ul.appendChild(li);
    });
    XoaTatCa.style.display=caithien.length>0 ? "block":"none";
}

// hàm hiển thị môn đã học ở học kỳ hiện tại
function hienthiDiemHK(){
    let ul = document.getElementById("listDiem");
    ul.innerHTML="";

    tinChivaDiemTL.forEach((item,index)=>{
        let li = document.createElement("li");
        li.innerHTML=`<span class="col TinChi">Số tín chỉ: ${item.soTinChiHK}</span>
                      <span class="col DiemSo">Điểm: ${item.Diem}</span>
                      <button class="xoa" onclick="xoaHang(${index},tinChivaDiemTL,hienthiDiemHK)">xóa</button> `
        ul.appendChild(li);
    });
    XoaTatCaHK.style.display=tinChivaDiemTL.length>0 ? "block":"none";
}

// hàm xóa tất cả các môn cải thiện đã thêm
function xoaTatCaCaiThien(){
    caithien=[];
    hienthi();
}
// hàm xóa tất cả các môn học kỳ đã thêm
function xoaTatCaHK(){
    tinChivaDiemTL=[];
    hienthiDiemHK();
}
// hàm xóa 1 môn
function xoaHang(rec,arr,scan){
    arr.splice(rec,1);
    scan();
}
// hàm đổi điểm
function doiDiem(diem){
    switch(diem){
        case 'A':
            return 4.0;
        case 'B+':
            return 3.5;
        case 'B':
            return 3.0;
        case 'C+':
            return 2.5;
        case 'C':
            return 2.0;
        case 'D+':
            return 1.5;
        case 'D':
            return 1.0;
        default:
            return 0;
    }
}
// hàm chuyển đổi điểm TBTL hiện tại
function chuyendoiTBTL(){
    let sotinchihientai = Number(document.getElementById("tinchihientai").value);
    let diemTBTLhientai = Number(document.getElementById("TBTLhientai").value);
    let diemCTtong=0;
    if(sotinchihientai===""||diemTBTLhientai===""){
        alert("Hãy nhập đầy đủ điểm tích lũy và số tín chỉ tích lũy hiện tại của bạn!");
        return 0;
    }
    if(caithien.length>0){
        caithien.forEach((item,index)=>{
            diemCTtong += item.soTinChiCT*doiDiem(item.diemTruoc);
        });
        return (sotinchihientai*diemTBTLhientai)-diemCTtong;
    }

    return sotinchihientai*diemTBTLhientai;
}

// hàm tính điểm TBTL học kỳ
function tinhDiemTBTLhocky(){
    let tongdiem=0;
    let tongtinchi=0;
    tinChivaDiemTL.forEach((item,index)=>{
        let tinchi = item.soTinChiHK;
        let Diemhe4 = doiDiem(item.Diem);
        tongdiem+=tinchi*Diemhe4;
        tongtinchi+=tinchi;
    });

    if(caithien.length>0){
        caithien.forEach((item,index)=>{
            tongdiem +=item.soTinChiCT*doiDiem(item.diemSau);
            tongtinchi+=item.soTinChiCT;
        });
    }
    if(tongtinchi===0){
        return { tongdiem: 0, tongtinchi: 0 };
    }

    return {tongdiem,tongtinchi};
}

// hàm tính tổng số lượng tín chỉ kể cả tín chỉ trong học kỳ hiện tại
function soluongtinchi(){
    let sotinchihientai = Number(document.getElementById("tinchihientai").value);
    let {tongtinchi}=tinhDiemTBTLhocky();
    let tinchicaithien=0;
    if(caithien.length>0){
        caithien.forEach((item, index)=>{
            tinchicaithien += item.soTinChiCT;
        });
    }
    sotinchihientai -=tinchicaithien;
    return tongtinchi+sotinchihientai;
}

// hàm tính trung bình tích lũy( đã bao gồm học kỳ hiện tại)
function tinhTrungBinhTichLuy(){
    let diemCu = chuyendoiTBTL();
    let { tongdiem } = tinhDiemTBTLhocky();
    let tongTC = soluongtinchi();
    let trungbinhtichluy =0;
    if (tongTC === 0) return 0;
    
    trungbinhtichluy=((diemCu + tongdiem) / tongTC).toFixed(2);
    return {tongTC,trungbinhtichluy};
}

// hàm hiển thị kết quả
function hienthiketqua(){
    let {tongTC} =tinhTrungBinhTichLuy();
    let {trungbinhtichluy}=tinhTrungBinhTichLuy();
    document.getElementById("ketqua").innerText=`Số tín chỉ tích lũy: ${tongTC}
                                                Điểm trung bình tích lũy: ${trungbinhtichluy}`;
}