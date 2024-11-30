
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function WelcomeScreen() {

    const router = useRouter();
    return (
        <View style={styles.container}>
    
          <Image
            source={require('@/assets/images/welcome-background.png')}
            style={styles.backgroundImage}
          />

          <View style={styles.flex}>

            <Text style={styles.title}> WELCOME </Text>

            <Image
              source={require('@/assets/images/cat-welcome.png')}
              style={styles.catWelcome}
            />  
            <TouchableOpacity onPress={() => router.push('/home')}>
              <Image
                source={require('@/assets/images/play-button.png')}
                style={styles.playButton}
              /> 
            </TouchableOpacity>

          </View>

    
    
    
        </View>
          
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      backgroundImage: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        ...StyleSheet.absoluteFillObject,
      },
      flex: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
      },
      title: {
        fontFamily: 'Inter',
        fontWeight: 900,
        fontSize: 48,   
        color: '#FFFFFF',
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: {width: 4, height: 4},
        textShadowRadius: 8,
      },
      catWelcome: {
        width: 250,
        height: 250,
      },
      playButton: {
        width: 151,
        height: 71,
        marginTop: 50,
      },
    
    });
    
