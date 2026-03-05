//this my profiles.js help me replace the names to name a to pages like Nicki Minaj page,davido page ,justin Bieber and the rest to up to 100 pages also add followers from 1k to 1 million upwards:// profiles.js - Default Profile Creation for Dating App
import { 
    getFirestore, 
    doc, 
    setDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyC9jF-ocy6HjsVzWVVlAyXW-4aIFgA79-A",
    authDomain: "crypto-6517d.firebaseapp.com",
    projectId: "crypto-6517d",
    storageBucket: "crypto-6517d.firebasestorage.app",
    messagingSenderId: "60263975159",
    appId: "1:60263975159:web:bd53dcaad86d6ed9592bf2"
  };

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

class ProfileCreator {
    constructor() {
        // Enhanced name lists
        this.names = {
            male: [
                'Liam', 'Noah', 'Oliver', 'Elijah', 'James', 'William', 'Benjamin', 'Lucas', 'Henry', 'Alexander',
                'Mason', 'Michael', 'Ethan', 'Daniel', 'Jacob', 'Logan', 'Jackson', 'Levi', 'Sebastian', 'Mateo',
                'Jack', 'Owen', 'Theodore', 'Aiden', 'Samuel', 'Joseph', 'John', 'David', 'Wyatt', 'Matthew',
                'Luke', 'Asher', 'Carter', 'Julian', 'Grayson', 'Leo', 'Jayden', 'Gabriel', 'Isaac', 'Lincoln',
                'Anthony', 'Hudson', 'Dylan', 'Ezra', 'Thomas', 'Charles', 'Christopher', 'Jaxon', 'Maverick', 'Josiah',
                'Andrew', 'Joshua', 'Ryan', 'Nathan', 'Caleb', 'Christian', 'Jonathan', 'Isaiah', 'Aaron', 'Hunter',
                'Adrian', 'Jordan', 'Nicholas', 'Evan', 'Cameron', 'Connor', 'Jeremiah', 'Brayden', 'Colton', 'Austin',
                'Angel', 'Brandon', 'Jose', 'Robert', 'Kevin', 'Tyler', 'Zachary', 'Carson', 'Jason', 'Chase',
                'Adam', 'Gavin', 'Juan', 'Brian', 'Ayden', 'Cooper', 'Dominic', 'Brody', 'Cody', 'Damian',
                'Steven', 'Parker', 'Riley', 'Simon', 'Kai', 'Cole', 'Micah', 'Maxwell', 'Harrison', 'Bryce'
            ],
            female: [
                'Emma', 'Olivia', 'Ava', 'Isabella', 'Sophia', 'Charlotte', 'Mia', 'Amelia', 'Harper', 'Evelyn',
                'Abigail', 'Emily', 'Elizabeth', 'Mila', 'Ella', 'Avery', 'Sofia', 'Camila', 'Aria', 'Scarlett',
                'Victoria', 'Madison', 'Luna', 'Grace', 'Chloe', 'Penelope', 'Layla', 'Riley', 'Zoey', 'Nora',
                'Lily', 'Eleanor', 'Hannah', 'Lillian', 'Addison', 'Aubrey', 'Ellie', 'Stella', 'Natalie', 'Zoe',
                'Leah', 'Hazel', 'Violet', 'Aurora', 'Savannah', 'Audrey', 'Brooklyn', 'Bella', 'Claire', 'Skylar',
                'Lucy', 'Paisley', 'Everly', 'Anna', 'Caroline', 'Nova', 'Genesis', 'Emilia', 'Kennedy', 'Samantha',
                'Maya', 'Willow', 'Kinsley', 'Naomi', 'Aaliyah', 'Elena', 'Sarah', 'Ariana', 'Allison', 'Gabriella',
                'Alice', 'Madelyn', 'Cora', 'Ruby', 'Eva', 'Serenity', 'Autumn', 'Adeline', 'Hailey', 'Gianna',
                'Valentina', 'Isla', 'Eliana', 'Quinn', 'Nevaeh', 'Ivy', 'Sadie', 'Piper', 'Lydia', 'Alexa',
                'Josephine', 'Emery', 'Julia', 'Delilah', 'Arianna', 'Vivian', 'Kaylee', 'Sophie', 'Brielle', 'Madeline'
            ]
        };

        this.lastNames = [
            'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
            'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
            'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson',
            'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores',
            'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter', 'Roberts',
            'Gomez', 'Phillips', 'Evans', 'Turner', 'Diaz', 'Parker', 'Cruz', 'Edwards', 'Collins', 'Reyes',
            'Stewart', 'Morris', 'Morales', 'Murphy', 'Cook', 'Rogers', 'Gutierrez', 'Ortiz', 'Morgan', 'Cooper',
            'Peterson', 'Bailey', 'Reed', 'Kelly', 'Howard', 'Ramos', 'Kim', 'Cox', 'Ward', 'Richardson',
            'Watson', 'Brooks', 'Chavez', 'Wood', 'James', 'Bennett', 'Gray', 'Mendoza', 'Ruiz', 'Hughes',
            'Price', 'Alvarez', 'Castillo', 'Sanders', 'Patel', 'Myers', 'Long', 'Ross', 'Foster', 'Jimenez'
        ];

        // Expanded bios with more variety
        this.bios = [
            "College student studying psychology. Love coffee shops, indie music, and deep conversations about life.",
            "Recent grad working in marketing. Always exploring the city and trying new restaurants on weekends.",
            "Art student with a passion for photography. You'll usually find me with a camera in hand.",
            "Software engineer by day, gamer by night. Love tech meetups and trying new craft beers.",
            "Nursing student who loves helping people. Enjoy hiking and yoga to balance the stressful days.",
            "Barista and part-time musician. Writing songs and pulling espresso shots are my specialties.",
            "Finance intern exploring the corporate world. Love networking events and weekend getaways.",
            "Biology major dreaming of med school. Spend my free time volunteering at animal shelters.",
            "Graphic designer with a love for minimalism. Always hunting for inspiration in the city.",
            "Education major who loves working with kids. Summer camp counselor and adventure seeker.",
            "Environmental science student passionate about sustainability. Love hiking and beach cleanups.",
            "Business student with entrepreneurial dreams. Always working on my next side project.",
            "Architecture student fascinated by urban design. You'll find me sketching in cafes.",
            "Communications major and social media manager. Love creating content and connecting with people.",
            "Chemistry student who loves lab work and research. Balance it out with dance classes.",
            "Political science major interested in activism. Attend rallies and volunteer for causes I believe in.",
            "Computer science student building apps. Love hackathons and coding challenges.",
            "Journalism student telling important stories. Always carrying a notebook for inspiration.",
            "Music production student making beats. Dream of producing for major artists someday.",
            "Fashion merchandising student with an eye for style. Love thrifting and sustainable fashion.",
            "Culinary arts student mastering pastry. My apartment always smells like fresh baked goods.",
            "Sports management major and college athlete. Live for game days and team bonding.",
            "Theater arts student and aspiring actor. Auditioning for roles while waiting tables.",
            "Economics student analyzing market trends. Love debating current events with friends.",
            "Psychology research assistant studying human behavior. Fascinated by what makes people tick.",
            "Marine biology student obsessed with the ocean. Spend weekends at the beach or aquarium.",
            "Film student directing short films. Always looking for interesting locations and stories.",
            "Social work intern helping communities. Believe in making a difference one person at a time.",
            "Mathematics tutor and puzzle enthusiast. Love solving problems and helping others learn.",
            "Foreign languages major dreaming of travel. Practicing my Spanish and French daily.",
            "Engineering student building robots. Compete in robotics competitions for fun.",
            "Public health student focused on wellness. Teach yoga classes on the side.",
            "History major with a museum internship. Love uncovering stories from the past.",
            "Hospitality management student working at a hotel. Enjoy making people feel welcome.",
            "Agriculture student with a green thumb. Maintain a community garden in my neighborhood.",
            "Physics student fascinated by the universe. Star gaze and read sci-fi in my free time.",
            "Dental hygiene student with a bright smile. Believe oral health connects to overall wellness.",
            "Aviation student working toward pilot license. Love the freedom of being in the air.",
            "Interior design student transforming spaces. Always rearranging my apartment furniture.",
            "Cybersecurity student protecting digital worlds. Ethical hacker and privacy advocate.",
            "Event planning student organizing campus activities. Love bringing people together.",
            "Fitness science major and personal trainer. Help others achieve their health goals.",
            "Animation student bringing characters to life. Spend hours perfecting digital art.",
            "Urban planning student designing better cities. Advocate for public transportation.",
            "Biotechnology researcher in a lab coat. Working on cutting-edge medical solutions.",
            "Sports medicine student treating athletes. Work with college teams on injury prevention.",
            "Video game design student creating worlds. Live for game jams and developer meetups.",
            "Sustainable fashion designer upcycling clothes. Run a small online boutique.",
            "Music therapy student healing with sound. Believe in the power of music for mental health.",
            "Adventure tourism guide in training. Lead hiking and camping trips on weekends.",
            // Additional bios for more variety
            "Graphic novelist working on my first comic series. Coffee and creativity fuel my days.",
            "Environmental lawyer in training. Passionate about climate justice and sustainability.",
            "Coffee roaster and café owner. Always searching for the perfect bean.",
            "Marine conservationist documenting coral reefs. SCUBA diving is my meditation.",
            "Urban farmer growing organic produce. Believe in food sovereignty and community.",
            "AI ethics researcher examining technology's impact on society. Future-focused thinker.",
            "Wildlife photographer capturing nature's beauty. Travel is my greatest teacher.",
            "Sommelier exploring wine regions. Turning passion into profession.",
            "Sustainable architect designing green buildings. Making cities more livable.",
            "Bilingual teacher connecting cultures. Language opens doors to understanding.",
            "Robotics engineer creating assistive devices. Technology should empower everyone.",
            "Indie game developer building immersive worlds. Storytelling through interaction.",
            "Poet capturing moments in verse. Words have the power to heal and transform.",
            "Community organizer building grassroots movements. Change starts locally.",
            "Ethical fashion blogger promoting conscious consumption. Style with substance.",
            "Adventure filmmaker documenting extreme sports. Life begins outside comfort zones.",
            "Food scientist developing plant-based alternatives. Creating delicious sustainability.",
            "Cultural anthropologist studying digital communities. The internet is my field site.",
            "Jazz musician composing new arrangements. Improvisation is life's greatest skill.",
            "Restoration ecologist healing damaged ecosystems. Giving nature a helping hand.",
            "Digital nomad working remotely from exotic locations. The world is my office.",
            "Ceramic artist shaping clay into functional art. There's magic in handmade things.",
            "Social entrepreneur launching impact ventures. Business can be a force for good.",
            "Astrophotographer capturing cosmic wonders. The universe puts everything in perspective.",
            "Permaculture designer creating self-sustaining gardens. Working with nature, not against it.",
            "Conflict resolution mediator facilitating difficult conversations. Building bridges between people.",
            "Virtual reality developer creating immersive experiences. Redefining reality one headset at a time.",
            "Indigenous rights advocate preserving cultural heritage. Honoring traditions while embracing progress.",
            "Sourdough baker perfecting the art of fermentation. Patience creates the best flavors.",
            "Urban explorer documenting forgotten spaces. History hides in plain sight.",
            "Circus arts performer mastering aerial silks. Trusting my body to fly.",
            "Microbiologist brewing craft kombucha. Fermentation is delicious science.",
            "Street artist transforming urban landscapes. Public spaces are my canvas.",
            "Forest therapy guide helping people reconnect with nature. Trees are the best therapists.",
            "Crypto economist studying decentralized finance. Reimagining money for the digital age.",
            "Book conservator preserving literary treasures. Giving old books new life.",
            "Disaster response coordinator preparing communities. Building resilience before it's needed.",
            "Ice sculptor creating ephemeral art. Beauty in transience.",
            "Voice actor bringing characters to life. Every voice tells a story.",
            "Mycelium researcher growing sustainable materials. Mushrooms might save the world.",
            "Traditional boat builder using ancient techniques. Keeping heritage crafts alive.",
            "Bird language interpreter understanding avian communication. Listening to nature's conversations.",
            "Toy designer creating educational playthings. Learning should be joyful.",
            "Rare book dealer hunting literary treasures. Every book has a story beyond its pages.",
            "Mosaic artist piecing together colorful narratives. Finding wholeness in brokenness.",
            "Futurist imagining possible tomorrows. Today's decisions shape what comes next.",
            "Professional forager harvesting wild edibles. Nature's grocery store is always open.",
            "Stop-motion animator bringing inanimate objects to life. Patience creates magic, frame by frame.",
            "Community historian documenting local stories. Every place has tales worth telling."
        ];

        // Expanded interests with more categories
        this.interests = [
            ['Coffee', 'Music Festivals', 'Photography', 'Travel', 'Art Galleries'],
            ['Brunch', 'Networking', 'City Exploration', 'Wine Tasting', 'Fashion'],
            ['Film Photography', 'Museums', 'Vinyl Records', 'Poetry', 'Coffee Shops'],
            ['Gaming', 'Tech Meetups', 'Craft Beer', 'Coding', 'VR Development'],
            ['Yoga', 'Hiking', 'Meditation', 'Wellness', 'Organic Cooking'],
            ['Live Music', 'Songwriting', 'Coffee Art', 'Open Mics', 'Vintage Shopping'],
            ['Networking Events', 'Travel', 'Fine Dining', 'Investment', 'Personal Growth'],
            ['Animal Rescue', 'Nature', 'Science', 'Volunteering', 'Outdoor Adventures'],
            ['Minimalism', 'Design', 'Urban Exploration', 'Typography', 'Creative Coding'],
            ['Child Development', 'Adventure', 'Education', 'Outdoor Activities', 'Crafts'],
            ['Sustainability', 'Hiking', 'Beach Cleanups', 'Environmental Activism', 'Gardening'],
            ['Entrepreneurship', 'Startups', 'Networking', 'Business', 'Personal Finance'],
            ['Urban Design', 'Sketching', 'Architecture', 'Cafe Culture', 'Museum Hopping'],
            ['Content Creation', 'Social Media', 'Networking', 'Photography', 'Branding'],
            ['Research', 'Dance', 'Science', 'Laboratory Work', 'Fitness'],
            ['Activism', 'Politics', 'Debate', 'Community Organizing', 'Public Speaking'],
            ['Hackathons', 'Coding', 'Tech', 'Gaming', 'Problem Solving'],
            ['Storytelling', 'Writing', 'Interviewing', 'Current Events', 'Photography'],
            ['Music Production', 'Beat Making', 'Concerts', 'Audio Engineering', 'DJing'],
            ['Fashion', 'Thrifting', 'Styling', 'Sustainable Fashion', 'Shopping'],
            ['Baking', 'Cooking', 'Food Photography', 'Recipe Development', 'Dining Out'],
            ['Sports', 'Fitness', 'Team Activities', 'Game Days', 'Leadership'],
            ['Acting', 'Theater', 'Film', 'Improv', 'Storytelling'],
            ['Economics', 'Debate', 'Current Events', 'Investment', 'Analysis'],
            ['Psychology', 'Research', 'Human Behavior', 'Counseling', 'Mental Health'],
            ['Marine Life', 'Ocean Conservation', 'Scuba Diving', 'Beach Activities', 'Science'],
            ['Filmmaking', 'Cinematography', 'Storyboarding', 'Film Analysis', 'Directing'],
            ['Community Service', 'Social Justice', 'Volunteering', 'Advocacy', 'Helping'],
            ['Puzzles', 'Mathematics', 'Tutoring', 'Problem Solving', 'Board Games'],
            ['Languages', 'Travel', 'Culture', 'International Cuisine', 'Language Exchange'],
            ['Robotics', 'Engineering', 'Technology', 'Innovation', 'Competitions'],
            ['Yoga', 'Wellness', 'Public Health', 'Meditation', 'Nutrition'],
            ['History', 'Museums', 'Research', 'Documentaries', 'Cultural Studies'],
            ['Hospitality', 'Customer Service', 'Travel', 'Cultural Exchange', 'Events'],
            ['Gardening', 'Sustainability', 'Farm-to-Table', 'Nature', 'Community'],
            ['Astronomy', 'Physics', 'Sci-Fi', 'Space Exploration', 'Research'],
            ['Dental Health', 'Wellness', 'Preventive Care', 'Education', 'Healthcare'],
            ['Aviation', 'Travel', 'Adventure', 'Technology', 'Navigation'],
            ['Interior Design', 'Home Decor', 'Space Planning', 'Color Theory', 'Renovation'],
            ['Cybersecurity', 'Privacy', 'Technology', 'Ethical Hacking', 'Digital Rights'],
            ['Event Planning', 'Networking', 'Social Media', 'Coordination', 'Marketing'],
            ['Fitness', 'Personal Training', 'Nutrition', 'Wellness', 'Sports'],
            ['Animation', 'Digital Art', 'Character Design', 'Storytelling', 'Gaming'],
            ['Urban Planning', 'Public Transit', 'Community Development', 'Sustainability', 'Design'],
            ['Biotech', 'Research', 'Medical Innovation', 'Laboratory Work', 'Science'],
            ['Sports Medicine', 'Athletics', 'Injury Prevention', 'Rehabilitation', 'Fitness'],
            ['Game Design', 'Development', 'Programming', 'Art', 'Storytelling'],
            ['Sustainable Fashion', 'Upcycling', 'Design', 'Eco-Friendly', 'Creativity'],
            ['Music Therapy', 'Mental Health', 'Performance', 'Counseling', 'Wellness'],
            ['Adventure', 'Outdoor Activities', 'Leadership', 'Travel', 'Exploration'],
            // New interest categories
            ['Digital Art', 'NFTs', 'Crypto Art', 'Generative Art', 'Blockchain'],
            ['Plant-Based Cooking', 'Veganism', 'Food Justice', 'Farmers Markets', 'Nutrition'],
            ['Astrophotography', 'Telescopes', 'Stargazing', 'Cosmology', 'Space Exploration'],
            ['Board Games', 'Tabletop RPGs', 'Game Design', 'Strategy Games', 'Social Gaming'],
            ['Urban Gardening', 'Hydroponics', 'Composting', 'Food Forests', 'Permaculture'],
            ['Podcasting', 'Audio Editing', 'Interviewing', 'Storytelling', 'Content Creation'],
            ['Mixed Media Art', 'Collage', 'Assemblage', 'Found Objects', 'Experimental Art'],
            ['Bird Watching', 'Ornithology', 'Nature Photography', 'Conservation', 'Outdoor Education'],
            ['Fermentation', 'Kombucha Brewing', 'Sourdough', 'Pickling', 'Food Preservation'],
            ['Historical Reenactment', 'Living History', 'Costume Design', 'Traditional Crafts', 'Museum Studies'],
            ['Rock Climbing', 'Bouldering', 'Mountaineering', 'Outdoor Adventure', 'Physical Challenge'],
            ['Zen Gardening', 'Japanese Aesthetics', 'Mindfulness', 'Stone Arrangement', 'Meditative Practices'],
            ['Vintage Computing', 'Retro Tech', 'Programming History', 'Hardware Restoration', 'Digital Archaeology'],
            ['Social Dancing', 'Swing Dance', 'Salsa', 'Partner Connection', 'Musicality'],
            ['Beekeeping', 'Pollinator Gardens', 'Honey Production', 'Ecology', 'Sustainable Agriculture'],
            ['Letterpress Printing', 'Typography', 'Book Arts', 'Traditional Printing', 'Paper Making'],
            ['Wild Foraging', 'Mushroom Hunting', 'Herbalism', 'Plant Identification', 'Survival Skills'],
            ['Virtual Reality', 'Augmented Reality', 'Mixed Reality', 'Spatial Computing', 'Immersive Tech'],
            ['Community Radio', 'Audio Production', 'Local News', 'Independent Media', 'Broadcast Journalism'],
            ['Ocean Sailing', 'Navigation', 'Marine Weather', 'Boat Maintenance', 'Coastal Exploration'],
            ['Miniature Painting', 'Tabletop Gaming', 'Model Building', 'Fine Detail Work', 'Creative Hobbies'],
            ['Genealogy', 'Family History', 'DNA Research', 'Historical Records', 'Ancestral Stories'],
            ['Urban Exploration', 'Abandoned Places', 'Industrial Archaeology', 'Photography', 'Adventure'],
            ['Tattoo Art', 'Body Modification', 'Custom Design', 'Artistic Expression', 'Cultural Traditions'],
            ['Kite Flying', 'Wind Sports', 'Aerodynamics', 'Outdoor Play', 'Community Events'],
            ['Mosaic Art', 'Tile Work', 'Public Art', 'Color Theory', 'Pattern Design'],
            ['Stand-up Comedy', 'Improv', 'Writing Jokes', 'Performance', 'Social Commentary'],
            ['Aquascaping', 'Aquarium Design', 'Fish Keeping', 'Aquatic Plants', 'Ecosystem Building'],
            ['Bookbinding', 'Paper Crafts', 'Journal Making', 'Traditional Skills', 'Artisan Crafts'],
            ['Astrology', 'Tarot', 'Spirituality', 'Self-Reflection', 'Mystical Studies'],
            ['Drone Photography', 'Aerial Videography', 'FAA Regulations', 'Cinematography', 'Technical Skills'],
            ['Sushi Making', 'Japanese Cuisine', 'Knife Skills', 'Food Presentation', 'Cultural Appreciation'],
            ['LARPing', 'Costume Design', 'Roleplaying', 'Fantasy Worlds', 'Community Building'],
            ['Archery', 'Traditional Bow Making', 'Target Practice', 'Historical Weapons', 'Focus Sports'],
            ['Perfume Making', 'Aromatherapy', 'Essential Oils', 'Scent Design', 'Chemistry of Fragrance'],
            ['Lock Picking', 'Security Studies', 'Physical Puzzles', 'Escape Rooms', 'Problem Solving'],
            ['Bonsai', 'Tree Cultivation', 'Japanese Art', 'Patience', 'Living Sculpture'],
            ['Fire Spinning', 'Flow Arts', 'Performance', 'Coordination', 'Festival Culture'],
            ['Historical Costuming', 'Sewing', 'Pattern Making', 'Fabric History', 'Reenactment'],
            ['Geocaching', 'GPS Games', 'Outdoor Adventure', 'Puzzle Solving', 'Global Community'],
            ['Pottery', 'Clay Work', 'Wheel Throwing', 'Glazing', 'Functional Art'],
            ['Mixology', 'Cocktail Creation', 'Spirit Education', 'Bartending', 'Flavor Chemistry'],
            ['Parkour', 'Urban Movement', 'Physical Fitness', 'Obstacle Navigation', 'Body Awareness'],
            ['Macramé', 'Fiber Arts', 'Knot Tying', 'Wall Hangings', 'Handmade Decor'],
            ['Wildlife Tracking', 'Animal Behavior', 'Outdoor Skills', 'Conservation', 'Nature Connection'],
            ['Coffee Roasting', 'Bean Selection', 'Flavor Profiling', 'Small Business', 'Global Trade'],
            ['Historical Fiction Writing', 'Research', 'World Building', 'Character Development', 'Storytelling'],
            ['Candle Making', 'Scent Design', 'Sustainable Materials', 'Small Business', 'Handmade Crafts'],
            ['Rock Tumbling', 'Lapidary', 'Jewelry Making', 'Geology', 'Mineral Collection'],
            ['Historical Swordsmanship', 'Martial Arts', 'European Martial Arts', 'Weapon Training', 'Tradition'],
            ['Succulent Gardening', 'Plant Care', 'Propagation', 'Indoor Gardening', 'Desert Plants'],
            ['Community Theater', 'Directing', 'Set Design', 'Performance', 'Collaborative Art']
        ];

        // Expanded locations
        this.locations = [
            'Brooklyn, NY', 'Los Angeles, CA', 'Chicago, IL', 'Austin, TX', 'Seattle, WA',
            'Denver, CO', 'Portland, OR', 'Nashville, TN', 'Atlanta, GA', 'Miami, FL',
            'Boston, MA', 'San Diego, CA', 'Philadelphia, PA', 'Phoenix, AZ', 'Las Vegas, NV',
            'Orlando, FL', 'San Francisco, CA', 'Washington, DC', 'Dallas, TX', 'Houston, TX',
            'Minneapolis, MN', 'New Orleans, LA', 'Salt Lake City, UT', 'Charlotte, NC', 'San Antonio, TX',
            'Columbus, OH', 'Indianapolis, IN', 'Kansas City, MO', 'Raleigh, NC', 'Tampa, FL',
            'Pittsburgh, PA', 'Cincinnati, OH', 'Baltimore, MD', 'St. Louis, MO', 'Milwaukee, WI',
            'Albuquerque, NM', 'Tucson, AZ', 'Fresno, CA', 'Sacramento, CA', 'Long Beach, CA',
            'Mesa, AZ', 'Virginia Beach, VA', 'Omaha, NE', 'Oakland, CA', 'Miami Beach, FL',
            'Honolulu, HI', 'Anchorage, AK', 'Portland, ME', 'Burlington, VT', 'Boulder, CO',
            // Additional locations for variety
            'Asheville, NC', 'Charleston, SC', 'Savannah, GA', 'Key West, FL', 'Santa Fe, NM',
            'Sedona, AZ', 'Moab, UT', 'Bend, OR', 'Bozeman, MT', 'Jackson Hole, WY',
            'Park City, UT', 'Aspen, CO', 'Santa Barbara, CA', 'Monterey, CA', 'Carmel, CA',
            'Napa, CA', 'Sonoma, CA', 'Lake Tahoe, CA', 'Mendocino, CA', 'Big Sur, CA',
            'Maui, HI', 'Kauai, HI', 'Santa Cruz, CA', 'San Luis Obispo, CA', 'Palm Springs, CA',
            'Scottsdale, AZ', 'Fort Collins, CO', 'Birmingham, AL', 'Louisville, KY', 'Memphis, TN',
            'Oklahoma City, OK', 'Tulsa, OK', 'Omaha, NE', 'Des Moines, IA', 'Madison, WI',
            'Ann Arbor, MI', 'Grand Rapids, MI', 'Cleveland, OH', 'Buffalo, NY', 'Rochester, NY',
            'Albany, NY', 'Hartford, CT', 'Providence, RI', 'Manchester, NH', 'Burlington, VT',
            'Portsmouth, NH', 'Newport, RI', 'Cape Cod, MA', 'Martha\'s Vineyard, MA', 'Nantucket, MA',
            'Virginia Beach, VA', 'Richmond, VA', 'Charlottesville, VA', 'Knoxville, TN', 'Chattanooga, TN',
            'Baton Rouge, LA', 'Little Rock, AR', 'Jackson, MS', 'Mobile, AL', 'Pensacola, FL',
            'Corpus Christi, TX', 'El Paso, TX', 'Albuquerque, NM', 'Tucson, AZ', 'Flagstaff, AZ',
            'Boise, ID', 'Spokane, WA', 'Eugene, OR', 'Salem, OR', 'Olympia, WA',
            'Billings, MT', 'Cheyenne, WY', 'Rapid City, SD', 'Fargo, ND', 'Sioux Falls, SD',
            'Lincoln, NE', 'Wichita, KS', 'Springfield, MO', 'Lexington, KY', 'Columbia, SC',
            'Augusta, GA', 'Tallahassee, FL', 'Jacksonville, FL', 'Orlando, FL', 'Tampa, FL',
            'Fort Lauderdale, FL', 'West Palm Beach, FL', 'Naples, FL', 'Sarasota, FL', 'Clearwater, FL'
        ];

        // Generate 150 unique DiceBear avatars
        this.generateDiceBearAvatars();
    }

