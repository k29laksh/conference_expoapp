# OTA Updates Implementation Guide

## Overview

Your MET-I-CON app is now configured for Over-The-Air (OTA) updates using EAS Update. This allows you to push updates to all 300-400 installations instantly without requiring users to download from app stores.

## What Was Configured

### 1. Dependencies

- ✅ `expo-updates` package installed

### 2. Configuration Files

#### app.json

- Added `updates.url` pointing to your EAS project
- Set `runtimeVersion.policy` to "appVersion" for automatic version management

#### eas.json

- Configured update channels:
  - `development` - For testing
  - `preview` - For internal testing
  - `production` - For live users

### 3. Update Manager

Created `utils/updateManager.ts` with functions:

- `checkForUpdates()` - Check if updates are available
- `downloadAndApplyUpdate()` - Download and install updates
- `checkAndPromptForUpdate()` - Show alert to users
- `checkAndDownloadUpdateSilently()` - Background silent updates

### 4. Auto-Update Integration

- App now checks for updates on every launch (silently in background)
- Updates download automatically
- Applied on next app restart

## How to Push Updates to All 300-400 Users

### Step 1: Build Production App (One-time setup)

```bash
# Build production APK/AAB with update support
eas build --platform android --profile production
```

**Important:** You only need to rebuild when:

- Changing native code (Kotlin, Java)
- Adding/removing native dependencies
- Updating app version in app.json

### Step 2: Distribute Your Production Build

- Upload to Google Play Store, or
- Distribute APK directly to your 300-400 users

### Step 3: Push Updates (For JavaScript/React changes)

When you make changes to your app (UI, logic, components), push an OTA update:

```bash
# For production users
eas update --channel production --message "Bug fixes and improvements"

# For preview/testing
eas update --channel preview --message "Testing new features"
```

### Step 4: Monitor Updates

```bash
# View all published updates
eas update:list

# View specific branch
eas update:list --branch production

# Delete an update if needed
eas update:delete [update-group-id]
```

## Update Workflow

### Daily Development Flow:

1. Make code changes (UI, features, bug fixes)
2. Test locally: `npx expo start`
3. When ready, publish update:
   ```bash
   eas update --channel production --message "Your update description"
   ```
4. All users get the update within minutes-hours (next app restart)

### What Gets Updated via OTA:

✅ JavaScript code
✅ TypeScript code
✅ React components
✅ Styling changes
✅ Assets (images, fonts) - if small
✅ App logic and features

### What Requires New Build:

❌ Native code changes (Kotlin/Java)
❌ New native dependencies
❌ App permissions changes
❌ Major version updates
❌ Native module configuration

## Update Delivery Timeline

After running `eas update --channel production`:

1. **Immediate**: Update published to EAS servers
2. **2-5 minutes**: CDN distribution worldwide
3. **Next app launch**: Users check for updates
4. **Background download**: Update downloads silently
5. **Next restart**: Update applied automatically

For 300-400 users:

- **Within 1 hour**: ~70-80% will have update (active users)
- **Within 24 hours**: ~90-95% will have update
- **Within 48 hours**: ~98-99% will have update

## Advanced Features

### Manual Update Check

Users can manually check in the Updates tab (newly created):

- Shows current update info
- Manual "Check for Updates" button
- Update channel and version info

### Rollback an Update

If you pushed a bad update:

```bash
# Publish the previous good version again
eas update --channel production --message "Rollback to stable version"
```

### Branch-based Updates

Create update branches for testing:

```bash
# Create a new branch
eas update --branch testing --message "Testing features"

# Users on "testing" channel will get this
```

### Emergency Fallback

If an update crashes the app, expo-updates has built-in rollback:

- App automatically falls back to embedded version
- Prevents users from being stuck

## Testing Updates

### Before Pushing to Production:

1. **Test in Preview build first:**

   ```bash
   # Build preview
   eas build --platform android --profile preview

   # Test update
   eas update --channel preview --message "Testing"
   ```

2. **Verify the update:**

   - Install preview build on test device
   - Launch app
   - Check if update downloads
   - Restart app to apply

3. **Push to production when confident:**
   ```bash
   eas update --channel production --message "Verified update"
   ```

## Best Practices

### 1. Update Messages

Always include meaningful messages:

```bash
eas update --channel production --message "Fixed session crash, improved navigation"
```

### 2. Version Tracking

Update your app version in package.json for tracking:

```json
{
  "version": "1.0.1" // Increment for each update
}
```

### 3. Gradual Rollout

For critical apps, consider:

- Test with preview channel first
- Monitor crash reports
- Then push to production

### 4. Update Frequency

- Small bug fixes: Push immediately
- Feature updates: 1-2 times per week
- Major updates: Consider new build + OTA combo

## Monitoring & Analytics

View update adoption:

```bash
# Check update status
eas update:view [update-id]

# List all updates
eas update:list --json
```

## Troubleshooting

### Users not receiving updates?

1. Check they're on production build (not development)
2. Verify they're connected to internet
3. Check update channel matches build channel
4. Run: `eas update:list --channel production`

### Update not working in app?

1. Ensure not in development mode (**DEV**)
2. Check app is built with `eas build` (not `expo build`)
3. Verify `runtimeVersion` hasn't changed
4. Check logs: `npx expo start --no-dev --minify`

### How to force immediate update?

Users must restart the app. Updates apply on next launch, not while running.

## Quick Reference Commands

```bash
# Login to EAS (first time)
eas login

# Publish update to production
eas update --channel production --message "Your message"

# List all updates
eas update:list

# View specific update
eas update:view [update-id]

# Delete update
eas update:delete [update-group-id]

# View update branches
eas branch:list

# Build new production version (when needed)
eas build --platform android --profile production

# Build new preview version
eas build --platform android --profile preview
```

## Cost & Limits

EAS Update pricing (as of 2024):

- **Free tier**: Unlimited updates, 50 GB bandwidth/month
- **Production tier**: Unlimited updates + bandwidth
- Your 300-400 users will easily fit in free tier

## Summary for Your Use Case

**Initial Setup** (One-time):

1. Build production app: `eas build --platform android --profile production`
2. Distribute to your 300-400 users

**Regular Updates** (Unlimited):

1. Make your code changes
2. Run: `eas update --channel production --message "Description"`
3. All users get update automatically within 24-48 hours

**Result**:

- No need to ask users to update manually
- No app store approval delays
- Updates reach all 300-400 users instantly
- Complete control over rollout and rollback

## Next Steps

1. Test the update system:

   ```bash
   eas build --platform android --profile preview
   eas update --channel preview --message "Test update"
   ```

2. When ready for production:

   ```bash
   eas build --platform android --profile production
   eas update --channel production --message "Initial release"
   ```

3. For future updates, just run:
   ```bash
   eas update --channel production --message "Your changes"
   ```

That's it! You now have a powerful OTA update system for your 300-400 installations. 🚀
