import { User02, File06 } from "@untitled-ui/icons-react"

export const bothMenus = [
  {
    title:'บัญชีของฉัน',
    link:'#',
    icon:<User02 />,
    submenu: [
      {
        title:'โปรไฟล์ของฉัน',
        link:'/my-account'
      },
      {
        title:'การชำระเงิน',
        link:'/payment'
      },
      {
        title:'ที่อยู่ในการจัดส่ง',
        link:'/shipping-address'
      },
      {
        title:'สินค้าที่ดูล่าสุด',
        link:'/viewed-products'
      }
    ]
  },
  {
    title:'คำสั่งซื้อของฉัน',
    link:'/my-order',
    icon:<File06 />,
    submenu: [
      {
        title:'ประวัติการสั่งซื้อ',
        link:'#'
      }
    ]
  },
  {
    title:'คูปองของฉัน',
    link:'#',
    icon:<User02 />,
    submenu: [
      {
        title:'คูปองทั้งหมด',
        link:'/my-coupon'
      },
      {
        title:'ID ของฉัน',
        link:'/my-id'
      }
    ]
  },
  {
    title:'สะสมแต้ม',
    link:'#',
    icon:<User02 />,
    submenu: [
      {
        title:'เงื่อนไขการรับคะแนน',
        link:'#'
      },
      {
        title:'เงื่อนไขระดับสมาชิก',
        link:'#'
      },
      {
        title:'วิธีการแลกของรางวัล',
        link:'#'
      },
      {
        title:'ประวัติการใช้คะแนน',
        link:'#'
      }
    ]
  }
]

export const pointsMenus = [
  {
    title:'บัญชีของฉัน',
    link:'#',
    icon:<User02 />,
    submenu: [
      {
        title:'แก้ไขโปรไฟล์ของฉัน',
        link:'/my-account'
      },
      {
        title:'ที่อยู่ในการจัดส่ง',
        link:'/shipping-address'
      },
      {
        title:'สินค้าที่ดูล่าสุด',
        link:'/viewed-products'
      },
      {
        title:'การชำระเงิน',
        link:'/payment'
      },
    ]
  },
  {
    title:'คูปองของฉัน',
    link:'#',
    icon:<User02 />,
    submenu: [
      {
        title:'คูปองทั้งหมด',
        link:'/my-coupon'
      },
      {
        title:'ID ของฉัน',
        link:'/my-id'
      }
    ]
  },
  {
    title:'สะสมแต้ม',
    link:'#',
    icon:<User02 />,
    submenu: [
      {
        title:'เงื่อนไขการรับคะแนน',
        link:'#'
      },
      {
        title:'เงื่อนไขระดับสมาชิก',
        link:'#'
      },
      {
        title:'วิธีการแลกของรางวัล',
        link:'#'
      },
      {
        title:'ประวัติการใช้คะแนน',
        link:'#'
      }
    ]
  }
]