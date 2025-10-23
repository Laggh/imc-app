import { Card } from '@/components/ui/card';
import { useDrawer } from '@/context/DrawerContext';
import { useTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import {
  Image,
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function AboutScreen() {
  const { openDrawer } = useDrawer();
  const { theme } = useTheme();

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <View style={styles.header}>
        <Ionicons
          name="menu"
          size={28}
          color={theme.colors.primary}
          onPress={openDrawer}
        />
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Sobre
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Card style={styles.card}>
          <View style={styles.iconContainer}>
            <Ionicons
              name="calculator"
              size={48}
              color={theme.colors.primary}
            />
          </View>
          <Text style={[styles.appName, { color: theme.colors.text }]}>
            Calculadora de IMC
          </Text>
          <Text style={[styles.version, { color: theme.colors.icon }]}>
            v1.0.0
          </Text>
        </Card>

        <Card style={styles.card}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Desenvolvedor
          </Text>
          <View style={styles.profileContainer}>
            <Image
              source={require('@/assets/images/renan.png')}
              style={styles.profileImage}
            />
            <Text style={[styles.developerName, { color: theme.colors.text }]}>
              Renan Andrades
            </Text>
          </View>
          
          <View style={styles.educationSection}>
            <Text style={[styles.educationLabel, { color: theme.colors.icon }]}>
              Curso
            </Text>
            <Text style={[styles.educationValue, { color: theme.colors.text }]}>
              3º ano Desenvolvimento de Sistemas 2025
            </Text>
            <Text style={[styles.educationValue, { color: theme.colors.text }]}>
              Etec João Belarmino
            </Text>
          </View>

          <View style={styles.divider} />
          
          <View style={styles.contactSection}>
            <TouchableOpacity
              style={styles.contactItem}
              onPress={() => Linking.openURL('mailto:renanandrades2008@gmail.com')}
            >
              <Ionicons
                name="mail"
                size={18}
                color={theme.colors.primary}
                style={{ marginRight: 8 }}
              />
              <Text style={[styles.contactLink, { color: theme.colors.primary }]}>
                renanandrades2008@gmail.com
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.contactItem}
              onPress={() => Linking.openURL('https://www.linkedin.com/in/renan-andrade-dos-santos-40ba09326')}
            >
              <Ionicons
                name="logo-linkedin"
                size={18}
                color={theme.colors.primary}
                style={{ marginRight: 8 }}
              />
              <Text style={[styles.contactLink, { color: theme.colors.primary }]}>
                LinkedIn
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.contactItem}
              onPress={() => Linking.openURL('https://github.com/Laggh')}
            >
              <Ionicons
                name="logo-github"
                size={18}
                color={theme.colors.primary}
                style={{ marginRight: 8 }}
              />
              <Text style={[styles.contactLink, { color: theme.colors.primary }]}>
                GitHub: Laggh
              </Text>
            </TouchableOpacity>
          </View>
        </Card>

        <Card style={styles.card}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Sobre o Aplicativo
          </Text>
          <Text style={[styles.description, { color: theme.colors.text }]}>
            Calculadora de IMC é um aplicativo mobile desenvolvido como auxílio pedagógico para demonstrar conceitos práticos de desenvolvimento de sistemas. Permite calcular e acompanhar seu Índice de Massa Corporal (IMC) de forma fácil, prática e intuitiva.
          </Text>
        </Card>

        <Card style={styles.card}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Recursos
          </Text>
          <View style={styles.featureItem}>
            <Ionicons
              name="checkmark-circle"
              size={20}
              color={theme.colors.primary}
              style={{ marginRight: 12 }}
            />
            <Text style={[styles.featureText, { color: theme.colors.text }]}>
              Calcule seu IMC com precisão
            </Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons
              name="checkmark-circle"
              size={20}
              color={theme.colors.primary}
              style={{ marginRight: 12 }}
            />
            <Text style={[styles.featureText, { color: theme.colors.text }]}>
              Acompanhe seu histórico de medidas
            </Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons
              name="checkmark-circle"
              size={20}
              color={theme.colors.primary}
              style={{ marginRight: 12 }}
            />
            <Text style={[styles.featureText, { color: theme.colors.text }]}>
              Veja sua diferença de peso em relação ao ideal
            </Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons
              name="checkmark-circle"
              size={20}
              color={theme.colors.primary}
              style={{ marginRight: 12 }}
            />
            <Text style={[styles.featureText, { color: theme.colors.text }]}>
              Classificação de IMC precisa
            </Text>
          </View>
        </Card>

        <Card style={styles.card}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Sobre o Projeto
          </Text>
          <Text style={[styles.description, { color: theme.colors.text }]}>
            Este é um projeto desenvolvido como auxílio à professora <Text style={styles.bold}>Renata</Text>, no contexto da formação em Desenvolvimento de Sistemas. É um projeto <Text style={styles.bold}>sem fins lucrativos</Text>, dedicado a auxiliar na educação e prática de desenvolvimento de aplicações móveis.
          </Text>
        </Card>

        <Card style={styles.card}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Aviso Legal
          </Text>
          <Text style={[styles.legalText, { color: theme.colors.text }]}>
            Este aplicativo é apenas para fins informativos. Consulte um
            profissional de saúde para orientação médica personalizada sobre
            seu peso e saúde.
          </Text>
        </Card>

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: theme.colors.icon }]}>
            © 2025 Calculadora de IMC. Todos os direitos reservados.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 16,
    marginHorizontal: 16,
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  card: {
    marginBottom: 16,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  appName: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 4,
  },
  version: {
    fontSize: 14,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureText: {
    fontSize: 14,
    flex: 1,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  developerName: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  educationSection: {
    marginTop: 16,
    marginBottom: 8,
  },
  educationLabel: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
  },
  educationValue: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4,
  },
  contactSection: {
    marginTop: 12,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  contactLink: {
    fontSize: 13,
    fontWeight: '500',
    flex: 1,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 8,
  },
  legalText: {
    fontSize: 13,
    lineHeight: 18,
    fontStyle: 'italic',
  },
  bold: {
    fontWeight: '700',
  },
  footer: {
    alignItems: 'center',
    marginTop: 24,
    paddingTop: 16,
  },
  footerText: {
    fontSize: 12,
    textAlign: 'center',
  },
});
