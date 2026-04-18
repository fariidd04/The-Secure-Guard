import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  StatusBar,
  ScrollView,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();
  const { name } = useLocalSearchParams();

  const displayName = name
    ? name.charAt(0).toUpperCase() + name.slice(1)
    : "Kawan";

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Lo yakin mau keluar?",
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: () => router.replace("/"),
        },
      ]
    );
  };

  const cards = [
    { icon: "🔥", label: "Trending", count: "42 post baru" },
    { icon: "👥", label: "Teman", count: "128 koneksi" },
    { icon: "💬", label: "Pesan", count: "7 belum dibaca" },
    { icon: "🔔", label: "Notifikasi", count: "12 notif baru" },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#534AB7" />

      <View style={styles.headerBg}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Halo, {displayName}! 👋</Text>
            <Text style={styles.subGreeting}>Selamat datang di SosmedNet</Text>
          </View>
          <TouchableOpacity style={styles.avatarCircle}>
            <Text style={styles.avatarText}>
              {displayName.charAt(0).toUpperCase()}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNum}>240</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNum}>189</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNum}>34</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>

        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeEmoji}>🎉</Text>
          <Text style={styles.welcomeTitle}>Akun lo sudah aktif!</Text>
          <Text style={styles.welcomeDesc}>
            Lo berhasil login dengan aman. Semua data lo terproteksi dengan enkripsi terbaru.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Aktivitas Lo</Text>
        <View style={styles.grid}>
          {cards.map((card, i) => (
            <TouchableOpacity key={i} style={styles.gridCard}>
              <Text style={styles.gridIcon}>{card.icon}</Text>
              <Text style={styles.gridLabel}>{card.label}</Text>
              <Text style={styles.gridCount}>{card.count}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.securityBadge}>
          <Text style={styles.securityIcon}>🛡️</Text>
          <View style={styles.securityText}>
            <Text style={styles.securityTitle}>Koneksi Aman</Text>
            <Text style={styles.securityDesc}>Email & data lo terverifikasi dan terenkripsi.</Text>
          </View>
          <View style={styles.securityDot} />
        </View>

        <TouchableOpacity style={styles.btnLogout} onPress={handleLogout}>
          <Text style={styles.btnLogoutText}>🚪  Logout</Text>
        </TouchableOpacity>

        <Text style={styles.footer}>SosmedNet v1.0.0 · Secure & Private 🔒</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F7FF",
  },
  headerBg: {
    backgroundColor: "#534AB7",
    paddingTop: 56,
    paddingHorizontal: 24,
    paddingBottom: 28,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  greeting: {
    fontSize: 22,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  subGreeting: {
    fontSize: 14,
    color: "#AFA9EC",
    marginTop: 2,
  },
  avatarCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#7F77DD",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
  },
  statsRow: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statNum: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  statLabel: {
    fontSize: 12,
    color: "#CECBF6",
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  body: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  welcomeCard: {
    backgroundColor: "#EEEDFE",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#CECBF6",
  },
  welcomeEmoji: {
    fontSize: 36,
    marginBottom: 8,
  },
  welcomeTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#3C3489",
    marginBottom: 6,
  },
  welcomeDesc: {
    fontSize: 14,
    color: "#7F77DD",
    textAlign: "center",
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#26215C",
    marginBottom: 12,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 24,
  },
  gridCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    width: "47%",
    alignItems: "flex-start",
    shadowColor: "#534AB7",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#EEEDFE",
  },
  gridIcon: {
    fontSize: 26,
    marginBottom: 8,
  },
  gridLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#26215C",
  },
  gridCount: {
    fontSize: 12,
    color: "#7F77DD",
    marginTop: 2,
  },
  securityBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EAF3DE",
    borderRadius: 14,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#C0DD97",
  },
  securityIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  securityText: {
    flex: 1,
  },
  securityTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#3B6D11",
  },
  securityDesc: {
    fontSize: 12,
    color: "#639922",
    marginTop: 2,
  },
  securityDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#1D9E75",
  },
  btnLogout: {
    borderWidth: 1.5,
    borderColor: "#E24B4A",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 16,
  },
  btnLogoutText: {
    color: "#E24B4A",
    fontSize: 15,
    fontWeight: "700",
  },
  footer: {
    textAlign: "center",
    fontSize: 12,
    color: "#AFA9EC",
    marginBottom: 32,
  },
});
