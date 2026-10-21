TypeScript
"use client";

import { useMemo, useState } from "react";

const categories = [
  { name: "كل السوق", icon: "🛍️", color: "bg-emerald-50" },
  { name: "البيع والشراء", icon: "🔄", color: "bg-blue-50" },
  { name: "الطعام والتوصيل", icon: "🍔", color: "bg-orange-50" },
  { name: "المنزل والكهربائيات", icon: "🏠", color: "bg-amber-50" },
  { name: "مواد البناء", icon: "🧱", color: "bg-stone-100" },
  { name: "قطع التبديل", icon: "⚙️", color: "bg-slate-100" },
  { name: "الخدمات", icon: "🛠️", color: "bg-purple-50" },
  { name: "الهدايا والطلبات الخاصة", icon: "🎁", color: "bg-pink-50" },
  { name: "الأزياء والإكسسوارات", icon: "👕", color: "bg-rose-50" },
  { name: "الإلكترونيات", icon: "📱", color: "bg-cyan-50" },
];

const products = [
  {
    id: 1,
    name: "هاتف ذكي",
    category: "الإلكترونيات",
    price: 2500000,
    icon: "📱",
    description: "أجهزة وهواتف إلكترونية",
  },
  {
    id: 2,
    name: "سماعات لاسلكية",
    category: "الإلكترونيات",
    price: 180000,
    icon: "🎧",
    description: "إكسسوارات الهاتف",
  },
  {
    id: 3,
    name: "حذاء رياضي",
    category: "الأزياء والإكسسوارات",
    price: 350000,
    icon: "👟",
    description: "ملابس وأحذية",
  },
  {
    id: 4,
    name: "حقيبة أنيقة",
    category: "الأزياء والإكسسوارات",
    price: 220000,
    icon: "👜",
    description: "حقائب وإكسسوارات",
  },
  {
    id: 5,
    name: "ساعة عصرية",
    category: "الأزياء والإكسسوارات",
    price: 275000,
    icon: "⌚",
    description: "ساعات وهدايا",
  },
  {
    id: 6,
    name: "مصباح منزلي",
    category: "المنزل والكهربائيات",
    price: 95000,
    icon: "💡",
    description: "تجهيزات المنزل",
  },
  {
    id: 7,
    name: "خلاط كهربائي",
    category: "المنزل والكهربائيات",
    price: 420000,
    icon: "🥤",
    description: "أدوات كهربائية منزلية",
  },
  {
    id: 8,
    name: "كرة قدم",
    category: "الرياضة",
    price: 125000,
    icon: "⚽",
    description: "أدوات رياضية",
  },
];

const opportunities = [
  {
    icon: "📣",
    title: "أريد شراء منتج",
    text: "انشر طلبك ودع البائعين يعرضون عليك خياراتهم.",
    color: "bg-blue-50",
  },
  {
    icon: "🏷️",
    title: "أريد بيع منتج",
    text: "اعرض منتجاتك واجعل المشترين يصلون إليك.",
    color: "bg-emerald-50",
  },
  {
    icon: "🍽️",
    title: "الطعام والتوصيل",
    text: "اطلب الطعام والمشتريات وخدمات التوصيل.",
    color: "bg-orange-50",
  },
  {
    icon: "🧰",
    title: "اطلب خدمة",
    text: "ابحث عن حرفيين وفنيين ومقدمي الخدمات.",
    color: "bg-purple-50",
  },
];

