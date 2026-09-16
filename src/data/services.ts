export interface Service {
  slug: string;
  number: string;
  title: string;
  short: string;
  description: string;
  intro: string;
  details: string;
  prepare: string[];
}
export const services: Service[] = [
  {
    slug: 'przeglady-instalacji-gazowych', number: '01', title: 'Przeglądy instalacji gazowych',
    short: 'Przegląd instalacji w Twoim domu lub nieruchomości, którą zarządzasz.',
    description: 'Przeglądy instalacji gazowych w Głogowie i okolicach. Obsługa klientów prywatnych, wspólnot i firm. Ustal zakres i termin: 530 366 668.',
    intro: 'Zadbaj o kontrolę swojej instalacji.',
    details: 'Wykonujemy przeglądy instalacji gazowych w Głogowie i okolicach. Przyjmujemy zgłoszenia od właścicieli mieszkań i domów, zarządców nieruchomości, wspólnot oraz firm. Podczas rozmowy ustalimy zakres zlecenia i możliwy termin.',
    prepare: ['Miejscowość i rodzaj obiektu: mieszkanie, dom lub budynek.', 'Czy zgłoszenie dotyczy jednego lokalu, czy większej nieruchomości.', 'Preferowany termin przeglądu.'],
  },
  {
    slug: 'podlaczanie-urzadzen-gazowych', number: '02', title: 'Podłączanie urządzeń gazowych',
    short: 'Nowe urządzenie? Omów z nami jego podłączenie do instalacji gazowej.',
    description: 'Podłączanie urządzeń gazowych — Głogów i okolice. Zadzwoń, opisz urządzenie i ustal możliwość realizacji: 530 366 668.',
    intro: 'Nowe urządzenie. Przemyślane podłączenie.',
    details: 'Planujesz podłączenie odbiornika gazu? Skontaktuj się z nami i opowiedz, jakiego urządzenia dotyczy zlecenie. Podczas rozmowy potwierdzimy możliwość realizacji i ustalimy szczegóły wizyty w Głogowie lub okolicach.',
    prepare: ['Rodzaj i model urządzenia, jeśli jest znany.', 'Czy chodzi o nowe podłączenie, czy wymianę urządzenia.', 'Miejscowość, w której ma zostać wykonana usługa.'],
  },
  {
    slug: 'proby-szczelnosci', number: '03', title: 'Próby szczelności instalacji gazowych',
    short: 'Próby szczelności instalacji gazowych — zakres dopasowany do zlecenia.',
    description: 'Próby szczelności instalacji gazowych w Głogowie i okolicach. Omów swoją sprawę i ustal termin telefonicznie: 530 366 668.',
    intro: 'Szczelność ma znaczenie.',
    details: 'Wykonujemy próby szczelności instalacji gazowych. Zadzwoń, aby omówić sytuację, w której potrzebujesz tej usługi. Ustalimy zakres zlecenia oraz możliwy termin realizacji w Głogowie i okolicach.',
    prepare: ['Lokalizacja i rodzaj obiektu.', 'Powód zamówienia próby, opisany własnymi słowami.', 'Termin, w którym potrzebujesz usługi.'],
  },
  {
    slug: 'opinie-techniczne', number: '04', title: 'Opinie techniczne instalacji gazowych',
    short: 'Potrzebujesz opinii dotyczącej instalacji gazowej? Omówmy Twoją sprawę.',
    description: 'Opinie techniczne dotyczące instalacji gazowych — Głogów i okolice. Zadzwoń, aby omówić przedmiot i cel opinii: 530 366 668.',
    intro: 'Techniczne spojrzenie na Twoją sprawę.',
    details: 'Przygotowujemy opinie techniczne dotyczące instalacji gazowych. Każde zapytanie wymaga określenia przedmiotu i celu opinii. Opisz swoją sprawę podczas rozmowy — ustalimy, czy możemy pomóc i jakich informacji będziemy potrzebować.',
    prepare: ['Czego dotyczy opinia i do jakiego celu jest potrzebna.', 'Lokalizacja nieruchomości.', 'Czy obowiązuje konkretny termin.'],
  },
];
