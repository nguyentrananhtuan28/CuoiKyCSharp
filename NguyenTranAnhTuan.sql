create database NguyenTranAnhTuanDB
GO
use NguyenTranAnhTuanDB
GO
create table UserAccount(
	ID			int not null identity(1,1) ,		
	UserName	varchar(100) not null primary key,
	PassWord	varchar(100) not null,
	Status		varchar(50) not null
)
GO
insert into UserAccount values
('admin','21232f297a57a5a743894a0e4a801fc3','Active'),
('tuan','tuan','Blocked'),
('abc','abc','Blocked'),
('tuan1','tuan1','Blocked'),
('tuan2','tuan1','Blocked'),
('tuan3','tuan1','Blocked'),
('tuan4','tuan1','Blocked'),
('tuan28','tuan28','Active');
GO
create table Category(
	ID			int not null identity(1,1) primary key,
	Name		nvarchar(300) not null,
	Description	nvarchar(2500) not null
)
GO
insert into Category values
(N'Ađias',N'adidas là thương hiệu chuyên sản xuất các sản phẩm thời trang, thiết bị, dụng cụ thể thao đến từ Đức. Ngoài ra, adidas còn là nhà sản xuất sản phẩm thể thao lớn thứ hai thế giới, được thành lập và điều hành bởi Kasper Rorsted vào năm 1924 với tên ban đầu là Gebruder Dassler Schuhfabrik, là một thành viên của tập đoàn adidas Group.'),
(N'HoKa',N'Hoka là thương hiệu giày thể thao đến từ Pháp, là một trong những công ty giày chạy bộ có sự phát triển nhanh nhất trên thế giới. Tại sao? Bởi vì giày của Hoka cho phép đôi chân của bạn di chuyển với sự thoải mái tối đa. Chúng nhẹ một cách đáng ngạc nhiên. Lớp đệm nâng cao và đế giữa được thiết kế tỉ mỉ mang đến những trải nghiệm độc đáo: êm ái, mềm mại và hiệu quả.'),
(N'Harbinger®',N'Được sáng lập năm 1988 bởi một doanh nhân đam mê fitness David McCrane, Harbinger® nhanh chóng trở thành thương hiệu được những người tập luyện và các huấn luyện viên trên toàn thế giới lựa chọn. Harbinger® đã hợp tác với Lee Haney, vân động viên thể hình chuyên nghiệp 8 lần đoạt danh hiệu Mr. Olympia.'),
(N'Skechers',N'Là thương hiệu toàn cầu tỉ đô với nhiều giải thưởng, Skechers thiết kế và phát triển những sản phẩm dành cho cuộc sống hằng ngày và tập luyện, nổi tiếng với phong cách thời trang, sáng tạo, chất lượng và thoải mái.');
GO
create table Product(
	ID			int not null identity(1,1) primary key,
	Name		nvarchar(100) not null,
	UnitCost	money	not null,
	Quantity	int	not null,
	Image		varchar(500) not null,
	Description	nvarchar(3000) not null,
	Status		bit not null,
	CategoryID	int foreign key references Category(ID)
)
GO
insert into Product values
(N'Giày Thể Thao Nam Adidas Ultraboost 21 Primeblue',223000,45,'https://cdn.shopify.com/s/files/1/0456/5070/6581/products/FX7729-1_360x.jpg?v=1616578607',N'Khi chúng tôi ra mắt đôi adidas Ultraboost đầu tiên, chúng là đôi giày chạy bộ tốt nhất mà chúng tôi từng làm. Với mỗi bản cập nhật mới, chúng tôi đã nâng cao tiêu chuẩn. Và bây giờ bạn đã có được chiếc đệm với khả năng hoàn trả năng lượng mà bạn hằng mong muốn.',1,1),
(N'Giày Thể Thao Nữ Adidas Stan Smith',2000,23,'https://cdn.shopify.com/s/files/1/0456/5070/6581/products/FZ2714-1_360x.jpg?v=1615271449',N'Khi chúng tôi ra mắt đôi adidas Ultraboost đầu tiên, chúng là đôi giày chạy bộ tốt nhất mà chúng tôi từng làm. Với mỗi bản cập nhật mới, chúng tôi đã nâng cao tiêu chuẩn. Và bây giờ bạn đã có được chiếc đệm với khả năng hoàn trả năng lượng mà bạn hằng mong muốn.',1,1),
(N'Giày Thể Thao Nam Adidas Superstar Primeblue',25000,12,'https://cdn.shopify.com/s/files/1/0456/5070/6581/products/G58198-1_360x.jpg?v=1615271450',N'Đôi giày này không theo bất kỳ khuôn khổ nào. Nó là của bạn. Và thế giới đang đón chờ nó. Hãy luôn là BẠN hôm nay, ngày mai và mỗi ngày. Thể hiện bản thân cùng giày adidas Continental 80.',1,1),
(N'Giày Thể Thao Trẻ Em Adidas Ny 90',321000,31,'https://cdn.shopify.com/s/files/1/0456/5070/6581/products/FX6473-1_300x300.jpg?v=1615271441',N'Tươi tắn, sắc nét, vượt thời gian. Luôn luôn có một vị trí cho những đôi giày cổ điển. Nhưng đã đến lúc bước vào thế kỷ 21. Những đôi giày thể thao của thế hệ trước này có nhiều điểm tiến bộ với vật liệu tái chế như một phần của mục tiêu giúp chấm dứt rác thải nhựa của adidas.',1,1);

