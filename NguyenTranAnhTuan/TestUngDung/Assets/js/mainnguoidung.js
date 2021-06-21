$(document).ready(function () {
    // =====================ĐĂNG KÍ TÀI KHOẢN====================
    //GET HUYỆN VỀ COMBOBOX
    $('#MaTinh').change(function () {
        $.post('./Ajax/getQuanHuyen', {
            MaTinh: $('option:selected', this).val()
        }, function (result) {
            $('#MaHuyen').html(result);
            $('#MaXa').html('<option disabled selected>Xã/Phường</option>');
        },
            'text'
        );
    });
    //GET XÃ VỀ COMBOBOX
    $('#MaHuyen').change(function () {
        $.post('./Ajax/getXaPhuong', {
            MaHuyen: $('option:selected', this).val()
        }, function (result) {
            $('#MaXa').html(result);
        },
            'text'
        );
    });
    //CHECK TÀI KHOẢN TỒN TẠI
    $("#TaiKhoan").keyup(function (e) {
        $.post('./Ajax/checkTaiKhoan', {
            TaiKhoan: $("#TaiKhoan").val()
        }, function (result) {
            $("#loitaikhoan").html(result);
        },
            'text'
        );
    });
    //RESET LẠI BAN ĐẦU
    $("#MatKhau").click(function (e) {
        $("#LoiMatKhauKhongTrungNhau").html("");
        $("#NhapLaiMatKhau").val("");
    });
    //CHECK MẬT KHẨU TRÙNG NHAU
    $("#NhapLaiMatKhau").blur(function (e) {
        $.post('./Ajax/checkMatKhauKhongTrungNhau', {
            MatKhau: $("#MatKhau").val(),
            NhapLaiMatKhau: $("#NhapLaiMatKhau").val()
        }, function (result) {
            $("#LoiMatKhauKhongTrungNhau").html(result);
        },
            'text'
        );
    });
    //CHECK SỐ ĐIỆN THOẠI TỒN TẠI
    $("#SDT").blur(function (e) {
        $.post('./Ajax/checkSDT', {
            SDT: $("#SDT").val()
        }, function (result) {
            $("#loiSDT").html(result);
        },
            'text'
        );
    });
    //CHECK EMAIL TỒN TẠI
    //=========================================================================================================
    $("#Email").blur(function (e) {
        $.post('./Ajax/checkEmail', {
            Email: $("#Email").val()
        }, function (result) {
            $("#loiEmail").html(result);
        },
            'text'
        );
    });
    //CHI TIẾT SÁCH - BÌNH LUẬN SÁCH
    $("#btnGuiBinhLuan").click(function (e) {
        $.post('./Ajax/KhanhHangBinhLuan', {
            NoiDungBinhLuan: $("#TextBinhLuan").val(),
            MaSach: $("#MaSach").val(),
        }, function (result) {
            $("#divNoiDungBinhLuan").html(result);
            $("#TextBinhLuan").val("");
            // tăng lượt bình luận lên 1 đơn vị
            SoLuotBinhLuan = Number($("#getLuotBinhLuan").val()) + 1;
            $("#SoLuotBinhLuanSach").html("Có " + SoLuotBinhLuan + " Bình luận");
            $('#badge-hearder-cart').html(SoLuotBinhLuan);

        },
            'text'
        );
    });
    //CHI TIẾT SÁCH - ĐÁNH GIÁ SÁCH
    $("#btnGuiDanhGia").click(function (e) {
        $.post('./Ajax/KhachHangDanhGia', {
            NoiDungDanhGia: $("#TextDanhGia").val(),
            MaSach: $("#MaSach").val(),
            VoteStar: $('input[name="rating"]:checked').val()
        }, function (result) {
             $("#divNoiDungDanhGia").html(result);
        },
            'text'
        );
    });
    //THÊM VÀO GIỎ HÀNG
    $("#bntThemVaoGioHang").click(function (e) {
        $.post('./Ajax/ThemVaoGioHang', {
            MaSach: $("#MaSach").val(),
        }, function (result) {
            if ($.trim(result) == 'true') {
                SoLuongTrongGioHang = Number($("#get--badge_giohang").val()) + 1;
                $("#badge_giohang").html(SoLuongTrongGioHang);
                $("#badge-hearder-cart").html(SoLuongTrongGioHang);
                $("#get--badge_giohang").val(SoLuongTrongGioHang);
                alert("Thêm Thành Công!");
            }else{
                alert("Đã có trong giỏ hàng của bạn");
            }
        },
            'text'
        );
    });
    //CHECKBOX GIỎ HÀNG
    $(":input").on('click keyup', function (e) {
        var MaSach = new Array();
        var MaSachvaSoLuong = new Array();
        MaSachvaSoLuong["MaSach"] = new Array();
        MaSachvaSoLuong["SoLuong"] = new Array();
        var KetQua = new Array();
        KetQua["MaSach"] = new Array();
        KetQua["SoLuong"] = new Array();
        //Push vào mảng
        $(':input[name="BookCart"]:checked').each(function (i, v) {
            MaSach.push($(v).attr('MaSach'));
        });
        $(':input[class="form-control text-left"]').each(function (i, v) {
            MaSachvaSoLuong["MaSach"].push($(v).attr('masach'));
            MaSachvaSoLuong["SoLuong"].push($(v).val());
        });
        // sắp xếp mảng lại để mã sách và số lượng tương ứng nhau
        for (var i = 0; i <= MaSach.length - 1; i++) {
            for (var j = 0; j <= MaSachvaSoLuong["MaSach"].length - 1; j++) {
                if (MaSachvaSoLuong["MaSach"][j] == MaSach[i]) {
                    KetQua["MaSach"][i] = MaSach[i];
                    KetQua["SoLuong"][i] = MaSachvaSoLuong["SoLuong"][j];
                }
            }
        }
        console.log(KetQua);//debug
        $.post('./Ajax/ThongTinDonHang', {
            MaSach: JSON.stringify(KetQua["MaSach"]),//truyền mảng sang php
            SoLuong: JSON.stringify(KetQua["SoLuong"])
        }, function (result) {
            $("#ThongTinDonHang").html(result);
        },
            'text'
        );
    });
})
//CHECKBOX GIỎ HÀNG
function CheckAll(Array) {
    if ($('#checked_all').is(":checked")) {
        Array.forEach(Check);
        function Check(item) {
            $("#CheckBoxCart" + item).prop("checked", true)//bật 
        }
    } else {
        Array.forEach(UnCheck);
        function UnCheck(item) {
            $("#CheckBoxCart" + item).prop("checked", false)//bật 
        }
    }
}
//PHÂN TRANG SÁCH THEO THỂ LOẠI
function PhanTrang(MaTheLoai, Trang, TongSoTrang) {
    $.post('./Ajax/PhanTrangSachTheoTheLoai', {
        MaTheLoai: MaTheLoai,
        Trang: Trang,
        TongSoTrang: TongSoTrang
    }, function (result) {
        $("#phantrangtheotheloai").html(result);
    },
        'text'
    );
}
// PHÂN TRANG FLASHSALE
function PhanTrangFS(Trang) {
    $.post('./Ajax/PhanTrangFS', {
        Trang: Trang
    }, function (result) {
        $("#PhanTrangSachFS").html(result);
    },
        'text'
    );
}
// SÁCH THEO THỂ LOẠI- SÁCH NỔI BẬT
function Loadsachnoibat(Trangnoibat) {
    $.post('./Ajax/PhanTrangNoiBat', {
        Trangnoibat: Trangnoibat
    }, function (result) {
        Trangnoibat = Trangnoibat + 1;
        $("#xemthemsachnoibat").attr("onclick", "Loadsachnoibat(" + Trangnoibat + ")");
        $("#sachnoibat").append(result);
    },
        'text'
    );
}
// TRANG CHỦ - SÁCH NỔI BẬT
function TrangChu_Loadsachnoibat(Trangnoibat) {
    $.post('./Ajax/TrangChu_PhanTrangNoiBat', {
        Trangnoibat: Trangnoibat
    }, function (result) {
        Trangnoibat = Trangnoibat + 1;
        $("#trangchu_xemthemsachnoibat").attr("onclick", "TrangChu_Loadsachnoibat(" + Trangnoibat + ")");
        $("#Trangchu_sachnoibat").append(result);
    },
        'text'
    );
}
// TRANG CHỦ - MUA NHIỀU
function TrangChu_LoadSachMuaNhieu(TrangMuaNhieu) {
    $.post('./Ajax/TrangChu_PhanTrangMuaNhieu', {
        TrangMuaNhieu: TrangMuaNhieu
    }, function (result) {
        TrangMuaNhieu = TrangMuaNhieu + 1;
        $("#trangchu_xemthemsachmuanhieu").attr("onclick", "TrangChu_LoadSachMuaNhieu(" + TrangMuaNhieu + ")");
        $("#Trangchu_sachmuanhieu").append(result);
    },
        'text'
    );
}
// GIỎ HÀNG - LOAD ĐƠN HÀNG
//option 1 là load all đơn hàng,option 2 load một quyển để thu gọn, phục vụ cho việc mở rộng và thu gọn
function GioHang_LoadDonHang(MaDH,Option) {
    $.post('./Ajax/GioHang_LoadDonHang', {
        MaDH: MaDH,
        Option: Option
    }, function (result) {
        if (Option == 1){
            Option = 2;
            $("#MoRong_ThuGon"+ MaDH).html("<span>Thu Gọn</span>");
        }else{
            Option = 1;
            $("#MoRong_ThuGon"+ MaDH).html("<span>Xem Tất cá về đơn hàng</span>");
        }
        $("#MoRong_ThuGon"+ MaDH).attr("onclick", "GioHang_LoadDonHang("+ MaDH+","+Option+")");
        $("#DonHang"+ MaDH).html(result);
    },
        'text'
    );
}