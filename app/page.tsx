TypeScript

"use client";

import { useMemo, useState } from "react";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  location: string;
  icon: string;
  description: string;
  badge?: string;
};

const categories = [
  { name: "كل السوق", icon: "🛍️" },
  { name: "البيع والشراء", icon: "🔄" },
  { name: "الطعام والتوصيل", icon: "🍔" },
  { name: "المنزل والكهربائيات", icon: "🏠" },
  { name: "مواد البناء والإكساء", icon: "🧱" },
  { name: "قطع التبديل", icon: "⚙️" },
  { name: "الخدمات", icon: "🛠️" },
  { name: "الهدايا والطلبات الخاصة", icon: "🎁" },
  { name: "الأزياء والإكسسوارات", icon: "👕" },
  { name: "الإلكترونيات", icon: "📱" },
];

const initialProducts: Product[] = [
  {
    id: 1,
    name: "هاتف ذكي مستعمل بحالة ممتازة",
    category: "البيع والشراء",
    price: 850000,
    location: "حماة",
    icon: "📱",
    description: "جهاز مستعمل ونظيف، يعمل بشكل جيد",
    badge: "مميز",
  },
  {
    id: 2,
    name: "وجبة شاورما دجاج",
    category: "الطعام والتوصيل",
    price: 35000,
    location: "جسر الشغور",
    icon: "🌯",
    description: "وجبة طازجة مع البطاطا والصوص",
  },
  {
    id: 3,
    name: "عدة كهربائية منزلية",
    category: "المنزل والكهربائيات",
    price: 275000,
    location: "حماة",
    icon: "🔌",
    description: "مستلزمات كهربائية للاستخدام المنزلي",
  },
  {
    id: 4,
    name: "دهان داخلي عالي الجودة",
    category: "مواد البناء والإكساء",
    price: 180000,
    location: "ريف حماة",
    icon: "🪣",
    description: "دهان مناسب لأعمال ترميم المنازل",
    badge: "للإكساء",
  },
  {
    id: 5,
    name: "قطع تبديل للدراجات النارية",
    category: "قطع التبديل",
    price: 95000,
    location: "جسر الشغور",
    icon: "⚙️",
    description: "قطع متعددة حسب نوع الدراجة",
  },
  {
    id: 6,
    name: "خدمات صيانة منزلية",
    category: "الخدمات",
    price: 50000,
    location: "حماة",
    icon: "🧰",
    description: "تواصل لمعرفة تفاصيل الخدمة والتكلفة",
  },
  {
    id: 7,
    name: "هدية وتغليف حسب الطلب",
    category: "الهدايا والطلبات الخاصة",
    price: 75000,
    location: "جسر الشغور",
    icon: "🎁",
    description: "تجهيز هدايا للمناسبات المختلفة",
  },
  {
    id: 8,
    name: "حقيبة يومية أنيقة",
    category: "الأزياء والإكسسوارات",
    price: 120000,
    location: "حماة",
    icon: "👜",
    description: "تصميم عملي للاستخدام اليومي",
  },
  {
    id: 9,
    name: "خلاط كهربائي للمطبخ",
    category: "المنزل والكهربائيات",
    price: 230000,
    location: "ريف حماة",
    icon: "🥣",
    description: "جهاز للمطبخ المنزلي",
  },
  {
    id: 10,
    name: "سماعات لاسلكية",
    category: "الإلكترونيات",
    price: 110000,
    location: "جسر الشغور",
    icon: "🎧",
    description: "سماعات للاستماع اليومي",
  },
  {
    id: 11,
    name: "إسمنت ومواد بناء",
    category: "مواد البناء والإكساء",
    price: 150000,
    location: "حماة",
    icon: "🧱",
    description: "اسأل البائع عن الكمية والتوفر",
  },
  {
    id: 12,
    name: "خضار وفواكه طازجة",
    category: "الطعام والتوصيل",
    price: 45000,
    location: "جسر الشغور",
    icon: "🥬",
    description: "خيارات متنوعة حسب الموسم",
  },
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("كل السوق");
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [cart, setCart] = useState<Record<number, number>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [notice, setNotice] = useState("");

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return initialProducts.filter((product) => {
      const matchesCategory =
        selectedCategory === "كل السوق" ||
        product.category === selectedCategory;

      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.location.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, search]);

  const cartCount = Object.values(cart).reduce(
    (total, quantity) => total + quantity,
    0
  );

  const cartProducts = initialProducts.filter((product) => cart[product.id]);

  const cartTotal = cartProducts.reduce(
    (total, product) => total + product.price * cart[product.id],
    0
  );

  function addToCart(product: Product) {
    setCart((previous) => ({
      ...previous,
      [product.id]: (previous[product.id] || 0) + 1,
    }));
    setNotice(`أُضيف «${product.name}» إلى السلة`);
    setCartOpen(true);
  }

  function changeQuantity(productId: number, amount: number) {
    setCart((previous) => {
      const nextQuantity = (previous[productId] || 0) + amount;
      const next = { ...previous };

      if (nextQuantity <= 0) {
        delete next[productId];
      } else {
        next[productId] = nextQuantity;
      }

      return next;
    });
  }

  function toggleFavorite(productId: number) {
    setFavorites((previous) =>
      previous.includes(productId)
        ? previous.filter((id) => id !== productId)
        : [...previous, productId]
    );
  }

  function formatPrice(price: number) {
    return new Intl.NumberFormat("ar-SY").format(price) + " ل.س";
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-slate-50 text-slate-900"
    >
      <div className="bg-emerald-950 px-4 py-2 text-center text-sm text-white">
        وَفْر — سوق واحد، خيارات بلا حدود
      </div>

      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4">
          <button
            type="button"
            onClick={() => {
              setSelectedCategory("كل السوق");
              setSearch("");
            }}
            className="flex items-center gap-3 text-right"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-700 text-2xl text-white">
              وَ
            </span>
            <span>
              <span className="block text-2xl font-black tracking-tight text-emerald-900">
                وَفْر
              </span>
              <span className="block text-xs text-slate-500">
                تسوّق أذكى وخيارات أكثر
              </span>
            </span>
          </button>

          <div className="flex flex-1 items-center gap-2 sm:max-w-xl">
            <div className="flex min-w-0 flex-1 items-center rounded-2xl border border-slate-200 bg-slate-50 px-3">
              <span className="text-lg">🔎</span>
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="ابحث عن منتج أو خدمة..."
                aria-label="البحث عن منتج أو خدمة"
                className="w-full bg-transparent px-3 py-3 text-sm outline-none"
              />
            </div>

            <button
              type="button"
              onClick={() => setCartOpen(!cartOpen)}
              className="relative rounded-2xl bg-emerald-700 px-4 py-3 font-bold text-white transition hover:bg-emerald-800"
            >
              🛒 <span className="hidden sm:inline">السلة</span>
              <span className="mr-1">({cartCount})</span>
            </button>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 pt-7">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-l from-emerald-950 via-emerald-800 to-teal-700 px-6 py-10 text-white sm:px-10 sm:py-14">
          <div className="relative z-10 max-w-2xl">
            <span className="inline-block rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm">
              أهلاً بك في وَفْر
            </span>
            <h1 className="mt-5 text-3xl font-black leading-tight sm:text-5xl">
              كل ما تبحث عنه،
              <br />
              في مكان واحد.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-8 text-emerald-50 sm:text-lg">
              اكتشف المنتجات والخدمات، تصفّح العروض، وابحث عن احتياجاتك
              اليومية بسهولة.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("كل السوق");
                  document
                    .getElementById("market")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="rounded-xl bg-white px-6 py-3 font-bold text-emerald-900 transition hover:bg-emerald-50"
              >
                اكتشف السوق ←
              </button>
              <button
                type="button"
                onClick={() =>
                  setNotice("نشر الإعلانات سيُفعّل بعد ربط حسابات المستخدمين.")
                }
                className="rounded-xl border border-white/50 px-6 py-3 font-bold text-white transition hover:bg-white/10"
              >
                ＋ أضف إعلانك
              </button>
            </div>
          </div>

          <div className="pointer-events-none absolute left-5 top-3 hidden text-[150px] opacity-15 sm:block">
            🛍️
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            { icon: "🛍️", title: "منتجات متنوعة", detail: "خيارات متعددة" },
            { icon: "🧰", title: "خدمات محلية", detail: "للاحتياجات اليومية" },
            { icon: "🚚", title: "طعام وتوصيل", detail: "طلباتك في مكان واحد" },
            { icon: "📍", title: "حسب منطقتك", detail: "تصفّح المواقع المتاحة" },
          ].map((item) => (
            <div
              key={item.title}
              className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-2xl">
                {item.icon}
              </span>
              <div>
                <h2 className="font-bold">{item.title}</h2>
                <p className="mt-1 text-xs text-slate-500">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12" id="market">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm font-bold text-emerald-700">تصفّح بسهولة</p>
            <h2 className="mt-1 text-2xl font-black sm:text-3xl">
              أقسام السوق
            </h2>
          </div>
          <p className="text-sm text-slate-500">
            اختر القسم المناسب لك
          </p>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-3">
          {categories.map((category) => {
            const active = selectedCategory === category.name;

            return (
              <button
                key={category.name}
                type="button"
                onClick={() => setSelectedCategory(category.name)}
                className={`min-w-[125px] rounded-2xl border px-4 py-4 text-center transition ${
                  active
                    ? "border-emerald-700 bg-emerald-700 text-white shadow-md"
                    : "border-slate-200 bg-white text-slate-700 hover:border-emerald-300 hover:bg-emerald-50"
                }`}
              >
                <span className="block text-2xl">{category.icon}</span>
                <span className="mt-2 block text-sm font-bold">
                  {category.name}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mb-5 mt-8 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-black">اكتشف المنتجات والخدمات</h2>
            <p className="mt-1 text-sm text-slate-500">
              {selectedCategory === "كل السوق"
                ? "مختارات من أقسام وَفْر"
                : selectedCategory}
            </p>
          </div>
          <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-bold text-emerald-800">
            {filteredProducts.length} نتيجة
          </span>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <article
                key={product.id}
                className="group overflow-hidden rounded-3xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative flex h-44 items-center justify-center bg-gradient-to-br from-emerald-50 to-slate-100">
                  <span className="text-7xl transition group-hover:scale-110">
                    {product.icon}
                  </span>

                  {product.badge && (
                    <span className="absolute right-3 top-3 rounded-full bg-emerald-700 px-3 py-1 text-xs font-bold text-white">
                      {product.badge}
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={() => toggleFavorite(product.id)}
                    aria-label={
                      favorites.includes(product.id)
                        ? "إزالة من المفضلة"
                        : "إضافة إلى المفضلة"
                    }
                    className="absolute left-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl shadow-sm transition hover:scale-105"
                  >
                    {favorites.includes(product.id) ? "❤️" : "♡"}
                  </button>
                </div>

                <div className="p-4">
                  <p className="text-xs font-bold text-emerald-700">
                    {product.category}
                  </p>
                  <h3 className="mt-2 min-h-12 text-base font-bold leading-6">
                    {product.name}
                  </h3>
                  <p className="mt-2 min-h-10 text-sm leading-5 text-slate-500">
                    {product.description}
                  </p>

                  <div className="mt-3 flex items-center justify-between gap-2">
                    <span className="text-xs text-slate-500">
                      📍 {product.location}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-2 border-t border-slate-100 pt-4">
                    <span className="text-sm font-black text-emerald-800">
                      {formatPrice(product.price)}
                    </span>
                    <button
                      type="button"
                      onClick={() => addToCart(product)}
                      className="rounded-xl bg-emerald-700 px-3 py-2 text-sm font-bold text-white transition hover:bg-emerald-800"
                    >
                      ＋ أضف للسلة
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-5 py-14 text-center">
            <span className="text-5xl">🔎</span>
            <h3 className="mt-4 text-xl font-bold">لم نجد نتائج مطابقة</h3>
            <p className="mt-2 text-slate-500">
              جرّب كلمة أخرى أو اختر قسمًا مختلفًا.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setSelectedCategory("كل السوق");
              }}
              className="mt-5 rounded-xl bg-emerald-700 px-5 py-3 font-bold text-white"
            >
              عرض كل السوق
            </button>
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12">
        <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-6 sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-8">
          <div>
            <h2 className="text-2xl font-black text-emerald-950">
              لم تجد ما تبحث عنه؟
            </h2>
            <p className="mt-2 leading-7 text-slate-600">
              يمكنك إرسال طلبك، وسيتم تجهيز ميزة طلب المنتجات والخدمات عند
              استكمال ربط المنصة.
            </p>
          </div>
          <button
            type="button"
            onClick={() =>
              setNotice("ميزة نشر الطلبات قيد التجهيز وستُفعّل بعد ربط النظام.")
            }
            className="mt-5 shrink-0 rounded-xl bg-emerald-800 px-5 py-3 font-bold text-white hover:bg-emerald-900 sm:mt-0"
          >
            ＋ اطلب ما تحتاجه
          </button>
        </div>
      </section>

      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40">
          <button
            type="button"
            aria-label="إغلاق السلة"
            onClick={() => setCartOpen(false)}
            className="absolute inset-0 h-full w-full cursor-default"
          />

          <aside className="relative z-10 flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b p-5">
              <div>
                <h2 className="text-xl font-black">🛒 سلة التسوق</h2>
                <p className="mt-1 text-sm text-slate-500">
                  {cartCount} قطعة
                </p>
              </div>
              <button
                type="button"
                onClick={() => setCartOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-xl"
                aria-label="إغلاق"
              >
                ×
              </button>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto p-5">
              {cartProducts.length === 0 ? (
                <div className="py-16 text-center">
                  <span className="text-5xl">🛍️</span>
                  <p className="mt-4 font-bold">سلتك فارغة حتى الآن</p>
                  <p className="mt-2 text-sm text-slate-500">
                    أضف المنتجات التي تعجبك من السوق.
                  </p>
                  <button
                    type="button"
                    onClick={() => setCartOpen(false)}
                    className="mt-5 rounded-xl bg-emerald-700 px-5 py-3 font-bold text-white"
                  >
                    متابعة التسوق
                  </button>
                </div>
              ) : (
                cartProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex gap-3 rounded-2xl border border-slate-200 p-3"
                  >
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-3xl">
                      {product.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold">{product.name}</h3>
                      <p className="mt-1 text-sm font-bold text-emerald-800">
                        {formatPrice(product.price * cart[product.id])}
                      </p>
                      <div className="mt-2 flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => changeQuantity(product.id, -1)}
                          className="h-8 w-8 rounded-lg border border-slate-200 font-bold"
                          aria-label="تقليل الكمية"
                        >
                          −
                        </button>
                        <span className="font-bold">{cart[product.id]}</span>
                        <button
                          type="button"
                          onClick={() => changeQuantity(product.id, 1)}
                          className="h-8 w-8 rounded-lg border border-slate-200 font-bold"
                          aria-label="زيادة الكمية"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cartProducts.length > 0 && (
              <div className="border-t bg-slate-50 p-5">
                <div className="flex items-center justify-between">
                  <span className="font-bold">المجموع التقديري</span>
                  <span className="text-lg font-black text-emerald-800">
                    {formatPrice(cartTotal)}
                  </span>
                </div>
                <p className="mt-2 text-xs leading-5 text-slate-500">
                  هذه سلة تجريبية داخل الصفحة. إتمام الطلب والدفع يحتاجان إلى
                  ربط قاعدة البيانات ونظام الطلبات.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setCartOpen(false);
                    setNotice(
                      "السلة تعمل تجريبيًا. إتمام الطلب سيُفعّل بعد ربط قاعدة البيانات."
                    );
                  }}
                  className="mt-4 w-full rounded-xl bg-emerald-700 px-5 py-3 font-bold text-white hover:bg-emerald-800"
                >
                  متابعة الطلب
                </button>
              </div>
            )}
          </aside>
        </div>
      )}

      {notice && (
        <div
          role="status"
          className="fixed bottom-5 left-4 right-4 z-[60] mx-auto flex max-w-lg items-center justify-between gap-4 rounded-2xl bg-slate-900 px-5 py-4 text-sm font-medium text-white shadow-xl"
        >
          <span>{notice}</span>
          <button
            type="button"
            onClick={() => setNotice("")}
            className="shrink-0 text-xl"
            aria-label="إغلاق التنبيه"
          >
            ×
          </button>
        </div>
      )}

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-7 text-center sm:flex-row sm:text-right">
          <div>
            <p className="text-xl font-black text-emerald-900">وَفْر</p>
            <p className="mt-1 text-sm text-slate-500">
              سوق واحد.. خيارات بلا حدود
            </p>
          </div>
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} وَفْر — جميع الحقوق محفوظة
          </p>
        </div>
      </footer>
    </main>
  );
}
