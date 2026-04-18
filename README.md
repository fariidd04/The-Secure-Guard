# 🔐 SosmedNet — Secure Auth App

Aplikasi React Native (Expo) dengan sistem Login & Register yang aman, lengkap dengan validasi input, keyboard handling, dan UX yang ramah jempol.

---

## 📸 Capture Running Program

| Login Screen | Register Screen | Home Screen |
|---|---|---|
| ![Login](./assets/images/Login.png) | ![Register](./assets/images/Register.png) | ![Home](./assets/images/home.png) |


<img width="400" height="889" alt="1000280951" src="https://github.com/user-attachments/assets/6883806c-f102-42e7-93d2-af86735a9669" />

---

## 🔗 Expo Snack

> [Link Expo Snack:](https://snack.expo.dev/@fariid.dd/the-secure-guard?platform=android)
>

## 🗂️ Struktur Project

```
sosmednet-auth-app/
├── app/
│   ├── _layout.js      ← Root layout (Expo Router stack)
│   ├── index.js        ← Screen Login  (route: /)
│   ├── register.js     ← Screen Register (route: /register)
│   └── home.js         ← Screen Home (route: /home)
├── app.json
├── babel.config.js
├── package.json
└── README.md
```

---

## 🚀 Cara Install & Run

### 1. Clone repo

```bash
git clone https://github.com/fariidd04/The-Secure-Guard.git
cd sosmednet-auth-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Jalankan project

```bash
npx expo start
```

- Scan QR code pake **Expo Go** (Android/iOS)
- Atau tekan `a` untuk Android Emulator, `i` untuk iOS Simulator

---

## 🛡️ Security Features

| Feature | Implementasi |
|---|---|
| **Validasi Email** | RegEx: `/^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/` |
| **Validasi Phone** | RegEx: `/^[0-9]{10,}$/` — hanya angka, min 10 digit. Input di-filter real-time. |
| **Password Match** | Cek `password === confirmPassword` sebelum submit |
| **Secure Entry** | `secureTextEntry={true}` — password tertutup bintang default |
| **Toggle Visibility** | Tombol 👁️ untuk show/hide password |
| **Keyboard Dismiss** | `TouchableWithoutFeedback + Keyboard.dismiss` — tap area luar = keyboard hilang |
| **Keyboard Avoiding** | `KeyboardAvoidingView` dengan `behavior="padding"` (iOS) / `"height"` (Android) |
| **Empty Field Guard** | Alert langsung jika ada field kosong sebelum submit |
| **Password Strength** | Indikator kekuatan password real-time (lemah/lumayan/kuat) |
| **router.replace()** | Setelah login/register, user tidak bisa back ke form lagi |

---

## 📋 Checklist Pre-Submit

- [x] ✅ **Keyboard Dismiss** — tap area luar input = keyboard hilang (`TouchableWithoutFeedback`)
- [x] ✅ **Secure Entry** — password tertutup titik/bintang saat diketik
- [x] ✅ **Validation Feedback** — Alert muncul jika ada field kosong
- [x] ✅ **Email Regex** — format email divalidasi sebelum submit
- [x] ✅ **Phone Digits Only** — karakter non-angka diblokir real-time di input
- [x] ✅ **Password Match** — konfirmasi password dicek, ada visual feedback merah/hijau
- [x] ✅ **router.replace()** — tidak bisa back ke login setelah masuk home
- [x] ✅ **KeyboardAvoidingView** — `behavior="height"` untuk Android, `"padding"` untuk iOS

---

## 🔧 Troubleshooting

**Error: "Router must be used within a Router component"**
```
✅ Solusi: Pastikan semua file ada di folder app/ 
   dan run dengan: npx expo start
```

**Error: "KeyboardAvoidingView not working on Android"**
```
✅ Solusi: Sudah di-handle dengan:
   behavior={Platform.OS === "ios" ? "padding" : "height"}
```

**Error: Module not found**
```
✅ Solusi: Hapus node_modules dan install ulang:
   rm -rf node_modules && npm install
```

---

## 🎨 Design System

- **Primary Color**: `#534AB7` (Purple)
- **Background**: `#F8F7FF` (Light Purple tint)
- **Font Style**: System default (bold untuk heading)
- **Corner Radius**: 10–20px untuk komponen form, 28px untuk header curve
- **Shadow**: Soft purple shadow pada card form

---

## 👤 Author

- **Nama**: [Muhammad Farid]
- **GitHub**: [fariidd04](https://github.com/fariidd04)

---

*Dibuat dengan ❤️ menggunakan React Native + Expo Router*
