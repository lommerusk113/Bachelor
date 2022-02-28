import { View, Text, SafeAreaView, ScrollView} from 'react-native';
import styles from "../Styles/Styles"


const Bruksvilkår = () => {
  return (
    <SafeAreaView style={styles.container}>
        <Text style={[styles.header]}>Bruksvilkår</Text>
        <ScrollView>
            <Text style={styles.smallHeader}>1. Informasjon om oss</Text>
            <Text>Ekbok kjøre app er en mobilaplikasjon, opprettet av en studentgruppe på oppdrag fra Adcom.</Text>

            <Text style={styles.smallHeader}>2. Brukerveiledning</Text>
            <Text>Denne brukerveiledningen er midlertidig, og skal oppdaterest.</Text>


        </ScrollView>
    </SafeAreaView>
  )
}

export default Bruksvilkår