export interface Excursion {
  id: string;
  title: string;
  location: string;
  duration: string;
  price: string;
  rating: number;
  reviewsCount: number;
  shortDescription: string;
  description: string;
  image: string;
  images: string[];
  included: string[];
  notIncluded: string[];
  program: {
    title: string;
    description: string;
  }[];
  meetingPoint: string;
  availableDays: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const EXCURSIONS: Excursion[] = [
  {
    id: "sahara-luxury-expedition",
    title: "Sahara Desert Luxury Expedition",
    location: "Merzouga Dunes",
    duration: "3 Days, 2 Nights",
    price: "450 € / person",
    rating: 4.9,
    reviewsCount: 128,
    shortDescription: "Journey deep into the golden sands of Merzouga. Stay in a luxury desert camp, ride camels at sunset, and sleep under a canopy of stars.",
    description: "Embark on an extraordinary luxury journey into the heart of the Sahara Desert. This curated experience takes you from the bustling streets of Marrakesh, through the dramatic High Atlas Mountains and the stunning Dadès Valley, culminating in the majestic golden dunes of Merzouga. You will stay in a boutique desert camp featuring private canvas suites, exquisite Moroccan cuisine, and traditional Gnaoua music around a campfire under the pristine desert night sky.",
    image: "/images/21a923029795828bde02c6ff404ebc43.jpg",
    images: [
      "/images/21a923029795828bde02c6ff404ebc43.jpg",
      "/images/ba37df9f1bdc0dd2be18ad604b091c83.jpg",
      "/images/4d0f972a84504bcfd079bceb2752c1a9.jpg",
      "/images/90796b9d58a872ea60be4e29b31ecf42.jpg"
    ],
    included: [
      "Luxury private AC transport with English-speaking driver",
      "2 nights in boutique desert camp & traditional kasbah hotels",
      "Private canvas suite with en-suite bathroom",
      "Daily breakfast and dinner, including a private dunes dinner",
      "Camel trekking guide and sandboarding gear",
      "Authentic Moroccan tea, refreshments, and mineral water"
    ],
    notIncluded: [
      "Midday lunches and snacks",
      "Personal travel insurance",
      "Driver/Guide tips (optional but recommended)"
    ],
    program: [
      {
        title: "Day 1: High Atlas & Ait Benhaddou",
        description: "Cross the magnificent Tizi n'Tichka pass in the High Atlas Mountains. Visit the UNESCO World Heritage Kasbah Ait Benhaddou, followed by a scenic drive to the Dadès Valley for dinner and an overnight stay in a boutique kasbah hotel."
      },
      {
        title: "Day 2: Todra Gorges & Golden Dunes",
        description: "Explore the towering cliffs of Todra Gorges before driving towards the desert. Arrive in Merzouga, mount your camel for a sunset ride over the dunes, and settle into your premium desert camp for live music and starlight."
      },
      {
        title: "Day 3: Sunrise Trek & Return Journey",
        description: "Wake early for a magical desert sunrise. After a fresh nomadic breakfast, begin the comfortable return journey through Draa Valley and Ouarzazate, arriving back in Marrakesh by early evening."
      }
    ],
    meetingPoint: "Complimentary pickup from your hotel or riad in Marrakesh.",
    availableDays: ["Monday", "Wednesday", "Friday", "Sunday"],
    faqs: [
      {
        question: "Is there electricity and Wi-Fi in the desert camp?",
        answer: "Yes, our luxury camp features complete solar electricity with USB charging in each tent. High-speed Wi-Fi is available in the main lounge tent."
      },
      {
        question: "What should I pack for the Sahara?",
        answer: "We recommend comfortable loose clothing for the day, sunglasses, sunscreen, and a warm layer for the evening, as desert temperatures drop significantly at night."
      }
    ]
  },
  {
    id: "marrakesh-hidden-palaces",
    title: "Marrakesh Hidden Palaces & Riad Tour",
    location: "Marrakesh Medina",
    duration: "1 Day (6 Hours)",
    price: "85 € / person",
    rating: 4.8,
    reviewsCount: 94,
    shortDescription: "Uncover the secret courtyards, opulent riads, and historic architectural marvels hidden inside the ancient red city.",
    description: "Delve deep into the rich cultural heritage of Marrakesh on a private guided walking tour. Skip the common tourist traps and discover the breathtaking design details of Bahia Palace, the Saadian Tombs, and secret 14th-century riads hidden behind unassuming medina walls. Conclude the day with a traditional tea ceremony overlooking the vibrant Jemaa el-Fnaa square.",
    image: "/images/9473448822cac42212573037f6eb2c13.jpg",
    images: [
      "/images/9473448822cac42212573037f6eb2c13.jpg",
      "/images/d006c3f0cbaafc98e2721c6c0fff9a71.jpg",
      "/images/58185611c0c71e7d2f6e51130d330c78.jpg"
    ],
    included: [
      "Certified local historian guide (English, French, or Spanish)",
      "All palace and historic monument entrance tickets",
      "Traditional Moroccan mint tea and pastries at a luxury rooftop",
      "Customized medina shopping assistance (no-commission guarantee)"
    ],
    notIncluded: [
      "Lunch meals",
      "Hotel drop-off (the tour finishes at Jemaa el-Fnaa)"
    ],
    program: [
      {
        title: "Morning: Royal Heritage & Bahia Palace",
        description: "Begin with a guided walk through the old Jewish quarter (Mellah) and explore the stunning Andalusian-Moroccan mosaic work and gardens of Bahia Palace."
      },
      {
        title: "Midday: Saadian Tombs & Secret Garden",
        description: "Visit the highly preserved mausoleums of the Saadian dynasty, then wander through the tranquil oasis of Le Jardin Secret, a beautifully restored historical palace garden."
      },
      {
        title: "Afternoon: Souks & Rooftop Tea",
        description: "Wind through the sensory alleys of the spice market and artisanal souks. Finish with a relaxing tea ceremony overlooking Djemaa El Fna as the sun goes down."
      }
    ],
    meetingPoint: "Cafe de France at Jemaa el-Fnaa square or your Medina hotel entrance.",
    availableDays: ["Daily"],
    faqs: [
      {
        question: "Is this tour suitable for families?",
        answer: "Absolutely. The tour is conducted at a relaxed pace with plenty of shade and rest stops. We can also customize the route for stroller accessibility."
      }
    ]
  },
  {
    id: "atlas-mountains-berber-villages",
    title: "Atlas Mountains & Berber Villages",
    location: "Ourika Valley",
    duration: "1 Day (8 Hours)",
    price: "110 € / person",
    rating: 4.9,
    reviewsCount: 162,
    shortDescription: "Escape the heat of the city. Hike along terraced fields, visit authentic Berber homes, and witness stunning mountain waterfalls.",
    description: "Discover the rugged beauty and timeless traditions of the High Atlas Mountains. In this private excursion, travel through scenic valleys of walnut trees and terraced fields. Connect with the local indigenous culture by sharing home-cooked tagine in a traditional Berber mud-brick house and take in panoramic mountain vistas during a guided trek.",
    image: "/images/ebbd997c629028da042d05fec5307e28.jpg",
    images: [
      "/images/ebbd997c629028da042d05fec5307e28.jpg",
      "/images/83fe408561c34a615be5045f1fda14e7.jpg",
      "/images/a5c28e6e72285242a2aa815bdca1b9f8.jpg"
    ],
    included: [
      "Private transportation in luxury 4x4 vehicle",
      "Experienced local Berber mountain guide",
      "Authentic three-course lunch inside a Berber family home",
      "Traditional tea preparation demonstration"
    ],
    notIncluded: [
      "Mules or donkey hire (available locally if needed)",
      "Personal items and tip for the guides"
    ],
    program: [
      {
        title: "09:00 - Depart Marrakesh",
        description: "Enjoy a scenic drive past olive groves and olive oil mills, climbing up into the mountain foothills."
      },
      {
        title: "11:30 - Village Walk & Hike",
        description: "Embark on an easy-to-moderate walk through the terraced village of Imlil or Ourika, learning about native irrigation systems and farming."
      },
      {
        title: "13:30 - Panoramic Berber Lunch",
        description: "Enjoy a delicious, hot, slow-cooked tagine on a mountain-view terrace hosted by a local family."
      }
    ],
    meetingPoint: "Direct pickup and drop-off at your hotel or riad.",
    availableDays: ["Daily"],
    faqs: [
      {
        question: "How difficult is the hike?",
        answer: "The walk is tailored to your fitness level, ranging from a gentle 45-minute stroll to a 3-hour panoramic mountain hike. Good sneakers are recommended."
      }
    ]
  },
  {
    id: "chefchaouen-blue-city-wanderlust",
    title: "Chefchaouen Blue City Wanderlust",
    location: "Rif Mountains",
    duration: "2 Days, 1 Night",
    price: "290 € / person",
    rating: 4.7,
    reviewsCount: 81,
    shortDescription: "Wander through the peaceful blue-washed streets of Chefchaouen, nestled in the scenic Rif Mountains.",
    description: "Immerse yourself in the dreamlike environment of Chefchaouen, Morocco's famous 'Blue Pearl'. Surrounded by the Rif Mountains, this Spanish-influenced city is famous for its gorgeous blue-washed buildings, quaint cafes, and bohemian atmosphere. Walk the cobblestone paths, photograph the vibrant doors, and watch the sunset from the Spanish Mosque.",
    image: "/images/ba37df9f1bdc0dd2be18ad604b091c83.jpg",
    images: [
      "/images/ba37df9f1bdc0dd2be18ad604b091c83.jpg",
      "/images/9c96621136d86eff926346566f15c46b.jpg"
    ],
    included: [
      "Private luxury transport with Wi-Fi",
      "1 night in a premium traditional Blue Riad",
      "Gourmet breakfast",
      "Guided architectural and photography walk"
    ],
    notIncluded: [
      "Lunches and dinners",
      "Local entry fees to the Kasbah Museum"
    ],
    program: [
      {
        title: "Day 1: Arrival & Sunset Mosque Walk",
        description: "Travel from Fes or Tangier, arriving in the afternoon. Check in to your riad and take a peaceful hike to the hilltop Spanish Mosque for a panoramic sunset view of the blue valley."
      },
      {
        title: "Day 2: Medina Exploration & Return",
        description: "Spend the morning exploring the famous blue streets, Outa el-Hammam square, and shopping for unique northern wool crafts before the return drive."
      }
    ],
    meetingPoint: "Pick up at Fes, Tangier, or Casablanca airport / lodging.",
    availableDays: ["Tuesday", "Thursday", "Saturday"],
    faqs: [
      {
        question: "Why is the city painted blue?",
        answer: "Historically, Jewish refugees painted the streets blue to symbolize heaven and spiritual connection. The tradition is proudly kept alive by residents today."
      }
    ]
  },
  {
    id: "essaouira-coastal-breeze",
    title: "Essaouira Coastal Breeze & Seafood Tour",
    location: "Essaouira Coast",
    duration: "1 Day (9 Hours)",
    price: "95 € / person",
    rating: 4.8,
    reviewsCount: 104,
    shortDescription: "Stroll along the historic sea walls, watch woodcarvers at work, and feast on fresh fish in this laidback seaside town.",
    description: "Trade the heat of inland Morocco for the cool sea breeze of Essaouira. Formerly known as Mogador, this historic fort town features whitewashed houses with blue shutters, a fishing port filled with traditional wooden boats, and stone sea ramparts. Sample delicious grilled fish right on the docks and discover the town's legendary Gnawa music heritage.",
    image: "/images/5e62eda121c40addb993ddb2dd9872df.jpg",
    images: [
      "/images/5e62eda121c40addb993ddb2dd9872df.jpg",
      "/images/c3b2e91733fda25bac6a96ab45c7b887.jpg",
      "/images/44243ec8487904499ca5f599716bad7d.jpg"
    ],
    included: [
      "Round-trip private luxury vehicle transport",
      "English-speaking professional driver",
      "Fresh seafood lunch at the port grill stalls",
      "Argan oil cooperative visit en-route"
    ],
    notIncluded: [
      "Optional water sports (surfing, kitesurfing)",
      "Local tipping"
    ],
    program: [
      {
        title: "08:30 - Atlantic Roadtrip",
        description: "Depart Marrakesh towards the coast. Catch a glimpse of the famous goats climbing argan trees on the route."
      },
      {
        title: "11:00 - Port & Medina Exploration",
        description: "Explore the bustling blue harbor, the historic Portuguese Skala sea walls, and browse the local thuya wood galleries."
      },
      {
        title: "13:00 - Portside Seafood Lunch",
        description: "Savor a freshly caught, grilled fish lunch on the harbor docks, seasoned with authentic local spices."
      }
    ],
    meetingPoint: "Complimentary hotel pickup and drop-off.",
    availableDays: ["Daily"],
    faqs: [
      {
        question: "Is Essaouira windy?",
        answer: "Yes, Essaouira is known as the 'Wind City of Africa' and can get breezy. We recommend bringing a light windbreaker jacket."
      }
    ]
  }
];
