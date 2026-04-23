import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, KeyboardAvoidingView, Platform, ScrollView, Animated } from 'react-native';
import { router } from 'expo-router';
import { ShieldCheck, ChevronRight, Fingerprint } from 'lucide-react-native';
import { Colors } from '@/src/constants';

export default function LoginScreen() {
  const [email, setEmail] = useState('dev@yalerta.com');
  const [password, setPassword] = useState('admin123');
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const handleLogin = () => {
    // Navigate to the main tabs after "login"
    router.replace('/(tabs)');
  };

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1, backgroundColor: Colors.surface }} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} keyboardShouldPersistTaps="handled">
        {/* Background glow effect */}
        <View className="absolute top-[-100] left-[-100] w-96 h-96 rounded-full bg-ya-primary/10 blur-[100px]" />
        
        <View className="px-8 w-full max-w-[500px] self-center">
          
          <View className="mb-12">
            <View className="w-16 h-16 rounded-[20px] border border-ya-outline-variant/30 bg-[#1a2133]/90 shadow-2xl items-center justify-center mb-6">
              <ShieldCheck size={32} color={Colors.primary} />
            </View>
            <Text style={{ fontFamily: 'Space Grotesk' }} className="text-white text-5xl font-bold tracking-tighter mb-2">
              Ingresá a tu campo
            </Text>
            <Text className="text-ya-text-muted text-sm font-medium leading-relaxed">
              Sistema de monitoreo de precisión ganadera. Identifíquese para acceder a la red YALERTA.
            </Text>
          </View>

          <View className="gap-5">
            {/* Email Field */}
            <View>
              <Text style={{ fontFamily: 'Space Grotesk' }} className="text-ya-text-muted text-[11px] font-bold uppercase tracking-widest mb-2 ml-1">
                Correo Electrónico
              </Text>
              <View className={`rounded-xl border ${isEmailFocused ? 'border-ya-primary bg-[#1a2133]/90' : 'border-ya-outline-variant/30 bg-[#13192b]/80'} overflow-hidden`}>
                <TextInput
                  className="px-4 py-4 text-white font-medium text-[15px]"
                  placeholder="usuario@estancia.com"
                  placeholderTextColor={Colors.textSecondary}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                  onFocus={() => setIsEmailFocused(true)}
                  onBlur={() => setIsEmailFocused(false)}
                />
              </View>
            </View>

            {/* Password Field */}
            <View>
              <View className="flex-row justify-between items-center mb-2 ml-1">
                <Text style={{ fontFamily: 'Space Grotesk' }} className="text-ya-text-muted text-[11px] font-bold uppercase tracking-widest">
                  Contraseña
                </Text>
                <Pressable>
                  <Text style={{ fontFamily: 'Space Grotesk' }} className="text-ya-primary text-[10px] font-bold uppercase tracking-widest">
                    ¿Olvidaste tu contraseña?
                  </Text>
                </Pressable>
              </View>
              <View className={`rounded-xl border ${isPasswordFocused ? 'border-ya-primary bg-[#1a2133]/90' : 'border-ya-outline-variant/30 bg-[#13192b]/80'} overflow-hidden`}>
                <TextInput
                  className="px-4 py-4 text-white font-medium text-[15px]"
                  placeholder="••••••••••••"
                  placeholderTextColor={Colors.textSecondary}
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                  onFocus={() => setIsPasswordFocused(true)}
                  onBlur={() => setIsPasswordFocused(false)}
                />
              </View>
            </View>
          </View>

          <View className="mt-8">
            <Pressable 
              onPress={handleLogin}
              className="flex-row items-center justify-between rounded-xl bg-ya-primary p-5"
            >
              <View className="flex-row items-center gap-3">
                <Fingerprint size={20} color="#0a1120" />
                <Text style={{ fontFamily: 'Space Grotesk' }} className="text-[#0a1120] text-[15px] font-extrabold tracking-widest uppercase">
                  Iniciar Sesión
                </Text>
              </View>
              <ChevronRight size={20} color="#0a1120" />
            </Pressable>
          </View>

          <View className="mt-12 flex-row justify-center items-center gap-1">
            <Text className="text-ya-text-muted text-xs font-medium">¿No tenés una cuenta?</Text>
            <Pressable>
              <Text style={{ fontFamily: 'Space Grotesk' }} className="text-white text-xs font-bold uppercase tracking-wider ml-1">
                Crear cuenta
              </Text>
            </Pressable>
          </View>
          
          <View className="mt-8 pt-8 border-t border-ya-outline-variant/20 flex-row justify-between items-center">
            <View>
              <Text style={{ fontFamily: 'Space Grotesk' }} className="text-white text-[10px] font-bold uppercase tracking-widest">
                Global Coverage
              </Text>
              <Text className="text-ya-text-muted text-[10px] mt-1">
                12.4k Sensores activos en tiempo real
              </Text>
            </View>
            <Text style={{ fontFamily: 'Space Grotesk' }} className="text-ya-primary text-2xl font-bold tracking-tighter">
              99.9%
            </Text>
          </View>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