    generateDiceBearAvatars() {
        this.profilePictures = [];
        const styles = ['adventurer', 'pixel-art', 'bottts', 'open-peeps', 'lorelei', 'micah', 'fun-emoji'];
        const seeds = [
            'Alex', 'Taylor', 'Jordan', 'Casey', 'Riley', 'Morgan', 'Quinn', 'Avery', 'Skyler', 'Rowan',
            'Charlie', 'Emerson', 'Finley', 'Harley', 'Jamie', 'Phoenix', 'River', 'Sage', 'Sawyer', 'Blake',
            'Dakota', 'Drew', 'Ellis', 'Emery', 'Justice', 'Kai', 'Marley', 'Micah', 'Nico', 'Peyton',
            'Reese', 'Remy', 'Rory', 'Salem', 'Shiloh', 'Spencer', 'Sterling', 'Tatum', 'Teagan', 'Winter',
            'Ash', 'Aspen', 'August', 'Briar', 'Brooks', 'Cedar', 'Clay', 'Dallas', 'Denver', 'Dune',
            'Eden', 'Forest', 'Garnet', 'Haven', 'Hunter', 'Indigo', 'Jade', 'Jasper', 'Lake', 'Lane',
            'Leif', 'Lennox', 'Meadow', 'Oakley', 'Ocean', 'Orion', 'Parker', 'Phoenix', 'Rain', 'Reed',
            'Ridge', 'Rio', 'Rocky', 'Ryder', 'Sage', 'Sky', 'Storm', 'Sunny', 'Talon', 'Temple',
            'Thorne', 'Tiger', 'Tundra', 'Valor', 'Vega', 'Wren', 'Zane', 'Zen', 'Zephyr', 'Zion',
            'Ace', 'Archer', 'Arrow', 'Bandit', 'Blaze', 'Bolt', 'Brick', 'Champ', 'Chase', 'Chief',
            'Cobra', 'Comet', 'Dash', 'Fang', 'Flash', 'Ghost', 'Gunner', 'Hawk', 'Jax', 'Jet',
            'Jett', 'King', 'Knight', 'Legend', 'Maverick', 'Nitro', 'Phoenix', 'Ranger', 'Rebel', 'Rogue',
            'Rusty', 'Scout', 'Shadow', 'Shooter', 'Sniper', 'Sparky', 'Spike', 'Storm', 'Tank', 'Thor',
            'Titan', 'Trapper', 'Trooper', 'Viking', 'Warrior', 'Wolf', 'Zeus', 'Zorro'
        ];

        // Generate 150 unique avatars
        let avatarCount = 0;
        for (let i = 0; i < 100 && avatarCount < 150; i++) {
            for (const style of styles) {
                if (avatarCount >= 150) break;
                
                // Create unique seed by combining name with index
                const uniqueSeed = `${seeds[i % seeds.length]}${avatarCount}${Date.now()}`;
                const avatarUrl = `https://api.dicebear.com/7.x/${style}/svg?seed=${encodeURIComponent(uniqueSeed)}`;
                this.profilePictures.push(avatarUrl);
                avatarCount++;
            }
        }

        // Add some RoboHash for variety
        const roboSets = ['set1', 'set2', 'set3', 'set4'];
        while (this.profilePictures.length < 150) {
            const set = roboSets[Math.floor(Math.random() * roboSets.length)];
            const uniqueId = `user${this.profilePictures.length}${Date.now()}`;
            this.profilePictures.push(`https://robohash.org/${uniqueId}.png?set=${set}`);
        }

        console.log(`Generated ${this.profilePictures.length} unique DiceBear avatars`);
        this.shuffleArray(this.profilePictures);
    }

