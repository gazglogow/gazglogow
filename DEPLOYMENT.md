# Wdrożenie — OVHcloud

Aktualny build jest wersją roboczą z noindex. Nie wysłano plików na publiczny hosting. Nie zmieniano DNS ani konta OVHcloud.

## Co trzeba ustalić
Pakiet hostingu i katalog przypisany domenie gazglogow.pl, działający certyfikat TLS, dostęp do przesłania plików oraz rzeczywiste dane podmiotu do stopki i informacji o prywatności. E-mail jest niepodany; kontakt telefoniczny działa bez niego. Nie przesyłać haseł w rozmowie.

## Przygotowanie
1. Uzupełnić rzeczywiste dane właściciela i dopasować informację o prywatności do faktycznego hostingu oraz użytych funkcji.
2. Zbudować i przejrzeć stronę lokalnie. Dopiero gdy treść oraz hosting są gotowe, ustawić PUBLIC_SITE_LIVE=true w lokalnym środowisku budowania.
3. Uruchomić check, lint i build. Testy tests/build.test.mjs świadomie weryfikują build roboczy noindex; wersję publiczną należy dodatkowo sprawdzić pod kątem index/follow wyłącznie dla stron treści i noindex dla 404.
4. Na hosting przesłać wyłącznie zawartość dist/, nie repozytorium, .env, node_modules, qa ani oryginały grafik. Statyczny wynik nie potrzebuje serwera Node na hostingu.

OVHcloud opisuje publikację plików przez FTP/SFTP i dobór katalogu w [instrukcji publikowania strony](https://docs.ovhcloud.com/en/guides/web-cloud/web-hosting/hosting-how-to-get-my-website-online). Sposób użycia zależy od zakupionego pakietu.

## Konfiguracja docelowa
- Docelowy adres: https://gazglogow.pl/; www powinno przekierowywać do tej wersji.
- Włączyć HTTPS przed wymuszeniem przekierowania. [Dokumentacja OVHcloud HTTPS](https://docs.ovhcloud.com/en/guides/web-cloud/web-hosting/ssl-activate-https-website).
- Jeżeli pakiet obsługuje Apache/.htaccess, po sprawdzeniu jego konfiguracji ustawić własną stronę błędu 404, wyłączyć listowanie katalogów i skonfigurować przekierowania. Nie nadpisywać istniejącego .htaccess bez inspekcji. [Dokumentacja reguł OVHcloud](https://docs.ovhcloud.com/en/guides/web-cloud/web-hosting/htaccess-url-rewriting-using-mod-rewrite).
- Dla wersjonowanych zasobów _astro można ustawić długi cache; HTML powinien móc być szybko aktualizowany. Dobór nagłówków, kompresji i zabezpieczeń sprawdzić na rzeczywistym hostingu.
- Brak analityki i formularza w V1 nie oznacza braku logów po stronie hostingu. Zakres informacji o prywatności zweryfikować przed publicznym uruchomieniem.

## Odbiór publicznego wdrożenia
Zweryfikować HTTPS i przekierowania bez pętli, statusy 200 stron treści i rzeczywisty 404 błędnej ścieżki, canonical/sitemap, robots i meta robots, brak konsoli/sieci błędów, tel:+48530366668, mobilne menu i obrazy oraz brak ujawnionych plików źródłowych. Dopiero po publikacji zbierać rzeczywiste dane wydajności. Nie obiecywać pozycji w Google.
