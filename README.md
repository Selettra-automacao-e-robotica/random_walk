# RANDOM WALK NAVIGATION

## DESCRICÃO
#### Pacote de navegação ROS do tipo random walk para AMRs, esse pacote foi criado, em parceria com a empresa Selettra Automação e Robótica, para que o AMR possa navegar em ambientes fechados transportando dispositivos de esterilização de ambientes como por exemplo lâmpadas que emitem raios UV do tipo C ou de ozônio. Dispensando a presença humana no ambiente garantindo sua segurança.

## PRÉ REQUISITOS

### Geral:
1. SO Ubuntu 20.04
2. ROS Noetic
3. node-red
4. Versão virtual de um robô (exemplo Turtlebo3 - https://emanual.robotis.com/docs/en/platform/turtlebot3/overview)

### Pacotes ROS:
1. map_server
2. move_base
3. slam_gmapping
4. navfn
5. DWAPlannerROS

### Node-red Palettes:
1. snappy-ros
2. node-red-contrib-uibuilder

### Uibuilder libraries:
1. jquery
2. bootstrap
3. bootstrap-vue
4. vue
5. nipplejs

## COMO USAR

### Importando Pacote ROS:

Colocar a pasta cleaner_navigation do backend dentro da pasta src de seu workspace ROS em seguida compilar com o comando
> $ catkin_make

ou

> $ catkin build

### Importando Flows Node-Red:

Com os palettes e bibliotecas devidadmente instaladas importar no node-red o arquivo random_walk.json presente na pasta middleware e depois clicar em deploy.

Devem aparecer cinco ambientes sendo eles dedicados ao início do sistema, controle manual do robô, funções que são realizadas durante o processo de execução de tarefa do robô, comunicação com o back-end e comunicação com o front-end.

### Importando Interface

Após importar arquivos do back-end e do middleware deve-se colar os arquivos da pasta random_walk presentes em frontend no seguinte didetório:

> ~/.node-red/uibuilder/random_walk

### Inicializando Pacote de Navegação:

Com o ambiente de simulação Gazebo com o robô e os pacotes gmapping e move_base já inicializados executar o comando no terminal:

> $roslaunch cleaner_navigation cleaner.launch

Em seguida inicializar o node-red com o nomando no terminal:

> node-red

### Acessando a Interface:

Com o node-red já inicializado abrir o navegador e digitar o seguinte endereço:

> localhost:1880/random_walk

ou se estiver acessando de outra máquina:

> IPdaMaquina:1880/random_walk

feito isso essa interface deve aparecer no navegador:

![image](https://user-images.githubusercontent.com/68859813/143967118-5fb945d8-a44e-49a2-84a9-5de535b4b47f.png)

#### Agora é só desfrutar  da aplicação!!!

## RESULTADOS OBTIDOS

Vídeo mostrando a utilização do sistema:

https://user-images.githubusercontent.com/68859813/143958493-f33cfed6-cccd-499e-9f3c-c7f2e30d93c5.mp4


Rastro de odometria obtido após circular pelo ambiente em um prazo de 60 minutos:

![image](https://user-images.githubusercontent.com/68859813/143956850-c8667eb6-aff8-41f6-92f2-a0227ef21bd6.png)

## DESENVOLVEDORES

<table>
  <tr>
    <td align="center"><a href="https://www.linkedin.com/in/clistenes-bento-28430911b" target="_blank"><img src="https://user-images.githubusercontent.com/68859813/143960838-cdea45a4-ec09-4e60-8852-b3f1a75d9540.png" alt="Cístenes Grizafis Bento"></a></td>
        <td align="center"><a href="https://www.linkedin.com/in/luiz-henrique-784b79b3" target="_blank"><img src="https://user-images.githubusercontent.com/68859813/143962162-d2e80e1c-da14-419b-af98-34b4ba4ec49e.png" alt="Luiz Henrique Pereira Isbaes"></a></td>
        <td align="center"><a href="https://www.linkedin.com/in/bruna-pereira-228272147" target="_blank"><img src="https://user-images.githubusercontent.com/68859813/143962146-768bf845-1ba4-48b8-bc1a-febf9809070c.png" alt="Bruna Pereira das Neves"></a></td>
        <td align="center"><a href="https://www.linkedin.com/in/ozeias-thomaz-likedin/b"><img src="https://user-images.githubusercontent.com/68859813/143962174-3fcb2e5c-6daa-48c5-8c83-7ec157e52d8c.png" alt="Ozeias Mateus Santos Thomaz"></a></td>
        <td align="center"><img src="https://user-images.githubusercontent.com/68859813/143962189-6b4010ae-0352-4c83-83d6-30bd09c8f8c8.png" alt="Leonardo Pestilo dos Santos"></td>
        <td align="center"><img src="https://user-images.githubusercontent.com/68859813/143962204-9c5a389e-4b02-4b93-9bf3-97faaeb1b550.png" alt="Diego Murilo Sousa da Luz"></td>
    </tr>
    <tr>
        <td align="center">Clístenes Grizafis Bento</td>
        <td align="center">Luiz Henrique Pereira Isbaes</td>
        <td align="center">Bruna Pereira das Neves</td>>
        <td align="center">Ozeias Mateus Santos Thomaz</td>>
        <td align="center">Leonardo Pestilo dos Santos</td>
        <td align="center">Diego Murilo Sousa da Luz</td>
    </tr>
    <tr>
        <td>https://github.com/Hobbies-Prof-Bento</td>
        <td>https://github.com/henriquesd11</td>
        <td>https://github.com/Bruna-Pereira</td>
        <td>https://github.com//OzeiasThomaz</td>
        <td>https://github.com/LeozinhoSantos</td>
        <td>https://github.com/Diegomurilo19</td>
    </tr>   
</table>

## Quaisqueres dúvidas, sugestões ou atualizações pode ficar a vontade para entrar em contato!!!
