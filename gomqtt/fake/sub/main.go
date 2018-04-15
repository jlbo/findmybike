package main

import (
	"fmt"
	"time"

	mqtt "github.com/eclipse/paho.mqtt.golang"
)

const (
	brokerAddr      = "tcp://localhost:1883"
	qos        byte = 0
	clientID        = "mqiot_srv"
	topic           = "#"
)

func onReceive(client mqtt.Client, msg mqtt.Message) {
	fmt.Printf("Topic: %s\nMessage: %s\n\n", msg.Topic(), msg.Payload())
}

// subscribes to messages from fake mqtt client device
func main() {
	opts := mqtt.NewClientOptions()
	opts.ClientID = clientID
	opts.OnConnect = func(c mqtt.Client) {
		if token := c.Subscribe(topic, qos, onReceive); token.Wait() && token.Error() != nil {
			panic(token.Error())
		}
	}
	opts.AddBroker(brokerAddr)

	c := mqtt.NewClient(opts)
	if t := c.Connect(); t.Wait() && t.Error() != nil {
		panic(t.Error())
	} else {
		fmt.Printf("Connected to %s\n", brokerAddr)
	}

	for {
		time.Sleep(1 * time.Second)
	}
}
