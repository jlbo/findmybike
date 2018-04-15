package server

import (
	"encoding/json"
	"fmt"
	"strings"

	"bitbucket.org/mqiot/gomqtt/model"

	mqtt "github.com/eclipse/paho.mqtt.golang"
)

func (s *server) connect(opts *mqtt.ClientOptions) {
	c := mqtt.NewClient(opts)
	if t := c.Connect(); t.Wait() && t.Error() != nil {
		panic(t.Error())
	}
	fmt.Println("connected to mqtt server")
}

func (s *server) onConnect(client mqtt.Client) {
	for {
		client.Subscribe("/#", byte(0), s.messageHandler)
	}
}

func (s *server) messageHandler(c mqtt.Client, m mqtt.Message) {
	fmt.Println("new data point")

	s.processGPSMessage(m)
}

func (s *server) processGPSMessage(m mqtt.Message) {
	msg := m.Payload()

	raw := new(model.RawDataPoint)
	if err := json.Unmarshal(msg, raw); err != nil {
		fmt.Printf("could not unmarshal message: %v\n%s\n", err, msg)
		return
	}

	pt := raw.Data.RawData
	if pt[0] == 'A' {
		s.currentPt.Latitude = translateCoord(pt)
	} else if pt[0] == 'B' {
		if s.currentPt.Latitude == "" {
			fmt.Println("lost a packet")
			return
		}

		s.currentPt.Longitude = translateCoord(pt)
		tags := map[string]string{
			"devEUI": raw.DevEUI,
			"txTime": raw.Time,
		}
		fields := map[string]interface{}{
			"lat":  s.currentPt.Latitude,
			"long": s.currentPt.Longitude,
		}

		s.currentPt = model.Coord{}

		if err := s.insertGPSPoint(tags, fields); err != nil {
			fmt.Println(err)
		}
	} else {
		fmt.Printf("Weird message: %s\n", pt)
	}
}

func translateCoord(raw string) string {
	var s string
	if raw[1] == 'F' {
		s = "-"
	} else if raw[1] != 'E' {
		fmt.Printf("bad format: %s\n", raw)
		return ""
	}

	i := strings.IndexByte(raw, 'D')
	s += raw[2:i] + "." + raw[i+1:]
	return s
}

func processThermoMessage(m mqtt.Message) {}
