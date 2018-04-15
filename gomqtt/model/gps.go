package model

type RawDataPoint struct {
	DevEUI string
	Time   string
	Data   GPSData `json:"decoded_payload"`
}

type GPSData struct {
	RawData string
}

type Coord struct {
	Latitude  string
	Longitude string
	Time      string
}

type CoordResponse struct {
	CoordHistory []Coord
}
