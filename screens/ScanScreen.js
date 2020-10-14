import React from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class ScanScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            hasCameraPermission: null,
            scanned: false,
            scannedData: '',
            buttonState: 'normal',
        }
    }

    getCameraPermissions = async (id) => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);

        this.setState({
            /*status === "granted" is true when user has granted permission
              status === "granted" is false when user has not granted the permission
            */
            hasCameraPermissions: status === "granted",
            buttonState: id,
            scanned: false
        });
    }

    handleBarCodeScanned = async ({ type, data }) => {
        const { buttonState } = this.state

        if (buttonState === "BookId") {
            this.setState({
                scanned: true,
                scannedBookId: data,
                buttonState: 'normal'
            });
        }
        else if (buttonState === "StudentId") {
            this.setState({
                scanned: true,
                scannedStudentId: data,
                buttonState: 'normal'
            });
        }

    }

    render() {
        const hasCameraPermissions = this.state.hasCameraPermissions;
        const scanned = this.state.scanned;
        const buttonState = this.state.buttonState;

        if (buttonState !== "normal" && hasCameraPermissions) {
            return (
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />
            );
        }

        else if (buttonState === "normal") {
            return (
                <TouchableOpacity
                    onPress={this.getCameraPermissions()}
                    style={styles.scanButton}
                    title={'Bar Code Scanner'}>
                    <Text style={styles.buttonText}>Scan QR Code</Text>
                </TouchableOpacity>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    displayText: {
        fontSize: 15,
        textDecorationLine: 'underline'
    },
    scanButton: {
        backgroundColor: '#2196F3',
        padding: 10,
        margin: 10
    },
    buttonText: {
        fontSize: 15,
        textAlign: 'center',
        marginTop: 10
    },
    inputView: {
        flexDirection: 'row',
        margin: 20
    },
    inputBox: {
        width: 200,
        height: 40,
        borderWidth: 1.5,
        borderRightWidth: 0,
        fontSize: 20
    },
    scanButton: {
        backgroundColor: '#66BB6A',
        width: 50,
        borderWidth: 1.5,
        borderLeftWidth: 0
    },
});