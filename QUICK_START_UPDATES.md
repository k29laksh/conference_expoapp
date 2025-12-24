# Quick Start: OTA Updates with Preview & Production

## Initial Setup (Do Once)

### 1. Login to EAS

```bash
eas login
```

### 2. Build Both Apps

```bash
# Build preview (for testing)
eas build --platform android --profile preview

# Build production (for 300-400 users)
eas build --platform android --profile production
```

**Wait Time**: ~10-15 minutes per build

### 3. Distribute Builds

- **Preview APK** → Install on your test device(s)
- **Production APK/AAB** → Distribute to 300-400 users

## Daily Update Workflow

### Safe Update Process (Recommended)

```bash
# 1. Make your code changes
# Edit components, fix bugs, add features, etc.

# 2. Test locally
npx expo start
# Test in Expo Go or development build

# 3. Push to preview channel FIRST
eas update --channel preview --message "Testing: Your change description"

# 4. Test on preview device
# - Close app
# - Reopen app (update downloads)
# - Close app again
# - Reopen app (update applies)
# - Test thoroughly!

# 5. If tests pass → Push to production
eas update --channel production --message "Your change description"

# Done! Your 300-400 users get the update.
```

### Quick Update Process (For Minor Fixes)

```bash
# If you're confident (small CSS change, typo fix, etc.)
eas update --channel production --message "Fixed typo in about page"
```

## Common Commands

```bash
# Push update to preview
eas update --channel preview --message "Your message"

# Push update to production
eas update --channel production --message "Your message"

# List all updates
eas update:list

# List preview updates only
eas update:list --branch preview

# List production updates only
eas update:list --branch production

# View all channels
eas branch:list

# Delete an update (if needed)
eas update:delete [update-group-id]
```

## Update Timeline

### After Publishing Update:

| Time            | What Happens                    |
| --------------- | ------------------------------- |
| Immediate       | Update published to EAS servers |
| 2-5 min         | CDN distributes worldwide       |
| Next app launch | App checks for update           |
| Background      | Update downloads silently       |
| Next restart    | Update applies automatically    |

### User Adoption (300-400 users):

| Timeframe | Adoption Rate          |
| --------- | ---------------------- |
| 1 hour    | ~70-80% (active users) |
| 24 hours  | ~90-95%                |
| 48 hours  | ~98-99%                |

## What Can Be Updated via OTA?

### ✅ YES (No rebuild needed):

- React components
- JavaScript/TypeScript code
- Styling (CSS-in-JS, StyleSheet)
- App logic and state management
- Small images/assets
- Text content
- API endpoints/URLs
- Feature flags

### ❌ NO (Requires new build):

- Native code (Kotlin/Java)
- Native dependencies (new packages with native modules)
- App permissions
- App icons
- Splash screens
- Build configuration (gradle, etc.)

## Examples

### Example 1: Fix a Bug

```bash
# Found bug in schedule page

# Fix the code in your editor
# Test locally: npx expo start

# Push to preview
eas update --channel preview --message "Fix: Schedule page crash on empty data"

# Test on preview device (2 min)
# Works? Great!

# Push to production
eas update --channel production --message "Fix: Schedule page crash on empty data"
```

### Example 2: Add New Feature

```bash
# Added "Favorites" feature

# Test locally: npx expo start

# Push to preview
eas update --channel preview --message "New: Favorites feature"

# Test for 1-2 hours or days
# Get feedback from team

# When confident:
eas update --channel production --message "New: Favorites feature"
```

### Example 3: Update Content

```bash
# Updated speaker bios and photos

# Push to preview
eas update --channel preview --message "Updated speaker information"

# Quick test (1 min)

# Push to production
eas update --channel production --message "Updated speaker information"
```

## Troubleshooting

### "Build failed" Error?

```bash
# Check build status
eas build:list

# View specific build logs
eas build:view [build-id]

# Common fixes:
# - Clear cache: eas build --clear-cache --profile production
# - Check app.json for errors
# - Verify all dependencies are installed
```

### Users not getting updates?

1. Users need to restart app (close completely, not just minimize)
2. Users need internet connection
3. Updates apply on next launch, not while app is running
4. Check if update was published: `eas update:list --channel production`

### Want to rollback?

```bash
# Find previous working update
eas update:list --channel production

# Publish it again (acts as rollback)
eas update --channel production --message "Rollback to stable version"
```

## Monitoring

### Check Current Status

```bash
# What's on preview?
eas update:list --branch preview --limit 5

# What's on production?
eas update:list --branch production --limit 5

# All branches
eas branch:list
```

### View Update Details

```bash
# Get specific update info
eas update:view [update-id]
```

## Best Practices

1. **Always use meaningful messages**

   ```bash
   # ❌ Bad
   eas update --channel production --message "update"

   # ✅ Good
   eas update --channel production --message "Fixed registration form validation"
   ```

2. **Test preview before production** (for important changes)

3. **Update frequently**

   - Small updates are safer than big ones
   - Users get fixes faster
   - Easier to identify issues

4. **Keep track of versions**

   - Update `version` in package.json: "1.0.0" → "1.0.1" → "1.0.2"
   - Matches with your update messages

5. **Monitor after publishing**
   - Watch for crash reports
   - Check user feedback
   - Be ready to rollback if needed

## When to Rebuild vs OTA Update?

### Use OTA Update (Fast - 30 seconds):

- Bug fixes
- UI improvements
- Content updates
- Feature toggles
- API changes
- Logic updates

### Need New Build (Slow - 15 minutes):

- Added `expo-camera` package
- Changed app permissions
- Updated app icon
- Modified native code
- Added firebase SDK
- Changed package name

**Rule of thumb**: If `npx expo start` works and shows your changes, you can use OTA. If you need to rebuild locally, you need EAS build too.

## Support & Resources

- **EAS Update Docs**: https://docs.expo.dev/eas-update/introduction/
- **Check build status**: https://expo.dev/accounts/shubham_asati/projects/met-i-con/builds
- **Your Project**: https://expo.dev/accounts/shubham_asati/projects/met-i-con

## Next Steps

1. **Build preview app**: `eas build --platform android --profile preview`
2. **Install on your device** (test device)
3. **Make a small change** (e.g., update a text)
4. **Push to preview**: `eas update --channel preview --message "Test update"`
5. **Verify on device** (close, reopen, close, reopen)
6. **Push to production**: `eas update --channel production --message "Test update"`

You're all set! 🎉

---

**For detailed guides, see:**

- [OTA_UPDATES_GUIDE.md](OTA_UPDATES_GUIDE.md) - Complete technical reference
- [PREVIEW_CHANNEL_GUIDE.md](PREVIEW_CHANNEL_GUIDE.md) - Preview workflow details
