#!/usr/bin/env node
/**
 * Social Poster Pro - Campaign Admin Script
 * Usage: node add-campaign.js "Campaign Name" "Description"
 */

const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const fs = require('fs');
const path = require('path');

// Read service account
const serviceAccountPath = path.join(__dirname, 'firebase-service-account.json');
let serviceAccount;

try {
  if (fs.existsSync(serviceAccountPath)) {
    serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
  } else {
    // Fallback: Attempt to use environment variables or other methods if file not found
    console.warn('Warning: firebase-service-account.json not found. Attempting fallback initialization.');
    // If Firebase Admin SDK is globally installed and the project is configured,
    // it might work without a specific service account file in some environments.
    // For browser-based fallback, this might need adjustment.
  }
} catch(e) {
  console.error('Error reading service account file:', e.message);
}

// Initialize Firebase Admin
let db;
try {
  if (serviceAccount) {
    initializeApp({
      credential: cert(serviceAccount)
    });
    db = getFirestore();
    console.log('Firebase Admin initialized with service account.');
  } else {
    // If no service account file, try initializing with default credentials (e.g., in Cloud Functions)
    // or if running in an environment where GOOGLE_APPLICATION_CREDENTIALS is set.
    // For local browser fallback, this block might not be strictly necessary if campaigns.json is used.
    console.warn('Warning: No service account found. Firebase initialization might rely on environment configuration.');
    try {
        initializeApp(); // Attempt default initialization
        db = getFirestore();
        console.log('Firebase Admin initialized with default credentials.');
    } catch (defaultInitError) {
        console.error('Firebase default initialization failed:', defaultInitError.message);
        console.error('Falling back to local campaigns.json.');
        db = null; // Indicate Firestore is not available
    }
  }
} catch (e) {
  console.error('Firebase initialization error:', e.message);
  console.error('Falling back to local campaigns.json.');
  db = null; // Indicate Firestore is not available
}


