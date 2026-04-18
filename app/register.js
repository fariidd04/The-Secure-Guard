import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  ScrollView,
  StatusBar,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
const PHONE_REGEX = /^[0-9]{10,}$/;

export default function RegisterScreen() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleRegister = () => {
    const { name, email, phone, password, confirmPassword } = form;

    if (!name.trim() || !email.trim() || !phone.trim() || !password || !confirmPassword) {
      Alert.alert("Gak Lengkap nih!", "Semua field wajib diisi ya.");
      return;
    }

    if (name.trim().length < 2) {
      Alert.alert("Nama Terlalu Pendek", "Nama minimal 2 karakter.");
      return;
    }

    if (!EMAIL_REGEX.test(email.trim())) {
      Alert.alert("Email Gak Valid", "Format email salah. Contoh: nama@email.com");
      return;
    }

    const cleanPhone = phone.replace(/\s/g, "");
    if (!PHONE_REGEX.test(cleanPhone)) {
      Alert.alert(
        "Nomor HP Salah",
        "Nomor HP hanya boleh berisi angka dan minimal 10 digit. Jangan pakai spasi atau tanda baca."
      );
      return;
    }

    if (password.length < 6) {
      Alert.alert("Password Lemah", "Password minimal 6 karakter.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Password Gak Cocok!", "Password dan Konfirmasi Password harus sama. Cek lagi ya!");
      return;
    }

    Alert.alert("Registrasi Berhasil! 🎉", `Selamat datang, ${name.trim()}! Sekarang lo bisa login.`, [
      {
        text: "Login Sekarang",
        onPress: () => router.replace("/"),
      },
    ]);
  };

  const PasswordStrength = ({ pass }) => {
    if (!pass) return null;
    let strength = "";
    let color = "#E24B4A";

    if (pass.length >= 12 && /[A-Z]/.test(pass) && /[0-9]/.test(pass) && /[^a-zA-Z0-9]/.test(pass)) {
      strength = "💪 Kuat banget";
      color = "#1D9E75";
    } else if (pass.length >= 8 && /[0-9]/.test(pass)) {
      strength = "👌 Lumayan";
      color = "#BA7517";
    } else if (pass.length >= 6) {
      strength = "😐 Lemah";
      color = "#E24B4A";
    } else {
      strength = "🚨 Terlalu pendek";
      color = "#E24B4A";
    }

    return (
      <Text style={[styles.strengthText, { color }]}>{strength}</Text>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <StatusBar barStyle="dark-content" backgroundColor="#F8F7FF" />
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
              <Text style={styles.backText}>← Kembali</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Buat Akun Baru</Text>
            <Text style={styles.subtitle}>Daftar sekarang, gratis selamanya 🚀</Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.label}>Nama Lengkap</Text>
            <TextInput
              style={styles.input}
              placeholder="Masukkan nama lengkap"
              placeholderTextColor="#AAAAAA"
              value={form.name}
              onChangeText={(v) => updateField("name", v)}
              autoCapitalize="words"
              returnKeyType="next"
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="nama@email.com"
              placeholderTextColor="#AAAAAA"
              value={form.email}
              onChangeText={(v) => updateField("email", v)}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
            />

            <Text style={styles.label}>Nomor HP</Text>
            <TextInput
              style={styles.input}
              placeholder="08123456789"
              placeholderTextColor="#AAAAAA"
              value={form.phone}
              onChangeText={(v) => {
                const numOnly = v.replace(/[^0-9]/g, "");
                updateField("phone", numOnly);
              }}
              keyboardType="number-pad"
              maxLength={15}
              returnKeyType="next"
            />
            <Text style={styles.hint}>Hanya angka, minimal 10 digit</Text>

            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordWrapper}>
              <TextInput
                style={styles.inputPassword}
                placeholder="Min. 6 karakter"
                placeholderTextColor="#AAAAAA"
                value={form.password}
                onChangeText={(v) => updateField("password", v)}
                secureTextEntry={!showPass}
                autoCapitalize="none"
                returnKeyType="next"
              />
              <TouchableOpacity onPress={() => setShowPass(!showPass)} style={styles.eyeBtn}>
                <Text style={styles.eyeIcon}>{showPass ? "🙈" : "👁️"}</Text>
              </TouchableOpacity>
            </View>
            <PasswordStrength pass={form.password} />

            <Text style={styles.label}>Konfirmasi Password</Text>
            <View style={[
              styles.passwordWrapper,
              form.confirmPassword && form.password !== form.confirmPassword
                ? styles.inputError
                : null,
              form.confirmPassword && form.password === form.confirmPassword
                ? styles.inputSuccess
                : null,
            ]}>
              <TextInput
                style={styles.inputPassword}
                placeholder="Ulangi password"
                placeholderTextColor="#AAAAAA"
                value={form.confirmPassword}
                onChangeText={(v) => updateField("confirmPassword", v)}
                secureTextEntry={!showConfirm}
                autoCapitalize="none"
                returnKeyType="done"
                onSubmitEditing={handleRegister}
              />
              <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)} style={styles.eyeBtn}>
                <Text style={styles.eyeIcon}>{showConfirm ? "🙈" : "👁️"}</Text>
              </TouchableOpacity>
            </View>
            {form.confirmPassword && form.password !== form.confirmPassword && (
              <Text style={styles.errorText}>❌ Password tidak sama</Text>
            )}
            {form.confirmPassword && form.password === form.confirmPassword && (
              <Text style={styles.successText}>✅ Password cocok!</Text>
            )}

            <TouchableOpacity style={styles.btnPrimary} onPress={handleRegister}>
              <Text style={styles.btnPrimaryText}>Daftar Sekarang</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.loginLink}
              onPress={() => router.replace("/")}
            >
              <Text style={styles.loginLinkText}>
                Sudah punya akun? <Text style={styles.loginLinkBold}>Login disini</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F7FF",
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 56,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 24,
  },
  backBtn: {
    marginBottom: 16,
  },
  backText: {
    color: "#534AB7",
    fontSize: 15,
    fontWeight: "600",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#26215C",
  },
  subtitle: {
    fontSize: 14,
    color: "#7F77DD",
    marginTop: 4,
  },
  form: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#534AB7",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#3C3489",
    marginBottom: 6,
    marginTop: 14,
  },
  input: {
    borderWidth: 1.5,
    borderColor: "#CECBF6",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: "#26215C",
    backgroundColor: "#FAFAFE",
  },
  passwordWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#CECBF6",
    borderRadius: 10,
    backgroundColor: "#FAFAFE",
  },
  inputPassword: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: "#26215C",
  },
  eyeBtn: {
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  eyeIcon: {
    fontSize: 18,
  },
  inputError: {
    borderColor: "#E24B4A",
  },
  inputSuccess: {
    borderColor: "#1D9E75",
  },
  hint: {
    fontSize: 11,
    color: "#AFA9EC",
    marginTop: 4,
  },
  strengthText: {
    fontSize: 12,
    fontWeight: "600",
    marginTop: 4,
  },
  errorText: {
    fontSize: 12,
    color: "#E24B4A",
    fontWeight: "600",
    marginTop: 4,
  },
  successText: {
    fontSize: 12,
    color: "#1D9E75",
    fontWeight: "600",
    marginTop: 4,
  },
  btnPrimary: {
    backgroundColor: "#534AB7",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 24,
  },
  btnPrimaryText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  loginLink: {
    alignItems: "center",
    marginTop: 16,
    paddingVertical: 8,
  },
  loginLinkText: {
    fontSize: 14,
    color: "#7F77DD",
  },
  loginLinkBold: {
    color: "#534AB7",
    fontWeight: "700",
  },
});