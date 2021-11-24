/* jshint browser: true, esversion: 5, asi: true */
/*globals Vue, uibuilder */
// @ts-nocheck
/*
  Copyright (c) 2021 Julian Knight (Totally Information)

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/
'use strict'

/** @see https://totallyinformation.github.io/node-red-contrib-uibuilder/#/front-end-library */

// eslint-disable-next-line no-unused-vars
const app = new Vue({
    el: '#app',
    data() { return {

        
        manual_mode: true,        
        timer: 60,
        display_timer_minutes: 60,
        display_timer_seconds: 0,
        message: 'Olá Vue!',        
        percentBattery: 0,
        colorPercentBattery: '',
        statusJobDesc: '',
        statusColorJob: '',
        topicStatusJob: 'down',
        topicMode: 'manual',
        screenOfHelp: 0,
        envia_vel: 0,
        envia_ang: 0,
        envia_motor: 0,
        envia_valor: 0,
        timerChange: false,

    }}, // --- End of data --- //

    computed: {
        

    }, // --- End of computed --- //

    methods: {  
        setTimer(){
            this.timerChange = true
        },
        mouseDown(){
            if(this.screenOfHelp == true){
                this.screenOfHelp = false;
            }
            if(this.timerChange == true){
                this.timerChange = false;
            }
        },
        amr_start(){

            if(app.timer>0 && app.amr_state != 'Realizando Tarefa'){
                uibuilder.send({
                    'topic': 'amr_start',
                    'payload': {}
                })
                uibuilder.send({
                    'topic': 'timer',
                    'payload': Number(app.timer)
                })
            }
            
        },
        amr_pause(){
            uibuilder.send({
                'topic': 'amr_pause',
                'payload': {}
            })
        },
        amr_cancel(){
            uibuilder.send({
                'topic': 'amr_cancel',
                'payload': {}
            })
        },
        amr_manual_mode(){
            app.manual_mode = !app.manual_mode      
            uibuilder.send({
                'topic': 'amr_manual_mode',
                'payload': app.manual_mode
            })
        },
        
        verifyPercentBattery(){
            if (this.percentBattery <= 15) {
                this.colorPercentBattery = 'danger';
            }
            if (this.percentBattery >= 16 && this.percentBattery <= 45) {
                this.colorPercentBattery = 'warning';
            }
            if (this.percentBattery >= 46 && this.percentBattery <= 65) {
                this.colorPercentBattery = 'info';
            }
            if (this.percentBattery >= 66) {
                this.colorPercentBattery = 'success';
            }
        },
        verifyStatusJob(){
        if (this.topicStatusJob == 'play'){
            this.statusJobDesc = "EXECUTANDO";
            this.statusColorJob = "info";
        }
        if (this.topicStatusJob == 'pause'){
            this.statusJobDesc = "PARADO";
            this.statusColorJob = "warning";
        }
        if (this.topicStatusJob == 'down'){
            this.statusJobDesc = "DISPONIVEL";
            this.statusColorJob = "success";
        }
        },
        processTo(typeTopic)
        {
        this.topicStatusJob = typeTopic;
        this.verifyStatusJob();
        },
        changeMode(mode)
        {
        this.topicMode = mode;
        this.amr_manual_mode();
        },
        redirectToControl(){
            window.location.href = "./joystick.html";
        },
        redirectToHome(){
            window.location.href = "./index.html";
        },
        chageStatusScreenHelp(isToHelp){
        if (isToHelp == 0) {
            this.screenOfHelp = false;
        }
        if (isToHelp == 1) {
            this.screenOfHelp = true;
        }
        },
        

    }, // --- End of methods --- //

    /** Called after the Vue app has been created. A good place to put startup code */
    created: function() {

        uibuilder.start(this) // Single param passing vue app to allow Vue extensions to be used.

    }, // --- End of created hook --- //

    /** Called once all Vue component instances have been loaded and the virtual DOM built */
    mounted: function(){

        const app = this  // Reference to `this` in case we need it for more complex functions

        // If msg changes - msg is updated when a standard msg is received from Node-RED
        uibuilder.onChange('msg', function(msg){

            if(msg.topic === 'batery_porc'){
                app.percentBattery = msg.payload;
                app.verifyPercentBattery();
            }
            if(msg.topic === 'amr_state'){
                if(msg.payload == 0){
                    app.topicStatusJob = 'down';
                    app.verifyStatusJob();
                }
                if(msg.payload == 1){
                    app.topicStatusJob = 'pause';
                    app.verifyStatusJob();
                }
                if(msg.payload == 2){
                    app.topicStatusJob = 'play';
                    app.verifyStatusJob();
                }                
            }
            if(msg.topic === 'manual_mode'){
                app.manual_mode = msg.payload;
                if(msg.payload){
                    app.topicMode = 'manual';
                }
                else if(!msg.payload){
                    app.topicMode = 'automatic';
                }
            }
            if(msg.topic === 'amr_timer'){                
               let minutes = Math.floor(msg.payload / 60);
               let seconds = Number(msg.payload) % 60;
                app.display_timer_minutes = minutes;
                app.display_timer_seconds = seconds;
            }

        })
        app.verifyPercentBattery();
        app.verifyStatusJob();

        /* Joystick */
        var estadoVelAnt=0;
        var estadoAngAnt = 0;
        var timer = null;
        var linear_speed = 0;
        var angular_speed = 0; 
        var orienta_motor = 0;         
        
        /* -------------------------------------- */
        /* Funções que serão chamadas */
        var move = function (linear, angular, motor) {       
            if(linear==0){
                app.envia_vel =0;
            }
            if(linear>0&&linear<25){
                app.envia_vel =0;
            }
            if(linear>=25&&linear<60){
                app.envia_vel =1;
            }
            if(linear>=60&&linear){
                app.envia_vel =2;
            }       
            if((angular>=0&&angular<15)||(angular>345&&angular<=360)){
                app.envia_ang = 0;
                app.envia_motor = 0;
            }
            if(angular>=15&&angular<60){
                app.envia_motor = 1;
                app.envia_ang = 45;
            }
            if(angular>=60&&angular<120){
                app.envia_motor = 2;
                app.envia_ang = 90;
            }
            if(angular>=120&&angular<165){
                app.envia_motor = 3;
                app.envia_ang = 135;
            }
            if(angular>=165&angular<195){
                app.envia_motor = 4;
                app.envia_ang = 180;
            }
            if(angular>=195&angular<240){
                app.envia_motor = 5;
                app.envia_ang = 225;
            }
            if(angular>=240&angular<300){
                app.envia_motor = 6;
                app.envia_ang = 270;
            }
            if(angular>=300&angular<=345){
                app.envia_motor = 7;
                app.envia_ang = 315;
            }
            var estadoVel = app.envia_vel;        
            var estadoAng = app.envia_motor;
            
            
            if((estadoVel!=estadoVelAnt)||(estadoAng!=estadoAngAnt)){
                if(estadoVel==0){
                    //Para
                    uibuilder.send({ 'topic': 'joystick', 'payload': 0});
                    app.envia_valor = 0;
                }
                if(estadoAng==0&&estadoVel==1){             
                    // Gira p/ Direita 100% da Velocidade
                    uibuilder.send({ 'topic': 'joystick', 'payload': 2});
                    app.envia_valor = 2;
                }
                if(estadoAng==0&&estadoVel==2){             
                    // Gira p/ Direita 50% da Velocidade
                    uibuilder.send({ 'topic': 'joystick', 'payload': 1});
                    app.envia_valor = 1;
                }
                if(estadoAng==1&&estadoVel==2){
                    //Curva p/ Direita  Avanco 100% da Velocidade
                    uibuilder.send({ 'topic': 'joystick', 'payload': 3});
                    app.envia_valor = 3;
                }
                if(estadoAng==1&&estadoVel==1){
                    // Curva p/ Direita  Avanco 50% da Velocidade
                    uibuilder.send({ 'topic': 'joystick', 'payload': 4});
                    app.envia_valor = 4;
                }
                if(estadoAng==2&&estadoVel==2){
                    // Avanco 100% da Velocidade
                    uibuilder.send({ 'topic': 'joystick', 'payload': 5});
                    app.envia_valor = 5;
                }
                if(estadoAng==2&&estadoVel==1){
                    // Avanco 50% da Velocidade
                    uibuilder.send({ 'topic': 'joystick', 'payload': 6});
                    app.envia_valor = 6;
                }
                if(estadoAng==3&&estadoVel==2){
                    // Curva p/ Esquerda Avanco 100% da Velocidade
                    uibuilder.send({ 'topic': 'joystick', 'payload': 7});
                    app.envia_valor = 7;
                }
                if(estadoAng==3&&estadoVel==1){
                    // Curva p/ Esquerda Avanco 50% da Velocidade
                    uibuilder.send({ 'topic': 'joystick', 'payload': 8});
                    app.envia_valor = 8;
                }
                if(estadoAng==4&&estadoVel==2){
                    // Gira p/ Esquerda 100% da velocidade
                    uibuilder.send({ 'topic': 'joystick', 'payload': 9});
                    app.envia_valor = 9;
                }
                if(estadoAng==4&&estadoVel==1){
                    // Gira p/ Esquerda 50% da velocidade
                    uibuilder.send({ 'topic': 'joystick', 'payload': 10});
                    app.envia_valor = 10;
                }
                if(estadoAng==5&&estadoVel==2){
                    // Curva p/ Esquerda Recuo 100% da Velocidade
                    uibuilder.send({ 'topic': 'joystick', 'payload': 11});
                    app.envia_valor = 11;
                }
                if(estadoAng==5&&estadoVel==1){
                    // Curva p/ Esquerda Recuo 50% da Velocidade
                    uibuilder.send({ 'topic': 'joystick', 'payload': 12});
                    app.envia_valor = 12;
                }
                if(estadoAng==6&&estadoVel==2){
                    // Recuo 100% da Velocidade
                    uibuilder.send({ 'topic': 'joystick', 'payload': 13});
                    app.envia_valor = 13;
                }
                if(estadoAng==6&&estadoVel==1){
                    // Recuo 50% da Velocidade
                    uibuilder.send({ 'topic': 'joystick', 'payload': 14});
                    app.envia_valor = 14;
                }
                if(estadoAng==7&&estadoVel==2){
                    // Curva p/ Direita Recuo 100% da Velocidade
                    uibuilder.send({ 'topic': 'joystick', 'payload': 15});
                    app.envia_valor = 15;
                }
                if(estadoAng==7&&estadoVel==1){
                    // Curva p/ Direita Recuo 50% da Velocidade
                    uibuilder.send({ 'topic': 'joystick', 'payload': 16});
                    app.envia_valor = 16;
                }                    
                estadoVelAnt=estadoVel;
                estadoAngAnt=estadoAng;                
            }
        }        

        /* configurações nipplejs */
            var options = {
                zone: document.getElementById('zone_joystick'),
                threshold: 0.1,
                position: { left: 50 + '%'},
                mode: 'static',
                size: 150,
                color: 'red'
            };
            var manager =  nipplejs.create(options);
            
            manager.on('start', function (event, nipple) {
                timer = setInterval(function () {
                    move(linear_speed, angular_speed, orienta_motor);
                    }, 25);
            });

            manager.on('move', function (event, nipple) {
                var max_linear = 5.0; // m/s
                var max_angular = 100.0; // rad/s
                var max_distance = 75.0; // pixels;
                //linear_speed = Math.sin(nipple.angle.radian) * max_linear * nipple.distance/max_distance;    
                linear_speed = nipple.distance;
                angular_speed = nipple.angle.degree; 
                orienta_motor = Math.sin(nipple.angle.radian);
            // angular_speed = -Math.cos(nipple.angle.radian) * max_angular * nipple.distance/max_distance;
            });

            manager.on('end', function () {
                if (timer) {
                    clearInterval(timer);
                    }
                move(0, 0, 0);
                self.onload
            });
        /* -------------------------- */
        /* --------- */

        

    }, // --- End of mounted hook --- //
    updated() {
        app.screenOfHelp;
    },

}) // --- End of app definition --- //

// EOF