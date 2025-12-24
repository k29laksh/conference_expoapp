# Preview Channel Workflow Guide

## Overview

The **preview** channel allows you to test updates before pushing to your 300-400 production users. This is a critical safety step to catch bugs before they reach your live audience.

## Two-Channel Strategy

### Preview Channel (Testing)

- Internal testing team
- QA verification
- Beta testers (if any)
- Your own devices for testing

### Production Channel (Live Users)

- All 300-400 actual users
- Only receives verified, tested updates

## Complete Preview Channel Workflow

### Step 1: Build Preview App (One-time)

```bash
# Build preview APK
eas build --platform android --profile preview
```

This creates a separate build that:

- Listens to the "preview" channel
- Can be installed alongside production build (different package)
- Used for testing before production rollout

### Step 2: Distribute Preview Build

Install the preview APK on your testing devices:

- Your personal phone
- QA team devices
- Beta tester devices (if any)

**Tip**: Download from EAS build page or use:

```bash
# Get build URL
eas build:list --platform android --profile preview
```

### Step 3: Make Your Changes

Edit your code (components, features, bug fixes, etc.)

### Step 4: Test Locally First

```bash
npx expo start
```

Verify changes work correctly in development.

### Step 5: Push to Preview Channel

```bash
eas update --channel preview --message "Testing: Fixed login bug"
```

This publishes the update ONLY to preview channel (your test devices).

### Step 6: Test the OTA Update

On your preview device:

1. Close and reopen the app
2. Update downloads in background
3. Close app again
4. Reopen → Update applies
5. Test thoroughly!

**Check the Updates screen** (if you added it) to verify:

- Update ID changed
- Channel shows "preview"
- No crashes or errors

### Step 7: If Test Passes → Push to Production

Once you've verified everything works:

```bash
eas update --channel production --message "Fixed login bug (tested)"
```

Now your 300-400 production users get the update!

### Step 8: If Test Fails → Fix & Retry

If you find bugs in preview:

1. Fix the code
2. Push new preview update: `eas update --channel preview --message "Fixed issue X"`
3. Test again
4. Repeat until perfect
5. Then push to production

## Complete Example Workflow

```bash
# DAY 1: Setup (One-time)
# -----------------------
# Build preview for testing
eas build --platform android --profile preview

# Build production for users
eas build --platform android --profile production

# Distribute:
# - Preview APK → Your test devices
# - Production APK → 300-400 users


# DAY 2-N: Regular Updates
# -------------------------
# You find a bug and fix it...

# 1. Test locally
npx expo start
# ✓ Looks good

# 2. Push to preview first
eas update --channel preview --message "Fixed basket crash"

# 3. Test on preview device
# Open app → Update downloads → Restart → Test
# ✓ Works perfectly!

# 4. Push to production
eas update --channel production --message "Fixed basket crash"

# Done! All 300-400 users get update safely.
```

## Best Practices

### 1. Always Test Preview First

```bash
# ❌ DON'T do this directly:
eas update --channel production --message "Untested fix"

# ✅ DO this instead:
eas update --channel preview --message "Testing fix"
# ... test thoroughly ...
eas update --channel production --message "Verified fix"
```

### 2. Keep Preview Build Updated

Rebuild preview when you:

- Add native dependencies
- Change native code
- Update major packages

```bash
eas build --platform android --profile preview
```

### 3. Use Descriptive Messages

```bash
# ❌ Bad
eas update --channel preview --message "test"

# ✅ Good
eas update --channel preview --message "Testing: Navigation fix for tablet users"
```

### 4. Monitor Preview Performance

Check preview updates:

```bash
# List preview updates
eas update:list --branch preview

# View specific update
eas update:view [update-id]
```

## Common Scenarios

### Scenario 1: Emergency Bug Fix

```bash
# User reports crash in production
# 1. Fix the code
# 2. Test locally
npx expo start

# 3. Quick preview test
eas update --channel preview --message "URGENT: Fix crash on speakers page"
# Test on preview device (2-5 minutes)

# 4. If works, immediately push to production
eas update --channel production --message "URGENT: Fix crash on speakers page"
```

**Timeline**: 15-30 minutes from fix to production

### Scenario 2: Major Feature Release

```bash
# Adding new "Workshops" section

# 1. Develop feature
# 2. Test locally thoroughly
npx expo start

# 3. Push to preview
eas update --channel preview --message "New Workshops section"

# 4. Internal testing (1-2 days)
# - Test all workshop features
# - Check on different devices
# - Verify data loading
# - Test edge cases

# 5. After 1-2 days of preview testing
eas update --channel production --message "New Workshops section - fully tested"
```

**Timeline**: 1-2 days testing before production

### Scenario 3: A/B Testing

```bash
# Create custom branch for variant A
eas update --branch variant-a --message "Blue button design"

# Create custom branch for variant B
eas update --branch variant-b --message "Green button design"

# Test both on preview devices
# Choose winner, push to production
eas update --channel production --message "Optimized button design (variant A)"
```

## Monitoring Both Channels

### Check what's on each channel:

```bash
# Preview channel status
eas update:list --branch preview

# Production channel status
eas update:list --branch production
```

### Current active updates:

```bash
# See all channels
eas branch:list
```

## Troubleshooting

### Preview device not getting updates?

1. Check channel in Updates screen → Should show "preview"
2. Verify build was created with preview profile
3. Check internet connection
4. Force close and reopen app

### Want to reset preview to match production?

```bash
# Get production update and push to preview
eas update --channel preview --message "Sync with production"
```

### Preview and production out of sync?

This is normal and intentional! Preview can be ahead (testing new features) or behind (testing older versions).

## Quick Reference

```bash
# Build preview app (one-time setup)
eas build --platform android --profile preview

# Push update to preview only
eas update --channel preview --message "Testing XYZ"

# After testing, push to production
eas update --channel production --message "XYZ (tested via preview)"

# View preview updates
eas update:list --branch preview

# View production updates
eas update:list --branch production

# View all channels
eas branch:list
```

## Summary

**Preview Channel Workflow**:

1. Build preview app once → Install on test devices
2. Make code changes → Test locally
3. Push to preview → Test on preview devices
4. If good → Push to production → 300-400 users get update
5. If bad → Fix → Test preview again → Then production

**Benefits**:

- ✅ Catch bugs before users see them
- ✅ Test on real devices (not just dev)
- ✅ Confidence in production updates
- ✅ No impact on live users during testing
- ✅ Can test multiple versions in parallel

**Time Investment**:

- Preview build: 10-15 minutes (one-time)
- Preview testing: 2-10 minutes per update
- Production safety: Priceless!

Your 300-400 users will thank you for the bug-free experience! 🚀
