这是一份服务器使用教程

# 加密解密
<!-- 
openssl enc -aes-256-cbc -salt -pbkdf2 -in instructions.md -out instructions.md.enc -pass pass:密码
openssl enc -d -aes-256-cbc -pbkdf2 -in instructions.md.enc -out instructions.md.e -pass pass:密码




openssl enc -aes-256-cbc -salt -pbkdf2 -in ssh-config -out ssh-config.enc -pass pass:密码
openssl enc -d -aes-256-cbc -pbkdf2 -in ssh-config.enc -out ssh-config.out -pass pass:密码 -->


如果想获取所有服务器的地址和管理员权限，请执行以下命令
```bash
wget -q https://githubimages.pengfeima.cn/config/ssh-config.enc -O ssh-config.enc
openssl enc -d -aes-256-cbc -pbkdf2 -in ssh-config.enc -out ssh-config.out -pass pass:密码
cp ssh-config.out ~/.ssh/config
```
