const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

const EXCURSIONS_SEED = [
  {
    slug: "sahara-luxury-expedition",
    title: "Sahara Desert Luxury Expedition",
    location: "Merzouga Dunes",
    duration: "3 Days, 2 Nights",
    price: "450 € / person",
    shortDescription: "Journey deep into the golden sands of Merzouga. Stay in a luxury desert camp, ride camels at sunset, and sleep under a canopy of stars.",
    description: "Embark on an extraordinary luxury journey into the heart of the Sahara Desert. This curated experience takes you from the bustling streets of Marrakesh, through the dramatic High Atlas Mountains and the stunning Dadès Valley, culminating in the majestic golden dunes of Merzouga. You will stay in a boutique desert camp featuring private canvas suites, exquisite Moroccan cuisine, and traditional Gnaoua music around a campfire under the pristine desert night sky.",
    featuredImage: "/images/21a923029795828bde02c6ff404ebc43.jpg",
    galleryImages: [
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
    excluded: [
      "Midday lunches and snacks",
      "Personal travel insurance",
      "Driver/Guide tips (optional but recommended)"
    ],
    itinerary: [
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
    featured: true,
    published: true
  },
  {
    slug: "marrakesh-hidden-palaces",
    title: "Marrakesh Hidden Palaces & Riad Tour",
    location: "Marrakesh Medina",
    duration: "1 Day (6 Hours)",
    price: "85 € / person",
    shortDescription: "Uncover the secret courtyards, opulent riads, and historic architectural marvels hidden inside the ancient red city.",
    description: "Delve deep into the rich cultural heritage of Marrakesh on a private guided walking tour. Skip the common tourist traps and discover the breathtaking design details of Bahia Palace, the Saadian Tombs, and secret 14th-century riads hidden behind unassuming medina walls. Conclude the day with a traditional tea ceremony overlooking the vibrant Jemaa el-Fnaa square.",
    featuredImage: "/images/9473448822cac42212573037f6eb2c13.jpg",
    galleryImages: [
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
    excluded: [
      "Lunch meals",
      "Hotel drop-off (the tour finishes at Jemaa el-Fnaa)"
    ],
    itinerary: [
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
    featured: true,
    published: true
  },
  {
    slug: "atlas-mountains-berber-villages",
    title: "Atlas Mountains & Berber Villages",
    location: "Ourika Valley",
    duration: "1 Day (8 Hours)",
    price: "110 € / person",
    shortDescription: "Escape the heat of the city. Hike along terraced fields, visit authentic Berber homes, and witness stunning mountain waterfalls.",
    description: "Discover the rugged beauty and timeless traditions of the High Atlas Mountains. In this private excursion, travel through scenic valleys of walnut trees and terraced fields. Connect with the local indigenous culture by sharing home-cooked tagine in a traditional Berber mud-brick house and take in panoramic mountain vistas during a guided trek.",
    featuredImage: "/images/ebbd997c629028da042d05fec5307e28.jpg",
    galleryImages: [
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
    excluded: [
      "Mules or donkey hire (available locally if needed)",
      "Personal items and tip for the guides"
    ],
    itinerary: [
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
    featured: true,
    published: true
  }
];

const GALLERY_SEED = [
  { title: "Golden Dunes at Sunset", category: "Desert", image: "/images/21a923029795828bde02c6ff404ebc43.jpg", featured: true },
  { title: "Chefchaouen Blue Street", category: "Medina", image: "/images/ba37df9f1bdc0dd2be18ad604b091c83.jpg", featured: true },
  { title: "Luxury Sahara Camp Lounge", category: "Desert", image: "/images/4d0f972a84504bcfd079bceb2752c1a9.jpg", featured: true }
];

const TESTIMONIALS_SEED = [
  {
    fullName: "Elena & Marcus",
    country: "Vienna, Austria",
    rating: 5,
    comment: "Rihla Morocco provided the most magical experience in Merzouga. The luxury desert camp was beyond description, and our private guide made us feel completely at home.",
    featured: true
  },
  {
    fullName: "David L.",
    country: "London, UK",
    rating: 4.8,
    comment: "Everything from the initial WhatsApp confirmation to the final drop-off was flawless. The driver was knowledgeable and the private Mercedes van was extremely comfortable.",
    featured: true
  }
];

async function seed() {
  console.log("Seeding excursions...");
  for (const exc of EXCURSIONS_SEED) {
    await prisma.excursion.upsert({
      where: { slug: exc.slug },
      update: exc,
      create: exc
    });
  }

  console.log("Seeding gallery...");
  for (const img of GALLERY_SEED) {
    const existing = await prisma.galleryImage.findFirst({ where: { title: img.title } });
    if (!existing) {
      await prisma.galleryImage.create({ data: img });
    }
  }

  console.log("Seeding testimonials...");
  for (const t of TESTIMONIALS_SEED) {
    const existing = await prisma.testimonial.findFirst({ where: { fullName: t.fullName } });
    if (!existing) {
      await prisma.testimonial.create({ data: t });
    }
  }

  console.log("Seeding admin...");
  const adminEmail = "admin@rihlamorocco.com";
  const existingAdmin = await prisma.admin.findUnique({ where: { email: adminEmail } });
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash("Password123!", 10);
    await prisma.admin.create({
      data: {
        name: "Boutique Admin",
        email: adminEmail,
        password: hashedPassword,
        role: "Super Admin"
      }
    });
    console.log("Admin seeded successfully!");
  }

  console.log("Seeding successfully completed!");
}

seed()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
