#! /usr/bin/env python3

import rospy
import actionlib
from std_msgs.msg import Empty, Int16
import random
from robot_control import RobotControl
from nav_msgs.msg import Odometry
from move_base_msgs.msg import MoveBaseAction, MoveBaseGoal

class CleanerNavigation:

    def __init__(self):

        #atributos
        self.in_task = False
        self.init_task = True
        self.in_pause = False
        self.finish_task = False
        self.state = Int16()
        self.state.data = 0
        self.start_odometry = Odometry()
        self.current_odometry = Odometry()
        self.goal = MoveBaseGoal()
        self.laser_angle_max = rospy.get_param('amr_cleaner_navigation_node/laser_angle_max')
        self.range_turn = rospy.get_param('amr_cleaner_navigation_node/range_turn')
        self.cleaner_odom = rospy.get_param('amr_cleaner_navigation_node/odom')
        #subscribers
        self.sub_start = rospy.Subscriber('/amr_start',Empty,self.start_callback, queue_size=1)
        self.sub_finish = rospy.Subscriber('/amr_finish',Empty,self.finish_callback, queue_size=1)
        self.sub_pause = rospy.Subscriber('/amr_pause',Empty, self.pause_callback, queue_size=1)
        self.sub_odom = rospy.Subscriber('/odom',Odometry,self.odom_callback, queue_size=1)
        self.sub_cancel = rospy.Subscriber('amr_cancel', Empty, self.cancel_callback, queue_size=1)
        #publicadores
        self.pub_state = rospy.Publisher('amr_state', Int16, queue_size=1)

        # outros ojetos
        self.robot = RobotControl()        
        self.rate = rospy.Rate(10)
        self.client = actionlib.SimpleActionClient('/move_base', MoveBaseAction)  
        self.update()

    # callbacks
    def start_callback(self, msg): #metodo chamado para chamar uma tarefa
        print('start')
        self.in_pause = False
        self.in_task = True
        if(self.init_task == True):
            self.start_odometry = self.current_odometry
        self.init_task = False
        self.state.data = 1
        self.pub_state.publish(self.state)
        self.move_robot()
        
    
    def finish_callback(self, msg): #metodo chamado quando tarefa foi concluida
        print('finish')
        self.in_pause = False
        self.in_task = False
        self.init_task = True
        
        self.client.wait_for_server
        self.goal.target_pose.header.frame_id = 'map'
        self.goal.target_pose.pose.position.x = self.start_odometry.pose.pose.position.x
        self.goal.target_pose.pose.position.y = self.start_odometry.pose.pose.position.y
        self.goal.target_pose.pose.position.z = self.start_odometry.pose.pose.position.z
        self.goal.target_pose.pose.orientation.x = self.start_odometry.pose.pose.orientation.x
        self.goal.target_pose.pose.orientation.y = self.start_odometry.pose.pose.orientation.y
        self.goal.target_pose.pose.orientation.z = self.start_odometry.pose.pose.orientation.z
        self.goal.target_pose.pose.orientation.w = self.start_odometry.pose.pose.orientation.w
        
        self.client.send_goal(self.goal)
        self.client.wait_for_result()
        self.state.data = 0
        self.pub_state.publish(self.state) 
               

    def pause_callback(self, msg): #metodo chamado para parar o AMR sem cancelar a tarefa
        self.in_pause = True
        self.in_task = True
        self.state.data = 2
        self.pub_state.publish(self.state)
        
    
    def odom_callback(self, odom): #metodos chamado para leitura de odometria
        self.current_odometry = odom

    def cancel_callback(self, msg): #metodo chamado para cancelar uma tarefa
        self.in_pause = False
        self.in_task = False
        self.init_task = True

        self.client.wait_for_server
        state_result = self.client.get_state()
        if(state_result == 1):
            self.client.cancel_goal()
        
        self.state.data = 0
        self.pub_state.publish(self.state)
        
        

    # Ações
    def move_robot(self): #metodo responsavel pela movimentação do AMR
        print('inicio move')
        old_pause = False
        robot_in_move = False
        while (self.in_task and not old_pause):
            if (self.in_pause):
                self.robot.stop_robot()
                old_pause = True
            else:
                old_pause = False
                print('movendo')
                i = 0
                while i<self.laser_angle_max:
                    if (i<137 and self.robot.get_laser(i)<self.range_turn):                        
                        self.turn_random('anticlockwise')
                        robot_in_move = False
                    elif (i == 137 and self.robot.get_laser(i)<self.range_turn):                       
                        if (self.robot.get_laser(227)>self.robot.get_laser(47)):
                            self.turn_random('anticlockwise')
                            robot_in_move = False
                        else:
                            self.turn_random('clockwise')
                            robot_in_move = False
                    elif (i>137 and self.robot.get_laser(i)<self.range_turn):                        
                        self.turn_random('clockwise')
                        robot_in_move = False                    
                    else:
                        if(not robot_in_move):
                            self.robot.move_straight()
                            robot_in_move = True
                    i+=1
            self.rate.sleep()
            
        self.robot.stop_robot()    
    
    def turn_random(self, clockwise): #metodo responsavel pelo giro do AMR em um angulo aleatorio
        if(clockwise == 'clockwise'):
            degrees = random.randint(0,76)
            self.robot.stop_robot()
            self.robot.rotate(-degrees)            
            print('rotaciona sentido horário')
        else:
            degrees = random.randint(0,76)
            self.robot.stop_robot()
            self.robot.rotate(degrees)           
            print('rotaciona sentido anti-horário')

    def update(self): #metodos que atualiza os comando de movimento do robo e os dados de leitura        
        rospy.spin()

if __name__ == "__main__":
    
    rospy.init_node("amr_cleaner_navigation_node", anonymous=True)   
        
    try:
       cleaner_navigation = CleanerNavigation() 

    except rospy.ROSInterruptException:
        pass