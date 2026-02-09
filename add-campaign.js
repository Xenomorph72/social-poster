#!/usr/bin/env node
/**
 * Social Poster Pro - Campaign Admin Script
 * Usage: node add-campaign.js "Campaign Name" "Description"
 * 
 * Example: node add-campaign.js "THE FINE PRINT Album Launch" "7 posts for album release promotion"
 */

const admin = require('firebase-admin');

// Firebase Admin SDK (full access)
const serviceAccount = {
  "type": "service_account",
  "project_id": "dash-clawd",
  "private_key_id": "434e92d575baaf9fa737e5a532b2c99f7d39b3cd",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDgdGluG0wDNVqo\\nvZ+IrGd0Vd8oJUMql1QT3LSdkNLztaRqh5zyDVgbLMYoVHTeb72sDaJnz3QA35I3\\nD19DmEuTGKCigOMmB7jkMIaJA+Y9Vl18y91oNkcIhx4Pk20ftjOMnYzTQ9tHNkte\\nn0FLtdLZbCjgYC/lS/LUzpasj/BYmTIpVdAZLfmbeGDuIwvIOZ1czAxYNdG52USa\\nn52uv0Yq6u8W1UjfWrRTvDp15oXpU6D5FRm51GWEf12Ck9GOclSGwyn0uZb06Vgr\\njNYgLOq29GS4oHQGn3lRdyKeBwSwahIcXHro3IWv1lsxUjFejIK50oAPqAs6ahh/\\n+FtNAHZhAgMBAAECggEAGx8V6j8UJUMaLE+Val9itNT3fRNblVbpyuidTnjEdLxb\\nHKA8X6crIUV8wDzMTmB0K8kN+btAiiZ5tXt/CFzrrN+J8XjfeaXvOmt+pim5dWnt\\nK/o6S7BbTvV8tWccBXvvqKsU7CZD5cvyuYFG044p5ynBmrMktnFB62L3I+zUnu/S\\nCJze0weatCNe/+PtUG8w0wmnBlHyzMouzX0QAroOk0uEesei+QS3rk4FzdOKdbmy\\nt4L17yxK6+xP76YcCq9naUjeXYq9eSssRWnUTcqWNQ2RXgMnoNK6nDWEx7/eorX6\\ny0h8QqqSTGo/Q36GAYHIs1nxTLtC9mrVU9t7g9IGUQKBgQDwq228ZodViqu0f+Cx\\nVZM6DLiEuee/FstjatedgS/s1KMubcobrjttqJFRyZJRuDvRaozvaA1aKNRc9idp\\n89vSZVoQvE2TbUiII+r9UvVvr81ZAbavxqbl8VWms3c7A3yRtW7Mv2zWYl00eNFN\\nqlmQ2pKyG/aYZpkzjOB8FrnABQKBgQDuwJGOD1oQ64YQ9c9bwveNr7/t5yOnzboR\\nbfu9lyvNq/HVeDF+DbvY0dc1vxFPNXO8QCYJmZGzhI3xxrVHzOg6iRuGNv8BbnTl\\n3TctBsuScc6/DDVDMzCukJXUlNdIipvLS8Ozr1doeVLi13rcRIPSL9pO2fmMYFl0\\nAgjcKdhXrQKBgH72IJzMBcb1saE1+MX0XAe6oDi8jen7z23x9i8L8MliX3dlycIS\\nhx1RWOApkzvzEfNm31SIssqGUYl8/cviLmvutbWwcMg+VY4kTJo5AmtZ9d1njwVp\\nqbASQVoAwPxr2XJQoVP4BCWQnJTKy7fKDxfghpTZNZyuO1G7ls0/e9w1AoGAR5A5\\nENfRK1ktalADw4GBKlsPsIOj0Fx99VN+LanuW0u6xT2tuBbtw2PCmj2XNqLS+g5Q\\nWHhLj/+ffGUPWWI2CbWnJme9r/Qn3e6c50YuJssuKV3DaU0ivnBgOMQUc434fMtM\\n8cMQ9CPJkGz+Sp/O02W8jf4QKt+GcJtbhIKWclECgYB/R59tjixXM+RWq0dZDb40\\np20xc5JIG1iTgU1ynF0h0eLCkVp9bprsFLSHbzI4cS0ahWhWSYPQvKq2ntLzVo0Z\\nTFoCBGUT7j5qkwyjxVB29hVJxYh5zh5/klH6MVC/AwIbLDEmCaa/Jd/VW7l8wLhK\\n5cV2tnFy9OL57T44OBRrBQ==\\n-----END PRIVATE KEY-----\",
  "client_email": "firebase-adminsdk-fbsvc@dash-clawd.iam.gserviceaccount.com",
  "client_id": "105500631919011685187",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token"
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Template posts for any campaign
function getTemplates(what) {
  return [
    { type: 'teaser', x: `👀 Something's coming...\\n\\n${what}\\n\\nCan you feel it? ✨\\n\\n#FILM426 #ComingSoon`, ig: `👀 SOMETHING'S COMING 👀\\n\\n${what}\\n\\nThe countdown begins...\\n\\nWhat do you think is dropping? 👇\\n\\n.#FILM426 #ComingSoon #NewMusic`, video: `HOOK: "Wait for it..."\\nVISUAL: Mysterious reveal\\nTEXT: "Something drops soon"\\nCTA: "Follow to be first to know"` },
    { type: 'behind', x: `🎬 Behind the scenes:\\n\\nMaking ${what}\\n\\nThe late nights. The coffee. The chaos.\\n\\nIt's all worth it. 🖤\\n\\n#FILM426 #BehindTheMusic`, ig: `🎬 BEHIND THE SCENES 🎬\\n\\n${what}\\n\\nSwipe to see the process →\\n\\nLate nights. Cold coffee. Pure magic.\\n\\nWhich track are you most excited for? 👇\\n\\n.#FILM426 #BTS #StudioLife`, video: `HOOK: "This is how it's made..."\\nB-ROLL: Studio footage\\nVOICEOVER: "Every sound has a story"\\nCTA: "Link in bio"` },
    { type: 'announce', x: `📢 IT'S HERE!\\n\\n${what} is officially OUT NOW! 🚀\\n\\nStream it everywhere:\\n[LINK]\\n\\nLet me know your favorite track! 🖤\\n\\n#NewMusic #FILM426 #NowPlaying`, ig: `📢 IT'S HERE! 📢\\n\\n${what}\\n\\n🚀 OFFICIALLY OUT NOW 🚀\\n\\nThis one's been months in the making.\\nEvery track is a piece of my soul.\\n\\nLink in bio! 🖤\\n\\n.#NewMusic #FILM426 #OutNow`, video: `HOOK (0-3s): "IT'S HERE!"\\nDROP (3-15s): [Best drop]\\nTEXT OVERLAY: "${what}"\\nCTA (15-30s): "Link in bio!"` },
    { type: 'release', x: `🚀 ${what}\\n\\nDay 1 has been INSANE.\\n\\nThank you to everyone streaming, sharing, vibing.\\n\\nThis is just the beginning. 🖤\\n\\n#FILM426 #Grateful`, ig: `🚀 RELEASE DAY 🚀\\n\\n${what}\\n\\nDay 1 has been WILD.\\n\\nYou're the reason I do this.\\n\\nKeep the vibes going! 🖤\\n\\n.#FILM426 #ReleaseDay`, video: `HOOK: "Day 1 recap..."\\nMONTAGE: Reactions\\nTEXT: "You did this"\\nCTA: "Keep streaming"` },
    { type: 'followup', x: `💬 Quick question:\\n\\nWhat's your favorite track from ${what}?\\n\\nMine changes daily 😅\\n\\nDrop yours below! 👇\\n\\n#FILM426 #MusicTalk`, ig: `💬 REAL TALK 💬\\n\\n${what}\\n\\nWhat's YOUR favorite?\\n\\nMine keeps changing! 😅\\n\\nDrop yours below + WHY 👇\\n\\n.#FILM426 #MusicTalk`, video: `HOOK: "I need to know..."\\nTEXT: "Favorite track?"\\nSHOW: Poll\\nCTA: "Comment!"` },
    { type: 'reminder', x: `⏰ Weekend reminder:\\n\\nIf you haven't checked out ${what} yet...\\n\\nWhat are you waiting for? 😏\\n\\n[LINK]\\n\\n#FILM426 #WeekendVibes`, ig: `⏰ WEEKEND REMINDER ⏰\\n\\n${what}\\n\\nStill haven't hit play?\\n\\nPerfect soundtrack here ↓\\n\\nLink in bio 🎧\\n\\n.#FILM426`, video: `HOOK: "Weekend soundtrack..."\\nPLAY: Best chill track\\nTEXT: "${what}"\\nCTA: "Link in bio"` },
    { type: 'poll', x: `📊 This or That:\\n\\n${what} tracks:\\n\\nSide A OR Side B?\\n\\nI'm Team [PICK] 🖤\\n\\n#FILM426 #Poll`, ig: `📊 THIS OR THAT 📊\\n\\n${what}\\n\\nSide A vs Side B\\n\\nWhich side hits harder? 👇\\n\\n.#FILM426 #Poll`, video: `SPLIT: Side A vs Side B\\nTEXT: "Which side?"\\nPOLL: A / B\\nCTA: "Vote!"` }
  ];
}

// Add campaign
async function addCampaign(name, description) {
  const args = process.argv.slice(2);
  const what = args[0] || 'THE FINE PRINT album';
  const desc = args[1] || description || 'Weekly social posts';
  
  const posts = {};
  const templates = getTemplates(what);
  
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
    name: name || `${what} - ${today.toLocaleDateString()}`,
    description: desc,
    posts: posts,
    createdAt: Date.now(),
    createdBy: 'belladonna'
  };
  
  const docRef = await db.collection('socialCampaigns').add(campaign);
  
  console.log(`✓ Campaign created: ${campaign.name}`);
  console.log(`  ID: ${docRef.id}`);
  console.log(`  Posts: 7 days ready`);
  console.log(`\\nTo delete: firebase firestore delete firestore.collections.socialCampaigns.doc ${docRef.id}`);
  
  process.exit(0);
}

addCampaign();
