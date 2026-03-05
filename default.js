// default.js - Script to create 100 default groups with unique names and populated with users

import { 
    getFirestore, 
    collection, 
    doc, 
    setDoc, 
    getDoc,
    query,
    getDocs,
    writeBatch,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import { 
    getAuth
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

 const firebaseConfig = {
    apiKey: "AIzaSyC9jF-ocy6HjsVzWVVlAyXW-4aIFgA79-A",
    authDomain: "crypto-6517d.firebaseapp.com",
    projectId: "crypto-6517d",
    storageBucket: "crypto-6517d.firebasestorage.app",
    messagingSenderId: "60263975159",
    appId: "1:60263975159:web:bd53dcaad86d6ed9592bf2"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Unique fun group names (100 names)
const GROUP_NAMES = [
    "CyberPunk Gamers 🎮", "Pixel Warriors 👾", "Meme Lords 😂", "Stream Squad 📺",
    "VR Legends 🥽", "Esports Elite 🏆", "Retro Revival 🕹️", "Speedrun Masters ⚡",
    "Battle Royale Crew 🎯", "Indie Game Explorers 🗺️", "Cosplay Crusaders 🦸",
    "Anime & Gaming Fusion 🌸", "Strategy Geniuses ♟️", "Horror Game Hunters 👻",
    "RPG Adventurers 🐉", "Simulation Nation 🏙️", "Music Rhythm Crew 🎵",
    "Fighting Game Dojo 🥋", "Puzzle Masters 🧩", "Sandbox Creators 🏗️",
    "Racing Legends 🏎️", "Sports Gaming League 🏈", "Survival Experts 🌲",
    "MMO Guild " + Math.floor(Math.random() * 1000), "Co-op Champions 🤝",
    "Speed Demons 🏍️", "Loot Hunters 💎", "Boss Slayers 👑", "Glitch Finders 🔍",
    "Modding Mavericks 🔧", "Speed Chatters 💬", "Voice Chat Legends 🎤",
    "ScreenShare Squad 📱", "Game Dev Dreamers 💭", "Concept Artists 🎨",
    "Sound Design Crew 🔊", "Storytelling Guild 📖", "World Builders 🌍",
    "Character Creators 👤", "Lore Masters 📜", "Game Jam Junkies ⏱️",
    "Beta Testers 🔬", "Early Access Crew 🔓", "Kickstarter Backers 💰",
    "Console Collectors 📦", "PC Master Race 🖥️", "Mobile Gamers 📱",
    "Handheld Heroes 🎮", "Retro Console Club 📼", "Arcade Legends 🕹️",
    "Tournament Titans 🏅", "Competitive Clash ⚔️", "Ranked Warriors 📊",
    "Casual Crusaders ☕", "Weekend Warriors 🎪", "Night Owls 🦉",
    "Early Birds 🌅", "GMT Gang 🌐", "Global Gamers 🌎", "Local Legends 🏠",
    "LAN Party Crew 🔌", "Online Only ⚡", "Crossplay Crew ↔️",
    "Platform Unifiers 🔄", "Cloud Gaming Pioneers ☁️", "VR Chat Warriors 🗣️",
    "Metaverse Explorers 🌌", "NFT Gaming Guild 🖼️", "Blockchain Battlers ⛓️",
    "Crypto Gamers ₿", "Play-to-Earn Crew 💸", "GameFi Enthusiasts 📈",
    "Web3 Warriors 🌐", "DAO Gamers 🗳️", "DeFi Raiders 💰", "AI Gaming 🤖",
    "Machine Learning Masters 🧠", "Neural Network Ninjas 🥷", "Algorithm Avengers ⚙️",
    "Quantum Gamers ⚛️", "Sci-Fi Squad 🚀", "Fantasy Fellowship 🧙",
    "Steampunk Society ⚙️", "Cyberpunk Collective 🤖", "Dieselpunk Division ⛽",
    "Biotech Gamers 🧬", "Space Explorers 🚀", "Deep Sea Divers 🌊",
    "Time Travelers ⏳", "Multiverse Mercenaries 🔀", "Dimension Hoppers 🌀",
    "Reality Benders 🔮", "Simulation Theorists 🤔", "Conspiracy Crew 🕵️",
    "Mystery Solvers 🔎", "Puzzle Hunters 🧭", "Escape Room Masters 🔐",
    "ARG Adventurers 🗺️", "Interactive Storytellers 📖", "Choose Your Adventure 📚",
    "Visual Novel Fans 🎭", "Dating Sim Squad 💘", "Life Sim Lovers 🏡"
];

// Secret gamer name components
const GAMER_PREFIXES = [
    "Shadow", "Stealth", "Cyber", "Neon", "Ghost", "Phantom", "Silent", "Dark",
    "Midnight", "Rogue", "Ninja", "Samurai", "Dragon", "Phoenix", "Wolf", "Tiger",
    "Falcon", "Hawk", "Eagle", "Viper", "Cobra", "Python", "Java", "C++", "Ruby",
    "Python", "Swift", "Rust", "Go", "Kotlin", "Type", "Void", "Null", "Zero",
    "Alpha", "Beta", "Gamma", "Delta", "Omega", "Sigma", "Lambda", "Quantum",
    "Nano", "Micro", "Mega", "Giga", "Tera", "Peta", "Exa", "Zetta", "Yotta"
];

const GAMER_SUFFIXES = [
    "Slayer", "Hunter", "Killer", "Destroyer", "Master", "Lord", "King", "Queen",
    "Prince", "Princess", "Knight", "Warrior", "Soldier", "Mercenary", "Assassin",
    "Spy", "Agent", "Operative", "Pilot", "Captain", "Commander", "General",
    "Admiral", "Warlord", "Champion", "Hero", "Villain", "Outlaw", "Bandit",
    "Pirate", "Viking", "Samurai", "Ninja", "Ronin", "Shinobi", "Jedi", "Sith",
    "Mage", "Wizard", "Sorcerer", "Warlock", "Necromancer", "Druid", "Priest",
    "Paladin", "Cleric", "Bard", "Ranger", "Rogue", "Monk", "Barbarian"
];

const GAMER_NUMBERS = ["", "X", "Z", "99", "88", "77", "66", "55", "44", "33", "22", "11", "01", "02", "03"];

const GAMER_SYMBOLS = ["", "_", ".", "-", "x", "X", ""];

// Fun gaming profile bios
const GAMER_BIOS = [
    "Professional button masher 🎮 | Living in my gaming chair | Caffeine-powered",
    "Glitch hunter 🔍 | Speedrun enthusiast ⚡ | Collecting rare achievements",
    "MMO addict 🐉 | Raid leader | Professional loot distributor",
    "Casual competitive player 🏆 | Sometimes wins | Always has fun",
    "Retro game collector 📼 | CRT enthusiast | 8-bit music lover",
    "VR pioneer 🥽 | Motion sickness survivor | Virtual world explorer",
    "Indie game supporter 🎨 | Backing Kickstarters | Discovering hidden gems",
    "Esports spectator 📺 | Couch coach | Monday morning strategist",
    "Modding community member 🔧 | Texture pack creator | Unofficial patch maker",
    "Lore nerd 📖 | Reading item descriptions | Writing fan theories",
    "Speed chat master 💬 | Typing while gaming | Multitasking legend",
    "Night owl gamer 🦉 | 3 AM raid specialist | Sleep schedule? Never heard of it",
    "Controller collector 🎮 | Has every special edition | Still uses keyboard",
    "Achievement hunter 🏆 | 100% completionist | Grinding for that last trophy",
    "Beta tester 🔬 | Finding bugs before they're cool | Crash report specialist",
    "Cosplay gamer 🦸 | Character impersonator | Convention regular",
    "Soundtrack enthusiast 🎵 | Gaming playlist curator | Chiptune lover",
    "Strategy guide reader 📚 | Knows all the secrets | Spoiler alert!",
    "Local multiplayer fan 🎪 | Couch co-op champion | Split-screen expert",
    "Cloud gaming pioneer ☁️ | Playing everywhere | Data cap destroyer"
];

// Avatar options
const AVATAR_OPTIONS = [
    'https://api.dicebear.com/7.x/avataaars/svg?seed=gamer1',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=gamer2',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=gamer3',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=gamer4',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=gamer5',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=gamer6',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=gamer7',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=gamer8',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=gamer9',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=gamer10'
];

class DefaultGroupCreator {
    constructor() {
        this.progressLog = [];
        this.createdGroups = 0;
        this.createdUsers = 0;
        this.isRunning = false;
    }

    log(message, type = 'info') {
        const timestamp = new Date().toLocaleTimeString();
        const logEntry = `[${timestamp}] ${message}`;
        this.progressLog.push({ message: logEntry, type });
        console.log(`[${type.toUpperCase()}] ${logEntry}`);
        
        // Update UI if exists
        const logContainer = document.getElementById('progressLog');
        if (logContainer) {
            const logElement = document.createElement('div');
            logElement.className = `log-entry ${type}`;
            logElement.textContent = logEntry;
            logContainer.appendChild(logElement);
            logContainer.scrollTop = logContainer.scrollHeight;
        }
    }

    generateSecretGamerName() {
        const prefix = GAMER_PREFIXES[Math.floor(Math.random() * GAMER_PREFIXES.length)];
        const suffix = GAMER_SUFFIXES[Math.floor(Math.random() * GAMER_SUFFIXES.length)];
        const number = GAMER_NUMBERS[Math.floor(Math.random() * GAMER_NUMBERS.length)];
        const symbol = GAMER_SYMBOLS[Math.floor(Math.random() * GAMER_SYMBOLS.length)];
        
        // Random name pattern
        const patterns = [
            `${prefix}${symbol}${suffix}${number}`,
            `${prefix}${suffix}${number}`,
            `${suffix}${symbol}${prefix}${number}`,
            `${prefix}${number}${symbol}${suffix}`,
            `xX_${prefix}${suffix}${number}_Xx`,
            `The${prefix}${suffix}`,
            `${prefix}The${suffix}`
        ];
        
        return patterns[Math.floor(Math.random() * patterns.length)];
    }

    generateAnonymousUsername() {
        const anonymousPatterns = [
            `Anonymous${Math.floor(Math.random() * 9999)}`,
            `User${Math.floor(Math.random() * 99999)}`,
            `Player${Math.floor(Math.random() * 999)}`,
            `Guest${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${Math.floor(Math.random() * 999)}`,
            `Spectator${Math.floor(Math.random() * 99)}`,
            `Visitor${Math.floor(Math.random() * 999)}`
        ];
        
        return anonymousPatterns[Math.floor(Math.random() * anonymousPatterns.length)];
    }

    generateEmail(username) {
        const domains = ['gamer.com', 'player.io', 'games.mail', 'virtual.email', 'cyber.mail'];
        const domain = domains[Math.floor(Math.random() * domains.length)];
        return `${username.toLowerCase().replace(/[^a-z0-9]/g, '')}@${domain}`;
    }

    generateRandomBio() {
        return GAMER_BIOS[Math.floor(Math.random() * GAMER_BIOS.length)];
    }

    generateRandomAvatar() {
        return AVATAR_OPTIONS[Math.floor(Math.random() * AVATAR_OPTIONS.length)];
    }

    generateInviteCode() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let code = '';
        for (let i = 0; i < 8; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return code;
    }

    async getAllUsers() {
        try {
            this.log('Fetching all existing users from database...');
            const usersRef = collection(db, 'group_users');
            const usersSnapshot = await getDocs(usersRef);
            const users = [];
            
            usersSnapshot.forEach(doc => {
                users.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            
            this.log(`Found ${users.length} existing users in database`);
            return users;
        } catch (error) {
            this.log(`Error fetching users: ${error.message}`, 'error');
            return [];
        }
    }

    async createTestUsers(count = 300) {
        this.log(`Creating ${count} test users with secret gamer names...`);
        const batch = writeBatch(db);
        const createdUsers = [];
        
        for (let i = 0; i < count; i++) {
            const isAnonymous = Math.random() > 0.7; // 30% anonymous users
            const username = isAnonymous ? 
                this.generateAnonymousUsername() : 
                this.generateSecretGamerName();
            
            const email = this.generateEmail(username);
            const userId = `test_user_${Date.now()}_${i}`;
            const userRef = doc(db, 'group_users', userId);
            
            const userData = {
                displayName: username,
                email: email,
                avatar: this.generateRandomAvatar(),
                bio: this.generateRandomBio(),
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
                lastSeen: serverTimestamp(),
                isTestUser: true,
                isAnonymous: isAnonymous,
                secretName: username // Store the secret name
            };
            
            batch.set(userRef, userData);
            createdUsers.push({
                id: userId,
                ...userData
            });
            
            if (i % 50 === 0) {
                this.log(`Created ${i + 1} test users...`);
            }
        }
        
        try {
            await batch.commit();
            this.createdUsers += count;
            this.log(`Successfully created ${count} test users with secret gamer names!`);
            return createdUsers;
        } catch (error) {
            this.log(`Error creating test users: ${error.message}`, 'error');
            return [];
        }
    }

    async createDefaultGroups(groupsCount = 100, allUsers) {
        this.log(`Starting creation of ${groupsCount} default groups...`);
        
        const groupsToCreate = GROUP_NAMES.slice(0, groupsCount);
        const createdGroups = [];
        
        for (let i = 0; i < groupsToCreate.length; i++) {
            const groupName = groupsToCreate[i];
            this.log(`Creating group ${i + 1}/${groupsCount}: "${groupName}"`);
            
            try {
                const group = await this.createSingleGroup(groupName, allUsers, i);
                if (group) {
                    createdGroups.push(group);
                    this.createdGroups++;
                    
                    // Update progress
                    const progressElement = document.getElementById('progressCount');
                    if (progressElement) {
                        progressElement.textContent = `${this.createdGroups}/${groupsCount}`;
                    }
                    
                    const progressBar = document.getElementById('progressBar');
                    if (progressBar) {
                        progressBar.style.width = `${(this.createdGroups / groupsCount) * 100}%`;
                    }
                }
                
                // Small delay to avoid rate limiting
                await new Promise(resolve => setTimeout(resolve, 100));
                
            } catch (error) {
                this.log(`Failed to create group "${groupName}": ${error.message}`, 'error');
            }
        }
        
        return createdGroups;
    }

    async createSingleGroup(groupName, allUsers, index) {
        const groupRef = doc(collection(db, 'groups'));
        const groupId = groupRef.id;
        
        // Random group properties
        const categories = ['gaming', 'social', 'entertainment', 'tech', 'creative', 'education'];
        const category = categories[Math.floor(Math.random() * categories.length)];
        
        const privacyOptions = ['public', 'private'];
        const privacy = privacyOptions[Math.floor(Math.random() * privacyOptions.length)];
        
        const inviteCode = this.generateInviteCode();
        const inviteLink = `https://bondlydatingweb.vercel.app/join.html?code=${inviteCode}`;
        
        // Group description based on name
        const descriptions = {
            gaming: `Welcome to ${groupName}! A community of passionate gamers discussing strategies, sharing clips, and organizing game sessions.`,
            social: `${groupName} - Connect with like-minded people, make new friends, and share your gaming experiences in a friendly environment.`,
            entertainment: `${groupName}: Where entertainment meets gaming. Movie nights, game streams, and fun discussions!`,
            tech: `${groupName} - Tech enthusiasts and gamers discussing hardware, software, and the latest in gaming technology.`,
            creative: `${groupName}: A creative space for gamers who also love art, music, writing, and game development.`,
            education: `${groupName} - Learn gaming strategies, improve your skills, and share knowledge with fellow gamers.`
        };
        
        const description = descriptions[category] || `Welcome to ${groupName}! Join our growing community.`;
        
        // Generate topics
        const allTopics = [
            'Game Strategies', 'Clip Sharing', 'Tournaments', 'New Releases',
            'Hardware Discussion', 'Software Tips', 'Streaming Tips', 'Content Creation',
            'Fan Art', 'Cosplay', 'Music & Soundtracks', 'Game Development',
            'Speedrunning', 'Achievement Hunting', 'Collecting', 'Retro Gaming',
            'VR/AR Gaming', 'Mobile Gaming', 'Indie Games', 'AAA Titles',
            'Game Reviews', 'Recommendations', 'Technical Support', 'Bug Reports',
            'Modding', 'Custom Content', 'Community Events', 'Giveaways',
            'Q&A Sessions', 'Beginner Tips', 'Advanced Tactics', 'Esports'
        ];
        
        const topics = [];
        const topicsCount = Math.floor(Math.random() * 5) + 3; // 3-7 topics
        for (let j = 0; j < topicsCount; j++) {
            const randomTopic = allTopics[Math.floor(Math.random() * allTopics.length)];
            if (!topics.includes(randomTopic)) {
                topics.push(randomTopic);
            }
        }
        
        // Generate rules
        const allRules = [
            'Be respectful to all members',
            'No hate speech or harassment',
            'Keep discussions relevant to gaming',
            'No spamming or self-promotion without permission',
            'Respect different opinions and playstyles',
            'Keep personal information private',
            'No cheating or hacking discussions',
            'Have fun and enjoy the community!'
        ];
        
        const rules = [];
        const rulesCount = Math.floor(Math.random() * 4) + 3; // 3-6 rules
        for (let j = 0; j < rulesCount; j++) {
            rules.push(allRules[j]);
        }
        
        // Group data
        const groupData = {
            id: groupId,
            name: groupName,
            description: description,
            category: category,
            topics: topics,
            rules: rules,
            restrictedWords: ['hate', 'spam', 'cheat', 'hack'], // Basic restricted words
            maxMembers: 1000,
            privacy: privacy,
            createdBy: 'system', // System-created groups
            creatorName: 'System Admin',
            creatorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=system',
            photoUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(groupName)}&backgroundColor=00897b&backgroundType=gradientLinear`,
            memberCount: 0, // Will be updated after adding members
            inviteCode: inviteCode,
            inviteLink: inviteLink,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            lastActivity: serverTimestamp(),
            isDefaultGroup: true,
            groupIndex: index + 1
        };
        
        try {
            // Create the group document
            await setDoc(groupRef, groupData);
            this.log(`Created group document: ${groupName}`);
            
            // Add random members to the group
            const membersAdded = await this.addMembersToGroup(groupId, groupName, allUsers);
            
            // Update member count
            await setDoc(groupRef, {
                memberCount: membersAdded,
                updatedAt: serverTimestamp()
            }, { merge: true });
            
            this.log(`Added ${membersAdded} members to ${groupName}`);
            
            // Add system message for all joined users
            await this.addSystemJoinMessage(groupId, membersAdded);
            
            return {
                ...groupData,
                actualMemberCount: membersAdded
            };
            
        } catch (error) {
            throw new Error(`Failed to create group ${groupName}: ${error.message}`);
        }
    }

    async addMembersToGroup(groupId, groupName, allUsers) {
        if (!allUsers || allUsers.length === 0) {
            this.log('No users available to add to group', 'warning');
            return 0;
        }
        
        // Random number of members (50-200)
        const targetMembers = Math.floor(Math.random() * 151) + 50;
        const actualMembers = Math.min(targetMembers, allUsers.length);
        
        this.log(`Adding ${actualMembers} random members to ${groupName}...`);
        
        const batch = writeBatch(db);
        const shuffledUsers = [...allUsers].sort(() => Math.random() - 0.5);
        const selectedUsers = shuffledUsers.slice(0, actualMembers);
        
        let addedCount = 0;
        for (let i = 0; i < selectedUsers.length; i++) {
            const user = selectedUsers[i];
            const memberRef = doc(db, 'groups', groupId, 'members', user.id);
            
            const memberData = {
                id: user.id,
                name: user.displayName || user.secretName || 'Anonymous Gamer',
                avatar: user.avatar || this.generateRandomAvatar(),
                bio: user.bio || 'Secret gamer',
                role: i === 0 ? 'creator' : 'member', // First user as creator
                joinedAt: serverTimestamp(),
                lastActive: serverTimestamp(),
                isTestUser: user.isTestUser || false,
                isAnonymous: user.isAnonymous || false
            };
            
            batch.set(memberRef, memberData);
            addedCount++;
            
            // Commit in batches of 100 to avoid Firestore limits
            if (addedCount % 100 === 0) {
                try {
                    await batch.commit();
                    this.log(`Committed batch of 100 members to ${groupName}`);
                } catch (error) {
                    this.log(`Error committing batch: ${error.message}`, 'error');
                }
            }
        }
        
        // Commit remaining members
        if (addedCount % 100 !== 0) {
            try {
                await batch.commit();
            } catch (error) {
                this.log(`Error committing final batch: ${error.message}`, 'error');
            }
        }
        
        return addedCount;
    }

    async addSystemJoinMessage(groupId, memberCount) {
        try {
            const messagesRef = collection(db, 'groups', groupId, 'messages');
            
            // Create a system message
            await setDoc(doc(messagesRef), {
                type: 'system',
                text: `🌟 ${memberCount} users have joined the group! Welcome all secret gamers and anonymous users! 🎮`,
                timestamp: serverTimestamp(),
                senderId: 'system',
                senderName: 'System',
                senderAvatar: '',
                systemEvent: 'users_joined',
                joinedCount: memberCount
            });
            
            this.log(`Added system join message for ${memberCount} users`);
        } catch (error) {
            this.log(`Error adding system message: ${error.message}`, 'error');
        }
    }

    async runCreationProcess() {
        if (this.isRunning) {
            this.log('Creation process already running', 'warning');
            return;
        }
        
        this.isRunning = true;
        this.log('=== Starting Default Group Creation Process ===', 'success');
        
        try {
            // Get existing users first
            let allUsers = await this.getAllUsers();
            
            // If not enough users, create test users
            if (allUsers.length < 200) {
                this.log(`Only ${allUsers.length} users found, creating additional test users...`);
                const newUsers = await this.createTestUsers(300);
                allUsers = [...allUsers, ...newUsers];
            }
            
            this.log(`Total users available: ${allUsers.length}`);
            
            // Create default groups
            const createdGroups = await this.createDefaultGroups(100, allUsers);
            
            // Summary
            this.log('=== Creation Process Complete ===', 'success');
            this.log(`Created ${this.createdGroups} groups successfully`);
            this.log(`Total users in database: ${allUsers.length}`);
            
            // Log all created groups
            this.log('\nCreated Groups Summary:', 'success');
            createdGroups.forEach((group, index) => {
                this.log(`${index + 1}. ${group.name} - ${group.actualMemberCount || 0} members - ${group.category}`);
            });
            
            return {
                success: true,
                groupsCreated: this.createdGroups,
                totalUsers: allUsers.length,
                groups: createdGroups
            };
            
        } catch (error) {
            this.log(`Process failed: ${error.message}`, 'error');
            return {
                success: false,
                error: error.message
            };
        } finally {
            this.isRunning = false;
        }
    }

    async cleanupTestData() {
        if (!confirm('WARNING: This will delete ALL test users and default groups. Are you sure?')) {
            return;
        }
        
        this.log('Starting cleanup of test data...');
        
        try {
            // Delete test users
            const usersRef = collection(db, 'group_users');
            const usersSnapshot = await getDocs(usersRef);
            const batch = writeBatch(db);
            let userCount = 0;
            
            usersSnapshot.forEach(docSnap => {
                const userData = docSnap.data();
                if (userData.isTestUser) {
                    batch.delete(docSnap.ref);
                    userCount++;
                }
            });
            
            if (userCount > 0) {
                await batch.commit();
                this.log(`Deleted ${userCount} test users`);
            }
            
            // Delete default groups
            const groupsRef = collection(db, 'groups');
            const groupsSnapshot = await getDocs(groupsRef);
            const groupBatch = writeBatch(db);
            let groupCount = 0;
            
            for (const docSnap of groupsSnapshot.docs) {
                const groupData = docSnap.data();
                if (groupData.isDefaultGroup) {
                    groupBatch.delete(docSnap.ref);
                    groupCount++;
                    
                    // Delete group members subcollection
                    const membersRef = collection(db, 'groups', docSnap.id, 'members');
                    const membersSnapshot = await getDocs(membersRef);
                    const memberBatch = writeBatch(db);
                    
                    membersSnapshot.forEach(memberDoc => {
                        memberBatch.delete(memberDoc.ref);
                    });
                    
                    await memberBatch.commit();
                }
            }
            
            if (groupCount > 0) {
                await groupBatch.commit();
                this.log(`Deleted ${groupCount} default groups and their members`);
            }
            
            this.log('Cleanup complete!', 'success');
            
        } catch (error) {
            this.log(`Cleanup failed: ${error.message}`, 'error');
        }
    }
}

// Initialize the creator
const defaultCreator = new DefaultGroupCreator();

// Export for use in console or other scripts
window.defaultCreator = defaultCreator;

// Auto-run if on default.html page
document.addEventListener('DOMContentLoaded', function() {
    const runButton = document.getElementById('runCreation');
    const cleanupButton = document.getElementById('cleanupData');
    const progressContainer = document.getElementById('progressContainer');
    
    if (runButton) {
        runButton.addEventListener('click', async () => {
            if (!confirm('This will create 100 default groups with random users. This may take several minutes. Continue?')) {
                return;
            }
            
            // Disable button during process
            runButton.disabled = true;
            runButton.textContent = 'Creating...';
            
            if (progressContainer) {
                progressContainer.style.display = 'block';
            }
            
            // Run the creation process
            const result = await defaultCreator.runCreationProcess();
            
            // Re-enable button
            runButton.disabled = false;
            runButton.textContent = 'Run Group Creation';
            
            if (result.success) {
                alert(`Successfully created ${result.groupsCreated} groups with ${result.totalUsers} total users!`);
            } else {
                alert('Creation failed. Check console for details.');
            }
        });
    }
    
    if (cleanupButton) {
        cleanupButton.addEventListener('click', () => {
            defaultCreator.cleanupTestData();
        });
    }
});