// Template posts for Prompt Forge V3 Patreon launch - ENHANCED VIDEO SCRIPTS
function getTemplates(campaignName) {
  return [
    { 
      type: 'teaser', 
      x: `Something powerful is coming to Patreon...\n\nPrompt Forge V3.\n\nThe next evolution of script-to-shot-list magic.\n\n🔥\n\n#PromptForge #FILM426 #ComingSoon`, 
      ig: `🔥 SOMETHING POWERFUL IS COMING 🔥\n\nPrompt Forge V3.\n\nThe next evolution of script-to-shot-list magic.\n\nPatreon exclusive.\n\nStay tuned...\n\n.#PromptForge #FILM426 #Patreon`, 
      video: {
        image_description: "Mysterious, dark visual with glowing cyan accents, hinting at advanced AI.",
        script: "Hey everyone, Belladonna here! 🖤 You know how much I love streamlining workflows for creators. Well, get ready... something *truly* powerful is dropping on Patreon soon. Prompt Forge v3. This isn't just an upgrade; it's the next evolution in turning your scripts into stunning shot lists. Stay tuned – you won't want to miss this! #PromptForge #FILM426 #ComingSoon"
      } 
    },
    { 
      type: 'behind', 
      x: `🛠️ Building Prompt Forge V3...\n\nThis is what 6 months of iteration looks like:\n- AI script analysis\n- Shot list generation\n- ComfyUI workflow export\n- Filmmaker-friendly UI\n\nIt's almost ready. 🖤\n\n#PromptForge #BehindTheScenes`, 
      ig: `🛠️ BEHIND THE BUILD 🛠️\n\nPrompt Forge V3.\n\nSix months of iteration:\n⚡ AI Script Analysis\n🎬 Smart Shot Lists\n⚙️ ComfyUI Export\n🎨 Filmmaker UI\n\nIt's almost ready. 🖤\n\n.#PromptForge #BTS #DevLife`, 
      video: {
        image_description: "Montage of code snippets, UI elements, and perhaps some abstract AI visualizations, all in dark mode with cyan highlights.",
        script: "Belladonna back again! 🛠️ Let's peek behind the curtain of Prompt Forge v3. We've spent six months iterating on this – think AI script analysis, smarter shot lists, one-click ComfyUI export, and a UI made for filmmakers. It's been a journey, but it's almost ready to empower your visuals. So much more to show you! #PromptForge #BTS #DevLife"
      } 
    },
    { 
      type: 'announce', 
      x: `📢 IT'S LIVE!\n\nPrompt Forge V3 is now on Patreon.\n\nTurn any script into a complete shot list with AI-powered scene analysis, visual composition guidance, and ComfyUI workflow export.\n\nLink in bio. 🖤\n\n#PromptForge #FILM426 #NowAvailable`, 
      ig: `📢 IT'S LIVE! 📢\n\nPrompt Forge V3.\n\nYour script → Complete shot list.\n\n✨ AI Script Analysis\n🎬 Smart Shot Composition\n⚙️ ComfyUI Export\n\nPatreon exclusive. Link in bio! 🖤\n\n.#PromptForge #NowAvailable #Patreon`, 
      video: {
        image_description: "Dynamic reveal of the Prompt Forge v3 interface, showcasing the AI features and the 'Export to ComfyUI' button.",
        script: "IT'S HERE! Belladonna here, and I'm SO excited to announce Prompt Forge v3 is LIVE on Patreon! 🎉 Turn your scripts into complete shot lists with advanced AI analysis, visual guidance, and one-click ComfyUI export. This is the tool you've been waiting for to elevate your visuals. Link in bio to get access NOW! Let's create something amazing. 🖤 #PromptForge #FILM426 #PatreonLaunch"
      } 
    },
    { 
      type: 'release', 
      x: `🚀 Prompt Forge V3 Day 1.\n\nThe response has been incredible.\n\nIf you haven't checked it out yet:\n🎬 Script analysis\n📐 Shot composition\n⚙️ One-click export\n\nYour scripts have never looked this good.\n\n#PromptForge #FILM426`, 
      ig: `🚀 RELEASE DAY 🚀\n\nPrompt Forge V3.\n\nDay 1 responses = 🤯\n\n"Your scripts have never looked this good"\n\nStill haven't tried it?\n\nLink in bio! 🖤\n\n.#PromptForge #ReleaseDay`, 
      video: {
        image_description: "A fast-paced montage of user-generated testimonials (text overlays) and quick demo clips of Prompt Forge v3's key features.",
        script: "Day 1 of Prompt Forge v3 has been WILD! 🤯 Hearing your reactions like 'Your scripts have never looked this good' is everything. Don't miss out on transforming your script-to-shot-list workflow. Check the link in bio to grab v3 on Patreon! Keep the amazing creations coming! 🖤 #PromptForge #FILM426 #CreatorTools"
      } 
    },
    { 
      type: 'followup', 
      x: `💬 Real talk about Prompt Forge V3:\n\nWhat's the feature you use most?\n\nMine? The ComfyUI workflow export. One click, and you're shooting.\n\n👇 Drop yours below!\n\n#PromptForge #FILM426`, 
      ig: `💬 REAL TALK 💬\n\nPrompt Forge V3.\n\nWhat's YOUR favorite feature?\n\nMine: One-click ComfyUI export.\n\nComment below! 👇\n\n.#PromptForge #Feedback`, 
      video: {
        image_description: "Belladonna directly addressing the camera, perhaps with a split screen showing the Prompt Forge v3 interface.",
        script: "Okay, real talk on Prompt Forge v3! We're seeing some amazing feedback, but I want to know: what's the feature YOU can't live without? For me, it's that one-click ComfyUI export – pure magic. Drop your favorite feature in the comments below! 👇 #PromptForge #FILM426 #Feedback"
      } 
    },
    { 
      type: 'reminder', 
      x: `⏰ Weekend reminder:\n\nStill haven't tried Prompt Forge V3 on Patreon?\n\nYour scripts deserve better.\n\n🎬 Analysis → Shot List → Export\n\nLink in bio. 🔥\n\n#PromptForge #FILM426`, 
      ig: `⏰ WEEKEND REMINDER ⏰\n\nPrompt Forge V3.\n\nYour script → Professional shot list.\n\nWeekend project?\n\nLink in bio! 🔥\n\n.#PromptForge #WeekendVibes`, 
      video: {
        image_description: "Quick showcase of a script being transformed into a visually appealing shot list, possibly with animated transitions.",
        script: "Weekend vibes! You know what that means – time to create. If you haven't checked out Prompt Forge v3 on Patreon yet, what are you waiting for? Turn your scripts into professional shot lists with zero fuss. Analysis, shot guide, export – done. Link in bio! Let's make something awesome. 🔥 #PromptForge #FILM426 #WeekendProject"
      } 
    },
    { 
      type: 'poll', 
      x: `📊 Quick poll:\n\nPrompt Forge V3 features:\n\nA) AI Script Analysis\nB) Shot Composition\nC) ComfyUI Export\nD) All of the above\n\nI use C daily. What's your pick? 👇\n\n#PromptForge #FILM426`, 
      ig: `📊 THIS OR THAT 📊\n\nPrompt Forge V3.\n\nWhich feature is YOUR favorite?\n\nA) AI Script Analysis\nB) Shot Composition\nC) ComfyUI Export\nD) ALL OF IT\n\nVote! 👇\n\n.#PromptForge #Poll`, 
      video: {
        image_description: "Belladonna on screen, pointing to animated text bubbles representing Prompt Forge v3's features (A, B, C, D) with a poll overlay.",
        script: "Okay, quick poll time! For Prompt Forge v3 on Patreon, which feature is your ultimate MVP? A) AI Script Analysis, B) Shot Composition, or C) ComfyUI Export? I honestly use C daily for my workflows! Vote in the comments below, and let me know why! 👇 #PromptForge #FILM426 #FeaturePoll"
      } 
    }
  ];
}

