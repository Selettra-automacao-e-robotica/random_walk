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

        batery_porc: 90,
        manual_mode: true,
        amr_state: 'Disponível',
        timer: 60,
        display_timer_minutes: 60,
        display_timer_seconds: 0       

    }}, // --- End of data --- //

    computed: {
        

    }, // --- End of computed --- //

    methods: {
        
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
                app.batery_porc = msg.payload;
            }
            if(msg.topic === 'amr_state'){
                if(msg.payload == 0){
                    app.amr_state = 'Disponível';
                }
                if(msg.payload == 1){
                    app.amr_state = 'Realizando Tarefa';
                }
                if(msg.payload == 2){
                    app.amr_state = 'Em pausa';
                }                
            }
            if(msg.topic === 'manual_mode'){
                app.manual_mode = msg.payload;
            }
            if(msg.topic === 'amr_timer'){                
               let minutes = Math.floor(msg.payload / 60);
               let seconds = Number(msg.payload) % 60;
                app.display_timer_minutes = minutes;
                app.display_timer_seconds = seconds;
            }

        })

       

    }, // --- End of mounted hook --- //

}) // --- End of app definition --- //

// EOF