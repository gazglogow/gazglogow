# Rekomendowany plan — do akceptacji

## Dane i cel
Usługi gazowe · Głogów (opis, nie wymyślona nazwa firmy). Głogów i okolice. Telefon 530 366 668. Domena gazglogow.pl, hosting OVHcloud w trakcie zakupu. Głównie klienci prywatni, także zarządcy, wspólnoty i firmy. Konwersja: połączenie telefoniczne w sprawie usługi.

## Analiza treści konkurencji i inspiracji — 2026-09-14
- https://www.zych-instalacje.pl/ — lokalna firma prezentuje wiele branż instalacyjnych, menu oferta/realizacje/kontakt i telefon. Wniosek dla naszego projektu: skoncentrować komunikat na czterech usługach gazowych, ułatwiając rozpoznanie konkretnej potrzeby.
- https://bart-gaz.pl/ — wynik wyszukiwania wskazuje lokalną ofertę projektowania, wykonawstwa, nadzoru i przeglądów. Otwarcie strony zwróciło 403; nie wykonano pełnego audytu tej strony.
- https://domgas.pl/ — inspiracja spoza lokalnego rynku: usługa, miasto i telefon blisko otwarcia; osobne opisy usług i pytania. Wniosek: skrócić ścieżkę kontaktu. Nie przenosić deklaracji uprawnień, cen, czasu realizacji, dokumentacji ani twierdzeń prawnych. W odczytanej treści występuje placeholder mapy — unikać nieukończonych elementów.

Analiza dotyczy dostępnej treści i struktury, nie pomiarów konwersji, szybkości ani wizualnego audytu przeglądarkowego. Nie kopiować kompozycji i tekstów konkurencji.

## Mapa strony i menu
V1: strona główna oraz cztery podstrony usług:
- /uslugi/przeglady-instalacji-gazowych/
- /uslugi/podlaczanie-urzadzen-gazowych/
- /uslugi/proby-szczelnosci/
- /uslugi/opinie-techniczne/

Menu: Usługi, Dla kogo, Jak zamówić, Kontakt. Sekcje wskazywane kotwicami strony głównej, także z podstron. Telefon stale łatwy do znalezienia. Stopka z danymi podmiotu i informacją o prywatności przygotowaną odpowiednio do rzeczywistego wdrożenia przed publikacją; brakujące dane nie będą zmyślane.

## Strona główna
1. Hero: „Przeglądy i usługi gazowe”, lokalizacja „Głogów i okolice”, krótka lista zakresu i CTA „Zadzwoń: 530 366 668”. Drugorzędny link do usług.
2. Oferta: wyróżniony przegląd instalacji; podłączanie urządzeń, próby szczelności i opinie techniczne z własnymi podstronami.
3. Dla kogo: osoby prywatne, zarządcy i wspólnoty, firmy. Bez obietnic niepotwierdzonej skali obsługi.
4. Jak zamówić: kontakt, omówienie zakresu, ustalenie terminu. Bez gwarancji dostępności.
5. Obszar i kontakt: Głogów i okolice, telefon, e-mail po otrzymaniu. Bez pozornego formularza.

## Styl, obrazy i ruch
„Precyzja i spokój”: grafit/granat, jasne neutralne powierzchnie, oszczędny bursztyn dla CTA. Czytelna typografia bezszeryfowa z polskimi znakami, asymetryczny pierwszy ekran, spokojniejsze sekcje oferty. Bez fikcyjnych odznak, referencji czy doświadczenia.

Jedna główna generowana kompozycja przestrzenna z metalowymi materiałami, bez osób, napisów i instruktażowego układu instalacji. Drugi detal tylko jeśli wnosi wartość. Obrazy ilustracyjne, nie realizacje firmy. Dostępny Imagegen proponowany jako zamiennik niepotwierdzonego ChatGPT Image 2.5 — wymaga zgody wraz z planem. Żądanie najwyższej dostępnej jakości w granicach narzędzia, bez deklaracji nieujawnionego modelu lub parametrów. Zachować oryginały i zoptymalizować pliki publikacyjne.

Rzeczywista głębia przez warstwy i perspektywę CSS; tekst i CTA nieruchome. Subtelne transformacje kart i pojawianie sekcji. Bez przejmowania przewijania. Mobile bez tilt, ograniczony ruch; prefers-reduced-motion daje statyczną, kompletną treść. Fokus i kontrast weryfikowane.

## Technika i SEO
Rekomendacja: Astro z TypeScript, statyczny HTML, współdzielone komponenty, oddzielone treści usług, minimalny JavaScript i CSS bez ciężkiej biblioteki 3D. Dokumentacja wdrożenia: https://docs.astro.build/en/guides/deploy/. Pliki wynikowe przygotowane do hostingu OVHcloud; sposób przesłania i konfiguracja zależne od zakupionego pakietu. Brak rejestracji w Sites.

V1 telefoniczna, bez formularza, analityki i osadzanych zewnętrznych multimediów. Późniejszy formularz wymaga działającej integracji i testu wysyłki. Rozszerzenia blog/baza wiedzy przez kolekcje treści; sprzedaż cyfrowa osobnym etapem.

Unikalne tytuły i opisy czterech usług z naturalnym wskazaniem Głogowa, semantyczne nagłówki, linkowanie wewnętrzne, sitemap, canonical gazglogow.pl po publikacji. Podgląd roboczy nieindeksowany. Dane strukturalne wyłącznie z prawdziwych danych firmy; bez zmyślonego adresu i ocen. Bez masowych stron miejscowości. Twierdzenia prawne i treść prywatności zweryfikować w źródłach urzędowych pod rzeczywisty zakres przed publikacją.

## Etapy i kontrola
1. Fundament i system wizualny.
2. Hero i nawigacja.
3. Oferta, podstrony i sekcje.
4. Kontakt i dane wymagane do publikacji.
5. Obrazy, ruch i dopracowanie.
6. Końcowy audyt i paczka do publikacji na OVHcloud.

Każdy istotny etap: osobne review UX i Creative >=8/10, Quality PASS, brak znanych błędów krytycznych. Build, kontrola typów, lint oraz dostępne adekwatne testy; szerokości 360/390/768/1024/1440, klawiatura, reduced motion, konsola, linki i zasoby. Wyniki laboratoryjne wydajności nie są rzeczywistymi Core Web Vitals. README aktualizowany po zmianach.

## Review planu
UX Designer: 9/10; pilnować kotwic z podstron, kontaktu mobile, precyzyjnego zakresu i niewymyślonego regionu.
Creative Director: 9/10; nieruchome teksty/CTA, autorska kompozycja, drugi obraz tylko celowy.
Quality Engineer: PASS dla planu. Przed publikacją potwierdzić pakiet OVHcloud, HTTPS, przekierowania i dane podmiotu. Testować również dotyk, powiększenie tekstu i brak zależności od hover; brak analityki nie wyklucza przetwarzania przez hosting. To oceny planu, nie działającej strony. Kod, build i testy jeszcze nie istnieją.

