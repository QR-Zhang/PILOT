<h2 align="center">
  <b>Vision-Driven End-to-End Motion Planning for UAVs Using Privileged Imitation Learning</b>
</h2>

<div align="center" margin-bottom="6em">
<a target="_blank" href="https://qr-zhang.github.io/">Qingrui Zhang</a>,
<a target="_blank" href="">Feng Xue</a>,
<a target="_blank" href="">Xiang Zhou</a>, 
<a target="_blank" href="">Chenghao Yu</a>
</div>


<h4 align="center">
  🎨 <b>This is a repository for our <i>PILOT</i> project</b>
</h4>
<!-- ## 🎨 This is a repository for our *PILOT* project -->

**PILOT**: **P**rivileged **I**mitation **L**earning algorithm for vision-based end-to-end UAV m**OT**ion planning

## 🛫 Abstract
Autonomous navigation in cluttered environments remains a challenge for vision-based unmanned aerial vehicles (UAVs). In this paper, we present PILOT, a privileged imitation learning algorithm for vision-based end-to-end UAV motion planning in cluttered and unstructured environments. The learning process of PILOT is guided by a model predictive control (MPC) expert with access to privileged information. A temporal convolutional network (TCN) is used to implicitly reconstruct all unobservable privileged information based on historical measurements, enabling a UAV to achieve extended spatial awareness beyond immediate visual perception. A trajectory parameterization technique is introduced to ensure motion smoothness and dynamic constraint satisfaction. The proposed PILOT framework is evaluated through extensive numerical simulations and diverse real-world experiments. It demonstrates that the planner learned by PILOT achieves consistent performance comparable to that of the MPC expert, with a significant reduction in computation time of more than 80%. Ablation studies have illustrated the efficiency of both TCN and trajectory parameterization modules.  Real-world tests on a custom-built quadrotor have corroborated that the learned motion planner can generate feasible, collision-free trajectories in real time directly using noisy visual observations. Both simulations and experimental results have confirmed PILOT’s capability of strong generalization to previously unseen environments. 

## ✨ Features

- 📝 The first contribution of this project is the design of a privileged imitation learning framework for vision-based autonomous flight of UAVs. Based on this framework, an end-to-end vision-based motion planner is trained to emulate the optimal behavior of a computationally intensive MPC expert with privileged global information in cluttered environments. The learned policy achieves performance comparable to that of the MPC expert by directly using a history of noisy depth images as input, while requiring significantly less computation time. We demonstrate the efficiency and generality of the learned policy on both a fixed-wing aircraft and a quadrotor vehicle through comprehensive simulations. Additionally, experiments conducted on a custom-built quadrotor further validate the proposed design. Experimental results illustrate that the learned planner outperforms MPC in scenarios where UAVs operate with a limited field of view, highlighting its superior efficiency and robustness.
- 📝 The second contribution is the development of a perception fusion module that integrates multi-sensor data over a sequence of time steps. This module encodes perceptual information from multiple sensors, such as depth cameras and Visual Inertial Odometry (VIO), into a unified latent feature representation. A Temporal Convolutional Network (TCN) is employed to fuse these latent features over time, enabling the planner to implicitly infer dynamic changes in the environment with a limited field of view, based on historical observations. This approach enhances the planner's ability to navigate complex environments by leveraging memory of previously encountered scenarios. Ablation studies have shown improved performance using a history of visual measurements, as opposed to a single-step image input.
- 📝 The last contribution is the introduction of a trajectory parameterization strategy that transforms network outputs into smooth and dynamically feasible trajectories. Rather than directly using a neural network to output actions for UAVs, our method generates control points that define a curve from which a smooth trajectory is derived. This strategy not only enhances the flexibility and generalizability of the learned planner across devices with varying control frequency requirements but also improves its resilience to unexpected delays caused by sensor or computational latency. As a result, the planned trajectories exhibit greater adaptability and reliability in real-world applications.

## 🚀 Outdoor experiment demo

<div align="center"> 
<!-- <img src="assets/teaser.png" width="99%" alt="LEO Teaser"> -->
<img src="https://qr-zhang.github.io/PILOT/exp_at_pillar_environment2.jpg" alt="Experimental results in a pillar environment" class="center" style="width:60%; height:auto;">
</div> 

![](public/expOutdoorPillar.mp4)
<!-- <div align="center"> -->
<video style="width:60%; height:auto" autoplay="autoplay" controls muted> 
  <source src="./public/expOutdoorPillar.mp4" type="video/mp4">
</video>
<!-- </div>  -->


🌐 **Project page**: [PILOT Project](https://qr-zhang.github.io/PILOT/)


## 🚦 Prerequisites
N/A

## ⚙️ Citations
to-be-added

