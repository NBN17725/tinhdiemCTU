//mang luu diem va so tin chi 
let tinChivaDiem = [];

//ham hien thi va xoa diem va so tinh chi
function hienThi() {
    let ul = document.getElementById("list");
    ul.innerHTML = "";

    tinChivaDiem.forEach((item, index) => {
        let li = document.createElement("li");
        li.innerHTML = `<span class="col Tinchi">Số Tín Chỉ: ${item.soTinChi}</span>
                        <span class="col DiemSo">Điểm: ${item.diem}</span>
            <button class="xoa" onclick="xoaHang(${index})">Xóa</button>
          `;
        ul.appendChild(li);
    }); 
    btnXoaTatCa.style.display =
    tinChivaDiem.length > 0 ? "block" : "none";
}

// ham them mon hoc
function themMon(){
    let InputTinChi = document.getElementById("input-number");
    let SelectDiem = document.getElementById("diem");

    let valueInput = InputTinChi.value;
    let valueSelect = SelectDiem.value;

    if (valueInput === "" || valueSelect === "") {
        alert("Vui lòng nhập số tín chỉ và chọn điểm!");
        return;
    }

        tinChivaDiem.push({
        soTinChi: valueInput,
        diem: valueSelect
    });

    hienThi();
    InputTinChi.value="";
    SelectDiem.value=0;

}

// ham xoa mon hoc
function xoaHang(index) {
    tinChivaDiem.splice(index, 1);
    hienThi();
}

// ham xoa tat ca
function xoaTatCa(){
    tinChivaDiem = [];
    hienThi();
}

// ham doi diem theo thang diem 4
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

// ham tinh diem trung binh hoc ky
function tinhDiemTB(){
    let tongDiem=0;
    let tongTinChi=0;

    tinChivaDiem.forEach(item=>{
        let soTinChi=parseInt(item.soTinChi);
        let soDiemHe4=doiDiem(item.diem);
        tongDiem+=soTinChi*soDiemHe4;
        tongTinChi+=soTinChi;
    });
    if(tongTinChi===0){
        return 0;
    }
    return (tongDiem/tongTinChi).toFixed(2);
}

// ham hien thi trung binh hoc ky
function tinhVaHienThiGPA(){
    document.getElementById("ketqua").innerText="Điểm trung bình: " +tinhDiemTB();
}