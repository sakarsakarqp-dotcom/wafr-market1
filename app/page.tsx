TypeScript

"use client";

import { useMemo, useState } from "react";

const categories = [
  { name: "كل السوق", icon: "🛍️" },
  { name: "البيع والشراء", icon: "🔄" },
  { name: "الأجهزة والكهربائيات", icon: "📱" },
  { name: "قطع التبديل", icon: "⚙️" },
  { name: "الطعام والتوصيل", icon: "🍔" },
  { name: "الهدايا والطلبات الخاصة", icon: "🎁" },
  { name: "الخدمات", icon: "🛠️" },
  { name: "مواد البناء والإكساء", icon: "🧱" },
];

const initialProducts = [
  {
    id: 1,
    name: "هاتف سامسونغ مستعمل",
    category: "الأجهزة والكهربائيات",
    price: 1500000,
    icon: "📱",
    description: "هاتف بحالة جيدة وجاهز للاستخدام",
    location: "حماة",
  },
  {
    id: 2,
    name: "غسالة أوتوماتيك",
    category: "البيع والشراء",
    price: 2200000,
    icon: "🧺",
    description: "غسالة مستعملة بحالة ممتازة",
    location: "جسر الشغور",
  },
  {
    id: 3,
    name: "قطع تبديل سيارات",
    category: "قطع التبديل",
    price: 250000,
    icon: "⚙️",
    description: "قطع تبديل لعدة أنواع من السيارات",
    location: "إدلب",
  },
  {
    id: 4,
    name: "وجبة شاورما",
    category: "الطعام والتوصيل",
    price: 35000,
    icon: "🌯",
    description: "وجبة طازجة مع إمكانية التوصيل",
    location: "جسر الشغور",
  },
  {
    id: 5,
    name: "باقة ورد وهدايا",
    category: "الهدايا والطلبات الخاصة",
    price: 120000,
    icon: "💐",
    description: "هدايا مناسبة للمناسبات والأعياد",
    location: "حماة",
  },
  {
    id: 6,
    name: "خدمات كهربائية",
    category: "الخدمات",
    price: 50000,
    icon: "🔌",
    description: "صيانة وتركيب التمديدات الكهربائية",
    location: "ريف حماة",
  },
  {
    id: 7,
    name: "مواد بناء وإكساء",
    category: "مواد البناء والإكساء",
    price: 180000,
    icon: "🧱",
    description: "مواد متنوعة لأعمال البناء والترميم",
    location: "سهل الغاب",
  },
  {
    id: 8,
    name: "سماعات لاسلكية",
    category: "الأجهزة والكهربائيات",
    price: 175000,
    icon: "🎧",
    description: "سماعات لاسلكية للاستخدام اليومي",
    location: "إدلب",
  },
];

const formatPrice = (price: number) =>
  new Intl.NumberFormat("ar-SY").format(price) + " ل.س";

