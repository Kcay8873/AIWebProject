# Vektörel Bakışı

Otonom bir AI editor tarafından yazılan, ikinci bir AI fact-checker tarafından doğrulanan, mühendis okur için AI ve teknoloji haberleri sitesi.

## Sistem

İki AI rolü vardır:

- **Vektör** — Baş editor ve yazar. Konuları seçer, web'i tarar, yazıları yazar, tasarım ve strateji kararları verir. Kuralları: [`CLAUDE.md`](./CLAUDE.md)
- **Lemma** — Bağımsız fact-checker. Vektör'ün yazdığı her yazıyı yayınlanmadan önce doğrular. Kuralları: [`FACT_CHECKER.md`](./FACT_CHECKER.md)

İnsan sahip izleyici ve son merci konumundadır. Günlük operasyonda müdahale etmez, yön düzeltmeleri yapar.

## Akış

```
Tetikleyici (GitHub Action veya manuel)
  ↓
Vektör web'i tarar, konuları puanlar, en yüksekleri seçer
  ↓
Yazıyı yazar, branch'e push'lar, PR açar
  ↓
Lemma PR'ı kontrol eder (kaynaklar, olgular, üslup, telif)
  ↓
  ├─ 🟢 Onay → merge → site yayınlanır
  ├─ 🟡 Düzeltme talebi → Vektör düzeltir → Lemma tekrar bakar
  └─ 🔴 Reddet → yazı arşive (drafts/) düşer
```

## Stack

- **Framework:** Next.js 15 (App Router)
- **Dil:** TypeScript
- **Stil:** Tailwind CSS
- **İçerik:** MDX
- **Hosting:** Vercel (GitHub bağlantılı, `main`'e push'la otomatik deploy)
- **Otomasyon:** GitHub Actions

## Klasör Yapısı

```
vektorel-bakisi/
├── CLAUDE.md                    # Vektör'ün kuralları (oku!)
├── FACT_CHECKER.md              # Lemma'nın kuralları
├── README.md                    # Bu dosya
│
├── app/                         # Next.js sayfaları
├── components/                  # React component'leri
├── content/posts/               # Yayınlanan yazılar (.mdx)
├── public/                      # Görseller, favicon
│
├── data/                        # AI'ların hafızası
│   ├── editorial-log.md         # Vektör'ün karar günlüğü
│   ├── topic-queue.md           # İşlenecek konular
│   ├── covered-topics.md        # İşlenmiş konular (tekrarı önler)
│   ├── style-decisions.md       # Tasarım kararları
│   └── analytics-report.md      # Trafik raporu (sonra eklenecek)
│
└── .github/workflows/
    ├── daily-posts.yml          # Günlük tetikleyici
    └── fact-check.yml           # Lemma'yı PR'larda çalıştırır
```

## Kuluçka Dönemi

İlk 14 günde sistem oturana kadar insan sahip her PR'a yorum bırakarak yön verir. Beğenilmeyen kalıplar `CLAUDE.md`'ye işlenir. Bu dönem sonunda sistem büyük ölçüde otonom çalışır.

## Şeffaflık

`/hakkinda` sayfasında AI yönetimi açıkça belirtilir. Hatalar düzeltme notuyla düzeltilir, sessizce silinmez. Telif hakkı ihlali olmaz; tüm yazılar özgün, alıntılar sınırlı ve atıflıdır.

## Kurulum (geliştiriciler için)

```bash
git clone <repo-url>
cd vektorel-bakisi
npm install
npm run dev
```

Site http://localhost:3000 adresinde çalışır.

Production build:

```bash
npm run build
npm run start
```

### Vercel Deploy

1. [vercel.com](https://vercel.com) → **Add New → Project**
2. GitHub'dan `Kcay8873/AIWebProject` reposunu import et
3. Framework otomatik algılanır (Next.js)
4. Environment variable ekle: `NEXT_PUBLIC_SITE_URL=https://<proje-adı>.vercel.app`
5. **Deploy**

`main` branch'e her push otomatik production deploy, PR'lar preview deploy alır.

## Lisans

İçerik (yazılar): henüz belirlenmedi (önerilen: CC BY 4.0)
Kod: MIT

## İletişim

Soruları, hata bildirimleri, düzeltme talepleri için GitHub Issues kullanılır.
