- 在演示程序的基础上，自己添加数据，实现增加、删除、修改的功能。你需要：

  - 获取 docker-compose.yml 文件，按需修改，执行 `docker-compose up -d ` 启动服务（2' ，终端 docker ps 并截图）

  - 进入 hasura console，创建 user 表，可以自行设置也可以使用演示的设计（演示中属性有:id，username，email，gender，created_at，updated_at） （3'，hasura console，创建好后截图）

  - 修改附件代码，增加 user 路由方法，增加 post，put，delete等，实现数据增加、修改、删除，用 postman 等工具发送请求来验证（5'，见提交说明）

  - （选做，0'）创建 article 表并设置外码，在代码中增加路由，实现：

    - 通过user的 name 查询user的id，并通过外码访问 article获取文章列表
    - 删除 user，同时删除user 的所有 article
    - 提示：一种可能的参考结构为多对多关系表