
"use client";

import { useMemo, useState } from "react";

const products = [
  { id: 1, name: "هاتف ذكي", category: "إلكترونيات", price: 2500000, image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600" },
  { id: 2, name: "سماعات لاسلكية", category: "إلكترونيات", price: 180000, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600" },
  { id: 3, name: "حذاء رياضي", category: "أزياء", price: 350000, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600" },
  { id: 4, name: "حقيبة أنيقة", category: "أزياء", price: 220000, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600" },
  { id: 5, name: "ساعة عصرية", category: "إكسسوارات", price: 275000, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600" },
  { id: 6, name: "مصباح منزلي", category: "المنزل", price: 95000, image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600" },
  { id: 7, name: "خلاط كهربائي", category: "المنزل", price: 420000, image: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=600" },
  { id: 8, name: "كرة قدم", category: "رياضة", price: 125000, image: "https://images.unsplash.com/photo-1614632537190-23e4146777db?w=600" },
];

const categories = ["الكل", "إلكترونيات", "أزياء", "إكسسوارات", "المنزل", "رياضة"];

export default function Home() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("الكل");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [cart, setCart] = useState<number[]>([]);

  const filteredProducts = useMemo(
    () =>
      products.filter(
        (p) =>
          p.name.includes(search.trim()) &&
          (category === "الكل" || p.category === category)
      ),
    [search, category]
  );

  const price = (value: number) =>
    new Intl.NumberFormat("ar-SY").format(value) + " ل.س";

  return (
    <main dir="rtl" className="min-h-screen bg-[#f7f8f5] text-gray-900">
      <div className="bg-[#173c2b] px-3 py-2 text-center text-xs text-white">
        أهلاً بك في وَفْر — تسوّق أذكى وخيارات أكثر
      </div>

      <header className="sticky top-0 z-20 border-b bg-white/95 shadow-sm backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4">
          <a href="/" className="shrink-0">
            <span className="text-3xl font-black text-[#17613e]">
              وَفْر<span className="text-[#c6a15b]">.</span>
            </span>
            <span className="block text-[10px] text-gray-500">
              سوق واحد.. خيارات بلا حدود
            </span>
          </a>

          <button
            onClick={() =>
              alert(cart.length ? `عدد المنتجات في السلة: ${cart.length}` : "السلة فارغة حالياً")
            }
            className="rounded-xl bg-[#17613e] px-3 py-2.5 text-sm font-bold text-white sm:px-5"
          >
            🛒 السلة ({cart.length})
          </button>
        </div>

        <div className="mx-auto max-w-7xl px-4 pb-3">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ابحث عن المنتج الذي تريده..."
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-[#17613e]"
            aria-label="البحث عن المنتجات"
          />
        </div>
      </header>

      <section className="px-4 pt-5 sm:px-6 sm:pt-8">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-3xl bg-[#173c2b] md:grid-cols-2">
          <div className="flex flex-col items-start justify-center p-7 text-white sm:p-12">
            <span className="rounded-full border border-white/20 px-4 py-2 text-xs text-[#e7d09d]">
              اكتشف تجربة تسوّق مختلفة
            </span>
            <h1 className="mt-5 text-3xl font-black leading-relaxed sm:text-5xl">
              كل ما تبحث عنه،
              <span className="block text-[#e3c27c]">في مكان واحد.</span>
            </h1>
            <p className="mt-3 max-w-md text-sm leading-7 text-white/75 sm:text-base">
              خيارات متنوعة، منتجات متعددة، وتجربة تسوّق سهلة مع وَفْر.
            </p>
            <button
              onClick={() =>
                document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })
              }
              className="mt-6 rounded-xl bg-[#e3c27c] px-6 py-3 font-black text-[#173c2b] transition hover:bg-white"
            >
              اكتشف المنتجات ←
            </button>
          </div>

          <div className="hidden min-h-[340px] md:block">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1000"
              alt="متجر عصري"
              className="h-full min-h-[340px] w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-9 sm:px-6 sm:py-12">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold text-[#a17c36]">تسوّق كما تحب</p>
            <h2 className="mt-1 text-xl font-black sm:text-2xl">
              تصفّح الأقسام
            </h2>
          </div>
          <span className="text-xs text-gray-500">اختر القسم المناسب</span>
        </div>

        <div className="mb-9 flex gap-2 overflow-x-auto pb-3">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`shrink-0 rounded-full border px-5 py-3 text-sm font-bold transition ${
                category === item
                  ? "border-[#17613e] bg-[#17613e] text-white"
                  : "border-gray-200 bg-white text-gray-700 hover:border-[#17613e]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div id="products" className="mb-5 flex items-end justify-between">
          <div>
            <p className="text-xs font-bold text-[#a17c36]">اختيارات وَفْر</p>
            <h2 className="mt-1 text-xl font-black sm:text-2xl">
              منتجات مختارة
            </h2>
          </div>
          <span className="text-sm text-gray-500">
            {filteredProducts.length} منتجات
          </span>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center text-gray-500">
            ما لقينا منتجات مطابقة لبحثك.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <article
                key={product.id}
                className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
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
                    {price(product.price)}
                  </p>
                  <button
                    onClick={() => setCart((current) => [...current, product.id])}
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

      <footer className="mt-8 bg-[#10291e] px-4 py-9 text-center text-white">
        <p className="text-3xl font-black text-[#e3c27c]">وَفْر.</p>
        <p className="mt-2 text-sm text-white/70">
          سوق واحد.. خيارات بلا حدود
        </p>
        <div className="mx-auto my-5 h-px max-w-xs bg-white/15" />
        <p className="text-xs text-white/50">
          © {new Date().getFullYear()} وَفْر — جميع الحقوق محفوظة
        </p>
      </footer>
    </main>
  );
}
