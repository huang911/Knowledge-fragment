//参考 http://howiefh.github.io/2014/10/11/git-encoding/

### 1.中文乱码问题：

`$ git config --global core.quotepath false          # 显示 status 编码`

`$ git config --global gui.encoding utf-8            # 图形界面编码`

`$ git config --global i18n.commit.encoding utf-8    # 提交信息编码`

`$ git config --global i18n.logoutputencoding utf-8  # 输出 log 编码`

`$ export LESSCHARSET=utf-8`

\# 最后一条命令是因为 git log 默认使用 less 分页，所以需要 bash 对 less 命令进行 utf-8 编码

**以上命令等效于：**
在 etc\gitconfig 中添加

```
[core]   
quotepath = false[gui]   
encoding = utf-8[i18n]   
commitencoding = utf-8   
logoutputencoding = utf-8
```

在etc\profile 中添加

```
export LESSCHARSET=utf-8
```

1. gui.encoding = utf-8 解决在 $ git gui 和 gitk 里中文乱码。如果发现代码中的注释显示乱码，可以设置项目根目录中.git/config文件添加

   ```
   [gui]    encoding = utf-8
   ```

2. i18n.commitencoding = utf-8 设置 commit log 提交时使用 utf-8 编码，可避免服务器上乱码，同时与Unix上的提交保持一致！

3. i18n.logoutputencoding = gbk 使得在 $ git log 时编码设置为 utf-8

4. `export LESSCHARSET=utf-8`使得 $ git log 可以正常显示中文（配合i18n.logoutputencoding 的设置)

### 2.让 ls 命令可以显示中文名称

修改 etc\git-completion.bash 文件：

```
alias ls="ls --show-control-chars --color"
```

### 3.关联/修改Git远程仓库地址

#### 1.删除本地仓库当前关联的无效远程地址，再为本地仓库添加新的远程仓库地址

```git
git remote -v //查看git对应的远程仓库地址
git remote rm origin //删除关联对应的远程仓库地址
git remote -v //查看是否删除成功，如果没有任何返回结果，表示OK
git remote add origin https://github.com/developers-youcong/Metronic_Template.git //重新关联git远程仓库地址
```

#### 2.直接修改本地仓库所关联的远程仓库的地址

```
git remote  //查看远程仓库名称：origin 
git remote get-url origin //查看远程仓库地址
git remote set-url origin https://github.com/developers-youcong/Metronic_Template.git  ( 如果未设置ssh-key，此处仓库地址为 http://... 开头)
```

