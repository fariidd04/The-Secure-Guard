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
  StatusBar,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      Alert.alert("Oops!", "Email dan password wajib diisi, bro.");
      return;
    }

    if (!EMAIL_REGEX.test(trimmedEmail)) {
      Alert.alert("Email Gak Valid", "Format email lo salah. Cek lagi ya, contoh: nama@email.com");
      return;
    }

    if (trimmedPassword.length < 6) {
      Alert.alert("Password Lemah", "Password minimal 6 karakter.");
      return;
    }

    // Simulasi login sukses — replace dengan API call beneran
    Alert.alert("Yeay! 🎉", "Login berhasil!", [
      {
        text: "Lanjut",
        onPress: () =>
          router.replace({
            pathname: "/home",
            params: { name: trimmedEmail.split("@")[0] },
          }),
      },
    ]);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <StatusBar barStyle="dark-content" backgroundColor="#F8F7FF" />

        <View style={styles.inner}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoText}>SN</Text>
            </View>
            <Text style={styles.appName}>SosmedNet</Text>
            <Text style={styles.tagline}>Koneksi lo, dunia lo 🌏</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="nama@email.com"
              placeholderTextColor="#AAAAAA"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
            />

            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordWrapper}>
              <TextInput
                style={styles.inputPassword}
                placeholder="Masukkan password"
                placeholderTextColor="#AAAAAA"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                returnKeyType="done"
                onSubmitEditing={handleLogin}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeBtn}
              >
                <Text style={styles.eyeIcon}>{showPassword ? "🙈" : "👁️"}</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.btnPrimary} onPress={handleLogin}>
              <Text style={styles.btnPrimaryText}>Masuk</Text>
            </TouchableOpacity>

            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>atau</Text>
              <View style={styles.dividerLine} />
            </View>

            <TouchableOpacity
              style={styles.btnSecondary}
              onPress={() => router.push("/register")}
            >
              <Text style={styles.btnSecondaryText}>Daftar Disini</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.footer}>
            © 2025 SosmedNet · Secure & Private 🔒
          </Text>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F7FF",
  },
  inner: {
    flex: 1,
    paddingHorizontal: 28,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 36,
  },
  logoCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#534AB7",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  logoText: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "700",
  },
  appName: {
    fontSize: 26,
    fontWeight: "700",
    color: "#26215C",
    letterSpacing: 0.5,
  },
  tagline: {
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
    marginTop: 12,
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
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#EEEDFE",
  },
  dividerText: {
    marginHorizontal: 12,
    color: "#AFA9EC",
    fontSize: 13,
  },
  btnSecondary: {
    borderWidth: 1.5,
    borderColor: "#534AB7",
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: "center",
  },
  btnSecondaryText: {
    color: "#534AB7",
    fontSize: 15,
    fontWeight: "600",
  },
  footer: {
    textAlign: "center",
    marginTop: 28,
    fontSize: 12,
    color: "#AFA9EC",
  },
});
