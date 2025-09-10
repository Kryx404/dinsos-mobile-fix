import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    Image,
    SafeAreaView,
    StatusBar,
    Modal,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";
import LoadingScreen from "../components/LoadingScreen";
import Header from "../components/Header";
import { supabase } from "../../lib/supabaseClient";

export default function IkmScreen() {
    const navigation = useNavigation();
    const [ikmData, setIkmData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showNoDataModal, setShowNoDataModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    useEffect(() => {
        const fetchIkm = async () => {
            try {
                const { data, error } = await supabase
                    .from("tb_ikm")
                    .select("*");
                if (error) throw error;
                setIkmData(data);
            } catch (error) {
                console.error("Error fetching IKM from Supabase: ", error);
            } finally {
                setLoading(false);
            }
        };
        fetchIkm();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#33A9FF" />
            <Header title="IKM" backgroundColor="#33A9FF" textColor="white" />

            {loading ? (
                <LoadingScreen />
            ) : (
                <ScrollView
                    style={{ flex: 1 }}
                    contentContainerStyle={styles.relatedContainer}>
                    {ikmData.length === 0 ? (
                        <Text style={{ textAlign: "center", marginTop: 20 }}>
                            Data IKM belum tersedia.
                        </Text>
                    ) : (
                        ikmData.map((item, idx) => (
                            <TouchableOpacity
                                key={idx}
                                style={styles.card}
                                onPress={() =>
                                    navigation.navigate("IkmDetail", {
                                        id: item.id,
                                    })
                                }>
                                <View style={styles.cardContent}>
                                    <View style={styles.cardTextContainer}>
                                        <Text style={styles.cardTitle}>
                                            {item.triwulan}
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))
                    )}
                </ScrollView>
            )}

            <View style={styles.homeIndicator} />
        </SafeAreaView>
    );
}
