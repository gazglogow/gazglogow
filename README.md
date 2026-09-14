# Usługi gazowe — Głogów i okolice

## 1. Cel projektu
Strona pozyskująca klientów na przeglądy instalacji gazowych, podłączanie urządzeń gazowych, próby szczelności i opinie techniczne. Główny kontakt: **530 366 668**. Głównie osoby prywatne; również zarządcy, wspólnoty i firmy.

**Stan: działająca V1 do lokalnego przeglądu, nieopublikowana.** Plan zaakceptowany przez właściciela. Późniejsze polecenie właściciela zmieniło kierunek wizualny na inspirację Ferrari.com. Nie jest to zmiana zakresu usług.

## 2. Aktualna architektura strony
- `/` — oferta i region, cztery usługi, odbiorcy, sposób zamówienia, kontakt.
- `/uslugi/przeglady-instalacji-gazowych/`
- `/uslugi/podlaczanie-urzadzen-gazowych/`
- `/uslugi/proby-szczelnosci/`
- `/uslugi/opinie-techniczne/`
- `/404.html`, `/robots.txt`, `/sitemap.xml`.

Menu: Usługi, Dla kogo, Jak zamówić, Kontakt. Kotwice prowadzą do strony głównej także z podstron. Numer telefonu jest klikalny. Brak formularza, ponieważ zatwierdzona V1 opiera się na kontakcie telefonicznym.

## 3. Technologie i uruchomienie
Astro 7.3.2, TypeScript 6.0.3, statyczny HTML, CSS, niewielkie skrypty menu i ruchu. Inter i Manrope hostowane lokalnie, bez żądań do Google Fonts. WebP/AVIF. ESLint, Astro check, testy Node, Playwright/axe. TypeScript 7 nie dostarcza API wymaganego przez użyte narzędzia — używamy wersji 6.

