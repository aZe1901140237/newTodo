;(function(){


    /* store.set("ke","888"); //存储
     console.log(store.get("ke"));  //获取
     // 移除 'username' 字段
     store.remove('username')*/
    //store.set('user', { name: 'marcus', likes: 'javascript' })
    /* var arr=[];
     var obj={name:1};

     arr.push(obj);
     store.set("list",arr)*/



    //把值存到 对像里面   在把对象push 数组    在把数组存到浏览器里面
    var $form_add_task=$('.add-task'),
        task_list=[];
    init(); //初始化




    $form_add_task.on("submit",function(ev){
        //阻止默认事件
        ev.preventDefault();
        //创一个对象
        var new_task={};

        //添加属性
        new_task.content=$(this).find("input").val(); //value



        if (!new_task.content) return;  //没有值 返回
        add_task(new_task);  //把数据存到浏览器
        if (task_list.length)
        {
            renew_task_list(); //更新li
        }
        $(this).find("input").val("")
    });

    //初始化
    function init(){
        //获取浏览器里面的数据  && 存到数组 && 循环出 li
        //console.log(store.get("gg"))
        task_list=store.get("gg") || [];
        renew_task_list(); //更新li
    }


    function add_task(new_task){
        //在把对象push 数组
        task_list.push(new_task);

        //把数据存到浏览器
        store.set("gg",task_list);
    }


    //刷新数据
    function renew_task_list(){
        var $task_listUL=$(".task-list");
        $task_listUL.html(null); //清空UL
        for(var i=0; i<task_list.length; i++)
        {
            //创建 li
            var $itme=task_list_tpl(task_list[i],i);
            $task_listUL.append($itme)
        }

        delete_event();  //点击删除事件
        create_list_event(); //点击详情页
    };

    //li html
    function task_list_tpl(data,index){
        //task_list[i].content

        if (!data) return;

        var $str='<li class="task-item" data-index="'+index+'">'+
            '<input type="checkbox" class="complete">'+
            '<span class="task-content">'+data.content+'</span>'+
            '<div class="fr">'+
            '<span class="action delete">删除</span>'+
            '<span class="action detail">详细</span>'+
            '</div>'+
            '</li>';

        return $str;
    };

    /*-----------------------删除功能-------------------------------------*/

    //删除功能
    function delete_task_list(index){
        $(".alertA").show(); //
        $(".primary.confirm").bind("click",function(){

            delete task_list[index]; //删除
            renew_delete_list();//更新删除后的 li
            $(".alertA").hide(); //
            //解绑
            $(".primary.confirm").unbind("click")
        });
        $(".cancel").on("click",function(){
            $(".alertA").hide();
        })
        //var off=confirm("你确定要删除么");
        //if(!off) return;
        //delete task_list[index]; //删除
        //task_list.splice(index,1);
        //renew_delete_list();//更新删除后的 li
    };

    //点击删除事件
    function delete_event(){
        var $delete= $(".action.delete");

        $delete.on("click",function(){
            //获取  index
            var index= $(this).parent().parent().data("index");
            delete_task_list(index);//删除功能
        })
    };

    //更新删除后的 li
    function renew_delete_list(){
        store.set("gg",task_list);
        renew_task_list(); //刷新数据
    };
    
    /*------------------详情页事件-------------------*/
    //点击详情页
    function create_list_event() {
        var $detail=$(".action.detail");

        $detail.on("click",function () {
            var index=$(this).parent().parent().data("index");
            var $itme=create_list(task_list[index]);
            $(".task-list").after($itme);
        })
    }

    //生成HTML
    function create_list(data) {
        var $str=
            '<div class="details">'+
            '<form>'+
            '<h2 class="content">'+data.content+'</h2>'+
            '<div class="item">'+
            '<textarea></textarea>'+
            '</div>'+
            '<div class="remind">'+
            '<label>提醒时间</label>'+
            '<input type="date" class="date">'+
            '</div>'+
            '<div class="update">'+
            '<button>更新</button>'+
            '</div>'+
            '<div class="colse">X</div>'+
            '</form>'+
            '</div>';

        return $str;
    }

    //关闭

})();
