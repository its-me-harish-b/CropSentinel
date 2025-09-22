
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
