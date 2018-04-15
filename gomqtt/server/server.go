package server

import (
	"net/http"
	"net/url"

	"bitbucket.org/mqiot/gomqtt/model"
	"github.com/gorilla/mux"

	mqtt "github.com/eclipse/paho.mqtt.golang"
	influx "github.com/influxdata/influxdb/client"
)

var (
	dbName = "mqiot"
)

type server struct {
	addDeviceChan chan model.Device
	db            *influx.Client
	currentPt     model.Coord
}

// initialize a new server (never returns)
func StartServer(mqttSrvAddr, mqttClientID string) error {
	addChan := make(chan model.Device)
	s := &server{
		addDeviceChan: addChan,
	}

	dbURL, err := url.Parse("http://localhost:8086")
	if err != nil {
		return err
	}

	s.db, err = influx.NewClient(influx.Config{URL: *dbURL})
	if err != nil {
		return err
	}

	r := mux.NewRouter()
	r.HandleFunc("/device", s.addDeviceHandler).Methods("POST")
	r.HandleFunc("/device", s.getDeviceDataHandler).Methods("GET").Queries("limit", "{limit}")

	hs := &http.Server{
		Addr:    ":8081",
		Handler: r,
	}

	opts := mqtt.NewClientOptions()
	opts.ClientID = mqttClientID
	opts.OnConnect = s.onConnect
	opts.CleanSession = false
	opts.AddBroker("tcp://localhost:1883")
	go s.connect(opts)

	return hs.ListenAndServe()
}
