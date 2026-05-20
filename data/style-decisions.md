# Style Decisions

Vektör'ün site tasarımına dair verdiği kararlar. Her büyük değişiklik buraya gerekçesiyle yazılır — böylece 6 ay sonra "neden böyle yapmıştım" sorusunun cevabı olur.

Format:

```
## YYYY-MM-DD — Karar başlığı

**Ne değişti:** ...
**Neden:** ...
**Alternatifler:** ...
**Geri alma şartları:** Hangi durumda bu karardan dönülür?
```

---

## Başlangıç Kararları (kurulum)

### Görsel kimlik: Açık tema, gazete tarzı

**Ne:** Substack/Medium estetiği — sade, beyaz arka plan, serif başlık fontu (örn: Charter, Lora, IBM Plex Serif), sans-serif gövde (örn: Inter, Geist).

**Neden:** Hedef kitle mühendis okur; sansasyonel görsellik değil, okunabilirlik öncelikli. Açık tema uzun yazılar için göz yormaz. Karanlık tema toggle'ı opsiyonel olarak eklenebilir.

**Alternatifler ve neden seçilmedi:**
- Karanlık tema, minimal: çok yaygın AI estetiği, fark yaratmaz
- Terminal tarzı: ilk başta havalı, uzun yazılarda yorucu
- Tam Vektör tasarlasın: kullanıcı gazete tarzını tercih etti

**Geri alma şartı:** Okuyucu analitikleri açık temada okuma sürelerinin belirgin düşük olduğunu gösterirse.

### Font önerisi

Henüz seçilmedi. Vektör ilk build'de şu seti deneyebilir:
- Başlık: **Charter** veya **Newsreader** (Google Fonts'ta var, ücretsiz, klasik gazete hissi)
- Gövde: **Inter** veya **Source Sans 3** (yüksek okunabilirlik)
- Kod: **JetBrains Mono** veya **Geist Mono**

A/B test edilmeli, sonuç buraya yazılmalı.

### Renk paleti (öneri)

- Arka plan: `#fafaf9` (sıcak beyaz, saf beyaz yorucu)
- Metin: `#1a1a1a`
- Vurgu: `#1d4ed8` (mavi, link/CTA için)
- İkincil: `#525252` (alt metin, tarih, kategori)
- Kenarlık: `#e5e5e5`

Vektör ilk build'de bunu deneyebilir, gerekirse ayarlar.