    // Fisher-Yates shuffle algorithm to randomize photo assignment
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    generateProfile(id) {
        const gender = Math.random() > 0.5 ? 'male' : 'female';
        const firstName = this.names[gender][Math.floor(Math.random() * this.names[gender].length)];
        const lastName = this.lastNames[Math.floor(Math.random() * this.lastNames.length)];
        const age = Math.floor(Math.random() * 15) + 20; // 20-34 years old
        
        // Create unique email with less predictable pattern
        const randomNum = Math.floor(Math.random() * 1000);
        const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${randomNum}@datingapp.com`;
        
        // Each profile gets a unique picture - no repeats!
        const pictureIndex = id - 1; // IDs start from 1, array from 0
        
        // Ensure all required fields are present
        return {
            id: `profile_${id}`,
            email: email,
            password: 'default123',
            profileData: {
                name: `${firstName} ${lastName}`,
                age: age,
                gender: gender,
                location: this.locations[Math.floor(Math.random() * this.locations.length)],
                bio: this.bios[Math.floor(Math.random() * this.bios.length)],
                interests: this.interests[Math.floor(Math.random() * this.interests.length)],
                profileImage: this.profilePictures[pictureIndex % this.profilePictures.length],
                likes: Math.floor(Math.random() * 150) + 50, // 50-200 likes
                profileComplete: true,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
                isDefaultProfile: true,
                chatPoints: Math.floor(Math.random() * 100) + 50, // 50-150 chat points
                isYoungProfile: true,
                email: email,
                uid: `profile_${id}`, // Temporary, will be replaced with actual UID
                // Additional fields for better matching
                education: this.getRandomEducation(),
                occupation: this.getRandomOccupation(),
                relationshipGoals: this.getRandomRelationshipGoals(),
                height: this.getRandomHeight(gender),
                zodiacSign: this.getRandomZodiac(),
                drinkingHabits: this.getRandomDrinkingHabits(),
                smokingHabits: this.getRandomSmokingHabits(),
                exerciseHabits: this.getRandomExerciseHabits(),
                lookingFor: this.getRandomLookingFor(gender)
            }
        };
    }

    // Helper methods for additional profile fields
    getRandomEducation() {
        const educations = [
            'High School Diploma',
            'Some College',
            'Associate Degree',
            'Bachelor\'s Degree',
            'Master\'s Degree',
            'Doctorate',
            'Trade School',
            'Currently in College',
            'Graduate Student'
        ];
        return educations[Math.floor(Math.random() * educations.length)];
    }

    getRandomOccupation() {
        const occupations = [
            'Student', 'Software Developer', 'Graphic Designer', 'Teacher', 'Nurse',
            'Marketing Specialist', 'Sales Representative', 'Artist', 'Writer', 'Chef',
            'Bartender', 'Engineer', 'Accountant', 'Consultant', 'Entrepreneur',
            'Freelancer', 'Research Assistant', 'Project Manager', 'Social Media Manager',
            'Fitness Trainer', 'Barista', 'Retail Manager', 'Event Planner', 'Photographer',
            'Musician', 'Actor', 'Real Estate Agent', 'Interior Designer', 'Architect',
            'Lab Technician', 'Paralegal', 'Banker', 'Insurance Agent', 'Recruiter',
            'Customer Service', 'Content Creator', 'Influencer', 'Streamer', 'Gamer'
        ];
        return occupations[Math.floor(Math.random() * occupations.length)];
    }

    getRandomRelationshipGoals() {
        const goals = [
            'Long-term relationship',
            'Short-term dating',
            'Friends first',
            'Casual dating',
            'See what happens',
            'Marriage-minded',
            'Open to possibilities',
            'Finding a partner',
            'Building a future together',
            'Meeting new people'
        ];
        return goals[Math.floor(Math.random() * goals.length)];
    }

    getRandomHeight(gender) {
        if (gender === 'male') {
            return `${Math.floor(Math.random() * 10) + 66}"`; // 5'6" to 6'4"
        } else {
            return `${Math.floor(Math.random() * 10) + 60}"`; // 5'0" to 5'10"
        }
    }

    getRandomZodiac() {
        const zodiacs = [
            'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
            'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
        ];
        return zodiacs[Math.floor(Math.random() * zodiacs.length)];
    }

    getRandomDrinkingHabits() {
        const habits = [
            'Socially',
            'Never',
            'Occasionally',
            'Frequently',
            'Sober',
            'Rarely',
            'On special occasions'
        ];
        return habits[Math.floor(Math.random() * habits.length)];
    }

    getRandomSmokingHabits() {
        const habits = [
            'Non-smoker',
            'Social smoker',
            'Smoker',
            'Vapes',
            'Trying to quit',
            'Never'
        ];
        return habits[Math.floor(Math.random() * habits.length)];
    }

    getRandomExerciseHabits() {
        const habits = [
            'Daily',
            'Several times a week',
            'Weekly',
            'Occasionally',
            'Rarely',
            'Never',
            'When I can'
        ];
        return habits[Math.floor(Math.random() * habits.length)];
    }

    getRandomLookingFor(gender) {
        const lookingFor = gender === 'male' ? 
            ['Women', 'Everyone'] : 
            ['Men', 'Everyone'];
        return lookingFor[Math.floor(Math.random() * lookingFor.length)];
    }

    async createProfile(profileData) {
        try {
            console.log(`Creating profile: ${profileData.email}`);
            
            const userCredential = await createUserWithEmailAndPassword(
                auth, 
                profileData.email, 
                profileData.password
            );
            
            const user = userCredential.user;
            
            // Create complete profile data with all required fields
            const completeProfileData = {
                ...profileData.profileData,
                email: profileData.email,
                uid: user.uid,
                name: profileData.profileData.name || 'Unknown',
                profileComplete: true,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            };
            
            await setDoc(doc(db, 'users', user.uid), completeProfileData);

            await setDoc(doc(db, 'status', user.uid), {
                state: 'offline',
                lastChanged: serverTimestamp()
            });

            console.log(`✅ Created: ${completeProfileData.name} (${completeProfileData.age}) - ${completeProfileData.profileImage.substring(0, 50)}...`);
            return { success: true, userId: user.uid, profile: profileData };
            
        } catch (error) {
            console.error(`❌ Error creating ${profileData.email}:`, error);
            return { success: false, error: error.message, profile: profileData };
        }
    }

    async createMultipleProfiles(count = 150) {
        console.log(`Starting creation of ${count} young profiles (20-34 years old)...`);
        console.log(`Using ${this.profilePictures.length} unique DiceBear avatars`);
        
        const profiles = [];
        for (let i = 1; i <= count; i++) {
            profiles.push(this.generateProfile(i));
        }
        
        // Verify no duplicate photos
        const usedPhotos = new Set();
        let hasDuplicates = false;
        profiles.forEach(profile => {
            if (usedPhotos.has(profile.profileData.profileImage)) {
                console.warn(`⚠️ DUPLICATE PHOTO: ${profile.profileData.name} - ${profile.profileData.profileImage}`);
                hasDuplicates = true;
            }
            usedPhotos.add(profile.profileData.profileImage);
        });
        
        if (!hasDuplicates) {
            console.log('✅ All profiles have unique avatars!');
        } else {
            console.log('❌ Some avatars are duplicated!');
        }
        
        const results = [];
        let created = 0;
        
        for (const profile of profiles) {
            const result = await this.createProfile(profile);
            results.push(result);
            created++;
            
            // Update progress
            if (typeof window.updateProgress === 'function') {
                window.updateProgress(created, count, profile.profileData.name);
            }
            
            // Slightly longer delay to avoid Firebase rate limiting
            await new Promise(resolve => setTimeout(resolve, 800));
        }
        
        const successful = results.filter(r => r.success);
        const failed = results.filter(r => !r.success);
        
        console.log(`🎉 Completed! Successful: ${successful.length}, Failed: ${failed.length}`);
        
        // Store credentials for display
        window.profileCredentials = successful.map(r => ({
            name: r.profile.profileData.name,
            email: r.profile.email,
            password: r.profile.password,
            age: r.profile.profileData.age,
            location: r.profile.profileData.location,
            photo: r.profile.profileData.profileImage,
            interests: r.profile.profileData.interests
        }));
        
        return { successful, failed };
    }
}

// Create global instance
const profileCreator = new ProfileCreator();

// Export the instance and function
export { profileCreator };
export const createProfiles = (count = 150) => profileCreator.createMultipleProfiles(count);