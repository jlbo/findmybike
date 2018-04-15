package main

import (
	"bitbucket.org/mqiot/gomqtt/server"
)

func main() {
	panic(server.StartServer("tcp://localhost:1883", "abc123"))
}
