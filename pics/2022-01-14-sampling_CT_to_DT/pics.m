clear; close all; clc;

%% ADC DAC �׸�
close all;
sigma = 1;

my_norm = @(x) exp(-x.^2/ 2) / sqrt(2*pi);
my_norm_dif = @(x) -x.*exp(-x.^2/2)/sqrt(2*pi);

xx = linspace(-3,3,100);
xx_d = linspace(-3,3,10);

linewidth = 3;

% ���� ��ȣ
figure('position',[680, 812, 570, 160])
plot(xx, my_norm(xx),'linewidth',linewidth);
set(gca,'visible','off')

% �̻�ȭ �� �Է� ��ȣ
figure('position',[680, 812, 570, 160])
plot(xx, my_norm(xx),'--');
hold on;

stem(xx_d, my_norm(xx_d),'linewidth',linewidth);
set(gca,'visible','off')

% ������ �ý����� ����� ���� �̻� ��ȣ
figure('position',[680, 812, 570, 160])
plot(xx, my_norm_dif(xx),'--');
hold on;

stem(xx_d, my_norm_dif(xx_d),'linewidth',linewidth);
set(gca,'visible','off')
% ������ ���� ��ȣ
figure('position',[680, 812, 570, 160])
plot(xx, my_norm_dif(xx),'linewidth',linewidth);
set(gca,'visible','off')



%% ������ �����ļ��� �����ϰ� ���ø��Ǵ� ���� ���̽���
% ���ӽ�ȣ

fs = 1000;
t = 0:1/fs:2;

x1_ct = cos(pi*t);
x2_ct = cos(2 * pi * t);
x3_ct = cos(4 * pi * t);

% �̻��ȣ
Ts_1 = 0.2;
t_1 = 0:Ts_1:2;
x1_dt = cos(pi*t_1);

Ts_2 = 0.1;
t_2 = 0:Ts_2:2;
x2_dt = cos(2 * pi * t_2);

Ts_3 = 0.05;
t_3 = 0:Ts_3:2;
x3_dt = cos(4 * pi* t_3);

figure('position',[680, 409, 1100, 568]);
subplot(3,1,1);
plot(t, x1_ct,'--');
hold on;
stem(t_1, x1_dt, 'linewidth', 2)
title('cos(\pit), T_s = 0.2');
xlabel('time (s)');

subplot(3,1,2);
plot(t, x2_ct,'--');
hold on;
stem(t_2, x2_dt, 'linewidth', 2)
title('cos(2\pit), T_s = 0.1');
xlabel('time (s)');

subplot(3,1,3);
plot(t, x3_ct,'--');
hold on;
stem(t_3, x3_dt, 'linewidth', 2)
title('cos(4\pit), T_s = 0.05');
xlabel('time (s)');

%% 
Ts = 0.001;
t = -2:Ts:4;
x1 = cos(pi*t);
x2 = cos(1.5*pi*t);
x3 = cos(6*pi*t);

figure('position',[680, 558, 1100, 240]);
plot(t, x1,'k');
hold on;
plot(t, x2,'b--')
plot(t, x3,'b');

Ts = 0.8; % fs: 1.25 Hz
t_dt = unique(cat(2, 0:-Ts:-2, 0:Ts:4));
x1_dt = cos(pi*t_dt);
x2_dt = cos(1.5 * pi*t_dt);
x3_dt = cos(6 * pi*t_dt);
stem(t_dt, x1_dt,'color',[0, 0.4470, 0.7410],'linewidth',2);
stem(t_dt, x2_dt,'color',[0.85, 0.325, 0.098],'linewidth',2);
stem(t_dt, x3_dt,'color','k','linewidth',2);
xlabel('time (s)');
grid on;

%%
tt = linspace(-0.3, 1.3, 100);
xx = cos(2*pi*1*tt);

Ts1 = 10;
tt_d1 = unique([0:-1/Ts1:-0.3, 0:1/Ts1:1.3]);
Ts2 = sqrt(110);
tt_d2 = unique([0:-1/Ts2:-0.3, 0:1/Ts2:1.3]);

xx_d1 = cos(2*pi*1*tt_d1);
xx_d2 = cos(2*pi*1*tt_d2);

figure('position',[680, 501, 830, 478]);
subplot(2,1,1);
plot(tt, xx,'--')
hold on;
stem(tt_d1, xx_d1, 'color','k','linewidth',2);
axis tight
title('�ֱ� �̻� ��ȣ: \omega_0=2\pi, \Omega_0 = 2\pi * 10');
xlabel('time (s)');
grid on;
set(gca,'fontname','��������');

subplot(2,1,2);
plot(tt, xx,'--')
hold on;
stem(tt_d2, xx_d2, 'color','k','linewidth',2);
axis tight
title('���ֱ� �̻� ��ȣ: \omega_0=2\pi, \Omega_0 = 2\pi * \surd 110');
xlabel('time (s)');
grid on;
set(gca,'fontname','��������');