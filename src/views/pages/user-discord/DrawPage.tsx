import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { DrawsService } from "../../../services/draws.service";
import { DrawData } from "../../../interfaces";
import { useAuthStore } from "../../../stores";
import { connectToWebsocket } from "../../../apis/websockets";
import { Socket } from "socket.io-client";
import { WEBSOCKETS_MESSAGES } from "../../../global/constants";
import {
  CanceledDraw,
  DrawResults,
  WaitingDraw,
  WaitingWinners,
} from "./DrawScreens";
import { DrawLiveChat } from "./DrawLiveChat";

interface MessageProps {
  id: string;
  username: string;
  message: string;
}

export default function DrawPage() {
  const { id } = useParams();
  const authData = useAuthStore(state => state.authData)!;
  const token = useAuthStore(state => state.token)!;
  const [incomingResult, setIncomingResult] = useState<number>(-1);
  const chatRef = useRef<HTMLUListElement>(null);
  const socketRef = useRef<Socket | null>(null);
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [textMessage, setTextMessage] = useState("");
  const [drawData, setDrawData] = useState<DrawData | null>(null);
  const getDrawData = async () => {
    const data = await DrawsService.getDrawById(id!);
    setDrawData(data);
  };
  useEffect(() => {
    getDrawData();
  }, []);
  useEffect(() => {
    if (!drawData) return;
    const socket = connectToWebsocket(token);
    socketRef.current = socket;
    socket.on(WEBSOCKETS_MESSAGES.NEW_MESSAGE, (payload: MessageProps) => {
      setMessages(prev => [...prev, payload]);
    });
    socket.on(WEBSOCKETS_MESSAGES.START_DRAW, (payload: string) => {
      if (drawData?.id === payload) getDrawData();
    });
    socket.on(
      WEBSOCKETS_MESSAGES.WAITING_WINNER,
      (payload: { drawId: string; position: number }) => {
        if (drawData?.id === payload.drawId) {
          setIncomingResult(payload.position);
        }
      },
    );
    socket.on(WEBSOCKETS_MESSAGES.NEW_WINNER, (payload: string) => {
      if (drawData?.id === payload) getDrawData();
    });
    return () => {
      socket.off(WEBSOCKETS_MESSAGES.NEW_MESSAGE);
      socket.off(WEBSOCKETS_MESSAGES.START_DRAW);
      socket.off(WEBSOCKETS_MESSAGES.WAITING_WINNER);
      socket.off(WEBSOCKETS_MESSAGES.NEW_WINNER);
    };
  }, [drawData]);
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTo(0, chatRef.current.scrollHeight);
    }
  }, [messages.length]);

  const handleSubmitMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!textMessage) return;
    if (!socketRef.current) return;
    const newMessage = {
      id: authData.user.id,
      username: authData.user.username,
      message: textMessage,
    };
    socketRef.current.emit(WEBSOCKETS_MESSAGES.SEND_MESSAGE, newMessage);
    setMessages([...messages, newMessage]);
    setTextMessage("");
  };
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextMessage(event.target.value);
  };

  if (!drawData) return null;
  if (drawData.status === "canceled") {
    return (
      <section className="h-full flex items-center">
        <CanceledDraw />
      </section>
    );
  }
  if (drawData.status === "finished") {
    return (
      <section className="h-full flex items-center">
        <DrawResults {...drawData} />
      </section>
    );
  }

  return (
    <section>
      {drawData.status === "pending" && <WaitingDraw {...drawData} />}
      {drawData.status === "live" && (
        <WaitingWinners {...drawData} incomingResult={incomingResult} />
      )}
      <DrawLiveChat
        {...{
          chatRef,
          messages,
          textMessage,
          handleOnChange,
          handleSubmitMessage,
        }}
        userId={authData.user!.id}
      />
    </section>
  );
}
