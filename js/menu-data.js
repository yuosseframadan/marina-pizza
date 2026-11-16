/* بيانات منيو مارينا بيتزا. عدّل الأسعار والأصناف وأرقام التليفون من هنا فقط. */
window.MARINA = {
  config: {
    orderPhone: "01033334067",        // رقم الطلبات (واتساب + مكالمات)
    orderWa: "201033334067",          // نفس الرقم بصيغة دولية بدون + أو صفر
    complaintPhone: "01202224612",    // رقم الشكاوى والاستفسارات (واتساب)
    complaintWa: "201202224612",
    facebook: "https://www.facebook.com/Fatatri.Marina?locale=ar_AR",
    designer: { name: "nexcode", url: "https://mute-mouse-67d8.yousseframadan2211.workers.dev/" },
    comboPrice: 50,                   // التحويل إلى كومبو (بطاطس + كولا)
    currency: "ج"
  },
  branches: [
    { id: "baltim", name: "بلطيم", address: "طريق بلطيم–الحامول، أمام المركز الطبي، بجوار التأمينات الاجتماعية." },
    { id: "marina", name: "مارينا دلتا", address: "الطريق الدولي الساحلي، قرية مارينا دلتا، بجوار كارفور." }
  ],
  // الأحجام بالترتيب: صغير، وسط، كبير. null يعني الحجم غير متاح.
  sections: [
    {
      id: "pizza", title: "البيتزا الإيطالي", slogan: "كل قطعة حكاية", short: "بيتزا", type: "cards",
      items: [
        { name: "مارجريتا", img: "assets/pizza/margherita.jpg", sizes: [110, 150, 190] },
        { name: "تركي مدخن", img: "assets/pizza/smoked_turkey.jpg", sizes: [140, 185, 260] },
        { name: "سوبريم دجاج", img: "assets/pizza/chicken_supreme.jpg", sizes: [150, 190, 270] },
        { name: "خضروات", img: "assets/pizza/veg.jpg", sizes: [125, 160, 210] },
        { name: "تكساس برجر", img: "assets/pizza/texas.jpg", sizes: [155, 195, 270] },
        { name: "تونة", img: "assets/pizza/tuna.jpg", sizes: [null, 185, 260] },
        { name: "ميكس تشيز", img: "assets/pizza/mix_cheese.jpg", sizes: [110, 150, 190] },
        { name: "سوبر سوبريم", img: "assets/pizza/super_supreme.jpg", sizes: [160, 210, 280] },
        { name: "جمبري", img: "assets/pizza/shrimp.jpg", sizes: [null, 320, 420] },
        { name: "مفروم", img: "assets/pizza/minced.jpg", sizes: [140, 185, 260] },
        { name: "ميت لافرز", img: "assets/pizza/meat_lovers.jpg", sizes: [160, 210, 280] },
        { name: "سي فود", img: "assets/pizza/seafood.jpg", sizes: [null, 350, 450] },
        { name: "سجق", img: "assets/pizza/sausage_sujuk.jpg", sizes: [135, 180, 250] },
        { name: "فراخ", img: "assets/pizza/chicken.jpg", sizes: [135, 180, 250] },
        { name: "سي فود رانش", img: "assets/pizza/seafood_ranch.jpg", sizes: [null, 370, 480] },
        { name: "بسطرمة", img: "assets/pizza/pastrami.jpg", sizes: [140, 185, 260] },
        { name: "كرانشي", img: "assets/pizza/crunchy.jpg", sizes: [140, 185, 260] },
        { name: "هوت دوج", img: "assets/pizza/hotdog.jpg", sizes: [130, 175, 250] },
        { name: "تشيكن رانش", img: "assets/pizza/chicken_ranch.jpg", sizes: [150, 190, 270] },
        { name: "بيبروني", img: "assets/pizza/pepperoni.jpg", sizes: [140, 185, 260] },
        { name: "تشيكن باربكيو", img: "assets/pizza/chicken_bbq.jpg", sizes: [140, 185, 260] },
        { name: "سلامي", img: "assets/pizza/salami.jpg", sizes: [140, 185, 260] },
        { name: "كوردن بلو", img: "assets/pizza/cordon.jpg", sizes: [145, 185, 265] },
        { name: "سوسيس", img: "assets/pizza/sausage.jpg", sizes: [130, 175, 250], tag: "كمّلها على مزاجك" }
      ]
    },
    {
      id: "sharqi", title: "الفطير الشرقي", slogan: "فطيرة واحدة تشبع العيلة كلها", short: "فطير شرقي", type: "grouped", image: "assets/fatir.jpg",
      groups: [
        {
          title: "جبن وخضروات",
          items: [
          { name: "رومي سادة", sizes: [160, 200, 240] },
          { name: "رومي خضار", sizes: [170, 215, 260] },
          { name: "ميكس جبن", sizes: [180, 230, 290] },
          { name: "مشروم", sizes: [180, 230, 290] }
          ]
        },
        {
          title: "لحوم",
          items: [
          { name: "لحم سادة فلاحي", sizes: [180, 240, 295] },
          { name: "لحم مفروم بلدي", sizes: [190, 250, 330] },
          { name: "سجق بلدي", sizes: [185, 245, 320] },
          { name: "سجق كيري", sizes: [195, 270, 345] },
          { name: "بسطرمة", sizes: [190, 250, 330] },
          { name: "بسطرمة كيري", sizes: [200, 275, 350] },
          { name: "سجق بسطرمة كيري", sizes: [215, 295, 390] },
          { name: "سوسيس", sizes: [180, 230, 290] },
          { name: "كفتة فحم", sizes: [210, 290, 380] },
          { name: "تكساس برجر", sizes: [210, 290, 380] },
          { name: "مشكل لحوم", sizes: [215, 295, 390] },
          { name: "فطيرة مارينا", sizes: [230, 330, 420] }
          ]
        },
        {
          title: "فراخ",
          items: [
          { name: "فراخ", sizes: [185, 245, 320] },
          { name: "ستربس", sizes: [190, 250, 330] },
          { name: "كوردن بلو", sizes: [195, 270, 350] },
          { name: "تشيكن رانش", sizes: [200, 275, 360] },
          { name: "تشيكن باربكيو", sizes: [195, 270, 350] },
          { name: "مشكل فراخ", sizes: [195, 270, 355] },
          { name: "فراخ بسطرمة كيري", sizes: [210, 290, 380] }
          ]
        },
        {
          title: "مدخنات",
          items: [
          { name: "تركي مدخن", sizes: [185, 240, 320] },
          { name: "ميكس مدخنات", sizes: [215, 295, 390] }
          ]
        },
        {
          title: "تونة وسي فود",
          items: [
          { name: "تونة", sizes: [190, 250, 330] },
          { name: "جمبري بلتندي", sizes: [null, 380, 480] },
          { name: "سي فود", sizes: [null, 400, 500] },
          { name: "سي فود رانش", sizes: [null, 420, 540] }
          ]
        }
      ]
    },
    {
      id: "crepe", title: "الكريب", slogan: "الجوع ملوش كبير، اطلب اللي يسد معاك", short: "كريب", type: "list", combo: true,
      items: [
        { name: "بطاطس", price: 75 },
        { name: "ميكس جبن", price: 135 },
        { name: "ميكس مدخنات", price: 150 },
        { name: "بانيه", price: 125 },
        { name: "ستربس", price: 135 },
        { name: "زنجر حار", price: 140 },
        { name: "كرسبي", price: 140 },
        { name: "شيش", price: 145 },
        { name: "فاهيتا", price: 150 },
        { name: "تشيكن رانش", price: 145 },
        { name: "تشيكن باربكيو", price: 145 },
        { name: "كوردن بلو", price: 150 },
        { name: "ميكس فراخ", price: 145 },
        { name: "سوسيس", price: 125 },
        { name: "سجق", price: 135 },
        { name: "مفروم", price: 140 },
        { name: "كفتة", price: 150 },
        { name: "برجر", price: 150 },
        { name: "مشكل لحوم", price: 150 },
        { name: "إسكالوب", price: 150 },
        { name: "الملوك", price: 160, detail: "شيش طاووق + ستربس كرانشي + كوردن بلو محشي جبنة" },
        { name: "الروقان", price: 160, detail: "بانيه طرك + زنجر سبايسي + رومي مدخن" },
        { name: "المكسيكي", price: 150, detail: "كرسبي مقرمش + شيش طاووق + فاهيتا متبلة" },
        { name: "الباشا", price: 160, detail: "فاهيتا + كوردن بلو + تركي مدخن" },
        { name: "ديناميت", price: 150, detail: "زنجر + ستربس + كوردن بلو" },
        { name: "مارينا", price: 165, detail: "سلامي + شيش + ستربس + كرسبي" },
        { name: "الهضبة", price: 150, detail: "كفتة + سوسيس + لحم بقري" },
        { name: "المدبح", price: 160, detail: "برجر + سجق + كفتة" },
        { name: "الجحيم", price: 150, detail: "سوسيس + سجق + برجر" },
        { name: "لهاليبو الاكيل", price: 160, detail: "برجر + شيش + كرسبي + لحم بقري" }
      ]
    },
    {
      id: "roll", title: "رول الفطير", slogan: "صاروخ يقفل الجوع", short: "رول", type: "list", combo: true,
      items: [
        { name: "ميكس جبن", price: 140 },
        { name: "مشروم", price: 125 },
        { name: "لحم مفروم بلدي", price: 150 },
        { name: "سجق بلدي", price: 150 },
        { name: "سجق كيري", price: 160 },
        { name: "بسطرمة", price: 160 },
        { name: "بسطرمة كيري", price: 170 },
        { name: "سجق بسطرمة كيري", price: 175 },
        { name: "سوسيس", price: 130 },
        { name: "كفتة فحم", price: 170 },
        { name: "مشكل لحوم", price: 160 },
        { name: "فراخ", price: 140 },
        { name: "ستربس", price: 145 },
        { name: "كوردن بلو", price: 150 },
        { name: "تشيكن رانش", price: 150 },
        { name: "تشيكن باربكيو", price: 150 },
        { name: "مشكل فراخ", price: 150 },
        { name: "فراخ بسطرمة كيري", price: 165 },
        { name: "تركي مدخن", price: 145 },
        { name: "ميكس مدخنات", price: 160, detail: "سلامي + بيبروني + تركي مدخن + هوت دوج" },
        { name: "صاروخ مارينا", price: 185, detail: "لحمة - سجق - بسطرمة - ميكس جبن - مشروم - فلفل ألوان - جبنة كيري" }
      ]
    },
    {
      id: "calzone", title: "الكالزوني", slogan: "مقفول على حشوة تقيلة", short: "كالزوني", type: "list", combo: true,
      items: [
        { name: "سجق", price: 135 },
        { name: "بيبروني", price: 140 },
        { name: "فراخ", price: 135 },
        { name: "سوبريم دجاج", price: 150 },
        { name: "سوبر سوبريم", price: 160 },
        { name: "ميت لافرز «عشاق اللحوم»", price: 160 }
      ]
    },
    {
      id: "sweet", title: "الفطير الحلو", slogan: "", short: "فطير حلو", type: "grouped",
      groups: [
        {
          title: "",
          items: [
            { name: "حلو ملوكي", sizes: [120, 150, 180] },
            { name: "كريمة مكسرات", sizes: [180, 240, 290] },
            { name: "بسبوسة قشطة", sizes: [180, 250, 290] },
            { name: "نوتيلا مكسرات", sizes: [190, 260, 320] },
            { name: "لوتس", sizes: [190, 260, 320] },
            { name: "أوريو", sizes: [190, 260, 320] },
            { name: "كندر", sizes: [200, 280, 370] },
            { name: "فورسيزون", sizes: [null, 280, 370], detail: "نوتيلا + لوتس + كندر + أوريو" },
            { name: "بستاشيو", sizes: [250, 320, 400] },
            { name: "جراند ميكس", sizes: [null, 295, 390], detail: "مكسرات + فستق + نوتيلا + فاكهة" },
            { name: "رفايلو", sizes: [190, 260, 320] },
            { name: "الشهد الملكي", sizes: [220, 270, 340], detail: "بلح + بسبوسة + قشطة + عين جمل + قرفة" },
            { name: "بلح بالقشطة", sizes: [180, 250, 290] },
            { name: "مانجو / فراولة (موسمي)", sizes: [null, 250, 350] },
            { name: "فطيرة مشلتت بالسمن البلدي", sizes: [null, 170, 225] }
          ]
        },
        {
          title: "البغاشة", short: "", layout: "list",
          items: [
            { name: "بغاشة", price: 90 },
            { name: "بغاشة كريمة", price: 100 },
            { name: "بغاشة كاستر", price: 120 },
            { name: "بغاشة قشطة وعسل", price: 150 }
          ]
        }
      ]
    },
    {
      id: "extras", title: "الإضافات", slogan: "", short: "إضافة", type: "extras",
      items: [
        { name: "موزاريلا", prices: [20, 35] },
        { name: "رومي", prices: [25, 40] },
        { name: "كيري", prices: [20] },
        { name: "باكت بطاطس بهارات", prices: [40] },
        { name: "باكت بطاطس فريسكاس", prices: [60] },
        { name: "باكت بطاطس شيدر", prices: [60] },
        { name: "لحوم", prices: [40], detail: "لحم - سجق - سوسيس - فراخ - استربس - كفتة - برجر - بسطرمة - سلامي - بيبروني - تركي مدخن" },
        { name: "مكسرات", prices: [35, 60] },
        { name: "صوص ريمكل", prices: [25, 40] },
        { name: "صوص", prices: [25, 40], detail: "رانش - باربكيو - شيدر - تكساس - سويت شيلي - مايونيز" },
        { name: "مياه معدنية", prices: [10] },
        { name: "كولا", prices: [20] },
        { name: "سفن", prices: [20] },
        { name: "مياه غازية 1 لتر", prices: [40] }
      ]
    }
  ]
};
