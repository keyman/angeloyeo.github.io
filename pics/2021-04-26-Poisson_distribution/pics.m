clear; close all; clc;

%% 다양한 lambda 값에 대한 poisson 분포

lambda = 10;

% f_binomial = @(x, n, p) factorial(n)./(factorial(x).*factorial(n-x)) .* p.^x .* (1-p).^(n-x);
f_poisson = @(n, lambda) lambda.^n * exp(-lambda)./factorial(n);

figure;
stem(1:100, f_poisson(1:100, 10))
% hold on;
% stem(0:540, f_binomial(0:540, 540, 0.003))
