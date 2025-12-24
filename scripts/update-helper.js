#!/usr/bin/env node

/**
 * OTA Update Helper Script
 * Simplifies pushing updates to preview and production channels
 */

const { execSync } = require("child_process");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

function executeCommand(command) {
  try {
    console.log(`\n🚀 Executing: ${command}\n`);
    execSync(command, { stdio: "inherit" });
    return true;
  } catch (error) {
    console.error(`\n❌ Error executing command: ${error.message}\n`);
    return false;
  }
}

async function main() {
  console.log("\n╔════════════════════════════════════════╗");
  console.log("║   MET-I-CON OTA Update Helper          ║");
  console.log("╚════════════════════════════════════════╝\n");

  console.log("What would you like to do?\n");
  console.log("1. Push update to PREVIEW channel (testing)");
  console.log("2. Push update to PRODUCTION channel (live users)");
  console.log("3. Push to PREVIEW, then PRODUCTION (safe workflow)");
  console.log("4. List updates");
  console.log("5. View channel status");
  console.log("6. Build preview app");
  console.log("7. Build production app");
  console.log("8. Exit\n");

  const choice = await question("Enter your choice (1-8): ");

  switch (choice.trim()) {
    case "1":
      await pushToPreview();
      break;
    case "2":
      await pushToProduction();
      break;
    case "3":
      await safePushWorkflow();
      break;
    case "4":
      await listUpdates();
      break;
    case "5":
      await viewChannelStatus();
      break;
    case "6":
      await buildApp("preview");
      break;
    case "7":
      await buildApp("production");
      break;
    case "8":
      console.log("\n👋 Goodbye!\n");
      process.exit(0);
    default:
      console.log("\n❌ Invalid choice. Please try again.\n");
  }

  rl.close();
}

async function pushToPreview() {
  console.log("\n📦 Pushing update to PREVIEW channel...\n");
  const message = await question("Update message: ");

  if (!message.trim()) {
    console.log("❌ Message cannot be empty!");
    return;
  }

  const success = executeCommand(
    `eas update --channel preview --message "${message}"`
  );

  if (success) {
    console.log("\n✅ Update published to PREVIEW channel!");
    console.log("📱 Test on your preview device:");
    console.log("   1. Close the app");
    console.log("   2. Reopen the app (update downloads)");
    console.log("   3. Close the app again");
    console.log("   4. Reopen the app (update applies)");
    console.log("   5. Test thoroughly!\n");
  }
}

async function pushToProduction() {
  console.log(
    "\n⚠️  WARNING: This will update all 300-400 production users!\n"
  );
  const confirm = await question('Are you sure? Type "yes" to confirm: ');

  if (confirm.toLowerCase() !== "yes") {
    console.log("❌ Cancelled.");
    return;
  }

  const message = await question("Update message: ");

  if (!message.trim()) {
    console.log("❌ Message cannot be empty!");
    return;
  }

  const success = executeCommand(
    `eas update --channel production --message "${message}"`
  );

  if (success) {
    console.log("\n✅ Update published to PRODUCTION channel!");
    console.log("👥 All users will receive update on next app restart.");
    console.log("⏱️  Expected timeline:");
    console.log("   • 1 hour: ~70-80% of active users");
    console.log("   • 24 hours: ~90-95% of users");
    console.log("   • 48 hours: ~98-99% of users\n");
  }
}

async function safePushWorkflow() {
  console.log("\n🛡️  Safe Update Workflow\n");
  console.log("Step 1: Push to PREVIEW for testing\n");

  const message = await question("Update message: ");

  if (!message.trim()) {
    console.log("❌ Message cannot be empty!");
    return;
  }

  console.log("\n📦 Publishing to PREVIEW channel...\n");
  const previewSuccess = executeCommand(
    `eas update --channel preview --message "${message}"`
  );

  if (!previewSuccess) {
    console.log("❌ Failed to publish to preview. Aborting.");
    return;
  }

  console.log("\n✅ Published to PREVIEW!");
  console.log("\n📱 Now test on your preview device:");
  console.log("   1. Close and reopen app (update downloads)");
  console.log("   2. Close and reopen again (update applies)");
  console.log("   3. Test all functionality\n");

  const tested = await question(
    'Have you tested and verified? Type "yes" to push to PRODUCTION: '
  );

  if (tested.toLowerCase() !== "yes") {
    console.log("❌ Update not pushed to production. Test first!");
    return;
  }

  console.log("\n📦 Publishing to PRODUCTION channel...\n");
  const productionSuccess = executeCommand(
    `eas update --channel production --message "${message}"`
  );

  if (productionSuccess) {
    console.log("\n✅ Successfully published to both PREVIEW and PRODUCTION!");
    console.log("👥 All 300-400 users will receive update on next restart.\n");
  }
}

async function listUpdates() {
  console.log("\n📋 Which channel?\n");
  console.log("1. Preview updates");
  console.log("2. Production updates");
  console.log("3. All updates\n");

  const choice = await question("Enter choice (1-3): ");

  switch (choice.trim()) {
    case "1":
      executeCommand("eas update:list --branch preview");
      break;
    case "2":
      executeCommand("eas update:list --branch production");
      break;
    case "3":
      executeCommand("eas update:list");
      break;
    default:
      console.log("❌ Invalid choice.");
  }
}

async function viewChannelStatus() {
  console.log("\n📊 Channel Status\n");
  executeCommand("eas branch:list");
}

async function buildApp(profile) {
  console.log(`\n🏗️  Building ${profile.toUpperCase()} app...\n`);
  console.log("⚠️  This will take ~10-15 minutes.\n");

  const confirm = await question(
    `Continue with ${profile} build? Type "yes": `
  );

  if (confirm.toLowerCase() !== "yes") {
    console.log("❌ Cancelled.");
    return;
  }

  executeCommand(`eas build --platform android --profile ${profile}`);
}

// Run the script
main().catch((error) => {
  console.error("Error:", error);
  rl.close();
  process.exit(1);
});
