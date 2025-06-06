import React, { useState } from 'react'; // Importera useState för FAQ-toggle
import { CheckCircle, Search, ShoppingCart, Utensils, Users, ShieldCheck } from "lucide-react";

// Importera dina bilder
import personEnjoyingMealImg from '../assets/person-enjoying-meal.jpg'; // Justera sökvägen om din assets-mapp ligger någon annanstans i src
import chefPreparingMealImg from '../assets/chef-preparing-meal.jpg';   // Justera sökvägen om din assets-mapp ligger någon annanstans i src

export default function HowItWorksPage() {
  // State för att hantera vilken FAQ-fråga som är öppen
  const [openFaq, setOpenFaq] = useState(null);

  const faqItems = [
    {
      id: "item-1",
      trigger: "Hur fungerar leveransen?",
      content: "HemmaTorg ansvarar för logistiken. När en beställning görs koordinerar vår plattform upphämtning från säljaren och leverans till köparen. Exakta detaljer och eventuella avgifter för leverans specificeras vid beställning."
    },
    {
      id: "item-2",
      trigger: "Är det säkert att köpa mat via HemmaTorg?",
      content: "Vi strävar efter en trygg plattform. Säljare verifieras med BankID. Vi uppmuntrar säljare att följa alla relevanta livsmedelslagar och hygienkrav. Köpare kan läsa recensioner för att få en uppfattning om säljarens kvalitet och pålitlighet. Vi arbetar kontinuerligt med att förbättra säkerheten."
    },
    {
      id: "item-3",
      trigger: "Hur hanteras betalningar?",
      content: "Betalningar sker säkert via plattformen med Swish eller kort (via Stripe). HemmaTorg håller pengarna tills leveransen är bekräftad och betalar sedan ut till säljaren, minus en serviceavgift."
    },
    {
      id: "item-4",
      trigger: "Vad kostar det att använda HemmaTorg?",
      content: "För köpare är det gratis att använda plattformen utöver kostnaden för maten och eventuell leveransavgift. För säljare tar HemmaTorg ut en serviceavgift per genomförd försäljning. Denna avgift hjälper oss att driva och utveckla plattformen, samt hantera logistik och support."
    }
  ];

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 py-8 px-4 md:px-0">
      <section className="text-center">
        <h1 className="text-4xl font-bold text-primary-main dark:text-primary-light mb-4">Så Funkar HemmaTorg!</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
          HemmaTorg är din plattform för att köpa och sälja hemlagad mat. Enkelt, tryggt och gott!
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-3xl font-semibold font-headline mb-4">För Köpare: Upptäck Lokala Smaker</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Trött på samma gamla take-away? Med HemmaTorg kan du enkelt hitta passionerade hemmakockar i ditt område och beställa unika, vällagade måltider direkt till din dörr.
          </p>
          <ul className="space-y-3">
            <li className="flex items-start">
              <Search className="h-6 w-6 text-primary-main mr-3 mt-1 shrink-0" />
              <span className="text-gray-700 dark:text-gray-300"><strong>Sök & Filtrera:</strong> Hitta maträtter baserat på plats, typ av mat, eller specifika kockar.</span>
            </li>
            <li className="flex items-start">
              <ShoppingCart className="h-6 w-6 text-primary-main mr-3 mt-1 shrink-0" />
              <span className="text-gray-700 dark:text-gray-300"><strong>Beställ Enkelt:</strong> Lägg din beställning direkt i appen och betala smidigt med Swish eller kort.</span>
            </li>
            <li className="flex items-start">
              <Utensils className="h-6 w-6 text-primary-main mr-3 mt-1 shrink-0" />
              <span className="text-gray-700 dark:text-gray-300"><strong>Njut av Hemlagat:</strong> Få maten levererad och njut av en äkta hemlagad måltid.</span>
            </li>
             <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-primary-main mr-3 mt-1 shrink-0" />
              <span className="text-gray-700 dark:text-gray-300"><strong>Lämna Omdöme:</strong> Hjälp andra köpare genom att betygsätta din upplevelse och maten.</span>
            </li>
          </ul>
        </div>
        <div>
          <img src={personEnjoyingMealImg} alt="Person som njuter av mat" className="rounded-lg shadow-xl" />
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-8 items-center">
         <div>
          <img src={chefPreparingMealImg} alt="Kock som lagar mat" className="rounded-lg shadow-xl md:order-first" />
        </div>
        <div className="md:order-last">
          <h2 className="text-3xl font-semibold font-headline mb-4">För Säljare: Dela Din Passion</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Älskar du att laga mat? HemmaTorg gör det enkelt att nå ut till hungriga kunder i ditt närområde och tjäna pengar på din talang.
          </p>
          <ul className="space-y-3">
            <li className="flex items-start">
              <Users className="h-6 w-6 text-primary-main mr-3 mt-1 shrink-0" />
              <span className="text-gray-700 dark:text-gray-300"><strong>Registrera Dig:</strong> Skapa ett säljarkonto snabbt och säkert med BankID.</span>
            </li>
            <li className="flex items-start">
              <Utensils className="h-6 w-6 text-primary-main mr-3 mt-1 shrink-0" />
              <span className="text-gray-700 dark:text-gray-300"><strong>Lista Dina Rätter:</strong> Lägg enkelt upp annonser för dina maträtter med bilder, priser och tillgänglighet.</span>
            </li>
            <li className="flex items-start">
              <ShoppingCart className="h-6 w-6 text-primary-main mr-3 mt-1 shrink-0" />
              <span className="text-gray-700 dark:text-gray-300"><strong>Hantera Beställningar:</strong> Få notiser om nya beställningar och hantera dem via plattformen.</span>
            </li>
             <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-primary-main mr-3 mt-1 shrink-0" />
              <span className="text-gray-700 dark:text-gray-300"><strong>Få Betalt:</strong> Vi hanterar betalningar och ser till att du får dina pengar tryggt och smidigt.</span>
            </li>
          </ul>
        </div>
      </section>
      
      <section>
        <h2 className="text-3xl font-semibold font-headline text-center mb-8">Vanliga Frågor (FAQ)</h2>
        <div className="space-y-4">
          {faqItems.map((item) => (
            <div key={item.id} className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <button
                onClick={() => toggleFaq(item.id)}
                className="w-full text-left py-3 px-1 font-semibold text-gray-800 dark:text-white hover:text-primary-main dark:hover:text-primary-light flex justify-between items-center"
              >
                {item.trigger}
                <span>{openFaq === item.id ? '-' : '+'}</span>
              </button>
              {openFaq === item.id && (
                <div className="pt-2 px-1 text-gray-700 dark:text-gray-300">
                  {item.content}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="text-center py-8">
        <div className="bg-pageTheme-card dark:bg-gray-700 inline-block p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-primary-main dark:text-primary-light flex items-center justify-center mb-3">
            <ShieldCheck className="h-8 w-8 mr-3 text-primary-main" /> Trygghet & Ansvar
          </h3>
            <p className="text-gray-700 dark:text-gray-300 max-w-xl mx-auto">
              Vi tar ansvar för att skapa en säker och pålitlig marknadsplats. Detta inkluderar att följa svensk lagstiftning gällande livsmedelshantering, e-handel och dataskydd (GDPR). Vi uppmanar alla användare att bekanta sig med våra riktlinjer och villkor.
            </p>
        </div>
      </section>
    </div>
  );
}
