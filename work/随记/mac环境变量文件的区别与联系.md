### 1.bashrc

这个文件主要保存个人的一些个性化设置，如命令别名、路径等。定义了路径，语言，命令别名（使用rm删除命令时总是加上-i参数需要用户确认，使用ls命令列出文件列表时加上颜色显示）

每次修改.bashrc后，使用source ~/.bashrc (或者 ~/.bashrc)就可以加载修改后的设置，使之生效。

### 2全局profile和用户下的～/.profile

用户可以在profile文件中加入环境变量，如ORACLE_HOME，HOME，这样登陆之后，这些环境变量都会得以设置，不用每次都手工设置。

Unix/Linux有两个profile文件

#### 1./etc/profile:

是全局profile文件，设置后会影响到所有用户

#### 2./home/username/.profile 

或.bash_profile是针对特定用户的，来配置自己的环境变量。

**注意**：profile是unix上才有的，bash_profile是Linux有的(Linux,用户目录没有.profile文件),/home/username/.profile或者.bash_profile,都是隐藏文件，需要使用ls -a才能看到。

bash登陆的时候，profile执行的顺序

1.先执行全局profile,/etc/profile

2.接着bash会检查使用者的HOME目录是否有 .bash_profile 或者 .bash_login或者 .profile，若有，则会执行其中一个，执行顺序为：
 .bash_profile 最优先 > .bash_login其次 > .profile 最后

### 3Terminal下不同类型的文件显示不同的颜色

#### 1.Terminal 默认的 shell 是 bash (提示符是 $)

在 ~ 先建立一个文件 ~/.bash_profile 
加入下面的两行：
export CLICOLOR=1
export LSCOLORS=gxfxaxdxcxegedabagacad

#### 2.如果你用的是 csh/tcsh (提示符是 %), 建立 ~/.cshrc 加入

setenv CLICOLOR 1
setenv LSCOLORS gxfxaxdxcxegedabagacad

存盘， 执行 source ~/.cshrc

**问题：setenv:commandnotfound解决：在终端输入csh转到csh的shell环境**