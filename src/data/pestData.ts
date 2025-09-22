
// This simulates a JSON database of pest information
// In a real implementation, this would be retrieved from a backend API

export interface Remedy {
  name: string;
  description: string;
  effectiveness: string;
  application: string;
}

export interface PestInfo {
  id: string;
  name: string;
  scientificName: string;
  confidenceScore: number;
  severity: "low" | "medium" | "high";
  description: string;
  remedies: Remedy[];
  imageUrl: string;
}

export const pestLibrary: PestInfo[] = [
  {
    id: "aphid-001",
    name: "Aphid",
    scientificName: "Aphidoidea",
    confidenceScore: 0.94,
    severity: "medium",
    description: "Aphids are small sap-sucking insects that can cause significant damage to crops by feeding on plant sap and transmitting plant viruses. They often cluster on the undersides of leaves and new growth. Heavy infestations can lead to distorted growth, yellowing leaves, and reduced crop yields.",
    remedies: [
      {
        name: "Neem Oil Spray",
        description: "Natural insecticide derived from neem tree seeds that disrupts the feeding and reproductive cycles of aphids.",
        effectiveness: "High",
        application: "Mix 2 tsp neem oil with 1 tsp mild liquid soap in 1 quart of water. Spray on affected areas every 7 days."
      },
      {
        name: "Ladybug Release",
        description: "Ladybugs are natural predators of aphids and can help control populations through biological control.",
        effectiveness: "Medium",
        application: "Release ladybugs in the evening when they're less likely to fly away. Ensure plants are misted first."
      },
      {
        name: "Garlic Spray",
        description: "The strong compounds in garlic act as a natural repellent to aphids while being safe for plants.",
        effectiveness: "Medium",
        application: "Blend 4 cloves of garlic with 2 cups water, strain, add 1 tbsp mild soap, dilute with 1 quart water."
      }
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/60/Aphid_giving_birth_flickr.jpg"
  },
  {
    id: "spider-mite-002",
    name: "Spider Mite",
    scientificName: "Tetranychidae",
    confidenceScore: 0.89,
    severity: "high",
    description: "Spider mites are tiny arachnids that feed on plant cells, causing stippled or yellow leaves. They create fine silk webbing on plant surfaces and thrive in hot, dry conditions. Severe infestations can cause leaf drop and plant death, particularly in drought-stressed plants.",
    remedies: [
      {
        name: "Insecticidal Soap",
        description: "Organic soap solution that breaks down the protective outer layer of mites, causing dehydration.",
        effectiveness: "High",
        application: "Mix 2 tbsp insecticidal soap per gallon of water. Spray thoroughly, focusing on leaf undersides. Repeat every 3-5 days."
      },
      {
        name: "Diatomaceous Earth",
        description: "Natural powder made from fossilized diatoms that cuts through the exoskeleton of spider mites, causing them to dehydrate.",
        effectiveness: "Medium",
        application: "Dust plants when dry, focusing on leaf undersides. Reapply after rain or heavy dew."
      },
      {
        name: "Rosemary Oil Spray",
        description: "Natural essential oil spray that is effective against spider mites while being safe for beneficial insects.",
        effectiveness: "Medium",
        application: "Mix 1 tsp rosemary oil with 1 quart water and 1/4 tsp mild liquid soap. Spray every 5-7 days."
      }
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Tetranychus_urticae_montage.png/1024px-Tetranychus_urticae_montage.png"
  },
  {
    id: "tomato-hornworm-003",
    name: "Tomato Hornworm",
    scientificName: "Manduca quinquemaculata",
    confidenceScore: 0.96,
    severity: "high",
    description: "Tomato hornworms are large, green caterpillars with white stripes and a horn-like protrusion. They can grow up to 4 inches long and consume large amounts of foliage from tomato plants and other nightshades. Their feeding can quickly defoliate plants and damage developing fruits.",
    remedies: [
      {
        name: "Bacillus thuringiensis (Bt)",
        description: "Natural bacteria that produces toxins harmful only to specific insect larvae while being safe for humans and wildlife.",
        effectiveness: "High",
        application: "Mix Bt powder or liquid according to package directions. Spray on foliage, especially leaf undersides. Reapply after rain."
      },
      {
        name: "Hand Picking",
        description: "Physical removal of hornworms from plants, which is very effective for small gardens or moderate infestations.",
        effectiveness: "High",
        application: "Inspect plants in early morning or evening. Remove hornworms by hand and drop into soapy water or relocate them."
      },
      {
        name: "Companion Planting with Dill",
        description: "Dill attracts parasitic wasps that lay eggs on hornworms. The hatched wasp larvae consume the hornworm from inside.",
        effectiveness: "Low",
        application: "Plant dill near tomato plants at the beginning of the growing season."
      }
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Tomato_Hornworm.jpg/1280px-Tomato_Hornworm.jpg"
  },
  {
    id: "whitefly-004",
    name: "Whitefly",
    scientificName: "Aleyrodidae",
    confidenceScore: 0.91,
    severity: "medium",
    description: "Whiteflies are small, winged insects that feed on plant sap similar to aphids. They cluster on the undersides of leaves and fly up in clouds when disturbed. Whiteflies excrete honeydew, leading to sooty mold growth, and can transmit plant viruses affecting yield and quality.",
    remedies: [
      {
        name: "Yellow Sticky Traps",
        description: "Yellow cards coated with adhesive that attract and trap adult whiteflies, reducing population and monitoring infestation levels.",
        effectiveness: "Medium",
        application: "Hang traps near affected plants at the level of the plant canopy. Replace when covered with insects."
      },
      {
        name: "Neem Oil Treatment",
        description: "Natural oil that disrupts the lifecycle of whiteflies while being relatively safe for beneficial insects.",
        effectiveness: "High",
        application: "Mix 2 tsp neem oil concentrate with 1 gallon of water and 1 tsp mild liquid soap. Spray thoroughly on all leaf surfaces every 7 days."
      },
      {
        name: "Insecticidal Soap",
        description: "Potassium salts of fatty acids that break down the protective coating of whiteflies, causing dehydration.",
        effectiveness: "Medium",
        application: "Mix 2-3 tbsp per gallon of water. Spray directly on whiteflies, focusing on leaf undersides. Repeat every 5-7 days."
      }
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Aleyrodidae_-_T.vaporariorum.JPG/1280px-Aleyrodidae_-_T.vaporariorum.JPG"
  },
  {
    id: "colorado-potato-beetle-005",
    name: "Colorado Potato Beetle",
    scientificName: "Leptinotarsa decemlineata",
    confidenceScore: 0.97,
    severity: "high",
    description: "Colorado potato beetles are distinctive insects with yellow-orange bodies and ten black stripes on their wing covers. Both adults and larvae feed on the foliage of potato plants and other nightshades. Severe infestations can completely defoliate crops, drastically reducing yields.",
    remedies: [
      {
        name: "Crop Rotation",
        description: "Preventative technique that disrupts the life cycle of potato beetles by moving potato family crops to different locations each year.",
        effectiveness: "Medium",
        application: "Rotate nightshade family crops (potatoes, tomatoes, eggplants) to different areas of the garden each year, with at least a 3-year rotation."
      },
      {
        name: "Spinosad Spray",
        description: "Natural insecticide derived from soil bacteria that affects the nervous system of beetle larvae and adults.",
        effectiveness: "High",
        application: "Mix according to label directions. Apply to all plant surfaces when beetles or larvae are first spotted. Reapply every 7-14 days."
      },
      {
        name: "Row Covers",
        description: "Physical barrier that prevents adult beetles from reaching crops to lay eggs while allowing light and water to pass through.",
        effectiveness: "High",
        application: "Cover young potato plants with lightweight floating row covers. Secure edges with soil or pins. Remove temporarily during flowering if pollination is needed."
      }
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Leptinotarsa_decemlineata_01.JPG/1280px-Leptinotarsa_decemlineata_01.JPG"
  },
  {
    id: "cabbage-looper-006",
    name: "Cabbage Looper",
    scientificName: "Trichoplusia ni",
    confidenceScore: 0.88,
    severity: "medium",
    description: "Cabbage loopers are green caterpillars that move in a distinctive looping motion. They feed on the leaves of cabbage, broccoli, cauliflower, and other brassicas, creating irregular holes. Heavy infestations can skeletonize leaves and contaminate produce with their frass (excrement).",
    remedies: [
      {
        name: "Bacillus thuringiensis (Bt)",
        description: "Microbial insecticide that targets caterpillars while being harmless to beneficial insects, animals, and humans.",
        effectiveness: "High",
        application: "Apply Bt spray in the evening when loopers are active. Focus on leaf undersides. Reapply every 7-10 days or after rain."
      },
      {
        name: "Row Covers",
        description: "Physical barrier that prevents adult moths from laying eggs on plants while allowing light, air, and water through.",
        effectiveness: "High",
        application: "Cover plants with lightweight floating row covers at the time of planting. Secure the edges with soil or fabric pins."
      },
      {
        name: "Companion Planting",
        description: "Planting aromatic herbs and flowers that repel cabbage moths or attract their natural predators.",
        effectiveness: "Low",
        application: "Plant thyme, mint, or marigolds around brassica crops to repel moths or attract beneficial insects."
      }
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Cabbage_looper_larva.jpg/1280px-Cabbage_looper_larva.jpg"
  },
  {
    id: "squash-bug-007",
    name: "Squash Bug",
    scientificName: "Anasa tristis",
    confidenceScore: 0.93,
    severity: "high",
    description: "Squash bugs are flat, grayish-brown insects that feed on cucurbit plants like squash, pumpkins, and cucumbers. They pierce plant tissue and suck sap, causing yellow spots that eventually turn brown. Heavy infestations can cause wilting, reduce yields, and may transmit plant diseases.",
    remedies: [
      {
        name: "Row Covers",
        description: "Physical barrier that prevents squash bugs from reaching plants during their egg-laying season.",
        effectiveness: "Medium",
        application: "Cover young plants with floating row covers until flowering. Remove for pollination or hand-pollinate."
      },
      {
        name: "Diatomaceous Earth",
        description: "Natural powder that damages the exoskeletons of squash bugs when they crawl over it, leading to dehydration.",
        effectiveness: "Medium",
        application: "Dust plants and surrounding soil with food-grade diatomaceous earth. Reapply after rain or heavy dew."
      },
      {
        name: "Neem Oil Spray",
        description: "Plant-derived oil that disrupts feeding and reproductive cycles of squash bugs.",
        effectiveness: "Medium",
        application: "Mix 2 tbsp neem oil with 1 gallon of water and 1 tsp mild soap. Apply weekly, focusing on leaf undersides and stems."
      }
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Anasa_tristis.jpg/1280px-Anasa_tristis.jpg"
  },
  {
    id: "japanese-beetle-008",
    name: "Japanese Beetle",
    scientificName: "Popillia japonica",
    confidenceScore: 0.95,
    severity: "high",
    description: "Japanese beetles are metallic green and copper colored insects that skeletonize leaves by feeding on the tissue between the veins. They attack over 300 plant species, including roses, grapes, and fruit trees. They often feed in groups, causing rapid and extensive damage to foliage, flowers, and fruits.",
    remedies: [
      {
        name: "Milky Spore",
        description: "Biological control that targets Japanese beetle grubs in the soil, reducing future adult populations.",
        effectiveness: "Medium",
        application: "Apply milky spore powder to lawn areas where beetles lay eggs. One application can last for years but takes time to establish."
      },
      {
        name: "Row Covers",
        description: "Physical barrier that prevents beetles from accessing plants during peak feeding times.",
        effectiveness: "High",
        application: "Cover susceptible plants with floating row covers during the 6-8 week beetle season. Remove for pollination if needed."
      },
      {
        name: "Handpicking",
        description: "Manual removal of beetles from plants, effective for small infestations or in small gardens.",
        effectiveness: "Medium",
        application: "In the early morning when beetles are sluggish, shake plants over a bucket of soapy water to collect and drown the beetles."
      }
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Popillia_japonica_on_rose_leaf.jpg/1280px-Popillia_japonica_on_rose_leaf.jpg"
  },
  {
    id: "cucumber-beetle-009",
    name: "Cucumber Beetle",
    scientificName: "Diabrotica spp.",
    confidenceScore: 0.90,
    severity: "medium",
    description: "Cucumber beetles are small, striped or spotted beetles that feed on cucurbit crops like cucumbers, melons, and squash. They damage seedlings, flowers, and fruits, and can transmit bacterial wilt disease. Both adults and larvae can cause significant damage to plants at different stages of growth.",
    remedies: [
      {
        name: "Kaolin Clay",
        description: "Mineral-based particle film that creates a protective barrier on plants, deterring feeding and egg-laying.",
        effectiveness: "Medium",
        application: "Mix kaolin clay product according to package directions and spray on plants every 7-14 days or after rain."
      },
      {
        name: "Yellow Sticky Traps",
        description: "Adhesive traps that attract and capture adult cucumber beetles, reducing populations and monitoring activity.",
        effectiveness: "Low",
        application: "Place yellow sticky traps around the garden perimeter and near susceptible plants. Replace when covered with insects."
      },
      {
        name: "Beneficial Nematodes",
        description: "Microscopic organisms that parasitize cucumber beetle larvae in the soil, reducing future adult populations.",
        effectiveness: "Medium",
        application: "Apply beneficial nematodes to moist soil according to package directions. Water before and after application."
      }
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Spotted_cucumber_beetle.jpg/1280px-Spotted_cucumber_beetle.jpg"
  },
  {
    id: "thrips-010",
    name: "Thrips",
    scientificName: "Thysanoptera",
    confidenceScore: 0.87,
    severity: "medium",
    description: "Thrips are tiny, slender insects with fringed wings that feed by piercing plant cells and sucking their contents. This causes silvery scarring, stippling, and distorted growth on leaves, flowers, and fruits. They can also spread plant viruses and are particularly problematic in greenhouses and on flowering plants.",
    remedies: [
      {
        name: "Insecticidal Soap",
        description: "Contact insecticide made from potassium salts of fatty acids that penetrates the soft bodies of thrips.",
        effectiveness: "Medium",
        application: "Mix 2-3 tbsp insecticidal soap per gallon of water. Spray thoroughly, including leaf undersides. Repeat every 5-7 days."
      },
      {
        name: "Blue Sticky Traps",
        description: "Adhesive cards that attract and capture adult thrips, reducing populations and monitoring infestation levels.",
        effectiveness: "Low",
        application: "Place blue sticky traps near affected plants and at plant height. Replace when covered with insects."
      },
      {
        name: "Beneficial Insects",
        description: "Predatory insects like minute pirate bugs and predatory mites that feed on thrips.",
        effectiveness: "Medium",
        application: "Release beneficial insects according to supplier instructions, typically when thrips activity is first noticed."
      }
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Thrips_tabaci.jpg/1280px-Thrips_tabaci.jpg"
  },
  {
    id: "africanized-honey-bee-011",
    name: "Africanized Honey Bees (Killer Bees)",
    scientificName: "Apis mellifera scutellata",
    confidenceScore: 0.92,
    severity: "high",
    description: "Africanized honey bees are aggressive hybrid bees that defend their hives more vigorously than European honey bees. While beneficial for pollination, they can pose risks to humans and livestock due to their defensive behavior. They may also compete with native pollinators.",
    remedies: [
      {
        name: "Professional Removal",
        description: "Contact licensed bee removal specialists for safe relocation of colonies without harming beneficial pollinators.",
        effectiveness: "High",
        application: "Call professional beekeepers or pest control specialists trained in bee relocation rather than extermination."
      },
      {
        name: "Habitat Modification",
        description: "Remove potential nesting sites like hollow trees, wall cavities, and unused equipment to discourage establishment.",
        effectiveness: "Medium",
        application: "Seal openings in structures, remove debris piles, and maintain clean areas around buildings."
      }
    ],
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "armyworm-012",
    name: "Armyworms",
    scientificName: "Spodoptera spp.",
    confidenceScore: 0.91,
    severity: "high",
    description: "Armyworms are caterpillars that feed on grasses and crops, moving in large groups across fields like an army. They can quickly defoliate entire fields of corn, rice, and pasture grasses, causing significant economic losses.",
    remedies: [
      {
        name: "Bacillus thuringiensis (Bt)",
        description: "Biological insecticide that specifically targets caterpillars while being safe for beneficial insects and humans.",
        effectiveness: "High",
        application: "Apply Bt spray when caterpillars are small (1st-3rd instar). Spray in late afternoon or evening for best results."
      },
      {
        name: "Beneficial Nematodes",
        description: "Parasitic nematodes that attack armyworm larvae in soil, reducing population naturally.",
        effectiveness: "Medium",
        application: "Apply to moist soil when soil temperature is 55-85°F. Water before and after application."
      }
    ],
    imageUrl: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "brown-marmorated-stink-bug-013",
    name: "Brown Marmorated Stink Bugs",
    scientificName: "Halyomorpha halys",
    confidenceScore: 0.89,
    severity: "medium",
    description: "Brown marmorated stink bugs are shield-shaped insects that feed on fruits, vegetables, and ornamental plants. They pierce plant tissue and suck plant juices, causing dimpling, scarring, and discoloration of fruits and vegetables.",
    remedies: [
      {
        name: "Kaolin Clay",
        description: "Particle film that creates a protective barrier on plants, deterring feeding and egg laying.",
        effectiveness: "Medium",
        application: "Apply kaolin clay spray to all plant surfaces every 7-14 days or after rain."
      },
      {
        name: "Row Covers",
        description: "Physical barrier that prevents stink bugs from accessing plants during vulnerable growth stages.",
        effectiveness: "High",
        application: "Cover crops with floating row covers during peak stink bug season, removing for pollination."
      }
    ],
    imageUrl: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "citrus-canker-014",
    name: "Citrus Canker",
    scientificName: "Xanthomonas axonopodis",
    confidenceScore: 0.94,
    severity: "high",
    description: "Citrus canker is a bacterial disease that causes lesions on leaves, stems, and fruit of citrus trees. It leads to premature fruit drop, reduced fruit quality, and can spread rapidly in humid conditions with wind and rain.",
    remedies: [
      {
        name: "Copper Spray",
        description: "Copper-based fungicide that prevents bacterial spread and protects healthy tissue from infection.",
        effectiveness: "High",
        application: "Apply copper spray before rain events and every 14-21 days during wet seasons. Follow label rates carefully."
      },
      {
        name: "Pruning Infected Branches",
        description: "Remove infected plant material to prevent disease spread and improve air circulation.",
        effectiveness: "High",
        application: "Prune infected branches 12 inches below visible symptoms. Disinfect tools between cuts with 70% alcohol."
      }
    ],
    imageUrl: "https://images.unsplash.com/photo-1557800636-894a64c1696f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "corn-borer-015",
    name: "Corn Borers",
    scientificName: "Ostrinia nubilalis",
    confidenceScore: 0.93,
    severity: "high",
    description: "Corn borers are caterpillars that tunnel into corn stalks, weakening plants and making them susceptible to lodging. They feed on leaves, tassels, and developing ears, significantly reducing corn yields.",
    remedies: [
      {
        name: "Bacillus thuringiensis (Bt)",
        description: "Biological control that targets caterpillars specifically without harming beneficial insects.",
        effectiveness: "High",
        application: "Apply when larvae are young and before they bore into stalks. Repeat applications every 5-7 days."
      },
      {
        name: "Crop Rotation",
        description: "Break the pest cycle by rotating to non-host crops, disrupting overwintering larvae.",
        effectiveness: "Medium",
        application: "Rotate corn with soybeans, small grains, or other non-host crops for 1-2 years."
      }
    ],
    imageUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "corn-earworm-016",
    name: "Corn Earworms",
    scientificName: "Helicoverpa zea",
    confidenceScore: 0.95,
    severity: "high",
    description: "Corn earworms are caterpillars that feed on corn ears, cotton bolls, and tomato fruits. They damage kernels and create entry points for diseases, significantly reducing crop quality and marketability.",
    remedies: [
      {
        name: "Beneficial Insects",
        description: "Encourage natural predators like lacewings, minute pirate bugs, and parasitic wasps.",
        effectiveness: "Medium",
        application: "Plant diverse flowering plants nearby to attract and support beneficial insect populations."
      },
      {
        name: "Spinosad Spray",
        description: "Natural insecticide derived from soil bacteria that controls caterpillars effectively.",
        effectiveness: "High",
        application: "Apply when eggs hatch and larvae are small. Focus on corn silks and developing ears."
      }
    ],
    imageUrl: "https://images.unsplash.com/photo-1569395743873-26d9b03242c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "fall-armyworm-017",
    name: "Fall Armyworms",
    scientificName: "Spodoptera frugiperda",
    confidenceScore: 0.90,
    severity: "high",
    description: "Fall armyworms are destructive caterpillars that feed on corn, rice, and grass crops. They can rapidly defoliate plants and are known for their ability to migrate long distances, making them a serious agricultural pest.",
    remedies: [
      {
        name: "Bt Corn Varieties",
        description: "Plant genetically modified corn varieties that produce Bt toxins harmful to armyworms.",
        effectiveness: "High",
        application: "Choose appropriate Bt corn hybrids for your region and follow refuge requirements."
      },
      {
        name: "Pheromone Traps",
        description: "Monitor adult moth activity to time treatments and assess population levels.",
        effectiveness: "Low",
        application: "Place pheromone traps around field perimeters to monitor flight activity and plan treatments."
      }
    ],
    imageUrl: "https://images.unsplash.com/photo-1589642123053-ac5a9b39d3e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "fruit-flies-018",
    name: "Fruit Flies",
    scientificName: "Tephritidae",
    confidenceScore: 0.88,
    severity: "medium",
    description: "Fruit flies lay eggs in ripening fruits, and the larvae feed inside, causing fruit to rot and become unmarketable. They affect a wide range of fruit crops and can spread rapidly in warm weather.",
    remedies: [
      {
        name: "Protein Bait Traps",
        description: "Attract and trap adult flies before they can lay eggs in fruit using protein-based lures.",
        effectiveness: "Medium",
        application: "Hang protein bait traps in fruit trees before fruit begins to ripen. Replace bait regularly."
      },
      {
        name: "Sanitation",
        description: "Remove fallen and overripe fruit to eliminate breeding sites for flies.",
        effectiveness: "High",
        application: "Collect and dispose of fallen fruit daily. Remove any damaged or overripe fruit from trees promptly."
      }
    ],
    imageUrl: "https://images.unsplash.com/photo-1582049450464-1936543e8507?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "western-corn-rootworm-019",
    name: "Western Corn Rootworms",
    scientificName: "Diabrotica virgifera virgifera",
    confidenceScore: 0.92,
    severity: "high",
    description: "Western corn rootworms are beetles whose larvae feed on corn roots, causing plant stress, lodging, and yield loss. Adult beetles feed on corn silks, interfering with pollination.",
    remedies: [
      {
        name: "Crop Rotation",
        description: "Rotate corn with soybeans to break the pest cycle since larvae cannot survive on soybean roots.",
        effectiveness: "High",
        application: "Implement annual corn-soybean rotation or extended rotation with other non-host crops."
      },
      {
        name: "Beneficial Nematodes",
        description: "Apply entomopathogenic nematodes that parasitize rootworm larvae in soil.",
        effectiveness: "Medium",
        application: "Apply nematodes to soil when larvae are present, typically in late spring to early summer."
      }
    ],
    imageUrl: "https://images.unsplash.com/photo-1464207687429-7505649dae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  }
];

// Simulated API call that would normally go to a backend
export const getPestInfo = (imageData: string): Promise<PestInfo> => {
  return new Promise((resolve) => {
    // Simulate API processing time
    setTimeout(() => {
      // Generate a simple hash from the image data to ensure consistency
      const hashCode = (str: string) => {
        let hash = 0;
        for (let i = 0; i < 100 && i < str.length; i++) {
          const char = str.charCodeAt(i);
          hash = ((hash << 5) - hash) + char;
          hash = hash & hash; // Convert to 32bit integer
        }
        return Math.abs(hash);
      };
      
      // Use the hash to consistently pick a pest for the same image
      const hash = hashCode(imageData);
      const pestIndex = hash % pestLibrary.length;
      resolve(pestLibrary[pestIndex]);
    }, 2000); // Simulate a 2 second processing time
  });
};