W standardowym środowisku Node 24 + pnpm:

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm check
pnpm lint
pnpm build
pnpm test
pnpm preview --port 4322
```

W tym środowisku Windows pnpm jest dostępny pod:
`C:/Users/Praca/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/fallback/pnpm.cmd`.
Astro potrzebuje `ASTRO_TELEMETRY_DISABLED=1`, żeby nie zapisywać konfiguracji poza workspace:

```powershell
$env:ASTRO_TELEMETRY_DISABLED='1'
node node_modules/astro/bin/astro.mjs dev --host 127.0.0.1 --port 4321
```

Podgląd developerski: http://127.0.0.1:4321/. Podgląd statycznego builda do testów: http://127.0.0.1:4322/. Testy browser wymagają zainstalowanego Chrome. W środowisku Codex uruchamianie esbuild i Chrome wymagało zgody sandboxa; nie jest to błąd strony.

## 4. Struktura katalogów
- `src/components/` — nagłówek, hero, oferta, odbiorcy, proces, kontakt, ikony i ruch.
- `src/layouts/Base.astro` — metadane, fonty, wspólny szkielet.
- `src/data/` — dane kontaktowe i treści usług.
- `src/pages/` — strony, routing i pliki SEO.
- `src/styles/` — fundament CSS i aktualny kierunek editorial.
- `public/images/` — zoptymalizowane obrazy.
- `assets/originals/` — oryginały wygenerowanych ilustracji i ich pochodzenie; niepublikowane.
- `scripts/` — testy przeglądarkowe i laboratoryjny pomiar wydajności.
- `tests/` — kontrola statycznego builda.
- `qa/` — lokalne raporty JSON i zrzuty; niepublikowane.
- `dist/` — gotowe pliki statyczne, domyślnie noindex.
- `PLAN.md` — zaakceptowany plan i analiza konkurencji; późniejsza korekta Ferrari opisana tutaj.
- `DEPLOYMENT.md` — przygotowanie publikacji w OVHcloud.
- `REVIEW.md` — rzeczywiste oceny trzech agentów i wyniki etapów.

## 5. Ukończone elementy
- Discovery, analiza dostępnej treści konkurencji i jedna akceptacja planu.
- Pięć stron treści oraz 404, menu responsywne, kontakt telefoniczny.
- Ciemne, pełnoszerokie otwarcie, biała typografia, czerwone CTA; ilustracyjna armatura z żółtym akcentem.
- Generowane obrazy: oryginały i wersje AVIF/WebP. Aktualny hero 1600 px AVIF: 71 679 B.
- Intro obrazu 2 s, subtelny ruch zależny od wskaźnika i wejścia sekcji; tekst i CTA pozostają nieruchome. Ruch wyłączony przy reduced motion, uproszczony na mobile.
- Lokalnie hostowane fonty, metadane, canonical, sitemap, domyślne noindex.
- Obsługa klawiaturą, Escape, skip link i widoczny fokus; użyteczna nawigacja bez JavaScript.
- Poprawki po review: kolejność klawiatury, etykiety telefonów, kadr tabletowy, kontrast numeracji, 404 zawsze noindex, usunięcie początkowego przesunięcia mobilnej nawigacji.

## 6. Elementy w trakcie
Końcowy pomiar stabilności układu po poprawce menu i dokumentacja przekazania. Publikacja czeka na zakup/konfigurację OVHcloud i uzupełnienie danych podmiotu.

## 7. TODO przed publikacją
1. Uzupełnić rzeczywiste dane podmiotu świadczącego usługi i odpowiednią informację o prywatności; e-mail właściciel poda później. Nie tworzyć fikcyjnych danych.
2. Potwierdzić dokładny pakiet OVHcloud, katalog docelowy, dostępny sposób przesłania plików i działanie HTTPS.
3. Zweryfikować treść prawną w źródłach urzędowych dla rzeczywistego zakresu przetwarzania. Brak analityki nie wyklucza logów hostingu.
4. Skonfigurować docelową domenę `gazglogow.pl`, przekierowania i status HTTP 404.
5. Dopiero wtedy ustawić `PUBLIC_SITE_LIVE=true`, ponownie zbudować, sprawdzić i opublikować zawartość `dist/`.
6. Po publikacji zweryfikować nagłówki HTTP, mobilne ładowanie, indeksowanie i dane terenowe wydajności.

## 8. Ważne decyzje
- Nazwa firmy nie została podana. „Usługi gazowe · Głogów” jest opisem, nie zmyśloną nazwą prawną. Komunikujemy zespół bez wymyślonej liczebności i doświadczenia.
- Obszar: dokładnie „Głogów i okolice”, bez fikcyjnego promienia lub listy miast.
- Hosting OVHcloud — nie rejestrowano i nie publikowano w Sites.
- Ferrari.com obejrzano w przeglądarce: inspiracja kontrastem, skalą obrazów i typografią, bez kopiowania logo, zdjęć, tekstów lub kodu.
- Właściciel zaakceptował dostępny Imagegen jako zamiennik niepotwierdzonego „ChatGPT Image 2.5”. Nie przypisujemy grafikom tej wersji modelu.
- Grafiki są ilustracjami, nie realizacjami. Brak fikcyjnych referencji, certyfikatów, cen i obietnic dostępności.
- Protokoły i inne dodatkowe czynności z pierwotnego briefu nie są rozszerzane w ofercie bez potwierdzenia.
- Brak zewnętrznych map, analityki, sklepu i formularza w V1; przyszłe funkcje nie mają pustych pozycji menu.
- Przed każdą kolejną sesją przeczytać README. Po większym etapie trzy realne review: UX >=8, Visual >=8, Developer PASS i brak znanych krytycznych błędów.

## 9. Znane problemy i weryfikacja
Brak znanych krytycznych błędów działającej V1 w sprawdzonym zakresie. Nie przeprowadzono wdrożenia w OVHcloud, testów na fizycznym iPhonie/Safari ani oceny rzeczywistych Core Web Vitals. Automatyczne axe nie zastępuje pełnego audytu dostępności.

- Astro check, lint i build: PASS w niezależnym review Quality Engineera.
- Testy statycznego builda: 4/4 PASS, 6 stron HTML.
- Home: 360/390/768/1024/1440 px, bez overflow i naruszeń axe, menu/Escape PASS.
- Pięć stron × 390/768/1440 px: 15 widoków PASS; konsola/sieć bez zgłoszonych błędów, reduced motion PASS.
- Klawiatura mobile/desktop, fokus, tekst 200%, działanie bez JavaScript i ruch wskaźnikowy: PASS.
- Końcowe review UX 9/10, Visual 8,5/10; szczegóły zakresu w REVIEW.md.
- Raporty: `qa/review.json`, `qa/final.json`, `qa/performance.json`.

## 10. Pomysły na później
Potwierdzone zakresy czynności i FAQ, O zespole, blog i baza wiedzy, własne wideo, materiały do pobrania, e-booki oraz oddzielnie zaprojektowana sprzedaż cyfrowa. Treści i komponenty są rozdzielone, aby można było je rozwijać bez przebudowy podstawowej oferty.
