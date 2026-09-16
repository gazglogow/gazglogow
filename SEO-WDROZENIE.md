# SEO — gazglogow.pl, 16 września 2026

## Najważniejszy wynik audytu
Publiczna strona odpowiada HTTP 200 z Netlify, ale zawiera `noindex, nofollow`, a robots.txt ma `Disallow: /`. To blokuje indeksowanie treści. Samo poprawienie tekstów nie usuwa tej przeszkody. Odczyt wykonano 16.09.2026. Zmiany lokalne nie oznaczają jeszcze publikacji.

## Gotowa wersja
`pnpm build:live` tworzy `output/seo-production/`: 8 stron treści ze zgodą na indeksowanie, stronę błędu 404 z noindex, mapę witryny, plik robots.txt i zasoby. Zmieniono tytuł i opis strony głównej, doprecyzowano nazwy usług, dodano dane Service, WebSite i BreadcrumbList oraz linkowanie z FAQ i bloga do oferty. Zachowano dotychczasowe adresy URL. Nie dodawano fikcyjnego adresu, ocen, certyfikatów ani niepotwierdzonych usług.

Frazy i strony docelowe:
- przeglądy instalacji gazowych Głogów → `/uslugi/przeglady-instalacji-gazowych/`
- usługi gazowe Głogów, gaz Głogów → `/`
- podłączanie urządzeń gazowych Głogów → `/uslugi/podlaczanie-urzadzen-gazowych/`
- próby szczelności instalacji gazowych Głogów → `/uslugi/proby-szczelnosci/`
- opinie techniczne instalacji gazowych Głogów → `/uslugi/opinie-techniczne/`

## Publikacja na istniejącym projekcie Netlify
Jeśli witryna jest publikowana ręcznie, rozpakuj `pobierz/gazglogow-netlify-seo.zip` i prześlij zawartość do sekcji Deploys ISTNIEJĄCEGO projektu obsługującego gazglogow.pl. Nie twórz nowej witryny. W głównym katalogu powinny znajdować się index.html, robots.txt, sitemap.xml, _redirects i katalogi zasobów.

Jeśli projekt buduje się z repozytorium, opublikuj zmienione źródła wraz z netlify.toml. Konfiguracja ustawia `PUBLIC_SITE_LIVE=true` tylko dla produkcji; podglądy pozostają noindex. Lokalny `pnpm build` nadal służy do wersji podglądowej. Sprawdź, czy ustawienia projektu Netlify nie nadpisują konfiguracji. Domeną główną powinna być https://gazglogow.pl; www ma prowadzić przekierowaniem 301 do domeny bez www. Certyfikat musi obejmować obie wersje. Nie dodawaj reguły przekierowującej wszystkie nieznane adresy na index.html z kodem 200.

Po publikacji sprawdź w Internecie:
1. Strona główna i cztery usługi: HTTP 200, brak noindex także w nagłówku X-Robots-Tag.
2. https://gazglogow.pl/robots.txt: Allow: / i adres sitemap.xml.
3. https://gazglogow.pl/sitemap.xml: osiem poprawnych adresów HTTPS.
4. Losowy nieistniejący adres: rzeczywisty HTTP 404.
5. www i HTTP: przekierowanie na główny adres HTTPS bez pętli.

## Google Search Console — po publikacji
Otwórz https://search.google.com/search-console i wybierz istniejącą usługę domeny. Jeśli jej nie ma, dodaj usługę „Prefiks adresu URL” https://gazglogow.pl/ i zweryfikuj własność. Przy metodzie meta tagu wklej sam otrzymany token w `PUBLIC_GOOGLE_SITE_VERIFICATION` i wykonaj nowy build. Możliwa jest też weryfikacja domeny rekordem DNS zgodnie z instrukcją Google. Nie przesyłaj haseł w rozmowie.

W sekcji Mapy witryn zgłoś https://gazglogow.pl/sitemap.xml. W „Sprawdzenie adresu URL” sprawdź stronę główną i cztery strony usług, wykonaj test wersji opublikowanej i wybierz „Poproś o zindeksowanie”. Wielokrotne zgłaszanie tego samego adresu nie przyspiesza sprawy. Nie używaj Indexing API przeznaczonego dla innych typów treści.

## Lokalne pozycjonowanie
Uzupełnij i zweryfikuj istniejący Profil Firmy w Google: rzeczywista nazwa, telefon 530 366 668, adres witryny, zgodne z prawdą usługi, godziny i obsługiwany obszar. Gdy firma wyłącznie dojeżdża do klientów, skonfiguruj profil zgodnie z zasadami dla firm obsługujących obszar. Dodaj autentyczne zdjęcia i poproś rzeczywistych klientów o uczciwe opinie, bez kupowania recenzji. Brak danych firmy w projekcie nie pozwala rzetelnie uzupełnić profilu ani pełnych danych LocalBusiness.

Po 7–14 dniach sprawdź raport indeksowania. Przez kolejne tygodnie obserwuj wyświetlenia, kliknięcia i frazy w Search Console. Rozwijaj treść na podstawie faktycznych pytań klientów i potwierdzonego zakresu usług; nie twórz sztucznych kopii stron dla okolicznych miejscowości.

Google nie gwarantuje terminu indeksacji ani pozycji. Pobranie nowych stron może zająć od kilku dni do kilku tygodni:
https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl

Oficjalne wskazówki lokalne:
https://support.google.com/business/answer/7091?hl=pl
