// @flow

// chave do googles api: AIzaSyCZgGfk1P-FfZeXOGie7T6jbR-XiqYkmuo

import { Button, MenuItem, Select } from "@material-ui/core";
import { FormEvent, useEffect, useRef, useState } from "react";
import io from "socket.io-client";

export const Mapping: React.FunctionComponent = (props) => {
  const socketIORef = useRef<SocketIOClient.Socket>();
  const [routes, setRoutes] = useState<any[]>([]);
  const [rotaSelecionada, setRotaSelecionda] = useState<string>("");

  useEffect(() => {
    fetch("http://localhost:3000/routes")
      .then((data) => data.json())
      .then((data) => setRoutes(data));
  }, []);

  useEffect(() => {
    socketIORef.current = io.connect("http://localhost:3000");
    socketIORef.current.on("connect", () => {
      console.log("conectado");
      socketIORef.current?.emit("message", { message: "meu teste" });
    });
    socketIORef.current.on("receive-message", (payload: any) => {
      console.log(payload);
    });
    socketIORef.current.on("new-position", (payload: any) => {
      console.log("new-position:");
      console.log(payload);
    });
  }, []);

  const onSubmit = (evento: FormEvent) => {
    evento.preventDefault();
    console.log("rota Selecionada: " + rotaSelecionada);
    socketIORef.current?.emit("new-direction", { routeId: rotaSelecionada });
  };
  return (
    <form onSubmit={onSubmit}>
      <Select
        fullWidth
        displayEmpty
        value={rotaSelecionada}
        onChange={(evento) => setRotaSelecionda(evento.target.value + "")}
      >
        <MenuItem value="">Selecione uma Rota</MenuItem>
        {routes.map((route, key) => (
          <MenuItem key={key} value={route.id}>
            {route.title}
          </MenuItem>
        ))}
      </Select>
      <Button type="submit" variant="contained" color="primary">
        Iniciar Corrida
      </Button>
    </form>
  );
};
