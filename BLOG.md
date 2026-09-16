# Blog — dodawanie wpisów

Artykuły znajdują się w `src/content/blog/`. Każdy plik Markdown tworzy osobną podstronę; wpisy są sortowane od najnowszego. Strona główna pokazuje trzy ostatnie, a `/blog/` wszystkie.

Nowy plik powinien zawierać nagłówek:

```yaml
---
title: "Tytuł artykułu"
slug: "unikalny-adres-artykulu"
description: "Krótka zapowiedź wyświetlana na karcie i w metadanych."
date: "2026-09-16"
category: "Przeglądy i bezpieczeństwo"
image: "/images/nazwa-zdjecia.webp"
imageAlt: "Opis tego, co przedstawia zdjęcie"
---
```

Pod nagłówkiem wpisz treść. Tytuł główny powstaje automatycznie; śródtytuły zapisuj jako `##`. Zdjęcie umieść w `public/images/`. Pola `image` i `imageAlt` są opcjonalne — po dodaniu zdjęcia pojawi się ono na karcie, w artykule i w metadanych udostępniania. Bez zdjęcia karta pokazuje okładkę typograficzną.

Pierwszy artykuł zawiera zweryfikowane odnośniki do GUNB i dokumentacji producenta. Zastąpiono niepotwierdzone 4% i 99% danymi raportu GUNB za 2020 r.: 31 katastrof związanych z wybuchem instalacji gazowej, 272 katastrofy ogółem. Nie przypisano wszystkich zdarzeń brakowi kontroli.

Po zmianach zbuduj stronę i wykonaj kontrole opisane w README. Pliki do publikacji powstają w `dist/`; sposób przesłania na hosting opisuje DEPLOYMENT.md. Dodanie pliku z przyszłą datą nie planuje publikacji — wszystkie pliki w tym folderze trafiają do następnego builda.
