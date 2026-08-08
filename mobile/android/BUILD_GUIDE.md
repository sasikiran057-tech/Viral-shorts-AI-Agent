# Android Build Guide

## Prerequisites

- Android Studio 2023.1+
- Android SDK 34
- JDK 11+
- Gradle 8.1+

## Setup

### 1. Open Project in Android Studio

```bash
cd mobile/android
open .
```

### 2. Configure SDK

- Go to File → Project Structure → SDK Location
- Set Android SDK location
- Download Android SDK 34 if not present

### 3. Configure API Base URL

Edit `app/build.gradle`:

```gradle
buildConfigField "String", "API_BASE_URL", "\"http://your-api-url/api/v1\""
```

## Building APK

### Debug APK

```bash
# Using Android Studio
# Build → Build Bundle(s) / APK(s) → Build APK(s)

# Using Gradle
./gradlew assembleDebug

# Output: app/build/outputs/apk/debug/app-debug.apk
```

### Release APK

#### 1. Generate Keystore

```bash
# Create signing key (one time)
keytool -genkey -v -keystore android-keystore.jks \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias viral-shorts-key

# Store password safely!
```

#### 2. Configure Signing

Create `signing.properties`:

```properties
storeFile=../../../android-keystore.jks
storePassword=your_keystore_password
keyAlias=viral-shorts-key
keyPassword=your_key_password
```

#### 3. Update build.gradle

```gradle
android {
    signingConfigs {
        release {
            storeFile file(project.hasProperty('storeFile') ? storeFile : "../android-keystore.jks")
            storePassword project.hasProperty('storePassword') ? storePassword : ""
            keyAlias project.hasProperty('keyAlias') ? keyAlias : ""
            keyPassword project.hasProperty('keyPassword') ? keyPassword : ""
        }
    }

    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled true
        }
    }
}
```

#### 4. Build Release APK

```bash
# Using Gradle
./gradlew assembleRelease

# Output: app/build/outputs/apk/release/app-release.apk
```

## Building AAB (Android App Bundle)

```bash
# Debug AAB
./gradlew bundleDebug

# Release AAB (preferred for Play Store)
./gradlew bundleRelease

# Output: app/build/outputs/bundle/release/app-release.aab
```

## Installation

### On Connected Device

```bash
# Install debug APK
./gradlew installDebug

# Or using adb
adb install app/build/outputs/apk/debug/app-debug.apk
```

### On Emulator

```bash
# Ensure emulator is running
./gradlew installDebug
```

## Testing

### Run Unit Tests

```bash
./gradlew test
```

### Run Instrumented Tests

```bash
./gradlew connectedAndroidTest
```

## Publishing to Google Play Store

### 1. Create Google Play Developer Account

- Visit https://play.google.com/console
- Pay $25 registration fee
- Create app listing

### 2. Prepare Release

```bash
# Build release AAB
./gradlew bundleRelease

# Sign with keystore
# APK Signature Scheme v2 (automatic)
```

### 3. Upload to Play Store

- Go to Google Play Console
- Select your app
- Go to Release → Production
- Upload AAB file
- Fill in release notes
- Submit for review

## Troubleshooting

### Build fails with "SDK not found"

```bash
# Update SDK
sudo update-alternatives --config java

# Download SDK
androidtool/sdkmanager "platforms;android-34"
```

### Gradle daemon timeout

```bash
# Increase memory
export GRADLE_OPTS="-Xmx2048m"
./gradlew assembleRelease
```

### Method count exceeds 64K

```gradle
# Enable multidex
android {
    defaultConfig {
        multiDexEnabled true
    }
}
```

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Android Build

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-java@v3
        with:
          java-version: '11'
      - run: cd mobile/android && ./gradlew assembleRelease
      - uses: actions/upload-artifact@v3
        with:
          name: app-release.apk
          path: mobile/android/app/build/outputs/apk/release/app-release.apk
```

## Size Optimization

### Shrink Resources

```gradle
release {
    minifyEnabled true
    shrinkResources true
    proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
}
```

### Enable App Bundles

- Use AAB format instead of APK
- Reduces download size by ~20%
- Google Play handles device-specific APKs

## Performance Monitoring

```bash
# Monitor app performance
adb shell am trace-ipc start
adb shell am trace-ipc stop --output-file=/data/trace.bin
adb pull /data/trace.bin
```

## Security

- Keep keystore safe
- Use strong passwords
- Enable ProGuard/R8 obfuscation
- Update dependencies regularly
- Run security scans

```bash
./gradlew dependencyCheckAnalyze
```
