import { Document, Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer";

const MemoPDFDocument = ({ message }) => {
    const styles = StyleSheet.create({
        page: {
            flexDirection: "column",
            backgroundColor: "#FFF",
            margin: 20,
        },
        section: {
            marginBottom: 20,
        },
        subSection: {
            marginBottom: 10,
        },
        header: {
            fontWeight: "bolder",
            fontSize: 30,
            marginBottom: 3,
        },
        subHeader: {
            fontWeight: "bolder",
            fontSize: 25,
            marginBottom: 3,
        },
        lineText: {
            marginBottom: 2,
        }
    });

    const formatTimestamp = (timestamp) => {
        if (timestamp === null) {
            return timestamp;
        } else {
            const options = {
                year: "numeric",
                month: "long",
                day: "2-digit",
            }

            const date = new Date(timestamp);
            const formattedDate = date.toLocaleString("en-US", options);

            return formattedDate;
        }
    }

    return (
        <Document>
            <Page size='A4' style={styles.page}>
                <Text style={styles.header}>Memo Details</Text>
                <View style={styles.section}>
                    <Text style={styles.lineText}>Memo Title: {message.title}</Text>

                    <Text style={styles.lineText}>Memo Description: {message.description}</Text>

                    <Text style={styles.lineText}>Sender: {message.sender}</Text>

                    <Text style={styles.lineText}>Receipient: {message.receipient}</Text>

                    <Text style={styles.lineText}>Date Sent: {formatTimestamp(message.dateSent)} </Text>

                    <Text style={styles.lineText}>Date Confirmed: {message.dateConfirmed ? formatTimestamp(message.dateConfirmed) : 'not yet confirmed'}</Text>

                    <Text>Memo Tracking Number: {message.memoTrackingNum}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subHeader}>Memo History</Text>

                    {
                        message.memoTransferHistory.map((transfer, index) => (
                            <View key={index} style={styles.subSection}>
                                <Text style={styles.lineText}>Sender: {transfer.sender}</Text>

                                <Text style={styles.lineText}>Receipient: {transfer.receipient}</Text>

                                <Text style={styles.lineText}>Date Sent: {formatTimestamp(transfer.dateSent)}</Text>

                                <Text style={styles.lineText}>Date Confirmed: {transfer.dateConfirmed ? formatTimestamp(transfer.dateConfirmed) : 'not confirmed yet'}</Text>
                            </View>
                        ))
                    }
                </View>
            </Page>
        </Document>
    )
}

export default MemoPDFDocument