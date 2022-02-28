import 'dotenv/config';
export default
{
    "expo": {
      "name": "Ekbok",
      "slug": "Ekbok",
      "version": "1.0.0",
      "orientation": "portrait",
      "icon": "./assets/icon.png",
      "splash": {
        "image": "./assets/splash.png",
        "resizeMode": "contain",
        "backgroundColor": "#ffffff"
      },
      "updates": {
        "fallbackToCacheTimeout": 0
      },
      "assetBundlePatterns": [
        '**/*'
      ],
      "ios": {
        "supportsTablet": true,
        "infoPlist":{
          "UIBackggroundModes": [
            "location",
            "fetch"
          ]
        }
      },
      "android": {
        "package":"ekbok.kjoreBok",
        "adaptiveIcon": {
          "foregroundImage": "./assets/adaptive-icon.png",
          "backgroundColor": "#FFFFFF"
        },
        "permissions": [
          "ACCESS_BACKGROUND_LOCATION"
        ]
      },
      "web": {
        "favicon": "./assets/favicon.png"
      },
      extra: {
        apiKey: process.env.API_KEY,
        authDomain: process.env.AUTH_DOMAIN,
        projectId: process.env.PROJECT_ID,
        storageBucket: process.env.STORAGE_BUCKET,
        messagingSenderId: process.env.MESSAGING_SENDER_ID,
        appId: process.env.APP_ID,
        googleApiKey: process.env.GOOGLE_API_KEY
      }
    }
  }