// Add campaign
async function addCampaign() {
  const args = process.argv.slice(2);
  const name = args[0] || 'Prompt Forge V3 Patreon Launch';
  const desc = args[1] || 'Patreon release campaign';
  
  const posts = {};
  const templates = getTemplates(name); // Pass campaign name for potential use
  
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const dayKey = date.toISOString().split('T')[0];
    
    posts[dayKey] = {
      date: dayKey,
      type: templates[i].type,
      x: templates[i].x,
      ig: templates[i].ig,
      video: templates[i].video,
      used: false
    };
  }
  
  const campaign = {
    name: name,
    description: desc,
    posts: posts,
    createdAt: Date.now(),
    createdBy: 'belladonna'
  };
  
  if (db) { // If Firestore is available
    try {
      const docRef = await db.collection('socialCampaigns').add(campaign);
      console.log(`✓ Campaign created in Firestore: ${name}`);
      console.log(`  ID: ${docRef.id}`);
    } catch(e) {
      console.error('Firestore add error:', e.message);
      console.warn('Falling back to localStorage for campaign save.');
      saveToLocalStorage(campaign);
    }
  } else { // Fallback to localStorage
    console.warn('Firestore not available. Saving campaign to localStorage.');
    saveToLocalStorage(campaign);
  }
  
  console.log(`\n  Posts: 7 days ready`);
  process.exit(0);
}

function saveToLocalStorage(campaign) {
  const existingCampaigns = JSON.parse(localStorage.getItem('socialCampaigns') || '[]');
  existingCampaigns.push(campaign);
  localStorage.setItem('socialCampaigns', JSON.stringify(existingCampaigns));
  console.log(`✓ Campaign saved locally: ${campaign.name}`);
}

// Check if this is running in the browser context for localStorage
if (typeof window === 'undefined') {
  // Running in Node.js environment
  // Check if service account file exists for direct Firestore access
  const serviceAccountFsPath = path.join(__dirname, 'firebase-service-account.json');
  if (!serviceAccount && !fs.existsSync(serviceAccountFsPath)) {
    console.error("Error: Node.js environment detected, but Firebase service account credentials not found.");
    console.error("Please provide 'firebase-service-account.json' or set GOOGLE_APPLICATION_CREDENTIALS.");
    process.exit(1);
  }
  // If running Node.js and Firebase is configured, proceed with addCampaign
  addCampaign();
} else {
  // Running in a browser environment
  // When running in the browser, directly call addCampaign if campaigns.json is present or localStorage fallback is desired.
  // The `db` object will be initialized in the browser's scope by index.html
  // We need to ensure addCampaign can access `db` or initiate localStorage save
  
  // Mocking 'db' and 'localStorage' if they don't exist in a strict Node env for testing purposes
  if (typeof db === 'undefined') {
      db = {
          collection: () => ({
              add: async (data) => {
                  console.log("Mocking Firestore add for browser context:", data);
                  // Simulate Firestore success
                  return Promise.resolve({ id: 'mock-id-' + Date.now() });
              }
          })
      };
      if (typeof localStorage === 'undefined') {
          console.warn("localStorage not available, mock it for browser context.");
          global.localStorage = {
              getItem: () => '[]',
              setItem: () => {}
          };
      }
  }
  addCampaign();
}