export default function Page() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("كل السوق");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [cart, setCart] = useState<number[]>([]);
  const [showCart, setShowCart] = useState(false);

  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      const matchesCategory =
        selectedCategory === "كل السوق" ||
        product.category === selectedCategory;

      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase()) ||
        product.location.toLowerCase().includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [search, selectedCategory]);

  const toggleFavorite = (id: number) => {
    setFavorites((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  };

  const addToCart = (id: number) => {
    setCart((previous) => [...previous, id]);
  };

  const cartProducts = cart
    .map((id) => initialProducts.find((product) => product.id === id))
    .filter((product) => product !== undefined);

  const cartTotal = cartProducts.reduce(
    (total, product) => total + product.price,
    0
  );

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-slate-50 text-slate-900"
    >
      <header className="sticky top-0 z-50 border-b bg-white/95 shadow-sm backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">
          <a href="#" className="flex items-center gap-2">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-600 text-2xl text-white">
              و
            </span>
            <span>
              <span className="block text-2xl font-black text-emerald-700">
                وَفْر
              </span>
              <span className="text-xs text-slate-500">
                سوق واحد.. خيارات بلا حدود
              </span>
            </span>
          </a>

          <button
            onClick={() => setShowCart(!showCart)}
            className="rounded-xl bg-emerald-50 px-4 py-3 font-bold text-emerald-800 transition hover:bg-emerald-100"
          >
            🛒 السلة ({cart.length})
          </button>
        </div>
      </header>

      <section className="bg-gradient-to-bl from-emerald-950 via-emerald-800 to-teal-600 px-4 py-16 text-white md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <span className="mb-5 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm">
              أهلاً بك في وَفْر — تسوّق أذكى وخيارات أكثر
            </span>

            <h1 className="text-4xl font-black leading-tight md:text-6xl">
              كل ما تبحث عنه،
              <br />
              في مكان واحد.
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-emerald-50">
              اكتشف المنتجات والخدمات، اعرض ما تريد بيعه، وابحث عن احتياجاتك
              بسهولة من خلال سوق واحد يجمع الخيارات المتنوعة.
            </p>

            <a
              href="#market"
              className="mt-8 inline-flex rounded-xl bg-white px-7 py-4 font-black text-emerald-900 shadow-lg transition hover:bg-emerald-50"
            >
              اكتشف السوق ←
            </a>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              ["🛍️", "منتجات متنوعة"],
              ["🔎", "بحث سهل"],
              ["🛠️", "خدمات متعددة"],
              ["📍", "خيارات حسب المنطقة"],
            ].map(([icon, label]) => (
              <div
                key={label}
                className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur"
              >
                <span className="text-2xl">{icon}</span>
                <p className="mt-2 font-bold">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="market" className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-black">اكتشف السوق</h2>
          <p className="mt-2 text-slate-500">
            ابحث عن احتياجاتك واختر القسم المناسب.
          </p>
        </div>

        <div className="mb-8 flex flex-col gap-3 md:flex-row">
          <div className="relative flex-1">
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xl">
              🔎
            </span>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="ابحث عن منتج أو خدمة أو منطقة..."
              className="w-full rounded-2xl border border-slate-200 bg-white py-4 pr-12 pl-4 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
            />
          </div>

          <button
            onClick={() => {
              setSearch("");
              setSelectedCategory("كل السوق");
            }}
            className="rounded-2xl border border-slate-200 bg-white px-6 py-4 font-bold transition hover:bg-slate-100"
          >
            إعادة ضبط البحث
          </button>
        </div>

        <div className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className={`rounded-2xl border p-4 text-right transition hover:-translate-y-1 hover:shadow-md ${
                selectedCategory === category.name
                  ? "border-emerald-600 bg-emerald-50 ring-2 ring-emerald-100"
                  : "border-slate-200 bg-white"
              }`}
            >
              <span className="text-3xl">{category.icon}</span>
              <p className="mt-3 text-sm font-bold">{category.name}</p>
            </button>
          ))}
        </div>

        {showCart && (
          <section className="mb-10 rounded-3xl border border-emerald-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-xl font-black">🛒 سلة التسوق</h3>
              <button
                onClick={() => setShowCart(false)}
                className="rounded-lg px-3 py-2 text-slate-500 hover:bg-slate-100"
              >
                إغلاق ✕
              </button>
            </div>

            {cartProducts.length === 0 ? (
              <p className="mt-4 text-slate-500">
                سلتك فارغة حالياً. أضف المنتجات التي تريدها.
              </p>
            ) : (
              <>
                <div className="mt-4 space-y-3">
                  {cartProducts.map((product, index) => (
                    <div
                      key={`${product.id}-${index}`}
                      className="flex items-center justify-between gap-3 border-b py-3"
                    >
                      <span>
                        {product.icon} {product.name}
                      </span>
                      <span className="font-bold">
                        {formatPrice(product.price)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                  <p className="font-black">
                    المجموع: {formatPrice(cartTotal)}
                  </p>
                  <button
                    onClick={() =>
                      alert(
                        "هذه واجهة تجريبية. لم يتم ربط إتمام الطلبات بقاعدة بيانات بعد."
                      )
                    }
                    className="rounded-xl bg-emerald-600 px-6 py-3 font-bold text-white hover:bg-emerald-700"
                  >
                    متابعة الطلب
                  </button>
                </div>
              </>
            )}
          </section>
        )}

        <div className="mb-6 flex items-center justify-between gap-3">
          <div>
            <h3 className="text-2xl font-black">
              {selectedCategory === "كل السوق"
                ? "منتجات وخدمات مختارة"
                : selectedCategory}
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              عدد النتائج: {filteredProducts.length}
            </p>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-4 py-16 text-center">
            <span className="text-5xl">🔎</span>
            <h4 className="mt-4 text-xl font-black">
              لم نجد نتائج مطابقة
            </h4>
            <p className="mt-2 text-slate-500">
              جرّب كلمة بحث أخرى أو اختر قسماً مختلفاً.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <article
                key={product.id}
                className="group overflow-hidden rounded-3xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative flex h-48 items-center justify-center bg-gradient-to-br from-emerald-50 to-slate-100">
                  <span className="text-7xl transition duration-300 group-hover:scale-110">
                    {product.icon}
                  </span>

                  <button
                    onClick={() => toggleFavorite(product.id)}
                    aria-label="إضافة إلى المفضلة"
                    className="absolute left-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl shadow-sm transition hover:scale-110"
                  >
                    {favorites.includes(product.id) ? "❤️" : "🤍"}
                  </button>

                  <span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-emerald-800">
                    {product.category}
                  </span>
                </div>

                <div className="p-5">
                  <h4 className="text-lg font-black">{product.name}</h4>
                  <p className="mt-2 min-h-12 text-sm leading-6 text-slate-500">
                    {product.description}
                  </p>

                  <p className="mt-3 text-sm text-slate-500">
                    📍 {product.location}
                  </p>

                  <div className="mt-4 border-t border-slate-100 pt-4">
                    <p className="text-lg font-black text-emerald-700">
                      {formatPrice(product.price)}
                    </p>

                    <button
                      onClick={() => addToCart(product.id)}
                      className="mt-4 w-full rounded-xl bg-emerald-600 px-4 py-3 font-bold text-white transition hover:bg-emerald-700"
                    >
                      + أضف إلى السلة
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="mx-4 mb-12 overflow-hidden rounded-3xl bg-emerald-900 px-6 py-10 text-white md:mx-auto md:max-w-7xl md:px-12">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-black md:text-3xl">
              هل تبحث عن شيء غير موجود؟
            </h2>
            <p className="mt-3 max-w-2xl leading-7 text-emerald-100">
              وَفْر يهدف إلى جمع احتياجاتك في مكان واحد، من المنتجات وقطع
              التبديل إلى الخدمات والطلبات الخاصة.
            </p>
          </div>

          <button
            onClick={() =>
              alert(
                "ميزة نشر طلب شراء ستُفعّل بعد إنشاء قاعدة البيانات وربط الحسابات."
              )
            }
            className="shrink-0 rounded-xl bg-white px-6 py-4 font-black text-emerald-900 transition hover:bg-emerald-50"
          >
            اطلب ما تحتاجه
          </button>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white px-4 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center md:flex-row md:text-right">
          <div>
            <p className="text-xl font-black text-emerald-700">وَفْر</p>
            <p className="mt-1 text-sm text-slate-500">
              سوق واحد.. خيارات بلا حدود
            </p>
          </div>

          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} وَفْر. جميع الحقوق محفوظة.
          </p>
        </div>
      </footer>
    </main>
  );
}
