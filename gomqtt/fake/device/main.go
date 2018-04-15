package main

import (
	"fmt"
	"time"

	mqtt "github.com/eclipse/paho.mqtt.golang"
)

const (
	brokerAddr      = "tcp://localhost:1883"
	qos        byte = 0
	retained        = false
	clientID        = "mqiot"
	topic           = "/device/gps/111"
)

const data1 = `{
    "Time": "2018-04-14T23:11:55.829Z",
    "DecoderType": "Unknown",
    "DevEUI": "4ED909C55E57B9F7",
    "DevAddr": "12006B9E",
    "FPort": "1",
    "FCntUp": "4",
    "ADRbit": "1",
    "MessageType": "2",
    "FCntDn": "20",
    "payload_hex": "032f23",
    "decoded_payload": {
        "RawData": "AE39D956631"
    },
    "mic_hex": "b0d9a080",
    "GatewayRSSI": "-104.000000",
    "GatewaySNR": "-3.750000",
    "SpreadingFactor": "10",
    "SubBand": "G20",
    "Channel": "LC21",
    "GatewayCount": "3",
    "GatewayID": "DA0040C8",
    "Late": "0",
    "GatewayLAT": "39.954979",
    "GatewayLON": "-75.168633",
    "BatteryLevel": "",
    "GatewayList": [
        {
            "GatewayID": "DA0040C8",
            "GatewayRSSI": "-104.000000",
            "GatewaySNR": "-3.750000",
            "GatewayESP": "-109.278069"
        },
        {
            "GatewayID": "DA004116",
            "GatewayRSSI": "-111.000000",
            "GatewaySNR": "-12.250000",
            "GatewayESP": "-123.501282"
        },
        {
            "GatewayID": "DA0051C7",
            "GatewayRSSI": "-127.000000",
            "GatewaySNR": "-14.750000",
            "GatewayESP": "-141.893097"
        }
    ]
}`

const data2 = {
    "Time": "2018-04-14T23:11:55.829Z",
    "DecoderType": "Unknown",
    "DevEUI": "4ED909C55E57B9F7",
    "DevAddr": "12006B9E",
    "FPort": "1",
    "FCntUp": "4",
    "ADRbit": "1",
    "MessageType": "2",
    "FCntDn": "20",
    "payload_hex": "032f23",
    "decoded_payload": {
        "RawData": "BF75D190741"
    },
    "mic_hex": "b0d9a080",
    "GatewayRSSI": "-104.000000",
    "GatewaySNR": "-3.750000",
    "SpreadingFactor": "10",
    "SubBand": "G20",
    "Channel": "LC21",
    "GatewayCount": "3",
    "GatewayID": "DA0040C8",
    "Late": "0",
    "GatewayLAT": "39.954979",
    "GatewayLON": "-75.168633",
    "BatteryLevel": "",
    "GatewayList": [
        {
            "GatewayID": "DA0040C8",
            "GatewayRSSI": "-104.000000",
            "GatewaySNR": "-3.750000",
            "GatewayESP": "-109.278069"
        },
        {
            "GatewayID": "DA004116",
            "GatewayRSSI": "-111.000000",
            "GatewaySNR": "-12.250000",
            "GatewayESP": "-123.501282"
        },
        {
            "GatewayID": "DA0051C7",
            "GatewayRSSI": "-127.000000",
            "GatewaySNR": "-14.750000",
            "GatewayESP": "-141.893097"
        }
    ]
}

// fake mqtt client device that publishes every 10 seconds
func main() {
	opts := mqtt.NewClientOptions()
	opts.AddBroker(brokerAddr)
	opts.ClientID = clientID

	c := mqtt.NewClient(opts)
	if t := c.Connect(); t.Wait() && t.Error() != nil {
		fmt.Println(t.Error())
	}

	fmt.Printf("Connected to %s\n", brokerAddr)

	for {
		time.Sleep(10 * time.Second)
		c.Publish(topic, qos, retained, data1)
		c.Publish(topic, qos, retained, data2)
	}
}
