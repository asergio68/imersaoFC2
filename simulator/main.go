package main

import (
	"log"
	"github.com/asergio68/imersaoFullcycle-simulator/infra/kafka"
	kafka2 "github.com/asergio68/imersaoFullcycle-simulator/application/kafka"
	"github.com/joho/godotenv"
	ckafka "github.com/confluentinc/confluent-kafka-go/kafka"
)

func init() {
	err  := godotenv.Load()
	if err != nil {
		log.Fatal("error loading .env file")
	}
}
// {"routeId":"1", "clientId":"Cliente 1"}
// {"routeId":"2", "clientId":"Cliente 2"}
// {"routeId":"3", "clientId":"Cliente 3"}
func main() {

	msgChan := make(chan *ckafka.Message)
	consumer := kafka.NewKafkaConsumer(msgChan)
	go consumer.Consume()

	for msg := range(msgChan) {
		go kafka2.Produce(msg)
	}

}