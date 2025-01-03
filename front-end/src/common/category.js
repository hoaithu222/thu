const categories = [
    {
        name: "Thời trang Nam",
        subcategories: [
            "Áo thun",
            "Áo polo",
            "Áo khoác",
            "Quần jeans",
            "Quần short",
            "Bộ vest"
        ]
    },
    {
        name: "Điện thoại & Phụ kiện",
        subcategories: [
            "Điện thoại thông minh",
            "Ốp lưng",
            "Miếng dán màn hình",
            "Pin sạc dự phòng",
            "Tai nghe",
            "Bộ sạc"
        ]
    },
    {
        name: "Thiết bị điện tử",
        subcategories: [
            "Tivi",
            "Loa",
            "Hệ thống âm thanh gia đình",
            "Thiết bị thông minh",
            "Máy chơi game"
        ]
    },
    {
        name: "Máy tính & Laptop",
        subcategories: [
            "Laptop gaming",
            "Ultrabook",
            "Máy tính để bàn",
            "Phụ kiện máy tính",
            "Màn hình",
            "Bộ nhớ ngoài"
        ]
    },
    {
        name: "Máy ảnh & Nhiếp ảnh",
        subcategories: [
            "Máy ảnh DSLR",
            "Máy ảnh mirrorless",
            "Ống kính máy ảnh",
            "Phụ kiện máy ảnh",
            "Chân máy",
            "Máy ảnh hành động"
        ]
    },
    {
        name: "Đồng hồ",
        subcategories: ["Đồng hồ nam", "Đồng hồ nữ", "Đồng hồ thông minh", "Đồng hồ cao cấp"]
    },
    {
        name: "Giày Nam",
        subcategories: ["Giày tây", "Giày casual", "Giày thể thao", "Dép", "Boots"]
    },
    {
        name: "Đồ gia dụng",
        subcategories: [
            "Tủ lạnh",
            "Máy giặt",
            "Lò vi sóng",
            "Ấm điện",
            "Máy hút bụi",
            "Máy lọc không khí"
        ]
    },
    {
        name: "Thể thao & Du lịch",
        subcategories: ["Dụng cụ bóng đá", "Đồ cắm trại", "Túi du lịch", "Dụng cụ tập gym", "Xe đạp"]
    },
    {
        name: "Ô tô & Xe máy",
        subcategories: ["Xe máy", "Mũ bảo hiểm", "Phụ kiện ô tô", "Phụ kiện xe máy", "Phụ tùng"]
    },
    {
        name: "Thời trang Nữ",
        subcategories: ["Đầm", "Áo", "Chân váy", "Quần", "Áo khoác", "Trang phục truyền thống"]
    },
    {
        name: "Mẹ & Bé",
        subcategories: ["Quần áo trẻ em", "Xe đẩy", "Bình sữa", "Tã", "Thời trang bà bầu"]
    },
    {
        name: "Nhà cửa & Đời sống",
        subcategories: ["Nội thất", "Dụng cụ nhà bếp", "Đèn", "Bộ chăn ga gối", "Giải pháp lưu trữ"]
    },
    {
        name: "Làm đẹp & Trang điểm",
        subcategories: ["Son môi", "Kem nền", "Kẻ mắt", "Cọ trang điểm", "Nước hoa"]
    },
    {
        name: "Sức khỏe & Thể chất",
        subcategories: ["Vitamin", "Thực phẩm bổ sung", "Thiết bị y tế", "Chăm sóc cá nhân", "Khẩu trang & Nước rửa tay"]
    },
    {
        name: "Giày Nữ",
        subcategories: ["Giày cao gót", "Giày bệt", "Giày thể thao", "Boots", "Dép"]
    },
    {
        name: "Túi xách & Ví",
        subcategories: ["Túi xách tay", "Túi đeo vai", "Ví cầm tay", "Ba lô", "Túi du lịch"]
    },
    {
        name: "Trang sức & Phụ kiện",
        subcategories: ["Dây chuyền", "Bông tai", "Vòng tay", "Đồng hồ", "Nhẫn"]
    },
    {
        name: "Hàng tiêu dùng trực tuyến",
        subcategories: ["Rau củ tươi", "Đồ ăn vặt", "Đồ uống", "Thực phẩm đóng gói", "Đồ dùng gia đình"]
    },
    {
        name: "Hiệu sách trực tuyến",
        subcategories: ["Tiểu thuyết", "Sách kỹ năng", "Sách học thuật", "Sách thiếu nhi", "Sách điện tử"]
    },
    {
        name: "Túi xách & Ví Nam",
        subcategories: ["Ba lô", "Túi đeo chéo", "Ví", "Túi đựng laptop", "Túi du lịch"]
    },
    {
        name: "Đồ chơi",
        subcategories: [
            "Mô hình hành động",
            "Búp bê",
            "Trò chơi bàn cờ",
            "Đồ chơi ghép hình",
            "Đồ chơi giáo dục",
            "Đồ chơi điều khiển từ xa"
        ]
    },
    {
        name: "Chăm sóc thú cưng",
        subcategories: ["Thức ăn cho thú cưng", "Đồ chơi cho thú cưng", "Dụng cụ chăm sóc", "Giường thú cưng", "Sản phẩm chăm sóc sức khỏe"]
    },
    {
        name: "Dụng cụ & Tiện ích",
        subcategories: ["Dụng cụ cầm tay", "Dụng cụ điện", "Dụng cụ làm vườn", "Bộ dụng cụ", "Dụng cụ đo lường"]
    },
    {
        name: "Thời trang Trẻ em",
        subcategories: [
            "Quần áo bé trai",
            "Quần áo bé gái",
            "Quần áo trẻ sơ sinh",
            "Áo khoác trẻ em",
            "Đồng phục học sinh"
        ]
    },
    {
        name: "Giặt giũ & Chăm sóc nhà cửa",
        subcategories: ["Bột giặt", "Dụng cụ vệ sinh", "Tinh dầu thơm", "Cây lau nhà", "Giỏ đựng đồ"]
    },
    {
        name: "Phiếu mua hàng & Dịch vụ",
        subcategories: ["Phiếu ăn uống", "Phiếu spa & làm đẹp", "Phiếu du lịch", "Vé sự kiện", "Thẻ quà tặng"]
    }
];

export default categories;
