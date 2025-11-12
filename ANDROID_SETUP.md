# 📱 Android Testing Setup Guide for Playwright

This guide will help you set up and run Playwright tests on Android devices and emulators.

## Prerequisites

- ✅ Android SDK Platform Tools (ADB) installed
- ✅ Android Studio (recommended) OR Android emulator
- ✅ Physical Android device (optional)

## Quick Start

### 1️⃣ Check Your Setup

Run the automated checker script:

```bash
npm run android:check
# or
./check-android.sh
```

This will verify:
- ✅ ADB installation
- ✅ Connected devices
- ✅ Device information
- ✅ Chrome browser availability

### 2️⃣ Connect an Android Device

#### Option A: Using Android Emulator (Recommended)

**Create and start an emulator:**

```bash
# List available emulators
emulator -list-avds

# Start a specific emulator (in background)
emulator -avd <emulator_name> &

# Example:
emulator -avd Pixel_5_API_33 &
```

**Create a new emulator (if none exist):**
- Open Android Studio
- Go to: **Tools → Device Manager → Create Device**
- Select a device definition (e.g., Pixel 5)
- Select a system image (e.g., Android 13 API 33)
- Finish setup and launch

#### Option B: Using Physical Device

1. **Enable Developer Options:**
   - Go to: **Settings → About Phone**
   - Tap "Build Number" **7 times**
   - Developer Options unlocked! 🎉

2. **Enable USB Debugging:**
   - Go to: **Settings → Developer Options**
   - Toggle **"USB Debugging"** ON

3. **Connect via USB:**
   - Connect phone to computer with USB cable
   - Accept the authorization dialog on your phone
   - Verify connection: `adb devices`

4. **Optional - Wireless Connection:**
   ```bash
   # First, connect via USB then:
   adb tcpip 5555
   
   # Find your device IP (Settings → About Phone → Status)
   adb connect <device_ip>:5555
   
   # Example:
   adb connect 192.168.1.100:5555
   
   # Disconnect USB cable (wireless connection active)
   ```

### 3️⃣ Verify Device Connection

```bash
# Check connected devices
npm run android:devices
# or
adb devices -l
```

You should see output like:
```
List of devices attached
emulator-5554          device product:sdk_gphone64_arm64
# or for physical device:
ABC123XYZ              device product:redfin
```

### 4️⃣ Configure Playwright

Open `playwright.config.ts` and **uncomment** the Android project section:

```typescript
projects: [
  {
    name: 'chromium',
    use: { ...devices['Desktop Chrome'] },
  },

  // Uncomment this section ⬇️
  {
    name: 'android-chrome',
    use: {
      ...devices['Pixel 5'],
      _android: process.env.ANDROID_DEVICE || 'emulator-5554',
    },
  },
],
```

**Configure the device serial:**
- For emulator: Use `emulator-5554` (or check `adb devices`)
- For physical device: Use the serial from `adb devices` (e.g., `ABC123XYZ`)

### 5️⃣ Run Tests on Android

```bash
# Run all tests on Android
npm run test:android

# Run specific demo test
npm run test:android:demo

# Or use Playwright directly
npx playwright test --project=android-chrome

# With specific device (override config)
ANDROID_DEVICE=emulator-5554 npx playwright test --project=android-chrome
```

## 📝 Sample Test

A demo test file has been created: `tests/steps/android-demo.spec.ts`

It includes examples for:
- ✅ Loading websites on Android browser
- ✅ Mobile element interactions
- ✅ Touch interactions (tap, swipe)
- ✅ Device orientation changes
- ✅ Screenshot capture

## 🛠️ Useful Commands

### ADB Commands

```bash
# List all connected devices
adb devices -l

# Install an app
adb install path/to/app.apk

# Uninstall an app
adb uninstall com.package.name

# Open shell on device
adb shell

# Get device information
adb shell getprop ro.product.model
adb shell getprop ro.build.version.release

# Push file to device
adb push local/file /sdcard/

# Pull file from device
adb pull /sdcard/file local/

# Take screenshot
adb shell screencap -p /sdcard/screenshot.png
adb pull /sdcard/screenshot.png

# Screen recording
adb shell screenrecord /sdcard/demo.mp4
# Stop with Ctrl+C, then:
adb pull /sdcard/demo.mp4

# View logs
adb logcat

# Restart ADB (if having connection issues)
adb kill-server
adb start-server
```

### Playwright + Android Commands

```bash
# Run with headed mode (see browser)
npx playwright test --project=android-chrome --headed

# Run specific test file
npx playwright test android-demo.spec.ts --project=android-chrome

# Run with debug mode
npx playwright test --project=android-chrome --debug

# Generate Allure report for Android tests
npm run test:clean
npx playwright test --project=android-chrome
npm run allure:generate
npm run allure:open
```

## 🔧 Troubleshooting

### Issue: "No devices connected"

**Solution:**
1. Make sure emulator is running or device is connected
2. Check USB cable (for physical devices)
3. Verify USB debugging is enabled
4. Restart ADB: `adb kill-server && adb start-server`
5. Check authorization on phone screen

### Issue: "Device shows as 'unauthorized'"

**Solution:**
1. Check your phone screen for authorization prompt
2. Select "Always allow from this computer"
3. Tap "OK"
4. Run `adb devices` again

### Issue: "Chrome not found on device"

**Solution:**
- Install Chrome from Play Store
- Or Playwright will use the default Android browser

### Issue: "Connection timeout"

**Solution:**
1. Restart the device/emulator
2. Restart ADB: `adb kill-server && adb start-server`
3. Reconnect device

### Issue: "Emulator command not found"

**Solution:**
Add Android SDK to PATH in `~/.zshrc` or `~/.bash_profile`:

```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

Then run: `source ~/.zshrc`

## 📚 Additional Resources

- [Playwright Android Testing Docs](https://playwright.dev/docs/api/class-android)
- [ADB Documentation](https://developer.android.com/studio/command-line/adb)
- [Android Emulator Guide](https://developer.android.com/studio/run/emulator)

## 🎯 Best Practices

1. **Use emulators for CI/CD** - More reliable and reproducible
2. **Test on multiple Android versions** - Configure different emulators
3. **Handle different screen sizes** - Test portrait and landscape
4. **Optimize for mobile performance** - Mobile devices may be slower
5. **Use touch interactions** - Use `tap()` instead of `click()` for mobile
6. **Consider network conditions** - Mobile devices may have slower connections

## 📊 Test Reporting

All Android tests work with your existing Allure reporting setup:

```bash
# Run Android tests with report
rm -rf allure-results allure-report
npx playwright test --project=android-chrome
allure generate allure-results --clean -o allure-report
allure open allure-report
```

---

Happy Android Testing! 🎉📱

