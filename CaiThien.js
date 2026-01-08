// mảng lưu tín chỉ và điểm môn cải thiện
let tinChiVaDiemMonCaiThien=[];

// hàm thêm tín chỉ và môn cải thiện
function themmon(){
    let inputTinChi=document.getElementById("tinchiCT");
    let selectBefore=document.getElementById("Diem-Before");
    let selectAfter=document.getElementById("Diem-After");

    let soluongTC=inputTinChi.value;
    let diemTruoc=selectBefore.value;
    let diemSau=selectAfter.value;

    if(soluongTC===""||diemTruoc===""||diemSau===""){
        alert("Vui lòng nhập số tín chỉ và chọn điểm!");
        return 0;
    }

    tinChiVaDiemMonCaiThien.push({
        tinchi:Number(soluongTC),
        diemBefore:diemTruoc,
        diemAfter:diemSau
    });

    hienthi();
    inputTinChi.value="";
    selectBefore.value=0;
    selectAfter.value=0;
}

// hàm hiển thị tín chỉ và môn cải thiện
function hienthi(){
    let ul = document.getElementById("list");
    ul.innerHTML="";

    tinChiVaDiemMonCaiThien.forEach((item,index)=>{
        let li = document.createElement("li");
        li.innerHTML=`<span class="col TinChi">Số tín chỉ: ${item.tinchi}</span>
                      <span class="col Diemso">Điểm: ${item.diemAfter}</span>
                      <button class="xoa" onclick="xoaHang(tinChiVaDiemMonCaiThien,${index})">Xóa</button>`
        ul.appendChild(li);
    });
    XoaTatCa.style.display = tinChiVaDiemMonCaiThien.length>0 ? "block":"none";
}

// hàm xóa tất cả
function xoaTatCa(){
    tinChiVaDiemMonCaiThien=[];
    hienthi();
}
// hàm xóa 1 hàng
function xoaHang(arr,rec){
    arr.splice(rec,1);
    hienthi();
}

// hàm đổi điểm
function doidiem(diem){
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
        default :
            return 0;
    }
}

// hàm chuyển đổi điểm trung bình tích lũy
function chuyendoiTBTL(){
    let sotinchi=Number(document.getElementById("tinchiTL").value);
    let sodiem=Number(document.getElementById("diemTBTL").value);
    let tongdiem=0;

    if(tinChiVaDiemMonCaiThien.length>0){
        tinChiVaDiemMonCaiThien.forEach((item,index)=>{
             tongdiem+=item.tinchi*doidiem(item.diemBefore);
        });
        return (sotinchi*sodiem)-tongdiem;
    }

    return sotinchi*sodiem;
}

// hàm tính điểm cho môn cải thiện
function tinhdiemCT(){
    let tongtinchi=0;
    let tongdiem=0;

    tinChiVaDiemMonCaiThien.forEach((item,index)=>{
        tongtinchi+=item.tinchi;
        tongdiem+=item.tinchi*doidiem(item.diemAfter);
    })
    if(tongtinchi===0){
        return {tongtinchi:0 , tongdiem:0};
    }
    return {tongtinchi,tongdiem};
}

// hàm tính tổng số lượng tín chỉ
function soluongTinChi(){
    let sotinchihientai=Number(document.getElementById("tinchiTL").value);
    let {tongtinchi}=tinhdiemCT();
    let tinchicaithien=0;
    if(tinChiVaDiemMonCaiThien.length>0){
        tinChiVaDiemMonCaiThien.forEach((item,index)=>{
            tinchicaithien+=item.tinchi;
        })
    }
    sotinchihientai-=tinchicaithien;
    return sotinchihientai+tongtinchi;
}

// hàm tính điểm trung bình tích lũy
function tinhdiemTBTL(){
    let diemtbtl=0;
    let soLuongTinChi=soluongTinChi();
    let {tongdiem}=tinhdiemCT();
    let diemcu=chuyendoiTBTL();
    if(soLuongTinChi===0){
        return {soLuongTinChi:0,diemtbtl:0};
    }
    diemtbtl=((diemcu+tongdiem)/soLuongTinChi).toFixed(2);

    return {soLuongTinChi,diemtbtl};
}

// hàm hiển thị điểm trung bình tích lũy đã bao gồm môn cải thiện
function hienthiDiemTBTL(){
    let {soLuongTinChi} =tinhdiemTBTL();
    let {diemtbtl}=tinhdiemTBTL();
    document.getElementById("ketqua").innerText=`Số tín chỉ tích lũy: ${soLuongTinChi}
                                                Điểm trung bình tích lũy: ${diemtbtl}`;

}

// hàm hiện ra kết quả
function ketqua(){
    let {soLuongTinChi}=tinhdiemTBTL();
    if(soLuongTinChi===0){
        alert("Vui lòng nhập số tín chỉ và chọn điểm!");
        return 0;
    }
    hienthiDiemTBTL();
}