export default function Home() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("كل السوق");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [cart, setCart] = useState<number[]>([]);
  const [notice, setNotice] = useState("");

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query);

      const matchesCategory =
        category === "كل السوق" ||
        category === product.category ||
        (category === "الإلكترونيات" &&
          product.category === "الإلكترونيات") ||
        (category === "المنزل والكهربائيات" &&
          product.category === "المنزل والكهربائيات") ||
        (category === "الأزياء والإكسسوارات" &&
          product.category === "الأزياء والإكسسوارات");

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  const formatPrice = (value: number) =>
    new Intl.NumberFormat("ar-SY").format(value) + " ل.س";

  function showNotice(message: string) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 3000);
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#f7f8f5] text-gray-900"
    >
      {/* الشريط العلوي */}
      <div className="bg-[#173c2b] px-3 py-2 text-center text-xs text-white">
        أهلاً بك في وَفْر — سوق واحد، خيارات بلا حدود
      </div>

      {/* رأس الموقع */}
      <header className="sticky top-0 z-30 border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4">
          <a href="/" className="shrink-0">
            <span className="text-3xl font-black text-[#17613e]">
              وَفْر<span className="text-[#c6a15b]">.</span>
            </span>
            <span className="block text-[10px] text-gray-500">
              سوق واحد.. خيارات بلا حدود
            </span>
          </a>

          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                showNotice(
                  favorites.length
                    ? `عدد المنتجات المفضلة: ${favorites.length}`
                    : "لم تضف منتجات إلى المفضلة بعد"
                )
              }
              className="rounded-xl border border-gray-200 px-3 py-2 text-sm font-bold"
            >
              ♡ <span className="hidden sm:inline">المفضلة</span>
              {" "}({favorites.length})
            </button>

            <button
              onClick={() =>
                showNotice(
                  cart.length
                    ? `عدد المنتجات في السلة: ${cart.length}`
                    : "السلة فارغة حالياً"
                )
              }
              className="rounded-xl bg-[#17613e] px-3 py-2.5 text-sm font-bold text-white sm:px-5"
            >
              🛒 السلة ({cart.length})
            </button>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 pb-3">
          <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 focus-within:border-[#17613e]">
            <span>🔎</span>
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCategory("كل السوق");
              }}
              placeholder="ابحث عن منتج، خدمة، قطعة تبديل..."
              className="w-full bg-transparent py-3 outline-none"
              aria-label="البحث في السوق"
            />
          </div>
        </div>
      </header>

      {/* الواجهة الرئيسية */}
      <section className="px-4 pt-5 sm:px-6 sm:pt-8">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-3xl bg-[#173c2b] md:grid-cols-2">
          <div className="flex flex-col items-start justify-center p-7 text-white sm:p-12">
            <span className="rounded-full border border-white/20 px-4 py-2 text-xs text-[#e7d09d]">
              منصتك لكل احتياجاتك
            </span>

            <h1 className="mt-5 text-3xl font-black leading-relaxed sm:text-5xl">
              كل ما تحتاجه،
              <span className="block text-[#e3c27c]">
                تجده في وَفْر.
              </span>
            </h1>

            <p className="mt-3 max-w-md text-sm leading-7 text-white/80 sm:text-base">
              منتجات، خدمات، بيع وشراء، طعام وتوصيل، مواد بناء وقطع تبديل،
              وهدايا وطلبات خاصة في سوق واحد.
            </p>

            <button
              onClick={() =>
                document
                  .getElementById("market-categories")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="mt-6 rounded-xl bg-[#e3c27c] px-6 py-3 font-black text-[#173c2b] transition hover:bg-white"
            >
              اكتشف السوق ←
            </button>
          </div>

          <div className="flex min-h-64 items-center justify-center bg-gradient-to-br from-[#245b40] to-[#10291e] p-8 md:min-h-96">
            <div className="grid w-full max-w-sm grid-cols-2 gap-3">
              {[
                ["🛍️", "منتجات متنوعة"],
                ["🧰", "خدمات"],
                ["🍔", "طعام وتوصيل"],
                ["🎁", "طلبات خاصة"],
              ].map(([icon, label]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/10 bg-white/10 p-5 text-center text-white"
                >
                  <div className="text-4xl">{icon}</div>
                  <p className="mt-3 text-sm font-bold">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* أقسام السوق */}
      <section
        id="market-categories"
        className="mx-auto max-w-7xl px-4 py-10 sm:px-6"
      >
        <div className="mb-6">
          <p className="text-xs font-bold text-[#a17c36]">
            كل شيء في مكان واحد
          </p>
          <h2 className="mt-1 text-2xl font-black">
            تصفّح أقسام وَفْر
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            اختر القسم الذي يناسب احتياجك.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {categories.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                setCategory(item.name);
                document
                  .getElementById("products")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className={`rounded-2xl border p-4 text-right transition hover:-translate-y-1 hover:shadow-md ${
                category === item.name
                  ? "border-[#17613e] bg-emerald-50"
                  : "border-gray-100 bg-white"
              }`}
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl text-2xl ${item.color}`}
              >
                {item.icon}
              </div>
              <p className="mt-3 text-sm font-bold leading-6">
                {item.name}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* اختصارات الاستخدام */}
      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6">
        <div className="mb-5">
          <p className="text-xs font-bold text-[#a17c36]">
            ابدأ من هنا
          </p>
          <h2 className="mt-1 text-2xl font-black">
            ماذا تريد أن تفعل اليوم؟
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {opportunities.map((item) => (
            <button
              key={item.title}
              onClick={() => showNotice(
                `قسم "${item.title}" قيد التجهيز للربط بنظام الطلبات.`
              )}
              className="rounded-2xl border border-gray-100 bg-white p-5 text-right transition hover:-translate-y-1 hover:shadow-md"
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl text-2xl ${item.color}`}
              >
                {item.icon}
              </div>
              <h3 className="mt-4 font-black">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                {item.text}
              </p>
              <span className="mt-4 inline-block text-sm font-bold text-[#17613e]">
                ابدأ الآن ←
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* المنتجات */}
      <section
        id="products"
        className="mx-auto max-w-7xl px-4 py-10 sm:px-6"
      >
        <div className="mb-6 flex items-end justify-between gap-3">
          <div>
            <p className="text-xs font-bold text-[#a17c36]">
              اكتشف المعروض
            </p>
            <h2 className="mt-1 text-2xl font-black">
              منتجات مختارة
            </h2>
          </div>
          <span className="text-sm text-gray-500">
            {filteredProducts.length} منتجات
          </span>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center text-gray-500">
            ما لقينا منتجات مطابقة. جرّب كلمة بحث ثانية أو اختر كل السوق.
            <button
              onClick={() => {
                setSearch("");
                setCategory("كل السوق");
              }}
              className="mt-4 block w-full font-bold text-[#17613e]"
            >
              عرض كل المنتجات
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <article
                key={product.id}
                className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative flex aspect-square items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                  <span className="text-7xl">{product.icon}</span>
                  <button
                    onClick={() =>
                      setFavorites((current) =>
                        current.includes(product.id)
                          ? current.filter((id) => id !== product.id)
                          : [...current, product.id]
                      )
                    }
                    aria-label="إضافة إلى المفضلة"
                    className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-xl shadow-sm"
                  >
                    {favorites.includes(product.id) ? "❤️" : "♡"}
                  </button>
                </div>

                <div className="p-3 sm:p-4">
                  <p className="mb-2 text-xs text-gray-500">
                    {product.category}
                  </p>
                  <h3 className="min-h-10 text-sm font-bold sm:text-base">
                    {product.name}
                  </h3>
                  <p className="mt-2 text-sm font-black text-[#17613e]">
                    {formatPrice(product.price)}
                  </p>
                  <button
                    onClick={() =>
                      setCart((current) => [...current, product.id])
                    }
                    className="mt-4 w-full rounded-xl bg-[#17613e] py-3 text-xs font-bold text-white transition hover:bg-[#10482d] sm:text-sm"
                  >
                    أضف إلى السلة +
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* دعوة للمشاركة */}
      <section className="mx-4 mb-12 rounded-3xl bg-[#e9efe9] px-5 py-10 text-center sm:mx-6 sm:px-8">
        <div className="mx-auto max-w-2xl">
          <span className="text-4xl">🤝</span>
          <h2 className="mt-4 text-2xl font-black text-[#173c2b]">
            وَفْر يجمع البائع والمشتري
          </h2>
          <p className="mt-3 text-sm leading-7 text-gray-600">
            هدفنا أن تجد ما تبحث عنه بسهولة، وأن تصل منتجاتك وخدماتك إلى
            من يحتاج إليها.
          </p>
          <button
            onClick={() =>
              showNotice(
                "نموذج التسجيل ونشر الإعلانات سيُفعّلان ضمن المرحلة التالية."
              )
            }
            className="mt-6 rounded-xl bg-[#17613e] px-7 py-3 font-bold text-white"
          >
            شارك في وَفْر
          </button>
        </div>
      </section>

      {/* إشعار */}
      {notice && (
        <div
          role="status"
          className="fixed bottom-5 left-4 right-4 z-50 mx-auto max-w-md rounded-2xl bg-[#173c2b] p-4 text-center text-sm font-bold text-white shadow-xl"
        >
          {notice}
        </div>
      )}

      {/* التذييل */}
      <footer className="bg-[#10291e] px-4 py-10 text-center text-white">
        <p className="text-3xl font-black text-[#e3c27c]">وَفْر.</p>
        <p className="mt-2 text-sm text-white/70">
          سوق واحد.. خيارات بلا حدود
        </p>
        <p className="mx-auto mt-4 max-w-md text-xs leading-6 text-white/50">
          منصة تجمع المنتجات والخدمات والطلبات في تجربة عربية سهلة.
        </p>
        <div className="mx-auto my-6 h-px max-w-xs bg-white/15" />
        <p className="text-xs text-white/50">
          © {new Date().getFullYear()} وَفْر — جميع الحقوق محفوظة
        </p>
      </footer>
    </main>
  );
         }
