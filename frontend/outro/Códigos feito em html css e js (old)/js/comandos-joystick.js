

var estadoVelAnt=0;
var estadoAngAnt = 0;
      

/* var move = function (linear, angular, motor) {      
     
       
  if(linear==0){
    vm.envia_vel =0;
  }
  if(linear>0&&linear<25){
    vm.envia_vel =0;
  }
  if(linear>=25&&linear<60){
    vm.envia_vel =1;
  }
  if(linear>=60&&linear){
    vm.envia_vel =2;
  }       
  if((angular>=0&&angular<15)||(angular>345&&angular<=360)){
    vm.envia_ang = 0;
    vm.envia_motor = 0;
  }
  if(angular>=15&&angular<60){
    vm.envia_motor = 1;
    vm.envia_ang = 45;
  }
  if(angular>=60&&angular<120){
    vm.envia_motor = 2;
    vm.envia_ang = 90;
  }
  if(angular>=120&&angular<165){
    vm.envia_motor = 3;
    vm.envia_ang = 135;
  }
  if(angular>=165&angular<195){
    vm.envia_motor = 4;
    vm.envia_ang = 180;
  }
  if(angular>=195&angular<240){
    vm.envia_motor = 5;
    vm.envia_ang = 225;
  }
  if(angular>=240&angular<300){
    vm.envia_motor = 6;
    vm.envia_ang = 270;
  }
  if(angular>=300&angular<=345){
  vm.envia_motor = 7;
  vm.envia_ang = 315;
  }
  var estadoVel = vm.envia_vel;        
  var estadoAng = vm.envia_motor;
        
  if((estadoVel!=estadoVelAnt)||(estadoAng!=estadoAngAnt)){
    if(estadoVel==0){
      //Para
      uibuilder.send( { 'topic': 'controle', 'payload': [
        {'col1':'ns=4;i=18','col2':'Int16', 'col3': 0}                              
      ]});
      vm.envia_valor = 0;
    }
    if(estadoAng==0&&estadoVel==1){             
      // Gira p/ Direita 100% da Velocidade
      uibuilder.send( { 'topic': 'controle', 'payload': [
        {'col1':'ns=4;i=18','col2':'Int16', 'col3': 2}                              
      ]});
      vm.envia_valor = 2;
    }
    if(estadoAng==0&&estadoVel==2){             
      // Gira p/ Direita 50% da Velocidade
      uibuilder.send( { 'topic': 'controle', 'payload': [
        {'col1':'ns=4;i=18','col2':'Int16', 'col3': 1}                              
      ]});
      vm.envia_valor = 1;
    }
    if(estadoAng==1&&estadoVel==2){
      //Curva p/ Direita  Avanco 100% da Velocidade
      uibuilder.send( { 'topic': 'controle', 'payload': [
        {'col1':'ns=4;i=18','col2':'Int16', 'col3': 3}                              
      ]});
      vm.envia_valor = 3;
    }
    if(estadoAng==1&&estadoVel==1){
      // Curva p/ Direita  Avanco 50% da Velocidade
      uibuilder.send( { 'topic': 'controle', 'payload': [
        {'col1':'ns=4;i=18','col2':'Int16', 'col3': 4}                              
      ]});
      vm.envia_valor = 4;
    }
    if(estadoAng==2&&estadoVel==2){
      // Avanco 100% da Velocidade
      uibuilder.send( { 'topic': 'controle', 'payload': [
        {'col1':'ns=4;i=18','col2':'Int16', 'col3': 5}                              
      ]});
      vm.envia_valor = 5;
    }
    if(estadoAng==2&&estadoVel==1){
      // Avanco 50% da Velocidade
      uibuilder.send( { 'topic': 'controle', 'payload': [
        {'col1':'ns=4;i=18','col2':'Int16', 'col3': 6}                              
      ]});
      vm.envia_valor = 6;
    }
    if(estadoAng==3&&estadoVel==2){
      // Curva p/ Esquerda Avanco 100% da Velocidade
      uibuilder.send( { 'topic': 'controle', 'payload': [
        {'col1':'ns=4;i=18','col2':'Int16', 'col3': 7}                              
      ]});
      vm.envia_valor = 7;
    }
    if(estadoAng==3&&estadoVel==1){
      // Curva p/ Esquerda Avanco 50% da Velocidade
      uibuilder.send( { 'topic': 'controle', 'payload': [
        {'col1':'ns=4;i=18','col2':'Int16', 'col3': 8}                              
      ]});
      vm.envia_valor = 8;
    }
    if(estadoAng==4&&estadoVel==2){
      // Gira p/ Esquerda 100% da velocidade
      uibuilder.send( { 'topic': 'controle', 'payload': [
        {'col1':'ns=4;i=18','col2':'Int16', 'col3': 9}                              
      ]});
      vm.envia_valor = 9;
    }
    if(estadoAng==4&&estadoVel==1){
      // Gira p/ Esquerda 50% da velocidade
      uibuilder.send( { 'topic': 'controle', 'payload': [
        {'col1':'ns=4;i=18','col2':'Int16', 'col3': 10}                              
      ]});
      vm.envia_valor = 10;
    }
    if(estadoAng==5&&estadoVel==2){
      // Curva p/ Esquerda Recuo 100% da Velocidade
      uibuilder.send( { 'topic': 'controle', 'payload': [
        {'col1':'ns=4;i=18','col2':'Int16', 'col3': 11}                              
      ]});
      vm.envia_valor = 11;
    }
    if(estadoAng==5&&estadoVel==1){
      // Curva p/ Esquerda Recuo 50% da Velocidade
      uibuilder.send( { 'topic': 'controle', 'payload': [
        {'col1':'ns=4;i=18','col2':'Int16', 'col3': 12}                              
      ]});
      vm.envia_valor = 12;
    }
    if(estadoAng==6&&estadoVel==2){
      // Recuo 100% da Velocidade
      uibuilder.send( { 'topic': 'controle', 'payload': [
        {'col1':'ns=4;i=18','col2':'Int16', 'col3': 13}                              
      ]});
      vm.envia_valor = 13;
    }
    if(estadoAng==6&&estadoVel==1){
      // Recuo 50% da Velocidade
      uibuilder.send( { 'topic': 'controle', 'payload': [
        {'col1':'ns=4;i=18','col2':'Int16', 'col3': 14}                              
      ]});
      vm.envia_valor = 14;
    }
    if(estadoAng==7&&estadoVel==2){
      // Curva p/ Direita Recuo 100% da Velocidade
      uibuilder.send( { 'topic': 'controle', 'payload': [
        {'col1':'ns=4;i=18','col2':'Int16', 'col3': 15}                              
      ]});
      vm.envia_valor = 15;
    }
    if(estadoAng==7&&estadoVel==1){
      // Curva p/ Direita Recuo 50% da Velocidade
      uibuilder.send( { 'topic': 'controle', 'payload': [
        {'col1':'ns=4;i=18','col2':'Int16', 'col3': 16}                              
      ]});
      vm.envia_valor = 16;
    }
            
    estadoVelAnt=estadoVel;
    estadoAngAnt=estadoAng;    
            
  }
} */
      
var options = {
  zone: document.getElementById('zone_joystick'),
  threshold: 0.1,
  position: {left: 50 + '%', top: "300px"},
  mode: 'static',
  size: 300,
  color: 'white',
  fadeTime: 0
};
      
var manager = nipplejs.create(options);
      
var linear_speed = 0;
var angular_speed = 0;
var orienta_motor = 0
var timer =0;

manager.on('start', function (event, nipple) {
  timer = setInterval(function () {
   // move(linear_speed, angular_speed, orienta_motor);
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
  //move(0, 0, 0);
  self.onload
});