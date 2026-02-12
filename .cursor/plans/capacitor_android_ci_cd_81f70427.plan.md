---
name: Capacitor Android CI/CD
overview: 將 Quasar 專案透過 Capacitor 包成 Android App，設定簽名金鑰，並在 GitHub Actions 中自動建置 signed AAB（可直接上傳 Google Play Console）。
todos:
  - id: quasar-config
    content: 修改 quasar.config.js：用 ctx.mode.capacitor 切換 publicPath
    status: completed
  - id: init-capacitor
    content: 執行 quasar mode add capacitor 初始化 Capacitor 模式
    status: completed
  - id: add-android
    content: 在 src-capacitor 中新增 Android 平台 (cap add android)
    status: completed
  - id: config-app-info
    content: 設定 capacitor.config.json 的 appId 和 appName
    status: completed
  - id: gitignore-keystore
    content: 更新 .gitignore 忽略 keystore 檔案
    status: cancelled
  - id: ci-workflow
    content: 建立 .github/workflows/build-android.yml CI/CD 工作流程
    status: cancelled
  - id: doc-secrets
    content: 提供 keystore 產生指令與 GitHub Secrets 設定說明
    status: cancelled
isProject: false
---

# Capacitor Android + CI/CD 完整設定

## 1. 修改 `quasar.config.js` 讓 publicPath 依建置目標切換

目前 `publicPath: '/ai-chatroom/'` 是為了 GitHub Pages，但 Capacitor 需要 `'/'`。利用 Quasar config 提供的 `ctx` 參數做判斷：

```js
export default defineConfig((ctx) => {
  return {
    build: {
      publicPath: ctx.mode.capacitor ? '/' : '/ai-chatroom/',
      // ...
    }
  }
})
```

這樣 GitHub Pages 和 Capacitor 建置可以共存，不互相干擾。

## 2. 初始化 Capacitor 模式

透過 Quasar CLI 新增 Capacitor 模式，會自動建立 `src-capacitor/` 目錄：

```bash
npx quasar mode add capacitor
```

這會產生 `src-capacitor/capacitor.config.json` 等檔案。

## 3. 新增 Android 平台

在 `src-capacitor/` 內新增 Android 平台：

```bash
cd src-capacitor
npx cap add android
```

這會產生 `src-capacitor/android/` 目錄（完整的 Android 專案）。

## 4. 設定 App 基本資訊

在 `src-capacitor/capacitor.config.json` 中設定：

- `appId`: `com.bcjohn.aichatroom`（Google Play 的唯一識別碼）
- `appName`: `aichatroom`

## 5. 產生簽名金鑰（本地操作）

Google Play 要求上傳的 AAB 必須經過簽名。本地產生 keystore：

```bash
keytool -genkey -v -keystore ai-chatroom-release.keystore \
  -alias ai-chatroom -keyalg RSA -keysize 2048 -validity 10000
```

**重要**：此檔案和密碼需妥善保存，遺失後無法更新 App。

## 6. GitHub Actions CI/CD 工作流程

新增 `[.github/workflows/build-android.yml](.github/workflows/build-android.yml)`，在 push 到 `main` 時自動建置 signed AAB：

```
push to main
  -> checkout
  -> setup Node 22.17.0 + Java 17
  -> yarn install
  -> quasar build -m capacitor -T android (產生 AAB)
  -> 用 GitHub Secrets 中的 keystore 簽名
  -> 上傳 signed AAB 為 artifact
```

需要在 GitHub repo **Settings > Secrets** 中新增：

- `ANDROID_KEYSTORE_BASE64`：keystore 檔案的 base64 編碼
- `ANDROID_KEYSTORE_PASSWORD`：keystore 密碼
- `ANDROID_KEY_ALIAS`：金鑰別名
- `ANDROID_KEY_PASSWORD`：金鑰密碼

## 7. 檔案變更清單


| 檔案                                    | 動作                          |
| ------------------------------------- | --------------------------- |
| `quasar.config.js`                    | 修改 - 加入 ctx 判斷 publicPath   |
| `src-capacitor/`                      | 新增 - Quasar CLI 自動產生        |
| `src-capacitor/android/`              | 新增 - Capacitor 自動產生         |
| `.github/workflows/build-android.yml` | 新增 - Android CI/CD workflow |
| `.gitignore`                          | 修改 - 忽略 keystore 檔案         |


