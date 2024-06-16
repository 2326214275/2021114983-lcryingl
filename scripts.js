document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');

    // 模拟用户数据库
    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            const userExists = users.some(user => user.username === username || user.email === email);

            const messageElement = document.getElementById('registerMessage');

            if (userExists) {
                messageElement.textContent = '用户名或邮箱已存在。';
                messageElement.style.color = 'red';
            } else {
                users.push({ username, email, password });
                localStorage.setItem('users', JSON.stringify(users));
                messageElement.textContent = '注册成功！请登录。';
                messageElement.style.color = 'green';
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 2000);
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            const user = users.find(user => user.username === username && user.password === password);

            const messageElement = document.getElementById('loginMessage');

            if (user) {
                messageElement.textContent = '登录成功！欢迎回来。';
                messageElement.style.color = 'green';
                setTimeout(() => {
                    localStorage.setItem('currentUser', username);
                    window.location.href = 'index.html';
                }, 2000);
            } else {
                messageElement.textContent = '用户名或密码错误。';
                messageElement.style.color = 'red';
            }
        });
    }

    // 在首页显示欢迎信息和处理退出登录
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        const welcomeMessage = document.getElementById('welcomeMessage');
        const logoutButton = document.getElementById('logoutButton');

        if (welcomeMessage) {
            welcomeMessage.textContent = `欢迎，${currentUser}`;
        }

        if (logoutButton) {
            logoutButton.style.display = 'inline-block';
            logoutButton.addEventListener('click', () => {
                localStorage.removeItem('currentUser');
                alert('您已退出登录。');
                window.location.href = 'index.html';
            });
        }
    }
});
