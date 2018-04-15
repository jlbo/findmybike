package server

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strconv"

	"bitbucket.org/mqiot/gomqtt/model"
)

func (s *server) addDeviceHandler(w http.ResponseWriter, r *http.Request) {
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	dev := new(model.Device)
	if err := json.Unmarshal(body, &dev); err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	fmt.Printf("adding device: %s", dev.GenURI())

	s.addDeviceChan <- *dev
	uri := model.URIResponse{
		URI: dev.GenURI(),
	}

	resp, err := json.Marshal(uri)
	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	_, err = w.Write(resp)
	if err != nil {
		fmt.Println(err)
	}
}

func (s *server) getDeviceDataHandler(w http.ResponseWriter, r *http.Request) {
	lim, err := strconv.Atoi(r.FormValue("limit"))
	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	data, err := s.queryGPSDataPts(lim)
	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	var resp model.CoordResponse
	resp.CoordHistory = make([]model.Coord, len(data[0].Series[0].Values))
	for _, vals := range data[0].Series[0].Values {
		resp.CoordHistory = append(resp.CoordHistory, model.Coord{
			Time:      vals[0].(string),
			Latitude:  vals[1].(string),
			Longitude: vals[2].(string),
		})
	}

	b, err := json.Marshal(resp)
	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	_, err = w.Write(b)
	if err != nil {
		fmt.Println(err)
	}
}
