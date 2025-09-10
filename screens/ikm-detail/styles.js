import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flexGrow: 1,
    },
    content: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#333",
    },
    subtitle: {
        fontSize: 16,
        marginVertical: 10,
        color: "#666",
    },
    card: {
        backgroundColor: "#f1f1f1",
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
    },
    cardText: {
        fontSize: 16,
        color: "#333",
    },
    // Modal styles
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        width: "80%",
        alignItems: "center",
    },
    modalText: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: "center",
    },
    modalButton: {
        backgroundColor: "#33A9FF",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    modalButtonText: {
        color: "white",
        fontWeight: "bold",
    },
});
