import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
 } from '@nestjs/websockets';
 import { Logger, UseGuards } from '@nestjs/common';
 import { Socket, Server } from 'socket.io';
 import { AuthService } from './auth/auth.service';
 
import { WsAuthGuard } from './auth/ws-auth.guard';
 
 @WebSocketGateway({
   cors: {
     origin: '*',
   },
 })
 @UseGuards(WsAuthGuard)
 export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
 
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');
 
  

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, payload: string): void {
   this.server.emit('msgToClient', payload);
  }
 
  
  afterInit(server: Server) {
   this.logger.log('Init');
  }
 
 
  handleDisconnect(client: Socket) {
   this.logger.log(`Client disconnected: ${client.id}`);
  }
 
  
  handleConnection(client: Socket, ...args: any[]) {
   this.logger.log(`Client connected: ${client.id}`);
  }
 }