# 🚀 Complete OTA Updates Setup - MET-I-CON

## ✅ You're All Set!

Your app now has **Over-The-Air (OTA) updates** configured for both **preview** (testing) and **production** (live users) channels.

## 📚 Documentation

| Guide                                                    | Purpose                                    |
| -------------------------------------------------------- | ------------------------------------------ |
| **[QUICK_START_UPDATES.md](QUICK_START_UPDATES.md)**     | ⭐ Start here! Quick commands and workflow |
| **[PREVIEW_CHANNEL_GUIDE.md](PREVIEW_CHANNEL_GUIDE.md)** | Complete preview channel workflow          |
| **[OTA_UPDATES_GUIDE.md](OTA_UPDATES_GUIDE.md)**         | Technical reference and details            |

## ⚡ Quick Commands

### Interactive Helper (Recommended for Beginners)

```bash
pnpm update
```

This launches an interactive menu for all update operations!

### Direct Commands

```bash
# Push to preview (testing)
pnpm update:preview --message "Your update message"

# Push to production (300-400 users)
pnpm update:production --message "Your update message"

# Build preview app
pnpm build:preview

# Build production app
pnpm build:production
```

## 🎯 Quick Start

### First Time Setup

**1. Build Both Apps** (one-time, ~15 min each):

```bash
# Build preview for testing
pnpm build:preview

# Build production for users
pnpm build:production
```

**2. Distribute**:

- Install **preview APK** on your test device(s)
- Distribute **production APK/AAB** to your 300-400 users

**3. You're Done!** Now you can push unlimited updates without rebuilding.

### Daily Updates (30 seconds)

**Safe Workflow** (Recommended):

```bash
# 1. Make code changes
# 2. Test locally: pnpm start

# 3. Push to preview
pnpm update:preview --message "Testing: Fixed bug X"

# 4. Test on preview device (close, reopen, test)

# 5. Push to production
pnpm update:production --message "Fixed bug X"
```

**Quick Workflow** (for minor changes):

```bash
pnpm update:production --message "Fixed typo on about page"
```

## 🔄 How It Works

### What Happens When You Push an Update?

1. **You publish**: `pnpm update:production --message "Bug fix"`
2. **EAS servers**: Update published to CDN (30 seconds)
3. **User opens app**: App checks for update (background, 2-5 sec)
4. **Silent download**: Update downloads while user uses app
5. **Next restart**: Update applies automatically (invisible to user)

### Timeline for Your 300-400 Users:

| Time     | Users Updated |
| -------- | ------------- |
| 1 hour   | ~70-80%       |
| 24 hours | ~90-95%       |
| 48 hours | ~98-99%       |

## ✅ What Can Be Updated via OTA?

**YES** (No rebuild needed):

- ✅ React components & UI
- ✅ JavaScript/TypeScript code
- ✅ Styling (colors, layout, fonts)
- ✅ Text content
- ✅ Bug fixes
- ✅ New features (if no native code)
- ✅ API endpoints
- ✅ Small images/assets

**NO** (Requires rebuild):

- ❌ Native dependencies (new packages)
- ❌ App permissions
- ❌ Native code (Kotlin/Java)
- ❌ App icon/splash screen

## 🛡️ Preview vs Production

### Preview Channel (Your Test Devices)

- Test updates before users see them
- Catch bugs early
- No impact on live users
- Install preview APK on 1-5 test devices

### Production Channel (300-400 Live Users)

- Only push tested, verified updates
- All your actual users
- What they see in the app

### Recommended Workflow

```
Code Change → Test Locally → Push to Preview → Test on Device → Push to Production
     ↓              ↓               ↓                  ↓                ↓
  VS Code      Expo Go         Preview APK         Test App     300-400 Users
```

## 📊 Monitoring

```bash
# View updates
eas update:list

# View preview updates only
eas update:list --branch preview

# View production updates only
eas update:list --branch production

# View all channels
eas branch:list

# View specific update
eas update:view [update-id]
```

## 🆘 Common Issues

### Build Failed?

```bash
# Try with cache cleared
eas build --clear-cache --profile production
```

### Users Not Getting Updates?

1. Users must **restart app** (close completely)
2. Check internet connection
3. Verify update published: `eas update:list --branch production`
4. Updates apply on **next launch**, not while running

### Want to Rollback?

```bash
# Just publish the previous version again
pnpm update:production --message "Rollback to stable version"
```

### Preview Device Not Getting Updates?

1. Check it has **preview build** installed (not production)
2. Verify in Updates screen → Channel should show "preview"
3. Close and reopen app twice

## 📱 Testing Updates

### On Preview Device:

1. Close app completely
2. Reopen app (update downloads in ~5-30 seconds)
3. Close app again
4. Reopen app (update applies)
5. Test thoroughly!

**Tip**: Check the **Updates tab** in the app to see:

- Current update ID
- Channel (preview/production)
- Runtime version

## 🎯 Real-World Examples

### Example 1: Fix Registration Bug

```bash
# Fix code in VS Code
# Test: pnpm start

pnpm update:preview --message "Fix: Registration form validation"
# Test on preview device (2 min)

pnpm update:production --message "Fix: Registration form validation"
# All users get fix within 24 hours
```

### Example 2: Update Speaker Photos

```bash
# Replace speaker images in assets/
# Test: pnpm start

pnpm update:production --message "Updated speaker photos for 2026"
# Fast update, no preview needed for content
```

### Example 3: New Networking Feature

```bash
# Add new networking tab with chat

# Build + test locally
pnpm start

# Test on preview
pnpm update:preview --message "New: Networking chat feature"
# Test for 1-2 days with team

# Production rollout
pnpm update:production --message "New: Networking chat feature"
```

## 🔧 Advanced Usage

### Create Custom Branch

```bash
eas update --branch experimental --message "Testing new design"
```

### Delete Update

```bash
eas update:delete [update-group-id]
```

### View Build Status

```bash
eas build:list
```

### Login to EAS

```bash
eas login
```

## 💰 Cost

**EAS Update Pricing**:

- **Free tier**: Unlimited updates, 50 GB bandwidth/month
- Your 300-400 users fit comfortably in free tier
- No credit card required for free tier

## 📖 Learn More

- **EAS Update Docs**: https://docs.expo.dev/eas-update/introduction/
- **Your Project Dashboard**: https://expo.dev/accounts/shubham_asati/projects/met-i-con
- **EAS Build Docs**: https://docs.expo.dev/build/introduction/

## 🎉 Next Steps

1. **Build preview app**: `pnpm build:preview`
2. **Install on test device**
3. **Make a small change** (e.g., edit a text string)
4. **Push to preview**: `pnpm update:preview --message "Test update"`
5. **Test on device** (close, reopen, close, reopen)
6. **Push to production**: `pnpm update:production --message "Test successful"`

## 🤝 Support

If you encounter issues:

1. Check the guides: [QUICK_START_UPDATES.md](QUICK_START_UPDATES.md)
2. View EAS logs: `eas build:list` or `eas update:list`
3. Expo Discord: https://chat.expo.dev/
4. Expo Forums: https://forums.expo.dev/

---

## Summary

✅ **Setup Complete**
✅ **Preview channel configured** for testing
✅ **Production channel configured** for 300-400 users
✅ **Auto-update on app launch** enabled
✅ **Helper scripts** added to package.json
✅ **Comprehensive guides** created

**You can now update all 300-400 installations instantly without app store approval!** 🚀

---

Made with ❤️ for MET-I-CON 2026
