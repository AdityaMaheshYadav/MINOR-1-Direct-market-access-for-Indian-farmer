package com.farmdirect.farmdirect_backend.chat;

import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "*")
public class ChatController {

    @PostMapping
    public Map<String, String> chat(@RequestBody Map<String, String> body) {
        String userMessage = body.getOrDefault("message", "");
        String reply = generateReply(userMessage);
        return Map.of("reply", reply);
    }

    private String generateReply(String input) {
        String msg = input.toLowerCase().trim();

        // ── GREETINGS ──────────────────────────────────────────────
        if (matches(msg, "hello", "hi", "hey", "namaste", "namaskar", "good morning", "good evening", "good afternoon"))
            return "👋 Hello Farmer! I'm your farming assistant. Ask me about crops, soil, fertilizers, irrigation, pests, weather, or government schemes.";

        if (matches(msg, "how are you", "how r you", "what's up", "wassup"))
            return "🌱 I'm doing great and ready to help you farm better! What would you like to know?";

        if (matches(msg, "thank", "thanks", "thank you", "shukriya", "dhanyawad"))
            return "🙏 You're welcome! Happy farming!";

        if (matches(msg, "bye", "goodbye", "see you", "alvida"))
            return "👋 Goodbye! Wishing you a great harvest!";

        // ── CROPS ──────────────────────────────────────────────────
        if (matches(msg, "rice", "paddy", "chawal"))
            return "🌾 Rice (Paddy):\n• Best season: Kharif (June–November)\n• Soil: Clay or loamy soil\n• Water: Needs heavy irrigation (1200–2000mm)\n• Tip: Transplant seedlings 25–30 days after sowing.\n• Common disease: Blast — use Tricyclazole spray.";

        if (matches(msg, "wheat", "gehu", "gehun"))
            return "🌾 Wheat:\n• Best season: Rabi (October–March)\n• Soil: Well-drained loamy soil\n• Temperature: 10–25°C\n• Tip: Sow in October–November for best yield.\n• Fertilizer: Apply urea at tillering stage.";

        if (matches(msg, "maize", "corn", "makka", "makki"))
            return "🌽 Maize:\n• Season: Kharif & Rabi both\n• Soil: Sandy loam to loamy\n• Spacing: 60×25 cm\n• Tip: Apply nitrogen in 3 splits for best yield.\n• Harvest: 90–110 days after sowing.";

        if (matches(msg, "sugarcane", "ganna", "sugar cane"))
            return "🎋 Sugarcane:\n• Season: February–March planting\n• Soil: Deep loamy soil\n• Water: Needs regular irrigation every 10–15 days\n• Tip: Ratoon crop saves cost — keep 2–3 ratoons.\n• Harvest: 10–12 months after planting.";

        if (matches(msg, "cotton", "kapas", "kapas"))
            return "🌿 Cotton:\n• Season: Kharif (April–May)\n• Soil: Black cotton soil (regur)\n• Spacing: 90×60 cm\n• Tip: Use Bt cotton varieties to reduce pest damage.\n• Irrigation: Critical at flowering and boll formation.";

        if (matches(msg, "soybean", "soya", "soyabean"))
            return "🫘 Soybean:\n• Season: Kharif (June–July)\n• Soil: Well-drained loamy soil\n• Tip: Inoculate seeds with Rhizobium before sowing.\n• Harvest: 90–120 days\n• Yield: 15–25 quintals/hectare.";

        if (matches(msg, "tomato", "tamatar"))
            return "🍅 Tomato:\n• Season: Year-round (avoid extreme heat)\n• Soil: Sandy loam, pH 6–7\n• Spacing: 60×45 cm\n• Tip: Stake plants to prevent lodging.\n• Disease: Early blight — spray Mancozeb 0.25%.";

        if (matches(msg, "potato", "aloo", "aaloo"))
            return "🥔 Potato:\n• Season: Rabi (October–February)\n• Soil: Sandy loam, well-drained\n• Seed rate: 20–25 quintals/hectare\n• Tip: Earth up after 30 days to prevent greening.\n• Disease: Late blight — spray Ridomil Gold.";

        if (matches(msg, "onion", "pyaz", "pyaaz"))
            return "🧅 Onion:\n• Season: Rabi (Oct–Nov) & Kharif (June–July)\n• Soil: Well-drained loamy soil\n• Spacing: 15×10 cm\n• Tip: Stop irrigation 10 days before harvest.\n• Storage: Cure bulbs in shade for 7–10 days.";

        if (matches(msg, "garlic", "lahsun", "lasun"))
            return "🧄 Garlic:\n• Season: October–November\n• Soil: Sandy loam, pH 6–7\n• Spacing: 15×7.5 cm\n• Tip: Plant individual cloves 5 cm deep.\n• Harvest: When leaves turn yellow (150–180 days).";

        if (matches(msg, "mustard", "sarson", "rapeseed"))
            return "🌼 Mustard:\n• Season: Rabi (October–November)\n• Soil: Sandy loam to loam\n• Tip: Sow at 5 kg/hectare seed rate.\n• Fertilizer: 80 kg N + 40 kg P per hectare.\n• Harvest: 110–140 days after sowing.";

        if (matches(msg, "groundnut", "peanut", "moongfali", "mungfali"))
            return "🥜 Groundnut:\n• Season: Kharif (June–July)\n• Soil: Sandy loam, well-drained\n• Tip: Gypsum application at pegging stage improves yield.\n• Harvest: 120–130 days\n• Yield: 15–20 quintals/hectare.";

        if (matches(msg, "millet", "bajra", "jowar", "sorghum"))
            return "🌾 Millets (Bajra/Jowar):\n• Season: Kharif (June–July)\n• Soil: Sandy to loamy, drought-tolerant\n• Tip: Excellent for dry regions with low rainfall.\n• Nutritious: High in iron and fiber.\n• Harvest: 70–90 days.";

        if (matches(msg, "lentil", "dal", "masoor", "moong", "urad", "chana", "chickpea", "arhar", "tur"))
            return "🫘 Pulses (Dal crops):\n• Season: Rabi (Oct–Nov) or Kharif (June–July)\n• Soil: Well-drained loamy soil\n• Tip: Fix nitrogen naturally — reduces fertilizer cost.\n• Common: Moong, Urad, Arhar, Masoor, Chana.\n• Harvest: 60–120 days depending on variety.";

        if (matches(msg, "banana", "kela"))
            return "🍌 Banana:\n• Season: Year-round planting\n• Soil: Rich loamy, pH 6–7.5\n• Spacing: 1.8×1.8 m\n• Tip: Remove suckers except one ratoon.\n• Harvest: 11–14 months after planting.";

        if (matches(msg, "mango", "aam"))
            return "🥭 Mango:\n• Season: Flowers in Jan–Feb, harvest May–July\n• Soil: Deep well-drained loamy soil\n• Tip: Spray Paclobutrazol to induce flowering.\n• Pest: Mango hopper — spray Imidacloprid.\n• Varieties: Alphonso, Dasheri, Langra, Kesar.";

        // ── SOIL ───────────────────────────────────────────────────
        if (matches(msg, "soil", "mitti", "bhumi", "soil type", "soil health"))
            return "🌍 Soil Types in India:\n• Alluvial — Best for wheat, rice, sugarcane (Indo-Gangetic plains)\n• Black (Regur) — Best for cotton (Deccan plateau)\n• Red & Yellow — Good for millets, pulses\n• Laterite — Tea, coffee, cashew\n• Desert — Drought-resistant crops\n\nTip: Get a Soil Health Card from your nearest KVK for free soil testing.";

        if (matches(msg, "soil test", "soil testing", "soil health card", "mitti jaanch"))
            return "🧪 Soil Testing:\n• Visit your nearest Krishi Vigyan Kendra (KVK) or Agriculture office\n• Soil Health Card scheme provides FREE testing\n• Tests for: N, P, K, pH, organic carbon, micronutrients\n• Based on results, get customized fertilizer recommendations\n• Website: soilhealth.dac.gov.in";

        if (matches(msg, "ph", "soil ph", "acidic", "alkaline"))
            return "⚗️ Soil pH Guide:\n• pH 6–7: Ideal for most crops\n• pH < 6 (Acidic): Add lime (calcium carbonate)\n• pH > 7.5 (Alkaline): Add gypsum or sulfur\n• Rice tolerates pH 5.5–6.5\n• Wheat prefers pH 6–7.5\n• Test soil pH every 2–3 years.";

        if (matches(msg, "organic", "organic farming", "jeevamrit", "vermicompost", "compost"))
            return "♻️ Organic Farming:\n• Vermicompost: 2–3 tonnes/hectare improves soil health\n• Jeevamrit: Mix 10L cow urine + 10kg dung + 2kg jaggery in 200L water\n• Green manure: Grow Dhaincha or Sunhemp and plow in\n• Reduces input cost by 30–40%\n• Premium price for organic produce in market.";

        // ── FERTILIZER ─────────────────────────────────────────────
        if (matches(msg, "fertilizer", "khad", "urea", "npk", "dap", "nutrient"))
            return "🧪 Fertilizer Guide:\n• Urea (46% N): For leafy growth — apply in splits\n• DAP (18N-46P): At sowing for root development\n• MOP (60% K): For fruit/grain quality\n• NPK 20-20-0: Balanced for most crops\n• Tip: Never apply urea on wet soil — causes nitrogen loss\n• Organic alternative: FYM (Farm Yard Manure) 10 t/ha.";

        if (matches(msg, "nitrogen", "phosphorus", "potassium", "micronutrient", "zinc", "boron"))
            return "🔬 Nutrient Deficiency Signs:\n• Nitrogen (N): Yellowing of older leaves → Apply urea\n• Phosphorus (P): Purple/red leaves → Apply DAP\n• Potassium (K): Brown leaf edges → Apply MOP\n• Zinc: White striping on leaves → Apply ZnSO4 @ 25 kg/ha\n• Boron: Hollow stem, poor fruit set → Apply Borax @ 10 kg/ha";

        // ── IRRIGATION ─────────────────────────────────────────────
        if (matches(msg, "irrigation", "water", "drip", "sprinkler", "sinchai", "paani"))
            return "💧 Irrigation Methods:\n• Drip Irrigation: Saves 40–50% water, best for vegetables & fruits\n• Sprinkler: Good for wheat, groundnut\n• Flood: Traditional, used for rice\n• Furrow: For row crops like maize, sugarcane\n\nPM Krishi Sinchai Yojana: Get 55–75% subsidy on drip/sprinkler systems.\nContact your district agriculture office to apply.";

        // ── PEST & DISEASE ─────────────────────────────────────────
        if (matches(msg, "pest", "insect", "kida", "keeda", "bug", "aphid", "whitefly", "locust"))
            return "🐛 Pest Management:\n• Aphids: Spray Imidacloprid 0.3ml/L or neem oil\n• Whitefly: Yellow sticky traps + Thiamethoxam spray\n• Stem borer (rice): Cartap Hydrochloride 4G granules\n• Locust: Contact your district agriculture office immediately\n• IPM Tip: Use pheromone traps to monitor pest population before spraying.";

        if (matches(msg, "disease", "blight", "rust", "fungus", "wilt", "rot", "bimari"))
            return "🦠 Crop Disease Management:\n• Early Blight (tomato/potato): Spray Mancozeb 0.25%\n• Late Blight: Spray Ridomil Gold or Metalaxyl\n• Wheat Rust: Spray Propiconazole 0.1%\n• Wilt (Fusarium): Soil drench with Carbendazim\n• Powdery Mildew: Spray Sulfur 80WP @ 3g/L\n• Tip: Crop rotation prevents soil-borne diseases.";

        // ── WEATHER ────────────────────────────────────────────────
        if (matches(msg, "weather", "mausam", "rain", "barish", "temperature", "forecast", "climate"))
            return "🌦️ Weather & Farming Tips:\n• Use the Weather tab in your dashboard for real-time weather\n• Sow seeds when soil temperature is 18–25°C\n• Avoid spraying pesticides on windy or rainy days\n• Harvest before monsoon to prevent grain damage\n• Install rain gauge to track local rainfall\n• Subscribe to Meghdoot app for agro-weather advisories.";

        // ── SCHEMES ────────────────────────────────────────────────
        if (matches(msg, "scheme", "yojana", "government", "subsidy", "pm kisan", "pmkisan", "sarkar"))
            return "🏛️ Government Schemes for Farmers:\n• PM-Kisan: ₹6000/year direct benefit — pmkisan.gov.in\n• PM Fasal Bima Yojana: Crop insurance at low premium\n• Kisan Credit Card (KCC): Low-interest crop loans @ 4%\n• PM Krishi Sinchai Yojana: 55–75% subsidy on irrigation\n• Soil Health Card: Free soil testing\n• eNAM: Sell produce online at better prices — enam.gov.in";

        if (matches(msg, "loan", "kcc", "kisan credit", "credit card", "bank", "finance"))
            return "💳 Kisan Credit Card (KCC):\n• Interest rate: 4% per annum (subsidized)\n• Loan up to ₹3 lakh without collateral\n• Covers: Seeds, fertilizers, pesticides, irrigation\n• Apply at: Any nationalized bank or cooperative bank\n• Documents: Land records, Aadhaar, passport photo\n• Repay after harvest — flexible repayment.";

        if (matches(msg, "insurance", "fasal bima", "crop insurance", "bima"))
            return "🛡️ PM Fasal Bima Yojana:\n• Premium: Only 1.5–2% for Kharif, 2% for Rabi crops\n• Covers: Drought, flood, pest, disease, post-harvest losses\n• Claim: Auto-triggered by satellite data in many areas\n• Apply: Through your bank or Common Service Centre (CSC)\n• Deadline: Within 2 weeks of crop sowing\n• Helpline: 1800-180-1551";

        // ── MARKET & PRICE ─────────────────────────────────────────
        if (matches(msg, "price", "msp", "market", "mandi", "sell", "rate", "bhav", "bazar"))
            return "📈 Market & MSP Info:\n• Check MSP (Minimum Support Price) at agricoop.nic.in\n• eNAM portal: Sell directly online — enam.gov.in\n• Agmarknet: Check daily mandi prices — agmarknet.gov.in\n• Tip: Sell in groups (FPO) to get better prices\n• Store produce in cold storage to sell when prices are high\n• Avoid distress selling right after harvest.";

        if (matches(msg, "fpo", "farmer producer", "cooperative", "samiti", "group farming"))
            return "🤝 Farmer Producer Organizations (FPO):\n• Group of 100–500 farmers registered as a company\n• Benefits: Bulk buying of inputs at lower cost\n• Collective selling at better market prices\n• Access to credit, storage, processing facilities\n• Government support: ₹15 lakh equity grant per FPO\n• Register at: sfacindia.com or contact NABARD.";

        // ── STORAGE ────────────────────────────────────────────────
        if (matches(msg, "storage", "warehouse", "cold storage", "bhandaran", "silo"))
            return "🏪 Crop Storage Tips:\n• Dry grains to 12–14% moisture before storage\n• Use hermetic bags (PICS bags) for grain storage\n• Cold storage for potatoes, onions, fruits\n• Warehouse Receipt System: Store & get loan against stored produce\n• Pradhan Mantri Kisan SAMPADA Yojana: Subsidy for cold chain\n• Fumigation: Use Aluminium Phosphide tablets for long storage.";

        // ── SEEDS ──────────────────────────────────────────────────
        if (matches(msg, "seed", "beej", "variety", "hybrid", "sowing"))
            return "🌱 Seed Selection Tips:\n• Always buy certified seeds from government outlets or reputed companies\n• Hybrid seeds give 20–30% higher yield but can't be saved\n• Open-pollinated varieties (OPV): Seeds can be saved for next season\n• Seed treatment: Treat with Thiram or Carbendazim before sowing\n• Seed rate: Follow recommended rate — excess seed wastes money\n• Check germination: Test 10 seeds on wet cloth before sowing.";

        // ── HARVEST ────────────────────────────────────────────────
        if (matches(msg, "harvest", "katai", "threshing", "yield", "production"))
            return "🌾 Harvesting Tips:\n• Harvest at right maturity — avoid over-ripening\n• Use combine harvester for wheat/rice to reduce losses\n• Thresh immediately after cutting to prevent field losses\n• Post-harvest loss in India: 10–15% — proper storage reduces this\n• Dry produce in shade, not direct sunlight\n• Weigh and grade produce before selling for better price.";

        // ── TOOLS & MACHINERY ──────────────────────────────────────
        if (matches(msg, "tractor", "machine", "equipment", "yantra", "tool", "machinery"))
            return "🚜 Farm Machinery:\n• Custom Hiring Centres (CHC): Rent tractors & equipment cheaply\n• SMAM Scheme: 40–50% subsidy on farm machinery\n• Common tools: Rotavator, seed drill, sprayer, thresher\n• Drone spraying: Available for hire in many districts\n• Contact your nearest KVK for machinery demonstrations\n• App: CHC Farm Machinery app to find nearby rental centers.";

        // ── KVK / HELPLINE ─────────────────────────────────────────
        if (matches(msg, "kvk", "krishi vigyan", "helpline", "expert", "advice", "contact", "help"))
            return "📞 Get Expert Help:\n• Kisan Call Centre: Call 1800-180-1551 (Free, 24x7)\n• KVK (Krishi Vigyan Kendra): Visit nearest KVK for free training\n• mKisan Portal: SMS-based advisory — register at mkisan.gov.in\n• Kisan Suvidha App: Weather, market prices, plant protection\n• IFFCO Kisan App: Agri advisory in local language\n• Your state agriculture department website for local schemes.";

        // ── WHAT CAN YOU DO ────────────────────────────────────────
        if (matches(msg, "what can you", "what do you know", "help me", "topics", "list", "menu", "options"))
            return "🤖 I can help you with:\n\n🌾 Crops: Rice, Wheat, Maize, Cotton, Sugarcane, Tomato, Potato, Onion, Mango, Banana, Pulses & more\n🌍 Soil: Types, testing, pH, organic farming\n🧪 Fertilizers: Urea, DAP, NPK, micronutrients\n💧 Irrigation: Drip, sprinkler, water management\n🐛 Pests & Diseases: Identification & treatment\n🌦️ Weather: Farming tips based on weather\n🏛️ Schemes: PM-Kisan, KCC, Fasal Bima, subsidies\n📈 Market: MSP, mandi prices, eNAM\n🌱 Seeds: Selection, treatment, sowing\n🌾 Harvest: Tips to reduce post-harvest loss\n🚜 Machinery: Tractors, CHC, SMAM scheme\n📞 Helpline: KVK, Kisan Call Centre\n\nJust ask your question!";

        // ── DEFAULT ────────────────────────────────────────────────
        return "🤖 I didn't quite understand that. Try asking about:\n• A specific crop (rice, wheat, tomato...)\n• Soil, fertilizer, irrigation, pests\n• Government schemes or market prices\n• Or type 'help' to see all topics I can answer.";
    }

    /** Returns true if the message contains any of the given keywords */
    private boolean matches(String msg, String... keywords) {
        for (String kw : keywords) {
            if (msg.contains(kw)) return true;
        }
        return false;
    }
}
