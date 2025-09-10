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

export default function IkmDetailScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const { id } = route.params;

    const [ikm, setIkm] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");
    const [isImageVisible, setIsImageVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [showNoDataModal, setShowNoDataModal] = useState(false);

    useEffect(() => {
        if (!id) return;
        (async () => {
            try {
                const { data, error } = await supabase
                    .from("tb_ikm")
                    .select("*")
                    .eq("id", id)
                    .single();

                if (error) throw error;
                setIkm(data);
            } catch (error) {
                setErrorMsg(error.message || "Gagal memuat data");
            } finally {
                setLoading(false);
            }
        })();
    }, [id]);

    useEffect(() => {
        if (ikm) {
            const imageUrls = [
                ikm.image_1,
                ikm.image_2,
                ikm.image_3,
                ikm.image_4,
                ikm.image_5,
            ].filter((url) => url);

            if (imageUrls.length === 0) {
                setShowNoDataModal(true);
            }
        }
    }, [ikm]);

    if (loading) return <LoadingScreen />;

    if (errorMsg || !ikm) {
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

    const imageUrls = [
        ikm.image_1,
        ikm.image_2,
        ikm.image_3,
        ikm.image_4,
        ikm.image_5,
    ].filter((url) => url);

    const openModal = (imageUrl) => {
        setSelectedImage([{ uri: imageUrl }]);
        setIsImageVisible(true);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" />
            <Header
                title={ikm.title || `Detail IKM`}
                backgroundColor="#33A9FF"
                textColor="white"
            />
            <View style={styles.content}>
                {ikm.subtitle && (
                    <Text style={styles.subtitle}>{ikm.subtitle}</Text>
                )}

                <ImageGallery
                    images={imageUrls}
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
