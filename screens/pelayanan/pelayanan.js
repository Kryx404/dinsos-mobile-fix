import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    Dimensions,
    Modal,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { supabase } from "../../lib/supabaseClient";
import { styles } from "./styles";
import LoadingScreen from "../components/LoadingScreen";
import StyledDescription from "../components/StyledDescription";
import Header from "../components/Header";
import ImageViewing from "react-native-image-viewing";
import ImageGallery from "../components/ImageGallery";

const screenWidth = Dimensions.get("window").width;

export default function PelayananScreen() {
    const navigation = useNavigation();
    const [pelayanan, setPelayanan] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");
    const [isImageVisible, setIsImageVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [showNoDataModal, setShowNoDataModal] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const { data, error } = await supabase
                    .from("tb_pelayanan")
                    .select("*");

                if (error) throw error;
                setPelayanan(Array.isArray(data) ? data : []);
            } catch (error) {
                setErrorMsg(error.message || "Gagal memuat data");
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    useEffect(() => {
        if (pelayanan && pelayanan.length > 0) {
            const hasImage = pelayanan.some(
                (item) =>
                    item.image_1 ||
                    item.image_2 ||
                    item.image_3 ||
                    item.image_4 ||
                    item.image_5,
            );
            setShowNoDataModal(!hasImage);
        }
    }, [pelayanan]);

    if (loading) return <LoadingScreen />;

    if (errorMsg || !pelayanan || pelayanan.length === 0) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>
                    {errorMsg || "Data tidak ditemukan"}
                </Text>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}>
                    <Text style={styles.backText}>Kembali</Text>
                </TouchableOpacity>
            </View>
        );
    }

    // Ambil semua image dari setiap item pelayanan
    const allImageUrls = pelayanan
        .map((item) => [
            item.image_1,
            item.image_2,
            item.image_3,
            item.image_4,
            item.image_5,
        ])
        .flat()
        .filter((url) => url);

    const openModal = (imageUrl) => {
        setSelectedImage([{ uri: imageUrl }]);
        setIsImageVisible(true);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" />
            <Header
                title={"Pelayanan Kompensasi"}
                backgroundColor="#33A9FF"
                textColor="white"
            />
            <View style={styles.content}>
                {/* Render semua data pelayanan */}
                {pelayanan.map((item, idx) => (
                    <View key={item.id || idx} >
                        {item.subtitle && (
                            <Text style={styles.subtitle}>{item.subtitle}</Text>
                        )}
                        {/* Bisa tambahkan komponen lain sesuai kebutuhan */}
                    </View>
                ))}

                <ImageGallery
                    images={allImageUrls}
                    showNoDataModal={showNoDataModal}
                    setShowNoDataModal={setShowNoDataModal}
                    router={navigation}
                />
            </View>

            {/* Optional image viewer - uncomment if image-viewing is installed */}
            {/*
            <ImageViewing
                images={selectedImage}
                imageIndex={0}
                visible={isImageVisible}
                onRequestClose={() => setIsImageVisible(false)}
            />
            */}
        </ScrollView>
    );
}
