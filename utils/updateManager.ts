import * as Updates from "expo-updates";
import { Alert, Platform } from "react-native";

export interface UpdateCheckResult {
  isAvailable: boolean;
  manifest?: Updates.Manifest;
}

/**
 * Check for available updates
 */
export async function checkForUpdates(): Promise<UpdateCheckResult> {
  try {
    if (__DEV__) {
      console.log("Updates are disabled in development mode");
      return { isAvailable: false };
    }

    const update = await Updates.checkForUpdateAsync();

    if (update.isAvailable) {
      console.log("Update available:", update.manifest);
      return {
        isAvailable: true,
        manifest: update.manifest,
      };
    }

    return { isAvailable: false };
  } catch (error) {
    console.error("Error checking for updates:", error);
    return { isAvailable: false };
  }
}

/**
 * Download and apply update
 */
export async function downloadAndApplyUpdate(): Promise<boolean> {
  try {
    if (__DEV__) {
      console.log("Updates are disabled in development mode");
      return false;
    }

    const result = await Updates.fetchUpdateAsync();

    if (result.isNew) {
      console.log("New update downloaded, reloading app...");
      await Updates.reloadAsync();
      return true;
    }

    return false;
  } catch (error) {
    console.error("Error downloading update:", error);
    return false;
  }
}

/**
 * Check and prompt user for updates
 */
export async function checkAndPromptForUpdate(): Promise<void> {
  try {
    const { isAvailable } = await checkForUpdates();

    if (isAvailable) {
      if (Platform.OS === "web") {
        // For web, just reload
        await downloadAndApplyUpdate();
      } else {
        // For native, show alert
        Alert.alert(
          "Update Available",
          "A new version is available. Would you like to update now?",
          [
            {
              text: "Later",
              style: "cancel",
            },
            {
              text: "Update",
              onPress: async () => {
                await downloadAndApplyUpdate();
              },
            },
          ]
        );
      }
    }
  } catch (error) {
    console.error("Error checking for updates:", error);
  }
}

/**
 * Silently check and download updates in the background
 */
export async function checkAndDownloadUpdateSilently(): Promise<void> {
  try {
    if (__DEV__) {
      return;
    }

    const { isAvailable } = await checkForUpdates();

    if (isAvailable) {
      console.log("Downloading update in background...");
      await Updates.fetchUpdateAsync();
      console.log("Update downloaded. Will apply on next restart.");
    }
  } catch (error) {
    console.error("Error in background update check:", error);
  }
}

/**
 * Get current update information
 */
export function getCurrentUpdateInfo() {
  return {
    updateId: Updates.updateId,
    channel: Updates.channel,
    runtimeVersion: Updates.runtimeVersion,
    isEmbeddedLaunch: Updates.isEmbeddedLaunch,
    isEmergencyLaunch: Updates.isEmergencyLaunch,
  };
}
